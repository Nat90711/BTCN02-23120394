import React from "react";
import { Settings, LogIn, UserPlus, Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useTheme } from "../../contexts/ThemeContext";

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="border-b bg-white dark:bg-black py-3">
      <div className="container mx-auto px-4 flex items-center justify-between max-w-[1200px]">
        <div className="text-l font-bold">23120394</div>

        <div className="flex items-center gap-2 text-xl font-bold text-red-600">
          <span>Movies Info</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-orange-500" />

            {/* Gắn hàm toggleTheme vào Switch */}
            <Switch
              checked={isDarkMode}
              onCheckedChange={toggleTheme}
              className="data-[state=checked]:bg-slate-600"
            />

            <Moon className="w-4 h-4 text-slate-600 dark:text-slate-300" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-red-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Settings className="w-6 h-6 text-slate-700 dark:text-slate-300 animate-in spin-in-3" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to="/login">
                <DropdownMenuItem>
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>Đăng nhập</span>
                </DropdownMenuItem>
              </Link>
              <Link to="/register">
                <DropdownMenuItem>
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>Đăng ký</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
