import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import WalletButton from "../components/WalletButton";

const MainLayout = () => {
  return (
    <>
      <Box>
        <WalletButton />
      </Box>
      <Outlet />
    </>
  );
};

export default MainLayout;
