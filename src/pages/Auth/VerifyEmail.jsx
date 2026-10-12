import { Button } from "antd";
import Form from "antd/es/form/Form";
import { useState } from "react";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import image from "../../assets/auth/verify_img.svg";
import PageHeading from "../../Components/PageHeading";
import { useVerifyEmailMutation } from "../../redux/features/authantication/AuthenticationApi";
import { errorAlert } from "../../lib/alerts";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [verify, { isLoading }] = useVerifyEmailMutation();

  const onFinish = async () => {
    if (!/^\d{6}$/.test(otp)) {
      return errorAlert({ message: "Please enter a valid 6-digit OTP." })
    }

    try {
      const response = await verify({ otp }).unwrap();
      Cookies.set("token", response.data.token, {
        // secure: false,
        sameSite: "strict",
      });
      toast.success("Verification complete!")
      navigate(`/auth/reset-password`);
    } catch (error) {
      errorAlert({ error })
    }
  };

  return (
    <div className="min-h-[92vh] w-full grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-1 lg:gap-8">
      <div className="lg:border-r-2 border-primary mx-auto w-[90%] lg:p-[8%]">
        <img src={image} alt="Verification Illustration" />
      </div>
      <div className="lg:p-[5%] order-first lg:order-last">
        <div className="w-full py-[64px] lg:px-[44px] space-y-5">
          <div className="flex flex-col items-center lg:items-start">
            <PageHeading
              backPath={"/auth/forgot-password"}
              title={"Verify Email"}
              disbaledBackBtn={true}
            />
            <p className="drop-shadow text-hash mt-5 text-center lg:text-left">
              Please check your email. We have sent a 6-digit code to your email
              address.
            </p>
          </div>
          <Form
            name="verify_email"
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <div className="py-3 text-2xl font-semibold flex justify-center">
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                // inputStyle={{
                //   height: "52px",
                //   width: "70px",
                //   margin: "10px",
                //   border: "1px solid #61D0FF",
                //   outline: "none",
                //   borderRadius: "16px",
                //   color: "black",
                // }}
                renderSeparator={<span> </span>}
                renderInput={(props) => <input {...props}
                  className="border border-[#61D0FF] outline-none rounded-xl w-full h-[50px] min-w-[40px] mx-[5px] text-[16px] md:h-[60px] md:min-w-[50px] md:mx-[8px] lg:h-[70px] md:text-lg xl:min-w-[70px] xl:mx-[10px] xl:text-2xl"
                />}
              />
            </div>
            <div className="w-full flex justify-center pt-5">
              <Button
                loading={isLoading}
                type="primary"
                size="large"
                htmlType="submit"
                className="w-full px-2"
              >
                Verify Email
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
