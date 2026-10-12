import { BiMessageSquareDetail } from "react-icons/bi";
import { CiSettings, CiUser } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { FaServicestack } from "react-icons/fa6";
import {
  MdManageAccounts,
  MdOutlineAdminPanelSettings,
  MdOutlineSecurityUpdateWarning,
} from "react-icons/md";
import {
  RiCalendarScheduleLine,
  RiDashboardHorizontalFill,
} from "react-icons/ri";
import { TbMessageReport } from "react-icons/tb";
import DashboardHome from "../pages/Main/DashboardHome/DashboardHome";
import CreateShift from "../pages/Main/ManageShift/CreateShift";
import ManageShift from "../pages/Main/ManageShift/ManageShift";
import { default as ShiftDetails } from "../pages/Main/ManageShift/ShiftDetails";
import EarningDetails from "../pages/Main/ManageWorker/EarningDetails";
import ManageWorker from "../pages/Main/ManageWorker/ManageWorker";
import ViewProfile from "../pages/Main/ManageWorker/ViewProfile";
import WorkerEarning from "../pages/Main/ManageWorker/WorkerEarning";
import WorkerViewSchedule from "../pages/Main/ManageWorker/WorkerViewSchedule";
import Notifications from "../pages/Main/Notifications/Notifications";
import ProfitDetails from "../pages/Main/ProfitManagement/ProfitDetails";
import ProfitEarnings from "../pages/Main/ProfitManagement/ProfitEarnings";
import ClientSchedule from "../pages/Main/Schedule/ClientSchedule";
import WorkerSchedule from "../pages/Main/Schedule/WorkerSchedule";
import AppliedWorker from "../pages/Main/ShirfApplication/AppliedWorker";
import ShiftApplication from "../pages/Main/ShirfApplication/ShiftApplication";
import EditMyProfile from "../pages/Profile/EditMyProfile";
import MyProfile from "../pages/Profile/MyProfile";
import AboutUs from "../pages/Settings/AboutUs";
import EditAboutUs from "../pages/Settings/EditAboutUs";
import EditPrivacyPolicy from "../pages/Settings/EditPrivacyPolicy";
import EditTermsConditions from "../pages/Settings/EditTermsConditions";
import PrivacyPolicy from "../pages/Settings/PrivacyPolicy";
import TermsConditions from "../pages/Settings/TermsConditions";
import AllReport from "../pages/report/AllReport";
import PushNotification from "../pages/Main/Notifications/PushNotification";
export const dashboardItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: RiDashboardHorizontalFill,
    element: <DashboardHome />,
  },
  {
    path: "notifications",
    element: <Notifications />,
  },
  {
    name: "Manage Worker",
    path: "manage-worker",
    icon: FaUsers,
    element: <ManageWorker />,
  },
  {
    path: "worker-details/:id",
    element: <ViewProfile />,
  },
  {
    path: "worker-earning/:id",
    element: <WorkerEarning />,
  },
  {
    path: "earning-details",
    element: <EarningDetails />,
  },
  {
    path: "worker-view-schedule/:id",
    element: <WorkerViewSchedule />,
  },
  {
    name: "Shift Applications",
    path: "shift-applications",
    icon: MdOutlineAdminPanelSettings,
    element: <ShiftApplication />,
  },
  {
    path: "/shift-applications/shift-info/:id",
    element: <ShiftDetails />,
  },
  {
    path: "/shift-applications/applied-worker/:id",
    element: <AppliedWorker />,
  },
  {
    path: "/shift-applications/applied-profile/:id",
    element: <ViewProfile />,
  },
  // {
  //   path: "view-applied-profile",
  //   element: <ViewAppliedProfile />,
  // },
  {
    name: "Manage Shift",
    path: "/manage-shift",
    icon: MdManageAccounts,
    element: <ManageShift />,
  },
  {
    path: "/manage-shift/create-shift",
    element: <CreateShift />,
  },
  {
    path: "/manage-shift/shift-info/:id",
    element: <ShiftDetails />,
  },
  {
    // name: "Schedule",
    path: "client-schedule",
    icon: RiCalendarScheduleLine,
    element: <ClientSchedule />,
  },
  {
    path: "worker-schedule",
    element: <WorkerSchedule />,
  },
  {
    name: "Profit Management",
    path: "/profit-management",
    icon: MdOutlineAdminPanelSettings,
    element: <ProfitEarnings />,
  },
  {
    path: "/profit-management/profit-details/:id",
    element: <ProfitDetails />,
  },
  {
    name: "Report an incident",
    path: "all-report",
    icon: TbMessageReport,
    element: <AllReport />,
  },
  {
    name: "Notifications",
    icon: MdOutlineAdminPanelSettings,
    path: "notifications",
    element: <Notifications />,
  },
  {
    path: "/notifications/push-notification",
    element: <PushNotification />,
  },
  {
    name: "Settings",
    rootPath: "settings",
    icon: CiSettings,
    children: [
      {
        name: "Profile",
        path: "settings/profile",
        icon: CiUser,
        element: <MyProfile />,
      },
      {
        path: "settings/profile/edit",
        element: <EditMyProfile />,
      },
      {
        name: "Terms & Services",
        icon: FaServicestack,
        path: "settings/terms-conditions",
        element: <TermsConditions />,
      },
      {
        path: "settings/terms-conditions/edit",
        element: <EditTermsConditions />,
      },
      {
        name: "Privacy Policy",
        icon: MdOutlineSecurityUpdateWarning,
        path: "settings/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "settings/privacy-policy/edit",
        element: <EditPrivacyPolicy />,
      },
      {
        name: "About Us",
        icon: BiMessageSquareDetail,
        path: "settings/about-us",
        element: <AboutUs />,
      },
      {
        path: "settings/about-us/edit",
        element: <EditAboutUs />,
      },
    ],
  },
];
