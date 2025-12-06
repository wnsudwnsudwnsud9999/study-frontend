import React from "react";
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
  return (
    <div style={layoutStyle}>
      <Header />
      <main style={mainStyle}>{children}</main>
      <Footer />
    </div>
  );
}
