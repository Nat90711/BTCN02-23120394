import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Film } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const AuthLayout = () => {
  const { currentUser, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Nếu đã đăng nhập rồi thì redirect về homepage
    if (!isLoading && currentUser) {
      navigate("/", { replace: true });
    }
  }, [currentUser, isLoading, navigate]);

  // Đang loading thì hiển thị loading state
  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-slate-500">Đang tải...</div>
      </div>
    );
  }

  // Đã đăng nhập rồi thì không render gì (đang redirect)
  if (currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div className="mb-8 flex items-center gap-2">
        <div className="bg-red-600 p-2 rounded-lg">
          <Film className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Movies<span className="text-red-600">Info</span>
        </span>
      </div>
      <Outlet />

      <div className="mt-8 text-sm text-slate-500">
        &copy; MovieInfo. All rights reserved.
      </div>
    </div>
  );
};

export default AuthLayout;
