import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "コーポレートHP「トラストブルー」テンプレート02",
  description:
    "軽貨物ドライバー事業向け — 信頼と堅実をイメージした青×緑の落ち着いたコーポレートサイト。事業内容・会社概要・代表メッセージ・採用情報まで網羅したワンページデザイン。",
  openGraph: {
    title: "コーポレートHP「トラストブルー」テンプレート02｜軽貨物ドライバー事業テンプレート集",
    description: "信頼と堅実をイメージした青×緑の落ち着いたコーポレートサイト。",
    type: "website",
  },
};

export default function Corporate02Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
