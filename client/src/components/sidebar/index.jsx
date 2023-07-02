/* eslint-disable */

import { HiX } from "react-icons/hi";
import Links from "./components/Links";

import SidebarCard from "components/sidebar/componentsrtl/SidebarCard";
import { useEffect, useState } from "react";
import Banner from "./components/Banner";
// import routes from "routes.js";

const Sidebar = ({ currroutes, open, onClose }) => {
  const [routes, setRoutes] = useState([]);
  useEffect(() => {
    setRoutes(currroutes);
    console.log(">>>>>>>", currroutes);
  }, [currroutes]);
  return (
    <div
      className={`sm:none duration-175 linear fixed  !z-50 flex min-h-full w-[263px] flex-col bg-primary  px-4 pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer text-white xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mt-[26px] flex items-center justify-center`}>
        <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
          {/* Horizon <span class="font-medium">FREE</span> */}
          <span className="flex justify-center pb-4">
            <img
              src={require("../../assets/logos/logo_white.png")}
              width={"150"}
            />
          </span>
        </div>
      </div>

      <div class="mt-[210px] mb-5 h-px border-b border-navy-700 bg-white/30" />

      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <Links routes={routes} />
      </ul>

      {/* Free Horizon Card */}
      {/* <div className="flex justify-center">
        <SidebarCard />
      </div> */}

      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;
