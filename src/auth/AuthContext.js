// src/auth/AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  //  앱 시작할 때 localStorage에서 바로 복구
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("authUser");
      if (!stored) return null;
      return JSON.parse(stored); // { id, username }
    } catch (e) {
      console.error("authUser parse error:", e);
      return null;
    }
  });

  // 공통: 로그인 상태 세팅 + localStorage 저장
  const setAuthUser = (id, username) => {
    const authUser = { id, username };
    setUser(authUser);

    // 메인 로그인 정보
    localStorage.setItem("authUser", JSON.stringify(authUser));

    // 추천 이력 / 몽고DB용 보조 정보
    localStorage.setItem("userId", String(id));
    localStorage.setItem("username", username);
  };

  // 회원가입 → MySQL
  const signup = async (username, password) => {
    try {
      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "회원가입에 실패했습니다.");
        return false;
      }

      setAuthUser(data.id, data.username);
      return true;
    } catch (err) {
      console.error("signup error:", err);
      alert("서버 오류로 회원가입에 실패했습니다.");
      return false;
    }
  };

  // 로그인 -> MySQL
  const login = async (username, password) => {
    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "로그인에 실패했습니다.");
        return false;
      }

      setAuthUser(data.id, data.username);
      return true;
    } catch (err) {
      console.error("login error:", err);
      alert("서버 오류로 로그인에 실패했습니다.");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
  };

  const value = {
    user,
    isLoggedIn: !!user, //  Header에서 쓰기 좋게 넣어줌
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
