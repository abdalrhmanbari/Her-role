"use client";
import { useState } from "react";

export default function ContactPage() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    setTimeout(() => {
      setLoading(false);
      setSuccess("تم إرسال رسالتك بنجاح! سنقوم بالرد عليك قريبًا.");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md flex flex-col gap-6" dir="rtl">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">تواصل معنا</h1>
        {success && <div className="text-green-600 text-center">{success}</div>}
        {error && <div className="text-red-500 text-center">{error}</div>}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-gray-700 font-medium">الاسم</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="example@email.com"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-gray-700 font-medium">رسالتك</label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="اكتب رسالتك هنا..."
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
          إرسال
        </button>
      </form>
    </div>
  );
} 