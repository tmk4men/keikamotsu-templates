import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "採用HP「RPGクエスト」テンプレート16",
  description:
    "軽貨物ドライバー採用HP — RPG横スクロールの冒険的な採用HP。月収40万〜100万円、車両無料貸出、未経験歓迎の求人情報を効果的に伝えるデザイン。",
  openGraph: {
    title: "採用HP「RPGクエスト」テンプレート16｜軽貨物ドライバー事業テンプレート集",
    description: "RPG横スクロールの冒険的な採用HP。",
    type: "website",
  },
};

export default function Template16Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
