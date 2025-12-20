import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const layoutStyle = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
};

const mainStyle = {
  flex: 1,
};

// BOM + DOM: 초기 테마를 localStorage / OS 설정에서 읽어오기
function getInitialTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  try {
    const stored = window.localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") {
      return stored;
    }

    // 저장된 값이 없으면 OS 다크모드 선호 여부 확인
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
  } catch (e) {
    console.error("theme init error", e);
  }

  return "light";
}

export default function Layout({ children }) {
  const [scrolled, setScrolled] = useState(false); // 헤더 스크롤 상태
  const [showScrollTop, setShowScrollTop] = useState(false); // 맨 위로 버튼
  const [theme, setTheme] = useState(getInitialTheme); // 다크/라이트 테마

  // BOM 기능 1: 테마를 html에 클래스 붙이고 localStorage에 저장
  useEffect(() => {
    try {
      const root = document.documentElement;
      root.classList.remove("theme-light", "theme-dark");
      root.classList.add(theme === "dark" ? "theme-dark" : "theme-light");
      window.localStorage.setItem("theme", theme);
    } catch (e) {
      console.error("theme apply error", e);
    }
  }, [theme]);

  // BOM 기능 2: window.scrollY 감시 -> 헤더 스타일 + 맨 위로 버튼 표시
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      setScrolled(y > 10); // 헤더 배경/그림자 ON
      setShowScrollTop(y > 300); // 스크롤 좀 내리면 맨 위로 버튼 ON
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 처음 로딩 때 한 번 체크

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div style={layoutStyle} className="app-shell">
      {/*  헤더는 원래대로: Header만 감싸고, 스크롤 시 배경/그림자만 변경 */}
      <div
        className={scrolled ? "header-wrapper header-scrolled" : "header-wrapper"}
      >
        <Header />
      </div>

      <main style={mainStyle} className="site-main">
        {children}
      </main>

      <Footer />

      {/*  다크 모드 버튼: 화면 왼쪽 아래로 분리 */}
      <button
        type="button"
        className="theme-toggle-btn"
        onClick={toggleTheme}
      >
        {theme === "dark" ? "라이트 모드" : "다크 모드"}
      </button>

      {/*  맨 위로 버튼: 오른쪽 아래 유지 */}
      {showScrollTop && (
        <button
          type="button"
          className="scroll-top-button"
          onClick={handleScrollTop}
        >
          ↑ 맨 위로
        </button>
      )}
    </div>
  );
}
