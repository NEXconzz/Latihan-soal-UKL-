"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface PresensiData {
  tanggal: string;
  waktu: string;
  status: string;
}

export default function RiwayatPresensi() {
  const router = useRouter();
  const [riwayat, setRiwayat] = useState<PresensiData[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    // 🔹 Data dummy (bisa diganti dengan data dari backend nanti)
    const dataDummy: PresensiData[] = [
      { tanggal: "Senin, 28 Oktober 2025", waktu: "07:12", status: "Hadir" },
      { tanggal: "Selasa, 29 Oktober 2025", waktu: "07:10", status: "Hadir" },
      { tanggal: "Rabu, 30 Oktober 2025", waktu: "07:15", status: "Hadir" },
      { tanggal: "Kamis, 31 Oktober 2025", waktu: "-", status: "Izin" },
      { tanggal: "Jumat, 1 November 2025", waktu: "07:09", status: "Hadir" },
    ];

    setRiwayat(dataDummy);
  }, [router]);

  return (
    <div className="min-h-screen bg-blue-300 flex flex-col items-center justify-start p-6 font-sans">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-3xl transition-all duration-300 hover:shadow-blue-300/50">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
            📜 Riwayat Presensi
          </h1>
          <p className="text-gray-500">
            Berikut adalah daftar kehadiran kamu dalam minggu ini.
          </p>
        </div>

        {/* Tabel Presensi */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-xl">
            <thead className="bg-blue-500 text-white text-sm uppercase tracking-wide">
              <tr>
                <th className="py-3 px-4 text-left rounded-tl-xl">Tanggal</th>
                <th className="py-3 px-4 text-left">Waktu</th>
                <th className="py-3 px-4 text-left rounded-tr-xl">Status</th>
              </tr>
            </thead>
            <tbody>
              {riwayat.map((item, index) => (
                <tr
                  key={index}
                  className={`text-gray-800 ${
                    index % 2 === 0 ? "bg-blue-50" : "bg-white"
                  } hover:bg-blue-100 transition`}
                >
                  <td className="py-3 px-4 font-medium">{item.tanggal}</td>
                  <td className="py-3 px-4">{item.waktu}</td>
                  <td
                    className={`py-3 px-4 font-semibold ${
                      item.status === "Hadir"
                        ? "text-green-600"
                        : item.status === "Izin"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-xl font-medium shadow-md transition"
          >
            ⬅️ Kembali ke Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
