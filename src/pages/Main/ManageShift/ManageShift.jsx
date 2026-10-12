import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, Select, Table } from "antd";
import { Option } from "antd/es/mentions";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAllShiftsQuery, useShiftStatusMutation } from "../../../redux/features/admin/shiftManage/shiftManage";
import { debounceSearch } from "../../../utils/debounce";
import LoaderWraperComp from "../../../Components/LoaderWraperComp";
import toast from "react-hot-toast";
import { errorAlert } from "../../../lib/alerts";

const ManageShift = () => {
    const [query, setQuery] = useState({
        page: 1,
        limit: 10,
    });
    const { data, isLoading, isError, error } = useAllShiftsQuery(
        Object.entries(query)
        .filter((value) => value[1])
        .map(([name, value]) => ({ name, value: value.toString() }))
    );
    const [stutasUpdate] = useShiftStatusMutation()
    const handleCancel = async ({ id, status }) => {
        const toastId = toast.loading(`Loading.....`)
        try {
            await stutasUpdate({
                id, data: {
                    status
                }
            }).unwrap();
            toast.success(`${status ? "Cancel" : "Restart"} successful!`, { id: toastId })
        } catch (error) {
            toast.dismiss(toastId)
            errorAlert({ error })
        }
    }
    const columns = [
        {
            title: "Client",
            dataIndex: "clientName",
            key: "clientName",
        },
        {
            title: "Worker",
            dataIndex: "workType",
            render: (text) => <span className="capitalize">{text}</span>,
        },
        {
            title: 'Address',
            dataIndex: "clientFullAddress",
            key: "clientFullAddress",
        },
        {
            title: "Frequency",
            dataIndex: "frequency",
            render: (text) => <span className="capitalize">{text}</span>,
        },
        {
            title: "Start date",
            dataIndex: "startDate",
            render: (text) => <span>{new Date(text).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            })}</span>
        },
        {
            title: "Action",
            dataIndex: "shift_id",
            render: (shift_id, record) => (
                <Dropdown

                    menu={{

                        items: [
                            {
                                key: "1",
                                label: <Link to={`shift-info/${shift_id}`}>View  Shift details </Link>,
                            },
                            ...(!record?.isDeleted
                                ? [{
                                    key: "2",
                                    label: <button onClick={() => handleCancel({ id: shift_id, status: true })} className="outline-none" >Cancel Shift </button>,
                                }]
                                : [{
                                    key: "2",
                                    label: <button onClick={() => handleCancel({ id: shift_id, status: false })} className="outline-none" >Restart Shift </button>,
                                }]
                            ),
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
        <div className="rounded-lg border py-4 px-6 bg-white shadow-lg mt-10 space-y-4">
            <div className=" w-full flex justify-end">
                <Link to={'create-shift'} className=" bg-[#0C4479] text-white text-xl px-4 pb-2 pt-1 rounded-lg "> + Post a new shift </Link >
            </div>
            <div className="flex gap-4 mb-6 bg-[#27C8DD] justify-between items-center p-4">
                <h3 className="text-2xl font-semibold text-white whitespace-pre text-center">Manage Shifts</h3>
                <div className=" flex gap-4 ">
                    <Input
                        onChange={(e) =>
                            debounceSearch({
                                setter: setQuery,
                                newValue: e.target.value,
                                name: "searchQ",
                            })

                        }
                        allowClear
                        placeholder="Client name" className="w-full h-fit"
                        style={{ width: "200px" }}
                    />
                    <Select
                        allowClear
                        onChange={(value) => setQuery((c) => ({ ...c, status: value }))}
                        style={{ width: "140px" }}
                        placeholder="Fillter shift" className="w-full h-fit"
                    >
                        <Option value="all">All </Option>
                        <Option value="new assigned">New Assigned </Option>
                        <Option value="ongoing">Ongoing</Option>
                        <Option value="canceled">Canceled</Option>
                    </Select>
                </div>
            </div>
            <LoaderWraperComp isError={isError} isLoading={false} error={error}>
                <Table
                    loading={isLoading}
                    columns={columns}
                    dataSource={data?.data}
                    rowKey="shift_id"
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

export default ManageShift;
