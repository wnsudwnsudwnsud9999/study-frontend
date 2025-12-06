import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

export default function RecommendPage() {
  const location = useLocation();
  const state = location.state || {};

  const [result, setResult] = useState(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  // 백엔드 저장 상태
  const [savingToServer, setSavingToServer] = useState(false);
  const [serverError, setServerError] = useState("");

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

  const handleSaveHistory = async () => {
    if (!result) return;

    // ✅ 1단계: 기존처럼 localStorage 에도 저장 (DOM/BOM 활용)
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

    // ✅ 2단계: 몽고DB(백엔드)에도 같이 저장
    setSavingToServer(true);
    setServerError("");

    // 로그인 로직에서 userId를 localStorage에 저장했다고 가정
    const rawUserId = localStorage.getItem("userId");
    const userId = rawUserId ? Number(rawUserId) : undefined;

    const payload = {
      userId, // 없으면 undefined로 들어감 (스키마에서 optional)
      cert: historyItem.cert,
      currentLevel: historyItem.current,
      targetLevel: historyItem.target,
      days: historyItem.days ? Number(historyItem.days) : null,
      dailyHour: historyItem.daily ? Number(historyItem.daily) : null,
      recommendedTime: historyItem.recommendedTime,
      difficulty: historyItem.difficulty,
      message: historyItem.message,
    };

    try {
      const res = await fetch("http://localhost:4000/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("서버 응답이 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("추천 이력 서버 저장 실패:", error);
      setServerError(
        "서버(MongoDB)에 추천 이력을 저장하는 데는 실패했지만, 이 브라우저 이력에는 저장되었습니다."
      );
    } finally {
      setSavingToServer(false);
    }
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

          {savingToServer && (
            <p className="sub-text">서버에 추천 이력을 저장하는 중입니다...</p>
          )}
          {serverError && (
            <p className="error-text" style={{ color: "red" }}>
              {serverError}
            </p>
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
