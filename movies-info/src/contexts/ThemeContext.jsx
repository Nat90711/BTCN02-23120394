import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

// Tạo Provider
export const ThemeProvider = ({ children }) => {
  // Khởi tạo state: Ưu tiên lấy từ localStorage, nếu không có thì lấy theo cài đặt máy tính
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Hàm đảo ngược trạng thái (dùng cho nút Switch)
  const toggleTheme = (checked) => {
    setIsDarkMode(checked);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
