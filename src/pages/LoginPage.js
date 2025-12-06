// src/pages/LoginPage.js
import React, { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function LoginPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // 이미 로그인 되어 있으면 여기 오지 말고 메인으로
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ok = await login(id, password); // id = username 으로 사용
    if (ok) {
      navigate("/");
    }
  };

  return (
    <div className="page auth-page">
      <div className="auth-card">
        <h1 className="auth-title">자격증 학습 추천 플랫폼</h1>
        <p className="auth-subtitle">로그인 후 서비스를 이용해 보세요.</p>

        <form onSubmit={handleSubmit}>
          <label>아이디</label>
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="아이디를 입력하세요"
          />

          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
          />

          <button type="submit" className="button auth-button">
            로그인
          </button>
        </form>

        <p className="auth-footer-text">
          아직 계정이 없나요?{" "}
          <Link to="/signup" className="link">
            회원가입 하러 가기
          </Link>
        </p>
      </div>
    </div>
  );
}
