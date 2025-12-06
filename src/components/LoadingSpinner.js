import React from "react";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px 0",
};

const circleStyle = {
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  border: "4px solid #ccc",
  borderTopColor: "#0077ff",
  animation: "spin 1s linear infinite",
  marginBottom: "8px",
};

const textStyle = {
  fontSize: "14px",
  color: "#555",
};

export default function LoadingSpinner({ text }) {
  return (
    <div style={containerStyle}>
      {/* 이 컴포넌트 전용 keyframes 정의 */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={circleStyle} />
      {text && <p style={textStyle}>{text}</p>}
    </div>
  );
}
