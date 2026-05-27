"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

const navLinks = [
  { href: "/shop", label: "מוצרים" },
  { href: "/compare", label: "השוואה" },
  { href: "/blog", label: "בלוג" },
  { href: "/contact", label: "צור קשר" },
];


function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      className="w-12 h-12"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
      className="w-12 h-12"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { count: cartCount } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchOpen(false);
    setSearchQuery("");
    router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
  }

  return (
    <header
      className="sticky top-0 z-50 bg-black border-b"
      style={{ borderColor: "rgba(255,255,255,0.07)" }}
    >
      <nav className="site-container relative px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Logo — centered on mobile, right side on desktop */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 shrink-0"
        >
          <Image
            src="/assets/logo.svg"
            alt="XVAPE"
            width={132}
            height={44}
            className="h-5 md:h-6 w-auto"
          />
        </Link>

        {/* Nav links — center, desktop only */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-2xl font-regular transition-colors text-white"
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.75")}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile actions */}
        <div className="md:hidden absolute inset-y-0 left-6 flex items-center gap-2">
          {/* Search */}
          <button
            className="p-2 transition-opacity hover:opacity-100"
            aria-label="חיפוש"
            onClick={() => setSearchOpen(true)}
          >
            <Image src="/assets/icn/search.png" alt="חיפוש" width={28} height={28} className="icon-accent" />
          </button>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative p-2"
            aria-label="עגלת קניות"
          >
            <Image src="/assets/icn/cart.png" alt="עגלה" width={28} height={28} className="icon-accent" />
            {cartCount > 0 && (
              <span
                className="absolute top-0.5 inset-e-0.5 text-black text-[10px] font-bold min-w-[16px] h-4 rounded-full flex items-center justify-center px-0.5"
                style={{ background: "#cfbfba" }}
              >
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile hamburger — right side in RTL */}
        <button
          className="md:hidden absolute inset-y-0 right-6 p-2"
          style={{ color: "#eeeeee" }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="תפריט"
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        {/* Desktop actions — left side in RTL */}
        <div className="hidden md:flex items-center gap-3">
          {/* Search */}
          <button
            className="p-2 transition-opacity hover:opacity-100"
            aria-label="חיפוש"
            onClick={() => setSearchOpen(true)}
          >
            <Image src="/assets/icn/search.png" alt="חיפוש" width={32} height={32} className="icon-accent" />
          </button>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative p-2"
            aria-label="עגלת קניות"
          >
            <Image src="/assets/icn/cart.png" alt="עגלה" width={32} height={32} className="icon-accent" />
            {cartCount > 0 && (
              <span
                className="absolute top-0.5 inset-e-0.5 text-black text-[22px] font-bold min-w-[20px] h-5 rounded-full flex items-center justify-center px-0.5"
                style={{ background: "#cfbfba" }}
              >
                {cartCount}
              </span>
            )}
          </Link>

          {/* CTA button — outlined gold, desktop only */}
          <Link
            href="/shop"
            className="inline-flex items-center px-5 py-2 rounded-full text-lg font-regular border transition-colors hover:bg-white/5"
            style={{ color: "#cfbfba", borderColor: "#cfbfba" }}
          >
            כנס לחנות
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t bg-black"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          <div className="px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 px-3 rounded-lg text-2xl font-medium transition-colors"
                style={{ color: "#eeeeee" }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div
              className="pt-3 border-t mt-2"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
              <Link
                href="/shop"
                className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold border"
                style={{ color: "#cfbfba", borderColor: "#cfbfba" }}
                onClick={() => setMobileOpen(false)}
              >
                כנס לחנות
              </Link>
            </div>
          </div>
        </div>
      )}
      {/* Search overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-6"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setSearchOpen(false)}
        >
          <form
            className="w-full max-w-xl"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSearch}
          >
            <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-4">
              <Image src="/assets/icn/search.png" alt="חיפוש" width={22} height={22} />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="חפש מוצר..."
                className="flex-1 bg-transparent text-black text-xl outline-none text-right"
                dir="rtl"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-gray-400 hover:text-black text-2xl leading-none"
              >
                ✕
              </button>
            </div>
            <p className="text-white/50 text-sm text-center mt-3">הקש Enter לחיפוש</p>
          </form>
        </div>
      )}
    </header>
  );
}
