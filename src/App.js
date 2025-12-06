import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import CertSelectPage from "./pages/CertSelectPage";
import GoalSettingPage from "./pages/GoalSettingPage";
import RecommendPage from "./pages/RecommendPage";
import HistoryPage from "./pages/HistoryPage";
import CertDetailPage from "./pages/CertDetailPage";
import StatsPage from "./pages/StatsPage";
import StudyCalendarPage from "./pages/StudyCalendarPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import Layout from "./components/Layout";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* 공개 페이지 */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* 로그인 필요한 페이지들 */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/select"
              element={
                <ProtectedRoute>
                  <CertSelectPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/goal"
              element={
                <ProtectedRoute>
                  <GoalSettingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recommend"
              element={
                <ProtectedRoute>
                  <RecommendPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <HistoryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cert/:certId"
              element={
                <ProtectedRoute>
                  <CertDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stats"
              element={
                <ProtectedRoute>
                  <StatsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/calendar"
              element={
                <ProtectedRoute>
                  <StudyCalendarPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}
