// src/pages/SignupPage.js
import React, { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function SignupPage() {
  const { signup, user } = useAuth();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // 이미 로그인 상태면 회원가입 페이지는 접근 금지
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await signup(id, password); // id = username
    if (ok) {
      // 회원가입 성공하면 메인 페이지로
      navigate("/");
    }
  };

  return (
    <div className="page auth-page">
      <div className="auth-card">
        <h1 className="auth-title">자격증 학습 추천 플랫폼</h1>
        <p className="auth-subtitle">새 계정을 만들어 시작해 보세요.</p>

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
            회원가입
          </button>
        </form>

        <p className="auth-footer-text">
          이미 계정이 있나요?{" "}
          <Link to="/login" className="link">
            로그인 하러 가기
          </Link>
        </p>
      </div>
    </div>
  );
}
