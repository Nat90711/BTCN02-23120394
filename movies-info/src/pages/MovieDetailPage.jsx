import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { API_URL, getHeaders } from "../utils/constants";
import MovieReviews from "@/components/movies/MovieReviews";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Star, Calendar, Clock, Award, Users, Video } from "lucide-react";

const MovieDetailPage = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  const { data, loading, error } = useFetch(`${API_URL}/movies/${id}`, {
    headers: getHeaders(),
  });

  const movie = data?.data || data;

  // Kiểm tra phim có trong danh sách yêu thích không
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!currentUser) {
        setIsFavorite(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/users/favorites`, {
          headers: getHeaders(),
        });

        if (res.ok) {
          const data = await res.json();
          const favorites = Array.isArray(data) ? data : data.data || [];
          const isInFavorites = favorites.some((fav) => fav.id === id);
          setIsFavorite(isInFavorites);
        }
      } catch (err) {
        console.error("Lỗi kiểm tra yêu thích:", err);
      }
    };

    checkFavoriteStatus();
  }, [id, currentUser]);

  const handleToggleFavorite = async () => {
    if (!currentUser) {
      toast.error("Vui lòng đăng nhập để thích phim!");
      return;
    }

    try {
      if (isFavorite) {
        // Xóa khỏi yêu thích
        const res = await fetch(`${API_URL}/users/favorites/${id}`, {
          method: "DELETE",
          headers: getHeaders(),
        });

        if (res.ok) {
          setIsFavorite(false);
          toast.success("Đã xóa khỏi danh sách yêu thích!");
        } else {
          toast.error("Không thể xóa phim");
        }
      } else {
        // Thêm vào yêu thích
        const res = await fetch(`${API_URL}/users/favorites/${id}`, {
          method: "POST",
          headers: getHeaders(),
        });

        if (res.ok) {
          setIsFavorite(true);
          toast.success("Đã thêm vào danh sách yêu thích!");
        } else {
          const errorData = await res.json();
          if (res.status === 409 || errorData.message?.includes("exist")) {
            setIsFavorite(true);
            toast.info("Phim này đã có trong danh sách rồi!");
          } else {
            toast.error("Lỗi: " + (errorData.message || "Không thể thêm phim"));
          }
        }
      }
    } catch (err) {
      toast.error("Lỗi kết nối server");
    }
  };

  if (loading)
    return (
      <div className="text-center py-20 dark:text-white">
        Đang tải thông tin...
      </div>
    );
  if (error)
    return <div className="text-center py-20 text-red-500">Lỗi: {error}</div>;
  if (!movie) return null;

  const ratingValue =
    movie.ratings?.imDb || movie.ratings?.theMovieDb || movie.rate || "N/A";

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      {/* THÔNG TIN PHIM */}
      <div className="flex flex-col md:flex-row gap-8 mb-16">
        {/* POSTER */}
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 relative group">
            <img
              src={movie.image || "https://placehold.co/400x600?text=No+Image"}
              alt={movie.title}
              className="w-full h-auto object-cover aspect-[2/3] transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          {movie.box_office && (
            <div className="mt-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 p-4 rounded-lg text-center shadow-sm">
              <p className="text-xs text-green-800 dark:text-green-300 uppercase font-bold flex justify-center items-center gap-1 mb-1">
                Revenue
              </p>
              <p className="font-bold text-xl text-green-700 dark:text-green-400">
                {movie.box_office.cumulativeWorldwideGross ||
                  movie.box_office.revenue ||
                  "Đang cập nhật"}
              </p>
            </div>
          )}

          {/* DIRECTORS & ACTORS */}
          <div className="mt-4 space-y-4">
            <div>
              <h4 className="font-bold flex items-center gap-2 mb-3 text-red-600 uppercase text-sm tracking-wide">
                <Video className="w-4 h-4" /> Directors
              </h4>
              <div className="flex flex-wrap gap-2">
                {movie.directors?.map((d, i) => (
                  <Link
                    key={i}
                    to={`/person/${d.id}`}
                    className="text-base font-medium text-slate-800 dark:text-slate-200 border-b-2 border-slate-200 dark:border-slate-700 pb-0.5 hover:text-red-600 hover:border-red-600 transition-colors"
                  >
                    {d.name || d}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold flex items-center gap-2 mb-3 text-red-600 uppercase text-sm tracking-wide">
                <Users className="w-4 h-4" /> Actors
              </h4>
              <div className="flex flex-col gap-3">
                {movie.actors?.slice(0, 10).map((a, i) => (
                  <Link
                    key={i}
                    to={`/person/${a.id}`}
                    className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/50 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-slate-800 transition-colors group"
                  >
                    {a.image ? (
                      <img
                        src={a.image}
                        alt={a.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center text-slate-500 font-bold">
                        {a.name?.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        {a.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {a.character || "Actor"}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CHI TIẾT */}
        <div className="flex-1 text-slate-800 dark:text-white space-y-8">
          <div className="space-y-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 text-slate-900 dark:text-white leading-tight">
                {movie.title}
              </h1>
              {movie.full_title && (
                <h2 className="text-lg text-slate-500 dark:text-slate-400 font-medium">
                  {movie.full_title}
                </h2>
              )}
            </div>

            <div className="flex flex-wrap gap-6 items-center text-sm md:text-base border-y border-slate-200 dark:border-slate-800 py-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500 rounded-full font-bold">
                <Star className="fill-yellow-500 w-5 h-5 border-none" />
                <span>{ratingValue} / 10</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <Calendar className="w-5 h-5" />
                <span>{movie.year}</span>
              </div>
              {movie.runtime && (
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                  <Clock className="w-5 h-5" />
                  <span>{movie.runtime}</span>
                </div>
              )}
              <Button
                variant="outline"
                className={`gap-2 ${
                  isFavorite
                    ? "border-red-600 bg-red-50 dark:bg-red-900/20 text-red-600"
                    : "border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                }`}
                onClick={handleToggleFavorite}
              >
                <Heart
                  className={`w-4 h-4 ${isFavorite ? "fill-red-600" : ""}`}
                />{" "}
                {isFavorite ? "Đã yêu thích" : "Yêu thích"}
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {movie.genres &&
                movie.genres.map((genre, index) => (
                  <span
                    key={index}
                    className="px-4 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all rounded-full text-sm font-medium cursor-default"
                  >
                    {genre}
                  </span>
                ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3 border-l-4 border-red-600 pl-3 uppercase">
              Content
            </h3>
            <div
              className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg text-justify space-y-4"
              dangerouslySetInnerHTML={{
                __html:
                  movie.plot_full ||
                  movie.short_description ||
                  "Đang cập nhật nội dung...",
              }}
            />
          </div>

          {movie.awards && (
            <div className="bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800/50 flex gap-3">
              <Award className="w-8 h-8 text-yellow-600 dark:text-yellow-500 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-yellow-800 dark:text-yellow-500 mb-1">
                  Awards
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 italic">
                  {movie.awards}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* BÌNH LUẬN */}
      <MovieReviews movieId={id} />
    </div>
  );
};

export default MovieDetailPage;
