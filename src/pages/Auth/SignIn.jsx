import { Button, Checkbox, Input } from "antd";
import Form from "antd/es/form/Form";
import { useLocation, useNavigate } from "react-router-dom";
import signin_image from "../../assets/auth/signin.svg";
import { setLogData } from "../../redux/features/authantication/authanticationSlice";
import { useLoginMutation } from "../../redux/features/authantication/AuthenticationApi";
import { useAppDispatch } from "../../redux/hooks";
import { errorAlert } from "../../lib/alerts";
import toast from "react-hot-toast";

const SignIn = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const onFinish = async (values) => {
    try {
      const response = await login(values).unwrap();
      if (response?.data?.user?.role === "admin") {
        dispatch(
          setLogData({
            user: response?.data?.user,
            token: response?.data?.token,
            remember: values.remember
          })
        );
        toast.success("Login successful!")
        // console.log(location)
        navigate(location.state ? location.state : "/");
      } else {
        errorAlert({ message: "You are unauthorized!", })
      }
    } catch (err) {
      errorAlert({ error: err })
    }
  };
  return (
    <div className="min-h-[92vh] w-full grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-1 lg:gap-8">
      <div className="lg:border-r-2 border-primary mx-auto w-[92%] lg:p-[15%] lg:pr-[20%] ">
        <img src={signin_image} alt="signin_image" />
      </div>
      <div className="lg:p-[5%] order-first lg:order-last">
        <div className="w-full py-[44px] lg:px-[44px]">
          <div className="pb-[30px] space-y-2">
            <h1 className="text-[33px] font-semibold ">Login to Account!</h1>
            <p className="text-hash lg:text-lg">
              Please enter your email and password to continue.
            </p>
          </div>
          <Form
            name="normal_login"
            layout="vertical"
            initialValues={{
              remember: false,
              email: "admin@gmail.com", // Default email
              password: "1qazxsw2", // Default password
            }}
            onFinish={onFinish}
            requiredMark={true}
            className="text-start"
          >
            <Form.Item
              label={<span className="font-medium text-base">Email</span>}
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Please input a valid Email!",
                },
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input size="large" placeholder="admin@gmail.com" />
            </Form.Item>
            <Form.Item
              label={<span className="font-medium text-base">Password</span>}
              className="mt-6"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password size="large" placeholder="**********" />
            </Form.Item>
            <div className="flex justify-between items-center">
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox className="text-base font-medium">
                  Remember me
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <Button
                  onClick={() => navigate("/auth/forgot-password")}
                  type="link"
                  className="text-base font-medium text-info"
                >
                  Forget password?
                </Button>
              </Form.Item>
            </div>
            <div className="w-full flex justify-center ">
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={isLoading}
                className="px-2 w-full bg-playground"
              >
                Sign In
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
