import { useLocation, Navigate, Outlet } from "react-router-dom";
import { Can } from "./can";

export const PrivateRoute = () => {
  const location = useLocation();
  return (
    <>
      <Can  not I="manage" a="all">
        <Navigate to="/not-authorized" state={{ from: location }} replace />
      </Can>
      <Can I="manage" a="all" >
        <Outlet />
      </Can>
    </>
  );
};

export default PrivateRoute;
