import { Select } from "antd";
import { scheduleData } from "./data";


const dates = [
    { date: "2025-01-14", day: "Mon", dayNum: 14 },
    { date: "2025-01-15", day: "Tue", dayNum: 15 },
    { date: "2025-01-16", day: "Wed", dayNum: 16 },
    { date: "2025-01-17", day: "Thu", dayNum: 17 },
    { date: "2025-01-18", day: "Fri", dayNum: 18 },
    { date: "2025-01-19", day: "Sat", dayNum: 19 },
    { date: "2025-01-20", day: "Sun", dayNum: 20 },
];

const ClientSchedule = () => {
    const { Option } = Select;
    return (
        <div className="max-w-full overflow-x-auto font-sans">
            <div className="bg-[#27C8DD] text-white flex items-center font-medium sticky top-0  p-4">
                <p className="w-44 text-2xl">Schedule</p>
                <Select
                    className="ml-2 mr-auto rounded px-2 py-1"
                    defaultValue="client-schedule"
                    style={{ width: 150 }}
                    onChange={(value) => {
                        window.location.href = value;
                    }}
                >
                    <Option value="/client-schedule">For Client</Option>
                    <Option value="/worker-schedule">For Worker</Option>
                </Select>
                <Select
                    className="ml-2 rounded px-2 py-1"
                    defaultValue="Week 1"
                    style={{ width: 100 }}
                >
                    <Option value="Week 1">Week 1</Option>
                    <Option value="Week 2">Week 2</Option>
                </Select>
                <Select
                    className="ml-2 rounded px-2 py-1"
                    defaultValue="January"
                    style={{ width: 120 }}
                >
                    <Option value="January">January</Option>
                    <Option value="February">February</Option>
                </Select>
                <Select
                    className="ml-2 rounded px-2 py-1"
                    defaultValue="2025"
                    style={{ width: 100 }}
                >
                    <Option value="2025">2025</Option>
                    <Option value="2026">2026</Option>
                </Select>
            </div>;

            <table className="border-collapse w-full min-w-[900px] table-fixed">
                <thead>
                    <tr>
                        <th
                            className="border-r border-gray-300 bg-gray-100 sticky left-0  w-40 px-2 py-4 text-[#0C4479]"
                        >
                            Date /
                            Worker
                        </th>
                        {dates.map(({ dayNum, day }) => (
                            <th
                                key={dayNum}
                                className="border border-gray-200 bg-gray-100 text-center font-semibold text-sm px-2 py-3"
                            >
                                <div>{dayNum}</div>
                                <div className="text-xs text-gray-600">{day}</div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {scheduleData.map(({ id, name, avatar, schedules }) => (
                        <tr key={id} className="border-b border-gray-200">
                            <td
                                className="border-r border-gray-300 sticky left-0 bg-white flex items-center gap-2 px-2 py-3 text-[#0C4479] font-medium text-sm"
                                style={{ minWidth: 160 }}
                            >
                                <img
                                    src={avatar}
                                    alt={name}
                                    className="w-9 h-9 rounded-full object-cover "
                                />
                                {name}
                            </td>
                            {dates.map(({ date }) => {
                                const daySchedule = schedules.find(s => s.date === date);
                                return (
                                    <td key={date} className="align-top p-2 bg-white border">
                                        <div className="flex flex-col gap-1 justify-center items-center  ">
                                            {daySchedule?.shifts.map(({ name: shiftName, time }, idx) => (
                                                <div key={idx}
                                                    className=" bg-[#F2FBFF] w-full px-4 py-2 "
                                                >
                                                    <p className="font-semibold text-[#313131]">{shiftName}</p>
                                                    <p className="text-[9px] text-[#3D6994]">{time} </p>

                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientSchedule;
