import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar";

const AdminRoot = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default AdminRoot;
