import { IoIosNotificationsOutline } from "react-icons/io";
import { useState, useEffect } from "react";
import { Button, Pagination, Spin } from "antd";
import { Link } from "react-router-dom";
import { MdOutlineNotificationAdd } from "react-icons/md";
import { useGetNotificationQuery } from "../../../redux/features/notification/notification";

const Notifications = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, refetch } = useGetNotificationQuery({ page, limit });

  const notification = data?.data.notifications || [];
  const pagination = data?.data.pagination || {};

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  return (
    <div className="rounded-lg min-h-screen bg-[#FDFDFD]">
      <div className="flex gap-4 mb-6 bg-[#27C8DD] justify-between items-center p-2">
        <button className="flex items-center justify-center gap-2 p-4 text-white text-2xl">
          All Notifications
        </button >
        <Link to={'push-notification'} className="mr-6"> <Button type="primary" size="large">Push Notification<MdOutlineNotificationAdd /></Button></Link>
      </div>


      <div className="px-[24px] min-h-[60vh]">
        {isLoading ? (
          <div className="flex justify-center items-center h-[40vh]">
            <Spin size="large" />
          </div>
        ) : notification.length === 0 ? (
          <p>No notifications found.</p>
        ) : (
          notification.map((item, index) => (
            <div
              key={index}
              className="group flex items-center gap-4 px-[24px] py-4 cursor-pointer border-b border-blue-50 hover:bg-gray-100 transition-all"
            >
              <IoIosNotificationsOutline
                className="border border-white w-[42px] h-[42px] rounded-lg p-1.5 shadow-sm bg-[#B2DAC4] text-info group-hover:bg-[#b3dfc7]"
              />
              <div className="space-y-[2px]">
                <h6 className="text-lg">{item.msg}</h6>
                <small className="text-[12px] text-gray-500">
                  {new Date(item.createdAt).toLocaleString()}
                </small>
              </div>
            </div>
          ))
        )}
      </div>


      {pagination.totalPage > 1 && (
        <div className="flex justify-center py-4">
          <Pagination
            current={pagination.currentPage || page}
            total={pagination.totalData || 0}
            pageSize={limit}
            onChange={(p) => setPage(p)}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
};

export default Notifications;

