import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../components/topbar";

const MainLayout = () => {
  return (
    <>
      <Topbar />
      <Outlet />
    </>
  );
};

export default MainLayout;
