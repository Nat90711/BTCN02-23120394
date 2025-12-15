import React from "react";
import {
  Settings,
  LogIn,
  LogOut,
  UserPlus,
  Moon,
  Sun,
  Heart,
  User,
} from "lucide-react";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "sonner";
const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Đăng xuất thành công", {
      duration: 2000,
    });
    navigate("/");
  };

  return (
    <header className="border-b bg-white dark:bg-black py-3">
      <div className="container mx-auto px-4 flex items-center justify-between max-w-[1200px] relative">
        <div className="text-l font-bold">23120394</div>

        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 text-xl font-bold text-red-600">
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
                className="rounded-full hover:bg-red-100 dark:hover:bg-slate-800 transition-colors relative"
              >
                {/* Nếu đã login thì hiện icon User màu đỏ, chưa thì hiện Răng cưa */}
                {currentUser ? (
                  <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold shadow-md">
                    {currentUser.username?.charAt(0).toUpperCase() || "U"}
                  </div>
                ) : (
                  <Settings className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                )}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              {/* --- LOGIC HIỂN THỊ MENU --- */}
              {currentUser ? (
                // MENU KHI ĐÃ ĐĂNG NHẬP
                <>
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>Xin chào, {currentUser.username}</span>
                      <span className="text-xs text-slate-400 font-normal">
                        {currentUser.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <Link to="/profile">
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Hồ sơ cá nhân</span>
                    </DropdownMenuItem>
                  </Link>

                  {/* Link tới trang yêu thích */}
                  <Link to="/favorites">
                    <DropdownMenuItem className="cursor-pointer">
                      <Heart className="mr-2 h-4 w-4 text-red-500" />
                      <span>Phim yêu thích</span>
                    </DropdownMenuItem>
                  </Link>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                </>
              ) : (
                // MENU KHI CHƯA ĐĂNG NHẬP (GUEST)
                <>
                  <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link to="/login">
                    <DropdownMenuItem className="cursor-pointer">
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Đăng nhập</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/register">
                    <DropdownMenuItem className="cursor-pointer">
                      <UserPlus className="mr-2 h-4 w-4" />
                      <span>Đăng ký</span>
                    </DropdownMenuItem>
                  </Link>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
