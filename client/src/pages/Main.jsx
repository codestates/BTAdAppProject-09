import React, { useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import "./Main.css";
import Card from "../components/card";

const Main = () => {
  const [contract, setContract] = useState();

  const init = useCallback(async artifact => {
    if (artifact) {
      const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
      const networkID = await web3.eth.net.getId();
      const { abi } = artifact;
      let address, contract;
      try {
        address = artifact.networks[networkID].address;
        contract = new web3.eth.Contract(abi, address);
        setContract(contract);
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact = require("../../contracts/contract.json");
        init(artifact);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  return (
    <div className="main_container">
      <div className="main_section1">
        <div className="main_sectionContent1">
          알아서 다 해주는 가장 쉬운 가상자산 재테크!
        </div>
        <div className="main_sectionContent2">스테이킹</div>
        <div className="main_sectionContent3">
          지금 바로 스테이킹 서비스 이용에 동의하시고
        </div>
        <div className="main_sectionContent3">
          매일 쌓이는 리워드를 획득하세요!
        </div>
      </div>
      <div className="main_stakingInfo">
        <div className="main_stakingSection1">
          <div className="main_stakingMaxInterest">최대 이율</div>
          <div className="main_stakingInterestElement">ADA 5.5%</div>
          <div className="main_stakingInterestElement">SOl 7.5%</div>
          <div className="main_stakingInterestElement">DOT 7.5%</div>
        </div>
        <div className="main_stakingSection2">
          <button className="main_stakingAgreeBtn">
            스테이킹 서비스 이용 동의
          </button>
        </div>
      </div>
      <div className="main_cardContainer">
        <Card
          title="스테이킹 가능한 상품"
          text="스테이킹 서비스 진행중인 가상자산 상품입니다."
          contract={contract}
        />
        <hr />
        <Card
          title="나의 스테이킹 상품"
          text="나의 가상자산 상품입니다."
          contract={contract}
        />
      </div>
    </div>
  );
};

export default Main;
