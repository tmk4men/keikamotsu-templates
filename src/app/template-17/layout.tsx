import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "採用HP「ナチュラル」テンプレート17",
  description:
    "軽貨物ドライバー採用HP — グリーン×アースカラーの温もりあるナチュラルデザイン。ウェーブ区切り、ガラスモーフィズム、マーキー演出。月収28万〜35万円、車両無料貸出、未経験歓迎。",
  openGraph: {
    title: "採用HP「ナチュラル」テンプレート17｜軽貨物ドライバー事業テンプレート集",
    description: "グリーン×アースカラーの温もりあるナチュラルデザイン採用HP。",
    type: "website",
  },
};

export default function Template17Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
