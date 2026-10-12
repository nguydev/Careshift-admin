import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { usePrivacyQuery } from "../../redux/features/admin/settingsApi";
import ReactQuill from "react-quill";


const PrivacyPolicy = () => {
  const { data: privacyData } = usePrivacyQuery()
  const description = privacyData?.data?.description || "<p>No description available</p>";
  const navigate = useNavigate();
  return (
    <div className="min-h-[70vh] flex flex-col justify-between">
      <div className="space-y-4">
        <div className="w-full bg-white rounded-2xl min-h-[60vh]">
          <div className="bg-gray-100 ">
            <div className="bg-white shadow-md rounded-lg p-8">
              <h1 className="text-3xl font-bold text-blue-600 mb-6">Privacy Policy</h1>
              <section className="mb-6">
                <p className="text-sm text-gray-600">
                  <ReactQuill value={description} readOnly={true} theme="bubble" />
                </p>
              </section>
            </div>
          </div>

        </div>
        <div className="flex justify-end pt-5">
          <Button
            onClick={() => navigate("edit")}
            size="large"
            htmlType="submit"
            type="primary"
            className="px-8 w-[250px] bg-playground font-semibold"
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

