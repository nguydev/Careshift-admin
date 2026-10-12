import { Table } from "antd";
import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useFilteredProfitDetailsQuery } from "../../../redux/features/profitMangement/profitMangement";
import LoaderWraperComp from "../../../Components/LoaderWraperComp";
import { useShortlyShiftDetailsQuery } from "../../../redux/features/admin/shiftManage/shiftManage";


const ProfitDetails = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    startDate: searchParams.get("startDate"),
    endDate: searchParams.get("endDate")
  });
  const { data: shiftData } = useShortlyShiftDetailsQuery(id)
  const { data, isLoading, isError, error } = useFilteredProfitDetailsQuery({
    id, args: Object.entries(query)
      .filter((value) => value[1])
      .map(([name, value]) => ({ name, value: value.toString() }))
  });

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{new Date(text).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}</span>,
      key: "date",
    },
    {
      title: "Work Hours",
      dataIndex: "work_hours",
      key: "work_hours",
      align: "center"
    },


    {
      title: "Travel (Km)",
      dataIndex: "travelKM",
      key: "travelKM",
      align: "center"
    },

    {
      title: "Total Client Pay ",
      dataIndex: "clientPay",
      render: (text) => <span className="capitalize">${text}</span>,
      key: "clientPay",
      align: "center"
    },
    {
      title: "Worker paid",
      dataIndex: "workerPay",
      render: (text) => <span className="capitalize">${text}</span>,
      key: "workerPay",
      align: "center"
    },
    {
      title: 'Profit',
      dataIndex: "profits",
      render: (text) => <span className="capitalize">${text}</span>,
      key: "profits",
      align: "center"
    },

  ];

  return (
    <div className=" space-y-8">
      <div className="flex gap-4 mb-6 bg-[#27C8DD] justify-between items-center p-2">
        <Link to={-1} className="flex items-center justify-center gap-2 p-4 text-white text-2xl">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Earning Details
        </Link >
      </div>
      <p className=" text-[#5E5E5E] text-2xl font-semibold">Shift Details</p>
      <div className="border border-[#27C8DD] rounded-lg p-4 bg-[#EFFFFF]">
        <div className="grid grid-cols-2 gap-4 text-[#5E5E5E]">
          <div className=" space-y-2">
            <p>
              <span className="font-semibold">Client Name</span> : {shiftData?.data?.clientName ?? "N/A"}
            </p>
            <p>
              <span className="font-semibold">Assign Worker Name</span> : {shiftData?.data?.assignedWorkerName ?? "N/A"}
            </p>
            <p>
              <span className="font-semibold">Working Time</span> : {shiftData?.data?.workTime ?? "N/A"}
            </p>
            <p>
              <span className="font-semibold">Date</span> :  {(searchParams.get("startDate") &&
                searchParams.get("endDate")) ? searchParams.get("startDate") - searchParams.get("endDate") : "All days"}
            </p>
          </div>
          <div className=" space-y-2">
            <p>
              <span className="font-semibold">Client Pays for shift</span> : ${shiftData?.data?.clientPayhourlyRate ?? "N/A"}/hrs
            </p>
            <p>
              <span className="font-semibold">Client Pays for Travel</span> : ${shiftData?.data?.clientPaytravelRatePerKm ?? "N/A"}/km
            </p>
            <p>
              <span className="font-semibold">Worker Paid</span> : ${shiftData?.data?.workerHourlyRate ?? "N/A"}/hrs
            </p>
            <p>
              <span className="font-semibold">Worker Travel</span> : ${shiftData?.data?.workerTravelKMRate ?? "N/A"}/km
            </p>
          </div>
        </div>
      </div>
      <LoaderWraperComp isError={isError} isLoading={false} error={error}>
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={data?.data?.map((item, index) => ({ _id: index, ...item }))}
          rowKey="_id"
          pagination={{
            position: ["bottomCenter"],
            current: query.page,
            total: data?.pagination?.totalData,
            pageSize: query.limit,
            onChange: (page) => setQuery((c) => ({ ...c, page }))
          }}
        />
      </LoaderWraperComp>
    </div>
  );
};

export default ProfitDetails;
