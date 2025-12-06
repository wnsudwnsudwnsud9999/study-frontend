import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

export default function GoalSettingPage() {
  const location = useLocation();
  const state = location.state || {};
  const navigate = useNavigate();

  const [current, setCurrent] = useState("");
  const [target, setTarget] = useState("");
  const [days, setDays] = useState("");
  const [daily, setDaily] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!current.trim()) {
      newErrors.current = "현재 레벨을 입력해주세요.";
    } else if (isNaN(current) || Number(current) < 0) {
      newErrors.current = "현재 레벨은 0 이상의 숫자여야 합니다.";
    }

    if (!target.trim()) {
      newErrors.target = "목표 레벨을 입력해주세요.";
    } else if (isNaN(target) || Number(target) <= 0) {
      newErrors.target = "목표 레벨은 0보다 큰 숫자여야 합니다.";
    }

    if (!days.trim()) {
      newErrors.days = "남은 기간(일)을 입력해주세요.";
    } else if (!Number.isInteger(Number(days)) || Number(days) <= 0) {
      newErrors.days = "남은 기간은 1 이상의 정수여야 합니다.";
    }

    if (!daily.trim()) {
      newErrors.daily = "하루 가능 시간을 입력해주세요.";
    } else if (isNaN(daily) || Number(daily) <= 0) {
      newErrors.daily = "하루 가능 시간은 0보다 큰 숫자여야 합니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const next = () => {
    if (!validate()) {
      return;
    }

    navigate("/recommend", {
      state: {
        cert: state.cert || "미지정",
        current,
        target,
        days,
        daily,
      },
    });
  };

  return (
    <div className="page">
      <h1>학습 목표 설정</h1>
      {state.cert && (
        <p className="sub-text">
          선택한 자격증: <strong>{state.cert}</strong>
        </p>
      )}

      <label>현재 레벨</label>
      <input
        value={current}
        onChange={(e) => setCurrent(e.target.value)}
        placeholder="예: 600 (점수, 등급 등)"
      />
      {errors.current && <p className="error-text">{errors.current}</p>}

      <label>목표 레벨</label>
      <input
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        placeholder="예: 900"
      />
      {errors.target && <p className="error-text">{errors.target}</p>}

      <label>남은 기간(일)</label>
      <input
        value={days}
        onChange={(e) => setDays(e.target.value)}
        placeholder="예: 90"
      />
      {errors.days && <p className="error-text">{errors.days}</p>}

      <label>하루 가능 시간(시간)</label>
      <input
        value={daily}
        onChange={(e) => setDaily(e.target.value)}
        placeholder="예: 2.5"
      />
      {errors.daily && <p className="error-text">{errors.daily}</p>}

      <button onClick={next} className="button">
        AI 추천 받기
      </button>

      <div className="link-row">
        <Link to="/select" className="link">
          ← 자격증 다시 선택하기
        </Link>
      </div>
    </div>
  );
}
