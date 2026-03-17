/* ===================================================
   テンプレートギャラリー
   全テンプレを一覧表示し、プレビューリンクを提供する
   =================================================== */

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "採用HPテンプレート一覧（17種）",
  description:
    "軽貨物ドライバー採用に特化したHPデザインテンプレート17種を一覧表示。スタイリッシュ、ミニマル、ポップ、高級感など多彩なデザインから選べます。",
  openGraph: {
    title: "採用HPテンプレート一覧（17種）｜軽貨物ドライバー事業テンプレート集",
    description:
      "軽貨物ドライバー採用に特化したHPデザインテンプレート17種を一覧表示。",
    type: "website",
  },
};

const templates = [
  { id: "01", name: "スタイリッシュ",   desc: "ダークテーマ、シャープな線、モノトーン+ブルーアクセント",     color: "#3b82f6", bg: "#0a0a1a" },
  { id: "02", name: "ミニマル",         desc: "余白多め、細いフォント、控えめなアニメーション",             color: "#111827", bg: "#ffffff" },
  { id: "03", name: "ポップ＆カラフル", desc: "ビビッドカラー、丸みあるUI、弾むアニメーション",             color: "#ec4899", bg: "#fdf2f8" },
  { id: "04", name: "高級感",           desc: "黒×ゴールド、セリフ体、ゆったりフェード",                   color: "#d4a574", bg: "#0d0d0d" },
  { id: "05", name: "爽やか",           desc: "水色×白、波形背景、ふわっとしたトランジション",             color: "#0ea5e9", bg: "#f0f9ff" },
  { id: "06", name: "温かみ",           desc: "アースカラー、手書き風、紙テクスチャ",                     color: "#92400e", bg: "#fef3c7" },
  { id: "07", name: "ダイナミック",     desc: "オレンジ、斜めレイアウト、大胆なタイポグラフィ",           color: "#ea580c", bg: "#fff7ed" },
  { id: "08", name: "クリーン",         desc: "白ベース、カード型、整然としたグリッド",                   color: "#059669", bg: "#ffffff" },
  { id: "09", name: "モダン",           desc: "パープルグラデーション、グラスモーフィズム、ブラー",       color: "#7c3aed", bg: "#f5f3ff" },
  { id: "10", name: "クラシック",       desc: "セピア調、装飾罫線、セリフフォント",                       color: "#78350f", bg: "#fefce8" },
  { id: "11", name: "先進的",           desc: "ダーク+ネオンシアン、グリッド背景、テック感",              color: "#00ffd5", bg: "#0a0a1a" },
  { id: "12", name: "華やか",           desc: "ピンク×パープル、花柄アクセント、キラキラ",               color: "#a855f7", bg: "#fdf2f8" },
  { id: "13", name: "重厚",             desc: "ダークネイビー、太いフォント、重みある影",                 color: "#e2e8f0", bg: "#1e1b4b" },
  { id: "14", name: "親しみやすい",     desc: "パステルカラー、丸角多用、やわらかい印象",                 color: "#10b981", bg: "#ecfdf5" },
  { id: "15", name: "クリエイティブ",   desc: "非対称レイアウト、アート風、個性的なスクロール",           color: "#f97316", bg: "#fffbeb" },
  { id: "16", name: "RPGクエスト",     desc: "横スクロール、RPGテーマ、ステージ構成の冒険的デザイン",   color: "#ffd700", bg: "#1a2e1a" },
  { id: "17", name: "ナチュラル",     desc: "グリーン×アースカラー、ウェーブ区切り、ガラスモーフィズム", color: "#1e6e3e", bg: "#faf9f7" },
];

export default function GalleryPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", padding: "40px 20px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 8 }}>
          テンプレートギャラリー
        </h1>
        <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 24 }}>
          軽貨物ドライバー事業向け — HPデザインテンプレート集
        </p>

        {/* ─── カテゴリナビ ─── */}
        <div style={{
          display: "flex",
          gap: 8,
          marginBottom: 32,
          flexWrap: "wrap",
        }}>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "8px 20px",
            borderRadius: 999,
            fontSize: 14,
            fontWeight: 700,
            background: "#111827",
            color: "#fff",
            cursor: "default",
          }}>
            採用HPテンプレート（17種）
          </span>
          <Link
            href="/corporate"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "8px 20px",
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 600,
              background: "#fff",
              color: "#374151",
              border: "1px solid #d1d5db",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
          >
            コーポレートHPテンプレート（8種）→
          </Link>
          <Link
            href="/layouts"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "8px 20px",
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 600,
              background: "#fff",
              color: "#374151",
              border: "1px solid #d1d5db",
              textDecoration: "none",
              transition: "all 0.2s",
            }}
          >
            レイアウト集（4種）→
          </Link>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16,
        }}>
          {templates.map((t) => (
            <Link
              key={t.id}
              href={`/template-${t.id}`}
              style={{
                display: "block",
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid #e5e7eb",
                background: "#fff",
                textDecoration: "none",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
            >
              <div style={{
                height: 80,
                background: t.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <span style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: t.color,
                  letterSpacing: 2,
                }}>
                  {t.id}
                </span>
              </div>
              <div style={{ padding: "12px 16px" }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 4 }}>
                  {t.name}
                </p>
                <p style={{ fontSize: 12, color: "#9ca3af", lineHeight: 1.6 }}>
                  {t.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
