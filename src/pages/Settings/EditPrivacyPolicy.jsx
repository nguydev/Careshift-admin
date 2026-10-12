import { Button, message } from "antd";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/PageHeading";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";
import { usePrivacyQuery, useUpdatePrivacyMutation } from "../../redux/features/admin/settingsApi";

const EditPrivacyPolicy = () => {
  const { data: privacyData } = usePrivacyQuery();
  const [privacyUpdate] = useUpdatePrivacyMutation();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const placeholder = "Enter your updated privacy policy...";
  useEffect(() => {
    if (privacyData?.data?.description) {
      setContent(privacyData?.data?.description);
    }
  }, [privacyData]);

  const handleSaveChanges = async () => {
    try {
      const data = {
        description: content,
      };
      await privacyUpdate(data).unwrap();
      message.success("Privacy policy updated successfully!");
      navigate(-1);
    } catch (error) {
      message.error("Failed to update privacy policy. Please try again.");
    }
  };

  return (
    <div className="min-h-[75vh] flex flex-col justify-between gap-6">
      <div className="space-y-6">
        <PageHeading title={"Edit Privacy Policy"} backPath={-1} />

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
          htmlType="submit"
          className="px-8 w-[250px]"
          onClick={handleSaveChanges}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default EditPrivacyPolicy;
