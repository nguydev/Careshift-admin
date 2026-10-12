import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/PageHeading";

import ReactQuill from "react-quill";
import { useTremsQuery } from "../../redux/features/admin/settingsApi";

const TermsConditions = () => {

  const { data: tramsData } = useTremsQuery()
  const description = tramsData?.data?.description || "<p>No description available</p>";
  const navigate = useNavigate();
  return (
    <div className="min-h-[70vh] flex flex-col justify-between">
      <div className="space-y-4">


        <div className="bg-gray-100 ">
          <div className="bg-white shadow-md rounded-lg p-8">
            {/* <h1 className="">Terms & Condition</h1> */}
            <PageHeading title="Terms & Conditions" className={'text-3xl font-bold text-blue-600 mb-6'} disabledBackBtn={true} />

            <section className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">1. Acceptance of Terms</h3>
              <p className="text-sm text-gray-600">
                <ReactQuill value={description} readOnly={true} theme="bubble" />
              </p>
            </section>
          </div>
        </div>

        <div className="flex justify-end pt-5">
          <Button
            onClick={() => navigate("edit")}
            size="large"
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

export default TermsConditions;
