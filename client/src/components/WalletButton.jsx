import React, { useEffect } from "react";
import { Button, Box } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../lib/connectors";
import { isNoEthereumObject } from "../lib/errors";
import NETWORKS from "../utils/chainId";

const targetNetwork = NETWORKS[process.env.REACT_APP_TARGET_CHAIN_ID];

const WalletButton = () => {
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
    console.log(targetNetwork);
  }, [chainId]);

  return (
    <>
      <Button variant="outlined" onClick={handleConnect}>
        {active ? "disconnect" : "connect"}
      </Button>
      <Box>{account}</Box>
    </>
  );
};

export default WalletButton;
