import React, { useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useWeb3React } from "@web3-react/core";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import { useInput } from "../utils/useInput";
import stakingToken from "../contracts/stakingToken.json";
import stakingContract from "../contracts/stakingContract.json";

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

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}

export default function FloatingActionButtonZoom({ handleClose }) {
  const { account } = useWeb3React();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [myToken, setMyToken] = useState(0);
  const [myStakingAmount, setMyStakingAmount] = useState(0);
  const [stakingTokenContract, setStakingTokenContract] = useState();
  const [stakingMainContract, setStakingMainContract] = useState();
  const [flag, setFlag] = useState(false);
  const [approveToken, approveTokenFunc] = useInput();
  const [myStakingToken, myStakingTokenFunc] = useInput();
  const [removeMyStakingToken, removeMyStakingTokenFunc] = useInput();

  const init = useCallback(async () => {
    let web3 = new Web3(window.ethereum);
    let stakingTokenContract = new web3.eth.Contract(
      stakingToken.abi,
      stakingToken.address,
    );
    let stakingMainContract = new web3.eth.Contract(
      stakingContract.abi,
      stakingContract.address,
    );

    try {
      const result = await stakingTokenContract.methods
        .balanceOf(account)
        .call();

      const stakingResult = await stakingMainContract.methods
        .balanceOf(account)
        .call();

      setMyToken(result);
      setMyStakingAmount(stakingResult);
      setStakingTokenContract(stakingTokenContract);
      setStakingMainContract(stakingMainContract);
    } catch (err) {
      console.error(err);
    }
  }, [account]);

  useEffect(() => {
    init();
  }, [myStakingToken]);

  const summitApproveFunc = useCallback(async () => {
    try {
      await stakingTokenContract.methods
        .approve(stakingContract.address, approveToken)
        .send({ from: account });
      setFlag(true);
    } catch (err) {
      console.error(err);
    }
  }, [account, approveToken, stakingTokenContract]);

  const summitStakingFunc = useCallback(async () => {
    try {
      await stakingMainContract.methods
        .stake(myStakingToken)
        .send({ from: account });
      handleClose();
    } catch (err) {
      console.error(err);
    }
  }, [account, myStakingToken, stakingMainContract]);

  const summitRemoveStakingFunc = useCallback(async () => {
    try {
      await stakingMainContract.methods
        .withdraw(removeMyStakingToken)
        .send({ from: account });
      handleClose();
    } catch (err) {
      console.error(err);
    }
  }, [account, handleClose, removeMyStakingToken, stakingMainContract]);

  const handleChange = useCallback((event, newValue) => {
    setValue(newValue);
  }, []);

  const handleChangeIndex = useCallback(index => {
    setValue(index);
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        width: 500,
        position: "relative",
        minHeight: 200,
      }}
    >
      {flag ? (
        <>
          <AppBar position="static" color="transparent" sx={{ bgcolor: "" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="action tabs example"
            >
              <Tab
                label={
                  <span style={{ color: "black", fontSize: "17px" }}>매수</span>
                }
                {...a11yProps(0)}
              />
              <Tab
                label={
                  <span style={{ color: "black", fontSize: "17px" }}>매도</span>
                }
                {...a11yProps(1)}
              />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <TextField
                margin="dense"
                id="name"
                value={myStakingToken}
                onChange={myStakingTokenFunc}
                label="매수 금액"
                type="email"
                fullWidth
                variant="standard"
                sx={{ marginBottom: "100px" }}
              />
              <div style={{ margin: "-10px 0 10px 0" }}>
                현재 스테이킹된 토큰 - {myStakingAmount} TOKEN
              </div>
              <Box sx={{ marginLeft: "69%" }}>
                <Button onClick={handleClose}>취소</Button>
                <Button onClick={summitStakingFunc}>매수</Button>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <TextField
                margin="dense"
                id="name"
                value={removeMyStakingToken}
                onChange={removeMyStakingTokenFunc}
                label="매도 금액"
                type="email"
                fullWidth
                variant="standard"
                sx={{ marginBottom: "100px" }}
              />
              <div style={{ margin: "-10px 0 10px 0" }}>
                현재 스테이킹된 토큰 - {myStakingAmount} TOKEN
              </div>
              <Box sx={{ marginLeft: "69%" }}>
                <Button onClick={handleClose}>취소</Button>
                <Button onClick={summitRemoveStakingFunc}>매도</Button>
              </Box>
            </TabPanel>
          </SwipeableViews>
        </>
      ) : (
        <div style={{ margin: "20px" }}>
          <div>현재 나의 토큰 수 - {myToken} TOKEN</div>
          <TextField
            margin="dense"
            id="name"
            value={approveToken}
            onChange={approveTokenFunc}
            type="duration"
            variant="standard"
          />
          <Button style={{ marginTop: "5px" }} onClick={summitApproveFunc}>
            승인하기
          </Button>
        </div>
      )}
    </Box>
  );
}
