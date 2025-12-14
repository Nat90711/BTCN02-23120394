import { useState } from "react";
import "./App.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import NavBar from "./components/layout/NavBar";

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <NavBar />
        <Footer />
      </div>
    </>
  );
}

export default App;
