import type { Metadata } from "next";
import {
  Noto_Sans_JP,
  Noto_Serif_JP,
  Zen_Kurenaido,
  Playfair_Display,
  Oswald,
  Space_Grotesk,
  JetBrains_Mono,
  M_PLUS_Rounded_1c,
  Shippori_Mincho,
  Klee_One,
  Josefin_Sans,
  Cormorant_Garamond,
  Inter,
  Quicksand,
  Dancing_Script,
  Zen_Maru_Gothic,
} from "next/font/google";
import { meta } from "@/data/siteData";
import "./globals.css";

/* ── 基本日本語フォント ── */
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});
const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
  display: "swap",
});
const zenKurenaido = Zen_Kurenaido({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-handwriting",
  display: "swap",
});

/* ── テンプレート用フォント ── */
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-condensed",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
const mPlusRounded = M_PLUS_Rounded_1c({
  subsets: ["latin"],
  weight: ["300", "400", "700", "800"],
  variable: "--font-rounded",
  display: "swap",
});
const shipporiMincho = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-mincho",
  display: "swap",
});
const kleeOne = Klee_One({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-pen",
  display: "swap",
});
const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-geometric",
  display: "swap",
});
const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-editorial",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-clean",
  display: "swap",
});
const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-airy",
  display: "swap",
});
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});
const zenMaruGothic = Zen_Maru_Gothic({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-maru",
  display: "swap",
});

const allFonts = [
  notoSansJP, notoSerifJP, zenKurenaido,
  playfairDisplay, oswald, spaceGrotesk, jetbrainsMono,
  mPlusRounded, shipporiMincho, kleeOne, josefinSans,
  cormorantGaramond, inter, quicksand, dancingScript, zenMaruGothic,
].map((f) => f.variable).join(" ");

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords,
  openGraph: {
    title: meta.title,
    description: meta.description,
    type: "website",
    locale: "ja_JP",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={allFonts}>
      <body className="font-[family-name:var(--font-sans)] antialiased">
        {children}
      </body>
    </html>
  );
}
