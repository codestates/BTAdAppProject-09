import React, { useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { Button, TextField } from "@mui/material";
import rewardToken from "../../contracts/rewardToken.json";
import { useInput } from "../../utils/useInput";

const RewardToken = ({ mainContractAddress }) => {
  const { account } = useWeb3React();

  const [rewardTokenContract, setRewardTokenContract] = useState();
  const [myBalance, setMyBalance] = useState(0);
  const [contractBalance, setContractBalance] = useState(0);
  const [minting, mintingFunc] = useInput();
  const [transferToken, transferTokenFunc] = useInput();

  const init = useCallback(async () => {
    let web3 = new Web3(window.ethereum);

    let rewardTokenContract = new web3.eth.Contract(
      rewardToken.abi,
      rewardToken.address,
    );

    try {
      const myBalance = await rewardTokenContract.methods
        .balanceOf(account)
        .call();

      const contractBalance = await rewardTokenContract.methods
        .balanceOf(mainContractAddress)
        .call();

      setContractBalance(contractBalance);
      setMyBalance(myBalance);
      setRewardTokenContract(rewardTokenContract);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const summitMintingFunc = useCallback(async () => {
    try {
      await rewardTokenContract.methods.mint(minting).send({ from: account });
    } catch (err) {
      console.error(err);
    }
  }, [account, minting, rewardTokenContract]);

  const summitTransferTokenFunc = useCallback(async () => {
    try {
      await rewardTokenContract.methods
        .transfer(mainContractAddress, transferToken)
        .send({ from: account });
    } catch (err) {
      console.error(err);
    }
  }, [account, mainContractAddress, rewardTokenContract, transferToken]);

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <div>
        <h2 style={{ marginBottom: "0" }}>보상 토큰 새로 민팅하기</h2>
        <div>
          <TextField
            margin="dense"
            id="name"
            value={minting}
            onChange={mintingFunc}
            type="duration"
            variant="standard"
          />
          <Button style={{ marginTop: "5px" }} onClick={summitMintingFunc}>
            확인
          </Button>
        </div>
        <div style={{ marginTop: "5px" }}>
          이체 가능한 토큰 : {myBalance} token
        </div>
        <div style={{ marginTop: "5px" }}>
          현재 저장된 토큰 : {contractBalance} token
        </div>
        <h2 style={{ marginBottom: "0" }}>토큰 이체하기</h2>
        <div>
          <TextField
            margin="dense"
            id="name"
            value={transferToken}
            onChange={transferTokenFunc}
            type="duration"
            variant="standard"
          />
          <Button
            style={{ marginTop: "5px" }}
            onClick={summitTransferTokenFunc}
          >
            확인
          </Button>
        </div>
      </div>
    </>
  );
};

export default RewardToken;
