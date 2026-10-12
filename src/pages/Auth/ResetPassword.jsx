import { Button, Input, message } from "antd";
import Form from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
import image from "../../assets/auth/reset_img.svg";
import PageHeading from "../../Components/PageHeading";
import { useResetPasswordMutation } from "../../redux/features/authantication/AuthenticationApi";
import toast from "react-hot-toast";
import { errorAlert } from "../../lib/alerts";
import Cookies from "js-cookie";


const ResetPassword = () => {
  const navigate = useNavigate();

  const [resetPass, { isLoading }] = useResetPasswordMutation();

  const onFinish = async (values) => {
    try {
      await resetPass(values).unwrap();
      toast.success("Password reset successfully!")
      Cookies.remove("token")
      navigate("/auth");
    } catch (error) {
      errorAlert({ error })
    }
  };

  return (
    <div className="min-h-[92vh] w-full grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-1 lg:gap-8">
      <div className="lg:border-r-2 border-primary mx-auto w-[96%] lg:p-[10%]">
        <img src={image} alt="" />
      </div>
      <div className="lg:p-[5%] order-first lg:order-last">
        <div className="w-full py-[44px] lg:px-[44px] space-y-8">
          <div className="flex flex-col items-center lg:items-start">
            <PageHeading
              backPath={-1}
              title={"Set new password"}
              disbaledBackBtn={true}
            />
            <p className="drop-shadow text-[#464343] mt-5">
              Your password must be 8-10 characters long.
            </p>
          </div>
          <Form
            name="normal_login"
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            requiredMark={false}
            onFinish={onFinish}
          >
            <Form.Item
              label={
                <span className="font-medium text-base">New Password</span>
              }
              name="password"
              rules={[
                {
                  min: 8,
                  message: "Password must be at least 8 characters"
                },
                {
                  required: true,
                  message: "Please input a new password!",
                },
              ]}
            >
              <Input.Password size="large" placeholder="**********" />
            </Form.Item>
            <Form.Item
              label={
                <span className="font-medium text-base">
                  Confirm New Password
                </span>
              }
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please re-enter the password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password and confirm password do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password size="large" placeholder="**********" />
            </Form.Item>
            <div className="w-full flex justify-center pt-4">
              <Button
                loading={isLoading}
                type="primary"
                size="large"
                htmlType="submit"
                className="w-full px-2"
              >
                Reset Password
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
