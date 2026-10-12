import { Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/PageHeading";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { useTremsQuery, useUpdateTramsMutation } from "../../redux/features/admin/settingsApi";

const EditTermsConditions = () => {
  const { data: termsData } = useTremsQuery();
  const defaultContent = termsData?.data?.description || "";
  const [updateTerms, { isLoading }] = useUpdateTramsMutation();
  const navigate = useNavigate();
  const [content, setContent] = useState(defaultContent);
  const placeholder = "Enter your updated Terms & Conditions...";
  console.log(content);

  useEffect(() => {
    if (termsData?.data?.description) {
      setContent(termsData.data.description);
    }
  }, [termsData]);

  const handleSaveChanges = async () => {
    try {
      const data = {
        description: content,
      };
      await updateTerms(data).unwrap();
      message.success("Terms & Conditions updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error(error);
      message.error("Failed to update Terms & Conditions. Please try again.");
    }
  };

  return (
    <div className="min-h-[75vh] flex flex-col justify-between gap-6">
      <div className="space-y-6">
        <PageHeading title={"Edit Terms & Conditions"} backPath={-1} />
        <div className="h-full">
          <ReactQuill
            placeholder={placeholder}
            theme="snow"
            value={content}
            onChange={setContent}
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

export default EditTermsConditions;
