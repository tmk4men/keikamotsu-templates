"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import * as data from "@/data/siteData";
import "./styles.css";

/* ── scroll-reveal hook ── */
function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add("t01-revealed"), delay);
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

/* ── animated counter ── */
function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          let start = 0;
          const step = () => {
            start += Math.ceil(end / 30);
            if (start >= end) { setVal(end); return; }
            setVal(start);
            requestAnimationFrame(step);
          };
          step();
          obs.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref} className="t01-counter">{val}{suffix}</span>;
}

/* ── scroll-triggered animation hook ── */
function useScrollAnim(animClass: string) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add(animClass); obs.unobserve(el); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [animClass]);
  return ref;
}

/* ── text highlight on scroll ── */
function useHighlight() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = el.querySelectorAll(".t01-highlight");
    if (!spans.length) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          spans.forEach((s, i) =>
            setTimeout(() => s.classList.add("t01-highlight--visible"), i * 200)
          );
          obs.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ── floating particles ── */
function Particles({ count = 24 }: { count?: number }) {
  return (
    <div className="t01-particles" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="t01-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${3 + Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Template01() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const carouselRef = useRef<HTMLDivElement>(null);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const galleryTouchStart = useRef(0);

  const sectionIds = ["reasons", "jobs", "benefits", "daily", "gallery", "voices", "faq", "news", "access", "company", "apply"];
  const sectionLabels: Record<string, string> = {
    reasons: "理由", jobs: "求人", benefits: "待遇", daily: "1日の流れ",
    gallery: "写真", voices: "先輩の声", faq: "FAQ", news: "お知らせ",
    access: "アクセス", company: "会社概要", apply: "応募",
  };

  useEffect(() => {
    const h = () => {
      setScrolled(window.scrollY > 60);
      setShowBackTop(window.scrollY > 400);

      // Determine active section
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setGalleryIdx((prev) => (prev + 1) % data.gallery.images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  /* staggered reveals */
  const r1 = useReveal(0);
  const r2 = useReveal(100);
  const r3 = useReveal(0);
  const r4 = useReveal(100);
  const r5 = useReveal(0);
  const r6 = useReveal(100);
  const r7 = useReveal(0);
  const r8 = useReveal(0);
  const r9 = useReveal(0);
  const r10 = useReveal(0);
  const r11 = useReveal(0);
  const r12 = useReveal(0);

  /* scroll-triggered animations */
  const aReasonsTitle = useScrollAnim("t01-anim--slideUp");
  const aReason0 = useScrollAnim("t01-anim--slideLeft");
  const aReason1 = useScrollAnim("t01-anim--slideLeft");
  const aReason2 = useScrollAnim("t01-anim--slideLeft");
  const aJobsTitle = useScrollAnim("t01-anim--slideUp");
  const aJobRow = useScrollAnim("t01-anim--slideLeft");
  const aBenefitsTitle = useScrollAnim("t01-anim--slideUp");
  const aBenefit0 = useScrollAnim("t01-anim--slideRight");
  const aBenefit1 = useScrollAnim("t01-anim--slideRight");
  const aBenefit2 = useScrollAnim("t01-anim--slideRight");
  const aBenefit3 = useScrollAnim("t01-anim--slideRight");
  const aBenefit4 = useScrollAnim("t01-anim--slideRight");
  const aBenefit5 = useScrollAnim("t01-anim--slideRight");
  const aDailyTitle = useScrollAnim("t01-anim--slideUp");
  const aVoicesTitle = useScrollAnim("t01-anim--slideUp");
  const aVoice0 = useScrollAnim("t01-anim--scaleIn");
  const aVoice1 = useScrollAnim("t01-anim--scaleIn");
  const aVoice2 = useScrollAnim("t01-anim--scaleIn");
  const aGalleryTitle = useScrollAnim("t01-anim--slideUp");
  const aFaqTitle = useScrollAnim("t01-anim--slideUp");
  const aNewsTitle = useScrollAnim("t01-anim--slideUp");
  const aAccessTitle = useScrollAnim("t01-anim--slideUp");
  const aCompanyTitle = useScrollAnim("t01-anim--slideUp");
  const aApplyTitle = useScrollAnim("t01-anim--slideUp");
  const aCtaSection = useScrollAnim("t01-anim--slideUp");

  /* text highlights */
  const hlHero = useHighlight();
  const hlReasons = useHighlight();
  const hlJobs = useHighlight();
  const hlCta = useHighlight();

  return (
    <div className="theme-01">
      {/* ─── STICKY HEADER ─── */}
      <header className={`t01-header ${scrolled ? "t01-header--scrolled" : ""}`}>
        <div className="t01-header__inner">
          <a href="#" className="t01-logo">
            <span className="t01-logo__mark">GL</span>
            <span className="t01-logo__text">{data.company.nameEn}</span>
          </a>
          <button
            className={`t01-hamburger ${menuOpen ? "t01-hamburger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニュー"
          >
            <span /><span /><span />
          </button>
          <nav className={`t01-nav ${menuOpen ? "t01-nav--open" : ""}`}>
            {data.navLinks.map((l) => (
              <a key={l.href} href={l.href} className="t01-nav__link" onClick={closeMenu}>
                {l.label}
              </a>
            ))}
            <a href={`tel:${data.company.phone}`} className="t01-nav__cta">{data.hero.cta}</a>
          </nav>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="t01-hero">
        <div className="t01-hero__bg" />
        <Particles count={30} />
        <div className="t01-hero__content">
          <h1 className="t01-hero__heading">
            {data.hero.headlineParts.map((part, i) => (
              <span key={i} className="t01-hero__heading-line t01-gradient-text" style={{ animationDelay: `${i * 0.3}s` }}>
                {part}
              </span>
            ))}
          </h1>
          <div className="t01-hero__sub" ref={hlHero as React.RefObject<HTMLDivElement>}>
            <p style={{ animationDelay: "0.6s" }}>{data.hero.subtext[0]}</p>
            <p style={{ animationDelay: "0.75s" }}>そんな不安、<span className="t01-highlight">全部うちが引き受けます。</span></p>
            <p style={{ animationDelay: "0.9s" }}><span className="t01-highlight">普通免許ひとつ</span>で、あなたの新しいキャリアが始まります。</p>
          </div>
          <div className="t01-hero__badges">
            {data.hero.badges.map((b, i) => (
              <span key={b} className="t01-badge" style={{ animationDelay: `${1.0 + i * 0.1}s` }}>{b}</span>
            ))}
          </div>
          <div className="t01-hero__salary" style={{ animationDelay: "1.3s" }}>
            月収<strong><AnimatedCounter end={data.hero.salaryMin} suffix="万" />〜<AnimatedCounter end={data.hero.salaryMax} suffix="万円" /></strong>
          </div>
          <a href={`tel:${data.company.phone}`} className="t01-btn-primary" style={{ animationDelay: "1.5s" }}>
            {data.hero.cta}
          </a>
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="t01-marquee">
        <div className="t01-marquee__track">
          {[...data.marquee.top, ...data.marquee.top, ...data.marquee.top].map((t, i) => (
            <span key={i} className="t01-marquee__item">{t}</span>
          ))}
        </div>
        <div className="t01-marquee__track t01-marquee__track--reverse">
          {[...data.marquee.bottom, ...data.marquee.bottom, ...data.marquee.bottom].map((t, i) => (
            <span key={i} className="t01-marquee__item">{t}</span>
          ))}
        </div>
      </div>

      {/* ─── REASONS: horizontal scroll carousel ─── */}
      <section id="reasons" className="t01-section" ref={hlReasons as React.RefObject<HTMLElement>}>
        <div ref={r1} className="t01-reveal t01-container">
          <div ref={aReasonsTitle} className="t01-anim">
            <h2 className="t01-section-title">
              選ばれる<span className="t01-cyan">3</span>つの理由
            </h2>
          </div>
          <div className="t01-reasons-carousel" ref={carouselRef}>
            {data.reasons.map((r, i) => {
              const refs = [aReason0, aReason1, aReason2];
              const titles = [
                <><span className="t01-highlight">未経験でも安心</span>の研修体制</>,
                <><span className="t01-highlight">初期費用ゼロ</span>、リスクゼロ</>,
                <>がんばった分だけ、<span className="t01-highlight">ちゃんと返る</span></>,
              ];
              return (
                <article key={i} className="t01-reason-card">
                  <div ref={refs[i]} className={`t01-anim t01-anim-delay-${i + 1}`}>
                    <div className="t01-reason-card__border" />
                    <div className="t01-reason-card__inner">
                      <span className="t01-reason-card__num">{r.num}</span>
                      <h3 className="t01-reason-card__title">{titles[i]}</h3>
                      <p className="t01-reason-card__text">{r.text}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── JOB INFO: two-column ─── */}
      <section id="jobs" className="t01-section t01-section--alt" ref={hlJobs as React.RefObject<HTMLElement>}>
        <div ref={r2} className="t01-reveal t01-container">
          <div ref={aJobsTitle} className="t01-anim">
            <h2 className="t01-section-title">求人情報</h2>
            <p className="t01-section-intro">{data.jobs.intro}</p>
          </div>
          <div ref={aJobRow} className="t01-anim t01-anim-delay-1 t01-jobs-grid">
            <div className="t01-jobs-table">
              <dl className="t01-dl">
                {data.jobs.rows.map((row, i) => (
                  <div key={i} className="t01-dl__row">
                    <dt className="t01-dl__dt">{row.dt}</dt>
                    <dd className={`t01-dl__dd ${row.accent ? "t01-cyan" : ""}`}>
                      {row.accent ? <span className="t01-highlight">{row.dd}</span> : row.dd}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="t01-jobs-req">
                <h4>応募資格</h4>
                <ul>
                  {data.jobs.requirements.map((r, i) => (
                    <li key={i}><span className="t01-req-dot" />{r}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="t01-salary-callout">
              <div className="t01-salary-callout__inner">
                <span className="t01-salary-callout__label">月収</span>
                <div className="t01-salary-callout__numbers">
                  <AnimatedCounter end={data.hero.salaryMin} suffix="万" />
                  <span className="t01-salary-callout__sep">〜</span>
                  <AnimatedCounter end={data.hero.salaryMax} suffix="万円" />
                </div>
                <span className="t01-salary-callout__note">経験・能力による</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BENEFITS: 2x3 grid ─── */}
      <section id="benefits" className="t01-section">
        <div ref={r3} className="t01-reveal t01-container">
          <div ref={aBenefitsTitle} className="t01-anim">
            <h2 className="t01-section-title">待遇・福利厚生</h2>
          </div>
          <div className="t01-benefits-grid">
            {data.benefits.map((b, i) => {
              const refs = [aBenefit0, aBenefit1, aBenefit2, aBenefit3, aBenefit4, aBenefit5];
              return (
                <div key={i} ref={refs[i]} className={`t01-anim t01-anim-delay-${Math.min(i + 1, 4)} t01-benefit-card`}>
                  <span className="t01-benefit-card__letter">{b.title.charAt(0)}</span>
                  <h4 className="t01-benefit-card__title">{b.title}</h4>
                  <p className="t01-benefit-card__text">{b.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── DAILY: horizontal timeline ─── */}
      <section id="daily" className="t01-section t01-section--alt">
        <div ref={r4} className="t01-reveal t01-container">
          <div ref={aDailyTitle} className="t01-anim">
            <h2 className="t01-section-title">1日の流れ</h2>
          </div>
          <p className="t01-section-intro">{data.daily.intro}</p>
          <div className="t01-timeline-h">
            <div className="t01-timeline-h__line" />
            {data.daily.steps.map((s, i) => (
              <div key={i} className="t01-timeline-h__step">
                <div className="t01-timeline-h__dot" />
                <span className="t01-timeline-h__time">{s.time}</span>
                <h4 className="t01-timeline-h__title">{s.title}</h4>
                <p className="t01-timeline-h__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VOICES: staggered cards ─── */}
      <section id="voices" className="t01-section">
        <div ref={r5} className="t01-reveal t01-container">
          <div ref={aVoicesTitle} className="t01-anim">
            <h2 className="t01-section-title">先輩ドライバーの声</h2>
          </div>
          <div className="t01-voices">
            {data.voices.map((v, i) => {
              const refs = [aVoice0, aVoice1, aVoice2];
              return (
                <article
                  key={i}
                  className="t01-voice-card"
                  style={{ marginTop: i % 2 === 1 ? "3rem" : "0" }}
                >
                  <div ref={refs[i]} className={`t01-anim t01-anim-delay-${i + 1}`}>
                    <span className="t01-voice-card__quote">&ldquo;</span>
                    <p className="t01-voice-card__body">{v.text}</p>
                    <p className="t01-voice-card__highlight">{v.highlight}</p>
                    <footer className="t01-voice-card__footer">
                      <strong>{v.name}</strong>（{v.age}・{v.prev}）
                    </footer>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section id="gallery" className="t01-section t01-section--alt">
        <div ref={r9} className="t01-reveal t01-container">
          <div ref={aGalleryTitle} className="t01-anim">
            <h2 className="t01-section-title">{data.gallery.heading}</h2>
            <p className="t01-section-intro">{data.gallery.intro}</p>
          </div>
          <div
            className="t01-carousel"
            onTouchStart={(e) => { galleryTouchStart.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              const diff = galleryTouchStart.current - e.changedTouches[0].clientX;
              if (diff > 50) setGalleryIdx((p) => (p + 1) % data.gallery.images.length);
              if (diff < -50) setGalleryIdx((p) => (p - 1 + data.gallery.images.length) % data.gallery.images.length);
            }}
          >
            <div className="t01-carousel__track" style={{ transform: `translateX(-${galleryIdx * 100}%)` }}>
              {data.gallery.images.map((img, i) => (
                <figure key={i} className="t01-carousel__slide">
                  <Image src={`/keikamotsu-templates${img.src}`} alt={img.alt} width={800} height={500} className="t01-carousel__img" />
                  <figcaption className="t01-carousel__caption">{img.caption}</figcaption>
                </figure>
              ))}
            </div>
            <button className="t01-carousel__btn t01-carousel__btn--prev" onClick={() => setGalleryIdx((p) => (p - 1 + data.gallery.images.length) % data.gallery.images.length)} aria-label="前へ">&lsaquo;</button>
            <button className="t01-carousel__btn t01-carousel__btn--next" onClick={() => setGalleryIdx((p) => (p + 1) % data.gallery.images.length)} aria-label="次へ">&rsaquo;</button>
            <div className="t01-carousel__dots">
              {data.gallery.images.map((_, i) => (
                <button key={i} className={`t01-carousel__dot ${i === galleryIdx ? "t01-carousel__dot--active" : ""}`} onClick={() => setGalleryIdx(i)} aria-label={`スライド${i + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="t01-section">
        <div ref={r10} className="t01-reveal t01-container">
          <div ref={aFaqTitle} className="t01-anim">
            <h2 className="t01-section-title">よくある質問</h2>
          </div>
          <div className="t01-faq">
            {data.faq.map((item, i) => (
              <details key={i} className="t01-faq__item">
                <summary className="t01-faq__q">{item.q}</summary>
                <p className="t01-faq__a">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWS ─── */}
      <section id="news" className="t01-section t01-section--alt">
        <div ref={r6} className="t01-reveal t01-container">
          <div ref={aNewsTitle} className="t01-anim">
            <h2 className="t01-section-title">お知らせ</h2>
          </div>
          <ul className="t01-news-list">
            {data.news.map((n, i) => (
              <li key={i} className="t01-news-item">
                <time className="t01-news-date">{n.date}</time>
                <span className={`t01-news-tag t01-news-tag--${n.tagStyle}`}>{n.tag}</span>
                <span className="t01-news-title">{n.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── ACCESS ─── */}
      <section id="access" className="t01-section">
        <div ref={r11} className="t01-reveal t01-container">
          <div ref={aAccessTitle} className="t01-anim">
            <h2 className="t01-section-title">{data.access.heading}</h2>
          </div>
          <div className="t01-access">
            <p className="t01-access__addr">{data.company.address}</p>
            <p className="t01-access__station">{data.access.nearestStation}</p>
            <p className="t01-access__note">{data.access.mapNote}</p>
            <div className="t01-access__map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.1!2d135.505!3d34.685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z5aSn6Ziq5bqc5aSn6Ziq5biC5Lit5aSu5Yy65pys55S6!5e0!3m2!1sja!2sjp!4v1"
                width="100%" height="300" style={{ border: 0 }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── COMPANY ─── */}
      <section id="company" className="t01-section t01-section--alt">
        <div ref={r7} className="t01-reveal t01-container">
          <div ref={aCompanyTitle} className="t01-anim">
            <h2 className="t01-section-title">会社概要</h2>
          </div>
          <dl className="t01-dl t01-dl--company">
            {data.companyInfo.map((c, i) => (
              <div key={i} className="t01-dl__row">
                <dt className="t01-dl__dt">{c.dt}</dt>
                <dd className="t01-dl__dd">{c.dd}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ─── APPLICATION FORM ─── */}
      <section id="apply" className="t01-section">
        <div ref={r12} className="t01-reveal t01-container">
          <div ref={aApplyTitle} className="t01-anim">
            <h2 className="t01-section-title">Web応募フォーム</h2>
            <p className="t01-section-intro">下記フォームからお気軽にご応募ください。</p>
          </div>
          <form className="t01-form" onSubmit={(e) => e.preventDefault()}>
            <div className="t01-form__group">
              <label className="t01-form__label">お名前 *</label>
              <input type="text" className="t01-form__input" required />
            </div>
            <div className="t01-form__group">
              <label className="t01-form__label">電話番号 *</label>
              <input type="tel" className="t01-form__input" required />
            </div>
            <div className="t01-form__group">
              <label className="t01-form__label">メールアドレス</label>
              <input type="email" className="t01-form__input" />
            </div>
            <div className="t01-form__group">
              <label className="t01-form__label">メッセージ</label>
              <textarea className="t01-form__textarea" rows={4} />
            </div>
            <button type="submit" className="t01-form__submit">送信する</button>
          </form>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="t01-cta-section" ref={hlCta as React.RefObject<HTMLElement>}>
        <div ref={r8} className="t01-reveal t01-container">
          <div ref={aCtaSection} className="t01-anim">
            <h2 className="t01-cta-heading"><span className="t01-highlight">「ちょっと話を聞いてみたい」</span>——それだけで大丈夫です。</h2>
            <p className="t01-cta-sub">{data.cta.subtext}</p>
            <div className="t01-cta-phone-wrap">
              <a href={`tel:${data.company.phone}`} className="t01-cta-phone">
                {data.cta.phone}
              </a>
            </div>
            <p className="t01-cta-hours">{data.company.hours}</p>
            <a href="#" className="t01-btn-primary t01-btn-primary--lg">{data.cta.webLabel}</a>
          </div>
        </div>
      </section>

      {/* ─── Section Nav Dots ─── */}
      <nav className="t01-section-nav" aria-label="セクションナビゲーション">
        {sectionIds.map((id) => (
          <button
            key={id}
            className={`t01-section-nav__dot ${activeSection === id ? "t01-section-nav__dot--active" : ""}`}
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
            aria-label={sectionLabels[id]}
          >
            <span className="t01-section-nav__label">{sectionLabels[id]}</span>
          </button>
        ))}
      </nav>

      {/* ─── Back to Top ─── */}
      <button
        className={`t01-back-top ${showBackTop ? "t01-back-top--visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="トップへ戻る"
      >
        ↑
      </button>

      {/* ─── FOOTER ─── */}
      <footer className="t01-footer">
        <div className="t01-footer__bg" />
        <div className="t01-footer__inner">
          <p className="t01-footer__catch">{data.footer.catchphrase}</p>
          <p className="t01-footer__company-name">{data.company.name}</p>
          <p className="t01-footer__addr">{data.company.address}</p>
          <nav className="t01-footer__nav">
            {data.navLinks.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </nav>
          <p className="t01-footer__copy">&copy; {data.company.name}</p>
        </div>
      </footer>
    </div>
  );
}
