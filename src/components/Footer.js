import React from "react";

const footerStyle = {
  padding: "12px 24px",
  borderTop: "1px solid #ddd",
  marginTop: "24px",
  fontSize: "13px",
  color: "#666",
};

const innerStyle = {
  maxWidth: "960px",
  margin: "0 auto",
  textAlign: "center",
};

export default function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={innerStyle}>
        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()} AI 자격증 학습 추천 플랫폼
        </p>
      </div>
    </footer>
  );
}
