import "./App.css";
import Navbar from "./componets/Navbar";
import Footer from "./componets/Footer";
import FoldersComponent from "./componets/NewFolder";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";

function App() {
  return (
    <div>
      {/* <FoldersComponent/> */}
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/Update" element={<FoldersComponent />}></Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
//
