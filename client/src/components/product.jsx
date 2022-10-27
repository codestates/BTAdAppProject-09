import React from "react";
import "./product.css";

const Product = () => {
  return (
    <div className="product_container">
        <div className="product_title">
            <div>로고</div>
            <div>ADA 스테이킹 (ADA)</div>
        </div>
        <div className="product_description">
            <div>예상 연 이율</div>
            <div>최소 5% ~ 최대 5.5%</div>
            <div>최소 보유량</div>
            <div>25.00000000 ADA</div>
            <div>나의 현재 보유량</div>
            <div>0.00000000 ADA</div>
        </div>
        <div className="product_transactionBtnContainer">
            <div className="product_depositBtn">입금</div>
            <div className="product_buyBtn">매수</div>
        </div>
    </div>

  )
};

export default Product;
