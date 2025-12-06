import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = login(id, password);
    if (ok) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="page auth-page">
      <div className="auth-card">
        <h1 className="auth-title">자격증 학습 추천 플랫폼</h1>
        <p className="auth-subtitle">
          무작정 공부 말고, 계획적으로 공부할 수 있도록 도와드립니다.
        </p>

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
