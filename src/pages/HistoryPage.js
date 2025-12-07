// src/pages/HistoryPage.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function HistoryPage() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // 현재 로그인한 userId
  const userId = user?.id;

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      setErrorMsg("로그인 정보가 없습니다. 다시 로그인 해주세요.");
      return;
    }

    const fetchHistory = async () => {
      try {
        setLoading(true);
        setErrorMsg("");

        const res = await fetch(
          `http://localhost:4000/api/recommend/${userId}`
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "추천 이력 조회에 실패했습니다.");
        }

        setHistory(data);
      } catch (err) {
        console.error("추천 이력 조회 오류:", err);
        setErrorMsg("추천 이력을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userId]);

  const handleClear = async () => {
    if (!userId) return;

    if (!window.confirm("정말로 내 추천 이력을 모두 삭제할까요?")) {
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:4000/api/recommend/${userId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "이력 삭제에 실패했습니다.");
      }

      // 화면에서도 비우기
      setHistory([]);
      alert("추천 이력이 모두 삭제되었습니다.");
    } catch (err) {
      console.error("추천 이력 삭제 오류:", err);
      alert("추천 이력을 삭제하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="page">
      <h1>추천 이력</h1>
      <p>지금까지 저장한 AI 추천 기록을 한 눈에 볼 수 있는 페이지입니다.</p>

      {loading ? (
        <p>추천 이력을 불러오는 중입니다...</p>
      ) : errorMsg ? (
        <p className="error-text">{errorMsg}</p>
      ) : history.length === 0 ? (
        <p className="empty-text">아직 저장된 추천 이력이 없습니다.</p>
      ) : (
        <>
          <ul className="history-list">
            {history.map((item) => (
              <li key={item._id} className="history-item">
                <div className="history-header">
                  <span className="history-cert">{item.cert || "미지정"}</span>
                  <span className="history-date">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleString()
                      : ""}
                  </span>
                </div>
                <div className="history-body">
                  <p>
                    <strong>현재 레벨:</strong>{" "}
                    {item.currentLevel || "정보 없음"} →{" "}
                    <strong>목표 레벨:</strong>{" "}
                    {item.targetLevel || "정보 없음"}
                  </p>
                  <p>
                    <strong>남은 기간:</strong>{" "}
                    {item.days != null ? item.days : "-"}일 /{" "}
                    <strong>하루 가능 시간:</strong>{" "}
                    {item.dailyHour != null ? item.dailyHour : "-"}시간
                  </p>
                  <p>
                    <strong>권장 학습 시간:</strong>{" "}
                    {item.recommendedTime != null
                      ? item.recommendedTime
                      : "-"}
                    시간
                  </p>
                  <p>
                    <strong>추천 난이도:</strong>{" "}
                    {item.difficulty != null ? item.difficulty : "-"}
                  </p>
                  <p className="history-message">{item.message}</p>
                </div>
              </li>
            ))}
          </ul>

          <button onClick={handleClear} className="button secondary">
            이력 전체 삭제
          </button>
        </>
      )}

      <div className="link-row">
        <Link to="/" className="link">
          ← 홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
