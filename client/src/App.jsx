import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import Topbar from "./components/topbar";

const App = () => {
  return (
    <div className="App">
      <Topbar />
      <Main />
    </div>
  );
};

export default App;
