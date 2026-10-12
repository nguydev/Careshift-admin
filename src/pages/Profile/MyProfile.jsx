import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../baseUrl";
import PageHeading from "../../Components/PageHeading";
import PasswordChangeModalForm from "../../Components/User/PasswordChangeModalForm";

import { useGetProfileQuery } from "../../redux/features/authantication/AuthenticationApi";

const MyProfile = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: adminProfile } = useGetProfileQuery(undefined);
  console.log(adminProfile);

  const [form] = Form.useForm();
  useEffect(() => {
    if (adminProfile?.data) {
      form.setFieldsValue({
        name: adminProfile.data.firstName + " " + adminProfile.data.lastName,
        email: adminProfile.data.email,
      });
    }
  }, [adminProfile, form]);

  return (
    <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
      <PageHeading
        title={"Personal information"}
        backPath={-1}
        disbaledBackBtn={true}
        className={"px-10 border-b border-[#CEF0FF] py-6"}
      />
      <div className="w-full">
        <div className="py-4 px-8 flex justify-end items-center">
          <Button
            onClick={() => setIsModalOpen(true)}
            size="large"
            type="default"
            className="px-8"
          >
            Change Password
          </Button>
        </div>
        <Form
          form={form}
          name="basic"
          layout="vertical"
          className="w-full grid grid-cols-12 gap-x-10 px-14 py-8"
          autoComplete="off"
        >
          <div className="col-span-3 space-y-6 ">
            <div className="min-h-[365px] flex flex-col items-center justify-center p-8 gap-8">
              <div className="my-3 ">
                <img
                  src={`${BASE_URL}${adminProfile?.data?.image}`}
                  alt=""
                  className="h-[200px] w-[200px] rounded-full border-4 border-indigo-400"
                />
              </div>
            </div>
          </div>
          <div className="col-span-9 space-y-[24px] w-1/2">
            <Form.Item
              className="text-lg text-[#1F8D84] font-medium"
              label="Name"
              name="name"
            >
              <Input
                readOnly
                size="large"
                className="h-[56px] rounded-lg bg-[#EFFAFF] mt-3"
              />
            </Form.Item>
            <Form.Item
              className="text-lg text-[#1F8D84] font-medium"
              label="Email"
              name="email"
            >
              <Input
                readOnly
                size="large"
                className="h-[56px] rounded-lg bg-[#EFFAFF] mt-3"
              />
            </Form.Item>
            <Button
              onClick={() => navigate(`edit`)}
              size="large"
              type="primary"
              className="px-8 w-1/2 mx-auto rounded-full font-semibold bg-playground"
            >
              <FiEdit /> Edit Profile
            </Button>
          </div>
        </Form>
      </div>
      <PasswordChangeModalForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default MyProfile;
