import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    const rawUserId = localStorage.getItem("userId");
    if (!rawUserId) {
      setServerError("로그인 정보가 없어 추천 이력을 불러올 수 없습니다.");
      setLoading(false);
      return;
    }

    const userId = Number(rawUserId);

    async function fetchHistory() {
      try {
        const res = await fetch(
          `http://localhost:4000/api/recommend?userId=${userId}`
        );

        if (!res.ok) {
          throw new Error("서버 응답 오류");
        }

        const data = await res.json();
        setHistory(data);
      } catch (err) {
        console.error("추천 이력 불러오기 실패:", err);
        setServerError("서버에서 추천 이력을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, []);

  // 로컬스토리지만 지우는 기능 (서버 DB는 그대로 유지)
  const handleClearLocal = () => {
    localStorage.removeItem("recommendHistory");
    alert("브라우저(LocalStorage) 기록만 삭제되었습니다.");
  };

  return (
    <div className="page">
      <h1>추천 이력</h1>
      <p>서버(MongoDB)에서 불러온 나의 학습 추천 기록입니다.</p>

      {loading && <p>불러오는 중...</p>}

      {serverError && (
        <p style={{ color: "red", marginTop: "10px" }}>{serverError}</p>
      )}

      {!loading && !serverError && history.length === 0 && (
        <p className="empty-text">아직 저장된 추천 이력이 없습니다.</p>
      )}

      {!loading && history.length > 0 && (
        <>
          <ul className="history-list">
            {history.map((item) => (
              <li key={item._id} className="history-item">
                <div className="history-header">
                  <span className="history-cert">{item.cert}</span>
                  <span className="history-date">
                    {new Date(item.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="history-body">
                  <p>
                    <strong>현재 레벨:</strong> {item.currentLevel} →{" "}
                    <strong>목표 레벨:</strong> {item.targetLevel}
                  </p>
                  <p>
                    <strong>남은 기간:</strong> {item.days}일 /{" "}
                    <strong>하루 가능 시간:</strong> {item.dailyHour}시간
                  </p>
                  <p>
                    <strong>권장 학습 시간:</strong> {item.recommendedTime}시간
                  </p>
                  <p>
                    <strong>추천 난이도:</strong> {item.difficulty}
                  </p>
                  <p className="history-message">{item.message}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* 원하면 서버 기록 삭제 기능도 추가 가능 */}
          <button onClick={handleClearLocal} className="button secondary">
            브라우저(LocalStorage) 이력 삭제
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
