import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";
import { useEffect, useState } from "react";
import { PiCameraPlus } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../baseUrl";
import PageHeading from "../../Components/PageHeading";
import { useGetProfileQuery, useUpdateAdminProfileMutation } from "../../redux/features/authantication/AuthenticationApi";

const EditMyProfile = () => {
  const { data: profileData } = useGetProfileQuery();
  const [updateAdminProfile, { data, isLoading }] = useUpdateAdminProfileMutation();
  const navigate = useNavigate()
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (profileData?.data) {
      form.setFieldsValue({
        firstName: profileData.data.firstName,
        lastName: profileData.data.lastName,
        email: profileData.data.email,
      });
      if (profileData.data.image?.publicFileURL) {
        setPreviewImage(`${BASE_URL}${profileData.data.image.publicFileURL}`);
      }
    }
  }, [profileData, form]);

  const onFileChange = (info) => {
    const selectedFile = info.file.originFileObj || info.file;
    if (selectedFile instanceof Blob) {
      setFile(selectedFile);
      try {
        setPreviewImage(URL.createObjectURL(selectedFile));
      } catch (error) {
        console.error("Failed to create object URL:", error);
      }
    }
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);
    formData.append("email", values.email);
    if (file) {
      formData.append("image", file);
    }
    try {
      await updateAdminProfile(formData).unwrap();
      if (data?.success === true) {
        navigate('/settings/profile')
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
      <PageHeading
        title={"Edit Personal Information"}
        backPath={-1}
        disbaledBackBtn={true}
        className={"px-10 border-b border-[#CEF0FF] py-6"}
      />
      <div className="w-full">
        <Form
          form={form}
          name="basic"
          layout="vertical"
          className="w-full grid grid-cols-12 gap-x-10 px-14 py-8"
          onFinish={onFinish}
          autoComplete="off"
        >
          <div className="col-span-3 space-y-6">
            <div className="min-h-[365px] flex flex-col items-center justify-center p-8 rounded-lg space-y-4">
              <div className="my-3 relative">
                <div className="h-full w-full absolute inset-0 bg-[#222222bb] rounded-full flex justify-center items-center text-white cursor-pointer">
                  <PiCameraPlus size={34} />
                </div>
                <img
                  src={previewImage || "/default-avatar.png"}
                  alt="Profile"
                  className="h-[144px] w-[144px] rounded-full"
                />
              </div>
              <Upload
                accept="image/*"
                beforeUpload={() => false}
                onChange={onFileChange}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
            </div>
          </div>
          <div className="col-span-9 space-y-[24px] w-1/2">
            <Form.Item
              className="text-lg text-[#1F8D84] font-medium"
              label="Name"
              name="firstName"
              rules={[{ required: true, message: " is required!" }]}
            >
              <Input
                size="large"
                className="h-[56px] rounded-lg bg-[#EFFAFF] mt-3"
              />
            </Form.Item>
            <Form.Item
              className="text-lg text-[#1F8D84] font-medium"
              label="Last Name"
              name="lastName"
            >
              <Input
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
            <Form.Item className="flex justify-center pt-4">
              <Button
                size="large"
                type="primary"
                className="px-8 w-[250px] font-semibold bg-playground rounded-full"
                htmlType="submit"
                loading={isLoading}
              >
                Save Changes
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditMyProfile;
