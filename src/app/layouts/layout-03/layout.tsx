import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "レイアウト集「ロジスティクス・ジャーナル」マガジン型テンプレート",
  description: "2カラム＋サイドバーのマガジン型コーポレートサイトテンプレート。",
  openGraph: {
    title: "レイアウト集「ロジスティクス・ジャーナル」マガジン型｜軽貨物ドライバー事業テンプレート集",
    description: "エディトリアルデザインの2カラムマガジン型コーポレートサイト。",
    type: "website",
  },
};

export default function Layout03Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
