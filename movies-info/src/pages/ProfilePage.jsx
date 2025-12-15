import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "../contexts/AuthContext";
import { API_URL, getHeaders } from "../utils/constants";
import { toast } from "sonner";
import {
  Loader2,
  User,
  Phone,
  Calendar,
  Mail,
  Save,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";

// Schema validate: Cho phép sửa Email, Phone, DOB
const profileSchema = z.object({
  username: z.string(), // Read-only
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().min(10, "Số điện thoại phải có ít nhất 10 số"),
  dob: z.string().min(1, "Vui lòng chọn ngày sinh"),
});

const ProfilePage = () => {
  const { currentUser } = useAuth();

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      dob: "",
    },
  });

  // 1. Đổ dữ liệu user vào form
  useEffect(() => {
    if (currentUser) {
      form.reset({
        username: currentUser.username || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        // Cắt chuỗi ngày sinh để lấy yyyy-MM-dd cho input date
        dob: currentUser.dob ? currentUser.dob.split("T")[0] : "",
      });
    }
  }, [currentUser, form]);

  // 2. Hàm xử lý Cập nhật (PATCH)
  const onSubmit = async (data) => {
    try {
      const updateData = {
        email: data.email,
        phone: data.phone,
        dob: data.dob,
      };

      const res = await fetch(`${API_URL}/users/profile`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify(updateData),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Cập nhật hồ sơ thành công!");

        const newUser = result.data || result;
        localStorage.setItem("currentUser", JSON.stringify(newUser));

        // Reload lại trang để AuthContext nhận diện dữ liệu mới
        window.location.reload();
      } else {
        toast.error("Lỗi: " + (result.message || "Không thể cập nhật"));
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi kết nối server");
    }
  };

  if (!currentUser)
    return (
      <div className="text-center py-20">Vui lòng đăng nhập để xem hồ sơ.</div>
    );

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen flex justify-center items-start">
      <Card className="w-full max-w-2xl shadow-xl border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4">
        {/* HEADER */}
        <CardHeader className="text-center border-b border-slate-100 dark:border-slate-800 pb-6 bg-slate-50/50 dark:bg-slate-900/50 rounded-t-xl">
          <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-pink-600 text-white flex items-center justify-center text-4xl font-bold mb-4 shadow-lg ring-4 ring-white dark:ring-slate-800">
            {currentUser.username?.charAt(0).toUpperCase()}
          </div>
          <CardTitle className="text-2xl font-bold text-slate-800 dark:text-white">
            {currentUser.username}
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-8 px-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Username (Read-only) */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 font-semibold text-slate-600 dark:text-slate-300">
                        <User className="w-4 h-4" /> Username
                      </FormLabel>
                      <FormControl>
                        {/* Disabled input */}
                        <Input
                          {...field}
                          disabled
                          className="bg-slate-100 dark:bg-slate-800 text-slate-500 cursor-not-allowed border-slate-200 dark:border-slate-700"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Email (Editable) */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 font-semibold text-slate-600 dark:text-slate-300">
                        <Mail className="w-4 h-4" /> Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Cập nhật email..."
                          className="focus:ring-red-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone (Editable) */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 font-semibold text-slate-600 dark:text-slate-300">
                        <Phone className="w-4 h-4" /> Số điện thoại
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="0901234567"
                          className="focus:ring-red-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* DOB (Editable) */}
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 font-semibold text-slate-600 dark:text-slate-300">
                        <Calendar className="w-4 h-4" /> Ngày sinh
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          className="focus:ring-red-500 block"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                {/* Link sang trang Favorites theo yêu cầu */}
                <Link to="/favorites">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full md:w-auto gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <Heart className="w-4 h-4" /> Xem phim yêu thích
                  </Button>
                </Link>

                <Button
                  type="submit"
                  className="w-full md:w-auto bg-red-600 hover:bg-red-700 gap-2 font-bold shadow-md shadow-red-200 dark:shadow-none"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang
                      lưu...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" /> Lưu thay đổi
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
