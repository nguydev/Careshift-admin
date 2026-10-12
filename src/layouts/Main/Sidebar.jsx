import { createElement, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineArrowRight } from "react-icons/md";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../../assets/images/logo1.png";
import { dashboardItems } from "../../constants/router.constants";
import { cn } from "../../lib/utils";
import { logOut } from "../../redux/features/authantication/authanticationSlice";
import { useAppDispatch } from "../../redux/hooks";
import { routeLinkGenerators } from "../../utils/routeLinkGenerators";

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [openNome, setOpenNome] = useState({});

  const handleLogOut = () => {
    Swal.fire({
      text: "Are you sure you want to logout?",
      showCancelButton: true,
      confirmButtonText: "     Sure    ",
      cancelButtonText: "Cancel",
      showConfirmButton: true,
      confirmButtonColor: "#DC2626",
      reverseButtons: true,
    }).then((res) => {
      if (res.isConfirmed) {
        dispatch(logOut());
        navigate("/auth");
      }
    });
  };

  return (
    <div className="fixed top-0 left-0 w-[326px] min-h-screen h-full p-6 pr-0 ">
      <div className="h-full flex flex-col justify-between  bg-[#0C4479]  pt-[50px] border drop-shadow rounded-lg  text-white">
        <div className="space-y[24px">
          <div className="px-[38px] ">
            <img className=" mx-auto" src={logo} alt="" />
            <p className=" font-semibold text-center">Corer finder AU</p>
          </div>
          <ul className="mt-10 max-h-[650px] overflow-y-auto space-y-1 xl:space-y-2 px-4">
            {routeLinkGenerators(dashboardItems).map(
              ({ name, icon, path, children, rootPath }, indx) =>
                children?.length ? (
                  <li key={indx} className="overflow-hidden">
                    <button
                      onClick={() => {
                        setOpenNome((c) => ({
                          name: c?.name === name ? null : name,
                        }));
                      }}
                      className={cn(
                        "outline-none hover:text-white text-[20px] hover:bg-[linear-gradient(90deg,#27C8DD,#0C4479)] w-full px-4 py-3 flex items-center justify-between gap-3 text-lg transition-all rounded-lg",
                        {
                          "bg-[linear-gradient(90deg,#27C8DD,#0C4479)] text-white":
                            name === openNome?.name ||
                            (location.pathname.includes(rootPath) &&
                              !openNome.name),
                        }
                      )}
                    >
                      <div className="flex items-center justify-start gap-3">
                        <div>{createElement(icon, { size: "20" })}</div>
                        <span>{name}</span>
                      </div>
                      <MdOutlineArrowRight
                        className={cn("text-gray-500", {
                          "rotate-90 text-white":
                            name === openNome?.name ||
                            (location.pathname.includes(rootPath) &&
                              !openNome.name),
                        })}
                        size={23}
                      />
                    </button>
                    <div
                      className={cn(
                        "pl-8 pr-6 space-y-0.5 h-0 overflow-hidden",
                        {
                          "h-fit pt-1":
                            name === openNome?.name ||
                            (location.pathname.includes(rootPath) &&
                              !openNome.name),
                        }
                      )}
                    >
                      {children?.map(({ subName, subPath, subIcon }, inx) => (
                        <NavLink
                          key={inx}
                          to={subPath}
                          className={({ isActive }) =>
                            isActive
                              ? "bg-[linear-gradient(90deg,#27C8DD,#0C4479)] text-white" +
                                " w-full px-4 py-1 flex items-center justify-start gap-3 transition-all rounded-sm"
                              : "text-[#646464] hover:text-white hover:bg-[linear-gradient(90deg,#27C8DD,#0C4479)]" +
                                " w-full px-4 py-1 flex items-center justify-start gap-3 transition-all rounded-sm text-white"
                          }
                        >
                          <div>{createElement(subIcon, { size: "17" })}</div>
                          <span> {subName}</span>
                        </NavLink>
                      ))}
                    </div>
                  </li>
                ) : (
                  <li
                    onClick={() => {
                      setOpenNome((c) => ({
                        name: c?.name === name ? null : name,
                      }));
                    }}
                    key={indx}
                  >
                    <NavLink
                      to={path}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-[linear-gradient(90deg,#27C8DD,#0C4479)] text-white" +
                            " w-full px-4 py-3 flex items-center justify-start gap-3 text-lg transition-all rounded-lg"
                          : " hover:text-white text-[20px] hover:bg-[linear-gradient(90deg,#27C8DD,#0C4479)]" +
                            " w-full px-4 py-3 flex items-center justify-start gap-3 text-lg transition-all rounded-lg"
                      }
                    >
                      <div>{createElement(icon, { size: "20" })}</div>
                      <span> {name}</span>
                    </NavLink>
                  </li>
                )
            )}
          </ul>
        </div>
        <div className="p-4 mt-auto text-center ">
          <button
            onClick={handleLogOut}
            className="bg-light-gray w-full  bg-[#093056]   font-semibold px-4 py-3 flex items-center justify-start gap-3 text-lg outline-none rounded-lg"
          >
            <FiLogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
