import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function CertSelectPage() {
  const navigate = useNavigate();
  const [cert, setCert] = useState("TOEIC");

  const goToGoal = () => {
    navigate("/goal", { state: { cert } });
  };

  const goToDetail = () => {
    const encoded = encodeURIComponent(cert);
    navigate(`/cert/${encoded}`);
  };

  return (
    <div className="page">
      <h1>자격증 선택</h1>
      <p className="sub-text">
        먼저 준비하고 싶은 자격증을 선택한 뒤, 학습 목표를 설정하세요.
      </p>

      <label>자격증 종류</label>
      <select value={cert} onChange={(e) => setCert(e.target.value)}>
        <option value="TOEIC">TOEIC</option>
        <option value="정보처리기사">정보처리기사</option>
        <option value="컴활1급">컴활 1급</option>
        <option value="한국사">한국사</option>
      </select>

      <div className="button-row">
        <button onClick={goToGoal} className="button">
          학습 목표 설정으로 이동
        </button>
        <button onClick={goToDetail} className="button secondary">
          선택한 자격증 상세 보기
        </button>
      </div>

      <div className="link-row">
        <Link to="/" className="link">
          ← 홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
