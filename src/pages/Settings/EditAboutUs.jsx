import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/PageHeading";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAboutUpdateMutation, useGetAboutQuery } from "../../redux/features/admin/settingsApi";
import { message } from "antd";

const EditAboutUs = () => {
  const { data: aboutData } = useGetAboutQuery();
  const defultcontent = aboutData?.data?.description
  const [aboutUpdate, { isLoading }] = useAboutUpdateMutation();
  const navigate = useNavigate();
  const [content, setContent] = useState(defultcontent);
  const placeholder = "Enter your update about us...";

  const handleSaveChanges = async () => {
    try {
      const data = {
        description: content
      }
      await aboutUpdate(data).unwrap();
      message.success("About Us updated successfully!");
      navigate(-1);
    } catch (error) {
      message.error("Failed to update About Us. Please try again.");
    }
  };

  return (
    <div className="min-h-[75vh] flex flex-col justify-between gap-6">
      <div className="space-y-6">
        <PageHeading title={"Edit About Us"} backPath={-1} />
        <div className="h-full">
          <ReactQuill
            placeholder={placeholder}
            theme="snow"
            value={content}
            onChange={(value) => setContent(value)}
            className="h-[50vh]"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          size="large"
          type="primary"
          htmlType="button"
          className="px-8 w-[250px]"
          loading={isLoading}
          onClick={handleSaveChanges}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default EditAboutUs;
