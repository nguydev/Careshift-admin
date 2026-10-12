import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoutes = ({ children }) => {
  const location = useLocation();
  const { user} = useSelector((state) => state.auth);
  if (user?.role === "admin") {
    return children;
  }
  return <Navigate state={location.pathname} to="/auth/sign-in" />;
};
AdminRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminRoutes;
