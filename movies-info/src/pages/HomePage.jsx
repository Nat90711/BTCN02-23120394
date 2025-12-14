import React from "react";

const HomePage = () => {
  return (
    <div className="space-y-8">
      <section className="bg-slate-200 dark:bg-slate-800 h-[300px] flex items-center justify-center rounded-lg">
        <h2 className="text-xl font-bold dark:text-white">Banner Phim</h2>
      </section>

      <section>
        <h3 className="text-xl font-bold mb-4 dark:text-white">
          Phim Phổ Biến
        </h3>
        <div className="p-10 border border-dashed border-slate-400 rounded text-center dark:text-slate-400">
          Danh sách phim
        </div>
      </section>
    </div>
  );
};

export default HomePage;
