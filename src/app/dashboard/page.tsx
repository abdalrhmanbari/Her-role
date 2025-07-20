"use client";
import { useState } from "react";

const categories = [
  "الملابس",
  "الأثاث",
  "الأجهزة الإلكترونية",
  "الكتب",
  "الألعاب",
  "الأدوات الرياضية",
];

export default function DashboardPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    setUploading(false);
    if (res.ok) {
      const data = await res.json();
      setImageUrl(data.url);
    } else {
      setError("فشل رفع الصورة");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const price = (form.elements.namedItem("price") as HTMLInputElement).value;
    const category = (form.elements.namedItem("category") as HTMLInputElement).value;
    if (!imageUrl) {
      setError("يرجى رفع صورة المنتج أولاً");
      setLoading(false);
      return;
    }
    const res = await fetch("/api/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, category, image: imageUrl }),
    });
    setLoading(false);
    if (res.ok) {
      setSuccess("تمت إضافة المنتج بنجاح!");
      form.reset();
      setImageUrl("");
    } else {
      const data = await res.json();
      setError(data.message || "حدث خطأ أثناء الإضافة");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md flex flex-col gap-6" dir="rtl">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">إضافة منتج جديد</h1>
        {error && <div className="text-red-500 text-center">{error}</div>}
        {success && <div className="text-green-600 text-center">{success}</div>}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-gray-700 font-medium">اسم المنتج</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="border rounded-md text-gray-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="اسم المنتج"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="price" className="text-gray-700 font-medium">السعر</label>
          <input
            id="price"
            name="price"
            type="number"
            required
            className="border text-gray-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="مثال: 100 ل.س"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="text-gray-700 font-medium">التصنيف</label>
          <select
            id="category"
            name="category"
            required
            className="border text-gray-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">اختر التصنيف</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="image" className="text-gray-700 font-medium">صورة المنتج</label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            required
            className="border  text-gray-500 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleImageChange}
          />
          {uploading && <span className="text-blue-500">جاري رفع الصورة...</span>}
          {imageUrl && (
            <img src={imageUrl} alt="صورة المنتج" className="w-24 h-24 object-contain mt-2 mx-auto text-gray-500" />
          )}
        </div>
        <button
          type="submit"
          className= " text-gray-500 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md transition-colors flex items-center justify-center gap-2"
          disabled={loading || uploading}
        >
          {loading && (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          )}
          إضافة المنتج
        </button>
      </form>
    </div>
  );
} 