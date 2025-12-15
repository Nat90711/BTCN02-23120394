import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "../ui/button";

const NavBar = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(`/search?query=${keyword}`);
      setKeyword("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4 max-w-[1200px]">
        {/* Icon Home */}
        <Link
          to="/"
          className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors text-black dark:text-white"
        >
          <Home className="w-6 h-6" />
        </Link>

        {/* Cụm tìm kiếm */}
        <div className="flex items-center gap-2 w-full max-w-lg justify-end">
          <div className="flex w-full max-w-[400px] items-center gap-2">
            <input
              type="text"
              placeholder="Search"
              className="flex-1 h-10 bg-white px-4 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-950 dark:border-slate-700 dark:text-white shadow-sm"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button
              onClick={handleSearch}
              className="h-10 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 shadow-sm dark:bg-red-500"
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
