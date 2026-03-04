"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

const photos = [
  { src: "/keikamotsu-templates/images/vehicle.webp", alt: "配送に使用する軽バン", label: "車両" },
  { src: "/keikamotsu-templates/images/workplace.webp", alt: "営業所の様子", label: "営業所" },
  { src: "/keikamotsu-templates/images/delivery.webp", alt: "配送の様子", label: "配送風景" },
  { src: "/keikamotsu-templates/images/team.webp", alt: "チームメンバー", label: "仲間たち" },
  { src: "/keikamotsu-templates/images/loading.webp", alt: "荷物の積み込み", label: "積み込み" },
];

export default function GalleryCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % photos.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + photos.length) % photos.length);
  }, []);

  // 自動スライド（5秒間隔）
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
    touchEnd.current = e.touches[0].clientX;
    setPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStart.current - touchEnd.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    setTimeout(() => setPaused(false), 3000);
  };

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-lg ring-1 ring-black/5 bg-white p-1.5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* スライド */}
      <div className="relative aspect-[16/10] w-full sm:aspect-[16/9] overflow-hidden rounded-xl">
        {photos.map((photo, i) => (
          <div
            key={photo.label}
            className="absolute inset-0 transition-all duration-700 ease-in-out"
            style={{
              opacity: i === current ? 1 : 0,
              transform: `scale(${i === current ? 1 : 1.05})`,
              zIndex: i === current ? 1 : 0,
            }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-5 rounded-full bg-white/90 px-4 py-1.5 text-[13px] font-bold text-gray-800 backdrop-blur-sm">
              {photo.label}
            </span>
          </div>
        ))}
      </div>

      {/* 左右ボタン */}
      <button
        onClick={() => { prev(); setPaused(true); setTimeout(() => setPaused(false), 3000); }}
        className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-700 shadow backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
        aria-label="前の写真"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        onClick={() => { next(); setPaused(true); setTimeout(() => setPaused(false), 3000); }}
        className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-700 shadow backdrop-blur-sm transition-all hover:bg-white hover:scale-110"
        aria-label="次の写真"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* ドットインジケーター */}
      <div className="absolute bottom-4 right-5 z-10 flex gap-2">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); setPaused(true); setTimeout(() => setPaused(false), 3000); }}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`写真 ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
