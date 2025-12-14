import React from "react";
import { useSearchParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { API_URL, getHeaders } from "../utils/constants";
import { Star } from "lucide-react";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const searchUrl = query
    ? `${API_URL}/movies/search?q=${query}&limit=20`
    : null;

  const {
    data: moviesData,
    loading,
    error,
  } = useFetch(searchUrl, { headers: getHeaders() });

  const movies = moviesData?.data || [];

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">
        Kết quả tìm kiếm cho: <span className="text-red-600">"{query}"</span>
      </h2>

      {loading && (
        <div className="text-center py-10 dark:text-gray-300">
          Đang tìm kiếm phim...
        </div>
      )}
      {error && (
        <div className="text-center py-10 text-red-500">Lỗi: {error}</div>
      )}

      {!loading && movies.length === 0 && query && (
        <div className="text-center py-10 text-gray-500 text-lg">
          Không tìm thấy phim nào phù hợp.
        </div>
      )}

      {/* Grid hiển thị kết quả */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="group relative rounded-lg overflow-hidden cursor-pointer shadow-lg bg-slate-200 dark:bg-slate-800 aspect-[2/3] transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={movie.image || "https://placehold.co/400x600?text=No+Image"}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
