import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const currentUser = useSelector((store) => store.user.currentUser);
  return <div>{currentUser ? <Outlet /> : <Navigate to="/sign-in" />}</div>;
};

export default PrivateRoute;
