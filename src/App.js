import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/Technology";
import Calculator from "./pages/Calculator";
import ContactPage from "./pages/Contact";
import ChartPage from "./pages/Chart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/technology" element={<AboutPage />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/chart" element={<ChartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
