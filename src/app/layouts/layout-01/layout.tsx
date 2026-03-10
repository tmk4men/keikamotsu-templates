import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "レイアウト集「コマンドセンター」ダッシュボード型テンプレート",
  description: "左サイドバーナビ＋CSSグリッドパネルのダッシュボード型コーポレートサイトテンプレート。",
  openGraph: {
    title: "レイアウト集「コマンドセンター」ダッシュボード型｜軽貨物ドライバー事業テンプレート集",
    description: "左サイドバーナビ＋CSSグリッドパネルのダッシュボード型デザイン。",
    type: "website",
  },
};

export default function Layout01Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
