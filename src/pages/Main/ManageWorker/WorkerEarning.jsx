import { Button, message, Table } from "antd";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { images } from "../../../assets";
import LoaderWraperComp from "../../../Components/LoaderWraperComp";
import {
  useGetWorkerMontlyEarningsQuery,
  useWorkerPaymentStatusMutation,
} from "../../../redux/features/admin/manageWorker/manageWorkerApi";

export default function WorkerEarning() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const { id } = useParams();

  const { data, isLoading, isError, error } =
    useGetWorkerMontlyEarningsQuery(id);
  const [workerPayment, { isLoading: isLoadingPay }] =
    useWorkerPaymentStatusMutation();

  // Process API data into table format
  const transformEarningsData = () => {
    if (!data || !data.data) return [];

    return data.data.flatMap((monthGroup) =>
      monthGroup.periods.map((period, index) => ({
        key: `${monthGroup.header}-${index}`,
        dateRange: period.label,
        amount: `$${period.amount}`,
        status: period.status.toLowerCase(), // Convert to lowercase for consistent comparison
        startDate: period.startDate,
        endDate: period.endDate,
      }))
    );
  };

  const dataSource = transformEarningsData();

  const handlePayWorker = async (startDate, endDate, status) => {
    console.log(startDate, endDate);

    try {
      const body = {
        startDate,
        endDate,
        status,
      };
      console.log(body);

      try {
        await workerPayment({ id, body }).unwrap();
        message.success("Payment status updated successfully");
      } catch (error) {
        message.error("Failed to payment status. Please try again.");
      }
    } catch (error) {
      message.error("Failed to update payment status");
    }
  };

  const columns = [
    {
      title: "",
      dataIndex: "icon",
      key: "icon",
      width: 50,
      render: () => <img className="" src={images.dolar} alt="dollar icon" />,
    },
    {
      title: "",
      dataIndex: "dateRange",
      key: "dateRange",
      render: (text) => (
        <div className="text-center text-sm font-semibold text-[#1A2B5B]">
          {text}
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "amount",
      key: "amount",
      render: (text) => <div className="text-sm font-semibold">{text}</div>,
    },
    {
      title: "",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status, record) => (
        <div className="flex gap-4 justify-end">
          {status === "paid" ? (
            <button
              className="bg-gray-400 text-white px-4 py-1 rounded cursor-default"
              disabled
            >
              Paid
            </button>
          ) : (
            <Button
              loading={isLoadingPay}
              onClick={() =>
                handlePayWorker(record.startDate, record.endDate, true)
              }
              className="bg-[#009A3F] text-white px-4 py-1 rounded"
            >
              Pay
            </Button>
          )}
          <Link
            to={`/earning-details?id=${id}&start=${record.startDate}&end=${record.endDate}`}
            className="whitespace-pre bg-[#27C8DD] p-2 text-white rounded"
          >
            View details
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-[#27C8DD] py-3 px-4 text-white font-semibold flex items-center gap-2 cursor-pointer">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 font-semibold"
        >
          <FaChevronLeft />
          View Earning list
        </button>
      </div>
      <div className="flex-grow overflow-auto">
        {/* {dataSource.length > 0 ? ( */}
        <LoaderWraperComp
          isError={isError}
          isLoading={false}
          error={error}
          dataEmpty={dataSource.length === 0}
        >
          <Table
            loading={isLoading}
            columns={columns}
            dataSource={dataSource}
            pagination={{
              position: ["bottomCenter"],
              showQuickJumper: true,
              showSizeChanger: false,
              total: dataSource.length,
              current: currentPage,
              onChange: (page) => setCurrentPage(page),
              pageSize: pageSize,
            }}
            rowClassName={() => "border-b border-gray-200"}
            showHeader={false}
          />
        </LoaderWraperComp>
      </div>
    </div>
  );
}
