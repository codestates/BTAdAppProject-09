import React, { useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import "./product.css";
import { Button, Dialog } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import FloatingActionButtonZoom from "./TabPanel";
import stakingContract from "../contracts/stakingContract.json";
import SettingActionButtonZoom from "./TabPanel/Setting";

const Product = () => {
  const { account, active } = useWeb3React();

  const [owner, setOwner] = useState();
  const [open, setOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const [earned, setEarned] = useState(0);
  const [reward, setReward] = useState(0);
  const [setting, setSetting] = useState(false);
  const [stakingMainContract, setStakingMainContract] = useState();
  const [flag, setFlag] = useState(false);

  const init = useCallback(async () => {
    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(
      stakingContract.abi,
      stakingContract.address,
    );

    try {
      const ownerResult = await contract.methods.owner().call();

      const earnedResult = await contract.methods.earned(account).call();
      const rewardsResult = await contract.methods
        .userRewardPerTokenPaid(account)
        .call();
      setEarned(earnedResult);
      setReward(rewardsResult);
      setOwner(ownerResult);

      setStakingMainContract(contract);
    } catch (err) {
      console.error(err);
    }
  }, [account]);

  useEffect(() => {
    setSetting(owner === account);
    init();
  }, [flag, active]);

  const rewardTokenFunc = useCallback(async () => {
    try {
      setFlag(false);
      await stakingMainContract.methods.getReward().send({ from: account });
      setFlag(true);
    } catch (err) {
      console.error(err);
    }
  }, [account, stakingMainContract]);

  const settingHandleClickOpen = useCallback(() => {
    setSettingOpen(true);
  }, []);

  const settingHandleClose = useCallback(() => {
    setSettingOpen(false);
  }, []);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <div className="product_container">
      <div className="product_title">
        <h2>Apple 스테이킹</h2>
        {setting && (
          <div className="product_setting" onClick={settingHandleClickOpen}>
            <SettingsIcon />
          </div>
        )}
      </div>
      <div className="product_description">
        <div>예상 연 이율</div>
        <h2>최소 5% ~ 최대 5.5%</h2>
        <div>지급 받지 않은 보상 토큰</div>
        <h5>
          {earned} TOKEN
          <Button onClick={rewardTokenFunc}>지급 받기</Button>
        </h5>
        <div>총 보상 토큰</div>
        <h5>{reward} TOKEN</h5>
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
