import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "コーポレートHP「ロジスティクス・プロ」テンプレート01",
  description:
    "軽貨物ドライバー事業向け — クリーン企業風・白ベース×紺×オレンジの信頼感あるコーポレートサイト。事業内容・会社概要・代表メッセージ・採用情報まで網羅したワンページデザイン。",
  openGraph: {
    title: "コーポレートHP「ロジスティクス・プロ」テンプレート01｜軽貨物ドライバー事業テンプレート集",
    description: "クリーン企業風・白ベース×紺×オレンジの信頼感あるコーポレートサイト。",
    type: "website",
  },
};

export default function Corporate01Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
