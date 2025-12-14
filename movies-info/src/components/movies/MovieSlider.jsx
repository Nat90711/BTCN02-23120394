import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const MovieSlider = ({ title, movies }) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;

  const movieList = movies?.data || [];

  if (movieList.length === 0) return null;

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

  return (
    <div className="my-8 relative group/slider">
      <h2 className="text-xl font-bold uppercase dark:text-white border-l-4 border-red-600 pl-3 mb-4">
        {title}
      </h2>
      <div className="relative overflow-hidden py-4">
        {/* TRACK CHỨA PHIM */}
        <div
          className="flex transition-transform duration-500 ease-out will-change-transform"
          style={{
            transform: `translateX(-${(startIndex / itemsPerPage) * 100}%)`,
          }}
        >
          {movieList.map((movie) => (
            <div key={movie.id} className="min-w-[33.333333%] px-3 box-border">
              <div className="group relative rounded-lg overflow-hidden cursor-pointer shadow-lg bg-slate-200 dark:bg-slate-800 h-[350px] transition-all duration-300 hover:scale-105 hover:z-50 hover:shadow-2xl">
                <img
                  src={
                    movie.image || "https://placehold.co/400x600?text=No+Image"
                  }
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white font-bold text-lg line-clamp-2">
                    {movie.title}
                  </h3>
                  <div className="flex items-center gap-1 text-yellow-400 mt-1">
                    <Star className="w-4 h-4 fill-yellow-400" />
                    <span className="text-sm font-bold">
                      {movie.rate || "N/A"}
                    </span>
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
            </div>
          ))}
        </div>

        {/* NÚT ĐIỀU HƯỚNG */}
        <button
          onClick={prevSlide}
          disabled={startIndex === 0}
          className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 dark:bg-slate-800/80 rounded-full shadow-md hover:bg-red-600 hover:text-white transition-all ${
            startIndex === 0 ? "opacity-0 invisible" : "opacity-100 visible"
          }`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          disabled={startIndex + itemsPerPage >= movieList.length}
          className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 dark:bg-slate-800/80 rounded-full shadow-md hover:bg-red-600 hover:text-white transition-all ${
            startIndex + itemsPerPage >= movieList.length
              ? "opacity-0 invisible"
              : "opacity-100 visible"
          }`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default MovieSlider;
