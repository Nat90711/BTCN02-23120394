import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "../ui/button";

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

  const currentMovies = movieList.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="my-8 relative group/slider">
      <h2 className="text-xl font-bold uppercase dark:text-white border-l-4 border-red-600 pl-3 mb-4">
        {title}
      </h2>

      <div className="relative">
        <div className="grid grid-cols-3 gap-6">
          {currentMovies.map((movie) => (
            <div
              key={movie.id}
              className="group relative rounded-lg overflow-hidden cursor-pointer shadow-lg bg-slate-200 dark:bg-slate-800 h-[350px]"
            >
              <img
                src={
                  movie.image || "https://placehold.co/400x600?text=No+Image"
                }
                alt={movie.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
                <p className="text-gray-300 text-xs mt-2 line-clamp-2">
                  {movie.short_description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          disabled={startIndex === 0}
          className={`absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 dark:bg-slate-800/80 rounded-full shadow-md hover:bg-red-600 hover:text-white transition-all ${
            startIndex === 0 ? "opacity-0 hidden" : "opacity-100"
          }`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          disabled={startIndex + itemsPerPage >= movieList.length}
          className={`absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 dark:bg-slate-800/80 rounded-full shadow-md hover:bg-red-600 hover:text-white transition-all ${
            startIndex + itemsPerPage >= movieList.length
              ? "opacity-0 hidden"
              : "opacity-100"
          }`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default MovieSlider;
