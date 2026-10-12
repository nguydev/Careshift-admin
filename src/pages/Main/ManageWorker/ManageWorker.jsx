import { MoreOutlined } from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Input,
  message,
  Modal,
  Select,
  Table,
  Tag,
} from "antd";
import { Option } from "antd/es/mentions";
import { useState } from "react";
import { BiSolidError } from "react-icons/bi";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";
import LoaderWraperComp from "../../../Components/LoaderWraperComp";
import {
  useDeleteWorkerMutation,
  useGetManageWorkersQuery,
} from "../../../redux/features/admin/manageWorker/manageWorkerApi";

const ManageWorker = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);

  const [gender, setGender] = useState();
  const [role, setRole] = useState();
  const [language, setLanguage] = useState();
  const [suburb, setSuburb] = useState();
  const [state, setState] = useState();
  const [worker, setWorker] = useState();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const { data, isLoading, isError, error } = useGetManageWorkersQuery({
    gender,
    role,
    language,
    suburb,
    state,
    searchQ: worker,
    page: currentPage,
    limit: limit,
  });
  const workersData = data?.data || [];

  const [deleteWorker] = useDeleteWorkerMutation();

  const handleFilterGender = (value) => {
    setGender(value);
    // console.log(value);
  };

  const handleFilterRole = (value) => {
    setRole(value);
  };

  const handleFilterLanguage = (value) => {
    setLanguage(value);
  };

  const handleFilterSuburb = (e) => {
    setSuburb(e.target.value);
  };

  const handleFilterState = (value) => {
    setState(value);
  };

  const handleFilterWorkerName = (e) => {
    setWorker(e.target.value);
  };

  const showDeleteModal = (record) => {
    setSelectedClient(record);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteWorker = (id) => {
    try {
      deleteWorker(id).unwrap();
      setIsDeleteModalOpen(false);
      setSelectedClient(null);
      message.success("Worker deleted successfully");
    } catch (error) {
      message.error(error?.data?.message || "Failed to delete worker");
      // console.log(error);
    }

    console.log(id);
  };

  const columns = [
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <p> {text ? text : "N/A"} </p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      // title: <span>Driving L. {dropdownIcon}</span>,
      title: <span>Driving L. </span>,
      dataIndex: "drivingLicense",
      key: "drivingLicense",
      render: (text) => <p>{text === true ? "Yes" : "No"}</p>,
    },
    {
      title: <span>Type of Car Insur.</span>,
      dataIndex: "carInsurance",
      key: "carInsurance",
    },
    {
      title: <span>Status</span>,
      dataIndex: "adminVerifyed",
      key: "adminVerifyed",
      render: (text) => (
        <Tag
          color={text === true ? "green" : "red"}
          className="rounded-full w-28 px-3 py-1 flex items-center gap-1"
        >
          {text === true ? (
            <>
              <MdVerified className="mr-1" /> Verified
            </>
          ) : (
            <>
              <BiSolidError className="mr-1" /> Not Verified
            </>
          )}
        </Tag>
      ),
    },
    {
      title: <span>Last login</span>,
      dataIndex: "lastLogin",
      key: "lastLogin",
      render: (text) => {
        // Convert the text to a Date object
        const lastLoginDate = new Date(text);
        const now = new Date();

        // Calculate the difference in seconds
        const diffInSeconds = Math.floor((now - lastLoginDate) / 1000);

        // Calculate time units
        const minutes = Math.floor(diffInSeconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        // Return appropriate string based on time difference
        if (days > 0) {
          return `${days} day${days > 1 ? "s" : ""} ago`;
        } else if (hours > 0) {
          return `${hours} hour${hours > 1 ? "s" : ""} ago`;
        } else if (minutes > 0) {
          return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
        } else {
          // return "Just now";
          return text;
        }
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                label: (
                  <Link to={`/worker-details/${text?._id}`}>View profile</Link>
                ),
              },
              {
                key: "2",
                label: (
                  <Link to={`/worker-earning/${text?._id}`}>Earning list</Link>
                ),
              },
              {
                key: "3",
                label: (
                  <Link to={`/worker-view-schedule/${text?._id}`}>
                    View Schedule
                  </Link>
                ),
              },
              {
                key: "4",
                label: (
                  <span style={{ color: "red" }}>
                    {/* <button onClick={() => handleDeleteWorker(text?._id)}> */}
                    <button onClick={() => showDeleteModal(text)}>
                      Delete worker
                    </button>
                  </span>
                ),
              },
            ],
          }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <div className="rounded-lg border py-4 px-6 bg-white shadow-lg mt-8">
        <div className="flex  gap-4 mb-6 bg-[#27C8DD] justify-center items-center p-4">
          <h3 className="text-2xl font-semibold text-white whitespace-pre text-center">
            Worker List
          </h3>
          <Select
            placeholder="Select Gender"
            className="w-full h-fit"
            allowClear
            onChange={handleFilterGender}
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
          <Select
            onChange={handleFilterRole}
            allowClear
            placeholder="Select Role"
            className="w-full h-fit"
          >
            <Option value="cleaner">Cleaner</Option>
            <Option value="nurse">Nurse</Option>
            <Option value="carer">Carer</Option>
            <Option value="admin">admin</Option>
          </Select>
          <Select
            placeholder="Language"
            className="w-full h-fit"
            allowClear
            onChange={handleFilterLanguage}
          >
            <Option value="English">English</Option>
            <Option value="Spanish">Spanish</Option>
            <Option value="Tamil">Tamil</Option>
            <Option value="Hindi">Hindi</Option>
            <Option value="Cantonese">Cantonese</Option>
            <Option value="Mandarin (Chinese)">Mandarin (Chinese)</Option>
            <Option value="Arabic">Arabic</Option>
          </Select>
          <Input
            placeholder="Suburb"
            className="w-full h-fit"
            allowClear
            onChange={handleFilterSuburb}
          />
          <Select
            placeholder="Select State"
            className="w-full h-fit"
            allowClear
            onChange={handleFilterState}
          >
            <Option value="VIC"> VIC</Option>
            <Option value="NSW">NSW</Option>
            <Option value="QLD">QLD</Option>
            <Option value="WA ">WA </Option>
            <Option value="SA">SA</Option>
            <Option value="TAS">TAS</Option>
            <Option value="ACT">ACT</Option>
            <Option value="NT">NT</Option>
          </Select>
          <Input
            placeholder="Worker name"
            className="w-full h-fit"
            allowClear
            onChange={handleFilterWorkerName}
          />
        </div>

        <LoaderWraperComp
          isError={isError}
          isLoading={false}
          error={error}
          dataEmpty={workersData.length === 0}
        >
          <Table
            loading={isLoading}
            columns={columns}
            dataSource={workersData}
            rowKey="_id"
            pagination={{
              position: ["bottomCenter"],
              current: currentPage,
              total: data?.pagination?.totalData,
              limit,
              onChange: setCurrentPage,
              showQuickJumper: true,
            }}
          />
        </LoaderWraperComp>
      </div>

      {/* delete modal */}
      <Modal
        open={isDeleteModalOpen}
        onCancel={handleDeleteCancel}
        centered
        footer={[
          <div key="modal-footer" className="flex justify-center gap-4">
            <button
              key="cancel"
              onClick={handleDeleteCancel}
              className="border border-gray-300 rounded-full px-8 py-2 mt-4 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              key="delete"
              onClick={() => handleDeleteWorker(selectedClient?._id)}
              className="bg-red-600 text-white rounded-full px-8 py-2 mt-4 hover:bg-red-700"
            >
              Delete
            </button>
          </div>,
        ]}
      >
        {selectedClient && (
          <div className="space-y-4 mt-4 text-center">
            <p className="text-lg">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{selectedClient.name}</span>?
            </p>
            <p className="text-red-600 font-bold">
              This action cannot be undone.
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ManageWorker;
