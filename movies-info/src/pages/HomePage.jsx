import React from "react";
import { useFetch } from "../hooks/useFetch";
import { API_URL, getHeaders } from "../utils/constants";
import MovieSlider from "../components/movies/MovieSlider";
import Banner from "@/components/movies/Banner";
import { Spinner } from "@/components/ui/spinner";

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
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Spinner className="size-12 text-primary" />
        <p className="text-lg text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-10">
      <section>
        <Banner movies={popularMovies} />
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
