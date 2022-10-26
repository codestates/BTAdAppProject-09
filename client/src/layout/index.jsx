import React from "react";

import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      기본 레이아웃
      <Outlet />
    </div>
  );
};

export default MainLayout;
