import React from "react";
import "./product.css";

const Product = () => {
  return (
    <div className="product_container">
      <div className="product_title">
        <h2>ADA 스테이킹 (ADA)</h2>
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
        <div className="product_buyBtn">매수</div>
      </div>
    </div>
  );
};

export default Product;
