"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
          setTimeout(() => el.classList.add("lay03-revealed"), delay);
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
    <span ref={ref} className="lay03-counter-value">
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Layout03() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);

  /* scroll handler */
  useEffect(() => {
    const h = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  /* close menu on ESC */
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setTocOpen(false);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  /* lock body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  /* staggered reveals */
  const rHero = useReveal(0);
  const rServices = useReveal(0);
  const rMessage = useReveal(0);
  const rHistory = useReveal(0);
  const rNews = useReveal(0);
  const rNumbers = useReveal(0);
  const rCompany = useReveal(0);
  const rPartners = useReveal(0);
  const rRecruit = useReveal(0);
  const rStrengths = useReveal(0);
  const rAccess = useReveal(0);
  const rContact = useReveal(0);

  /* parse number from strings like "800,000" or "99.5" */
  const parseNumericValue = (v: string): number => {
    const cleaned = v.replace(/,/g, "");
    return parseFloat(cleaned);
  };

  const strengthImages = [
    "/keikamotsu-templates/images/strength-01.webp",
    "/keikamotsu-templates/images/strength-02.webp",
    "/keikamotsu-templates/images/strength-03.webp",
  ];

  const serviceImages = [
    "/keikamotsu-templates/images/service-ec.webp",
    "/keikamotsu-templates/images/service-b2b.webp",
    "/keikamotsu-templates/images/service-spot.webp",
    "/keikamotsu-templates/images/service-route.webp",
  ];
  const serviceAlts = ["EC物流配送", "企業間配送", "スポット便", "ルート配送"];

  const mastheadLinks = [
    { href: "#services", label: "事業内容" },
    { href: "#strengths", label: "強み" },
    { href: "#message", label: "代表メッセージ" },
    { href: "#company", label: "会社概要" },
    { href: "#contact", label: "お問い合わせ" },
  ];

  const tocLinks = [
    { href: "#services", label: "事業内容" },
    { href: "#strengths", label: "私たちの強み" },
    { href: "#message", label: "代表メッセージ" },
    { href: "#history", label: "沿革" },
    { href: "#news", label: "お知らせ" },
    { href: "#numbers", label: "実績" },
    { href: "#company", label: "会社概要" },
    { href: "#partners", label: "取引先" },
    { href: "#recruit", label: "採用情報" },
    { href: "#access", label: "アクセス" },
    { href: "#contact", label: "お問い合わせ" },
  ];

  return (
    <div className="theme-lay03">
      {/* ─── MASTHEAD HEADER ─── */}
      <header className={`lay03-masthead ${scrolled ? "lay03-masthead--scrolled" : ""}`}>
        <div className="lay03-masthead__inner">
          <a href="#" className="lay03-masthead__brand">
            <span className="lay03-masthead__company">{data.company.name}</span>
            <span className="lay03-masthead__est">since 2021</span>
          </a>

          <button
            className={`lay03-hamburger ${menuOpen ? "lay03-hamburger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニュー"
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={`lay03-masthead__nav ${menuOpen ? "lay03-masthead__nav--open" : ""}`}>
            {mastheadLinks.map((l) => (
              <a key={l.href} href={l.href} className="lay03-masthead__link" onClick={closeMenu}>
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* mobile overlay */}
      {menuOpen && (
        <div className="lay03-overlay" onClick={closeMenu} aria-hidden="true" />
      )}

      {/* ─── HERO (EDITORIAL BANNER) ─── */}
      <section className="lay03-hero">
        <Image
          src="/keikamotsu-templates/images/hero-bg.webp"
          alt="ヒーロー背景"
          fill
          className="lay03-hero__bg"
          priority
        />
        <div className="lay03-hero__overlay" />
        <div ref={rHero} className="lay03-reveal lay03-hero__content">
          <span className="lay03-hero__issue">Logistics Journal</span>
          <h1 className="lay03-hero__headline">
            物流で未来を<br className="br-pc" />変えていく。
          </h1>
          <div className="lay03-hero__rule" />
          <p className="lay03-hero__subtext">{data.hero.subtext[0]}</p>
          <a href="#contact" className="lay03-btn-primary">
            {data.hero.cta}
          </a>
        </div>
      </section>

      {/* ─── TWO-COLUMN LAYOUT ─── */}
      <div className="lay03-two-col lay03-container">
        {/* ── MAIN COLUMN ── */}
        <main className="lay03-main-col">
          {/* CEO MESSAGE */}
          <section id="message" className="lay03-section">
            <div ref={rMessage} className="lay03-reveal">
              <div className="lay03-section-header">
                <span className="lay03-section-label">Message</span>
                <h2 className="lay03-section-title">代表メッセージ</h2>
                <div className="lay03-section-rule" />
              </div>
              <div className="lay03-message">
                <div className="lay03-message__portrait">
                  <div className="lay03-ceo-wrapper">
                    <Image
                      src="/keikamotsu-templates/images/ceo-portrait.webp"
                      alt={`${data.ceoMessage.title} ${data.ceoMessage.name}`}
                      width={240}
                      height={300}
                      className="lay03-ceo-img"
                    />
                  </div>
                </div>
                <div className="lay03-message__body">
                  {/* Pull quote */}
                  <blockquote className="lay03-pullquote">
                    <span className="lay03-pullquote__mark" aria-hidden="true">&ldquo;</span>
                    お客様の荷物を迅速に、<br />安全にお届けすること。<br />それが私たちの使命です。
                    <span className="lay03-pullquote__mark lay03-pullquote__mark--end" aria-hidden="true">&rdquo;</span>
                  </blockquote>
                  {data.ceoMessage.message.map((p, i) => (
                    <p key={i} className="lay03-message__paragraph">{p}</p>
                  ))}
                  <div className="lay03-message__signature">
                    <span className="lay03-message__title">{data.ceoMessage.title}</span>
                    <span className="lay03-message__name">{data.ceoMessage.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SERVICES */}
          <section id="services" className="lay03-section">
            <div ref={rServices} className="lay03-reveal">
              <div className="lay03-section-header">
                <span className="lay03-section-label">Services</span>
                <h2 className="lay03-section-title">事業内容</h2>
                <div className="lay03-section-rule" />
              </div>
              <div className="lay03-services-list">
                {data.services.map((s, i) => (
                  <article key={i} className="lay03-service-item">
                    <div className="lay03-service-item__image">
                      <Image
                        src={serviceImages[i]}
                        alt={serviceAlts[i]}
                        width={400}
                        height={260}
                        className="lay03-service-img"
                        loading="lazy"
                      />
                    </div>
                    <div className="lay03-service-item__content">
                      <span className="lay03-service-item__num">{s.num}</span>
                      <h3 className="lay03-service-item__title">{s.title}</h3>
                      <p className="lay03-service-item__text">{s.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* HISTORY */}
          <section id="history" className="lay03-section">
            <div ref={rHistory} className="lay03-reveal">
              <div className="lay03-section-header">
                <span className="lay03-section-label">History</span>
                <h2 className="lay03-section-title">沿革</h2>
                <div className="lay03-section-rule" />
              </div>
              <div className="lay03-timeline">
                {data.history.map((h, i) => (
                  <div key={i} className="lay03-timeline__item">
                    <div className="lay03-timeline__year">{h.year}</div>
                    <div className="lay03-timeline__line" aria-hidden="true" />
                    <div className="lay03-timeline__event">
                      {h.event}
                      <Image src={"/keikamotsu-templates/images/history-" + h.year + ".webp"} alt={h.year + "年"} width={300} height={170} className="lay03-history-img" loading="lazy" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* NEWS */}
          <section id="news" className="lay03-section">
            <div ref={rNews} className="lay03-reveal">
              <div className="lay03-section-header">
                <span className="lay03-section-label">News</span>
                <h2 className="lay03-section-title">お知らせ</h2>
                <div className="lay03-section-rule" />
              </div>
              <div className="lay03-news-list">
                {data.news.map((n, i) => (
                  <article key={i} className="lay03-news-item">
                    <div className="lay03-news-item__meta">
                      <time className="lay03-news-item__date">{n.date}</time>
                      <span className={`lay03-news-tag lay03-news-tag--${n.tagStyle}`}>
                        {n.tag}
                      </span>
                    </div>
                    <h3 className="lay03-news-item__title">{n.title}</h3>
                    <p className="lay03-news-item__excerpt">
                      詳しくはこちらをご覧ください。最新の情報をお届けしています。
                    </p>
                    <span className="lay03-news-item__readmore">Read more →</span>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* ── SIDEBAR COLUMN ── */}
        <aside className="lay03-sidebar-col">
          {/* NUMBERS (sticky) */}
          <div className="lay03-sidebar-sticky" id="numbers">
            <div ref={rNumbers} className="lay03-reveal">
              <div className="lay03-sidebar-section">
                <h3 className="lay03-sidebar-heading">Numbers</h3>
                <div className="lay03-sidebar-rule" />
                <div className="lay03-numbers-grid">
                  {data.numbers.map((n, i) => (
                    <div key={i} className="lay03-number-card">
                      <div className="lay03-number-card__value">
                        <AnimatedCounter
                          end={parseNumericValue(n.value)}
                          suffix={n.suffix}
                        />
                      </div>
                      <div className="lay03-number-card__label">{n.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* COMPANY OVERVIEW */}
          <div className="lay03-sidebar-section" id="company">
            <div ref={rCompany} className="lay03-reveal">
              <h3 className="lay03-sidebar-heading">Company</h3>
              <div className="lay03-sidebar-rule" />
              <Image
                src="/keikamotsu-templates/images/company.webp"
                alt="会社外観"
                width={400}
                height={260}
                className="lay03-sidebar-img"
                loading="lazy"
              />
              <dl className="lay03-overview-table">
                {data.companyOverview.map((item, i) => (
                  <div key={i} className="lay03-overview-row">
                    <dt className="lay03-overview-dt">{item.dt}</dt>
                    <dd className="lay03-overview-dd">{item.dd}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* PARTNERS */}
          <div className="lay03-sidebar-section" id="partners">
            <div ref={rPartners} className="lay03-reveal">
              <h3 className="lay03-sidebar-heading">Partners</h3>
              <div className="lay03-sidebar-rule" />
              <div className="lay03-partners-list">
                {data.partners.map((p, i) => (
                  <div key={i} className="lay03-partner-item">
                    <img src={p.logo} alt={p.name} className="lay03-partner-item__logo" />
                    <div>
                      <div className="lay03-partner-item__name">{p.name}</div>
                      <span className="lay03-partner-item__industry">{p.industry}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RECRUIT CTA CARD */}
          <div className="lay03-sidebar-section" id="recruit">
            <div ref={rRecruit} className="lay03-reveal">
              <div className="lay03-recruit-card">
                <Image
                  src="/keikamotsu-templates/images/delivery.webp"
                  alt="配送業務"
                  width={400}
                  height={200}
                  className="lay03-recruit-card__img"
                  loading="lazy"
                />
                <div className="lay03-recruit-card__body">
                  <h3 className="lay03-recruit-card__heading">{data.recruit.heading}</h3>
                  <p className="lay03-recruit-card__text">{data.recruit.text}</p>
                  <a href={data.recruit.link} className="lay03-recruit-card__cta">
                    {data.recruit.cta}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* ─── FULL-WIDTH INTERLUDE: STRENGTHS ─── */}
      <section id="strengths" className="lay03-interlude">
        <Image
          src="/keikamotsu-templates/images/reasons.webp"
          alt="私たちの強み"
          fill
          className="lay03-interlude__bg"
          loading="lazy"
        />
        <div className="lay03-interlude__overlay" />
        <div ref={rStrengths} className="lay03-reveal lay03-interlude__content">
          <div className="lay03-interlude__header">
            <span className="lay03-interlude__label">Our Strengths</span>
            <h2 className="lay03-interlude__title">私たちの強み</h2>
          </div>
          <div className="lay03-strengths-grid">
            {data.strengths.map((s, i) => (
              <div key={i} className="lay03-strength-card">
                {strengthImages[i] && (
                  <Image src={strengthImages[i]} alt={s.title} width={400} height={200} className="lay03-strength-img" loading="lazy" />
                )}
                <span className="lay03-strength-card__num">{s.num}</span>
                <h3 className="lay03-strength-card__title">{s.title}</h3>
                <p className="lay03-strength-card__text">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FULL-WIDTH: ACCESS ─── */}
      <section id="access" className="lay03-section lay03-section--full">
        <div ref={rAccess} className="lay03-reveal lay03-container">
          <div className="lay03-section-header">
            <span className="lay03-section-label">Access</span>
            <h2 className="lay03-section-title">{data.access.heading}</h2>
            <div className="lay03-section-rule" />
          </div>
          <div className="lay03-access">
            <div className="lay03-access__info">
              <p className="lay03-access__row">
                <span className="lay03-access__label">所在地</span>
                {data.access.address}
              </p>
              <p className="lay03-access__row">
                <span className="lay03-access__label">最寄り駅</span>
                {data.access.nearestStation}
              </p>
              <p className="lay03-access__row">
                <span className="lay03-access__label">お車の場合</span>
                {data.access.mapNote}
              </p>
            </div>
            <div className="lay03-access__map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.1!2d135.505!3d34.685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z5aSn6Ziq5bqc5aSn6Ziq5biC5Lit5aSu5Yy65pys55S6!5e0!3m2!1sja!2sjp!4v1"
                width="100%"
                height="350"
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

      {/* ─── FULL-WIDTH: CONTACT ─── */}
      <section id="contact" className="lay03-section lay03-section--contact">
        <div ref={rContact} className="lay03-reveal lay03-container">
          <div className="lay03-section-header">
            <span className="lay03-section-label">Contact</span>
            <h2 className="lay03-section-title">{data.contact.heading}</h2>
            <div className="lay03-section-rule" />
          </div>
          <p className="lay03-contact-intro">{data.contact.intro}</p>
          <form
            className="lay03-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert("送信ありがとうございます。");
            }}
          >
            {data.contact.fields.map((f, i) => (
              <div key={i} className="lay03-form__group">
                <label className="lay03-form__label">
                  {f.label}
                  {f.required && (
                    <span className="lay03-form__required">必須</span>
                  )}
                </label>
                {f.type === "textarea" ? (
                  <textarea
                    name={f.name}
                    className="lay03-form__textarea"
                    rows={5}
                    required={f.required}
                  />
                ) : (
                  <input
                    type={f.type}
                    name={f.name}
                    className="lay03-form__input"
                    required={f.required}
                  />
                )}
              </div>
            ))}
            <div className="lay03-form__privacy">
              <label className="lay03-form__checkbox-label">
                <input type="checkbox" required className="lay03-form__checkbox" />
                プライバシーポリシーに同意する
              </label>
            </div>
            <button type="submit" className="lay03-form__submit">
              送信する
            </button>
          </form>
        </div>
      </section>

      {/* ─── FLOATING TOC BUTTON ─── */}
      <div className="lay03-toc-wrapper">
        <button
          className={`lay03-toc-btn ${tocOpen ? "lay03-toc-btn--open" : ""}`}
          onClick={() => setTocOpen(!tocOpen)}
          aria-label="目次"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 5h14M3 10h14M3 15h14" />
          </svg>
        </button>
        {tocOpen && (
          <nav className="lay03-toc-dropdown">
            <span className="lay03-toc-dropdown__title">Contents</span>
            {tocLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="lay03-toc-dropdown__link"
                onClick={() => setTocOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </nav>
        )}
      </div>

      {/* ─── FOOTER ─── */}
      <footer className="lay03-footer">
        <div className="lay03-footer__inner">
          <div className="lay03-footer__top">
            <div className="lay03-footer__brand">
              <span className="lay03-footer__company">{data.company.name}</span>
              <span className="lay03-footer__company-en">{data.company.nameEn}</span>
            </div>
            <p className="lay03-footer__catchphrase">{data.footer.catchphrase}</p>
          </div>
          <div className="lay03-footer__middle">
            <div className="lay03-footer__info">
              <p>〒{data.company.postalCode} {data.company.address}</p>
              <p>TEL: {data.company.phone}</p>
              <p>{data.company.hours}</p>
              <p>
                <a href={`mailto:${data.company.email}`} className="lay03-footer__email">
                  {data.company.email}
                </a>
              </p>
            </div>
            <nav className="lay03-footer__nav">
              {data.navLinks.map((l) => (
                <a key={l.href} href={l.href} className="lay03-footer__link">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="lay03-footer__bottom">
            <p className="lay03-footer__copy">
              &copy; {new Date().getFullYear()} {data.company.name} All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
