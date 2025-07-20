import React from "react";

const categories = [
  "الملابس",
  "الأثاث",
  "الأجهزة الإلكترونية",
  "الكتب",
  "الألعاب",
  "الأدوات الرياضية",
  "الأدوات الرياضية",
];

const Categories = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      {categories.map((cat, idx) => (
        <button
          key={idx}
          className="bg-white rounded-lg shadow px-6 py-3 text-lg font-medium text-gray-900 hover:bg-gray-100"
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default Categories; 