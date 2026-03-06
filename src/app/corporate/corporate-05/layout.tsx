import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "コーポレートHP「フューチャーフロー」テンプレート05",
  description:
    "軽貨物ドライバー事業向け — グラデーション×グラスモーフィズムの先進的コーポレートサイト。事業内容・会社概要・代表メッセージ・採用情報まで網羅したワンページデザイン。",
  openGraph: {
    title: "コーポレートHP「フューチャーフロー」テンプレート05｜軽貨物ドライバー事業テンプレート集",
    description: "グラデーション×グラスモーフィズムの先進的コーポレートサイト。",
    type: "website",
  },
};

export default function Corporate05Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
