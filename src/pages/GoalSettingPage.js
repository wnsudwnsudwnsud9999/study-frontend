import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function GoalSettingPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [current, setCurrent] = useState("");
  const [target, setTarget] = useState("");
  const [days, setDays] = useState("");
  const [daily, setDaily] = useState("");

  const next = () => {
    navigate("/recommend", {
      state: { cert: state.cert, current, target, days, daily }
    });
  };

  return (
    <div className="page">
      <h1>학습 목표 설정</h1>

      <label>현재 레벨:</label>
      <input value={current} onChange={(e) => setCurrent(e.target.value)} />

      <label>목표 레벨:</label>
      <input value={target} onChange={(e) => setTarget(e.target.value)} />

      <label>남은 기간(일):</label>
      <input value={days} onChange={(e) => setDays(e.target.value)} />

      <label>하루 가능 시간(시간):</label>
      <input value={daily} onChange={(e) => setDaily(e.target.value)} />

      <button onClick={next} className="button">AI 추천 받기</button>
    </div>
  );
}
