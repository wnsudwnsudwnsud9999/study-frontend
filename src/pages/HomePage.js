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
    <div className="page home-page">
      <section className="hero">
        <h1 className="hero-title">
          자격증, <span className="hero-highlight">무작정 문제만 풀면</span>{" "}
          시간만 버립니다.
        </h1>
        <p className="hero-subtitle">
          현재 실력 · 남은 기간 · 하루 공부 가능 시간을 기반으로
          <br />
          AI가 <strong>가장 효율적인 학습 계획</strong>을 추천해줍니다.
        </p>

        <ul className="hero-list">
          <li>✔ 어디서부터 시작해야 할지 모를 때, 목표에 맞는 학습량을 제시</li>
          <li>✔ “하루 몇 시간, 어느 난이도로” 공부해야 할지 구체적으로 안내</li>
          <li>✔ 추천 이력과 통계를 통해 내 공부 패턴을 한눈에 확인</li>
        </ul>

        <div className="button-row hero-buttons">
          <Link to="/select" className="button">
            자격증 공부 계획 세우기
          </Link>
          <Link to="/history" className="button secondary">
            내 추천 이력 보기
          </Link>
        </div>

        <div className="backend-status-box">
          {loading ? (
            <LoadingSpinner text="백엔드 상태를 확인하는 중입니다..." />
          ) : (
            <p className="backend-status-text">
              백엔드 상태: <span>{msg}</span>
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
