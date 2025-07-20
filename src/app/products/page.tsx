"use client";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";

type Product = {
  image: string;
  title: string;
  price: string;
  category: string;
};

const categories = [
  "الكل",
  "الملابس",
  "الأثاث",
  "الأجهزة الإلكترونية",
  "الكتب",
  "الألعاب",
  "الأدوات الرياضية",
];

const staticProducts: Product[] = [
  {
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
    title: "كرسي مكتب",
    price: "10000 ل.س",
    category: "الأثاث"
  },
  {
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    title: "غسالة",
    price: "7000 ل.س",
    category: "الأجهزة الإلكترونية"
  },
  {
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
    title: "هاتف ذكي",
    price: "8000 ل.س",
    category: "الأجهزة الإلكترونية"
  },
  {
    image: "https://images.unsplash.com/photo-1586121466337-a1128ab938d5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8JUQ4JUI3JUQ4JUE3JUQ5JTg4JUQ5JTg0JUQ4JUE5JTIwJUQ5JTgyJUQ5JTg3JUQ5JTg4JUQ4JUE5fGVufDB8fDB8fHww",
    title: "طاولة قهوة",
    price: "8000 ل.س",
    category: "الأثاث"
  },
  {
    image: "https://images.unsplash.com/photo-1704229130297-4b23ca7d6d58?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8JUQ4JUFGJUQ4JUIxJUQ4JUE3JUQ4JUFDJUQ4JUE5JTIwJUQ5JTg3JUQ5JTg4JUQ4JUE3JUQ4JUE2JUQ5JThBJUQ4JUE5fGVufDB8fDB8fHww",
    title: "دراجة هوائية",
    price: "8000 ل.س",
    category: "الأدوات الرياضية"
  },
  {
    image: "https://plus.unsplash.com/premium_photo-1731628562673-d4c9a63e9170?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUQ4JUI1JUQ5JTg2JUQ4JUFGJUQ5JTg4JUQ5JTgyJTIwKCVEOSU4MyVEOCVCMSVEOCVBQSVEOSU4OCVEOSU4Nil8ZW58MHx8MHx8fDA%3D",
    title: "صندوق (كرتون)",
    price: "8000 ل.س",
    category: "الأثاث"
  },
  {
    image: "https://plus.unsplash.com/premium_photo-1750360906456-b28d130fa7f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8JUQ4JUIxJUQ5JTgxJTIwJUQ5JTgzJUQ4JUFBJUQ4JUE4JTIyfGVufDB8fDB8fHww",
    title: "رف كتب",
    price: "8000 ل.س",
    category: "الأثاث"
  },
  {
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80",
    title: "سماعات رأس",
    price: "8000 ل.س",
    category: "الأجهزة الإلكترونية"
  }
];

async function getProducts() {
  const baseUrl = typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    : "";
  const res = await fetch(`${baseUrl}/api/products`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [selected, setSelected] = useState<string>("الكل");

  useEffect(() => {
    getProducts().then((data) => {
      // توحيد الحقول للمنتجات من القاعدة
      const normalizedData: Product[] = data.map((item: Record<string, unknown>) => ({
        image: item.image as string,
        title: (item.title || item.name) as string,
        price: item.price as string,
        category: item.category as string,
      }));
      const allProducts: Product[] = [...staticProducts, ...normalizedData];
      setProducts(allProducts);
      setFiltered(allProducts);
    });
  }, []);

  useEffect(() => {
    if (selected === "الكل") {
      setFiltered(products);
    } else {
      setFiltered(products.filter((p) => p.category === selected));
    }
  }, [selected, products]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">المنتجات</h1>
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-lg font-medium border transition-colors ${selected === cat ? "bg-blue-500 text-white border-blue-500" : "bg-white text-gray-900 border-gray-300 hover:bg-blue-50"}`}
            onClick={() => setSelected(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">لا يوجد منتجات حالياً</div>
        ) : (
          filtered.map((product, idx) => (
            <ProductCard
              key={idx}
              image={product.image}
              title={product.title}
              price={product.price}
              location={product.category}
            />
          ))
        )}
      </div>
    </div>
  );
} 