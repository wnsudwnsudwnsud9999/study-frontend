import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function StudyCalendarPage() {
  const [value, setValue] = useState(new Date());
  const [finishedDates, setFinishedDates] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("studyFinishedDates");
    if (stored) {
      try {
        setFinishedDates(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to parse studyFinishedDates", error);
      }
    }
  }, []);

  const handleDateClick = (date) => {
    const dateKey = date.toISOString().split("T")[0];

    let next;
    if (finishedDates.includes(dateKey)) {
      // 이미 완료로 표시된 날짜면 해제
      next = finishedDates.filter((d) => d !== dateKey);
    } else {
      // 새로 완료로 표시
      next = [...finishedDates, dateKey];
    }

    setFinishedDates(next);
    localStorage.setItem("studyFinishedDates", JSON.stringify(next));
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateKey = date.toISOString().split("T")[0];
      if (finishedDates.includes(dateKey)) {
        return "study-done";
      }
    }
    return null;
  };

  return (
    <div className="page">
      {/* 이 컴포넌트 전용 스타일 (공부 완료 날짜 색칠용) */}
      <style>
        {`
          .study-done {
            background: #0077ff;
            color: white !important;
            border-radius: 50%;
          }
        `}
      </style>

      <h1>학습 캘린더</h1>
      <p className="sub-text">
        공부한 날을 달력에서 클릭해 표시해보세요. 다시 누르면 해제됩니다.
      </p>

      <Calendar
        onChange={setValue}
        value={value}
        onClickDay={handleDateClick}
        tileClassName={tileClassName}
      />

      <div className="link-row">
        <Link to="/" className="link">
          ← 홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
