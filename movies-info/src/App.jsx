import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import PersonDetailPage from "./pages/PersonDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="movie/:id" element={<MovieDetailPage />} />
          <Route path="person/:id" element={<PersonDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
