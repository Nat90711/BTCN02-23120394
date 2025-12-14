import React from "react";
import { useFetch } from "../hooks/useFetch";
import { API_URL, getHeaders } from "../utils/constants";

const HomePage = () => {
  // 1. Gọi API lấy danh sách phim Phổ biến (Most Popular)
  const {
    data: popularMovies,
    loading,
    error,
  } = useFetch(`${API_URL}/movies/most-popular`, { headers: getHeaders() });

  // 2. Xử lý trạng thái đang tải hoặc lỗi
  if (loading)
    return (
      <div className="text-center py-20 dark:text-white">
        Đang tải dữ liệu phim...
      </div>
    );
  if (error)
    return (
      <div className="text-center py-20 text-red-500">Lỗi kết nối: {error}</div>
    );

  return (
    <div className="space-y-8">
      {/* 3. Hiển thị tạm thời để test kết nối */}
      <section>
        <h2 className="text-2xl font-bold mb-4 dark:text-white">
          Kết nối thành công! Tìm thấy {popularMovies?.length || 0} phim.
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Lấy 4 phim đầu tiên ra hiển thị thử */}
          {popularMovies &&
            popularMovies.slice(0, 4).map((movie) => (
              <div
                key={movie.id}
                className="p-4 border rounded bg-white dark:bg-slate-800 dark:border-slate-700"
              >
                <h3 className="font-bold dark:text-yellow-400">
                  {movie.title || movie.name}
                </h3>
                <p className="text-sm text-slate-500">
                  {movie.releaseDate || movie.firstAirDate}
                </p>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
