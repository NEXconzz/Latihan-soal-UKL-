"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<{ name: string; username: string } | null>(null);
  const [today, setToday] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    setUser({
      name: "Nuryadi Eka",
      username: "admin",
    });

    const date = new Date().toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setToday(date);
  }, [router]);

  const handlePresensi = () => {
    setMessage("✅ Presensi berhasil dicatat!");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-blue-300 flex items-center justify-center p-6 font-sans">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-lg transition-all duration-300 hover:shadow-blue-300/50">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Selamat Datang,{" "}
            <span className="text-blue-600">
              {user ? user.name : "Pengguna"}
            </span>
          </h1>
          <p className="text-gray-500 mt-2">{today}</p>
        </div>

        {/* Presensi */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-inner mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            Presensi Hari Ini
          </h2>

          <button
            onClick={handlePresensi}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-200"
          >
            Presensi Sekarang
          </button>

          {message && (
            <p className="mt-4 text-green-600 font-medium text-center animate-pulse">
              {message}
            </p>
          )}
        </div>

        
        <div className="flex justify-between">
          <button
            onClick={() => router.push("/riwayat")}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-xl font-medium shadow-md transition-all"
          >
            📜 Riwayat
          </button>
          <button
            onClick={() => router.push("/rekap")}
            className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-6 rounded-xl font-medium shadow-md transition-all"
          >
            📊 Rekap Bulanan
          </button>
        </div>

        {/* Logout */}
        <div className="text-center mt-8">
          <button
            onClick={handleLogout}
            className="text-red-500 font-semibold hover:underline text-sm"
          >
            Keluar Akun
          </button>
        </div>
      </div>
    </div>
  );
}
