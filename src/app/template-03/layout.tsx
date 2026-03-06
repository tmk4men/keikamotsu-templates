import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "採用HP「ポップ＆カラフル」テンプレート03",
  description:
    "軽貨物ドライバー採用HP — ビビッドカラーと弾むアニメーションのポップな採用HP。月収40万〜100万円、車両無料貸出、未経験歓迎の求人情報を効果的に伝えるデザイン。",
  openGraph: {
    title: "採用HP「ポップ＆カラフル」テンプレート03｜軽貨物ドライバー事業テンプレート集",
    description: "ビビッドカラーと弾むアニメーションのポップな採用HP。",
    type: "website",
  },
};

export default function Template03Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
