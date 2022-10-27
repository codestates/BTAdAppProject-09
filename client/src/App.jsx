import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import MainLayout from "./layout";
import Main from "./pages/Main";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<MainLayout />}>
          <Route path="" element={<Main />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
