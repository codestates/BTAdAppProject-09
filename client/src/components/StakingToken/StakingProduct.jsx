import React, { useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { TextField } from "@mui/material";
import { useInput } from "../../utils/useInput";
import stakingToken from "../../contracts/stakingToken.json";

const StakingProduct = () => {
  const { account } = useWeb3React();
  const [stakingTokenContract, setStakingTokenContract] = useState();
  const [myToken, setMyToken] = useState(0);
  const [token, tokenFunc, setToken] = useInput();

  const summitTokenFunc = useCallback(async () => {
    try {
      await stakingTokenContract.methods.mint(token).send({ from: account });
      setToken("");
    } catch (err) {
      console.error(err);
    }
  }, [account, setToken, stakingTokenContract, token]);

  const init = useCallback(async () => {
    let web3 = new Web3(window.ethereum);
    let stakingTokenContract = new web3.eth.Contract(
      stakingToken.abi,
      stakingToken.address,
    );

    try {
      const result = await stakingTokenContract.methods
        .balanceOf(account)
        .call();

      setMyToken(result);
      setStakingTokenContract(stakingTokenContract);
    } catch (err) {
      console.error(err);
    }
  }, [account]);

  useEffect(() => {
    init();
  }, [token]);

  return (
    <>
      <div className="product_container">
        <div className="product_title">
          <h2>Apple TOKEN</h2>
        </div>
        <TextField
          margin="dense"
          id="name"
          value={token}
          onChange={tokenFunc}
          type="duration"
          variant="standard"
          sx={{ width: "250px" }}
        />
        <div
          className="product_transactionBtnContainer"
          style={{ margin: "40px 0 0 120px" }}
        >
          <div className="product_depositBtn" onClick={summitTokenFunc}>
            민팅하기
          </div>
        </div>
        <h3 style={{ marginTop: "60px" }}>나의 보유량</h3>
        <h6 style={{ margin: "0" }}>{myToken} TOKEN</h6>
      </div>
    </>
  );
};

export default StakingProduct;
