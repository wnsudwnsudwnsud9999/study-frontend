import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

export default function HomePage() {
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 백엔드 연결 상태를 확인하는 테스트 API 호출
    fetch("http://localhost:4000/api/test")
      .then((res) => res.json())
      .then((data) => {
        setMsg(data.message);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setMsg("백엔드 연결 실패");
        setLoading(false);
      });
  }, []);

  return (
    <div className="page">
      <h1>자격증 학습 추천 플랫폼</h1>
      <p className="sub-text">
        나에게 맞는 학습량과 난이도를 AI가 추천해주는 서비스입니다.
      </p>

      {loading ? (
        <LoadingSpinner text="백엔드 상태를 불러오는 중입니다..." />
      ) : (
        <div className="status-box">
          <span className="status-label">백엔드 상태:</span>
          <span className="status-value">{msg}</span>
        </div>
      )}

      <div className="button-row">
        <Link to="/select" className="button">
          자격증 선택하고 시작하기
        </Link>
        <Link to="/history" className="button secondary">
          추천 이력 보기
        </Link>
      </div>
    </div>
  );
}
