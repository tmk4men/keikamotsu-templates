"use client";

import { useEffect, useState } from "react";

export default function MobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // ヒーローを過ぎたら表示
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 px-4 py-3 backdrop-blur-md md:hidden">
      <div className="flex items-center gap-3">
        <a
          href="tel:06-1234-5678"
          className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-gray-200 py-3 text-sm font-bold text-gray-800"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-brand">
            <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 0 1 3.5 2h1.148a1.5 1.5 0 0 1 1.465 1.175l.716 3.223a1.5 1.5 0 0 1-.65 1.548l-.571.372a.5.5 0 0 0-.13.373 8.046 8.046 0 0 0 4.883 4.882.5.5 0 0 0 .373-.13l.372-.571a1.5 1.5 0 0 1 1.548-.65l3.223.716A1.5 1.5 0 0 1 18 14.352V16.5a1.5 1.5 0 0 1-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 0 1 2.43 8.326 13.019 13.019 0 0 1 2 5V3.5Z" clipRule="evenodd" />
          </svg>
          電話する
        </a>
        <a
          href="#apply"
          className="flex flex-1 items-center justify-center rounded-md bg-cta py-3 text-sm font-bold text-white"
        >
          応募する
        </a>
      </div>
    </div>
  );
}
