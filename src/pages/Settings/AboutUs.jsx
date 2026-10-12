
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetAboutQuery } from "../../redux/features/admin/settingsApi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AboutUs = () => {
  const { data: aboutData } = useGetAboutQuery();
  console.log("About Data:", aboutData);

  const navigate = useNavigate();
  const description = aboutData?.data?.description || "<p>No description available</p>";

  return (
    <div className="min-h-[70vh] flex flex-col justify-between">
      <div className="space-y-4">
        <div className="w-full bg-white rounded-2xl min-h-[60vh]">
          <div className="bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8">
              <h1 className="text-3xl font-bold text-blue-600 mb-6">About Us</h1>
              <ReactQuill value={description} readOnly={true} theme="bubble" />
            </div>
          </div>
        </div>
        <div className="flex justify-end pt-5">
          <Button
            onClick={() => navigate("edit")}
            size="large"
            className="px-8 w-[250px] bg-playground font-semibold"
            htmlType="submit"
            type="primary"
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
