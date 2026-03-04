import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import CountUp from "@/components/CountUp";
import * as data from "@/data/siteData";

/* ===================================================
   TemplateRenderer
   全テンプレート共通のHTML構造を出力する。
   見た目はルートに付与される theme クラス + 各テンプレの CSS で制御。
   =================================================== */

interface Props {
  /** テーマクラス名 (例: "theme-01") */
  theme: string;
  /** ヒーロー画像パスの上書き */
  heroImage?: string;
  /** DrivingTruck を表示するか */
  showTruck?: boolean;
  /** マーキーを表示するか */
  showMarquee?: boolean;
  /** ScrollTruck を表示するか */
  showScrollTruck?: boolean;
  /** パーティクルを表示するか */
  showParticles?: boolean;
  /** 追加の children (テンプレ固有の装飾など) */
  children?: React.ReactNode;
}

export default function TemplateRenderer({
  theme,
  showMarquee = true,
  showParticles = true,
  children,
}: Props) {
  return (
    <div className={`t-root ${theme}`}>
      {/* === ヘッダー === */}
      <header className="t-header">
        <div className="t-header-inner">
          <a href="#" className="t-logo">
            <svg viewBox="0 0 40 28" fill="none" className="t-logo-icon" aria-hidden="true">
              <rect x="1" y="6" width="20" height="13" rx="2" fill="currentColor" />
              <path d="M7 10c3-3 8-2 8 2s-4 5-8 4c2-1 4-3 4-5s-2-2-4-1Z" fill="white" opacity="0.9" />
              <path d="M21 10h8c2 0 3.5 1 4.5 3l2.5 4c.5 1 0 2-1 2h-1v-1h-13Z" fill="currentColor" opacity="0.85" />
              <circle cx="8" cy="21" r="3.5" fill="currentColor" />
              <circle cx="8" cy="21" r="1.5" fill="white" opacity="0.2" />
              <circle cx="29" cy="21" r="3.5" fill="currentColor" />
              <circle cx="29" cy="21" r="1.5" fill="white" opacity="0.2" />
              <rect x="4" y="18" width="28" height="1.5" rx="0.75" fill="currentColor" opacity="0.6" />
            </svg>
            <span className="t-logo-text">{data.company.name.replace("株式会社", "")}</span>
          </a>

          <nav className="t-nav">
            {data.navLinks.map((link) => (
              <a key={link.href} href={link.href} className="t-nav-link">
                {link.label}
              </a>
            ))}
          </nav>

          <a href="#apply" className="t-header-cta">応募する</a>
        </div>
      </header>

      {/* === ヒーロー === */}
      <section className="t-hero">
        {showParticles && (
          <div className="t-hero-particles">
            {[
              { l: "10%", t: "20%", s: "12px", dur: "7s", del: "0s" },
              { l: "30%", t: "55%", s: "8px",  dur: "5.5s", del: "1.5s" },
              { l: "50%", t: "15%", s: "16px", dur: "8s", del: "0.5s" },
              { l: "70%", t: "40%", s: "10px", dur: "6s", del: "2s" },
              { l: "85%", t: "25%", s: "12px", dur: "9s", del: "1s" },
            ].map((p, i) => (
              <div
                key={i}
                className="t-particle"
                style={{
                  left: p.l, top: p.t, width: p.s, height: p.s,
                  "--dur": p.dur, "--delay": p.del,
                } as React.CSSProperties}
              />
            ))}
          </div>
        )}

        <div className="t-hero-inner">
          <h1 className="t-hero-heading">
            {data.hero.headlineParts[0]}
            <br />
            {data.hero.headlineParts[1]}
          </h1>
          <p className="t-hero-sub">
            {data.hero.subtext[0]}
            <br />
            {data.hero.subtext[1]}
            <br />
            {data.hero.subtext[2]}
          </p>

          <div className="t-hero-stats">
            <div className="t-hero-salary">
              <CountUp end={data.hero.salaryMin} />
              <span className="t-hero-salary-sep">〜</span>
              <CountUp end={data.hero.salaryMax} />
              <span className="t-hero-salary-unit">万円/月</span>
            </div>
            <div className="t-hero-badges">
              {data.hero.badges.map((b) => (
                <span key={b} className="t-badge">{b}</span>
              ))}
            </div>
          </div>

          <div className="t-hero-cta-wrap">
            <a href="#apply" className="t-cta-button">{data.hero.cta}</a>
          </div>
        </div>
      </section>

      {/* === マーキー === */}
      {showMarquee && (
        <div className="t-marquee">
          <div className="t-marquee-row t-marquee-row--forward">
            <div className="t-marquee-track">
              {[...Array(3)].map((_, i) => (
                <span key={i} className="t-marquee-items">
                  {data.marquee.top.map((item) => (
                    <span key={item}>
                      <span>{item}</span>
                      <span className="t-marquee-sep">///</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
          <div className="t-marquee-row t-marquee-row--reverse">
            <div className="t-marquee-track">
              {[...Array(3)].map((_, i) => (
                <span key={i} className="t-marquee-items">
                  {data.marquee.bottom.map((item) => (
                    <span key={item}>
                      <span>{item}</span>
                      <span className="t-marquee-sep">///</span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* === 選ばれる3つの理由 === */}
      <section id="reasons" className="t-section t-reasons">
        <ScrollReveal>
          <div className="t-container">
            <h2 className="t-section-heading">
              <span className="t-heading-text">選ばれる3つの理由</span>
            </h2>
            <p className="t-section-sub">
              「ここで始めてよかった」——そう思える理由があります。
            </p>
            <div className="t-reasons-grid">
              {data.reasons.map((r) => (
                <div key={r.num} className="t-card t-reason-card">
                  <span className="t-reason-num">{r.num}</span>
                  <h3 className="t-card-title">{r.title}</h3>
                  <p className="t-card-text">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* === 求人情報 === */}
      <section id="jobs" className="t-section t-jobs">
        <ScrollReveal>
          <div className="t-container">
            <h2 className="t-section-heading">
              <span className="t-heading-text">求人情報</span>
            </h2>
            <p className="t-section-sub">{data.jobs.intro}</p>
            <dl className="t-dl">
              {data.jobs.rows.map((row) => (
                <div key={row.dt} className="t-dl-row">
                  <dt className="t-dl-dt">{row.dt}</dt>
                  <dd className={`t-dl-dd ${row.accent ? "t-accent" : ""}`}>{row.dd}</dd>
                </div>
              ))}
              <div className="t-dl-row">
                <dt className="t-dl-dt">応募条件</dt>
                <dd className="t-dl-dd">
                  <ul className="t-req-list">
                    {data.jobs.requirements.map((r) => (
                      <li key={r} className="t-req-item">
                        <span className="t-req-dot" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </ScrollReveal>
      </section>

      {/* === 待遇・福利厚生 === */}
      <section id="benefits" className="t-section t-benefits">
        <ScrollReveal>
          <div className="t-container">
            <h2 className="t-section-heading">
              <span className="t-heading-text">待遇・福利厚生</span>
            </h2>
            <p className="t-section-sub">
              「長く続けられるかな」——その不安に、制度で応えます。
              保険も、車も、燃料費も。あなたが仕事だけに集中できるように、バックアップ体制を整えました。
            </p>
            <div className="t-benefits-grid">
              {data.benefits.map((b) => (
                <div key={b.title} className="t-card t-benefit-card">
                  <h3 className="t-card-title">{b.title}</h3>
                  <p className="t-card-text">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* === 1日の流れ === */}
      <section id="daily" className="t-section t-daily">
        <ScrollReveal>
          <div className="t-container">
            <h2 className="t-section-heading">
              <span className="t-heading-text">1日の流れ</span>
            </h2>
            <p className="t-section-sub">{data.daily.intro}</p>

            <div className="t-daily-image">
              <Image
                src="/keikamotsu-templates/images/daily-flow.png"
                alt="朝焼けの大阪の街を走る軽バン"
                width={1104}
                height={824}
                className="t-daily-img"
                priority={false}
              />
            </div>

            <div className="t-timeline">
              {data.daily.steps.map((item, i) => (
                <div key={item.time} className="t-timeline-item" style={{ "--i": i } as React.CSSProperties}>
                  <div className="t-timeline-marker">
                    <div className="t-timeline-dot">{item.time}</div>
                    {i < data.daily.steps.length - 1 && <div className="t-timeline-line" />}
                  </div>
                  <div className="t-timeline-content">
                    <h3 className="t-timeline-title">{item.title}</h3>
                    <p className="t-timeline-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* === 先輩ドライバーの声 === */}
      <section id="voices" className="t-section t-voices">
        <ScrollReveal>
          <div className="t-container">
            <h2 className="t-section-heading">
              <span className="t-heading-text">先輩ドライバーの声</span>
            </h2>
            <p className="t-section-sub">
              実際に働いている仲間のリアルな声をご紹介します。
            </p>
            <div className="t-voices-grid">
              {data.voices.map((v, i) => (
                <div key={v.name} className="t-card t-voice-card" style={{ "--i": i } as React.CSSProperties}>
                  <div className="t-voice-profile">
                    <div className="t-voice-avatar">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="t-voice-avatar-icon">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="t-voice-name">
                        {v.name}<span className="t-voice-age">{v.age}</span>
                      </p>
                      <p className="t-voice-prev">{v.prev}</p>
                    </div>
                  </div>
                  <p className="t-voice-text">{v.text}</p>
                  <p className="t-voice-highlight">{v.highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* === お知らせ === */}
      <section id="news" className="t-section t-news">
        <ScrollReveal>
          <div className="t-container">
            <h2 className="t-section-heading">
              <span className="t-heading-text">お知らせ</span>
            </h2>
            <ul className="t-news-list">
              {data.news.map((n) => (
                <li key={n.title} className="t-news-item">
                  <time className="t-news-date">{n.date}</time>
                  <span className={`t-news-tag t-news-tag--${n.tagStyle}`}>{n.tag}</span>
                  <span className="t-news-title">{n.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </section>

      {/* === 会社概要 === */}
      <section id="company" className="t-section t-company">
        <ScrollReveal>
          <div className="t-container">
            <h2 className="t-section-heading">
              <span className="t-heading-text">会社概要</span>
            </h2>
            <dl className="t-dl">
              {data.companyInfo.map((row) => (
                <div key={row.dt} className="t-dl-row">
                  <dt className="t-dl-dt">{row.dt}</dt>
                  <dd className="t-dl-dd">{row.dd}</dd>
                </div>
              ))}
            </dl>
          </div>
        </ScrollReveal>
      </section>

      {/* === 応募CTA === */}
      <section id="apply" className="t-section t-cta-section">
        <ScrollReveal>
          <div className="t-container t-cta-inner">
            <h2 className="t-cta-heading">{data.cta.heading}</h2>
            <p className="t-cta-sub">{data.cta.subtext}</p>
            <div className="t-cta-buttons">
              <a href={`tel:${data.cta.phone}`} className="t-cta-phone">
                <svg viewBox="0 0 24 24" fill="currentColor" className="t-cta-phone-icon">
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                </svg>
                <span>{data.cta.phone}</span>
              </a>
              <a href="/apply" className="t-cta-web">{data.cta.webLabel}</a>
            </div>
            <p className="t-cta-hours">受付時間: {data.company.hours}</p>
          </div>
        </ScrollReveal>
      </section>

      {/* === フッター === */}
      <footer className="t-footer">
        <div className="t-footer-inner">
          <div className="t-footer-company">
            <svg viewBox="0 0 40 28" fill="none" className="t-footer-logo-icon" aria-hidden="true">
              <rect x="1" y="6" width="20" height="13" rx="2" fill="currentColor" />
              <path d="M7 10c3-3 8-2 8 2s-4 5-8 4c2-1 4-3 4-5s-2-2-4-1Z" fill="white" opacity="0.9" />
              <path d="M21 10h8c2 0 3.5 1 4.5 3l2.5 4c.5 1 0 2-1 2h-1v-1h-13Z" fill="currentColor" opacity="0.85" />
              <circle cx="8" cy="21" r="3.5" fill="currentColor" />
              <circle cx="8" cy="21" r="1.5" fill="white" opacity="0.2" />
              <circle cx="29" cy="21" r="3.5" fill="currentColor" />
              <circle cx="29" cy="21" r="1.5" fill="white" opacity="0.2" />
              <rect x="4" y="18" width="28" height="1.5" rx="0.75" fill="currentColor" opacity="0.6" />
            </svg>
            <p className="t-footer-name">{data.company.name}</p>
            <p className="t-footer-address">〒{data.company.postalCode}<br />{data.company.address}</p>
          </div>
          <div className="t-footer-contact">
            <p className="t-footer-label">電話番号</p>
            <a href={`tel:${data.company.phone}`} className="t-footer-phone">{data.company.phone}</a>
            <p className="t-footer-hours">{data.company.hours}</p>
          </div>
          <div className="t-footer-copy">
            &copy; {new Date().getFullYear()} {data.company.nameEn}
          </div>
        </div>
      </footer>

      {/* テンプレ固有の追加要素 */}
      {children}
    </div>
  );
}
