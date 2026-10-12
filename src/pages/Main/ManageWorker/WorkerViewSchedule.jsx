import { DatePicker, Spin } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { useParams } from "react-router-dom";
import LoaderWraperComp from "../../../Components/LoaderWraperComp";
import { useGetWorkerScheduleQuery } from "../../../redux/features/admin/manageWorker/manageWorkerApi";

export default function WorkerViewSchedule() {
  const { id } = useParams();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(dayjs());

  // Format month for API call (YYYY-MM format)
  const getApiMonth = () => {
    return selectedMonth.format("YYYY-MM");
  };
  console.log(getApiMonth());

  const {
    data: apiResponse,
    isLoading,
    isError,
    error,
  } = useGetWorkerScheduleQuery({
    id,
    date: getApiMonth(),
  });

  // Update currentDate when selectedMonth changes
  useEffect(() => {
    setCurrentDate(selectedMonth.toDate());
  }, [selectedMonth]);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex justify-center items-center h-full">
          <Spin size="large" />
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">Error loading schedule</div>
      </div>
    );
  }

  const apiData = apiResponse || { data: [] };

  // Get calendar data
  const getCalendarData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));

    const days = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  const getBookingsForDate = (date) => {
    if (!apiData?.data) return [];

    const dateStr = date.toISOString().split("T")[0];
    const booking = apiData.data.find((item) => {
      const itemDateStr = new Date(item.date).toISOString().split("T")[0];
      return itemDateStr === dateStr;
    });
    return booking ? booking.data : [];
  };

  const formatMonth = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const handleMonthChange = (date) => {
    if (date) {
      setSelectedMonth(date);
    }
  };

  const isCurrentMonth = (date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const calendarDays = getCalendarData();
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div className=" mx-auto p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center">
          <IoChevronBack
            className="w-6 h-6 text-primary cursor-pointer hover:text-teal-600"
            // onClick={() => navigateMonth(-1)}
            onClick={() => window.history.back()}
          />
          <h2 className="text-2xl font-semibold text-primary mx-4">Schedule</h2>
        </div>
        <div className="flex items-center space-x-4">
          <DatePicker
            picker="month"
            value={selectedMonth}
            onChange={handleMonthChange}
            format="MMMM YYYY"
            className="min-w-[140px]"
            placeholder="Select Month"
          />
          <div className="bg-primary text-white px-4 py-2 rounded-lg font-medium">
            {formatMonth(currentDate)}
          </div>
        </div>
      </div>

      <LoaderWraperComp isError={isError} isLoading={false} error={error}>
        {/* Calendar Grid */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Week Days Header */}
          <div className="grid grid-cols-7 border-b border-gray-200">
            {weekDays.map((day, index) => (
              <div
                key={index}
                className="p-3 text-center font-medium text-gray-600 bg-gray-50"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7">
            {calendarDays.map((date, index) => {
              const bookings = getBookingsForDate(date);
              const isOtherMonth = !isCurrentMonth(date);

              return (
                <div
                  key={index}
                  className={`h-[150px] border-b border-r border-gray-200 p-2 overflow-y-scroll ${
                    isOtherMonth ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <div
                    className={`text-sm font-medium mb-2 ${
                      isOtherMonth ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    {String(date.getDate()).padStart(2, "0")}
                  </div>

                  {/* Bookings */}
                  <div className="space-y-1">
                    {bookings.length === 0 ? (
                      <>
                        <p className="text-sm text-gray-400 italic flex justify-center items-center">
                          No schedule{" "}
                        </p>
                      </>
                    ) : (
                      bookings?.map((booking) => (
                        <div
                          key={booking.id}
                          className="bg-teal-100 text-teal-800 p-1.5 rounded text-xs leading-tight"
                        >
                          <div className="font-medium truncate">
                            {booking.client}
                          </div>
                          <div className="text-xs opacity-75 truncate">
                            {booking.time}
                          </div>
                          <div className="text-xs opacity-75 truncate">
                            {booking.address}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </LoaderWraperComp>
    </div>
  );
}
