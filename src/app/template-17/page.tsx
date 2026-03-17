import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import DrivingTruck from "@/components/DrivingTruck";
import CountUp from "@/components/CountUp";
import FAQAccordion from "@/components/FAQAccordion";
import ApplicationForm from "@/components/ApplicationForm";
import GalleryCarousel from "@/components/GalleryCarousel";
import "./styles.css";

export default function Template17Page() {
  return (
    <>
      {/* ===== ヒーロー ===== */}
      <section className="hero-bg wave-divider">
        {/* 浮遊パーティクル */}
        <div className="hero-particle left-[10%] top-[20%] h-3 w-3" style={{ "--dur": "7s", "--delay": "0s" } as React.CSSProperties} />
        <div className="hero-particle left-[30%] top-[55%] h-2 w-2" style={{ "--dur": "5.5s", "--delay": "1.5s" } as React.CSSProperties} />
        <div className="hero-particle left-[50%] top-[15%] h-4 w-4" style={{ "--dur": "8s", "--delay": "0.5s" } as React.CSSProperties} />
        <div className="hero-particle left-[70%] top-[40%] h-2.5 w-2.5" style={{ "--dur": "6s", "--delay": "2s" } as React.CSSProperties} />
        <div className="hero-particle left-[85%] top-[25%] h-3 w-3" style={{ "--dur": "9s", "--delay": "1s" } as React.CSSProperties} />

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-56px)] max-w-5xl flex-col justify-center px-6 py-10 md:py-14">
          <h1 className="font-heading hero-gradient-text text-[2rem] leading-[1.4] font-extrabold md:text-[3rem] md:leading-[1.35]">
            運転が好き。
            <br />
            それだけで始められる
            <wbr />
            仕事がある。
          </h1>
          <p className="mt-4 max-w-lg text-[15px] leading-[1.9] text-white/75">
            「経験がないけど大丈夫かな」
            <wbr />
            「自分の車がないとダメ？」
            <br />
            そんな不安、全部うちが引き受けます。
            <br />
            普通免許ひとつで、あなたの
            <wbr />
            新しいキャリアが始まります。
          </p>

          {/* 数字 */}
          <div className="mt-6 flex flex-wrap gap-x-10 gap-y-3">
            <div>
              <p className="text-[2.5rem] font-extrabold leading-none text-white md:text-[3rem]">
                <CountUp end={28} /><span className="text-[1.5rem]">〜</span><CountUp end={35} />
                <span className="ml-1 text-base font-bold text-white/60">
                  万円/月
                </span>
              </p>
            </div>
            <div className="flex items-end gap-4 text-sm">
              <span className="hero-badge">未経験OK</span>
              <span className="hero-badge">大阪府内勤務</span>
              <span className="hero-badge">正社員/業務委託</span>
            </div>
          </div>

          <div className="mt-6">
            <a
              href="#apply"
              className="cta-pulse inline-block rounded-md bg-cta px-8 py-3.5 text-[15px] font-bold text-white transition-all hover:bg-cta-hover hover:scale-105 hover:shadow-lg hover:shadow-cta/25"
            >
              まずは話を聞いてみる
            </a>
          </div>

          {/* トラック走行アニメーション */}
          <DrivingTruck />
        </div>
      </section>

      {/* ===== 横断幕マーキー（2段交差） ===== */}
      <div className="overflow-hidden bg-gray-900">
        {/* 上段: 右→左 */}
        <div className="border-b border-white/10 py-3">
          <div className="marquee-track flex whitespace-nowrap">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="inline-flex gap-6 px-3 text-[15px] font-extrabold tracking-wider text-white md:text-[18px]">
                <span>未経験OK</span>
                <span className="text-brand">///</span>
                <span>月収28万〜35万円</span>
                <span className="text-brand">///</span>
                <span>車両リース完備</span>
                <span className="text-brand">///</span>
                <span>初期費用ゼロ</span>
                <span className="text-brand">///</span>
                <span>大阪府内勤務</span>
                <span className="text-brand">///</span>
              </span>
            ))}
          </div>
        </div>
        {/* 下段: 左→右 */}
        <div className="py-3">
          <div className="marquee-track-reverse flex whitespace-nowrap">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="inline-flex gap-6 px-3 text-[15px] font-extrabold tracking-wider text-white/60 md:text-[18px]">
                <span>充実の研修2週間</span>
                <span className="text-cta">///</span>
                <span>正社員 / 業務委託</span>
                <span className="text-cta">///</span>
                <span>ガソリンカード支給</span>
                <span className="text-cta">///</span>
                <span>報奨金制度あり</span>
                <span className="text-cta">///</span>
                <span>社会保険完備</span>
                <span className="text-cta">///</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ===== 選ばれる3つの理由 ===== */}
      <section id="reasons" className="section-grad-green px-5 pt-20 pb-16 md:pt-28 md:pb-24">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl">
            {/* 背景画像付きヘッダー（上下フェードアウト） */}
            <div className="relative mb-10 overflow-hidden rounded-2xl">
              <Image
                src="/keikamotsu-hp/images/reasons.webp"
                alt="選ばれる理由のイメージ"
                width={1104}
                height={824}
                className="w-full object-cover"
                style={{ minHeight: "200px", maxHeight: "280px" }}
                priority={false}
              />
              {/* 上フェードアウト */}
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#f2f9f5] to-transparent" />
              {/* 下フェードアウト */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#f2f9f5] to-transparent" />
              {/* テキストオーバーレイ */}
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <h2 className="font-heading mb-2 flex items-center gap-2 text-xl font-extrabold text-white drop-shadow-lg">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white/70"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" /></svg>
                  <span>選ばれる3つの理由</span>
                </h2>
                <p className="text-sm text-white/80 drop-shadow">
                  「ここで始めてよかった」——そう思える理由があります。
                </p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {[
                {
                  num: "01",
                  title: "未経験でも安心の研修体制",
                  text: "最初の2週間は先輩が隣に。ひとりで走り出す日まで、ずっと一緒です。道順も荷物の扱いも、イチから丁寧にお伝えします。",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-brand"><path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.949 49.949 0 0 0-9.902 3.912l-.003.002-.34.18a.75.75 0 0 1-.707 0A50.009 50.009 0 0 0 7.5 12.174v-.224a.36.36 0 0 0-.254-.347A49.413 49.413 0 0 0 1.4 10.057a.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" /><path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 0 1-.46.71 47.878 47.878 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.878 47.878 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 0 1 6 13.18v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 0 0 .551-1.608 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.668 2.25 2.25 0 0 0 2.12 0Z" /><path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" /></svg>
                  ),
                },
                {
                  num: "02",
                  title: "初期費用ゼロ、リスクゼロ",
                  text: "車も、ガソリンカードも、制服も。必要なものは全部こちらで用意します。手ぶらで始められるから、金銭的な不安はありません。",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-brand"><path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" /><path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z" clipRule="evenodd" /><path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" /></svg>
                  ),
                },
                {
                  num: "03",
                  title: "がんばった分だけ、ちゃんと返る",
                  text: "月収28万〜35万円。報奨金制度もあるから、やる気がそのまま収入になります。自分のペースで、しっかり稼げます。",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-brand"><path d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a.75.75 0 0 0 0 1.5h12.75a.75.75 0 0 0 0-1.5h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.707 6.707 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z" /></svg>
                  ),
                },
              ].map((reason) => (
                <div key={reason.num} className="stagger-card glass-card rounded-xl p-6">
                  <div className="mb-3 flex items-center gap-3">
                    {reason.icon}
                    <span className="text-2xl font-extrabold text-brand/20">{reason.num}</span>
                  </div>
                  <h3 className="mb-2 text-[15px] font-bold text-gray-900">
                    {reason.title}
                  </h3>
                  <p className="text-[13px] leading-[1.8] text-gray-500">
                    {reason.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ===== 求人情報 ===== */}
      <section id="jobs" className="section-grad-warm px-5 pt-20 pb-16 md:pt-28 md:pb-24">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl">
            {/* 背景画像付きヘッダー（上下フェードアウト） */}
            <div className="relative mb-10 overflow-hidden rounded-2xl">
              <Image
                src="/keikamotsu-hp/images/jobs.webp"
                alt="軽貨物ドライバーの求人イメージ"
                width={1104}
                height={824}
                className="w-full object-cover"
                style={{ minHeight: "200px", maxHeight: "280px" }}
                priority={false}
              />
              {/* 上フェードアウト */}
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#faf9f7] to-transparent" />
              {/* 下フェードアウト */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#faf9f7] to-transparent" />
              {/* テキストオーバーレイ */}
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <h2 className="font-heading mb-2 flex items-center gap-2 text-xl font-extrabold text-white drop-shadow-lg">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white/70"><path fillRule="evenodd" d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75a24.726 24.726 0 0 1-7.814-1.259c-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" /><path d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z" /></svg>
                  <span>求人情報</span>
                </h2>
                <p className="text-sm text-white/80 drop-shadow">
                  あなたに合う働き方、見つかります。
                  <wbr />
                  正社員として安定を求めるもよし、
                  <wbr />
                  業務委託で自由に働くもよし。
                  <wbr />
                  どちらも全力でサポートします。
                </p>
              </div>
            </div>

            <dl className="divide-y divide-gray-200 border-y border-gray-200">
              {[
                { dt: "職種", dd: "軽貨物ドライバー" },
                { dt: "雇用形態", dd: "正社員 / 業務委託" },
                {
                  dt: "給与",
                  dd: "月収28万〜35万円（経験・能力による）",
                  accent: true,
                },
                {
                  dt: "勤務地",
                  dd: "大阪府内（梅田・なんば・堺・東大阪 他）",
                },
                {
                  dt: "勤務時間",
                  dd: "6:00〜18:00（シフト制・実働8時間）",
                },
              ].map((row) => (
                <div
                  key={row.dt}
                  className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-0"
                >
                  <dt className="w-28 shrink-0 text-[13px] font-bold text-gray-400">
                    {row.dt}
                  </dt>
                  <dd
                    className={
                      row.accent
                        ? "text-[15px] font-bold text-cta"
                        : "text-[15px] text-gray-800"
                    }
                  >
                    {row.dd}
                  </dd>
                </div>
              ))}

              <div className="flex flex-col gap-2 py-4 sm:flex-row sm:gap-0">
                <dt className="w-28 shrink-0 text-[13px] font-bold text-gray-400">
                  応募条件
                </dt>
                <dd className="text-[15px] text-gray-800">
                  <ul className="space-y-1.5">
                    {[
                      "要普通自動車免許（AT限定可）",
                      "未経験者歓迎",
                      "学歴不問",
                      "20代〜50代活躍中",
                    ].map((r, i) => (
                      <li key={r} className="flex items-start gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                        <span className="condition-underline" style={{ animationDelay: `${i * 0.3}s` }}>{r}</span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </ScrollReveal>
      </section>

      {/* ===== 待遇・福利厚生 ===== */}
      <section id="benefits" className="wave-divider wave-divider-bg section-grad-mint px-5 py-16 md:py-24">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl">
            {/* 背景画像付きヘッダー（上下フェードアウト） */}
            <div className="relative mb-10 overflow-hidden rounded-2xl">
              <Image
                src="/keikamotsu-hp/images/benefits.webp"
                alt="待遇・福利厚生のイメージ"
                width={1104}
                height={824}
                className="w-full object-cover"
                style={{ minHeight: "200px", maxHeight: "280px" }}
                priority={false}
              />
              {/* 上フェードアウト */}
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#eef8f3] to-transparent" />
              {/* 下フェードアウト */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#eef8f3] to-transparent" />
              {/* テキストオーバーレイ */}
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <h2 className="font-heading mb-2 flex items-center gap-2 text-xl font-extrabold text-white drop-shadow-lg">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white/70"><path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" /></svg>
                  <span>待遇・福利厚生</span>
                </h2>
                <p className="text-sm text-white/80 drop-shadow">
                  「長く続けられるかな」——その不安に、制度で応えます。
                  <br />
                  保険も、車も、燃料費も。あなたが仕事だけに
                  <wbr />
                  集中できるように、バックアップ体制を整えました。
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  title: "車両リースあり",
                  text: "自分の車がなくても大丈夫。初期費用ゼロで始められます。",
                  icon: <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-gray-400"><path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h1.218c.415-1.16 1.524-2 2.832-2 1.308 0 2.417.84 2.832 2h7.236c.415-1.16 1.524-2 2.832-2 1.308 0 2.417.84 2.832 2H22.5V9.75l-3.15-4.2A1.875 1.875 0 0 0 17.85 4.5H3.375Z" /><path fillRule="evenodd" d="M5.55 15.75a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm13.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" clipRule="evenodd" /></svg>,
                },
                {
                  title: "ガソリンカード支給",
                  text: "毎月の燃料費を会社が負担。ガソリン代を気にせず走れます。",
                  icon: <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-gray-400"><path fillRule="evenodd" d="M2.25 4.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875V17.25a4.5 4.5 0 1 1-9 0V4.125Zm4.5 14.25a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" clipRule="evenodd" /><path d="M10.719 21.75h9.156c1.036 0 1.875-.84 1.875-1.875v-5.25a1.875 1.875 0 0 0-.829-1.558l-4.5-3a.75.75 0 0 0-.832 0l-4.5 3A1.875 1.875 0 0 0 10.26 15v5.875c0 .483.364.875.46.875Z" /></svg>,
                },
                {
                  title: "社会保険完備",
                  text: "健康保険・厚生年金・雇用保険に加入できます。",
                  icon: <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-gray-400"><path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" /></svg>,
                },
                {
                  title: "制服貸与",
                  text: "ユニフォームは無償で支給。準備の手間がありません。",
                  icon: <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-gray-400"><path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clipRule="evenodd" /></svg>,
                },
                {
                  title: "充実の研修（2週間）",
                  text: "先輩が同乗してルートも荷物の扱いも丁寧にレクチャーします。",
                  icon: <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-gray-400"><path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.949 49.949 0 0 0-9.902 3.912l-.003.002-.34.18a.75.75 0 0 1-.707 0A50.009 50.009 0 0 0 7.5 12.174v-.224a.36.36 0 0 0-.254-.347A49.413 49.413 0 0 0 1.4 10.057a.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" /><path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 0 1-.46.71 47.878 47.878 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.878 47.878 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 0 1 6 13.18v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 0 0 .551-1.608 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.668 2.25 2.25 0 0 0 2.12 0Z" /><path d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" /></svg>,
                },
                {
                  title: "報奨金制度",
                  text: "がんばった分だけ還元。成果に応じた上乗せがあります。",
                  icon: <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-gray-400"><path d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a.75.75 0 0 0 0 1.5h12.75a.75.75 0 0 0 0-1.5h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.707 6.707 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z" /></svg>,
                },
              ].map((b) => (
                <div key={b.title} className="stagger-card glass-card rounded-xl p-6">
                  <div className="mb-3">{b.icon}</div>
                  <h3 className="mb-1.5 text-[15px] font-bold text-gray-900">
                    {b.title}
                  </h3>
                  <p className="text-[13px] leading-[1.8] text-gray-500">
                    {b.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ===== 1日の流れ ===== */}
      <section id="daily" className="section-grad-sunset px-5 pt-20 pb-16 md:pt-28 md:pb-24">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl">
            {/* 背景画像付きヘッダー */}
            <div className="relative mb-10 overflow-hidden rounded-2xl">
              <Image
                src="/keikamotsu-hp/images/daily-flow.webp"
                alt="朝焼けの大阪の街を走る軽バン"
                width={1104}
                height={824}
                className="w-full object-cover"
                style={{ minHeight: "200px", maxHeight: "280px" }}
                priority={false}
              />
              {/* 上フェードアウト */}
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#faf6f2] to-transparent" />
              {/* 下フェードアウト */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#faf6f2] to-transparent" />
              {/* テキストオーバーレイ */}
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <h2 className="font-heading mb-2 flex items-center gap-2 text-xl font-extrabold text-white drop-shadow-lg">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white/70"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" /></svg>
                  <span>1日の流れ</span>
                </h2>
                <p className="text-sm text-white/80 drop-shadow">
                  「実際どんな1日なの？」——働くイメージが湧くように、
                  <wbr />
                  ある日のスケジュールをご紹介します。
                </p>
              </div>
            </div>

            <div className="timeline-container space-y-0">
              {[
                {
                  time: "7:00",
                  title: "出勤・車両チェック",
                  desc: "「おはようございます」の声が飛び交う朝。点検を済ませて、今日も安全に出発。",
                },
                {
                  time: "7:30",
                  title: "荷物の積み込み",
                  desc: "今日のルートを確認。慣れれば15分で完了します。最初は先輩が一緒だから安心。",
                },
                {
                  time: "8:00",
                  title: "配送スタート",
                  desc: "大阪の街を自分のペースで走る。お届け先で「ありがとう」の一言がうれしい。",
                },
                {
                  time: "12:00",
                  title: "お昼休憩",
                  desc: "好きな場所で自分だけの休憩時間。お気に入りのランチスポットを探すのも楽しみのひとつ。",
                },
                {
                  time: "13:00",
                  title: "午後の配送",
                  desc: "午後もマイペースに配送。道を覚えるごとに、どんどんスムーズになります。",
                },
                {
                  time: "17:00",
                  title: "業務終了",
                  desc: "荷物を届け終えたら、まっすぐ帰れる。残業はほとんどありません。",
                },
              ].map((item, i) => (
                <div
                  key={item.time}
                  className="timeline-item relative flex gap-4 pb-8 last:pb-0 slide-from-left"
                  style={{ transitionDelay: `${i * 0.3}s` }}
                >
                  {/* タイムラインの線と丸 */}
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                      {item.time}
                    </div>
                    {i < 5 && (
                      <div className="w-0.5 grow bg-brand/20" />
                    )}
                  </div>
                  {/* コンテンツ */}
                  <div className="pt-1.5 pb-2">
                    <h3 className="text-[15px] font-bold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[13px] leading-[1.8] text-gray-500">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ===== 先輩ドライバーの声 ===== */}
      <section id="voices" className="section-grad-sky px-5 pt-20 pb-16 md:pt-28 md:pb-24">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl">
            {/* 背景画像付きヘッダー（上下フェードアウト） */}
            <div className="relative mb-10 overflow-hidden rounded-2xl">
              <Image
                src="/keikamotsu-hp/images/voices.webp"
                alt="先輩ドライバーのイメージ"
                width={1104}
                height={824}
                className="w-full object-cover"
                style={{ minHeight: "200px", maxHeight: "280px" }}
                priority={false}
              />
              {/* 上フェードアウト */}
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#f0f6fa] to-transparent" />
              {/* 下フェードアウト */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#f0f6fa] to-transparent" />
              {/* テキストオーバーレイ */}
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <h2 className="font-heading mb-2 flex items-center gap-2 text-xl font-extrabold text-white drop-shadow-lg">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white/70"><path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.29 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.68-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.025 7.5a.75.75 0 0 0 0 1.5h11.95a.75.75 0 0 0 0-1.5H6.025Zm.75 3.75a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5h-5.5Z" clipRule="evenodd" /></svg>
                  <span>先輩ドライバーの声</span>
                </h2>
                <p className="text-sm text-white/80 drop-shadow">
                  実際に働いている仲間のリアルな声をご紹介します。
                </p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {[
                {
                  name: "Tさん",
                  age: "30代",
                  prev: "飲食業から転職",
                  text: "前職は飲食業で、毎日深夜まで働いていました。運転は好きだったけど、未経験で不安だらけ。でも研修で先輩がずっと横にいてくれたおかげで、2週間で自信がつきました。今では自分のペースで稼げるこの仕事が本当に気に入っています。",
                  highlight: "研修で自信がつきました",
                  from: "left" as const,
                },
                {
                  name: "Mさん",
                  age: "40代",
                  prev: "Wワークから正社員へ",
                  text: "最初は副業として業務委託で始めました。「合わなかったらやめよう」くらいの気持ちで。でも働いてみたら居心地がよくて、半年後に正社員に。今は家族との時間も増えて、転職して本当によかったと思います。",
                  highlight: "家族との時間も増えました",
                  from: "right" as const,
                },
                {
                  name: "Kさん",
                  age: "20代",
                  prev: "フリーターから正社員へ",
                  text: "正直、学歴に自信がなくて就活がうまくいかなかった。でもここは学歴不問で、やる気だけを見てくれました。今では月収30万以上。「がんばった分だけ返ってくる」って、本当だったんだなって実感しています。",
                  highlight: "やる気だけを見てくれました",
                  from: "left" as const,
                },
              ].map((voice, i) => (
                <div
                  key={voice.name}
                  className={`speech-bubble glass-card rounded-xl p-6 ${
                    voice.from === "left" ? "slide-from-left" : "slide-from-right"
                  }`}
                  style={{ transitionDelay: `${i * 0.35}s` }}
                >
                  {/* プロフィール */}
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-light">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-brand"><path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" /></svg>
                    </div>
                    <div>
                      <p className="text-[15px] font-bold text-gray-900">
                        {voice.name}
                        <span className="ml-2 text-[13px] font-normal text-gray-400">
                          {voice.age}
                        </span>
                      </p>
                      <p className="text-[12px] text-gray-400">{voice.prev}</p>
                    </div>
                  </div>
                  {/* 体験談 */}
                  <p className="text-[13px] leading-[1.8] text-gray-600" style={{ wordBreak: "normal" }}>
                    {voice.text}
                  </p>
                  {/* ハイライト */}
                  <p className="mt-3 inline-block rounded-full bg-brand-light px-3 py-1 text-[12px] font-bold text-brand">
                    {voice.highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ===== よくある質問（FAQ） ===== */}
      <section id="faq" className="section-grad-mint px-5 pt-20 pb-16 md:pt-28 md:pb-24">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl">
            {/* 背景画像付きヘッダー（上下フェードアウト） */}
            <div className="relative mb-10 overflow-hidden rounded-2xl">
              <Image
                src="/keikamotsu-hp/images/faq.webp"
                alt="よくある質問のイメージ"
                width={1104}
                height={824}
                className="w-full object-cover"
                style={{ minHeight: "200px", maxHeight: "280px" }}
                priority={false}
              />
              {/* 上フェードアウト */}
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#eef8f3] to-transparent" />
              {/* 下フェードアウト */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#eef8f3] to-transparent" />
              {/* テキストオーバーレイ */}
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <h2 className="font-heading mb-2 flex items-center gap-2 text-xl font-extrabold text-white drop-shadow-lg">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white/70"><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" /></svg>
                  <span>よくある質問</span>
                </h2>
                <p className="text-sm text-white/80 drop-shadow">
                  応募前に気になることをまとめました。
                  <wbr />
                  お気軽にお問い合わせください。
                </p>
              </div>
            </div>

            <FAQAccordion />
          </div>
        </ScrollReveal>
      </section>

      {/* ===== ギャラリー ===== */}
      <section id="gallery" className="section-grad-sunset px-5 pt-20 pb-16 md:pt-28 md:pb-24">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-heading mb-2 flex items-center gap-2 text-xl font-extrabold text-gray-900">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-gray-400"><path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" /></svg>
              <span className="heading-underline">職場の雰囲気</span>
            </h2>
            <p className="mb-10 text-sm text-gray-400">
              実際の車両や職場の様子をご覧ください。
            </p>

            <GalleryCarousel />
          </div>
        </ScrollReveal>
      </section>

      {/* ===== お知らせ ===== */}
      <section id="news" className="section-grad-warm px-5 pt-20 pb-16 md:pt-28 md:pb-24">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-heading mb-8 flex items-center gap-2 text-xl font-extrabold text-gray-900">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-gray-400"><path d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z" /><path fillRule="evenodd" d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z" clipRule="evenodd" /></svg>
              <span className="heading-underline">お知らせ</span>
            </h2>

            <ul className="divide-y divide-gray-200 border-y border-gray-200">
              {[
                {
                  date: "2025.01.15",
                  tag: "急募",
                  tagBg: "bg-red-600 text-white",
                  title: "東大阪エリアのドライバーを募集中！",
                },
                {
                  date: "2024.12.20",
                  tag: "お知らせ",
                  tagBg: "bg-gray-100 text-gray-500",
                  title: "年末年始の営業について",
                },
                {
                  date: "2024.11.01",
                  tag: "新着",
                  tagBg: "bg-brand-light text-brand",
                  title: "堺市に新拠点をオープンしました",
                },
                {
                  date: "2024.10.15",
                  tag: "レポート",
                  tagBg: "bg-gray-100 text-gray-500",
                  title: "安全運転講習会を実施しました",
                },
              ].map((n) => (
                <li key={n.title} className="py-4 transition-colors duration-200 hover:bg-gray-50 -mx-3 px-3 rounded-md">
                  <div className="flex items-start gap-4">
                    <time className="mt-0.5 w-20 shrink-0 whitespace-nowrap text-[13px] tabular-nums text-gray-400">
                      {n.date}
                    </time>
                    <span
                      className={`mt-0.5 shrink-0 rounded px-1.5 py-px text-[11px] font-bold ${n.tagBg}`}
                    >
                      {n.tag}
                    </span>
                    <span className="text-[15px] text-gray-800">
                      {n.title}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </section>

      {/* ===== 会社概要 ===== */}
      <section id="company" className="wave-divider wave-divider-pale section-grad-green px-5 py-16 md:py-24">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl">
            {/* 背景画像付きヘッダー（上下フェードアウト） */}
            <div className="relative mb-8 overflow-hidden rounded-2xl">
              <Image
                src="/keikamotsu-hp/images/company.webp"
                alt="会社外観のイメージ"
                width={1104}
                height={824}
                className="w-full object-cover"
                style={{ minHeight: "200px", maxHeight: "280px" }}
                priority={false}
              />
              {/* 上フェードアウト */}
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#f2f9f5] to-transparent" />
              {/* 下フェードアウト */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#f2f9f5] to-transparent" />
              {/* テキストオーバーレイ */}
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <h2 className="font-heading flex items-center gap-2 text-xl font-extrabold text-white drop-shadow-lg">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white/70"><path fillRule="evenodd" d="M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5h-15ZM9 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm-.75 3.75A.75.75 0 0 1 9 9h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75-5.25A.75.75 0 0 1 13.5 6H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM13.5 9a.75.75 0 0 0 0 1.5H15a.75.75 0 0 0 0-1.5h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM9 19.5v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25H9Z" clipRule="evenodd" /></svg>
                  <span>会社概要</span>
                </h2>
              </div>
            </div>

            <dl className="divide-y divide-gray-200 border-y border-gray-200">
              {[
                { dt: "社名", dd: "グリーンロジスティクス株式会社" },
                {
                  dt: "住所",
                  dd: "大阪府大阪市中央区本町1-1-1 グリーンビル5F",
                },
                { dt: "電話番号", dd: "06-1234-5678" },
              ].map((row) => (
                <div
                  key={row.dt}
                  className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-0"
                >
                  <dt className="w-28 shrink-0 text-[13px] font-bold text-gray-400">
                    {row.dt}
                  </dt>
                  <dd className="text-[15px] text-gray-800">{row.dd}</dd>
                </div>
              ))}
            </dl>
          </div>
        </ScrollReveal>
      </section>

      {/* ===== アクセス・地図 ===== */}
      <section id="access" className="section-grad-warm px-5 pt-20 pb-16 md:pt-28 md:pb-24">
        <ScrollReveal>
          <div className="mx-auto max-w-3xl">
            <h2 className="font-heading mb-2 flex items-center gap-2 text-xl font-extrabold text-gray-900">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-gray-400"><path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 3.827 3.024ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" /></svg>
              <span className="heading-underline">アクセス</span>
            </h2>
            <p className="mb-10 text-sm text-gray-400">
              面接・見学はこちらの営業所で行います。
              <wbr />
              お気軽にお越しください。
            </p>

            <div className="stagger-card glass-card overflow-hidden rounded-xl">
              <div className="p-6">
                <dl className="grid gap-3 text-[15px] sm:grid-cols-[auto_1fr]">
                  <dt className="font-bold text-gray-400">住所</dt>
                  <dd className="text-gray-800">〒541-0053 大阪府大阪市中央区本町1-1-1 グリーンビル5F</dd>
                  <dt className="font-bold text-gray-400">最寄り駅</dt>
                  <dd className="text-gray-800">大阪メトロ 御堂筋線・中央線「本町駅」徒歩3分</dd>
                  <dt className="font-bold text-gray-400">電話番号</dt>
                  <dd className="text-gray-800">
                    <a href="tel:06-1234-5678" className="text-brand font-bold hover:underline">06-1234-5678</a>
                    <span className="ml-2 text-[13px] text-gray-400">（平日 9:00〜18:00）</span>
                  </dd>
                </dl>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.167!2d135.5023!3d34.6837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000e7224e300001%3A0x1234567890abcdef!2z5pys55S677yR5LiB55uu!5e0!3m2!1sja!2sjp!4v1700000000000!5m2!1sja!2sjp"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
                title="グリーンロジスティクス株式会社 所在地"
              />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ===== 応募CTA + Webフォーム ===== */}
      <section
        id="apply"
        className="section-grad-cta px-5 pt-20 pb-16 md:pt-28 md:pb-24"
      >
        <ScrollReveal>
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <h2 className="font-[family-name:var(--font-handwriting)] text-2xl text-gray-900 md:text-3xl">
                <span className="heading-underline">「ちょっと話を聞いてみたい」<br />——それだけで大丈夫です。</span>
              </h2>
              <p className="mt-4 text-sm leading-[1.9] text-gray-500">
                応募を迷っている方も、まずは気軽にお電話ください。
                <br />
                あなたの不安や疑問に、ひとつひとつお答えします。
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="tel:06-1234-5678"
                  className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-7 py-4 transition-colors hover:border-brand"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 text-brand"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="whitespace-nowrap text-lg font-extrabold text-gray-900">
                    06-1234-5678
                  </span>
                </a>
                <a
                  href="#apply-form"
                  className="rounded-md bg-cta px-7 py-4 text-base font-bold text-white transition-colors hover:bg-cta-hover"
                >
                  Webから応募する
                </a>
              </div>

              <p className="mt-5 text-xs text-gray-400">
                受付時間: 平日 9:00〜18:00
              </p>
            </div>

            {/* Web応募フォーム */}
            <div id="apply-form" className="mt-14">
              <h3 className="mb-6 text-center text-lg font-extrabold text-gray-900">
                <svg viewBox="0 0 24 24" fill="currentColor" className="mb-1 inline h-5 w-5 text-gray-400"><path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" /><path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" /></svg>
                {" "}Web応募フォーム
              </h3>
              <ApplicationForm />
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
