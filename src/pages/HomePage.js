import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import heroImg from "../assets/hero-main.png"; // ⭐ 메인 일러스트 (그대로 유지)

// 회사 로고 이미지 30개 (파일 이름은 company1~company30.png 로 준비)
import company1 from "../assets/company1.png";
import company2 from "../assets/company2.png";
import company3 from "../assets/company3.png";
import company4 from "../assets/company4.png";
import company5 from "../assets/company5.png";
import company6 from "../assets/company6.png";
import company7 from "../assets/company7.png";
import company8 from "../assets/company8.png";
import company9 from "../assets/company9.png";
import company10 from "../assets/company10.png";
import company11 from "../assets/company11.png";
import company12 from "../assets/company12.png";
import company13 from "../assets/company13.png";
import company14 from "../assets/company14.png";
import company15 from "../assets/company15.png";
import company16 from "../assets/company16.png";
import company17 from "../assets/company17.png";
import company18 from "../assets/company18.png";
import company19 from "../assets/company19.png";
import company20 from "../assets/company20.png";
import company21 from "../assets/company21.png";
import company22 from "../assets/company22.png";
import company23 from "../assets/company23.png";
import company24 from "../assets/company24.png";
import company25 from "../assets/company25.png";
import company26 from "../assets/company26.png";
import company27 from "../assets/company27.png";
import company28 from "../assets/company28.png";
import company29 from "../assets/company29.png";
import company30 from "../assets/company30.png";

// 로고 + 회사 이름 매핑 (이름은 네가 바꾼 버전 그대로 사용)
const companyLogos = [
  { name: "삼성전자", logo: company1 },
  { name: "LG전자", logo: company2 },
  { name: "SK하이닉스", logo: company3 },
  { name: "네이버", logo: company4 },
  { name: "카카오", logo: company5 },
  { name: "현대자동차", logo: company6 },
  { name: "기아", logo: company7 },
  { name: "롯데", logo: company8 },
  { name: "CJ", logo: company9 },
  { name: "포스코", logo: company10 },
  { name: "쿠팡", logo: company11 },
  { name: "배달의민족", logo: company12 },
  { name: "토스", logo: company13 },
  { name: "카카오뱅크", logo: company14 },
  { name: "신한은행", logo: company15 },
  { name: "KB국민은행", logo: company16 },
  { name: "하나은행", logo: company17 },
  { name: "NH농협은행", logo: company18 },
  { name: "셀트리온", logo: company19 },
  { name: "한국가스공사", logo: company20 },
  { name: "국민연금공단", logo: company21 },
  { name: "인천국제공항공사", logo: company22 },
  { name: "한국도로공사", logo: company23 },
  { name: "한국수력원자력", logo: company24 },
  { name: "Google", logo: company25 },
  { name: "Microsoft", logo: company26 },
  { name: "Amazon", logo: company27 },
  { name: "IBM", logo: company28 },
  { name: "Oracle", logo: company29 },
  { name: "SAP", logo: company30 },
];

export default function HomePage() {
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  // 백엔드 연결 상태 확인
  useEffect(() => {
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

  // DOM 기능 1: 스크롤 등장 애니메이션 (IntersectionObserver + classList)
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal-on-scroll");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            obs.unobserve(entry.target); // 한 번 보이면 관찰 해제
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // DOM 기능 2: 숫자 카운트 애니메이션 (document.getElementById + innerText)
  useEffect(() => {
    const animateValue = (id, start, end, duration) => {
      const el = document.getElementById(id);
      if (!el) return;

      let startTime = null;

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        el.textContent = value.toLocaleString(); // 1,234 형식

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    };

    // 예시 값 (나중에 백엔드 값으로 바꿀 수도 있음)
    animateValue("stat-plans", 0, 1284, 1500);
    animateValue("stat-requests", 0, 3209, 1500);
    animateValue("stat-hours", 0, 5432, 1500);
  }, []);

  return (
    <div className="home-page">
      {/* 1. 첫 화면 히어로 섹션 */}
      <section className="home-section hero-section">
        <div className="home-inner hero-center-inner">
          <h1 className="hero-title">
            재미있고 <span className="hero-highlight">효율적인 자격증 학습</span>
          </h1>
          <p className="hero-subtitle">
            자격증 준비를 더 가볍고, 더 똑똑하게.
            <br />
            지금 바로 나에게 맞는 학습 계획을 만들어 보세요.
          </p>

          <div className="button-row hero-buttons">
            <Link to="/select" className="button hero-main-button">
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
        </div>
      </section>

      {/* 2. 서비스 한 줄 소개 섹션 (텍스트 왼쪽 + 이미지 오른쪽) */}
      <section className="home-section home-section-alt reveal-on-scroll">
        <div className="home-inner info-layout">
          <div className="info-text">
            <h2 className="section-title">재밌고 효율적인 자격증 학습 웹!</h2>
            <p className="section-text">
              무작정 문제만 푸는 대신, 내 상황에 맞는 학습 계획으로 준비해 보세요.
              <br />
              목표 점수, 남은 기간, 하루 공부 시간을 기반으로
              <br />
              AI가 가장 현실적인 공부 전략을 추천해 줍니다.
            </p>
          </div>

          <div className="info-image">
            <img src={heroImg} alt="자격증 학습 일러스트" />
          </div>
        </div>
      </section>

      {/* 3. 왜 무작정 자격증 공부를 하면 안 되는지 */}
      <section className="home-section reveal-on-scroll">
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

      {/* 4. 이 사이트에서 받을 수 있는 도움 */}
      <section className="home-section home-section-alt reveal-on-scroll">
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

      {/* 5. 플랫폼 통계 섹션 (DOM 기능 2: 숫자 카운트 애니메이션) */}
      <section className="home-section stats-section reveal-on-scroll">
        <div className="home-inner stats-inner">
          <h2 className="section-title">플랫폼 사용 통계 (예시 데이터)</h2>
          <p className="section-text">
            실제 서비스에서는 백엔드 통계를 기반으로
            <br />
            누적 학습 계획 수, 추천 요청 수, 학습 시간을 시각화할 수 있습니다.
            <br />
            아래 숫자는 프론트엔드에서 DOM을 직접 조작해
            <br />
            <strong>0에서 목표 값까지 올라가는 애니메이션</strong>으로 표현한 예시입니다.
          </p>

          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">생성된 학습 계획</span>
              <span className="stat-number" id="stat-plans">
                0
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">총 추천 요청 수</span>
              <span className="stat-number" id="stat-requests">
                0
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">누적 학습 시간(시간)</span>
              <span className="stat-number" id="stat-hours">
                0
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 마지막 CTA 섹션 */}
      <section className="home-section home-section-cta reveal-on-scroll">
        <div className="home-inner cta-inner">
          <h2 className="section-title">
            이제는 감이 아니라,
            <br />
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
          </div>
        </div>
      </section>

      {/* 7. 대기업 / 공기업 로고 섹션 */}
      <section className="home-section company-section reveal-on-scroll">
        <div className="home-inner company-inner">
          <h2 className="section-title">이런 기업들이 자격증 역량을 중요하게 봅니다</h2>
          <p className="section-text company-text">
            토익·토스 같은 어학 점수, 정보처리기사·컴활 같은 IT/사무 자격증은
            <br />
            많은 대기업·공기업·금융권에서 <strong>지원 자격</strong>이나{" "}
            <strong>우대사항</strong>으로 활용되고 있습니다.
            <br />
            아래 로고들은 실제 채용 공고에서 자격증을 요구하거나 높은 어학 점수를
            선호하는 대표적인 회사들의 예시입니다.
          </p>

          <div className="company-grid">
            {companyLogos.map((c, index) => (
              <div className="company-item" key={index}>
                <img src={c.logo} alt={c.name} />
                <span className="company-name">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
