"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import * as data from "@/data/corporateSiteData";
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
          setTimeout(() => el.classList.add("lay04-revealed"), delay + 100);
          obs.unobserve(el);
        }
      },
      { threshold: 0.05 }
    );
    const t = setTimeout(() => obs.observe(el), 100);
    return () => { clearTimeout(t); obs.disconnect(); };
  }, [delay]);
  return ref;
}

/* ── typing headline ── */
function useTyping(text: string, speed = 120, startDelay = 500) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, speed);
    }, startDelay);
    return () => clearTimeout(t);
  }, [text, speed, startDelay]);
  return { displayed, done };
}

function TypingHeadline() {
  const fullText = "物流で未来を変えていく。";
  const { displayed, done } = useTyping(fullText, 120, 500);
  const half = Math.ceil(fullText.length / 2);
  const line1 = displayed.slice(0, half);
  const line2 = displayed.slice(half);
  return (
    <h1 className="lay04-hero-split__headline">
      {line1}
      {displayed.length >= half && <br />}
      {line2}
      {!done && <span className="lay04-typing-cursor">|</span>}
    </h1>
  );
}

/* ── zigzag item with individual reveal ── */
function ZigzagItem({ children, index }: { children: React.ReactNode; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add("lay04-zigzag--visible"), 150);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    const t = setTimeout(() => obs.observe(el), 100 + index * 80);
    return () => { clearTimeout(t); obs.disconnect(); };
  }, [index]);
  return (
    <div ref={ref} className="lay04-zigzag-item-wrap">
      {children}
    </div>
  );
}

/* ── stagger card reveal ── */
function StaggerCard({ children, index }: { children: React.ReactNode; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add("lay04-stagger--visible"), index * 150);
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    const t = setTimeout(() => obs.observe(el), 100);
    return () => { clearTimeout(t); obs.disconnect(); };
  }, [index]);
  return (
    <div ref={ref} className="lay04-stagger-card">
      {children}
    </div>
  );
}

/* ── animated counter ── */
function AnimatedCounter({
  end,
  suffix = "",
}: {
  end: number;
  suffix?: string;
}) {
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
            start += Math.ceil(end / 40);
            if (start >= end) {
              setVal(end);
              return;
            }
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
  return (
    <span ref={ref} className="lay04-counter-value">
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Layout04() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [expandedYear, setExpandedYear] = useState<string | null>(null);

  /* scroll handler */
  useEffect(() => {
    const h = () => {
      setScrolled(window.scrollY > 60);
      setShowStickyBar(window.scrollY > 600);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  /* close menu */
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  /* ESC key */
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  /* lock body when menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* reveals */
  const rHero = useReveal(0);
  const rNumbers = useReveal(0);
  const rServices = useReveal(0);
  const rStrengths = useReveal(0);
  const rPartners = useReveal(0);
  const rMessage = useReveal(0);
  const rCompany = useReveal(0);
  const rNews = useReveal(0);
  const rRecruit = useReveal(0);
  const rAccess = useReveal(0);
  const rContact = useReveal(0);

  /* parse number */
  const parseNum = (v: string): number => parseFloat(v.replace(/,/g, ""));

  /* nav links - LP型: limited navigation */
  const lpNavLinks = [
    { href: "#services", label: "事業内容", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="6" width="22" height="15" rx="2" /><path d="M1 10h22" /><path d="M8 6V3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3" /></svg> },
    { href: "#company", label: "会社概要", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18" /><path d="M5 21V7l8-4v18" /><path d="M19 21V11l-6-4" /><path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01" /></svg> },
    { href: "#recruit", label: "採用情報", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M19 8v6M22 11h-6" /></svg> },
    { href: "#contact", label: "お問い合わせ", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="m22 6-10 7L2 6" /></svg> },
  ];

  /* service images */
  const serviceImages = [
    "/keikamotsu-templates/images/service-ec.webp",
    "/keikamotsu-templates/images/service-b2b.webp",
    "/keikamotsu-templates/images/service-spot.webp",
    "/keikamotsu-templates/images/service-route.webp",
  ];

  /* strength images */
  const strengthImages = [
    "/keikamotsu-templates/images/strength-01.webp",
    "/keikamotsu-templates/images/strength-02.webp",
    "/keikamotsu-templates/images/strength-03.webp",
  ];

  return (
    <div className="theme-lay04">
      {/* ─── FLOATING HEADER ─── */}
      <header className={`lay04-float-header ${scrolled ? "lay04-float-header--scrolled" : ""}`}>
        <div className="lay04-float-header__inner">
          <a href="#" className="lay04-logo">
            <span className="lay04-logo__mark">GL</span>
            <span className="lay04-logo__text">{data.company.nameEn}</span>
          </a>

          <button
            className={`lay04-hamburger ${menuOpen ? "lay04-hamburger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニュー"
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={`lay04-nav ${menuOpen ? "lay04-nav--open" : ""}`}>
            {lpNavLinks.map((l) => (
              <a key={l.href} href={l.href} className="lay04-nav__link" onClick={closeMenu}>
                <span className="lay04-nav__icon">{l.icon}</span>
                {l.label}
              </a>
            ))}
            <a href="#contact" className="lay04-cta-btn lay04-nav__cta" onClick={closeMenu}>
              お問い合わせ →
            </a>
          </nav>
        </div>
      </header>

      {/* mobile overlay */}
      {menuOpen && <div className="lay04-overlay" onClick={closeMenu} aria-hidden="true" />}

      {/* ─── 1. HERO (Split) ─── */}
      <section className="lay04-hero-split">
        <div ref={rHero} className="lay04-reveal lay04-hero-split__inner">
          <div className="lay04-hero-split__left">
            <TypingHeadline />
            <div className="lay04-hero-split__subtext">
              {data.hero.subtext.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            <a href="#contact" className="lay04-cta-btn lay04-cta-btn--large">
              {data.hero.cta} →
            </a>
          </div>
          <div className="lay04-hero-split__right">
            <Image
              src="/keikamotsu-templates/images/hero-bg.webp"
              alt="配送サービス"
              width={720}
              height={600}
              className="lay04-hero-split__img"
              priority
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      {/* ─── 2. NUMBERS (Trust Bar) ─── */}
      <section className="lay04-trust-bar">
        <div ref={rNumbers} className="lay04-reveal lay04-trust-bar__inner">
          {data.numbers.map((n, i) => (
            <div key={i} className="lay04-trust-bar__item">
              <div className="lay04-trust-bar__value">
                <AnimatedCounter end={parseNum(n.value)} suffix={n.suffix} />
              </div>
              <div className="lay04-trust-bar__label">{n.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 3. SERVICES (Zigzag) ─── */}
      <section id="services" className="lay04-section lay04-section--services">
        <div ref={rServices} className="lay04-reveal lay04-container">
          <div className="lay04-section-header">
            <span className="lay04-section-label">Services</span>
            <h2 className="lay04-section-title">事業内容</h2>
          </div>
          <div className="lay04-zigzag-list">
            {data.services.map((s, i) => (
              <ZigzagItem key={i} index={i}>
                <div className={`lay04-zigzag ${i % 2 !== 0 ? "lay04-zigzag--reverse" : ""}`}>
                  <div className="lay04-zigzag__image">
                    <Image
                      src={serviceImages[i]}
                      alt={s.title}
                      width={560}
                      height={380}
                      className="lay04-zigzag__img"
                      loading="lazy"
                    />
                  </div>
                  <div className="lay04-zigzag__content">
                    <span className="lay04-zigzag__num">{s.num}</span>
                    <h3 className="lay04-zigzag__title">{s.title}</h3>
                    <p className="lay04-zigzag__text">{s.text}</p>
                  </div>
                </div>
              </ZigzagItem>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. CTA INTERRUPTION BANNER #1 (gradient) ─── */}
      <div className="lay04-cta-banner">
        <div className="lay04-cta-banner__inner">
          <p className="lay04-cta-banner__text">
            物流のお悩み、<br className="br-sp" />まずはお気軽にご相談ください
          </p>
          <p className="lay04-cta-banner__sub">
            お見積もり無料・最短即日対応
          </p>
          <a href="#contact" className="lay04-cta-btn lay04-cta-btn--white">
            無料相談はこちら →
          </a>
        </div>
      </div>

      {/* ─── 5. STRENGTHS (3-column cards) ─── */}
      <section id="strengths" className="lay04-section">
        <div ref={rStrengths} className="lay04-reveal lay04-container">
          <div className="lay04-section-header">
            <span className="lay04-section-label">Strengths</span>
            <h2 className="lay04-section-title">私たちの強み</h2>
          </div>
          <div className="lay04-strengths-grid">
            {data.strengths.map((s, i) => (
              <StaggerCard key={i} index={i}>
                <div className="lay04-strength-card">
                  <Image src={strengthImages[i]} alt={s.title} width={400} height={200} className="lay04-strength-img" loading="lazy" />
                  <div className="lay04-strength-card__num">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="lay04-strength-card__title">{s.title}</h3>
                  <p className="lay04-strength-card__text">{s.text}</p>
                </div>
              </StaggerCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. PARTNERS (Marquee) ─── */}
      <section id="partners" className="lay04-section lay04-section--gray">
        <div ref={rPartners} className="lay04-reveal lay04-container">
          <div className="lay04-section-header">
            <span className="lay04-section-label">Partners</span>
            <h2 className="lay04-section-title">主要取引先</h2>
          </div>
          <div className="lay04-marquee" aria-label="取引先一覧">
            <div className="lay04-marquee__track">
              {/* Duplicate for seamless loop */}
              {[...data.partners, ...data.partners].map((p, i) => (
                <React.Fragment key={i}>
                  <div className="lay04-marquee__item">
                    <img src={p.logo} alt={p.name} className="lay04-marquee__logo" />
                    <span className="lay04-marquee__name">{p.name}</span>
                    <span className="lay04-marquee__industry">{p.industry}</span>
                  </div>
                  {i < [...data.partners, ...data.partners].length - 1 && (
                    <span className="lay04-marquee__separator" aria-hidden="true">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. CEO MESSAGE (Split) ─── */}
      <section id="message" className="lay04-section">
        <div ref={rMessage} className="lay04-reveal lay04-container">
          <div className="lay04-section-header">
            <span className="lay04-section-label">Message</span>
            <h2 className="lay04-section-title">代表メッセージ</h2>
          </div>
          <div className="lay04-message-split">
            <div className="lay04-message-split__portrait">
              <Image
                src="/keikamotsu-templates/images/ceo-portrait.webp"
                alt={`${data.ceoMessage.title} ${data.ceoMessage.name}`}
                width={360}
                height={360}
                className="lay04-message-split__img"
                loading="lazy"
              />
            </div>
            <div className="lay04-message-split__content">
              {data.ceoMessage.message.map((p, i) => (
                <p key={i} className="lay04-message-split__paragraph">{p}</p>
              ))}
              <div className="lay04-message-split__signature">
                <span className="lay04-message-split__title">{data.ceoMessage.title}</span>
                <span className="lay04-message-split__name">{data.ceoMessage.name}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8. CTA INTERRUPTION BANNER #2 (solid dark) ─── */}
      <div className="lay04-cta-banner lay04-cta-banner--alt">
        <div className="lay04-cta-banner__inner">
          <p className="lay04-cta-banner__text">
            配送パートナーとして、<br className="br-sp" />あなたの事業を支えます
          </p>
          <p className="lay04-cta-banner__sub">
            車両リース・レンタカー・ロードサービスまでワンストップ
          </p>
          <a href="#contact" className="lay04-cta-btn lay04-cta-btn--white">
            お問い合わせはこちら →
          </a>
        </div>
      </div>

      {/* ─── 9. COMPANY + HISTORY (Accordion) ─── */}
      <section id="company" className="lay04-section">
        <div ref={rCompany} className="lay04-reveal lay04-container">
          <div className="lay04-section-header">
            <span className="lay04-section-label">Company</span>
            <h2 className="lay04-section-title">会社概要</h2>
          </div>

          <div className="lay04-company-grid">
            <div className="lay04-company-grid__info">
              <dl className="lay04-overview-table">
                {data.companyOverview.map((item, i) => (
                  <div key={i} className="lay04-overview-row">
                    <dt className="lay04-overview-dt">{item.dt}</dt>
                    <dd className="lay04-overview-dd">{item.dd}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="lay04-company-grid__photo">
              <Image
                src="/keikamotsu-templates/images/company.webp"
                alt="会社外観"
                width={500}
                height={350}
                className="lay04-company-img"
                loading="lazy"
              />
            </div>
          </div>

          {/* History Accordion */}
          <div className="lay04-history-section">
            <h3 className="lay04-history-heading">沿革</h3>
            <div className="lay04-accordion">
              {data.history.map((h, i) => (
                <div
                  key={i}
                  className={`lay04-accordion__item ${expandedYear === h.year ? "lay04-accordion__item--open" : ""}`}
                >
                  <button
                    className="lay04-accordion__trigger"
                    onClick={() => setExpandedYear(expandedYear === h.year ? null : h.year)}
                    aria-expanded={expandedYear === h.year}
                  >
                    <span className="lay04-accordion__year">{h.year}年</span>
                    <span className="lay04-accordion__icon" aria-hidden="true">
                      {expandedYear === h.year ? "−" : "＋"}
                    </span>
                  </button>
                  <div className="lay04-accordion__panel">
                    <p className="lay04-accordion__event">{h.event}</p>
                    <Image src={"/keikamotsu-templates/images/history-" + h.year + ".webp"} alt={h.year + "年"} width={300} height={170} className="lay04-history-img" loading="lazy" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 10. NEWS (3 latest, card style) ─── */}
      <section id="news" className="lay04-section lay04-section--gray">
        <div ref={rNews} className="lay04-reveal lay04-container">
          <div className="lay04-section-header">
            <span className="lay04-section-label">News</span>
            <h2 className="lay04-section-title">お知らせ</h2>
          </div>
          <div className="lay04-news-grid">
            {data.news.slice(0, 3).map((n, i) => (
              <article key={i} className="lay04-news-card">
                <time className="lay04-news-card__date">{n.date}</time>
                <span className={`lay04-news-card__tag lay04-news-card__tag--${n.tagStyle}`}>
                  {n.tag}
                </span>
                <h3 className="lay04-news-card__title">{n.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 11. RECRUIT (Full-width banner) ─── */}
      <section id="recruit" className="lay04-recruit-banner">
        <div className="lay04-recruit-banner__overlay" />
        <div ref={rRecruit} className="lay04-reveal lay04-recruit-banner__content">
          <h2 className="lay04-recruit-banner__heading">{data.recruit.heading}</h2>
          <p className="lay04-recruit-banner__text">{data.recruit.text}</p>
          <a href={data.recruit.link} className="lay04-cta-btn lay04-cta-btn--large">
            {data.recruit.cta} →
          </a>
        </div>
      </section>

      {/* ─── 12. ACCESS (Compact, inline) ─── */}
      <section id="access" className="lay04-section">
        <div ref={rAccess} className="lay04-reveal lay04-container">
          <div className="lay04-section-header">
            <span className="lay04-section-label">Access</span>
            <h2 className="lay04-section-title">{data.access.heading}</h2>
          </div>
          <div className="lay04-access-inline">
            <div className="lay04-access-inline__info">
              <p>
                <strong>所在地：</strong>{data.access.address}
              </p>
              <p>
                <strong>最寄り駅：</strong>{data.access.nearestStation}
              </p>
              <p>
                <strong>お車の場合：</strong>{data.access.mapNote}
              </p>
            </div>
            <div className="lay04-access-inline__map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.1!2d135.505!3d34.685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z5aSn6Ziq5bqc5aSn6Ziq5biC5Lit5aSu5Yy65pys55S6!5e0!3m2!1sja!2sjp!4v1"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 13. CONTACT FORM ─── */}
      <section id="contact" className="lay04-section lay04-section--contact">
        <div ref={rContact} className="lay04-reveal lay04-container">
          <div className="lay04-section-header lay04-section-header--light">
            <span className="lay04-section-label">Contact</span>
            <h2 className="lay04-section-title">{data.contact.heading}</h2>
          </div>
          <p className="lay04-contact-intro">{data.contact.intro}</p>
          <form
            className="lay04-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert("送信ありがとうございます。");
            }}
          >
            {data.contact.fields.map((f, i) => (
              <div key={i} className="lay04-form__group">
                <label className="lay04-form__label">
                  {f.label}
                  {f.required && <span className="lay04-form__required">必須</span>}
                </label>
                {f.type === "textarea" ? (
                  <textarea
                    name={f.name}
                    className="lay04-form__textarea"
                    rows={5}
                    required={f.required}
                  />
                ) : (
                  <input
                    type={f.type}
                    name={f.name}
                    className="lay04-form__input"
                    required={f.required}
                  />
                )}
              </div>
            ))}
            <div className="lay04-form__privacy">
              <label className="lay04-form__checkbox-label">
                <input type="checkbox" required className="lay04-form__checkbox" />
                プライバシーポリシーに同意する
              </label>
            </div>
            <button type="submit" className="lay04-cta-btn lay04-form__submit">
              送信する →
            </button>
          </form>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="lay04-footer">
        <div className="lay04-footer__inner">
          <div className="lay04-footer__top">
            <div className="lay04-footer__brand">
              <span className="lay04-footer__logo-mark">GL</span>
              <span className="lay04-footer__company">{data.company.name}</span>
            </div>
            <p className="lay04-footer__catchphrase">{data.footer.catchphrase}</p>
          </div>
          <div className="lay04-footer__info">
            <p>〒{data.company.postalCode} {data.company.address}</p>
            <p>TEL: {data.company.phone} / FAX: {data.company.fax}</p>
            <p>{data.company.hours}</p>
          </div>
          <div className="lay04-footer__bottom">
            <p>&copy; {new Date().getFullYear()} {data.company.name} All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* ─── MOBILE STICKY BOTTOM CTA ─── */}
      <div className={`lay04-sticky-bottom ${showStickyBar ? "lay04-sticky-bottom--visible" : ""}`}>
        <a href="#contact" className="lay04-sticky-bottom__btn">
          お問い合わせ →
        </a>
      </div>
    </div>
  );
}
