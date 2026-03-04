"use client";

import { useState } from "react";

const faqItems = [
  {
    q: "未経験でも大丈夫ですか？",
    a: "はい、まったく問題ありません。入社後2週間の研修で、先輩ドライバーが同乗してルートや荷物の扱い方を丁寧にレクチャーします。現在活躍しているドライバーの約7割が未経験からのスタートです。",
  },
  {
    q: "自分の車両は必要ですか？",
    a: "いいえ、車両は会社がリースで用意しますので、ご自身で購入する必要はありません。ガソリンカードも支給されるため、初期費用・燃料費ともに負担ゼロで始められます。",
  },
  {
    q: "普通免許（AT限定）でも応募できますか？",
    a: "はい、AT限定の普通自動車免許があれば応募いただけます。軽バンでの配送なのでAT限定で問題ありません。",
  },
  {
    q: "年齢制限はありますか？",
    a: "特に厳しい年齢制限はありません。現在20代〜50代まで幅広い年代のドライバーが活躍しています。体力に自信がなくても、荷物は軽量なものが中心ですのでご安心ください。",
  },
  {
    q: "正社員と業務委託、どちらがいいですか？",
    a: "それぞれにメリットがあります。正社員は社会保険完備で安定した収入が得られます。業務委託は自分のペースで自由に働けます。まずは業務委託で始めて、後から正社員に切り替えることも可能です。面接時にご希望をお聞かせください。",
  },
  {
    q: "勤務地は選べますか？",
    a: "大阪府内（梅田・なんば・堺・東大阪など）の複数エリアから、ご希望やお住まいを考慮して配属先を決定します。できるだけ通いやすいエリアをご案内しますので、ご相談ください。",
  },
  {
    q: "面接ではどんなことを聞かれますか？",
    a: "難しい質問はありません。これまでのご経験や、働き方の希望などを気軽にお話しいただければ大丈夫です。服装も私服でOKです。「まずは話を聞いてみたい」だけでもお気軽にどうぞ。",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-gray-200 border-y border-gray-200">
      {faqItems.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center gap-4 py-5 text-left transition-colors hover:bg-gray-50 -mx-3 px-3 rounded-md"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-light text-[13px] font-bold text-brand">
                Q
              </span>
              <span className="flex-1 text-[15px] font-bold text-gray-800">
                {item.q}
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-60 pb-5" : "max-h-0"}`}
            >
              <div className="flex gap-4 pl-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cta/10 text-[13px] font-bold text-cta">
                  A
                </span>
                <p className="text-[14px] leading-[1.9] text-gray-600">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
