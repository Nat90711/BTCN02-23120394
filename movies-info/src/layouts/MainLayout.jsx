import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import NavBar from "../components/layout/NavBar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-200 dark:bg-black py-4 px-4 flex justify-center">
      <div className="w-full max-w-[1200px] bg-white dark:bg-slate-950 shadow-2xl rounded-sm overflow-hidden flex flex-col min-h-[90vh] border border-slate-300 dark:border-slate-800">
        <Header />
        <NavBar />

        <main className="flex-1 px-4 py-8">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
