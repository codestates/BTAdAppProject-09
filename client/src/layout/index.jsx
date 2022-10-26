import React from "react";
import { Outlet } from "react-router-dom";
import { Button, Box } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../lib/connectors";
import { isNoEthereumObject } from "../lib/errors";
import NETWORKS from "../utils/chainId";
import { useEffect } from "react";

const targetNetwork = NETWORKS[process.env.REACT_APP_TARGET_CHAIN_ID];

const MainLayout = () => {
  const { chainId, account, active, activate, deactivate } = useWeb3React();

  const handleConnect = () => {
    if (active) {
      deactivate();
      return;
    }

    activate(injected, error => {
      if (isNoEthereumObject(error))
        window.open("https://metamask.io/download.html");
    });
  };

  useEffect(() => {
    console.log(chainId);
  }, [chainId]);

  return (
    <>
      <Box>
        <div>
          <div className="user">
            <p>Account : {account}</p>
            <p>{targetNetwork}</p>
          </div>
          <div className="connect">
            <Button variant="outlined" onClick={handleConnect}>
              {active ? "disconnect" : "connect"}
            </Button>
          </div>
        </div>
      </Box>
      <Outlet />
    </>
  );
};

export default MainLayout;
