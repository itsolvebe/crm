import React from "react";

// Admin Imports
import MainDashboard from "views/ticketmanager/default";
import Profile from "views/ticketmanager/profile";
import Ticket from "views/ticketmanager/ticket";

// Icon Imports
import { MdHome, MdBarChart, MdPerson } from "react-icons/md";
import Announcement from "views/ticketmanager/announcement";
import TicketChats from "views/ticketmanager/chat/TicketChats";

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
    path: "all-tickets",
    component: <Ticket />,
  },
  {
    name: "Tickets Chat",
    layout: "/dashboard",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "tickets-chat",
    component: <TicketChats />,
  },
  {
    name: "Announcement",
    layout: "/dashboard",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "announcement",
    component: <Announcement />,
  },
  {
    name: "Profile",
    layout: "/dashboard",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
];
export default adminroutes;
