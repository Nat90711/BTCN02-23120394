import React, { useState } from "react";
import { ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import { Button } from "../ui/button";

const Banner = ({ movies }) => {
  const [current, setCurrent] = useState(0);

  // 1. Lấy dữ liệu an toàn từ API (chọc vào .data)
  const movieList = movies?.data || [];

  // 2. Chỉ lấy 5 phim đầu tiên cho Banner
  const bannerMovies = movieList.slice(0, 5);

  // Nếu chưa có dữ liệu thì không hiện gì cả
  if (bannerMovies.length === 0) return null;

  const movie = bannerMovies[current];

  const nextSlide = () => {
    setCurrent((prev) => (prev === bannerMovies.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? bannerMovies.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-xl shadow-2xl group mt-6">
      <img
        src={movie.image || "https://placehold.co/1200x600?text=No+Image"}
        alt={movie.title}
        className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent flex items-center">
        <div className="container mx-auto px-8 md:px-12">
          <div className="max-w-xl space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
              {movie.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-gray-300">
              <span className="text-yellow-400 font-bold">
                ★ {movie.rate || "N/A"}
              </span>
              <span>|</span>
              <span>{movie.year}</span>
            </div>

            <p className="text-gray-200 line-clamp-3 text-base md:text-lg drop-shadow-md">
              {movie.short_description || "Đang cập nhật mô tả..."}
            </p>

            <div className="flex gap-4 pt-4">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 text-lg h-12"
              >
                <PlayCircle className="w-5 h-5 mr-2" />
                Xem Ngay
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* NÚT ĐIỀU HƯỚNG */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-red-600 backdrop-blur-sm text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-red-600 backdrop-blur-sm text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <ChevronRight size={28} />
      </button>

      {/* DẤU CHẤM TRANG */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {bannerMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-red-600 w-8"
                : "bg-white/50 w-2 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
