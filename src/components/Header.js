import React from "react";
import { Link } from "react-router-dom";

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
};

const navLinkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "14px",
};

export default function Header() {
  return (
    <header style={headerStyle}>
      <div style={innerStyle}>
        <h2 style={titleStyle}>
          <Link to="/" style={titleLinkStyle}>
            AI 자격증 학습 추천
          </Link>
        </h2>
        <nav style={navStyle}>
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
        </nav>
      </div>
    </header>
  );
}
