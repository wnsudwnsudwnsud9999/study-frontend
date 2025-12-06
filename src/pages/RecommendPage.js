import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function RecommendPage() {
  const { state } = useLocation();
  const [result, setResult] = useState(null);

  useEffect(() => {
    // ⚠ 실제로는 TensorFlow.js 모델이 계산해야 하는 부분
    setResult({
      recommendedTime: 2.3,
      difficulty: 3,
      message: "오늘은 2.3시간 공부가 적당하며 난이도 3 문제를 추천합니다."
    });
  }, []);

  return (
    <div className="page">
      <h1>AI 추천 결과</h1>

      {!result ? (
        <p>로딩중...</p>
      ) : (
        <>
          <p>권장 학습 시간: {result.recommendedTime}시간</p>
          <p>추천 난이도: {result.difficulty}</p>
          <p>{result.message}</p>
        </>
      )}
    </div>
  );
}
