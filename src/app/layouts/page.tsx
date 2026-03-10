/* ===================================================
   レイアウト集テンプレートギャラリー
   レイアウト4種を一覧表示
   =================================================== */

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "レイアウト集テンプレート一覧（4種）",
  description:
    "軽貨物ドライバー事業向けコーポレートサイト レイアウトバリエーション4種。ダッシュボード型・タブ切替型・マガジン型・LP型の多彩なページ構成。",
  openGraph: {
    title: "レイアウト集テンプレート一覧（4種）｜軽貨物ドライバー事業テンプレート集",
    description:
      "コーポレートサイトのレイアウトバリエーション4種を一覧表示。",
    type: "website",
  },
};

const layoutTemplates = [
  {
    id: "01",
    name: "コマンドセンター",
    subtitle: "ダッシュボード型",
    desc: "左サイドバーナビ＋CSSグリッドパネル。データ重視のコンパクト構成",
    color: "#0d9488",
    accent: "#f59e0b",
    bg: "#0f1729",
  },
  {
    id: "02",
    name: "インフォハブ",
    subtitle: "タブ切替型",
    desc: "粘着タブバーで4カテゴリ切替。非線形ナビでテーマ別グルーピング",
    color: "#4f46e5",
    accent: "#e11d48",
    bg: "#fafaf9",
  },
  {
    id: "03",
    name: "ロジスティクス・ジャーナル",
    subtitle: "マガジン型",
    desc: "2カラム＋サイドバー構成。エディトリアルデザインで読み応えある印象",
    color: "#c2410c",
    accent: "#c2410c",
    bg: "#fffbf5",
  },
  {
    id: "04",
    name: "スピードコネクト",
    subtitle: "LP型",
    desc: "スプリットHero＋ジグザグ＋CTA中断バナー。コンバージョン特化設計",
    color: "#1e40af",
    accent: "#16a34a",
    bg: "#ffffff",
  },
];

export default function LayoutsGalleryPage() {
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
            コーポレートHP（8種）→
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
            レイアウト集（4種）
          </span>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16,
        }}>
          {layoutTemplates.map((t) => (
            <Link
              key={t.id}
              href={`/layouts/layout-${t.id}`}
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
                  L{t.id}
                </span>
                <span style={{
                  width: 24,
                  height: 4,
                  borderRadius: 2,
                  background: t.accent,
                }} />
              </div>
              <div style={{ padding: "12px 16px" }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 2 }}>
                  {t.name}
                </p>
                <p style={{ fontSize: 11, fontWeight: 600, color: t.color, marginBottom: 4 }}>
                  {t.subtitle}
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
