import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "採用HP「親しみやすい」テンプレート14",
  description:
    "軽貨物ドライバー採用HP — パステルカラーの親しみやすい採用HP。月収40万〜100万円、車両無料貸出、未経験歓迎の求人情報を効果的に伝えるデザイン。",
  openGraph: {
    title: "採用HP「親しみやすい」テンプレート14｜軽貨物ドライバー事業テンプレート集",
    description: "パステルカラーの親しみやすい採用HP。",
    type: "website",
  },
};

export default function Template14Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
