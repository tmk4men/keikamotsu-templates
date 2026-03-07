import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "コーポレートHP「クリアブリーズ」テンプレート08",
  description:
    "軽貨物ドライバー事業向け — 清潔感・透明性のスカイブルー×ミントグリーンコーポレートサイト。波形背景・贅沢な余白・ミニマルなデザイン。",
  openGraph: {
    title:
      "コーポレートHP「クリアブリーズ」テンプレート08｜軽貨物ドライバー事業テンプレート集",
    description:
      "清潔感・透明性のスカイブルー×ミントグリーンコーポレートサイト。",
    type: "website",
  },
};

export default function Corporate08Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
