import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "コーポレートHP「エコモーション」テンプレート03",
  description:
    "軽貨物ドライバー事業向け — ナチュラル＆エコな緑×琥珀の温かなコーポレートサイト。事業内容・会社概要・代表メッセージ・採用情報まで網羅したワンページデザイン。",
  openGraph: {
    title: "コーポレートHP「エコモーション」テンプレート03｜軽貨物ドライバー事業テンプレート集",
    description: "ナチュラル＆エコな緑×琥珀の温かなコーポレートサイト。",
    type: "website",
  },
};

export default function Corporate03Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
