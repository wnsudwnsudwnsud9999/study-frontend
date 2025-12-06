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
    <div className="home-page">
      {/* 1. 상단 히어로 섹션 (듀오링고 첫 화면 느낌) */}
      <section className="home-section hero-section">
        <div className="home-inner hero-layout">
          <div className="hero-text">
            <h1 className="hero-title">
              재미있고 <span className="hero-highlight">효율적인 자격증 학습</span>
            </h1>
            <p className="hero-subtitle">
              무작정 문제만 푸는 대신,{" "}
              <strong>내 상황에 맞는 학습 계획</strong>으로 준비해 보세요.
              <br />
              목표 점수, 남은 기간, 하루 공부 시간을 기반으로
              <br />
              AI가 가장 현실적인 공부 전략을 추천해 줍니다.
            </p>

            <div className="button-row hero-buttons">
              <Link to="/select" className="button hero-main-button">
                자격증 공부 계획 시작하기
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
          </div>

          {/* 지금은 이미지 대신 박스, 나중에 실제 이미지/일러스트로 교체 가능 */}
          <div className="hero-visual">
            <div className="hero-visual-box">
              <p>
                여기에는 나중에
                <br />
                자격증 공부를 상징하는
                <br />
                이미지 / 일러스트가 들어갑니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "왜 무작정 자격증 공부하면 안 되는지" 섹션 */}
      <section className="home-section home-section-alt">
        <div className="home-inner">
          <h2 className="section-title">왜 무작정 자격증 문제만 풀면 안 될까요?</h2>
          <p className="section-text">
            많은 사람들이 계획 없이 문제집만 풀다가{" "}
            <strong>시간은 쓰고, 점수는 잘 오르지 않는 경험</strong>을 합니다.
            이 플랫폼은 그런 비효율을 줄이기 위해 만들어졌습니다.
          </p>
          <ul className="section-list">
            <li>✔ 현재 실력과 전혀 맞지 않는 난이도의 문제를 계속 풀게 됨</li>
            <li>✔ 남은 기간을 고려하지 않아, 막판에 벼락치기 식으로 몰리게 됨</li>
            <li>✔ 무엇을 얼마나 공부했는지 기록이 없어, 방향성 잡기가 힘듦</li>
          </ul>
        </div>
      </section>

      {/* 3. 이 사이트에서 받을 수 있는 도움 설명 섹션 */}
      <section className="home-section">
        <div className="home-inner">
          <h2 className="section-title">이 사이트에서 받을 수 있는 도움</h2>

          <div className="feature-grid">
            <div className="feature-card">
              <h3>1. 맞춤 학습 계획 추천</h3>
              <p>
                현재 레벨, 목표 점수, 남은 기간, 하루 가능 시간을 입력하면
                <br />
                그에 맞는 <strong>하루 공부 시간과 난이도</strong>를 추천해 줍니다.
              </p>
            </div>

            <div className="feature-card">
              <h3>2. 추천 이력과 통계</h3>
              <p>
                지금까지 받은 추천 기록을 모아서 보여주고,
                <br />
                <strong>학습 패턴과 변화 추세</strong>를 추적할 수 있습니다.
              </p>
            </div>

            <div className="feature-card">
              <h3>3. 학습 캘린더</h3>
              <p>
                공부한 날을 달력에 체크하면서
                <br />
                <strong>꾸준히 공부하고 있는지 한눈에 확인</strong>할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 마지막 CTA 섹션 */}
      <section className="home-section home-section-cta">
        <div className="home-inner cta-inner">
          <h2 className="section-title">
            이제는 감이 아니라, <br />
            데이터와 계획으로 자격증을 준비해 보세요.
          </h2>
          <p className="section-text">
            버튼 한 번으로 오늘부터 어떤 자격증을 어떻게 공부할지
            <br />
            <strong>구체적인 학습 계획</strong>을 세울 수 있습니다.
          </p>

          <div className="button-row cta-buttons">
            <Link to="/select" className="button hero-main-button">
              자격증 공부 계획 세우기
            </Link>
            <Link to="/stats" className="button secondary">
              내 학습 통계 보러가기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
