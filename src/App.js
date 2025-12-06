import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import CertSelectPage from "./pages/CertSelectPage";
import GoalSettingPage from "./pages/GoalSettingPage";
import RecommendPage from "./pages/RecommendPage";
import HistoryPage from "./pages/HistoryPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/select" element={<CertSelectPage />} />
        <Route path="/goal" element={<GoalSettingPage />} />
        <Route path="/recommend" element={<RecommendPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </Router>
  );
}
