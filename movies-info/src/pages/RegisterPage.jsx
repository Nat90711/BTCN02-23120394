import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";

const registerSchema = z
  .object({
    username: z.string().min(2, "Username phải có ít nhất 2 ký tự"),
    email: z.string().email("Email không hợp lệ"),
    phone: z.string().min(10, "Số điện thoại không hợp lệ"),
    dob: z.string().min(1, "Vui lòng chọn ngày sinh"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register: registerAuth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      // Gọi API đăng ký
      await registerAuth({
        username: data.username,
        email: data.email,
        password: data.password,
        phone: data.phone,
        dob: data.dob,
      });

      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 px-4 py-8">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-red-600 mb-2">Đăng Ký</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Tạo tài khoản thành viên
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white">
              Username
            </label>
            <input
              {...register("username")}
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-red-500 outline-none"
              placeholder="nguyenvana"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-red-500 outline-none"
              placeholder="name@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone & DOB */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-white">
                Số điện thoại
              </label>
              <input
                {...register("phone")}
                type="tel"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-red-500 outline-none"
                placeholder="0901234567"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 dark:text-white">
                Ngày sinh
              </label>
              <input
                {...register("dob")}
                type="date"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-red-500 outline-none"
              />
              {errors.dob && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.dob.message}
                </p>
              )}
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white">
              Mật khẩu
            </label>
            <input
              {...register("password")}
              type="password"
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-red-500 outline-none"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white">
              Xác nhận mật khẩu
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-red-500 outline-none"
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg mt-4"
          >
            {isSubmitting ? "Đang xử lý..." : "Đăng Ký"}
          </Button>
        </form>

        <p className="text-center mt-6 text-sm text-slate-500">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-red-600 hover:underline font-bold">
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
