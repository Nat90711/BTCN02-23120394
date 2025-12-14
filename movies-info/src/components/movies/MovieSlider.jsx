import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

const MovieSlider = ({ title, movies }) => {
  // Biến state lưu vị trí bắt đầu của danh sách đang hiển thị
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;

  // Hàm chuyển sang trang sau
  const nextSlide = () => {
    if (startIndex + itemsPerPage < movies.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  // Hàm quay lại trang trước
  const prevSlide = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  // Nếu không có phim nào thì không hiển thị gì cả
  if (!movies || movies.length === 0) return null;

  // Cắt ra 3 phim để hiển thị dựa trên startIndex
  const currentMovies = movies.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="my-8">
      {/* 1. Phần Tiêu đề và Nút điều hướng */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold uppercase dark:text-white border-l-4 border-red-600 pl-3">
          {title}
        </h2>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            disabled={startIndex === 0} // Mờ nút nếu đang ở đầu
            className="rounded-full hover:bg-red-50 dark:hover:bg-slate-800"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            disabled={startIndex + itemsPerPage >= movies.length} // Mờ nút nếu đã hết phim
            className="rounded-full hover:bg-red-50 dark:hover:bg-slate-800"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* 2. Phần lưới hiển thị 3 phim (Grid) */}
      <div className="grid grid-cols-3 gap-6">
        {currentMovies.map((movie) => (
          <div
            key={movie._id || movie.id}
            className="group relative rounded-lg overflow-hidden cursor-pointer shadow-lg"
          >
            {/* Ảnh Poster */}
            <div className="aspect-[2/3] bg-slate-200">
              {/* Kiểm tra nhiều trường hợp tên ảnh trả về từ API */}
              <img
                src={
                  movie.poster_url ||
                  movie.thumb_url ||
                  "https://placehold.co/400x600?text=No+Image"
                }
                alt={movie.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Lớp phủ đen mờ khi hover (Hiệu ứng highlight theo yêu cầu) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="text-white font-bold text-lg truncate">
                {movie.name}
              </h3>
              <p className="text-yellow-400 text-sm">{movie.origin_name}</p>
              <p className="text-slate-300 text-xs mt-1">{movie.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSlider;
