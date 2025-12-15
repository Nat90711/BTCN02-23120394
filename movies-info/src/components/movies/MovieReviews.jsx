import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { API_URL, getHeaders } from "../../utils/constants";
import { Star, MessageSquare } from "lucide-react";
import Pagination from "../layout/Pagination";

// Component hiển thị từng review
const ReviewItem = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 300;

  const content = review.content || "";
  const shouldTruncate = content.length > maxLength;
  const displayContent =
    !isExpanded && shouldTruncate
      ? content.substring(0, maxLength) + "..."
      : content;

  const userName = review.username || "Anonymous";
  const rating = review.rate || "NA";
  const dateStr = review.date || "NA";

  return (
    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-pink-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-bold text-slate-800 dark:text-slate-200 text-base">
              {userName}
            </div>
            {rating && (
              <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold mt-0.5">
                <Star className="w-3 h-3 fill-current" />
                <span>{rating}/10</span>
              </div>
            )}
          </div>
        </div>
        <div className="text-xs text-slate-400 font-medium bg-white dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
          {dateStr ? new Date(dateStr).toLocaleDateString("vi-VN") : "Gần đây"}
        </div>
      </div>

      {review.title && (
        <h4 className="font-bold text-sm mb-2 text-slate-900 dark:text-white uppercase tracking-wide">
          {review.title}
        </h4>
      )}

      <div className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed border-l-4 border-slate-300 dark:border-slate-700 pl-4 py-1 bg-white/50 dark:bg-transparent rounded-r-lg">
        "{displayContent}"
      </div>

      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
        >
          {isExpanded ? "Thu gọn" : "Xem thêm"}
        </button>
      )}
    </div>
  );
};

const MovieReviews = ({ movieId }) => {
  const [page, setPage] = useState(1);
  const limit = 4; // Lấy4 review mỗi trang

  const url = `${API_URL}/movies/${movieId}/reviews?page=${page}&limit=${limit}`;

  const {
    data: responseData,
    loading,
    error,
  } = useFetch(url, { headers: getHeaders() });

  const reviews = responseData?.data || [];
  const pagination = responseData?.pagination || {};

  const totalItems = pagination.total_items || 0;
  const totalPages = pagination.total_pages || 1;

  // Xử lý Loading
  if (loading && page === 1)
    return (
      <div className="py-10 text-center text-slate-500">
        Đang tải bình luận...
      </div>
    );

  // Nếu không có bình luận nào
  if (!loading && totalItems === 0) {
    return (
      <div className="border-t border-slate-200 dark:border-slate-800 pt-10 mt-10">
        <h3 className="text-2xl font-bold mb-4 border-l-4 border-red-600 pl-4 uppercase flex items-center gap-3 text-slate-900 dark:text-white">
          <MessageSquare className="w-6 h-6" /> Bình Luận
        </h3>
        <p className="text-slate-500 italic">
          Chưa có bình luận nào cho phim này.
        </p>
      </div>
    );
  }

  return (
    <div className="border-t border-slate-200 dark:border-slate-800 pt-10 mt-10">
      <h3 className="text-2xl font-bold mb-8 border-l-4 border-red-600 pl-4 uppercase flex items-center gap-3 text-slate-900 dark:text-white">
        <MessageSquare className="w-6 h-6" /> Comments{" "}
        <span className="text-slate-400 text-lg font-normal">
          ({totalItems})
        </span>
      </h3>

      {loading ? (
        <div className="py-10 text-center text-slate-400 animate-pulse">
          Đang tải trang {page}...
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2">
          {reviews.map((review, index) => (
            <ReviewItem key={review.id || index} review={review} />
          ))}
        </div>
      )}

      {/* Hiển thị phân trang nếu có nhiều hơn 1 trang */}
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(p) => setPage(p)}
        />
      )}
    </div>
  );
};

export default MovieReviews;
