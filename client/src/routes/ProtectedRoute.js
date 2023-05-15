import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import { loadUser } from "../features/auth/authActions";
import { useEffect } from "react";
// import { loadUser as authLoadUser } from "../features/auth/authSlice";
const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const location = useLocation();
  // show unauthorized screen if no user is found in redux store
  if (!userInfo) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
    // return (
    //   <div className="unauthorized">
    //     <h1>Unauthorized :(</h1>
    //     <span>
    //       <NavLink to="/login">Login</NavLink> to gain access
    //     </span>
    //   </div>
    // );
  }

  return <Outlet />;
};

export default ProtectedRoute;
