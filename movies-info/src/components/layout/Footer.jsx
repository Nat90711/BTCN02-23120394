import React from "react";
import { Github, Mail, Facebook, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-6 transition-colors mt-auto">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Thông tin bên trái */}
          <div className="flex flex-col md:flex-row items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-600" />
              Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM
            </span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-red-600" />
              23120394@student.hcmus.edu.vn
            </span>
          </div>

          {/* Copyright và social links */}
          <div className="flex items-center gap-4">
            <p className="text-sm text-slate-500 dark:text-slate-500">
              © {new Date().getFullYear()} Movies Info
            </p>
            <div className="flex gap-2">
              <a
                href="https://github.com/Nat90711"
                target="_blank"
                rel="noreferrer"
                className="bg-slate-200 dark:bg-slate-800 p-2 rounded-full hover:bg-red-600 hover:text-white transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/nguyen.tuan.270258/"
                target="_blank"
                rel="noreferrer"
                className="bg-slate-200 dark:bg-slate-800 p-2 rounded-full hover:bg-red-600 hover:text-white transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
