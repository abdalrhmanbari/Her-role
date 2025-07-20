"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className=" fixed top-0 right-0 left-0 z-50 w-full bg-white shadow-sm py-6 px-4 sm:px-8 flex items-center justify-between" dir="rtl">
      {/* اليمين: زر إليك عرض */}
      <div className="flex gap-4 items-center">
        <Link href={"/dashboard"} className="bg-blue-500 hover:bg-blue-700 text-white rounded-md px-4 py-2 font-bold">ضع عرضك لدينا </Link>
      </div>
      {/* المنتصف: الروابط */}
      <ul className="hidden md:flex gap-8 text-lg font-medium text-gray-900 items-center">
      <Link href={"/"} className="cursor-pointer">الرئيسية</Link>
        <li className="cursor-pointer">التصنيفات</li>
        <Link href={"/contact"} className="cursor-pointer">تواصل</Link>
      </ul>
      {/* زر القائمة للجوال */}
      <button
        className="md:hidden flex items-center justify-center p-2 rounded hover:bg-gray-100"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="فتح القائمة"
      >
        <svg className="w-7 h-7 text-gray-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {/* اليسار: تسجيل الدخول/الخروج وتسجيل المحل */}
      <div className="hidden md:flex gap-4 items-center">
        {status === "loading" ? (
          <span>...</span>
        ) : session ? (
          <div className="flex items-center gap-2">
            <span className="text-gray-900 font-medium">{session.user?.name || session.user?.email}</span>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white rounded-md px-4 py-2 font-bold"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              تسجيل الخروج
            </button>
          </div>
        ) : (
          <Link href="/login" className="bg-blue-500 hover:bg-blue-700 text-white rounded-md px-4 py-2 font-bold">
            تسجيل الدخول
          </Link>
        )}
          <Link href={"/register"} className="cursor-pointer text-gray-900 font-medium"> ليس لديك حساب؟ سجل الآن</Link>
      </div>
      {/* القائمة الجانبية للجوال */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-end md:hidden" onClick={() => setMenuOpen(false)}>
          <div className="bg-white w-64 h-full shadow-lg p-6 flex flex-col gap-6" onClick={e => e.stopPropagation()} dir="rtl">
            <button className="self-end mb-4" onClick={() => setMenuOpen(false)} aria-label="إغلاق القائمة">
              <svg className="w-7 h-7 text-gray-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ul className="flex flex-col gap-4 text-lg font-medium text-gray-900">
              <li className="cursor-pointer">الرئيسية</li>
              <li className="cursor-pointer">التصنيفات</li>
              <li className="cursor-pointer">تواصل</li>
            </ul>
            <div className="flex flex-col gap-4 mt-8">
              {status === "loading" ? (
                <span>...</span>
              ) : session ? (
                <div className="flex items-center gap-2">
                  <span className="text-gray-900 font-medium">{session.user?.name || session.user?.email}</span>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white rounded-md px-4 py-2 font-bold"
                    onClick={() => { setMenuOpen(false); signOut({ callbackUrl: "/" }); }}
                  >
                    تسجيل الخروج
                  </button>
                </div>
              ) : (
                <Link href="/login" className="bg-blue-500 hover:bg-blue-700 text-white rounded-md px-4 py-2 font-bold" onClick={() => setMenuOpen(false)}>
                  تسجيل الدخول
                </Link>
              )}
          <Link href={"/register"} className="cursor-pointer text-gray-900 font-medium"> ليس لديك حساب؟ سجل الآن</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 