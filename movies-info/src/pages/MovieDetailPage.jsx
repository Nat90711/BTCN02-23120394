import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { API_URL, getHeaders } from "../utils/constants";
import { Star, Calendar } from "lucide-react";

const MovieDetailPage = () => {
  const { id } = useParams(); // Lấy ID phim từ URL

  // Gọi API lấy chi tiết phim
  const {
    data: movie,
    loading,
    error,
  } = useFetch(`${API_URL}/movies/${id}`, { headers: getHeaders() });

  if (loading)
    return (
      <div className="text-center py-20 dark:text-white">
        Đang tải thông tin phim...
      </div>
    );
  if (error)
    return <div className="text-center py-20 text-red-500">Lỗi: {error}</div>;
  if (!movie) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/*Poster Phim */}
        <div className="w-full md:w-1/3 max-w-[400px] mx-auto">
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <img
              src={
                movie.image ||
                movie.poster_url ||
                "https://placehold.co/400x600?text=No+Image"
              }
              alt={movie.title || movie.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/*Thông tin chi tiết */}
        <div className="flex-1 space-y-6 text-slate-800 dark:text-white">
          <h1 className="text-4xl font-bold">{movie.title || movie.name}</h1>

          {/* Rating & Năm */}
          <div className="flex items-center gap-6 text-lg">
            <div className="flex items-center gap-1 text-yellow-500 font-bold">
              <Star className="fill-yellow-500" />
              <span>{movie.rate || "N/A"}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <Calendar className="w-5 h-5" />
              <span>{movie.year || movie.release_date}</span>
            </div>
          </div>

          {/* Thể loại */}
          <div className="flex flex-wrap gap-2">
            {movie.genres &&
              movie.genres.map((genre, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-red-600 text-white rounded-full text-sm"
                >
                  {genre}
                </span>
              ))}
          </div>

          {/* Nội dung phim */}
          <div>
            <h3 className="text-xl font-bold mb-2 border-l-4 border-red-600 pl-3">
              Nội Dung
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
              {movie.short_description ||
                movie.description ||
                "Chưa có mô tả chi tiết cho phim này."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
