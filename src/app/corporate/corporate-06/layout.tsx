import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "コーポレートHP「ウォームドライブ」テンプレート06",
  description:
    "軽貨物ドライバー事業向け — 温かみ・地域密着のアースカラーコーポレートサイト。丸角カード・手書き風アクセント・紙テクスチャ背景のやわらかいデザイン。",
  openGraph: {
    title:
      "コーポレートHP「ウォームドライブ」テンプレート06｜軽貨物ドライバー事業テンプレート集",
    description: "温かみ・地域密着のアースカラーコーポレートサイト。",
    type: "website",
  },
};

export default function Corporate06Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
