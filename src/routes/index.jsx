import { createBrowserRouter, Navigate } from "react-router-dom";
import { dashboardItems } from "../constants/router.constants";
import Auth from "../layouts/Auth/Auth";
import Main from "../layouts/Main/Main";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";
import SignIn from "../pages/Auth/SignIn";
import VerifyEmail from "../pages/Auth/VerifyEmail";
import { routesGenerators } from "../utils/routesGenerators";
import AdminRoutes from "./AdminRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AdminRoutes>
        <Main />
      </AdminRoutes>
    ),
    children: routesGenerators(dashboardItems),
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth",
        element: <Navigate to={"/auth/sign-in"} />,
      },
      {
        path: "/auth/sign-in",
        element: <SignIn />,
      },
      {
        path: "/auth/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/auth/verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "/auth/reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "*",
    //   element: <NotFound />,
  },
]);

export default router;
