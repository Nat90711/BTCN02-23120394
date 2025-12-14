import React from "react";
import { useFetch } from "../hooks/useFetch";
import { API_URL, getHeaders } from "../utils/constants";
import MovieSlider from "../components/movies/MovieSlider";

const HomePage = () => {
  // 1. Gọi API lấy 30 phim Phổ biến
  const { data: popularMovies, loading: loadingPopular } = useFetch(
    `${API_URL}/movies/most-popular?limit=30`,
    { headers: getHeaders() }
  );

  // 2. Gọi API lấy 30 phim Đánh giá cao
  const { data: topRatedMovies, loading: loadingTopRated } = useFetch(
    `${API_URL}/movies/top-rated?limit=30`,
    { headers: getHeaders() }
  );

  // Hiển thị màn hình chờ khi đang tải
  if (loadingPopular || loadingTopRated) {
    return (
      <div className="text-center py-20 dark:text-white">Đang tải phim...</div>
    );
  }

  return (
    <div className="space-y-12 pb-10">
      <section className="h-[400px] bg-slate-800 rounded-lg flex items-center justify-center text-white">
        Banner Top 5 Phim sẽ nằm ở đây
      </section>

      <section>
        <MovieSlider title="Most Popular" movies={popularMovies} />
      </section>

      <section>
        <MovieSlider title="Top Rating" movies={topRatedMovies} />
      </section>
    </div>
  );
};

export default HomePage;
