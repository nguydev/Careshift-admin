import { Button, Dropdown, Input, Menu, message, Modal } from "antd";
import { useState } from "react";
import { BiSolidError } from "react-icons/bi";
import { FaChevronLeft } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import { MdVerified } from "react-icons/md";
import { RiTimer2Fill } from "react-icons/ri";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { BASE_URL } from "../../../../baseUrl";
// sdfkj
import toast from "react-hot-toast";
import { errorAlert } from "../../../lib/alerts";
import {
  useApproveWorkerMutation,
  useGetWorkerDetailsQuery,
  useUpdateWorkerStatusMutation,
} from "../../../redux/features/admin/manageWorker/manageWorkerApi";
import { useShiftAssignMutation } from "../../../redux/features/admin/shiftManage/shiftManage";

const { TextArea } = Input;

const ViewProfile = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [currentRejectField, setCurrentRejectField] = useState(null);
  const [currentDocId, setCurrentDocId] = useState(null);

  const { data } = useGetWorkerDetailsQuery(id);
  const workerData = data?.data;

  const [updateWorkerStatus, { isLoading }] = useUpdateWorkerStatusMutation();
  const [approveWorker] = useApproveWorkerMutation();
  const [assign] = useShiftAssignMutation();
  const handleAsign = async (status) => {
    const toastId = toast.loading(`Loading...`);
    try {
      await assign({
        id: searchParams.get("application"),
        data: {
          user: id,
          status,
        },
      }).unwrap();
      toast.success(
        `${status === "approved" ? "Assign" : "Reject"} successful!`,
        { id: toastId }
      );
      navigate("/shift-applications");
    } catch (error) {
      toast.dismiss(toastId);
      errorAlert({ error });
    }
  };

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Function to get verification icon
  const getVerificationIcon = (status) => {
    switch (status) {
      case "approved":
        return <MdVerified className="text-teal-600 text-xl" />;
      case "pending":
        return <RiTimer2Fill className="text-[#E9B000] text-xl" />;
      default:
        return <BiSolidError className="text-[#F70004] text-xl" />;
    }
  };

  const handleWorkerStatus = async (status) => {
    // console.log(status);
    try {
      await updateWorkerStatus({ id, status }).unwrap();
      message.success("Worker status update successfully!");
    } catch (error) {
      message.error("Failed to update worker status. Please try again.");
    }
  };

  const handleApprove = async (
    field,
    isVerifyed,
    adminNote = "",
    id = null
  ) => {
    try {
      const body = {
        field,
        isVerifyed,

        ...(isVerifyed === "canceled" && { adminNote }),
        ...(id && { id }),
      };
      console.log(body);

      try {
        await approveWorker({ docId: workerData.docId, body }).unwrap();
        message.success("Worker approve successfully!");
      } catch (error) {
        message.error("Failed to update worker status. Please try again.");
      }
    } catch (error) {
      message.error("Failed to update document status");
    }
  };

  const showRejectModal = (field, docId = null) => {
    setCurrentRejectField(field);
    setCurrentDocId(docId);
    setIsRejectModalOpen(true);
  };

  const closeRejectModal = () => {
    setIsRejectModalOpen(false);
    setRejectReason("");
  };
  const isAppliedView = location.pathname.split("/")[2] === "applied-profile";
  return (
    <>
      <div className=" text-[20px] mx-auto  bg-white rounded shadow-md font-sans">
        {/* Header */}
        <div className="bg-[#31BAC4] text-white px-6 py-3 rounded-t">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 font-semibold"
          >
            <FaChevronLeft />
            View details
          </button>
        </div>

        {/* Profile Header */}
        <div className="flex flex-col items-center py-6 border-b border-gray-200 relative">
          <div className="w-24 h-24 rounded-full border border-teal-300 overflow-hidden">
            <img
              src={BASE_URL + workerData?.parsonalDetails?.image}
              alt={workerData?.parsonalDetails?.first_name || "Worker"}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="flex justify-center items-center mt-2 text-lg font-semibold">
            {workerData?.parsonalDetails?.first_name || "N/A"}{" "}
            {workerData?.parsonalDetails?.last_name || "N/A"}
            {workerData?.parsonalDetails?.verifyedByAdmin === true && (
              <MdVerified className="text-teal-600 text-md ml-0.5" />
            )}
          </h2>
          <p className="text-xs text-gray-500">
            {workerData?.parsonalDetails?.email || "N/A"}
          </p>
          {workerData?.parsonalDetails?.verifyedByAdmin === true ? (
            <p className="border border-green-400 bg-green-100 rounded-full px-3 flex items-center text-sm text-green-600 mt-2">
              <MdVerified className="mr-1" /> Verified
            </p>
          ) : (
            <>
              {!isAppliedView ? (
                <Button
                  loading={isLoading}
                  onClick={() => handleWorkerStatus(true)}
                  className="mt-3 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold px-4 py-1 rounded"
                >
                  {"Verify worker"}
                </Button>
              ) : (
                <p className="border border-green-400 bg-green-100 rounded-full px-3 flex items-center text-sm text-green-600 mt-2">
                  <BiSolidError className="mr-1" /> Unverified
                </p>
              )}
            </>
          )}

          {isAppliedView && (
            <div className=" w-full flex justify-center gap-6 pt-6">
              <button
                onClick={() => handleAsign("approved")}
                className="text-base text-white px-8 pb-1.5 pt-1 rounded bg-[#009A3F]"
              >
                Assign
              </button>
              <button
                onClick={() => handleAsign("canceled")}
                className="text-base text-white px-8 pb-1.5 pt-1 rounded bg-[#F70004]"
              >
                Reject
              </button>
            </div>
          )}
        </div>

        {/* Content Grid */}
        <div className=" gap-8 px-8 pt-8 pb-12 space-y-10 text-gray-700">
          {/* Left Column */}
          <div className=" flex gap-20 w-full">
            {/* Personal Details */}
            <section className="w-full">
              <h3 className="font-semibold border-b border-gray-300 pb-1 mb-3">
                Personal Details
              </h3>
              <div className="grid grid-cols-2 gap-y-2 gap-x-6">
                <div>Role</div>
                <div>{workerData?.parsonalDetails?.role || "N/A"}</div>

                <div>First Name</div>
                <div>{workerData?.parsonalDetails?.first_name || "N/A"}</div>

                <div>Last Name</div>
                <div>{workerData?.parsonalDetails?.last_name || "N/A"}</div>

                <div>Email</div>
                <div>{workerData?.parsonalDetails?.email || "N/A"}</div>

                <div>Phone Number</div>
                <div>{workerData?.parsonalDetails?.phone || "N/A"}</div>

                <div>Gender</div>
                <div>{workerData?.parsonalDetails?.gender || "N/A"}</div>

                <div>Residential Address</div>
                <div>{workerData?.parsonalDetails?.address || "N/A"}</div>

                <div>Date of birth</div>
                <div>
                  {workerData?.parsonalDetails?.dob
                    ? formatDate(workerData.parsonalDetails.dob)
                    : "N/A"}
                </div>

                <div>Language</div>
                <div className="flex gap-2 flex-wrap">
                  {workerData?.parsonalDetails?.language?.length ? (
                    workerData.parsonalDetails.language.map((lang, index) => (
                      <span
                        key={index}
                        className="text-sm px-2.5 py-1.5 rounded bg-gray-100 text-gray-600 shadow-current"
                      >
                        {lang}
                      </span>
                    ))
                  ) : (
                    <span>N/A</span>
                  )}
                </div>

                <div>Hear our app</div>
                <div>{workerData?.parsonalDetails?.hear_our_app || "N/A"}</div>
              </div>
            </section>

            {/* Emergency Contact */}
            <section className="w-full">
              <h3 className="font-semibold border-b border-gray-300 pb-1 mb-3">
                Emergency Contact
              </h3>
              <div className="grid grid-cols-2 gap-y-2 gap-x-6">
                <div>First Name</div>
                <div>{workerData?.emergencyContact?.firstName || "N/A"}</div>

                <div>Last Name</div>
                <div>{workerData?.emergencyContact?.lastName || "N/A"}</div>

                <div>Relationship</div>
                <div>{workerData?.emergencyContact?.relation || "N/A"}</div>

                <div>Phone Number</div>
                <div>{workerData?.emergencyContact?.phone || "N/A"}</div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="flex gap-20 w-full">
            {/* Document */}
            <section className="w-full">
              <h3 className="font-semibold border-b border-gray-300 pb-1 mb-3">
                Document
              </h3>
              {/* Document Items */}
              <div className="space-y-3">
                {/* Passport */}
                <div className="flex justify-start items-center gap-4 border-b pb-3 ">
                  <div className="w-full">
                    <span className="font-semibold text-red-600">*</span>{" "}
                    Passport
                    <p className="text-xs text-gray-400">
                      Expire date{" "}
                      {workerData?.document?.passport?.expiryDate
                        ? formatDate(workerData.document.passport.expiryDate)
                        : "N/A"}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-5 w-full">
                    <div>
                      <p className="text-center text-xs">Passport</p>
                      {workerData?.document?.passport?.document ? (
                        <a
                          target="_blank"
                          className="text-xs px-3 w-fit py-1 bg-[#1B666C] text-white rounded hover:bg-teal-700"
                          href={
                            BASE_URL + workerData?.document?.passport?.document
                          }
                        >
                          View document
                        </a>
                      ) : (
                        <span className="text-xs px-3 w-fit py-1 bg-red-500 text-white rounded">
                          No document
                        </span>
                      )}
                    </div>
                    {getVerificationIcon(
                      workerData?.document?.passport?.isVerifyed
                    )}
                    {!isAppliedView && (
                      <Dropdown
                        overlay={
                          <Menu>
                            <Menu.Item
                              onClick={() =>
                                handleApprove("passport", "approved")
                              }
                              key="1"
                            >
                              Approve
                            </Menu.Item>
                            <Menu.Item
                              onClick={() => showRejectModal("passport")}
                              key="2"
                            >
                              Not Approve
                            </Menu.Item>
                          </Menu>
                        }
                        trigger={["click"]}
                      >
                        <HiDotsVertical className="cursor-pointer" />
                      </Dropdown>
                    )}
                  </div>
                </div>

                {/* Driving License */}
                <div className="flex justify-start items-center gap-4 border-b pb-3 ">
                  <div className="w-full">
                    Driving License
                    <p className="text-xs text-gray-400">
                      Expire date{" "}
                      {workerData?.document?.drivingLicense?.expiryDate
                        ? formatDate(
                            workerData.document.drivingLicense.expiryDate
                          )
                        : "N/A"}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-5 w-full">
                    <div>
                      <div>
                        <p className="text-center text-xs">Front Side </p>
                        {workerData?.document?.drivingLicense?.frontDocument ? (
                          <a
                            target="_blank"
                            className="text-xs px-3 w-fit py-1 bg-[#1B666C] text-white rounded hover:bg-teal-700"
                            href={
                              BASE_URL +
                              workerData?.document?.drivingLicense
                                ?.frontDocument
                            }
                          >
                            View document
                          </a>
                        ) : (
                          <span className="text-xs px-3 w-fit py-1 bg-red-500 text-white rounded">
                            No document
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="text-center text-xs">Back side </p>
                        {workerData?.document?.drivingLicense?.backDocument ? (
                          <a
                            target="_blank"
                            className="text-xs px-3 w-fit py-1 bg-[#1B666C] text-white rounded hover:bg-teal-700"
                            href={
                              BASE_URL +
                              workerData?.document?.drivingLicense?.backDocument
                            }
                          >
                            View document
                          </a>
                        ) : (
                          <span className="text-xs px-3 w-fit py-1 bg-red-500 text-white rounded">
                            No document
                          </span>
                        )}
                      </div>
                    </div>
                    {getVerificationIcon(
                      workerData?.document?.drivingLicense?.isVerifyed
                    )}
                    {!isAppliedView && (
                      <Dropdown
                        overlay={
                          <Menu>
                            <Menu.Item
                              onClick={() =>
                                handleApprove("drivingLicense", "approved")
                              }
                              key="1"
                            >
                              Approve
                            </Menu.Item>
                            <Menu.Item
                              onClick={() => showRejectModal("drivingLicense")}
                              key="2"
                            >
                              Not Approve
                            </Menu.Item>
                          </Menu>
                        }
                        trigger={["click"]}
                      >
                        <HiDotsVertical className="cursor-pointer" />
                      </Dropdown>
                    )}
                  </div>
                </div>

                {/* Car Insurance Certificate */}
                <div className="flex justify-start items-center gap-4 pb-3 ">
                  <div className="w-full">
                    Car Insurance Certificate
                    <p className="text-xs text-gray-400">
                      Expire date{" "}
                      {workerData?.document?.carInsuranceCertificate?.expiryDate
                        ? formatDate(
                            workerData.document.carInsuranceCertificate
                              .expiryDate
                          )
                        : "N/A"}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-5 w-full">
                    <div>
                      <p className="text-center text-xs">Document</p>
                      {workerData?.document?.carInsuranceCertificate
                        ?.certificate ? (
                        <a
                          target="_blank"
                          className="text-xs px-3 w-fit py-1 bg-[#1B666C] text-white rounded hover:bg-teal-700"
                          href={
                            BASE_URL +
                            workerData?.document?.carInsuranceCertificate
                              ?.certificate
                          }
                        >
                          View document
                        </a>
                      ) : (
                        <span className="text-xs px-3 w-fit py-1 bg-red-500 text-white rounded">
                          No document
                        </span>
                      )}
                    </div>
                    {getVerificationIcon(
                      workerData?.document?.carInsuranceCertificate?.isVerifyed
                    )}
                    {!isAppliedView && (
                      <Dropdown
                        overlay={
                          <Menu>
                            <Menu.Item
                              onClick={() =>
                                handleApprove(
                                  "carInsuranceCertificate",
                                  "approved"
                                )
                              }
                              key="1"
                            >
                              Approve
                            </Menu.Item>
                            <Menu.Item
                              onClick={() =>
                                showRejectModal("carInsuranceCertificate")
                              }
                              key="2"
                            >
                              Not Approve
                            </Menu.Item>
                          </Menu>
                        }
                        trigger={["click"]}
                      >
                        <HiDotsVertical className="cursor-pointer" />
                      </Dropdown>
                    )}
                  </div>
                </div>

                {/* Police Check or NDIS */}
                <h3 className="font-bold border-b border-gray-300 pb-1 mb-3">
                  Checks:
                </h3>
                {workerData?.document?.policeCheck?.map((check, index) => (
                  <div
                    key={index}
                    className="flex justify-start items-center gap-4 pb-2 "
                  >
                    <div className=" w-full">
                      {check.type || "N/A"}
                      <p className="text-xs text-gray-400">
                        Publish date{" "}
                        {check.publishDate
                          ? formatDate(check.publishDate)
                          : "N/A"}
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-5 w-full">
                      <div>
                        <p className="text-center text-xs">Document</p>
                        {check.document ? (
                          <a
                            target="_blank"
                            className="text-xs px-3 w-fit py-1 bg-[#1B666C] text-white rounded hover:bg-teal-700"
                            href={BASE_URL + check.document}
                          >
                            View document
                          </a>
                        ) : (
                          <span className="text-xs px-3 w-fit py-1 bg-red-500 text-white rounded">
                            No document
                          </span>
                        )}
                      </div>
                      {getVerificationIcon(check.isVerifyed)}
                      {!isAppliedView && (
                        <Dropdown
                          overlay={
                            <Menu>
                              <Menu.Item
                                onClick={() =>
                                  handleApprove(
                                    "policeCheck",
                                    "approved",
                                    "",
                                    check._id
                                  )
                                }
                                key="1"
                              >
                                Approve
                              </Menu.Item>
                              <Menu.Item
                                onClick={() =>
                                  showRejectModal("policeCheck", check._id)
                                }
                                key="2"
                              >
                                Not Approve
                              </Menu.Item>
                            </Menu>
                          }
                          trigger={["click"]}
                        >
                          <HiDotsVertical className="cursor-pointer" />
                        </Dropdown>
                      )}
                    </div>
                  </div>
                ))}

                {/* First AID/CPR */}
                <h3 className="font-bold border-b border-gray-300 pb-1 mb-3">
                  First AID/CPR:
                </h3>
                {workerData?.document?.firstAid?.map((aid, index) => (
                  <div
                    key={index}
                    className="flex justify-start items-center gap-4 pb-2 "
                  >
                    <div className=" w-full">
                      {aid.type || "N/A"}
                      <p className="text-xs text-gray-400">
                        Expire date{" "}
                        {aid.expiryDate ? formatDate(aid.expiryDate) : "N/A"}
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-5 w-full">
                      <div>
                        <p className="text-center text-xs">Document</p>
                        {aid.document ? (
                          <a
                            target="_blank"
                            className="text-xs px-3 w-fit py-1 bg-[#1B666C] text-white rounded hover:bg-teal-700"
                            href={BASE_URL + aid.document}
                          >
                            View document
                          </a>
                        ) : (
                          <span className="text-xs px-3 w-fit py-1 bg-red-500 text-white rounded">
                            No document
                          </span>
                        )}
                      </div>
                      {getVerificationIcon(aid.isVerifyed)}
                      {!isAppliedView && (
                        <Dropdown
                          overlay={
                            <Menu>
                              <Menu.Item
                                onClick={() =>
                                  handleApprove(
                                    "firstAid",
                                    "approved",
                                    "",
                                    aid._id
                                  )
                                }
                                key="1"
                              >
                                Approve
                              </Menu.Item>
                              <Menu.Item
                                onClick={() =>
                                  showRejectModal("firstAid", aid._id)
                                }
                                key="2"
                              >
                                Not Approve
                              </Menu.Item>
                            </Menu>
                          }
                          trigger={["click"]}
                        >
                          <HiDotsVertical className="cursor-pointer" />
                        </Dropdown>
                      )}
                    </div>
                  </div>
                ))}

                {/* Working with Children */}
                <div className="flex justify-start items-center gap-4 pb-3 ">
                  <div className=" w-full">
                    Working with Children
                    <p className="text-xs text-gray-400">
                      Expire date{" "}
                      {workerData?.document?.workingWithChildren?.expiryDate
                        ? formatDate(
                            workerData.document.workingWithChildren.expiryDate
                          )
                        : "N/A"}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-5 w-full">
                    <div>
                      <p className="text-center text-xs">Document</p>
                      {workerData?.document?.workingWithChildren?.document ? (
                        <a
                          target="_blank"
                          className="text-xs px-3 w-fit py-1 bg-[#1B666C] text-white rounded hover:bg-teal-700"
                          href={
                            BASE_URL +
                            workerData?.document?.workingWithChildren?.document
                          }
                        >
                          View document
                        </a>
                      ) : (
                        <span className="text-xs px-3 w-fit py-1 bg-red-500 text-white rounded">
                          No document
                        </span>
                      )}
                    </div>
                    {getVerificationIcon(
                      workerData?.document?.workingWithChildren?.isVerifyed
                    )}
                    {!isAppliedView && (
                      <Dropdown
                        overlay={
                          <Menu>
                            <Menu.Item
                              onClick={() =>
                                handleApprove("workingWithChildren", "approved")
                              }
                              key="1"
                            >
                              Approve
                            </Menu.Item>
                            <Menu.Item
                              onClick={() =>
                                showRejectModal("workingWithChildren")
                              }
                              key="2"
                            >
                              Not Approve
                            </Menu.Item>
                          </Menu>
                        }
                        trigger={["click"]}
                      >
                        <HiDotsVertical className="cursor-pointer" />
                      </Dropdown>
                    )}
                  </div>
                </div>

                {/* Vaccination */}
                <h3 className="font-bold border-b border-gray-300 pb-1 mb-3">
                  Vaccination:
                </h3>
                {workerData?.document?.vaccination?.map((vaccine, index) => (
                  <div
                    key={index}
                    className="flex justify-start items-center gap-4 pb-2 "
                  >
                    <div className=" w-full">
                      {/* Vaccination */}
                      {vaccine.type || "N/A"}
                      <p className="text-xs text-gray-400">
                        Publish date{" "}
                        {vaccine.publishDate
                          ? formatDate(vaccine.publishDate)
                          : "N/A"}
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-5 w-full">
                      <div>
                        <p className="text-center text-xs">Certificate</p>
                        {vaccine.certificate ? (
                          <a
                            target="_blank"
                            className="text-xs px-3 w-fit py-1 bg-[#1B666C] text-white rounded hover:bg-teal-700"
                            href={BASE_URL + vaccine.certificate}
                          >
                            View document
                          </a>
                        ) : (
                          <span className="text-xs px-3 w-fit py-1 bg-red-500 text-white rounded">
                            No document
                          </span>
                        )}
                      </div>
                      {getVerificationIcon(vaccine.isVerifyed)}
                      {!isAppliedView && (
                        <Dropdown
                          overlay={
                            <Menu>
                              <Menu.Item
                                onClick={() =>
                                  handleApprove(
                                    "vaccination",
                                    "approved",
                                    "",
                                    vaccine._id
                                  )
                                }
                                key="1"
                              >
                                Approve
                              </Menu.Item>
                              <Menu.Item
                                onClick={() =>
                                  showRejectModal("vaccination", vaccine._id)
                                }
                                key="2"
                              >
                                Not Approve
                              </Menu.Item>
                            </Menu>
                          }
                          trigger={["click"]}
                        >
                          <HiDotsVertical className="cursor-pointer" />
                        </Dropdown>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="w-full space-y-8">
              <section>
                <h3 className="font-bold border-b border-gray-300 pb-1 mb-3">
                  Qualification:
                </h3>

                {workerData?.qualification?.map((qual, index) => (
                  <div
                    key={index}
                    className="flex justify-start items-center gap-4 pb-3"
                  >
                    <div className=" w-full">
                      {qual.type || "N/A"}
                      <p className="text-xs text-gray-400">
                        Expire date{" "}
                        {qual.expiryDate ? formatDate(qual.expiryDate) : "N/A"}
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-5 w-full">
                      <div>
                        <p className="text-center text-xs">Certificate</p>
                        {qual.certificate ? (
                          <a
                            target="_blank"
                            className="text-xs px-3 w-fit py-1 bg-[#1B666C] text-white rounded hover:bg-teal-700"
                            href={BASE_URL + qual.certificate}
                          >
                            View document
                          </a>
                        ) : (
                          <span className="text-xs px-3 w-fit py-1 bg-red-500 text-white rounded">
                            No document
                          </span>
                        )}
                      </div>
                      {getVerificationIcon(qual.isVerifyed)}
                      {!isAppliedView && (
                        <Dropdown
                          overlay={
                            <Menu>
                              <Menu.Item
                                onClick={() =>
                                  handleApprove(
                                    "qualification",
                                    "approved",
                                    "",
                                    qual._id
                                  )
                                }
                                key="1"
                              >
                                Approve
                              </Menu.Item>
                              <Menu.Item
                                onClick={() =>
                                  showRejectModal("qualification", qual._id)
                                }
                                key="2"
                              >
                                Not Approve
                              </Menu.Item>
                            </Menu>
                          }
                          trigger={["click"]}
                        >
                          <HiDotsVertical className="cursor-pointer" />
                        </Dropdown>
                      )}
                    </div>
                  </div>
                ))}
              </section>

              {/* Bank Details */}
              <section>
                <h3 className=" border-gray-300 font-semibold pb-1 border-b mb-3 w-8/12">
                  Bank Details
                </h3>
                <div className=" flex gap-8 items-center">
                  <div className="w-1/2">
                    <p>
                      BSB number: {workerData?.bankDetails?.bsbNumber || "N/A"}
                    </p>
                    <p>
                      Account number:{" "}
                      {workerData?.bankDetails?.accountNumber || "N/A"}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    {getVerificationIcon(workerData?.bankDetails?.isVerifyed)}
                    {!isAppliedView && (
                      <Dropdown
                        overlay={
                          <Menu>
                            <Menu.Item
                              onClick={() =>
                                handleApprove("bankDetails", "approved")
                              }
                              key="1"
                            >
                              Approve
                            </Menu.Item>
                            <Menu.Item
                              onClick={() => showRejectModal("bankDetails")}
                              key="2"
                            >
                              Not Approve
                            </Menu.Item>
                          </Menu>
                        }
                        trigger={["click"]}
                      >
                        <HiDotsVertical className="cursor-pointer" />
                      </Dropdown>
                    )}
                  </div>
                </div>
              </section>

              {/* ABN */}
              <section>
                <h3 className="font-semibold border-b w-8/12 border-gray-300 pb-1 mb-3">
                  ABN
                </h3>
                <div className=" flex  gap-8 items-center ">
                  <div className="w-1/2">
                    <p>
                      ABN number: {workerData?.abnDetails?.abnNumber || "N/A"}
                    </p>
                    <p>
                      Business Name:{" "}
                      {workerData?.abnDetails?.businessName || "N/A"}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    {getVerificationIcon(workerData?.abnDetails?.isVerifyed)}
                    {!isAppliedView && (
                      <Dropdown
                        overlay={
                          <Menu>
                            <Menu.Item
                              onClick={() => handleApprove("abn", "approved")}
                              key="1"
                            >
                              Approve
                            </Menu.Item>
                            <Menu.Item
                              onClick={() => showRejectModal("abn")}
                              key="2"
                            >
                              Not Approve
                            </Menu.Item>
                          </Menu>
                        }
                        trigger={["click"]}
                      >
                        <HiDotsVertical className="cursor-pointer" />
                      </Dropdown>
                    )}
                  </div>
                </div>
                {workerData?.abnDetails?.gstRegistered && (
                  <p className=" text-sm text-[#009A3F] font-bold">
                    GST Register
                  </p>
                )}
              </section>
            </section>
          </div>
        </div>
      </div>
      {/*  not approvr modal  */}
      <Modal
        centered
        title="Reason for Rejection"
        open={isRejectModalOpen}
        onCancel={closeRejectModal}
        footer={[
          <Button key="cancel" onClick={closeRejectModal}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              handleApprove(
                currentRejectField,
                "canceled",
                rejectReason,
                currentDocId
              );
              closeRejectModal();
            }}
            disabled={!rejectReason.trim()}
          >
            Submit Rejection
          </Button>,
        ]}
      >
        <TextArea
          rows={4}
          placeholder="Please specify the reason for rejecting this document..."
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          required
        />
      </Modal>
    </>
  );
};

export default ViewProfile;
