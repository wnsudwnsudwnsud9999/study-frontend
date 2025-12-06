import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/test")
      .then((res) => res.json())
      .then((data) => setMsg(data.message))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="page">
      <h1>자격증 학습 추천 플랫폼</h1>

      <p>백엔드 상태: {msg}</p>

      <Link to="/select" className="button">시작하기</Link>
    </div>
  );
}
