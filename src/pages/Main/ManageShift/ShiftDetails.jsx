/* eslint-disable react/no-unescaped-entities */

import { FaCheck, FaChevronLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useShiftDetailsQuery } from "../../../redux/features/admin/shiftManage/shiftManage";
import LoaderWraperComp from "../../../Components/LoaderWraperComp";
import { BASE_URL } from "../../../../baseUrl";
import { handleImageError } from "../../../lib/handleImageError";


const ShiftDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, isError, error } = useShiftDetailsQuery(id)
  return (
    <div className="mx-auto bg-white text-gray-900 ">
      <div className="bg-[#31BAC4] text-white px-6 py-3 rounded-t">
        <button className="flex items-center gap-2.5 text-sm">
          <FaChevronLeft onClick={() => navigate(-1)} size={15} />
          <span className="text-xl">View Shift Details</span>
        </button>
      </div>
      <LoaderWraperComp isLoading={isLoading} isError={isError} error={error} className={"h-[80vh]"}>
        <div className="grid grid-cols-2 gap-12 p-8">
          {/* Left: Client Details */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 border-b border-gray-300 pb-1 mb-6">
              Client Details
            </h3>

            <div className="flex items-center space-x-8 mb-8">
              <div className="flex flex-col items-center">
                <img
                  src={BASE_URL + data?.data?.clientImage?.publicFileURL}
                  onError={handleImageError}
                  alt="Client's image"
                  className="w-24 h-24 rounded-full object-cover mb-2"
                />
                <p className="text-xs text-gray-400">Client's image</p>
              </div>
              <div className="flex flex-col space-y-4 flex-grow">
                <p className="border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-700 "> {data?.data?.clientFirstName ?? "N/A"}</p>
                <p className="border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-700 ">
                  {data?.data?.clientLastName ?? "N/A"}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6">
              <div>
                <label className="text-xs text-gray-600">Suburb</label>
                <p className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-700  text-sm">{data?.data?.clientSuburb ?? "N/A"}</p>
              </div>
              <div>
                <label className="text-xs text-gray-600">State</label>
                <p className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-700  text-sm">{data?.data?.clientState ?? "N/A"}</p>
              </div>
              <div>
                <label className="text-xs text-gray-600">Postcode</label>
                <p className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-700  text-sm">{data?.data?.clientPostcode ?? "N/A"}</p>
              </div>
              <div>
                <label className="text-xs text-gray-600">Full Address (not just address)</label>
                <p className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-700  text-sm">{data?.data?.clientFullAddress ?? "N/A"}</p>
              </div>
              <div className="col-span-2">
                <label className="text-xs text-gray-600">Phone number (Optional)</label>
                <p className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-700  text-sm">{data?.data?.clientPhoneNumber ?? "N/A"}</p>
              </div>
            </div>
            <div className="mb-6 border-t border-gray-300 pt-6">
              <p className="text-sm font-semibold mb-4">Required</p>
              <div className="flex flex-col space-y-3">
                <label className="inline-flex items-center space-x-2 text-sm  ">
                  <p className="form-checkbox h-4 w-4 bg-blue-600 text-center p-0.5 rounded-sm">{data?.data?.drivingLicense && <FaCheck size={12} className="text-white" />}</p>
                  <span>Driving License</span>
                </label>
                <label className="inline-flex items-center space-x-2 text-sm ">
                  <p className="form-checkbox h-4 w-4 bg-blue-600 text-center p-0.5 rounded-sm">{data?.data?.ndidWorkerCheck && <FaCheck size={12} className="text-white" />}</p>
                  <span>Police Check or NDIS Worker Screening Check</span>
                </label>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs text-gray-600 mb-1">Preferred Gender</label>
              <p
                className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-100 text-gray-700  text-sm">No Preference</p>
            </div>

            <div className="mb-6">
              <label className="block text-xs text-gray-600 mb-1">Preferred Language</label>
              <div className="flex space-x-2">
                {data?.data?.language?.map((lang, langIndex) => <p key={langIndex} className="bg-gray-200 text-gray-600 text-xs rounded-md px-3 py-1">{lang}</p>)}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs text-gray-600 mb-1">Preferred Qualification</label>
              <p className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-100 text-gray-700  text-sm">{data?.data?.preferredQualification ?? "N/A"}</p>
            </div>
            <div className="mb-6">
              <label className="block text-xs text-gray-600 mb-1">First Aid & CPR</label>
              <p className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-100 text-gray-700  text-sm"> test select  {data?.data?.firstAidAndCPR ?? "N/A"}</p>
            </div>

            <div className="mb-6">
              <label className="block text-xs text-gray-600 mb-1">Vaccination</label>
              <p className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-100 text-gray-700  text-sm"> Select {data?.data?.vaccination ?? "N/A"}</p>
            </div>
          </div>

          {/* Right: Shift Details */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 border-b border-gray-300 pb-1 mb-6">
              Shift Details
            </h3>
            <div className="mb-6">
              <label className="block text-xs text-gray-600 mb-1">Worker Role</label>
              <p className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-100 text-gray-700  text-sm capitalize">{data?.data?.workerRole ?? "N/A"}</p>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6">
              <div>
                <label className="text-xs text-gray-600">Suburb</label>
                <p className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-700  text-sm">{data?.data?.shiftSuburb ?? "N/A"} </p>
              </div>
              <div>
                <label className="text-xs text-gray-600">State</label>
                <p className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-700  text-sm" >{data?.data?.shiftState ?? "N/A"}</p>

              </div>
            </div>
            <div className="mb-6">
              <label className="block text-xs text-gray-600 mb-1">Description</label>
              <p className="border border-gray-300 rounded-md px-3 py-2 w-full resize-none bg-gray-100 text-gray-700  text-sm">
                {data?.data?.description ?? "N/A"}
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-xs text-gray-600 mb-1">Work Starting date</label>
              <p className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-100 text-gray-700  text-sm">Date : {data?.data?.workStartDate ? new Date(data?.data?.workStartDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }) : "N/A"}</p>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6">
              <div>
                <label className="text-xs text-gray-600">Start time</label>
                <p className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-700  text-sm"> {data?.data?.workingTimeStart ? new Date(data?.data?.workingTimeStart).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true
                }) : "N/A"}</p>
              </div>
              <div>
                <label className="text-xs text-gray-600">Finish time</label>
                <p className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-700  text-sm"> {data?.data?.workingTimeFinish ? new Date(data?.data?.workingTimeFinish).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true
                }) : "N/A"}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6">
              <div>
                <label className="text-xs text-gray-600">Work type</label>
                <p className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-700  text-sm capitalize"> {data?.data?.workType ?? "N/A"}</p>
              </div>
              <div>
                <label className="text-xs text-gray-600">Total shift Hours</label>
                <p className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-700  text-sm">{data?.data?.totalShiftHours ?? "N/A"} hours</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs text-gray-600 mb-1">Frequency</label>
              <p className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-100 text-gray-700  text-sm capitalize">{data?.data?.frequency ?? "N/A"}</p>
            </div>

            <div className="mb-6">
              <label className="block text-xs text-gray-600 mb-1">Services</label>
              {data?.data?.services?.map((service, serIndex) => <p key={serIndex} className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-100 text-gray-700  text-sm mb-2">{service}</p>)}
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-gray-300 pt-6 mb-6">
              <div>
                <label className="text-xs text-gray-600">Hourly Rate</label>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="border border-gray-300 rounded-l-md px-3 py-2 text-sm bg-gray-200 text-gray-600 ">$</span>
                  <p className="flex-grow border border-gray-300 rounded-r-md px-3 py-2 bg-gray-100 text-gray-700  text-sm"> {data?.data?.hourlyRate ?? "N/A"}</p>

                </div>
              </div>
              <div>
                <label className="text-xs text-gray-600">
                  Travel price per Km <span className="italic text-gray-400">(with the client only)</span>
                </label>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="border border-gray-300 rounded-l-md px-3 py-2 text-sm bg-gray-200 text-gray-600 ">$</span>
                  <p className="flex-grow border border-gray-300 rounded-r-md px-3 py-2 bg-gray-100 text-gray-700  text-sm" > {data?.data?.travelRatePerKm ?? "N/A"}</p>
                </div>
              </div>
            </div>

            <h3 className="text-sm font-semibold text-gray-600 border-b border-gray-300 pb-1 mb-6">
              Client Pay ME
            </h3>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label className="text-xs text-gray-600">Hourly Rate</label>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="border border-gray-300 rounded-l-md px-3 py-2 text-sm bg-gray-200 text-gray-600 ">$</span>
                  <p className="flex-grow border border-gray-300 rounded-r-md px-3 py-2 bg-gray-100 text-gray-700  text-sm">{data?.data?.clientPayhourlyRate ?? "N/A"}</p>

                </div>
              </div>
              <div>
                <label className="text-xs text-gray-600">
                  Travel price per Km <span className="italic text-gray-400">(with the client only)</span>
                </label>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="border border-gray-300 rounded-l-md px-3 py-2 text-sm bg-gray-200 text-gray-600 ">$</span>
                  <p className="flex-grow border border-gray-300 rounded-r-md px-3 py-2 bg-gray-100 text-gray-700  text-sm">{data?.data?.clientPaytravelRatePerKm ?? "N/A"}</p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </LoaderWraperComp >
    </div >
  );
};

export default ShiftDetails;


