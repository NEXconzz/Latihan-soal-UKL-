"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type RekapData = {
  hadir: number;
  izin: number;
  tidakHadir: number;
  totalHari: number;
};

export default function RekapPage() {
  const router = useRouter();
  const [rekap, setRekap] = useState<RekapData | null>(null);
  const [month, setMonth] = useState<string>("November 2025");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    // 🧩 Data dummy rekap (biasanya diambil dari backend)
    const dummyRekap: RekapData = {
      hadir: 18,
      izin: 2,
      tidakHadir: 1,
      totalHari: 21,
    };

    setRekap(dummyRekap);
  }, [router]);

  if (!rekap) return null;

  return (
    <div className="min-h-screen bg-blue-300 p-8">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-md p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          📊 Rekap Bulanan
        </h1>
        <p className="text-gray-500 mb-6">{month}</p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-green-100 rounded-xl p-4 shadow-inner">
            <p className="text-green-700 font-semibold text-lg">Hadir</p>
            <h2 className="text-3xl font-bold text-green-700">{rekap.hadir}</h2>
          </div>
          <div className="bg-yellow-100 rounded-xl p-4 shadow-inner">
            <p className="text-yellow-700 font-semibold text-lg">Izin</p>
            <h2 className="text-3xl font-bold text-yellow-700">{rekap.izin}</h2>
          </div>
          <div className="bg-red-100 rounded-xl p-4 shadow-inner">
            <p className="text-red-700 font-semibold text-lg">Tidak Hadir</p>
            <h2 className="text-3xl font-bold text-red-700">{rekap.tidakHadir}</h2>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl py-3 shadow-inner">
          <p className="text-blue-700 font-medium">
            Total Hari Kerja:{" "}
            <span className="font-bold">{rekap.totalHari}</span>
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg"
          >
            ← Kembali ke Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
