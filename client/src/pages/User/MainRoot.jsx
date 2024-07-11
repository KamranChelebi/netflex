import React from "react";
import UserNavbar from "../../components/User/Navbar";
import { Outlet } from "react-router-dom";
import UserFooter from "../../components/User/Footer";
import ScrollTop from "../../components/User/ScrollTop";
import Subscribers from "../../components/User/Subscribers";

const MainRoot = () => {
  return (
    <>
      <UserNavbar />
      <ScrollTop />
      <Outlet />
      <Subscribers/>
      <UserFooter />
    </>
  );
};

export default MainRoot;
