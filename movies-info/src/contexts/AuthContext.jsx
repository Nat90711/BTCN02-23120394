import React, { createContext, useContext, useState, useEffect } from "react";
import { API_URL, getHeaders } from "../utils/constants";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Check trạng thái đăng nhập khi F5 trang
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        try {
          // Gọi API Profile
          const res = await fetch(`${API_URL}/users/profile`, {
            headers: getHeaders(),
          });

          const data = await res.json();

          if (res.ok) {
            // API trả về thông tin user (id, username, email, role...)
            setCurrentUser(data.data || data);
          } else {
            console.warn("Token hết hạn:", data.message);
            // Token lỗi thì logout luôn
            await logout();
          }
        } catch (error) {
          console.error("Lỗi xác thực:", error);
        }
      }
      setIsLoading(false);
    };

    checkLoginStatus();
  }, []);

  // 2. HÀM ĐĂNG NHẬP
  const login = async (loginData) => {
    // loginData: { username, password }
    const res = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(loginData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Đăng nhập thất bại");
    }

    const token = data.token;
    const user = data.user;

    if (token) {
      localStorage.setItem("accessToken", token);

      // API Login đã trả về user, ta set luôn state
      if (user) {
        setCurrentUser(user);
      } else {
        await fetchProfile();
      }
    } else {
      throw new Error("Lỗi hệ thống: Không nhận được Token");
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API_URL}/users/profile`, {
        headers: getHeaders(),
      });
      const data = await res.json();
      if (res.ok) {
        setCurrentUser(data.data || data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 3. HÀM ĐĂNG KÝ
  const register = async (registerData) => {
    // registerData: { username, email, password, phone, dob }
    const res = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(registerData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Đăng ký thất bại");
    }
    return data;
  };

  // 4. HÀM ĐĂNG XUẤT
  const logout = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        await fetch(`${API_URL}/users/logout`, {
          method: "POST",
          headers: getHeaders(),
        });
      }
    } catch (error) {
      console.error("Lỗi khi gọi API logout:", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("currentUser");
      setCurrentUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, register, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
