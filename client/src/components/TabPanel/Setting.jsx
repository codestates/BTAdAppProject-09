import React, { useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import PropTypes from "prop-types";
import { useWeb3React } from "@web3-react/core";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import stakingContract from "../../contracts/stakingContract.json";
import { useInput } from "../../utils/useInput";
import RewardToken from "./RewardToken";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function SettingActionButtonZoom({ handleClose }) {
  const { account } = useWeb3React();

  const [duration, setDuration] = useState(0);
  const [stakingMainContract, setStakingMainContract] = useState();

  const [durationInput, durationInputFunc] = useInput();
  const [addRewardToken, addRewardTokenFunc] = useInput();

  const [open, setOpen] = useState(false);

  const init = useCallback(async () => {
    let web3 = new Web3(window.ethereum);
    let stakingMainContract = new web3.eth.Contract(
      stakingContract.abi,
      stakingContract.address,
    );

    try {
      const result = await stakingMainContract.methods.duration().call();
      setDuration(result);
      setStakingMainContract(stakingMainContract);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleClickOpen = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const summitFunc = useCallback(async () => {
    try {
      await stakingMainContract.methods
        .setRewardsDuration(durationInput)
        .send({ from: account });
    } catch (err) {
      console.error(err);
    }
  }, [account, stakingMainContract, durationInput]);

  const summitRewardTokenFunc = useCallback(async () => {
    try {
      await stakingMainContract.methods
        .notifyRewardAmount(addRewardToken)
        .send({ from: account });
    } catch (err) {
      console.error(err);
    }
  }, [account, addRewardToken, stakingMainContract]);

  useEffect(() => {
    init();
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        width: 500,
        position: "relative",
        minHeight: 200,
        margin: "15px 30px",
      }}
    >
      <div className="product_title">
        <h2 style={{ marginBottom: "0" }}>현재 지속 시간 - {duration} 초</h2>
        <div className="product_setting" onClick={handleClickOpen}>
          수정
        </div>
      </div>
      <div>
        {open && (
          <>
            <TextField
              margin="dense"
              id="name"
              value={durationInput}
              onChange={durationInputFunc}
              type="duration"
              variant="standard"
            />
            <Button style={{ marginTop: "5px" }} onClick={summitFunc}>
              확인
            </Button>
          </>
        )}
      </div>
      <RewardToken
        mainContractAddress={stakingContract.address}
        stakingMainContract={stakingMainContract}
      />

      <h2 style={{ marginBottom: "0" }}>상품에 등록하기</h2>
      <div>
        <TextField
          margin="dense"
          id="name"
          value={addRewardToken}
          onChange={addRewardTokenFunc}
          type="duration"
          variant="standard"
        />
        <Button style={{ marginTop: "5px" }} onClick={summitRewardTokenFunc}>
          확인
        </Button>
      </div>
      <div style={{ margin: "30px 0 10px 420px" }}>
        <Button onClick={handleClose}>취소</Button>
      </div>
    </Box>
  );
}
