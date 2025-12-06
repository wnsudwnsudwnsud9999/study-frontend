import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // 새로고침해도 로그인 유지
  useEffect(() => {
    const stored = localStorage.getItem("authUser");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to parse authUser", error);
      }
    }
  }, []);

  // 로그인: localStorage에 저장된 users 목록에서 확인
  const login = (id, password) => {
    const raw = localStorage.getItem("users");
    const users = raw ? JSON.parse(raw) : [];

    const found = users.find(
      (u) => u.id === id.trim() && u.password === password
    );

    if (!found) {
      alert("아이디 또는 비밀번호가 올바르지 않습니다.");
      return false;
    }

    const authUser = { id: found.id };
    setUser(authUser);
    localStorage.setItem("authUser", JSON.stringify(authUser));
    return true;
  };

  // 회원가입: users 배열에 추가 + 자동 로그인
  const signup = (id, password) => {
    const trimmedId = id.trim();
    if (!trimmedId || !password) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return false;
    }

    const raw = localStorage.getItem("users");
    const users = raw ? JSON.parse(raw) : [];

    if (users.find((u) => u.id === trimmedId)) {
      alert("이미 사용 중인 아이디입니다.");
      return false;
    }

    const newUser = { id: trimmedId, password };
    const nextUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(nextUsers));

    const authUser = { id: trimmedId };
    setUser(authUser);
    localStorage.setItem("authUser", JSON.stringify(authUser));

    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  const value = {
    user,
    isLoggedIn: !!user,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
