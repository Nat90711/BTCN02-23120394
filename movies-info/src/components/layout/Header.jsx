import React from "react";
import { Film, Moon } from "lucide-react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="border-b bg-white py-3">
      <div className="container mx-auto px-4 flex items-center justify-between max-w-[1200px]">
        <div className="text-sm font-medium text-slate-600">23120394</div>

        <div className="flex items-center gap-2 text-xl font-bold text-red-600">
          <Film className="w-6 h-6" />
          <span>Movies Info</span>
        </div>

        <Button variant="ghost" size="icon" className="rounded-full">
          <Moon className="w-5 h-5 text-slate-600" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
