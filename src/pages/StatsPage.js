import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function StatsPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("recommendHistory");
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);

      // 저장된 이력을 그래프용 데이터로 변환
      // 최신 이력이 위에 쌓이도록 저장했으니, 그래프는 시간순으로 보이게 뒤집어줌
      const chartData = parsed
        .slice()
        .reverse()
        .map((item, index) => ({
          index: index + 1,
          label: new Date(item.createdAt).toLocaleDateString(),
          recommendedTime: item.recommendedTime,
        }));

      setData(chartData);
    } catch (error) {
      console.error("Failed to parse recommendation history", error);
    }
  }, []);

  return (
    <div className="page">
      <h1>학습 추천 통계</h1>
      <p className="sub-text">
        지금까지 받은 추천의 권장 학습 시간을 그래프로 시각화한 화면입니다.
      </p>

      {data.length === 0 ? (
        <p className="empty-text">
          추천 이력이 없어서 통계를 표시할 수 없습니다. 먼저 추천을 받아 이력을
          저장해보세요.
        </p>
      ) : (
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="recommendedTime"
                stroke="#0077ff"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="link-row">
        <Link to="/history" className="link">
          ← 추천 이력으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
