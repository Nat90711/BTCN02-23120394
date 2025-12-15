import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { API_URL, getHeaders } from "../utils/constants";
import {
  Star,
  Calendar,
  Clock,
  Award,
  Users,
  Video,
  DollarSign,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// --- COMPONENT CON: XỬ LÝ TỪNG BÌNH LUẬN  ---
const ReviewItem = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 300;

  const content = review.content || "";
  const shouldTruncate = content.length > maxLength;

  const displayContent =
    !isExpanded && shouldTruncate
      ? content.substring(0, maxLength) + "..."
      : content;

  return (
    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-pink-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            {review.user?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <div className="font-bold text-slate-800 dark:text-slate-200 text-base">
              {review.user}
            </div>
            {review.rate && (
              <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold mt-0.5">
                <Star className="w-3 h-3 fill-current" />
                <span>{review.rate}/10</span>
              </div>
            )}
          </div>
        </div>
        <div className="text-xs text-slate-400 font-medium bg-white dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
          {new Date(review.date).toLocaleDateString("vi-VN")}
        </div>
      </div>

      {review.title && (
        <h4 className="font-bold text-base mb-2 text-slate-900 dark:text-white">
          {review.title}
        </h4>
      )}

      <div className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed border-l-4 border-slate-300 dark:border-slate-700 pl-4 py-1 bg-white/50 dark:bg-transparent rounded-r-lg">
        "{displayContent}"
      </div>

      {/* Nút Xem thêm / Thu gọn */}
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
        >
          {isExpanded ? (
            <>
              Thu gọn <ChevronUp className="w-3 h-3" />
            </>
          ) : (
            <>
              Xem thêm <ChevronDown className="w-3 h-3" />
            </>
          )}
        </button>
      )}
    </div>
  );
};
// -----------------------------------------------------------------------

const MovieDetailPage = () => {
  const { id } = useParams();

  const { data, loading, error } = useFetch(`${API_URL}/movies/${id}`, {
    headers: getHeaders(),
  });

  const movie = data?.data || data;

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
            {movie.image && (
              <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                HD
              </div>
            )}
          </div>
          {movie.box_office && (
            <div className="mt-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 p-4 rounded-lg text-center shadow-sm">
              <p className="text-xs text-green-800 dark:text-green-300 uppercase font-bold flex justify-center items-center gap-1 mb-1">
                Doanh Thu
              </p>
              <p className="font-bold text-xl text-green-700 dark:text-green-400">
                {movie.box_office.cumulativeWorldwideGross ||
                  movie.box_office.revenue ||
                  "Đang cập nhật"}
              </p>
            </div>
          )}
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
              Nội Dung
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold flex items-center gap-2 mb-3 text-red-600 uppercase text-sm tracking-wide">
                <Video className="w-4 h-4" /> Đạo Diễn
              </h4>
              <div className="flex flex-wrap gap-2">
                {movie.directors?.map((d, i) => (
                  <span
                    key={i}
                    className="text-base font-medium text-slate-800 dark:text-slate-200 border-b-2 border-slate-200 dark:border-slate-700 pb-0.5"
                  >
                    {d.name || d}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold flex items-center gap-2 mb-3 text-red-600 uppercase text-sm tracking-wide">
                <Users className="w-4 h-4" /> Diễn Viên Chính
              </h4>
              <div className="flex flex-col gap-3">
                {movie.actors?.slice(0, 4).map((a, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/50 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
                  </div>
                ))}
              </div>
            </div>
          </div>

          {movie.awards && (
            <div className="bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800/50 flex gap-3">
              <Award className="w-8 h-8 text-yellow-600 dark:text-yellow-500 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-yellow-800 dark:text-yellow-500 mb-1">
                  Giải Thưởng
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
      {movie.reviews && movie.reviews.length > 0 && (
        <div className="border-t border-slate-200 dark:border-slate-800 pt-10 mt-10">
          <h3 className="text-2xl font-bold mb-8 border-l-4 border-red-600 pl-4 uppercase flex items-center gap-3 text-slate-900 dark:text-white">
            <MessageSquare className="w-6 h-6" /> Comments{" "}
            <span className="text-slate-400 text-lg font-normal">
              ({movie.reviews.length})
            </span>
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {movie.reviews.map((review, index) => (
              <ReviewItem key={index} review={review} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailPage;
