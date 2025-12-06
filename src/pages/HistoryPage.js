import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("recommendHistory");
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);
      setHistory(parsed);
    } catch (error) {
      console.error("Failed to parse recommendation history", error);
    }
  }, []);

  const handleClear = () => {
    localStorage.removeItem("recommendHistory");
    setHistory([]);
  };

  return (
    <div className="page">
      <h1>추천 이력</h1>
      <p>지금까지 저장한 AI 추천 기록을 한 눈에 볼 수 있는 페이지입니다.</p>

      {history.length === 0 ? (
        <p className="empty-text">아직 저장된 추천 이력이 없습니다.</p>
      ) : (
        <>
          <ul className="history-list">
            {history.map((item) => (
              <li key={item.id} className="history-item">
                <div className="history-header">
                  <span className="history-cert">{item.cert}</span>
                  <span className="history-date">
                    {new Date(item.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="history-body">
                  <p>
                    <strong>현재 레벨:</strong> {item.current} →{" "}
                    <strong>목표 레벨:</strong> {item.target}
                  </p>
                  <p>
                    <strong>남은 기간:</strong> {item.days}일 /{" "}
                    <strong>하루 가능 시간:</strong> {item.daily}시간
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
