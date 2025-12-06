import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CertSelectPage() {
  const navigate = useNavigate();
  const [cert, setCert] = useState("TOEIC");

  const next = () => {
    navigate("/goal", { state: { cert } });
  };

  return (
    <div className="page">
      <h1>자격증 선택</h1>

      <select value={cert} onChange={(e) => setCert(e.target.value)}>
        <option value="TOEIC">TOEIC</option>
        <option value="정보처리기사">정보처리기사</option>
        <option value="컴활1급">컴활 1급</option>
        <option value="한국사">한국사</option>
      </select>

      <button onClick={next} className="button">다음</button>
    </div>
  );
}
