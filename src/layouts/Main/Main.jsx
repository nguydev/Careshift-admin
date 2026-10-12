import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Main() {
  return (
    <div className="flex text-start bg-white min-h-screen">
      <div className="">
        <Sidebar />
      </div>
      <div className="flex-1 pl-[326px]">
        <div className="sticky top-0 w-full p-[24px] z-10 ">
          <Header />
        </div>
        <div className="p-[24px] pt-0.5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
