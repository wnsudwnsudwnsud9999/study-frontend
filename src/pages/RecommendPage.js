// src/pages/RecommendPage.js
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../auth/AuthContext";
import { predictStudyTime } from "../ai/tfRecommend";

export default function RecommendPage() {
  const location = useLocation();
  // location.state 에서 필요한 값만 꺼냄
  const { cert, current, target, days, daily } = location.state || {};
  // 현재 로그인한 사용자
  const { user } = useAuth();

  const [result, setResult] = useState(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  // 백엔드 저장 상태
  const [savingToServer, setSavingToServer] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const dailyNum = Number(daily) || 1;
      const daysNum = Number(days) || 1;

      // 기본값 (TF.js 실패 대비)
      let recommendedTime = Math.min(dailyNum + 1, 6);

      //  TensorFlow.js 로 예측 시도
      try {
        const aiTime = await predictStudyTime({
          current,
          target,
          days: daysNum,
          daily: dailyNum,
        });

        if (typeof aiTime === "number" && !Number.isNaN(aiTime)) {
          recommendedTime = aiTime;
        }
      } catch (err) {
        console.error("TensorFlow.js 예측 오류:", err);
      }

      const difficulty = cert === "정보처리기사" ? 4 : 3;

      const message = cert
        ? `${cert} 합격을 위해 오늘은 약 ${recommendedTime}시간 정도 공부하고, 난이도 ${difficulty} 수준의 문제를 풀어보는 것을 추천합니다.`
        : `입력된 정보가 없어 기본 추천을 표시합니다. 오늘은 ${recommendedTime}시간 정도 공부를 추천합니다.`;

      if (!cancelled) {
        setResult({
          recommendedTime,
          difficulty,
          message,
          calculatedFrom: {
            daily: dailyNum,
            days: daysNum,
          },
        });
        setLoading(false);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [cert, current, target, daily, days]);

  const handleSaveHistory = async () => {
    if (!result) return;

    // 로그인 확인
    if (!user || !user.id) {
      alert("로그인 정보가 없어 추천 이력을 저장할 수 없습니다. 다시 로그인해주세요.");
      return;
    }

    // 1) localStorage 에도 저장 (DOM/BOM 활용)
    const historyItem = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      cert: cert || "미지정",
      current: current || "",
      target: target || "",
      days: days || "",
      daily: daily || "",
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

    // 2) MongoDB(백엔드)에도 저장
    setSavingToServer(true);
    setServerError("");

    const payload = {
      userId: user.id, // MySQL users.id
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

      {cert && (
        <p className="sub-text">
          선택한 자격증: <strong>{cert}</strong>
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
