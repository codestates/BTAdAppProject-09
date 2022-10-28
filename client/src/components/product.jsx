import React, { useState } from "react";
import "./product.css";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import FloatingActionButtonZoom from "./TabPanel";

const Product = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        <div className="product_buyBtn" onClick={handleClickOpen}>
          매수
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <FloatingActionButtonZoom handleClose={handleClose} />
      </Dialog>
    </div>
  );
};

export default Product;
