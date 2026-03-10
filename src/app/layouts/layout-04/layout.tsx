import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "レイアウト集「スピードコネクト」LP型テンプレート",
  description: "コンバージョン特化のLP型コーポレートサイトテンプレート。",
  openGraph: {
    title: "レイアウト集「スピードコネクト」LP型｜軽貨物ドライバー事業テンプレート集",
    description: "スプリットHero＋ジグザグ＋CTA中断バナーのLP型デザイン。",
    type: "website",
  },
};

export default function Layout04Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
