import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "レイアウト集「インフォハブ」タブ切替型テンプレート",
  description: "粘着タブバーで4カテゴリ切替のコーポレートサイトテンプレート。",
  openGraph: {
    title: "レイアウト集「インフォハブ」タブ切替型｜軽貨物ドライバー事業テンプレート集",
    description: "粘着タブバーで4カテゴリ切替のコーポレートサイトデザイン。",
    type: "website",
  },
};

export default function Layout02Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
