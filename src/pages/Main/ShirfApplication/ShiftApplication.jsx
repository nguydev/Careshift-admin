import { MoreOutlined } from "@ant-design/icons";
import { Button, DatePicker, Dropdown, Input, Table } from "antd";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useShiftApplicationsQuery } from "../../../redux/features/admin/shiftManage/shiftManage";
import LoaderWraperComp from "../../../Components/LoaderWraperComp";
import { BASE_URL } from "../../../../baseUrl";
import { handleImageError } from "../../../lib/handleImageError";
import { debounceSearch } from "../../../utils/debounce";

const ShiftApplication = () => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
  });
  const { data: applicationData, isLoading, isError, error } = useShiftApplicationsQuery(
    Object.entries(query)
      .filter((value) => value[1])
      .map(([name, value]) => ({ name, value: value.toString() }))
  );
  const columns = [
    {
      title: "Client Name",
      dataIndex: "clientName",
      render: (text, data) => (
        <div className="flex items-center gap-x-2">
          <img
            src={BASE_URL + data?.clientImage}
            alt=""
            className="w-[40px] h-[40px] rounded-full"
            onError={handleImageError}
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Frequency",
      dataIndex: "frequency",
      render: (text) => <span className="capitalize">{text}</span>,
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      // key: "startDate",
      render: (text) => <span>{new Date(text).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}</span>
    },
    {
      title: "Candidate ",
      dataIndex: "candidate",
      key: "candidate",
      align: "center"
    },
    {
      title: "Action",
      dataIndex: "shift_id",
      render: (shift_id) => (
        <Dropdown

          menu={{

            items: [
              {
                key: "1",
                label: <Link to={`shift-info/${shift_id}`}>View Shift details </Link>,
              },
              {
                key: "2",
                label: <Link to={`applied-worker/${shift_id}`}>Applied worker</Link>,
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
    <div className="bg-white rounded-lg py-[16px]">
      <div className="">
        <div className="p-4 flex justify-between bg-[#27C8DD]">
          <h3 className="text-2xl font-sans  text-white font-semibol "> Shift Applications </h3>
          <div className="flex justify-end gap-x-4">
            <div className="relative">
              <Input
                allowClear
                onChange={(e) =>
                  debounceSearch({
                    setter: setQuery,
                    newValue: e.target.value,
                    name: "searchQ",
                  })
                }
                style={{ width: 220 }}
                className="focus:outline-none outline-none rounded-full placeholder:text-[#222222] px-3.5 text-sm w-[170px]"
                placeholder="User Name"
              />
              <IoSearch className="absolute right-2 top-2" />
            </div>
            <DatePicker
              allowClear
              onChange={(value) =>
                setQuery((c) => ({ ...c, date: value }))
              }
              placeholder="Date"
              style={{ width: "150px" }}
              className="custom-datepicker rounded-full text-[#222222] px-3.5 text-sm"
            />
          </div>
        </div>
        <LoaderWraperComp isError={isError} isLoading={false} error={error}>
          <Table
            loading={isLoading}
            columns={columns}
            rowKey="shift_id"
            dataSource={applicationData?.data}
            pagination={{
              position: ["bottomCenter"],
              current: query.page,
              total: applicationData?.pagination?.totalData,
              pageSize: query.limit,
              onChange: (page) => setQuery((c) => ({ ...c, page }))
            }}
          />
        </LoaderWraperComp>

      </div>
    </div>
  );
};

export default ShiftApplication;
