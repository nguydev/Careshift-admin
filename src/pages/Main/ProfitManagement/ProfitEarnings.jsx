import { Table } from "antd";

import { useState } from "react";
import { Link } from "react-router-dom";
import { images } from "../../../assets";
import { useGetTotalProfitQuery } from "../../../redux/features/profitMangement/profitMangement";
import LoaderWraperComp from "../../../Components/LoaderWraperComp";


const ProfitEarnings = () => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
  });
  const { data, isLoading, isError, error } = useGetTotalProfitQuery(
    Object.entries(query)
      .filter((value) => value[1])
      .map(([name, value]) => ({ name, value: value.toString() }))
  );
  const onFinish = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());
    setQuery(c => ({ ...c, ...formValues }))
  }
  const columns = [
    {
      title: "SI.No",
      dataIndex: "clientName",
      key: "clientName",
      render: (text, record, index) => (query.page - 1) * query.limit + index + 1,
    },
    {
      title: "Client",
      dataIndex: "clientName",
      key: "clientName",
    },

    {
      title: "Frequency",
      dataIndex: "frequency",
      render: (text) => <span className="capitalize">{text}</span>,
      key: "frequency",
    },

    {
      title: "Start date",
      dataIndex: "startDate",
      render: (text) => <span>{new Date(text).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}</span>,
      key: "startDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => <span className="capitalize">{text}</span>,
      align: "center"
    },
    {
      title: 'Profit',
      dataIndex: "profit",
      render: (text) => <span className="capitalize">${text}</span>,
      key: "profit",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Link to={`/profit-management/profit-details/${record?.shift_id}${(query?.startDate && query?.endDate) ? `?startDate=${query?.startDate}&endDate=${query?.endDate}` : ""}`}>
          <button className="bg-[#0C4479] px-6 py-1 rounded text-white">
            View More
          </button>
        </Link>
      ),
      align: "center"
    },
  ];

  return (
    <div className="rounded-lg py-4 px-6 bg-white shadow-lg mt-8 space-y-10">
      <div className="flex justify-between items-center">
        <form onSubmit={onFinish} className="bg-[#F5FBFF] p-4 rounded-lg flex-1 mr-4 h-52">
          <h3 className="text-lg font-semibold mb-2">Shift filtering</h3>
          <div className="flex gap-4">
            <div className="flex flex-col w-full">
              <label className="text-sm text-gray-600 mb-1">From</label>
              <input
                type="date"
                name="startDate"
                className="border rounded px-3 py-2 text-sm w-full"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="text-sm text-gray-600 mb-1">To</label>
              <input
                type="date"
                name="endDate"
                className="border rounded px-3 py-2 text-sm w-full"
              />
            </div>
          </div>
          <div className="w-full flex justify-center items-center mt-4">
            <button className="bg-[#0C4479] text-white px-16 py-2 rounded self-end">
              Filter
            </button>
          </div>
        </form>
        <div className="bg-[#F5FBFF] p-4 rounded-lg flex-1 flex items-center justify-between h-52 px-8">
          <div>
            <h3 className="text-lg font-semibold">Total Profit</h3>
            <img
              src={images.profit}
              alt="Profit Icon"
              className="w-20 h-20"
            />
          </div>
          <p className="text-5xl font-bold text-[#0C4479]">${data?.data?.totalProfit ?? "N/A"}</p>
        </div>
      </div>
      <div className="flex gap-4 mb-6 bg-[#27C8DD] justify-between items-center p-4">
        <h3 className="text-2xl font-semibold text-white whitespace-pre text-center">
          Profit Management
        </h3>
      </div>
      <LoaderWraperComp isError={isError} isLoading={false} error={error}>
        <Table
          columns={columns}
          dataSource={data?.data?.details}
          loading={isLoading}
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

export default ProfitEarnings;
