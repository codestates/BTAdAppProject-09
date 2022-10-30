import React from "react";
import StakingProduct from "./StakingProduct";

const StakingToken = ({ title, text }) => {
  return (
    <>
      <div className="main_productTextContainer">
        <div className="main_productTextTitle">{title}</div>
        <div className="main_productViewMoreContainer">
          <div className="main_productViewMoreText">{text}</div>
          <div className="main_productViewBtn">더보기 +</div>
        </div>
        <div className="main_productList">
          <StakingProduct />
        </div>
      </div>
    </>
  );
};

export default StakingToken;
