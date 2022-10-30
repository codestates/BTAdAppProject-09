import React, { useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import "./product.css";
import { Dialog } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import FloatingActionButtonZoom from "./TabPanel";
import stakingContract from "../contracts/stakingContract.json";
import SettingActionButtonZoom from "./TabPanel/Setting";

const Product = () => {
  const { account } = useWeb3React();

  const [owner, setOwner] = useState();
  const [open, setOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);

  const init = useCallback(async () => {
    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(
      stakingContract.abi,
      stakingContract.address,
    );

    try {
      const result = await contract.methods.owner().call();
      setOwner(result);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    init();
  }, []);

  const settingHandleClickOpen = () => {
    setSettingOpen(true);
  };

  const settingHandleClose = () => {
    setSettingOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="product_container">
      <div className="product_title">
        <h2>Apple 스테이킹</h2>
        {owner === account && (
          <div className="product_setting" onClick={settingHandleClickOpen}>
            <SettingsIcon />
          </div>
        )}
      </div>
      <div className="product_description">
        <div>예상 연 이율</div>
        <h2>최소 5% ~ 최대 5.5%</h2>
        <div>최소 보유량</div>
        <h5>25.00000000 ADA</h5>
        <div>나의 현재 보유량</div>
        <h5>0.00000000 ADA</h5>
      </div>
      <div className="product_transactionBtnContainer">
        <div className="product_depositBtn">입금</div>
        <div className="product_buyBtn" onClick={handleClickOpen}>
          매수
        </div>
      </div>
      <Dialog open={settingOpen} onClose={settingHandleClose}>
        <SettingActionButtonZoom handleClose={settingHandleClose} />
      </Dialog>
      <Dialog open={open} onClose={handleClose}>
        <FloatingActionButtonZoom handleClose={handleClose} />
      </Dialog>
    </div>
  );
};

export default Product;
