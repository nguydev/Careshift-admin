import { Button, Input } from "antd";
import Form from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
import image from "../../assets/auth/forgot-pass_img.svg";
import PageHeading from "../../Components/PageHeading";
import toast from "react-hot-toast";
import { errorAlert } from "../../lib/alerts";
import Cookies from "js-cookie";
import { useForgotPasswordMutation } from "../../redux/features/authantication/AuthenticationApi";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const onFinish = async (values) => {
    try {
      const response = await forgotPassword(values).unwrap();
      Cookies.set("token", response?.data?.token, {
        // secure: false,
        sameSite: "strict",
      });
      toast.success("OTP has been sent successfully!")
      navigate(`/auth/verify-email`);
    } catch (error) {
      errorAlert({ error })
    }
  };

  return (
    <div className="min-h-[92vh] w-full grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-1 lg:gap-8">
      <div className="border-r-0 lg:border-r-2 border-primary w-[99%] p-[8%] lg:p-[12%] lg:pr-0">
        <img src={image} alt="Forgot Password" />
      </div>
      <div className="lg:p-[5%] order-first lg:order-last">
        <div className="w-full py-[64px] lg:px-[44px] space-y-8">
          <div className="flex flex-col items-center lg:items-start">
            <PageHeading
              backPath={"/auth"}
              title={"Forgot Password"}
              disbaledBackBtn={true}
            />
            <p className="drop-shadow text-hash mt-4 text-center lg:text-start">
              Enter your email address to get a verification code for resetting
              your password. Please enter your email address to reset your
              password.
            </p>
          </div>
          <Form
            name="normal_login"
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Please input valid email!",
                },
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input size="large" placeholder="Enter your email" />
            </Form.Item>
            <div className="w-full flex justify-center pt-5">
              <Button
                loading={isLoading}
                type="primary"
                size="large"
                htmlType="submit"
                className="w-full px-2 bg-playground"
              >
                Get OTP
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
