"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as data from "@/data/siteData";
import "./styles.css";

/* ===================================================
   Template 08: クリーン (Clean Corporate)
   Tabbed UI + progress bars + icon grid
   =================================================== */

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function useScrollAnim() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>(".t08-anim");
    if (targets.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const anim = target.dataset.anim || "t08-anim--fadeUp";
            target.classList.add(anim);
            obs.unobserve(target);
          }
        });
      },
      { threshold: 0.1 }
    );
    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, []);
  return ref;
}

function FadeIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div ref={ref} className={`clean-fade ${visible ? "clean-fade--in" : ""} ${className}`}>
      {children}
    </div>
  );
}

function AnimatedCounter({ end }: { end: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    let current = 0;
    const step = end / 40;
    const timer = setInterval(() => {
      current += step;
      if (current >= end) { setCount(end); clearInterval(timer); }
      else { setCount(Math.floor(current)); }
    }, 30);
    return () => clearInterval(timer);
  }, [started, end]);
  return <span ref={ref}>{count}</span>;
}

export default function Template08Page() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const galleryTouchStart = useRef(0);
  const animRef = useScrollAnim();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setGalleryIdx((prev) => (prev + 1) % data.gallery.images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Tab data for job info
  const tabData = [
    {
      label: "基本情報",
      content: data.jobs.rows.slice(0, 3),
    },
    {
      label: "応募条件",
      content: null,
      requirements: data.jobs.requirements,
    },
    {
      label: "待遇",
      content: data.jobs.rows.slice(3),
    },
  ];

  return (
    <div className="theme-08" ref={animRef}>
      {/* ========== Header ========== */}
      <header className={`clean-header ${scrolled ? "clean-header--scrolled" : ""}`}>
        <div className="clean-header__inner">
          <a href="#" className="clean-logo">
            <div className="clean-logo__circle">GL</div>
            <span className="clean-logo__name">{data.company.nameEn}</span>
          </a>

          <button className="clean-hamburger" onClick={() => setMobileNav(!mobileNav)} aria-label="メニュー">
            <span /><span /><span />
          </button>

          <nav className={`clean-nav ${mobileNav ? "clean-nav--open" : ""}`}>
            {data.navLinks.map((link) => (
              <a key={link.href} href={link.href} className="clean-nav__link" onClick={() => setMobileNav(false)}>
                {link.label}
              </a>
            ))}
            <a href="#apply" className="clean-nav__cta" onClick={() => setMobileNav(false)}>応募する</a>
          </nav>
        </div>
      </header>

      {/* ========== Hero ========== */}
      <section className="clean-hero">
        <div className="clean-hero__overlay" />
        <div className="clean-hero__content">
          <h1 className="clean-hero__heading">
            {data.hero.headlineParts[0]}<br />{data.hero.headlineParts[1]}
          </h1>
          <p className="clean-hero__sub">
            {data.hero.subtext.map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}
          </p>
          {/* Stat Circles */}
          <div className="clean-hero__stats">
            <div className="clean-hero__stat-circle">
              <svg viewBox="0 0 120 120" className="clean-hero__stat-svg">
                <circle cx="60" cy="60" r="54" className="clean-hero__stat-bg-ring" />
                <circle cx="60" cy="60" r="54" className="clean-hero__stat-ring" strokeDasharray="339.29" strokeDashoffset="100" />
              </svg>
              <div className="clean-hero__stat-value">
                <AnimatedCounter end={data.hero.salaryMin} /><span className="clean-hero__stat-unit">万〜</span>
              </div>
            </div>
            <div className="clean-hero__stat-circle">
              <svg viewBox="0 0 120 120" className="clean-hero__stat-svg">
                <circle cx="60" cy="60" r="54" className="clean-hero__stat-bg-ring" />
                <circle cx="60" cy="60" r="54" className="clean-hero__stat-ring clean-hero__stat-ring--full" strokeDasharray="339.29" strokeDashoffset="50" />
              </svg>
              <div className="clean-hero__stat-value">
                <AnimatedCounter end={data.hero.salaryMax} /><span className="clean-hero__stat-unit">万円</span>
              </div>
            </div>
          </div>
          <div className="clean-hero__badges">
            {data.hero.badges.map((b) => (
              <span key={b} className="clean-hero__badge">{b}</span>
            ))}
          </div>
          <a href="#apply" className="clean-hero__cta">{data.hero.cta}</a>
        </div>
      </section>

      {/* ========== Info Strip (replaces marquee) ========== */}
      <div className="clean-strip">
        {[...data.marquee.top, ...data.marquee.bottom].slice(0, 5).map((item) => (
          <div key={item} className="clean-strip__item">
            <span className="clean-strip__icon">&#10003;</span>
            <span>{item}</span>
          </div>
        ))}
      </div>

      {/* ========== Reasons (Step Cards) ========== */}
      <FadeIn>
        <section id="reasons" className="clean-reasons">
          <div className="clean-container">
            <h2 className="clean-section-title t08-anim" data-anim="t08-anim--fadeUp">選ばれる3つの理由</h2>
            <p className="clean-section-sub t08-anim t08-anim-delay-1" data-anim="t08-anim--fadeUp">「ここで始めてよかった」——そう思える理由があります。</p>
            <div className="clean-steps">
              {data.reasons.map((r, i) => (
                <div key={r.num} className={`clean-step t08-anim t08-anim-delay-${Math.min(i + 1, 4) as 1 | 2 | 3 | 4}`} data-anim="t08-anim--clipReveal">
                  <div className="clean-step__circle">{r.num}</div>
                  {i < data.reasons.length - 1 && <div className="clean-step__line" />}
                  <h3 className="clean-step__title">{r.title}</h3>
                  <p className="clean-step__text">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ========== Job Info (Tabs) ========== */}
      <FadeIn>
        <section id="jobs" className="clean-jobs">
          <div className="clean-container">
            <h2 className="clean-section-title t08-anim" data-anim="t08-anim--fadeUp">求人情報</h2>
            <p className="clean-section-sub t08-anim t08-anim-delay-1" data-anim="t08-anim--fadeUp">{data.jobs.intro}</p>
            <div className="clean-tabs t08-anim t08-anim-delay-2" data-anim="t08-anim--fadeUp">
              <div className="clean-tabs__header">
                {tabData.map((tab, i) => (
                  <button
                    key={tab.label}
                    className={`clean-tabs__tab ${activeTab === i ? "clean-tabs__tab--active" : ""}`}
                    onClick={() => setActiveTab(i)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="clean-tabs__content">
                {activeTab === 1 ? (
                  <ul className="clean-tabs__req-list">
                    {tabData[1].requirements?.map((r) => (
                      <li key={r} className="clean-tabs__req-item">
                        <span className="clean-tabs__check">&#10003;</span>{r}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <dl className="clean-tabs__dl">
                    {tabData[activeTab].content?.map((row) => (
                      <div key={row.dt} className="clean-tabs__row">
                        <dt className="clean-tabs__dt">{row.dt}</dt>
                        <dd className={`clean-tabs__dd ${row.accent ? "clean-tabs__dd--accent" : ""}`}>{row.dd}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ========== Benefits (Icon Grid) ========== */}
      <FadeIn>
        <section id="benefits" className="clean-benefits">
          <div className="clean-container">
            <h2 className="clean-section-title t08-anim" data-anim="t08-anim--fadeUp">待遇・福利厚生</h2>
            <div className="clean-icon-grid">
              {data.benefits.map((b, i) => (
                <div key={b.title} className={`clean-icon-card t08-anim t08-anim-delay-${Math.min(i % 3 + 1, 3) as 1 | 2 | 3}`} data-anim="t08-anim--clipReveal">
                  <div className="clean-icon-card__circle">
                    <span className="clean-icon-card__letter">{b.title[0]}</span>
                  </div>
                  <h3 className="clean-icon-card__title">{b.title}</h3>
                  <p className="clean-icon-card__text">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ========== Daily (Progress Bars) ========== */}
      <FadeIn>
        <section id="daily" className="clean-daily">
          <div className="clean-container">
            <h2 className="clean-section-title t08-anim" data-anim="t08-anim--fadeUp">1日の流れ</h2>
            <p className="clean-section-sub t08-anim t08-anim-delay-1" data-anim="t08-anim--fadeUp">{data.daily.intro}</p>
            <div className="clean-progress-timeline">
              {data.daily.steps.map((step, i) => {
                const widths = [10, 25, 40, 55, 70, 90];
                return (
                  <div key={step.time} className={`clean-progress-item t08-anim t08-anim-delay-${Math.min(i % 4 + 1, 4) as 1 | 2 | 3 | 4}`} data-anim="t08-anim--fadeUp">
                    <div className="clean-progress-item__header">
                      <span className="clean-progress-item__time">{step.time}</span>
                      <span className="clean-progress-item__title">{step.title}</span>
                    </div>
                    <div className="clean-progress-item__bar">
                      <div className="clean-progress-item__fill" style={{ width: `${widths[i]}%` }} />
                    </div>
                    <p className="clean-progress-item__desc">{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ========== Voices ========== */}
      <FadeIn>
        <section id="voices" className="clean-voices">
          <div className="clean-container">
            <h2 className="clean-section-title t08-anim" data-anim="t08-anim--fadeUp">先輩ドライバーの声</h2>
            <div className="clean-voices__grid">
              {data.voices.map((v, i) => (
                <article key={v.name} className={`clean-voice-card t08-anim t08-anim-delay-${Math.min(i + 1, 3) as 1 | 2 | 3}`} data-anim="t08-anim--clipReveal">
                  <div className="clean-voice-card__top" />
                  <div className="clean-voice-card__profile">
                    <div className="clean-voice-card__avatar">{v.name[0]}</div>
                    <div>
                      <p className="clean-voice-card__name">{v.name} <span className="clean-voice-card__age">{v.age}</span></p>
                      <p className="clean-voice-card__prev">{v.prev}</p>
                    </div>
                  </div>
                  <p className="clean-voice-card__text">{v.text}</p>
                  <p className="clean-voice-card__highlight">{v.highlight}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ========== Gallery ========== */}
      <FadeIn>
        <section id="gallery" className="clean-gallery-section">
          <div className="clean-container">
            <h2 className="clean-section-title t08-anim" data-anim="t08-anim--fadeUp">{data.gallery.heading}</h2>
            <p className="clean-section-sub t08-anim t08-anim-delay-1" data-anim="t08-anim--fadeUp">{data.gallery.intro}</p>
            <div
              className="clean-carousel"
              onTouchStart={(e) => { galleryTouchStart.current = e.touches[0].clientX; }}
              onTouchEnd={(e) => {
                const diff = galleryTouchStart.current - e.changedTouches[0].clientX;
                if (diff > 50) setGalleryIdx((p) => (p + 1) % data.gallery.images.length);
                if (diff < -50) setGalleryIdx((p) => (p - 1 + data.gallery.images.length) % data.gallery.images.length);
              }}
            >
              <div className="clean-carousel__track" style={{ transform: `translateX(-${galleryIdx * 100}%)` }}>
                {data.gallery.images.map((img, i) => (
                  <figure key={i} className="clean-carousel__slide">
                    <Image src={`/keikamotsu-hp${img.src}`} alt={img.alt} width={800} height={500} className="clean-carousel__img" />
                    <figcaption className="clean-carousel__caption">{img.caption}</figcaption>
                  </figure>
                ))}
              </div>
              <button className="clean-carousel__btn clean-carousel__btn--prev" onClick={() => setGalleryIdx((p) => (p - 1 + data.gallery.images.length) % data.gallery.images.length)} aria-label="前へ">&#8249;</button>
              <button className="clean-carousel__btn clean-carousel__btn--next" onClick={() => setGalleryIdx((p) => (p + 1) % data.gallery.images.length)} aria-label="次へ">&#8250;</button>
              <div className="clean-carousel__dots">
                {data.gallery.images.map((_, i) => (
                  <button key={i} className={`clean-carousel__dot ${i === galleryIdx ? "clean-carousel__dot--active" : ""}`} onClick={() => setGalleryIdx(i)} aria-label={`スライド${i + 1}`} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ========== FAQ ========== */}
      <FadeIn>
        <section id="faq" className="clean-faq-section">
          <div className="clean-container">
            <h2 className="clean-section-title t08-anim" data-anim="t08-anim--fadeUp">よくある質問</h2>
            <div className="clean-faq">
              {data.faq.map((item, i) => (
                <details key={i} className={`clean-faq__item t08-anim t08-anim-delay-${Math.min(i % 4 + 1, 4) as 1 | 2 | 3 | 4}`} data-anim="t08-anim--fadeUp">
                  <summary className="clean-faq__q">{item.q}</summary>
                  <p className="clean-faq__a">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ========== News (Table-style) ========== */}
      <FadeIn>
        <section id="news" className="clean-news">
          <div className="clean-container">
            <h2 className="clean-section-title t08-anim" data-anim="t08-anim--fadeUp">お知らせ</h2>
            <div className="clean-news__table">
              {data.news.map((n, i) => (
                <div key={n.title} className={`clean-news__row ${i % 2 === 0 ? "clean-news__row--alt" : ""} t08-anim t08-anim-delay-${Math.min(i + 1, 4) as 1 | 2 | 3 | 4}`} data-anim="t08-anim--fadeUp">
                  <time className="clean-news__date">{n.date}</time>
                  <span className={`clean-news__tag clean-news__tag--${n.tagStyle}`}>{n.tag}</span>
                  <span className="clean-news__title">{n.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ========== Company ========== */}
      <FadeIn>
        <section id="company" className="clean-company">
          <div className="clean-container">
            <h2 className="clean-section-title t08-anim" data-anim="t08-anim--fadeUp">会社概要</h2>
            <table className="clean-company__table t08-anim t08-anim-delay-1" data-anim="t08-anim--fadeUp">
              <tbody>
                {data.companyInfo.map((row) => (
                  <tr key={row.dt}>
                    <th className="clean-company__th">{row.dt}</th>
                    <td className="clean-company__td">{row.dd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </FadeIn>

      {/* ========== Access ========== */}
      <FadeIn>
        <section id="access" className="clean-access-section">
          <div className="clean-container">
            <h2 className="clean-section-title t08-anim" data-anim="t08-anim--fadeUp">{data.access.heading}</h2>
            <div className="clean-access">
              <p className="clean-access__addr">〒{data.company.postalCode} {data.company.address}</p>
              <p className="clean-access__station">{data.access.nearestStation}</p>
              <p className="clean-access__note">{data.access.mapNote}</p>
              <div className="clean-access__map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.1!2d135.505!3d34.685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z5aSn6Ziq5bqc5aSn6Ziq5biC5Lit5aSu5Yy65pys55S6!5e0!3m2!1sja!2sjp!4v1"
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: "12px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="アクセスマップ"
                />
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ========== Application Form ========== */}
      <FadeIn>
        <section id="apply-form" className="clean-form-section">
          <div className="clean-container">
            <h2 className="clean-section-title t08-anim" data-anim="t08-anim--fadeUp">応募フォーム</h2>
            <p className="clean-section-sub t08-anim t08-anim-delay-1" data-anim="t08-anim--fadeUp">まずはお気軽にご応募ください。</p>
            <form className="clean-form t08-anim t08-anim-delay-2" data-anim="t08-anim--fadeUp" onSubmit={(e) => e.preventDefault()}>
              <div className="clean-form__group">
                <label className="clean-form__label" htmlFor="clean-name">お名前 <span style={{ color: "#dc2626" }}>*</span></label>
                <input id="clean-name" type="text" className="clean-form__input" required placeholder="山田 太郎" />
              </div>
              <div className="clean-form__group">
                <label className="clean-form__label" htmlFor="clean-phone">電話番号 <span style={{ color: "#dc2626" }}>*</span></label>
                <input id="clean-phone" type="tel" className="clean-form__input" required placeholder="090-1234-5678" />
              </div>
              <div className="clean-form__group">
                <label className="clean-form__label" htmlFor="clean-email">メールアドレス</label>
                <input id="clean-email" type="email" className="clean-form__input" placeholder="example@email.com" />
              </div>
              <div className="clean-form__group">
                <label className="clean-form__label" htmlFor="clean-message">メッセージ</label>
                <textarea id="clean-message" className="clean-form__textarea" rows={5} placeholder="ご質問やご要望があればご記入ください" />
              </div>
              <button type="submit" className="clean-form__submit">送信する</button>
            </form>
          </div>
        </section>
      </FadeIn>

      {/* ========== CTA ========== */}
      <FadeIn>
        <section id="apply" className="clean-cta">
          <div className="clean-container">
            <div className="clean-cta__inner">
              <h2 className="clean-cta__heading t08-anim" data-anim="t08-anim--fadeUp">{data.cta.heading}</h2>
              <p className="clean-cta__sub t08-anim t08-anim-delay-1" data-anim="t08-anim--fadeIn">{data.cta.subtext}</p>
              <div className="clean-cta__actions">
                <a href={`tel:${data.cta.phone}`} className="clean-cta__phone">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                  </svg>
                  {data.cta.phone}
                </a>
                <a href="/apply" className="clean-cta__web">{data.cta.webLabel}</a>
              </div>
              <p className="clean-cta__hours">受付時間: {data.company.hours}</p>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ========== Footer ========== */}
      <footer className="clean-footer">
        <div className="clean-footer__inner">
          <div className="clean-footer__col">
            <p className="clean-footer__company">{data.company.name}</p>
            <p className="clean-footer__address">〒{data.company.postalCode}<br />{data.company.address}</p>
          </div>
          <div className="clean-footer__col">
            <p className="clean-footer__label">お電話でのお問い合わせ</p>
            <a href={`tel:${data.company.phone}`} className="clean-footer__phone">{data.company.phone}</a>
            <p className="clean-footer__hours">{data.company.hours}</p>
          </div>
          <div className="clean-footer__col">
            <p className="clean-footer__catch">{data.footer.catchphrase}</p>
          </div>
        </div>
        <div className="clean-footer__bottom">
          <p>&copy; {new Date().getFullYear()} {data.company.nameEn}</p>
        </div>
      </footer>
    </div>
  );
}
