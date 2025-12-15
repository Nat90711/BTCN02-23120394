import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { API_URL, getHeaders } from "../utils/constants";
import { Star } from "lucide-react";
import Pagination from "@/components/layout/Pagination";

const PersonDetailPage = () => {
  const { id } = useParams();

  const { data, loading, error } = useFetch(`${API_URL}/persons/${id}`, {
    headers: getHeaders(),
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const person = data?.data || data;

  if (loading)
    return (
      <div className="text-center py-20 dark:text-white">
        Đang tải thông tin...
      </div>
    );
  if (error)
    return <div className="text-center py-20 text-red-500">Lỗi: {error}</div>;
  if (!person) return null;

  // Lấy danh sách phim từ trường 'known_for' có sẵn trong API
  const knownMovies = person.known_for || [];

  // Logic cắt trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMovies = knownMovies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(knownMovies.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    document
      .getElementById("movie-list")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* --- ẢNH & THÔNG TIN CÁ NHÂN --- */}
        <div className="w-full md:w-1/4">
          <div className="rounded-xl overflow-hidden shadow-2xl aspect-[2/3] border-4 border-white dark:border-slate-800 mb-6">
            <img
              src={person.image || "https://placehold.co/400x600?text=No+Image"}
              alt={person.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2">
              Thông Tin Cá Nhân
            </h3>

            {person.role && (
              <div>
                <span className="block text-xs text-slate-500 uppercase font-bold">
                  Nghề Nghiệp
                </span>
                <span className="text-slate-800 dark:text-slate-300">
                  {person.role}
                </span>
              </div>
            )}

            {person.birth_date && (
              <div>
                <span className="block text-xs text-slate-500 uppercase font-bold">
                  Ngày Sinh
                </span>
                <span className="text-slate-800 dark:text-slate-300">
                  {person.birth_date}
                </span>
              </div>
            )}

            {person.death_date && (
              <div>
                <span className="block text-xs text-slate-500 uppercase font-bold">
                  Ngày Mất
                </span>
                <span className="text-slate-800 dark:text-slate-300">
                  {person.death_date}
                </span>
              </div>
            )}

            {person.height && (
              <div>
                <span className="block text-xs text-slate-500 uppercase font-bold">
                  Chiều Cao
                </span>
                <span className="text-slate-800 dark:text-slate-300">
                  {person.height}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* --- TIỂU SỬ & DANH SÁCH PHIM --- */}
        <div className="flex-1 text-slate-800 dark:text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
            {person.name}
          </h1>

          {/* Tiểu sử */}
          <div className="mb-10">
            <h3 className="text-xl font-bold mb-3 border-l-4 border-red-600 pl-3 uppercase">
              Tiểu Sử
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg text-justify whitespace-pre-line">
              {person.summary || "Chưa có thông tin tiểu sử."}
            </p>
          </div>

          {/* Danh sách phim */}
          <div id="movie-list">
            <h3 className="text-2xl font-bold mb-6 border-b pb-4 border-slate-200 dark:border-slate-800 flex items-center gap-2">
              Các Phim Đã Tham Gia{" "}
              <span className="text-lg font-normal text-slate-500">
                ({knownMovies.length})
              </span>
            </h3>

            {knownMovies.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {currentMovies.map((movie, index) => (
                    <Link
                      key={`${movie.id}-${index}`}
                      to={`/movie/${movie.id}`}
                      className="block"
                    >
                      <div className="group relative rounded-lg overflow-hidden cursor-pointer shadow-lg bg-slate-200 dark:bg-slate-800 aspect-[2/3] transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-1">
                        <img
                          src={
                            movie.image ||
                            "https://placehold.co/400x600?text=No+Image"
                          }
                          alt={movie.title}
                          className="w-full h-full object-cover"
                        />
                        {/* Overlay thông tin */}
                        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                          <h3 className="text-white font-bold text-sm line-clamp-2 mb-1">
                            {movie.title}
                          </h3>

                          {(movie.character || movie.role) && (
                            <p className="text-xs text-slate-300 mb-2 italic">
                              Vai: {movie.character || movie.role}
                            </p>
                          )}

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 text-yellow-400">
                              <Star className="w-3 h-3 fill-current" />
                              <span className="text-xs font-bold">
                                {movie.rate || "N/A"}
                              </span>
                            </div>
                            <span className="text-xs text-slate-400">
                              {movie.year}
                            </span>
                          </div>
                        </div>
                      </div>
                      <h4 className="mt-2 text-sm font-bold text-slate-800 dark:text-white truncate group-hover:text-red-600 transition-colors">
                        {movie.title}
                      </h4>
                    </Link>
                  ))}
                </div>

                {/* Component Phân trang */}
                {totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-slate-500 text-center py-10 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                Chưa có dữ liệu phim tham gia.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetailPage;
