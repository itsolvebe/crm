import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "components/navbar";
import Sidebar from "components/sidebar";
import Footer from "components/footer/Footer";
// import routes from "routes.js";
import adminroute from "routing/adminroutes";
import userroute from "routing/userroutes";
import emplyeeroute from "routing/employeeroutes";
import tmroutes from "routing/tmroutes";
import { useDispatch, useSelector } from "react-redux";
import bg from "assets/img/dashboards/bg.svg";
import { useDisclosure } from "@chakra-ui/hooks";
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import CardHorizon from "components/card";
import ChatLayout from "views/user/chat/Chat";

export default function Admin(props) {
  const { ...rest } = props;
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = useState("Dashboard");

  const [route, setRoute] = useState([]);
  useEffect(() => {
    switch (userInfo.role) {
      case "Admin":
        setRoute(adminroute);
        break;
      case "User":
        setRoute(userroute);
        break;
      case "Ticket Manager":
        setRoute(tmroutes);
        break;
      case "Employee":
        setRoute(emplyeeroute);
        break;
      default:
        setRoute(emplyeeroute);
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);
  useEffect(() => {
    getActiveRoute(route);
  }, [location.pathname, route]);

  const getActiveRoute = (routes) => {
    let activeRoute = "Dashboard";
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(
          routes[i].layout + "/" + routes[i].path
        ) !== -1
      ) {
        setCurrentRoute(routes[i].name);
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/dashboard") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  document.documentElement.dir = "ltr";
  return (
    <div className="flex h-full w-full">
      <Sidebar currroutes={route} open={open} onClose={() => setOpen(false)} />
      {/* Navbar & Main Content */}
      <div
        className="h-full w-full dark:!bg-navy-900"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundPosition: "382px -62px",
          backgroundSize: "cover",
        }}
      >
        {/* Main Content */}
        <div className="xl:ml-[263px] ">
          <Navbar
            onOpenSidenav={() => setOpen(true)}
            logoText={"Horizon UI Tailwind React"}
            brandText={currentRoute}
            secondary={getActiveNavbar(route)}
            {...rest}
          />
          <main className={` mx-[12px] h-full flex-none  transition-all`}>
            {/* Routes */}
            <div className="h-full">
              <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
                <Routes>
                  {getRoutes(route)}

                  <Route
                    path="/"
                    element={<Navigate to="/dashboard/default" replace />}
                  />
                </Routes>
              </div>
              <div className="p-3">
                <Footer />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
