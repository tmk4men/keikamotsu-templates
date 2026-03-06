import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "採用HP「クリエイティブ」テンプレート15",
  description:
    "軽貨物ドライバー採用HP — 非対称レイアウトの個性的な採用HP。月収40万〜100万円、車両無料貸出、未経験歓迎の求人情報を効果的に伝えるデザイン。",
  openGraph: {
    title: "採用HP「クリエイティブ」テンプレート15｜軽貨物ドライバー事業テンプレート集",
    description: "非対称レイアウトの個性的な採用HP。",
    type: "website",
  },
};

export default function Template15Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
