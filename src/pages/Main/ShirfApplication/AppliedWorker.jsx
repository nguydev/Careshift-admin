

import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, Table, } from "antd";

import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppliedWorkersQuery, useShiftAssignMutation } from "../../../redux/features/admin/shiftManage/shiftManage";
import LoaderWraperComp from "../../../Components/LoaderWraperComp";
import { FaChevronLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import { errorAlert } from "../../../lib/alerts";

const AppliedWorker = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [query, setQuery] = useState({
        page: 1,
        limit: 10,
    });
    const { data, isLoading, isError, error } = useAppliedWorkersQuery({
        id, args:
            Object.entries(query)
                .filter((value) => value[1])
                .map(([name, value]) => ({ name, value: value.toString() }))
    });
    const [assign] = useShiftAssignMutation()
    const handleAsign = async ({ data, status }) => {
        const toastId = toast.loading(`Loading...`)
        try {
            await assign({
                id: data?.application_id, data: {
                    user: data?.user_id,
                    status
                }
            }).unwrap();
            toast.success(`${status === "approved" ? "Assign" : "Reject"} successful!`, { id: toastId })
            navigate(-1)
        } catch (error) {
            toast.dismiss(toastId)
            errorAlert({ error })
        }
    }
    const columns = [
        {
            title: "SI.No",
            dataIndex: "index",
            key: "index",
            render: (_, __, index) => ((query.page * query.limit) - query.limit) + (index + 1),
        },
        {
            title: "Full Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: 'Residential Address',
            dataIndex: "address",
            key: "address",
        },

        {
            title: 'Appli date',
            dataIndex: "applyDate",
            render: (text) => <span>{new Date(text).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            })}</span>
        },
        {
            title: "Action",
            key: "action",
            render: (record) => (
                <Dropdown
                    menu={{
                        items: [
                            {
                                key: "1",
                                label: <Link to={`/shift-applications/applied-profile/${record?.user_id}?application=${record?.application_id}`}>View profile</Link>,
                            },
                            {
                                key: "2",
                                label: <button onClick={() => handleAsign({ data: record, status: "approved" })} className="outline-none">Assign</button>
                            },
                            {
                                key: "3",
                                label: <button onClick={() => handleAsign({ data: record, status: "canceled" })} className="outline-none">Reject</button>
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
        <div>
            <div className="bg-[#31BAC4] text-white px-6 py-3 rounded-t">
                <button className="flex items-center gap-2.5 text-sm">
                    <FaChevronLeft onClick={() => navigate(-1)} size={15} />
                    <span className="text-xl">View all Applied worker list</span>
                </button>
            </div>
            <div className="rounded-lg rounded-t-none border pb-4 pt-6 px-6 bg-white shadow-lg">

                <LoaderWraperComp isError={isError} isLoading={false} error={error}>
                    <Table
                        loading={isLoading}
                        columns={columns}
                        dataSource={data?.data?.map((item, index) => ({ ...item, key: index }))}
                        rowKey="key"
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
        </div>
    );
};

export default AppliedWorker;
