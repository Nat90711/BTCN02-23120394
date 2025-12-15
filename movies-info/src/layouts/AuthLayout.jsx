import React from "react";
import { Outlet } from "react-router-dom";
import { Film } from "lucide-react";

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div className="mb-8 flex items-center gap-2">
        <div className="bg-red-600 p-2 rounded-lg">
          <Film className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Movie<span className="text-red-600">App</span>
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
