import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const headerStyle = {
  padding: "12px 24px",
  borderBottom: "1px solid #ddd",
  marginBottom: "16px",
  backgroundColor: "#0d47a1",
  color: "white",
};

const innerStyle = {
  maxWidth: "960px",
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const titleStyle = {
  margin: 0,
  fontSize: "20px",
};

const titleLinkStyle = {
  color: "white",
  textDecoration: "none",
};

const navStyle = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
  alignItems: "center",
};

const navLinkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "14px",
};

const logoutButtonStyle = {
  border: "1px solid #ffffff88",
  background: "transparent",
  color: "white",
  borderRadius: "999px",
  padding: "4px 10px",
  fontSize: "13px",
  cursor: "pointer",
};

const userTextStyle = {
  fontSize: "13px",
  opacity: 0.9,
};

export default function Header() {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header style={headerStyle}>
      <div style={innerStyle}>
        <h2 style={titleStyle}>
          <Link to={isLoggedIn ? "/" : "/login"} style={titleLinkStyle}>
            AI 자격증 학습 추천
          </Link>
        </h2>
        <nav style={navStyle}>
          {isLoggedIn ? (
            <>
              <Link to="/select" style={navLinkStyle}>
                자격증 선택
              </Link>
              <Link to="/history" style={navLinkStyle}>
                추천 이력
              </Link>
              <Link to="/stats" style={navLinkStyle}>
                통계
              </Link>
              <Link to="/calendar" style={navLinkStyle}>
                캘린더
              </Link>
              {user && (
                <span style={userTextStyle}>{user.id}님 로그인 중</span>
              )}
              <button onClick={handleLogout} style={logoutButtonStyle}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={navLinkStyle}>
                로그인
              </Link>
              <Link to="/signup" style={navLinkStyle}>
                회원가입
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
