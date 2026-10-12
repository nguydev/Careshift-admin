/* eslint-disable no-unused-vars */
import { Badge } from "antd";
import { useEffect, useRef, useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../baseUrl";

export default function Header() {
  const navigate = useNavigate();
  const loacatin = useLocation();
  const notificationRef = useRef(null);
  const [notificationPopup, setNotificationPopup] = useState(false);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setNotificationPopup(false);
  }, [loacatin.pathname]);

  return (
    <div className="w-full h-[88px] flex justify-between items-center rounded-2xl py-[16px] px-[32px] z-auto bg-[linear-gradient(180deg,#6ADDEA,#17919E)] shadow-sm">
      <div className="text-start   flex items-center justify-center text-white gap-4 ">
        <IoMenu className=" text-3xl" />
        <p className="text-primary">Welcome back!</p>
      </div>
      <div className="flex gap-x-[41px]">
        <div
          // eslint-disable-next-line no-unused-vars
          onClick={(e) => navigate("/notifications")}
          className="relative flex items-center "
        >
          {/* <Badge style={{ backgroundColor: "#ff181f" }} count={1}> */}
          <Badge style={{ backgroundColor: "#ff181f" }}>
            <IoIosNotificationsOutline
              style={{ cursor: "pointer" }}
              className={`text-[#ffadff] border-2 border-primary hover:text-[#1f8d2e] bg-[#ffffff] w-[48px] h-[48px] rounded-full p-2 shadow-sm  font-bold transition-all`}
            />
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <img
              src={`${BASE_URL}${user?.image}`}
              alt=""
              className="rounded-full h-[48px] w-[48px]"
            />
          </div>
          <div className="space-y-0.5 text-right">
            {/* <h5 className="text-[16px] text-primary font-medium">{"RJ"}</h5> */}
            <p className="text-[16px] text-primary">
              {user?.firstName} {user?.lastName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
