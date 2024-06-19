import { Navigate, Outlet } from "react-router-dom";
import { getItemFromLocalStorage } from "../../api/localStorage";

const ProtectedRoute = () => {
  const authData = getItemFromLocalStorage();

  return authData ? <Outlet /> : <Navigate to="/authorization" />;
};

export default ProtectedRoute;
