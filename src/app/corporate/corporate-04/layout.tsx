import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "コーポレートHP「エグゼクティブ」テンプレート04",
  description:
    "軽貨物ドライバー事業向け — ダークテーマ×ゴールドの高級感あるコーポレートサイト。事業内容・会社概要・代表メッセージ・採用情報まで網羅したワンページデザイン。",
  openGraph: {
    title: "コーポレートHP「エグゼクティブ」テンプレート04｜軽貨物ドライバー事業テンプレート集",
    description: "ダークテーマ×ゴールドの高級感あるコーポレートサイト。",
    type: "website",
  },
};

export default function Corporate04Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
