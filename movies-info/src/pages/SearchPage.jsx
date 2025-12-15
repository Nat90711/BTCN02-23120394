import React from "react";
import { useSearchParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { API_URL, getHeaders } from "../utils/constants";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import Pagination from "../components/layout/Pagination";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || searchParams.get("q") || "";

  // 1. Lấy trang hiện tại từ URL, mặc định là 1
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const itemsPerPage = 10; // API default limit

  // 2. Gọi API với tham số page
  const searchUrl = query
    ? `${API_URL}/movies/search?q=${query}&page=${currentPage}&limit=${itemsPerPage}`
    : null;

  const {
    data: responseData,
    loading,
    error,
  } = useFetch(searchUrl, { headers: getHeaders() });

  const movies = responseData?.data || [];
  const paginationInfo = responseData?.pagination || {};
  const totalPages = paginationInfo.total_pages || 1;

  // Hàm chuyển trang: cập nhật URL, giữ nguyên từ khóa tìm kiếm
  const handlePageChange = (newPage) => {
    setSearchParams({ query, page: newPage });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen flex flex-col">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">
        Kết quả tìm kiếm cho: <span className="text-red-600">"{query}"</span>
        {movies.length > 0 && (
          <span className="text-sm font-normal text-slate-500 ml-2">
            (Trang {currentPage}/{totalPages})
          </span>
        )}
      </h2>

      {loading && (
        <div className="text-center py-20 dark:text-gray-300">
          Đang tìm kiếm phim...
        </div>
      )}
      {error && (
        <div className="text-center py-20 text-red-500">Lỗi: {error}</div>
      )}

      {!loading && movies.length === 0 && query && (
        <div className="text-center py-20 text-gray-500 text-lg">
          Không tìm thấy phim nào phù hợp.
        </div>
      )}

      {/* Grid kết quả */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 flex-1">
        {movies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>
            <div className="group relative rounded-lg overflow-hidden cursor-pointer shadow-lg bg-slate-200 dark:bg-slate-800 aspect-[2/3] transition-all duration-300 hover:scale-105 hover:shadow-2xl">
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
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 3. Hiển thị Pagination nếu có nhiều hơn 1 trang */}
      {!loading && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default SearchPage;
