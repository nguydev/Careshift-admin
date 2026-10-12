/* eslint-disable react/prop-types */
import { Button, Form, Input, Modal } from "antd";
import toast from "react-hot-toast";
import { LiaArrowLeftSolid } from "react-icons/lia";
import { MdLockOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { errorAlert } from "../../lib/alerts";
import { logOut } from "../../redux/features/authantication/authanticationSlice";
import { useChangePassMutation } from "../../redux/features/authantication/AuthenticationApi";
import { useAppDispatch } from "../../redux/hooks";

const PasswordChangeModalForm = ({ isModalOpen, setIsModalOpen }) => {
  const [changePassword, { isLoading }] = useChangePassMutation()
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleChangePassword = async (values) => {
    try {
      await changePassword(values).unwrap();
      toast.success("Password changed Successfully !")
      setIsModalOpen(false);
      Swal.fire({
        title: "Password Changed",
        text: "Do you want to log out now?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Log Out",
        cancelButtonText: "Stay Logged In",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(logOut());
          localStorage.removeItem("token")
          navigate("/auth");
        } else {
          console.log("User chose to stay logged in");
        }
      });
    } catch (error) {
      errorAlert({ error })
    }
  };
  return (
    <Modal
      title={null}
      open={isModalOpen}
      closeIcon={null}
      onOk={() => setIsModalOpen(false)}
      onCancel={() => setIsModalOpen(false)}
      style={{
        maxWidth: 441,
      }}
      footer={[]}
    >
      <div className="px-[24px] pb-[14px]">
        <div className="flex items-center gap-1.5 pt-[34px]">
          <button
            onClick={() => setIsModalOpen(false)}
            className="outline-none"
          >
            <LiaArrowLeftSolid size={26} />
          </button>
          <h6 className="text-2xl">Change Password</h6>
        </div>
        <p className="text-[16px] my-[24px]">
          Your password must be 8-10 character long.
        </p>
        <Form
          name="dependencies"
          autoComplete="off"
          requiredMark={false}
          layout="vertical"
          onFinish={handleChangePassword}
        >
          <Form.Item
            label={<p className="pb-1 text-white">Enter old password</p>}
            name="oldPassword"
            rules={[
              {
                required: true,
                message: "Please Input Your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<MdLockOutline className="mr-2" />}
              style={{
                backgroundColor: "#E9F4F3",
              }}
              className="p-4 rounded-lg h-[56px]  placeholder:text-[#999999]"
              placeholder="Enter old Password"
            />
          </Form.Item>
          <Form.Item
            label={<p className="pb-1 text-white">Enter new password</p>}
            name="newPassword"
            rules={[
              {
                required: true,
                message: "Please Input Your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<MdLockOutline className="mr-2" />}
              style={{
                backgroundColor: "#E9F4F3",
              }}
              className="rounded-lg h-[56px]  placeholder:text-[#999999]"
              placeholder="Set new password"
            />
          </Form.Item>
          <Form.Item
            label={<p className="pb-1 text-white">Re-enter new password</p>}
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              {
                required: true,
                message: "Please Input Your Password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<MdLockOutline className="mr-2" />}
              style={{
                backgroundColor: "#E9F4F3",
              }}
              className="p-4 rounded-lg h-[56px]  placeholder:text-[#999999]"
              placeholder="Re-enter your password"
            />
          </Form.Item>
          <Button
            type="link"
            className="text-[16px] -mt-3 mb-3 outline-none px-0 !text-black"
            // onClick={() => setModalTitle("Forget Password")}
            onClick={() => navigate("/auth/forgot-password")}
          >
            Forget Password?
          </Button>
          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={isLoading}
            >
              Update Password
            </Button>
          </Form.Item>
        </Form>
        <div />
      </div>
    </Modal>
  );
};

export default PasswordChangeModalForm;
