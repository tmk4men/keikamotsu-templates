import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "レイアウト集「ホライゾンフロー」横スクロール型テンプレート",
  description: "フルスクリーン横スクロール＋scroll-snapで没入感のあるコーポレートサイトテンプレート。PCはホイールで横移動、モバイルは縦スクロールに自動切替。",
  openGraph: {
    title: "レイアウト集「ホライゾンフロー」横スクロール型｜軽貨物ドライバー事業テンプレート集",
    description: "横スクロールで展開するパネル型コーポレートサイトデザイン。",
    type: "website",
  },
};

export default function Layout05Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
