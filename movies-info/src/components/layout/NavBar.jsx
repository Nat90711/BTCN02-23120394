import React from "react";
import { Home, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const NavBar = () => {
  return (
    <div className="bg-blue-50 dark:bg-slate-900 py-4 border-b dark:border-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4 flex items-center gap-4 max-w-[1200px]">
        <Button variant="outline" size="icon" className="shrink-0">
          <Home className="w-4 h-4" />
        </Button>
        <div className="flex-1 flex gap-2 justify-end max-w-lg ml-auto">
          <Input
            type="text"
            placeholder="Tìm tên phim, diễn viên..."
            className="bg-white dark:bg-slate-950"
          />
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
