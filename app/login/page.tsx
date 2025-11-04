"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [remember, setRemember] = useState<boolean>(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Harap isi username dan password terlebih dahulu!");
      return;
    }

    setLoading(true);

    const dummyUser = {
      username: "admin",
      password: "123456",
    };

    setTimeout(() => {
      if (username === dummyUser.username && password === dummyUser.password) {
        localStorage.setItem("token", "fake-jwt-token");
        router.push("/dashboard");
      } else {
        setError("Username atau password salah!");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-blue-300 flex items-center justify-center font-sans">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-[380px] text-center">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-10">
          Login
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4 text-left">
          {/* Username Field */}
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400">👤</span>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400">🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >

            </button>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between mt-1">
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 accent-blue-500"
              />
              Ingat saya
            </label>

            <span className="text-sm text-blue-500 hover:underline cursor-pointer">
              Lupa password?
            </span>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`mt-3 py-2 rounded-lg font-semibold text-white transition ${loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 shadow-md"
              }`}
          >
            {loading ? "Memproses..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
