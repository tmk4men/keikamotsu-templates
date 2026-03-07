/* ===================================================
   コーポレートHPテンプレートギャラリー
   コーポレート5種を一覧表示
   =================================================== */

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "コーポレートHPテンプレート一覧（8種）",
  description:
    "軽貨物ドライバー事業向けコーポレートサイトテンプレート8種を一覧表示。ロジスティクス・プロ、トラストブルー、エコモーション、エグゼクティブ、フューチャーフロー、ウォームドライブ、ボールドインパクト、クリアブリーズの8デザイン。",
  openGraph: {
    title: "コーポレートHPテンプレート一覧（8種）｜軽貨物ドライバー事業テンプレート集",
    description:
      "軽貨物ドライバー事業向けコーポレートサイトテンプレート8種。",
    type: "website",
  },
};

const corporateTemplates = [
  { id: "01", name: "ロジスティクス・プロ", desc: "クリーン企業風・白ベース、紺×オレンジの信頼感あるデザイン",     color: "#1e3a5f", accent: "#e67e22", bg: "#ffffff" },
  { id: "02", name: "トラストブルー",       desc: "信頼・堅実をイメージ、セリフ体、青×緑の落ち着いた配色",       color: "#0056b3", accent: "#00a86b", bg: "#f8fafe" },
  { id: "03", name: "エコモーション",       desc: "ナチュラル・エコ・丸みのあるデザイン、緑×琥珀の温かな印象",   color: "#2d7d46", accent: "#f59e0b", bg: "#f0fdf4" },
  { id: "04", name: "エグゼクティブ",       desc: "ダークテーマの高級感、紺黒×ゴールドのプレミアムデザイン",     color: "#c9a84c", accent: "#c9a84c", bg: "#1a1a2e" },
  { id: "05", name: "フューチャーフロー",   desc: "テック・グラデーション・グラスモーフィズムの先進的デザイン",   color: "#8b5cf6", accent: "#06b6d4", bg: "#0f0f23" },
  { id: "06", name: "ウォームドライブ",     desc: "温かみ・地域密着、アースカラー・紙テクスチャの人間味あるデザイン", color: "#6b4226", accent: "#c2703e", bg: "#faf7f2" },
  { id: "07", name: "ボールドインパクト",   desc: "力強さ・スピード感、ダークネイビー×オレンジのダイナミックデザイン", color: "#f97316", accent: "#f97316", bg: "#0f172a" },
  { id: "08", name: "クリアブリーズ",       desc: "清潔感・透明性、スカイブルー×ミントグリーンのミニマルデザイン", color: "#0ea5e9", accent: "#10b981", bg: "#ffffff" },
];

export default function CorporateGalleryPage() {
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
          <Link
            href="/"
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
            ← 採用HPテンプレート（16種）
          </Link>
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
            コーポレートHPテンプレート（8種）
          </span>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16,
        }}>
          {corporateTemplates.map((t) => (
            <Link
              key={t.id}
              href={`/corporate/corporate-${t.id}`}
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
                gap: 8,
              }}>
                <span style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: t.color,
                  letterSpacing: 2,
                }}>
                  C{t.id}
                </span>
                <span style={{
                  width: 24,
                  height: 4,
                  borderRadius: 2,
                  background: t.accent,
                }} />
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
