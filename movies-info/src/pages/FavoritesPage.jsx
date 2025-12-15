import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, Trash2, HeartOff } from "lucide-react";
import { API_URL, getHeaders } from "../utils/constants";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
// 1. Import Pagination Component
import Pagination from "../components/layout/Pagination";

const FavoritesPage = () => {
  const { currentUser } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. State cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số phim mỗi trang

  const fetchFavorites = async () => {
    try {
      const res = await fetch(`${API_URL}/users/favorites`, {
        headers: getHeaders(),
      });
      const data = await res.json();

      console.log(data);

      if (res.ok) {
        setMovies(Array.isArray(data) ? data : data.data || []);
      } else {
        toast.error("Không thể tải danh sách phim yêu thích");
      }
    } catch (error) {
      console.error("Lỗi tải favorites:", error);
      toast.error("Lỗi kết nối server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchFavorites();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  const handleRemove = async (e, movieId) => {
    e.preventDefault();
    const previousMovies = [...movies];
    // Xóa khỏi state tổng
    const newMovies = movies.filter((m) => m.id !== movieId);
    setMovies(newMovies);

    // Nếu xóa hết phim ở trang hiện tại, lùi về trang trước
    if (
      currentPage > 1 &&
      newMovies.length <= (currentPage - 1) * itemsPerPage
    ) {
      setCurrentPage(currentPage - 1);
    }

    try {
      const res = await fetch(`${API_URL}/users/favorites/${movieId}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      if (res.ok) {
        toast.success("Đã xóa phim khỏi danh sách");
      } else {
        setMovies(previousMovies);
        toast.error("Lỗi khi xóa phim");
      }
    } catch (error) {
      setMovies(previousMovies);
      toast.error("Lỗi kết nối server");
    }
  };

  // 3. Logic cắt trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMovies = movies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(movies.length / itemsPerPage);

  if (!currentUser)
    return (
      <div className="py-20 text-center">
        Vui lòng đăng nhập để xem danh sách.
      </div>
    );
  if (loading)
    return (
      <div className="py-20 text-center">Đang tải danh sách yêu thích...</div>
    );

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 border-l-4 border-red-600 pl-4 uppercase dark:text-white flex items-center gap-3">
        Phim Yêu Thích{" "}
        <span className="text-lg font-normal text-slate-500">
          ({movies.length})
        </span>
      </h1>

      {movies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <HeartOff className="w-16 h-16 mb-4 opacity-50" />
          <p className="text-lg">Danh sách đang trống.</p>
          <Link to="/" className="mt-4 text-red-600 hover:underline">
            Khám phá phim ngay
          </Link>
        </div>
      ) : (
        <>
          {/* Grid hiển thị danh sách */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {currentMovies.map((movie) => (
              <div
                key={movie.id}
                className="relative group animate-in fade-in zoom-in duration-300"
              >
                <Link to={`/movie/${movie.id}`}>
                  <div className="rounded-lg overflow-hidden shadow-lg bg-slate-200 dark:bg-slate-800 aspect-[2/3] transition-transform hover:scale-105">
                    <img
                      src={
                        movie.image_url ||
                        "https://placehold.co/400x600?text=No+Image"
                      }
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                      <h3 className="text-white font-bold text-sm line-clamp-2">
                        {movie.title}
                      </h3>
                      <div className="flex items-center gap-1 text-yellow-400 mt-1">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="text-xs font-bold">
                          {movie.external_ratings.imDb || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>

                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 w-8 h-8 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  onClick={(e) => handleRemove(e, movie.id)}
                  title="Xóa khỏi danh sách"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Component Phân trang */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </>
      )}
    </div>
  );
};

export default FavoritesPage;
