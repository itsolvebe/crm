// import Admin from "layouts/admin";
// import User from "layouts/user";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// import '../styles/profile.css'

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  // if (userInfo.role === "User") return <User />;
  // if (userInfo.role === "Admin") return <Admin />;
  return (
    <div>
      <figure>{userInfo?.firstName.charAt(0).toUpperCase()}</figure>
      <span>
        Welcome <strong>{userInfo?.firstName}!</strong> You can view this page
        because you're logged in
      </span>
    </div>
  );
};

export default ProfileScreen;
