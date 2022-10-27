import React from "react";
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import "./topbar.css";

const injected = new InjectedConnector();

const Topbar = () => {
  const {
    chainedId,
    account,
    active,
    activate,
    deactivate
  } = useWeb3React();

  async function handdleConnect () {
    if(active) {
      deactivate();
      return;
    }
    
    try {
      await activate(injected, (error) => {
        console.log(error);
      })
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="topbar_container">
        <div className="topbar_title">
            스테이킹
        </div>
        <div>
            <button className="topbar_connectBtn" type="button" onClick={handdleConnect}>{active ? 'disconnect':'connect'}</button>
        </div>
  </div>
  )
};

export default Topbar;