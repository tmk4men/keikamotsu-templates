import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "採用HP「爽やか」テンプレート05",
  description:
    "軽貨物ドライバー採用HP — 水色×白の爽やかで清潔感のある採用HP。月収40万〜100万円、車両無料貸出、未経験歓迎の求人情報を効果的に伝えるデザイン。",
  openGraph: {
    title: "採用HP「爽やか」テンプレート05｜軽貨物ドライバー事業テンプレート集",
    description: "水色×白の爽やかで清潔感のある採用HP。",
    type: "website",
  },
};

export default function Template05Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
