import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "コーポレートHP「ボールドインパクト」テンプレート07",
  description:
    "軽貨物ドライバー事業向け — 力強さ・スピード感のダークネイビー×オレンジコーポレートサイト。斜めレイアウト・極太タイポグラフィ・ダイナミックなデザイン。",
  openGraph: {
    title:
      "コーポレートHP「ボールドインパクト」テンプレート07｜軽貨物ドライバー事業テンプレート集",
    description:
      "力強さ・スピード感のダークネイビー×オレンジコーポレートサイト。",
    type: "website",
  },
};

export default function Corporate07Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
