import { useGetDetailsQuery } from "app/services/auth/authService";
import { logout } from "features/auth/authSlice";
import { setCredentials } from "features/auth/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// import { useGetDetailsQuery } from "../app/services/auth/authService";
// import { logout, setCredentials } from "../features/auth/authSlice";
// import '../styles/header.css'

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // automatically authenticate user if token is found
  const { data, isFetching } = useGetDetailsQuery("userDetails", {
    pollingInterval: 900000, // 15mins
  });

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

  return (
    <header className="flex justify-between bg-navy-800 px-5 py-3 text-white">
      <div className="flex">
        <span>
          {isFetching
            ? `Fetching your profile...`
            : userInfo !== null
            ? `Logged in as ${userInfo.email}`
            : "You're not logged in"}
          {/* {userInfo && `Logged in as ${userInfo.email}`}
          {userInfo === null && "You're not logged in"} */}
        </span>
        <div className="flex">
          {userInfo ? (
            <button
              className="button mx-3 rounded-sm bg-red-600 px-2 py-1"
              onClick={() => dispatch(logout())}
            >
              Logout
            </button>
          ) : (
            <NavLink className="button" to="/login">
              Login
            </NavLink>
          )}
        </div>
      </div>
      <nav className="navigation">
        <NavLink className={"mx-2"} to="/">
          Home
        </NavLink>
        <NavLink className={"mx-2"} to="/signin">
          Login
        </NavLink>
        <NavLink className={"mx-2"} to="/signup">
          Register
        </NavLink>
        <NavLink className={"mx-2"} to="/dashboard">
          Dashboard
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
