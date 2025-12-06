import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

export default function RecommendPage() {
  const location = useLocation();
  const state = location.state || {};

  const [result, setResult] = useState(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 임시 로직 + 약간의 지연을 줘서 로딩 애니메이션이 보이게 함
    const timer = setTimeout(() => {
      const daily = Number(state.daily) || 1;
      const days = Number(state.days) || 1;

      const recommendedTime = Math.min(daily + 1, 6); // 하루 공부시간 + 1시간 (최대 6시간)
      const difficulty = state.cert === "정보처리기사" ? 4 : 3;

      const message = state.cert
        ? `${state.cert} 합격을 위해 오늘은 약 ${recommendedTime}시간 정도 공부하고, 난이도 ${difficulty} 수준의 문제를 풀어보는 것을 추천합니다.`
        : `입력된 정보가 없어 기본 추천을 표시합니다. 오늘은 ${recommendedTime}시간 정도 공부를 추천합니다.`;

      setResult({
        recommendedTime,
        difficulty,
        message,
        calculatedFrom: {
          daily,
          days,
        },
      });
      setLoading(false);
    }, 600); // 0.6초 정도 지연

    return () => clearTimeout(timer);
  }, [state]);

  const handleSaveHistory = () => {
    if (!result) return;

    const historyItem = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      cert: state.cert || "미지정",
      current: state.current || "",
      target: state.target || "",
      days: state.days || "",
      daily: state.daily || "",
      recommendedTime: result.recommendedTime,
      difficulty: result.difficulty,
      message: result.message,
    };

    const existing = localStorage.getItem("recommendHistory");
    let list = [];
    if (existing) {
      try {
        list = JSON.parse(existing);
      } catch (error) {
        console.error("Failed to parse existing history", error);
      }
    }

    list.unshift(historyItem);
    localStorage.setItem("recommendHistory", JSON.stringify(list));
    setSaved(true);
  };

  return (
    <div className="page">
      <h1>AI 추천 결과</h1>

      {state.cert && (
        <p className="sub-text">
          선택한 자격증: <strong>{state.cert}</strong>
        </p>
      )}

      {loading ? (
        <LoadingSpinner text="AI가 학습 추천을 계산하는 중입니다..." />
      ) : !result ? (
        <p>추천을 계산하는 중 오류가 발생했습니다.</p>
      ) : (
        <>
          <div className="card">
            <p>
              <strong>권장 학습 시간</strong>: {result.recommendedTime}시간
            </p>
            <p>
              <strong>추천 난이도</strong>: {result.difficulty}
            </p>
            <p className="history-message">{result.message}</p>
          </div>

          <button onClick={handleSaveHistory} className="button">
            이 추천을 이력에 저장하기
          </button>

          {saved && (
            <p className="success-text">✅ 추천 이력이 저장되었습니다.</p>
          )}

          <div className="link-row">
            <Link to="/history" className="link">
              저장된 추천 이력 보러가기 →
            </Link>
          </div>
        </>
      )}

      <div className="link-row">
        <Link to="/select" className="link">
          ← 자격증 다시 선택하기
        </Link>
      </div>
    </div>
  );
}
