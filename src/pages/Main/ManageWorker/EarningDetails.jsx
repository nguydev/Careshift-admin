import { Table } from "antd";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { useGetWorkerDailyEarningsQuery } from "../../../redux/features/admin/manageWorker/manageWorkerApi";

export default function EarningDetails() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalAmount, setTotalAmount] = useState(0);
  const [formattedDateRange, setFormattedDateRange] = useState("");

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  const { data: apiResponse, isLoading } = useGetWorkerDailyEarningsQuery({
    id,
    startDate: start,
    endDate: end,
  });

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Process API data when it changes
  useEffect(() => {
    if (apiResponse?.data) {
      // Set total amount
      setTotalAmount(apiResponse.data.total);

      // Format date range for display
      if (start && end) {
        setFormattedDateRange(`${formatDate(start)} to ${formatDate(end)}`);
      }
    }
  }, [apiResponse, start, end]);

  // Create data source for table
  const dataSource =
    apiResponse?.data?.history?.map((item, index) => ({
      key: index,
      date: formatDate(item.date),
      client: item.client,
      amount: `$${item.amount}`,
    })) || [];

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => <div className="text-sm font-semibold">{text}</div>,
    },
  ];

  return (
    <div className="h-screen flex flex-col gap-10">
      <div className="py-5 bg-white text-center flex flex-col justify-center items-center shadow-lg">
        <p className="text-[#5E5E5E]">
          Total amount {formattedDateRange && `(${formattedDateRange})`}
        </p>
        <p className="text-[#0C4479] font-semibold text-2xl">${totalAmount}</p>
      </div>

      <div className="bg-[#27C8DD] py-3 px-4 text-white font-semibold flex items-center gap-2 cursor-pointer">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 font-semibold"
        >
          <FaChevronLeft />
          View Earning Details
        </button>
      </div>

      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={isLoading}
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
          showHeader={true}
        />
      </div>
    </div>
  );
}
