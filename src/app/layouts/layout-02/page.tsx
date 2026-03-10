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
          setTimeout(() => el.classList.add("lay02-revealed"), delay);
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
    <span ref={ref} className="lay02-counter-value">
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ── Tab definitions ── */
const TABS = [
  { id: "business", label: "事業案内", icon: "briefcase" },
  { id: "corporate", label: "企業情報", icon: "building" },
  { id: "achievements", label: "実績", icon: "chart" },
  { id: "contact", label: "お問い合わせ", icon: "mail" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const serviceImages = [
  "/keikamotsu-templates/images/service-ec.webp",
  "/keikamotsu-templates/images/service-b2b.webp",
  "/keikamotsu-templates/images/service-spot.webp",
  "/keikamotsu-templates/images/service-route.webp",
];
const serviceAlts = ["EC物流配送", "企業間配送", "スポット便", "ルート配送"];

export default function Layout02() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("business");
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);

  /* scroll handler */
  useEffect(() => {
    const h = () => {
      setScrolled(window.scrollY > 60);
      setShowBackTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  /* close menu on ESC */
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
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

  /* parse number from strings like "500,000" or "99.2" */
  const parseNumericValue = (v: string): number => {
    const cleaned = v.replace(/,/g, "");
    return parseFloat(cleaned);
  };

  /* reveals */
  const rBusiness = useReveal(0);
  const rStrengths = useReveal(100);
  const rMessage = useReveal(0);
  const rCompany = useReveal(100);
  const rHistory = useReveal(200);
  const rNumbers = useReveal(0);
  const rPartners = useReveal(100);
  const rNews = useReveal(200);
  const rRecruit = useReveal(0);
  const rAccess = useReveal(100);
  const rContact = useReveal(200);

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    /* scroll tab bar into view if needed */
    const tabBar = document.getElementById("lay02-tab-bar");
    if (tabBar) {
      const rect = tabBar.getBoundingClientRect();
      if (rect.top < 0 || rect.top > window.innerHeight) {
        tabBar.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div className="theme-lay02">
      {/* ─── HEADER ─── */}
      <header className={`lay02-header ${scrolled ? "lay02-header--scrolled" : ""}`}>
        <div className="lay02-header__inner">
          <a href="#" className="lay02-logo">
            <span className="lay02-logo__mark">GL</span>
            <span className="lay02-logo__text">{data.company.nameEn}</span>
          </a>

          <button
            className={`lay02-hamburger ${menuOpen ? "lay02-hamburger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニュー"
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={`lay02-nav ${menuOpen ? "lay02-nav--open" : ""}`}>
            {TABS.map((t) => (
              <button
                key={t.id}
                className={`lay02-nav__link ${activeTab === t.id ? "lay02-nav__link--active" : ""}`}
                onClick={() => {
                  handleTabChange(t.id);
                  closeMenu();
                }}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* mobile overlay */}
      {menuOpen && (
        <div className="lay02-overlay" onClick={closeMenu} aria-hidden="true" />
      )}

      {/* ─── HERO ─── */}
      <section className="lay02-hero">
        <Image
          src="/keikamotsu-templates/images/hero-bg.webp"
          alt=""
          fill
          className="lay02-hero__bg"
          priority
        />
        <div className="lay02-hero__overlay" />
        <div className="lay02-hero__content">
          <h1 className="lay02-hero__headline">
            物流で未来を<br className="br-pc" />変えていく。
          </h1>
          <p className="lay02-hero__subtext">{data.hero.subtext[0]}</p>
        </div>
      </section>

      {/* ─── STICKY TAB BAR ─── */}
      <div id="lay02-tab-bar" className="lay02-tab-bar">
        <div className="lay02-tab-bar__inner">
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`lay02-tab ${activeTab === t.id ? "lay02-tab--active" : ""}`}
              onClick={() => handleTabChange(t.id)}
              aria-selected={activeTab === t.id}
              role="tab"
            >
              <span className="lay02-tab__icon">
                {t.icon === "briefcase" && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>
                )}
                {t.icon === "building" && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22V12h6v10M9 6h.01M15 6h.01M9 10h.01M15 10h.01"/></svg>
                )}
                {t.icon === "chart" && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
                )}
                {t.icon === "mail" && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 6L2 7"/></svg>
                )}
              </span>
              <span className="lay02-tab__label">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ─── TAB PANELS ─── */}
      <main className="lay02-main">
        {/* === TAB 1: 事業案内 === */}
        <div
          className={`lay02-tab-panel ${activeTab === "business" ? "lay02-tab-panel--active" : ""}`}
          role="tabpanel"
          aria-hidden={activeTab !== "business"}
        >
          {/* Services - Accordion */}
          <section id="services" className="lay02-section">
            <div ref={rBusiness} className="lay02-reveal lay02-container">
              <div className="lay02-section-header">
                <span className="lay02-section-label">Services</span>
                <h2 className="lay02-section-title">事業内容</h2>
                <div className="lay02-section-divider" />
              </div>
              <div className="lay02-accordion-list">
                {data.services.map((s, i) => (
                  <div
                    key={i}
                    className={`lay02-accordion ${openAccordion === i ? "lay02-accordion--open" : ""}`}
                  >
                    <button
                      className="lay02-accordion__trigger"
                      onClick={() => toggleAccordion(i)}
                      aria-expanded={openAccordion === i}
                    >
                      <div className="lay02-accordion__header">
                        <span className="lay02-accordion__num">{s.num}</span>
                        <span className="lay02-accordion__title">{s.title}</span>
                      </div>
                      <span className="lay02-accordion__indicator" aria-hidden="true">
                        {openAccordion === i ? "−" : "＋"}
                      </span>
                    </button>
                    <div className="lay02-accordion__body">
                      <div className="lay02-accordion__content">
                        <div className="lay02-accordion__image">
                          <Image
                            src={serviceImages[i]}
                            alt={serviceAlts[i] || s.title}
                            width={400}
                            height={250}
                            className="lay02-accordion__img"
                            loading="lazy"
                          />
                        </div>
                        <p className="lay02-accordion__text">{s.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Strengths */}
          <section id="strengths" className="lay02-section lay02-section--alt">
            <div ref={rStrengths} className="lay02-reveal lay02-container">
              <div className="lay02-section-header">
                <span className="lay02-section-label">Strengths</span>
                <h2 className="lay02-section-title">私たちの強み</h2>
                <div className="lay02-section-divider" />
              </div>
              <div className="lay02-strengths-grid">
                {data.strengths.map((s, i) => (
                  <div key={i} className="lay02-strength-card">
                    <div className="lay02-strength-card__num">{s.num}</div>
                    <h3 className="lay02-strength-card__title">{s.title}</h3>
                    <p className="lay02-strength-card__text">{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* === TAB 2: 企業情報 === */}
        <div
          className={`lay02-tab-panel ${activeTab === "corporate" ? "lay02-tab-panel--active" : ""}`}
          role="tabpanel"
          aria-hidden={activeTab !== "corporate"}
        >
          {/* CEO Message */}
          <section id="message" className="lay02-section">
            <div ref={rMessage} className="lay02-reveal lay02-container">
              <div className="lay02-section-header">
                <span className="lay02-section-label">Message</span>
                <h2 className="lay02-section-title">代表メッセージ</h2>
                <div className="lay02-section-divider" />
              </div>
              <div className="lay02-message">
                <div className="lay02-message__portrait">
                  <Image
                    src="/keikamotsu-templates/images/ceo-portrait.webp"
                    alt={`${data.ceoMessage.title} ${data.ceoMessage.name}`}
                    width={280}
                    height={350}
                    className="lay02-ceo-img"
                    loading="lazy"
                  />
                </div>
                <div className="lay02-message__content">
                  {data.ceoMessage.message.map((p, i) => (
                    <p key={i} className="lay02-message__paragraph">{p}</p>
                  ))}
                  <div className="lay02-message__signature">
                    <span className="lay02-message__title">{data.ceoMessage.title}</span>
                    <span className="lay02-message__name">{data.ceoMessage.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Company Overview */}
          <section id="company" className="lay02-section lay02-section--alt">
            <div ref={rCompany} className="lay02-reveal lay02-container">
              <div className="lay02-section-header">
                <span className="lay02-section-label">Company</span>
                <h2 className="lay02-section-title">会社概要</h2>
                <div className="lay02-section-divider" />
              </div>
              <div className="lay02-company-layout">
                <dl className="lay02-overview-table">
                  {data.companyOverview.map((item, i) => (
                    <div key={i} className="lay02-overview-row">
                      <dt className="lay02-overview-dt">{item.dt}</dt>
                      <dd className="lay02-overview-dd">{item.dd}</dd>
                    </div>
                  ))}
                </dl>
                <div className="lay02-company-photo">
                  <Image
                    src="/keikamotsu-templates/images/company.webp"
                    alt="会社外観"
                    width={500}
                    height={350}
                    className="lay02-company-img"
                    loading="lazy"
                  />
                  <p className="lay02-company-photo__caption">本社・寝屋川営業所</p>
                </div>
              </div>
            </div>
          </section>

          {/* History */}
          <section id="history" className="lay02-section">
            <div ref={rHistory} className="lay02-reveal lay02-container">
              <div className="lay02-section-header">
                <span className="lay02-section-label">History</span>
                <h2 className="lay02-section-title">沿革</h2>
                <div className="lay02-section-divider" />
              </div>
              <div className="lay02-timeline">
                {data.history.map((h, i) => (
                  <div key={i} className="lay02-timeline__item">
                    <div className="lay02-timeline__dot" />
                    <div className="lay02-timeline__year">{h.year}</div>
                    <div className="lay02-timeline__event">{h.event}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* === TAB 3: 実績 === */}
        <div
          className={`lay02-tab-panel ${activeTab === "achievements" ? "lay02-tab-panel--active" : ""}`}
          role="tabpanel"
          aria-hidden={activeTab !== "achievements"}
        >
          {/* Numbers */}
          <section id="numbers" className="lay02-section lay02-section--dark">
            <div ref={rNumbers} className="lay02-reveal lay02-container">
              <div className="lay02-section-header lay02-section-header--light">
                <span className="lay02-section-label">Numbers</span>
                <h2 className="lay02-section-title">数字で見る実績</h2>
                <div className="lay02-section-divider" />
              </div>
              <div className="lay02-numbers-grid">
                {data.numbers.map((n, i) => (
                  <div key={i} className="lay02-number-card">
                    <div className="lay02-number-card__value">
                      <AnimatedCounter
                        end={parseNumericValue(n.value)}
                        suffix={n.suffix}
                      />
                    </div>
                    <div className="lay02-number-card__label">{n.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Partners */}
          <section id="partners" className="lay02-section">
            <div ref={rPartners} className="lay02-reveal lay02-container">
              <div className="lay02-section-header">
                <span className="lay02-section-label">Partners</span>
                <h2 className="lay02-section-title">主要取引先</h2>
                <div className="lay02-section-divider" />
              </div>
              <div className="lay02-partners-grid">
                {data.partners.map((p, i) => (
                  <div key={i} className="lay02-partner-card">
                    <div className="lay02-partner-card__icon" aria-hidden="true">
                      {p.name.charAt(0)}
                    </div>
                    <h3 className="lay02-partner-card__name">{p.name}</h3>
                    <span className="lay02-partner-card__industry">{p.industry}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* News */}
          <section id="news" className="lay02-section lay02-section--alt">
            <div ref={rNews} className="lay02-reveal lay02-container">
              <div className="lay02-section-header">
                <span className="lay02-section-label">News</span>
                <h2 className="lay02-section-title">お知らせ</h2>
                <div className="lay02-section-divider" />
              </div>
              <ul className="lay02-news-list">
                {data.news.map((n, i) => (
                  <li key={i} className="lay02-news-item">
                    <time className="lay02-news-date">{n.date}</time>
                    <span className={`lay02-news-tag lay02-news-tag--${n.tagStyle}`}>
                      {n.tag}
                    </span>
                    <span className="lay02-news-title">{n.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* === TAB 4: お問い合わせ === */}
        <div
          className={`lay02-tab-panel ${activeTab === "contact" ? "lay02-tab-panel--active" : ""}`}
          role="tabpanel"
          aria-hidden={activeTab !== "contact"}
        >
          {/* Recruit */}
          <section id="recruit" className="lay02-section lay02-recruit-section">
            <div ref={rRecruit} className="lay02-reveal lay02-container">
              <div className="lay02-section-header lay02-section-header--light">
                <span className="lay02-section-label">Recruit</span>
                <h2 className="lay02-section-title">採用情報</h2>
                <div className="lay02-section-divider" />
              </div>
              <div className="lay02-recruit">
                <Image
                  src="/keikamotsu-templates/images/delivery.webp"
                  alt="配送業務"
                  width={600}
                  height={300}
                  className="lay02-recruit__img"
                  loading="lazy"
                />
                <h3 className="lay02-recruit__heading">{data.recruit.heading}</h3>
                <p className="lay02-recruit__text">{data.recruit.text}</p>
                <a href={data.recruit.link} className="lay02-btn-primary">
                  {data.recruit.cta}
                </a>
              </div>
            </div>
          </section>

          {/* Access */}
          <section id="access" className="lay02-section">
            <div ref={rAccess} className="lay02-reveal lay02-container">
              <div className="lay02-section-header">
                <span className="lay02-section-label">Access</span>
                <h2 className="lay02-section-title">{data.access.heading}</h2>
                <div className="lay02-section-divider" />
              </div>
              <div className="lay02-access">
                <div className="lay02-access__info">
                  <p className="lay02-access__address">
                    <span className="lay02-access__label">所在地</span>
                    {data.access.address}
                  </p>
                  <p className="lay02-access__station">
                    <span className="lay02-access__label">最寄り駅</span>
                    {data.access.nearestStation}
                  </p>
                  <p className="lay02-access__note">
                    <span className="lay02-access__label">お車の場合</span>
                    {data.access.mapNote}
                  </p>
                </div>
                <div className="lay02-access__map">
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

          {/* Contact Form */}
          <section id="contact" className="lay02-section lay02-section--alt">
            <div ref={rContact} className="lay02-reveal lay02-container">
              <div className="lay02-section-header">
                <span className="lay02-section-label">Contact</span>
                <h2 className="lay02-section-title">{data.contact.heading}</h2>
                <div className="lay02-section-divider" />
              </div>
              <p className="lay02-contact-intro">{data.contact.intro}</p>
              <form
                className="lay02-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("送信ありがとうございます。");
                }}
              >
                {data.contact.fields.map((f, i) => (
                  <div key={i} className="lay02-form__group">
                    <label className="lay02-form__label">
                      {f.label}
                      {f.required && (
                        <span className="lay02-form__required">必須</span>
                      )}
                    </label>
                    {f.type === "textarea" ? (
                      <textarea
                        name={f.name}
                        className="lay02-form__textarea"
                        rows={5}
                        required={f.required}
                      />
                    ) : (
                      <input
                        type={f.type}
                        name={f.name}
                        className="lay02-form__input"
                        required={f.required}
                      />
                    )}
                  </div>
                ))}
                <div className="lay02-form__privacy">
                  <label className="lay02-form__checkbox-label">
                    <input type="checkbox" required className="lay02-form__checkbox" />
                    プライバシーポリシーに同意する
                  </label>
                </div>
                <button type="submit" className="lay02-form__submit">
                  送信する
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>

      {/* ─── BACK TO TOP ─── */}
      <button
        className={`lay02-back-top ${showBackTop ? "lay02-back-top--visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="トップへ戻る"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 16V4M4 10l6-6 6 6" />
        </svg>
      </button>

      {/* ─── FOOTER ─── */}
      <footer className="lay02-footer">
        <div className="lay02-footer__inner">
          <div className="lay02-footer__top">
            <div className="lay02-footer__brand">
              <span className="lay02-footer__logo-mark">GL</span>
              <span className="lay02-footer__company-en">{data.company.nameEn}</span>
            </div>
            <p className="lay02-footer__catchphrase">{data.footer.catchphrase}</p>
          </div>

          <div className="lay02-footer__middle">
            <div className="lay02-footer__info">
              <p className="lay02-footer__company-name">{data.company.name}</p>
              <p className="lay02-footer__address">
                〒{data.company.postalCode} {data.company.address}
              </p>
              <p className="lay02-footer__hours">{data.company.hours}</p>
            </div>

            <nav className="lay02-footer__nav">
              <span className="lay02-footer__nav-heading">サイトマップ</span>
              {TABS.map((t) => (
                <button
                  key={t.id}
                  className="lay02-footer__link"
                  onClick={() => handleTabChange(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </nav>

            <div className="lay02-footer__contact-col">
              <span className="lay02-footer__contact-heading">お問い合わせ</span>
              <div className="lay02-footer__phone">
                <span className="lay02-footer__phone-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </span>
                {data.company.phone}
              </div>
              <p className="lay02-footer__hours-text">{data.company.hours}</p>
              <a href={`mailto:${data.company.email}`} className="lay02-footer__email-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 6L2 7" />
                </svg>
                {data.company.email}
              </a>
            </div>
          </div>

          <div className="lay02-footer__bottom">
            <p className="lay02-footer__copy">
              &copy; {new Date().getFullYear()} {data.company.name} All Rights Reserved.
            </p>
            <div className="lay02-footer__bottom-links">
              <a href="#" className="lay02-footer__bottom-link">プライバシーポリシー</a>
              <a href="#" className="lay02-footer__bottom-link">サイトマップ</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
