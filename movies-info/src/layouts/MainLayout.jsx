import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import NavBar from "../components/layout/NavBar";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-950 transition-colors">
      <Header />
      <NavBar />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-[1200px]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
