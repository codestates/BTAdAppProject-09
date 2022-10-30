import React from "react";
import "./card.css";
import Product from "./product";

const Card = ({ title, text, contract }) => {
  return (
    <>
      <div className="main_productTextContainer">
        <div className="main_productTextTitle">{title}</div>
        <div className="main_productViewMoreContainer">
          <div className="main_productViewMoreText">{text}</div>
          <div className="main_productViewBtn">더보기 +</div>
        </div>
        <div className="main_productList">
          <Product contract={contract} />
        </div>
      </div>
    </>
  );
};

export default Card;
