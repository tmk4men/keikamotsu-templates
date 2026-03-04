"use client";

import { useEffect, useRef, useState } from "react";

export default function DrivingTruck() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateEnd = () => {
      const width = el.offsetWidth;
      el.style.setProperty("--drive-end", `${width - 150}px`);
    };

    updateEnd();
    requestAnimationFrame(() => setReady(true));

    window.addEventListener("resize", updateEnd);
    return () => window.removeEventListener("resize", updateEnd);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mt-auto h-48 w-full overflow-hidden md:h-44"
    >
      {/* 背景ビルシルエット — 夜景スカイライン */}
      <div className="absolute bottom-6 left-0 right-0 md:bottom-8">
        <svg
          viewBox="0 0 1200 140"
          preserveAspectRatio="none"
          className="h-32 w-full md:h-36"
          fill="none"
        >
          <defs>
            <linearGradient id="skyGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="100%" stopColor="white" stopOpacity="0.06" />
            </linearGradient>
            <linearGradient id="bldgFar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0.15" />
              <stop offset="100%" stopColor="white" stopOpacity="0.08" />
            </linearGradient>
            <linearGradient id="bldgNear" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0.3" />
              <stop offset="100%" stopColor="white" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          {/* 空のグロー */}
          <rect x="0" y="0" width="1200" height="140" fill="url(#skyGlow)" />
          {/* 遠景ビル群 */}
          <rect x="30"  y="30" width="32" height="110" fill="url(#bldgFar)" />
          <rect x="68"  y="50" width="24" height="90"  fill="url(#bldgFar)" />
          <rect x="100" y="20" width="42" height="120" fill="url(#bldgFar)" />
          <rect x="148" y="45" width="22" height="95"  fill="url(#bldgFar)" />
          <rect x="200" y="15" width="50" height="125" fill="url(#bldgFar)" />
          <rect x="258" y="40" width="28" height="100" fill="url(#bldgFar)" />
          <rect x="320" y="25" width="36" height="115" fill="url(#bldgFar)" />
          <rect x="365" y="50" width="20" height="90"  fill="url(#bldgFar)" />
          <rect x="420" y="18" width="48" height="122" fill="url(#bldgFar)" />
          <rect x="478" y="42" width="26" height="98"  fill="url(#bldgFar)" />
          <rect x="540" y="30" width="38" height="110" fill="url(#bldgFar)" />
          <rect x="590" y="48" width="22" height="92"  fill="url(#bldgFar)" />
          <rect x="650" y="22" width="44" height="118" fill="url(#bldgFar)" />
          <rect x="705" y="45" width="25" height="95"  fill="url(#bldgFar)" />
          <rect x="770" y="12" width="52" height="128" fill="url(#bldgFar)" />
          <rect x="830" y="40" width="30" height="100" fill="url(#bldgFar)" />
          <rect x="900" y="28" width="40" height="112" fill="url(#bldgFar)" />
          <rect x="948" y="48" width="24" height="92"  fill="url(#bldgFar)" />
          <rect x="1010" y="20" width="46" height="120" fill="url(#bldgFar)" />
          <rect x="1065" y="42" width="28" height="98"  fill="url(#bldgFar)" />
          <rect x="1120" y="35" width="35" height="105" fill="url(#bldgFar)" />
          <rect x="1162" y="50" width="22" height="90"  fill="url(#bldgFar)" />
          {/* 近景ビル群（はっきり） */}
          <rect x="50"  y="55" width="30" height="85" fill="url(#bldgNear)" />
          <rect x="120" y="45" width="38" height="95" fill="url(#bldgNear)" />
          <rect x="220" y="50" width="26" height="90" fill="url(#bldgNear)" />
          <rect x="310" y="42" width="40" height="98" fill="url(#bldgNear)" />
          <rect x="440" y="48" width="32" height="92" fill="url(#bldgNear)" />
          <rect x="560" y="40" width="36" height="100" fill="url(#bldgNear)" />
          <rect x="680" y="50" width="28" height="90" fill="url(#bldgNear)" />
          <rect x="790" y="38" width="42" height="102" fill="url(#bldgNear)" />
          <rect x="910" y="46" width="30" height="94" fill="url(#bldgNear)" />
          <rect x="1030" y="42" width="34" height="98" fill="url(#bldgNear)" />
          <rect x="1140" y="52" width="28" height="88" fill="url(#bldgNear)" />
          {/* ビル窓の光（たくさん・明るく） */}
          {[50,120,220,310,440,560,680,790,910,1030,1140].map((bx, i) => (
            <g key={i}>
              <rect x={bx+4}  y={i%2===0?58:52} width="4" height="4" fill="#fde68a" opacity="0.6" />
              <rect x={bx+12} y={i%2===0?66:60} width="4" height="4" fill="#fde68a" opacity="0.45" />
              <rect x={bx+4}  y={i%2===0?74:68} width="4" height="4" fill="#fbbf24" opacity="0.5" />
              <rect x={bx+12} y={i%2===0?82:76} width="4" height="4" fill="#fde68a" opacity="0.35" />
              <rect x={bx+20} y={i%2===0?62:56} width="4" height="4" fill="#fbbf24" opacity="0.55" />
              <rect x={bx+20} y={i%2===0?78:72} width="4" height="4" fill="#fde68a" opacity="0.4" />
            </g>
          ))}
          {/* 遠景ビルの窓（小さめ・暗め） */}
          {[100,200,320,420,540,650,770,900,1010,1120].map((bx, i) => (
            <g key={`far-${i}`}>
              <rect x={bx+5}  y={i%2===0?30:38} width="3" height="3" fill="#fde68a" opacity="0.35" />
              <rect x={bx+14} y={i%2===0?40:48} width="3" height="3" fill="#fde68a" opacity="0.25" />
              <rect x={bx+8}  y={i%2===0?52:55} width="3" height="3" fill="#fbbf24" opacity="0.3" />
              <rect x={bx+22} y={i%2===0?35:42} width="3" height="3" fill="#fde68a" opacity="0.28" />
            </g>
          ))}
          {/* タワー頂上の赤い航空障害灯 */}
          <circle cx="126" cy="18" r="2" fill="#ef4444" opacity="0.7" />
          <circle cx="225" cy="13" r="2" fill="#ef4444" opacity="0.6" />
          <circle cx="445" cy="16" r="2" fill="#ef4444" opacity="0.7" />
          <circle cx="796" cy="10" r="2" fill="#ef4444" opacity="0.65" />
          <circle cx="1033" cy="18" r="2" fill="#ef4444" opacity="0.7" />
        </svg>
      </div>

      {/* テキスト - トラックの後ろから出現 */}
      <p
        className={`font-handwriting absolute bottom-[7rem] left-2 text-xl tracking-widest text-white/90 md:bottom-[5.5rem] md:left-4 md:text-3xl ${
          ready ? "text-behind-truck" : "opacity-0"
        }`}
      >
        あなたと届けたい笑顔がある。
      </p>

      {/* 道路ライン */}
      <div className="absolute bottom-6 left-0 right-0 h-px bg-white/20 md:bottom-8" />
      <div
        className={`absolute bottom-6 left-0 h-px w-full ${ready ? "road-dash" : ""}`}
      />

      {/* トラック本体 - 右方向に走行して停止 */}
      <div
        className={`absolute bottom-7 md:bottom-9 ${ready ? "truck-drive" : ""}`}
        style={!ready ? { transform: "translateX(-150px)" } : undefined}
      >
        <svg
          width="120"
          height="64"
          viewBox="0 0 200 110"
          fill="none"
          className="text-white/90 md:scale-125"
        >
          {/* 荷台 */}
          <rect x="10" y="15" width="100" height="60" rx="3" fill="currentColor" opacity="0.9" />
          <rect x="12" y="17" width="96" height="20" rx="2" fill="white" opacity="0.08" />

          {/* キャビン */}
          <path
            d="M110 30 H155 C160 30 164 33 167 37 L178 55 C180 59 178 63 173 63 L173 75 L110 75 Z"
            fill="currentColor"
            opacity="0.95"
          />
          {/* フロントガラス */}
          <path
            d="M128 35 H153 L165 55 H128 Z"
            fill="white"
            opacity="0.25"
          />
          {/* ヘッドライト */}
          <rect x="172" y="55" width="6" height="8" rx="1" fill="#fbbf24" opacity="0.7" />

          {/* シャーシ */}
          <rect x="25" y="73" width="150" height="4" rx="2" fill="currentColor" opacity="0.7" />

          {/* 後輪 */}
          <g className={ready ? "wheel-spin" : ""} style={{ transformOrigin: "45px 82px" }}>
            <circle cx="45" cy="82" r="14" fill="currentColor" />
            <circle cx="45" cy="82" r="7" fill="white" opacity="0.1" />
            <line x1="45" y1="68" x2="45" y2="96" stroke="white" opacity="0.06" strokeWidth="1" />
            <line x1="31" y1="82" x2="59" y2="82" stroke="white" opacity="0.06" strokeWidth="1" />
          </g>

          {/* 前輪 */}
          <g className={ready ? "wheel-spin" : ""} style={{ transformOrigin: "148px 82px" }}>
            <circle cx="148" cy="82" r="14" fill="currentColor" />
            <circle cx="148" cy="82" r="7" fill="white" opacity="0.1" />
            <line x1="148" y1="68" x2="148" y2="96" stroke="white" opacity="0.06" strokeWidth="1" />
            <line x1="134" y1="82" x2="162" y2="82" stroke="white" opacity="0.06" strokeWidth="1" />
          </g>
        </svg>
      </div>

      {/* 風のライン（走行中に表示） */}
      {ready && (
        <>
          <div className="wind-line absolute bottom-14 h-px w-8 bg-white/10 md:bottom-20" style={{ animationDelay: "0s" }} />
          <div className="wind-line absolute bottom-12 h-px w-12 bg-white/8 md:bottom-16" style={{ animationDelay: "0.6s" }} />
          <div className="wind-line absolute bottom-16 h-px w-6 bg-white/8 md:bottom-24" style={{ animationDelay: "1.2s" }} />
        </>
      )}
    </div>
  );
}
