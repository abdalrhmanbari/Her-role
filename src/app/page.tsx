import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Categories from "../components/Categories";
import Link from "next/link";

const products = [
  {
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80", // صورة افتراضية (يمكنك وضعها في public لاحقاً)
    title: "كرسي مكتب",
    price: "10000 ل.س",
    location: "دمشق"
  },
  {
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    title: "غسالة",
    price: "7000 ل.س",
    location: "دمشق"
  },
  {
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
    title: "هاتف ذكي",
    price: "8000 ل.س",
    location: "حلب"
  },
  {
    image: "https://images.unsplash.com/photo-1586121466337-a1128ab938d5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8JUQ4JUI3JUQ4JUE3JUQ5JTg4JUQ5JTg0JUQ4JUE5JTIwJUQ5JTgyJUQ5JTg3JUQ5JTg4JUQ4JUE5fGVufDB8fDB8fHww",
    title: "طاولة قهوة",
    price: "8000 ل.س",
    location: "حمص"
  },
  {
    image: "https://images.unsplash.com/photo-1704229130297-4b23ca7d6d58?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8JUQ4JUFGJUQ4JUIxJUQ4JUE3JUQ4JUFDJUQ4JUE5JTIwJUQ5JTg3JUQ5JTg4JUQ4JUE3JUQ4JUE2JUQ5JThBJUQ4JUE5fGVufDB8fDB8fHww",
    title: "دراجة هوائية",
    price: "8000 ل.س",
    location: "ادلب"
  },
  {
    image: "https://plus.unsplash.com/premium_photo-1731628562673-d4c9a63e9170?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUQ4JUI1JUQ5JTg2JUQ4JUFGJUQ5JTg4JUQ5JTgyJTIwKCVEOSU4MyVEOCVCMSVEOCVBQSVEOSU4OCVEOSU4Nil8ZW58MHx8MHx8fDA%3D",
    title: "صندوق (كرتون)",
    price: "8000 ل.س",
  },
  {
    image: "https://plus.unsplash.com/premium_photo-1750360906456-b28d130fa7f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8JUQ4JUIxJUQ5JTgxJTIwJUQ5JTgzJUQ4JUFBJUQ4JUE4JTIyfGVufDB8fDB8fHww",
    title: "رف كتب",
    price: "8000 ل.س",
    location: "درعا"
  },
  {
    image: "https://images.unsplash.com/photo-1664441156320-793f4430c75e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8JUQ4JUIzJUQ5JTg1JUQ4JUE3JUQ4JUI5JUQ4JUE3JUQ4JUFBJTIwJUQ4JUIxJUQ4JUEzJUQ4JUIzfGVufDB8fDB8fHww",
    title: "سماعات رأس",
    price: "8000 ل.س",
    location: "حمص"
  }
];

export default function Home() {
  return (
    <div className="font-sans bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center px-4 py-8 max-w-6xl mx-auto w-full mt-20">
        <h1 className="text-5xl font-bold text-center mb-4 mt-8 text-gray-900">دورها</h1>
        <p className="text-xl text-center mb-6 text-gray-600">منصة لبيع أو التبرع بالأغراض المستعملة: عبر الإنترنت بدلاً من التخلص منها</p>
        <Link href={"/products"} className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-8 py-3 font-bold text-lg mb-10">استعراض العروض</Link>
        <h2 className="text-2xl font-bold mb-6 self-end text-gray-600 text-right w-full">الأغراض المعروضة مؤخرًا</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full mb-10">
          {products.map((product, idx) => (
            <ProductCard key={idx} {...product} />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-6 self-end text-gray-600 text-right w-full">التصنيفات</h2>
        <Categories />
      </main>
      <footer className="text-center text-gray-500 py-6">الملكية محفوظة | جميع الحقوق محفوظة
      </footer>
    </div>
  );
}
