import React from "react";

// Admin Imports
import MainDashboard from "views/employee/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/employee/profile";
import DataTables from "views/employee/tables";
import Tickets from "views/employee/tickets";
import RTLDefault from "views/rtl/default";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";
import TicketChats from "views/employee/chat/TicketChats";

const employeeroutes = [
  {
    name: "Dashboard",
    layout: "/dashboard",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },

  {
    name: "NFT Marketplace",
    layout: "/dashboard",
    path: "nft-marketplace",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "Tickets",
    layout: "/dashboard",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "tickets",
    component: <Tickets />,
  },
  {
    name: "Data Tables",
    layout: "/dashboard",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },
  {
    name: "Chat",
    layout: "/dashboard",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "chat",
    component: <TicketChats />,
  },
  {
    name: "Profile",
    layout: "/dashboard",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },

  // {
  //   name: "Sign In",
  //   layout: "/auth",
  //   path: "sign-in",
  //   icon: <MdLock className="h-6 w-6" />,
  //   component: <SignIn />,
  // },
  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "rtl",
  //   icon: <MdHome className="h-6 w-6" />,
  //   component: <RTLDefault />,
  // },
];
export default employeeroutes;
