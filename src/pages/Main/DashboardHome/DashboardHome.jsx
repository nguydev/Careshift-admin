import { images } from "../../../assets";
import DashboardHomeTable from "../../../Components/DashboardHomeTable";
import { useDashboardStackQuery } from "../../../redux/features/admin/dashboard/dashboardApi";

const DashboardHome = () => {
  const { data } = useDashboardStackQuery();
  const stackData = data?.data;
  return (
    <div className="space-y-[24px]">
      <div className="grid grid-cols-12 gap-x-[22px]">
        <div className="col-span-3 flex items-center gap-6 shadow-sm border bg-[linear-gradient(180deg,#A2F9FF,#E1FDFF)] text-white px-[24px] py-[16px] rounded-2xl space-y-3">
          <div className=" w-full p-5 space-y-8 text-black">
            <ul className="w-full flex  justify-between">
              <p className="text-4xl font-semibold">
                {" "}
                {stackData?.total_worker ?? "N/A"}{" "}
              </p>
              <img src={images.men} alt="item-image" />
            </ul>
            <h3 className="text-[20px]">Total worker</h3>
          </div>
        </div>
        {/* change for merge */}

        <div className="col-span-3 flex items-center gap-6 shadow-sm border bg-[linear-gradient(180deg,#A2F9FF,#E1FDFF)] text-white px-[24px] py-[16px] rounded-2xl space-y-3">
          <div className=" w-full p-5 space-y-8 text-black">
            <ul className="w-full flex  justify-between">
              <p className="text-4xl font-semibold">
                {" "}
                {stackData?.total_posted_shift ?? "N/A"}{" "}
              </p>
              <img src={images.beg} alt="item-image" />
            </ul>
            <h3 className="text-[20px]">Total shift posted</h3>
          </div>
        </div>

        <div className="col-span-3 flex items-center gap-6 shadow-sm border bg-[linear-gradient(180deg,#A2F9FF,#E1FDFF)] text-white px-[24px] py-[16px] rounded-2xl space-y-3">
          <div className=" w-full p-5 space-y-8 text-black">
            <ul className="w-full flex  justify-between">
              <p className="text-4xl font-semibold">
                {" "}
                {stackData?.total_filled_shift ?? "N/A"}{" "}
              </p>
              <img src={images.men2} alt="item-image" />
            </ul>
            <h3 className="text-[20px]">Shift filled</h3>
          </div>
        </div>

        <div className="col-span-3 flex items-center gap-6 shadow-sm border bg-[linear-gradient(180deg,#A2F9FF,#E1FDFF)] text-white px-[24px] py-[16px] rounded-2xl space-y-3">
          <div className=" w-full p-5 space-y-8 text-black">
            <ul className="w-full flex  justify-between">
              <p className="text-4xl font-semibold">
                {" "}
                {stackData?.total_cancelled_shift ?? "N/A"}{" "}
              </p>
              <img src={images.x} alt="" srcSet="" />
            </ul>
            <h3 className="text-[20px]">Shift cancelled</h3>
          </div>
        </div>
      </div>
      <DashboardHomeTable />
    </div>
  );
};

export default DashboardHome;
