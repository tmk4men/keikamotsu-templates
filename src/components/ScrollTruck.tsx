"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface TireTrail {
  id: number;
  pageY: number;
  height: number;
  createdAt: number;
}

export default function ScrollTruck() {
  const truckRef = useRef<SVGSVGElement>(null);
  const [trails, setTrails] = useState<TireTrail[]>([]);
  const prevScroll = useRef(0);
  const idCounter = useRef(0);
  const accum = useRef(0);

  const onScroll = useCallback(() => {
    if (!truckRef.current) return;
    const scrollY = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollY / docHeight : 0;

    const y = progress * (window.innerHeight - 100);
    truckRef.current.style.transform = `translateY(${y}px) rotate(90deg) scaleY(-1)`;

    // スクロール量を蓄積
    const delta = scrollY - prevScroll.current;
    prevScroll.current = scrollY;

    if (delta > 0) {
      accum.current += delta;

      // 60pxごとに轍を1本追加
      if (accum.current > 60) {
        const truckPageY = scrollY + y;
        const segmentH = Math.min(accum.current, 80);
        setTrails((prev) => [
          ...prev,
          {
            id: idCounter.current++,
            pageY: truckPageY - segmentH + 30,
            height: segmentH,
            createdAt: Date.now(),
          },
        ]);
        accum.current = 0;
      }
    }
  }, []);

  // 古い跡を3秒後に自動削除
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setTrails((prev) => prev.filter((t) => now - t.createdAt < 3000));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return (
    <>
      {/* トラック本体 */}
      <div className="pointer-events-none fixed right-1 top-0 z-40 hidden lg:block">
        <svg
          ref={truckRef}
          width="90"
          height="60"
          viewBox="0 0 200 130"
          fill="none"
          className="opacity-20"
          aria-hidden="true"
        >
          <rect x="10" y="20" width="110" height="70" rx="4" fill="currentColor" />
          <path
            d="M120 40 H170 C175 40 180 42 183 47 L195 70 C197 74 195 78 190 78 L190 90 L120 90 Z"
            fill="currentColor"
          />
          <path d="M140 45 H168 L180 68 H140 Z" fill="white" opacity="0.3" />
          <rect x="185" y="78" width="12" height="12" rx="2" fill="currentColor" />
          <circle cx="50" cy="95" r="18" fill="currentColor" />
          <circle cx="50" cy="95" r="9" fill="white" opacity="0.15" />
          <circle cx="160" cy="95" r="18" fill="currentColor" />
          <circle cx="160" cy="95" r="9" fill="white" opacity="0.15" />
          <rect x="30" y="88" width="150" height="6" rx="2" fill="currentColor" />
        </svg>
      </div>

      {/* 轍（わだち）: 2本の平行線 */}
      <div
        className="pointer-events-none absolute right-0 top-0 z-30 hidden lg:block"
        style={{ width: 60, height: "100%" }}
        aria-hidden="true"
      >
        {trails.map((trail) => {
          const age = Date.now() - trail.createdAt;
          // 2秒後からフェードアウト開始、3秒で消える
          const fade = age < 2000 ? 1 : Math.max(0, 1 - (age - 2000) / 1000);
          return (
            <div
              key={trail.id}
              className="absolute"
              style={{
                top: trail.pageY,
                right: 18,
                height: trail.height,
                opacity: 0.10 * fade,
                transition: "opacity 0.3s",
              }}
            >
              {/* 左タイヤ跡 */}
              <div
                className="absolute left-0 top-0 h-full rounded-full bg-gray-700"
                style={{ width: 2 }}
              />
              {/* 右タイヤ跡 */}
              <div
                className="absolute top-0 h-full rounded-full bg-gray-700"
                style={{ left: 10, width: 2 }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
