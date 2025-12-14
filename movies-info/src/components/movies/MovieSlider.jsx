import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "../ui/button";

const MovieSlider = ({ title, movies }) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3; // Yêu cầu: hiển thị 3 phim/lần

  // --- PHẦN SỬA LỖI QUAN TRỌNG ---
  // 1. Trích xuất mảng phim từ Object trả về của API
  // Kiểm tra: Nếu movies có thuộc tính .data thì lấy .data, nếu không thì coi nó là mảng rỗng
  const movieList = movies?.data || [];

  // 2. Nếu không có phim nào thì không hiển thị component này
  if (movieList.length === 0) {
    return null;
  }
  // -------------------------------

  const nextSlide = () => {
    if (startIndex + itemsPerPage < movieList.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const prevSlide = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  // Cắt danh sách phim để hiển thị (Lấy từ mảng movieList đã xử lý)
  const currentMovies = movieList.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="my-8">
      {/* Header của Slider */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold uppercase dark:text-white border-l-4 border-red-600 pl-3">
          {title}
        </h2>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            disabled={startIndex === 0}
            className="rounded-full hover:bg-red-50 dark:hover:bg-slate-800"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            disabled={startIndex + itemsPerPage >= movieList.length}
            className="rounded-full hover:bg-red-50 dark:hover:bg-slate-800"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Grid hiển thị phim */}
      <div className="grid grid-cols-3 gap-6">
        {currentMovies.map((movie) => (
          <div
            key={movie.id}
            className="group relative rounded-lg overflow-hidden cursor-pointer shadow-lg bg-slate-200 dark:bg-slate-800 h-[350px]"
          >
            {/* Ảnh Poster (Dùng field 'image' theo API) */}
            <img
              src={movie.image || "https://placehold.co/400x600?text=No+Image"}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay hiệu ứng Hover (Highlight) */}
            <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="text-white font-bold text-lg line-clamp-2">
                {movie.title}
              </h3>

              <div className="flex items-center gap-1 text-yellow-400 mt-1">
                <Star className="w-4 h-4 fill-yellow-400" />
                <span className="text-sm font-bold">{movie.rate || "N/A"}</span>
              </div>

              <div className="flex flex-wrap gap-1 mt-2">
                {movie.genres &&
                  movie.genres.slice(0, 2).map((genre, index) => (
                    <span
                      key={index}
                      className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded"
                    >
                      {genre}
                    </span>
                  ))}
              </div>

              <p className="text-gray-300 text-xs mt-2 line-clamp-2">
                {movie.short_description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSlider;
