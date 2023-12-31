import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import Ticket from "views/admin/ticket";
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
import TicketChats from "views/admin/chat/TicketChats";
import UsersManaged from "views/admin/usersmanaged";
import Announcement from "views/ticketmanager/announcement";

const adminroutes = [
  {
    name: "Dashboard",
    layout: "/dashboard",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Tickets",
    layout: "/dashboard",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "tickets",
    component: <Ticket />,
  },
  {
    name: "Chat",
    layout: "/dashboard",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "chat",
    component: <TicketChats />,
  },
  {
    name: "Users Managed",
    layout: "/dashboard",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "usersmanaged",
    component: <UsersManaged />,
  },
  {
    name: "Announcement",
    layout: "/dashboard",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    path: "announcement",
    component: <Announcement />,
  },
  // {
  //   name: "NFT Marketplace",
  //   layout: "/dashboard",
  //   path: "nft-marketplace",
  //   icon: <MdOutlineShoppingCart className="h-6 w-6" />,
  //   component: <NFTMarketplace />,
  //   secondary: true,
  // },
  // {
  //   name: "Data Tables",
  //   layout: "/dashboard",
  //   icon: <MdBarChart className="h-6 w-6" />,
  //   path: "data-tables",
  //   component: <DataTables />,
  // },
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
export default adminroutes;
