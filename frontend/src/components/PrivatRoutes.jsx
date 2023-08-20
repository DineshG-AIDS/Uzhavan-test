import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivatRoutes = () => {
  const { userInfo } = useSelector((state) => state.user);

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivatRoutes;
