"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/login");
    } else {
      const data = await res.json();
      setError(data.message || "حدث خطأ أثناء التسجيل");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md flex flex-col gap-6" dir="rtl">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">تسجيل حساب جديد</h1>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-gray-700 font-medium">الاسم</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-500"
            placeholder="اسمك الكامل"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-gray-700 font-medium">البريد الإلكتروني</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-500"
            placeholder="example@email.com"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-gray-700 font-medium">كلمة المرور</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-500"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md transition-colors flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading && (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          )}
          تسجيل
        </button>
      </form>
    </div>
  );
} 