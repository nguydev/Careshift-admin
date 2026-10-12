
import { useEffect, useState } from "react";
import { useReportIncedentQuery } from "../../redux/features/admin/settingsApi";
import LoaderWraperComp from "../../Components/LoaderWraperComp";
import { Pagination } from "antd";

const reports = [
    {
        id: 1,
        name: "Cameron Williamson",
        email: "abc100@gmail.com",
        role: "Client",
        phone: "(880) 16344-25785",
        serviceStatus: "Yes",
        incidentDate: "17-06-25",
        incidentTime: "09:00 AM",
        incidentDetails:
            "I was providing support at my client Mr. Rahim's home. During the service, the client suddenly felt dizzy and fell. While falling, he hit the side of a table and sustained a small cut on his head.",
        injuries:
            "Mr. Rahim had a cut on his head and some bleeding. Immediate first aid was administered. He is currently stable but should remain under observation.",
        actions:
            "I administered first aid and called his family member for support. I also prepared to call an ambulance if needed. The incident was documented and reported to my supervisor.",
        witnesses:
            "The client's wife, Mrs. Rahim, was present at the time and witnessed the entire incident.",
        actionRequest:
            "I would like Mable to review this incident and provide safety guidance or training to help prevent similar situations in the future.",
    },
    {
        id: 2,
        name: "Darrell Steward",
        email: "abc100@gmail.com",
        role: "Client",
        phone: "(880) 16344-25785",
        serviceStatus: "Yes",
        incidentDate: "17-06-25",
        incidentTime: "09:00 AM",
        incidentDetails:
            "Sample incident details for Darrell Steward.",
        injuries:
            "Sample injuries for Darrell Steward.",
        actions:
            "Sample actions taken for Darrell Steward.",
        witnesses:
            "Sample witnesses for Darrell Steward.",
        actionRequest:
            "Sample action request for Darrell Steward.",
    },
    {
        id: 3,
        name: "Brooklyn Simmons",
        email: "abc100@gmail.com",
        role: "Client",
        phone: "(880) 16344-25785",
        serviceStatus: "Yes",
        incidentDate: "17-06-25",
        incidentTime: "09:00 AM",
        incidentDetails:
            "Sample incident details for Brooklyn Simmons.",
        injuries:
            "Sample injuries for Brooklyn Simmons.",
        actions:
            "Sample actions taken for Brooklyn Simmons.",
        witnesses:
            "Sample witnesses for Brooklyn Simmons.",
        actionRequest:
            "Sample action request for Brooklyn Simmons.",
    },
    // Add others similarly...
];

const AllReport = () => {

    const [query, setQuery] = useState({
        page: 1,
        limit: 10
    });
    const [selectedReport, setSelectedReport] = useState(null);
    const { data, isLoading, isError, error } = useReportIncedentQuery(Object.entries(query)
        .filter((value) => value[1])
        .map(([name, value]) => ({ name, value: value.toString() })));
    useEffect(() => {
        setSelectedReport(data?.data?.[0])
    }, [data?.data])
    return (
        <div>
            <div className="p-4 font-bold text-lg border-b text-white border-cyan-200 bg-[#27C8DD]">
                Report an incident
            </div>
            <LoaderWraperComp isLoading={isLoading} isError={isError} error={error} className={"h-[70vh]"}>
                <div className="flex h-full font-sans text-black relative ">
                    {/* Left sidebar */}
                    <div className="w-1/3 h-[70vh] sticky top-28 left-0 border-r ">
                        <ul className="max-h-[73vh] overflow-y-scroll">
                            {data?.data?.map((report) => (
                                <li
                                    key={report._id}
                                    onClick={() => setSelectedReport(report)}
                                    className={`cursor-pointer p-4 border-b border-cyan-200 ${selectedReport?._id === report._id
                                        ? "bg-[#EAF8F9] font-semibold"
                                        : ""
                                        }`}
                                >
                                    <div>{report.name}</div>
                                    <div className="text-xs text-gray-600">{report?.email}</div>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-center pt-4">
                            <Pagination size="small" position={["bottomCenter"]}
                                current={query.page}
                                total={data?.pagination?.totalData}
                                pageSize={query.limit}
                                onChange={(page) => setQuery((c) => ({ ...c, page }))}
                            />
                        </div>
                    </div>

                    {/* Right details panel */}
                    {
                        selectedReport ?
                            <div className="w-2/3 bg-[#F2FBFF] p-8 h-full">
                                <h2 className="font-semibold text-xl mb-2">{selectedReport?.name}</h2>
                                <div className="text-sm text-gray-700 mb-6">{selectedReport?.email}</div>
                                <div className="text-sm mb-2 capitalize">
                                    <span className="font-semibold">Role</span> : {selectedReport.role}
                                </div>
                                <div className="text-sm mb-2">
                                    <span className="font-semibold">Phone</span> : {selectedReport.phone}
                                </div>
                                <div className="text-sm mb-2">
                                    <span className="font-semibold">Service Status at Time of Incident</span> :{" "}
                                    {selectedReport.incidentDuringArrangedService ? "Yes" : "No"}
                                </div>
                                <div className="text-sm mb-4 flex gap-8">
                                    <div>
                                        <span className="font-semibold">Incident date</span> : {new Date(selectedReport.incidentDate).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric"
                                        })}
                                    </div>
                                    <div>
                                        <span className="font-semibold">Incident time</span> : {new Date(selectedReport.incidentDate).toLocaleTimeString("en-US", {
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="font-semibold mb-1">Incident details</div>
                                    <textarea
                                        readOnly
                                        rows={4}
                                        value={selectedReport.incidentDetails}
                                        className="w-full p-2 rounded-md  border border-cyan-200 resize-none text-sm"
                                    />
                                </div>

                                <div className="mb-4">
                                    <div className="font-semibold mb-1">
                                        Provide details of any injuries sustained as a result of the incident
                                    </div>
                                    <textarea
                                        readOnly
                                        rows={4}
                                        value={selectedReport.injuriesDetailsFromIncident}
                                        className="w-full p-2 rounded-md  border border-cyan-200 resize-none text-sm"
                                    />
                                </div>

                                <div className="mb-4">
                                    <div className="font-semibold mb-1">Actions you have taken in response to the incident</div>
                                    <textarea
                                        readOnly
                                        rows={4}
                                        value={selectedReport.actionsTaken}
                                        className="w-full p-2 rounded-md  border border-cyan-200 resize-none text-sm"
                                    />
                                </div>

                                <div className="mb-4">
                                    <div className="font-semibold mb-1">List details of any witnesses</div>
                                    <textarea
                                        readOnly
                                        rows={3}
                                        value={selectedReport.witnessDetails}
                                        className="w-full p-2 rounded-md  border border-cyan-200 resize-none text-sm"
                                    />
                                </div>

                                <div className="mb-4">
                                    <div className="font-semibold mb-1">What action would you like Mable to take?</div>
                                    <textarea
                                        readOnly
                                        rows={4}
                                        value={selectedReport.desiredActionByMable}
                                        className="w-full p-2 rounded-md  border border-cyan-200 resize-none text-sm"
                                    />
                                    <div className="font-semibold mb-1">What action would you like Mable to take?</div>
                                    <textarea
                                        readOnly
                                        rows={4}
                                        value={selectedReport.desiredActionByMable}
                                        className="w-full p-2 rounded-md  border border-cyan-200 resize-none text-sm"
                                    />
                                    <div className="font-semibold mb-1">What action would you like Mable to take?</div>
                                    <textarea
                                        readOnly
                                        rows={4}
                                        value={selectedReport.desiredActionByMable}
                                        className="w-full p-2 rounded-md  border border-cyan-200 resize-none text-sm"
                                    />
                                    <div className="font-semibold mb-1">What action would you like Mable to take?</div>
                                    <textarea
                                        readOnly
                                        rows={4}
                                        value={selectedReport.desiredActionByMable}
                                        className="w-full p-2 rounded-md  border border-cyan-200 resize-none text-sm"
                                    />
                                    <div className="font-semibold mb-1">What action would you like Mable to take?</div>
                                    <textarea
                                        readOnly
                                        rows={4}
                                        value={selectedReport.desiredActionByMable}
                                        className="w-full p-2 rounded-md  border border-cyan-200 resize-none text-sm"
                                    />
                                    <div className="font-semibold mb-1">What action would you like Mable to take?</div>
                                    <textarea
                                        readOnly
                                        rows={4}
                                        value={selectedReport.desiredActionByMable}
                                        className="w-full p-2 rounded-md  border border-cyan-200 resize-none text-sm"
                                    />
                                    <div className="font-semibold mb-1">What action would you like Mable to take?</div>
                                    <textarea
                                        readOnly
                                        rows={4}
                                        value={selectedReport.desiredActionByMable}
                                        className="w-full p-2 rounded-md  border border-cyan-200 resize-none text-sm"
                                    />
                                    <div className="font-semibold mb-1">What action would you like Mable to take?</div>
                                    <textarea
                                        readOnly
                                        rows={4}
                                        value={selectedReport.desiredActionByMable}
                                        className="w-full p-2 rounded-md  border border-cyan-200 resize-none text-sm"
                                    />
                                    <div className="font-semibold mb-1">What action would you like Mable to take?</div>
                                    <textarea
                                        readOnly
                                        rows={4}
                                        value={selectedReport.desiredActionByMable}
                                        className="w-full p-2 rounded-md  border border-cyan-200 resize-none text-sm"
                                    />
                                    <div className="font-semibold mb-1">What action would you like Mable to take?</div>
                                    <textarea
                                        readOnly
                                        rows={4}
                                        value={selectedReport.desiredActionByMable}
                                        className="w-full p-2 rounded-md  border border-cyan-200 resize-none text-sm"
                                    />

                                </div>
                            </div> :
                            <div className="flex justify-center items-center h-full w-full min-h-[40vh]">
                                <p>Select one!</p>
                            </div>
                    }
                </div>

            </LoaderWraperComp>
        </div>
    );
};

export default AllReport;

