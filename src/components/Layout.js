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

export default function Layout({ children }) {
  const [scrolled, setScrolled] = useState(false);

  // DOM 기능 3: 스크롤 위치에 따라 헤더 배경/그림자 변경
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 처음 로딩 시에도 한번 체크

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={layoutStyle}
      className={scrolled ? "app-shell scrolled" : "app-shell"}
    >
      {/* 헤더를 감싸는 래퍼에 클래스를 줘서 스타일링 */}
      <div className={scrolled ? "header-wrapper header-scrolled" : "header-wrapper"}>
        <Header />
      </div>

      <main style={mainStyle} className="site-main">
        {children}
      </main>

      <Footer />
    </div>
  );
}
