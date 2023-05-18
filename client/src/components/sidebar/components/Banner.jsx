import React from "react";
import avatar from "assets/img/avatars/avatar11.png";
import banner from "assets/img/profile/banner.png";
import Card from "components/card";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Banner = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    // <>
    // <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
    <div className="mt-4 flex flex-col items-center">
      <div
      // className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
      // style={{ backgroundImage: `url(${banner})` }}
      >
        <div className=" flex h-[67px] w-[67px] items-center justify-center rounded-full bg-pink-400 dark:!border-navy-700">
          <img className="h-full w-full rounded-full" src={avatar} alt="" />
        </div>
      </div>
      {/* Name and position */}
      <div className="mt-6 flex flex-col items-center">
        <Link to={"/dashboard/profile"}>
          {/* <h4 className="text-xl font-bold text-white">{`${userInfo.firstName} ${userInfo.lastName}`}</h4> */}
          <h4 className="text-xl font-bold text-white">Hamza Sheikh</h4>
          <p className="text-base font-normal text-gray-600">
            {userInfo.role === "User" ? "" : "Full-Stack Dev."}
          </p>
        </Link>
      </div>
    </div>
    // </Card>
    // </>
  );
};

export default Banner;
