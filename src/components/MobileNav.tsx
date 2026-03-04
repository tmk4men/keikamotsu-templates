"use client";

import { useState } from "react";
import { navIcons } from "@/components/NavIcons";

const navLinks = [
  { href: "#reasons", label: "選ばれる理由" },
  { href: "#jobs", label: "求人情報" },
  { href: "#benefits", label: "待遇・福利厚生" },
  { href: "#daily", label: "1日の流れ" },
  { href: "#voices", label: "先輩の声" },
  { href: "#faq", label: "よくある質問" },
  { href: "#gallery", label: "ギャラリー" },
  { href: "#company", label: "会社概要" },
  { href: "#access", label: "アクセス" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-9 w-9 items-center justify-center rounded-md text-gray-600"
        aria-label="メニューを開く"
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            <path strokeLinecap="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full border-b border-gray-200 bg-white px-5 py-4 shadow-lg">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 text-[15px] font-medium text-gray-700"
              >
                {navIcons[link.href]}
                {link.label}
              </a>
            ))}
            <a
              href="#apply"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-md bg-cta py-3 text-center text-[15px] font-bold text-white"
            >
              応募する
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}
