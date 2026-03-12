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
          setTimeout(() => el.classList.add("lay01-revealed"), delay + 100);
          obs.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    // delay observe to ensure initial paint at opacity:0
    const t = setTimeout(() => obs.observe(el), 100);
    return () => { clearTimeout(t); obs.disconnect(); };
  }, [delay]);
  return ref;
}

/* ── typing animation hook ── */
function useTyping(text: string, speed = 100, startDelay = 400) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);
  return { displayed, done };
}

/* ── typing headline ── */
function TypingHeadline() {
  const fullText = "物流で未来を変えていく。";
  const { displayed, done } = useTyping(fullText, 120, 500);
  return (
    <h1 className="lay01-hero__headline">
      {displayed}
      {!done && <span className="lay01-typing-cursor">|</span>}
    </h1>
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
    <span ref={ref} className="lay01-counter-value">
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ── sidebar nav items ── */
const sidebarNavItems = [
  { href: "#lay01-hero", label: "ホーム", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" },
  { href: "#numbers", label: "実績", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { href: "#message", label: "代表挨拶", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  { href: "#services", label: "事業内容", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
  { href: "#strengths", label: "強み", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
  { href: "#partners", label: "取引先", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
  { href: "#history", label: "沿革", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  { href: "#news", label: "お知らせ", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2" },
  { href: "#recruit", label: "採用", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { href: "#company", label: "会社概要", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
  { href: "#contact", label: "お問い合わせ", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
];

/* ── mobile bottom tab items (5 key items) ── */
const mobileTabItems = [
  { href: "#lay01-hero", label: "ホーム", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" },
  { href: "#services", label: "事業", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
  { href: "#numbers", label: "実績", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { href: "#recruit", label: "採用", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { href: "#contact", label: "連絡", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
];

export default function Layout01() {
  const [activeSection, setActiveSection] = useState("lay01-hero");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const historyTrackRef = useRef<HTMLDivElement>(null);
  const historyWrapperRef = useRef<HTMLDivElement>(null);

  /* scroll handler for active section tracking */
  useEffect(() => {
    const sectionIds = [
      "lay01-hero", "numbers", "message", "services", "strengths",
      "partners", "history", "news", "recruit", "company", "access", "contact",
    ];
    const h = () => {
      let current = "lay01-hero";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3) current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", h, { passive: true });
    h();
    return () => window.removeEventListener("scroll", h);
  }, []);

  /* scroll-linked horizontal history */
  useEffect(() => {
    const wrapper = historyWrapperRef.current;
    const track = historyTrackRef.current;
    if (!wrapper || !track) return;

    const onScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const wrapperH = wrapper.offsetHeight;
      const viewH = window.innerHeight;
      const scrollable = wrapperH - viewH;
      if (scrollable <= 0) return;

      // How far into the wrapper we've scrolled (0 → 1)
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      const trackW = track.scrollWidth;
      const visibleW = track.parentElement?.offsetWidth ?? track.offsetWidth;
      const maxShift = trackW - visibleW;
      track.style.transform = `translateX(-${progress * maxShift}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close sidebar on ESC (mobile) */
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  /* parse number from strings like "500,000" or "99.2" */
  const parseNumericValue = (v: string): number => {
    const cleaned = v.replace(/,/g, "");
    return parseFloat(cleaned);
  };

  /* reveals */
  const rHero = useReveal(0);
  const rNumbers = useReveal(0);
  const rMessage = useReveal(0);
  const rServices = useReveal(0);
  const rStrengths = useReveal(0);
  const rPartners = useReveal(0);
  const rHistory = useReveal(0);
  const rNews = useReveal(0);
  const rRecruit = useReveal(0);
  const rCompany = useReveal(0);
  const rAccess = useReveal(0);
  const rContact = useReveal(0);

  const serviceImages = [
    "/keikamotsu-templates/images/service-ec.webp",
    "/keikamotsu-templates/images/service-b2b.webp",
    "/keikamotsu-templates/images/service-spot.webp",
    "/keikamotsu-templates/images/service-route.webp",
  ];
  const serviceAlts = ["EC物流配送", "企業間配送", "スポット便", "ルート配送"];

  const strengthImages = [
    "/keikamotsu-templates/images/strength-01.webp",
    "/keikamotsu-templates/images/strength-02.webp",
    "/keikamotsu-templates/images/strength-03.webp",
  ];
  const strengthAlts = ["直接契約", "スピード", "多様な人材"];

  const historyImageMap: Record<string, string> = {
    "2021": "/keikamotsu-templates/images/history-2021.webp",
    "2022": "/keikamotsu-templates/images/history-2022.webp",
    "2023": "/keikamotsu-templates/images/history-2023.webp",
    "2024": "/keikamotsu-templates/images/history-2024.webp",
    "2025": "/keikamotsu-templates/images/history-2025.webp",
  };

  return (
    <div className="lay01-layout">
      {/* ─── SIDEBAR ─── */}
      <aside className={`lay01-sidebar ${sidebarOpen ? "lay01-sidebar--open" : ""}`}>
        <div className="lay01-sidebar__header">
          <span className="lay01-sidebar__logo-mark">GL</span>
          <span className="lay01-sidebar__logo-text">Green Logistics</span>
        </div>

        <nav className="lay01-sidebar__nav">
          {sidebarNavItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`lay01-sidebar__link ${
                activeSection === item.href.replace("#", "") ? "lay01-sidebar__link--active" : ""
              }`}
              onClick={closeSidebar}
            >
              <svg
                className="lay01-sidebar__icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={item.icon} />
              </svg>
              <span className="lay01-sidebar__label">{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="lay01-sidebar__footer">
          <p className="lay01-sidebar__footer-text">{data.company.hours}</p>
          <p className="lay01-sidebar__footer-phone">{data.company.phone}</p>
        </div>
      </aside>

      {/* mobile overlay */}
      {sidebarOpen && (
        <div className="lay01-sidebar-overlay" onClick={closeSidebar} aria-hidden="true" />
      )}

      {/* ─── MAIN AREA ─── */}
      <main className="lay01-main">
        {/* mobile top bar */}
        <div className="lay01-mobile-header">
          <button
            className="lay01-mobile-menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="メニュー"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="lay01-mobile-logo">GL</span>
          <span className="lay01-mobile-company">Green Logistics</span>
        </div>

        {/* ─── HERO (compact) ─── */}
        <section id="lay01-hero" className="lay01-hero">
          <video
            className="lay01-hero__video"
            autoPlay
            muted
            loop
            playsInline
            poster="/keikamotsu-templates/images/hero-bg.webp"
          >
            <source src="/keikamotsu-templates/videos/hero-daytime.mp4" type="video/mp4" />
          </video>
          <div className="lay01-hero__overlay" />
          <div ref={rHero} className="lay01-reveal lay01-hero__content">
            <TypingHeadline />
            <p className="lay01-hero__subtext">{data.hero.subtext[0]}</p>
            <a href="#contact" className="lay01-btn-primary">
              {data.hero.cta}
            </a>
          </div>
        </section>

        {/* ─── GRID PANELS ─── */}
        <div className="lay01-grid">
          {/* ─── NUMBERS (top, prominent) ─── */}
          <section id="numbers" className="lay01-panel lay01-panel--span2">
            <div ref={rNumbers} className="lay01-reveal lay01-reveal--up">
              <div className="lay01-panel__header">
                <span className="lay01-panel__label">Numbers</span>
                <h2 className="lay01-panel__title">数字で見る実績</h2>
              </div>
              <div className="lay01-numbers-grid">
                {data.numbers.map((n, i) => (
                  <div key={i} className="lay01-number-card">
                    <div className="lay01-number-card__value">
                      <AnimatedCounter
                        end={parseNumericValue(n.value)}
                        suffix={n.suffix}
                      />
                    </div>
                    <div className="lay01-number-card__label">{n.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ─── CEO MESSAGE ─── */}
          <section id="message" className="lay01-panel">
            <div ref={rMessage} className="lay01-reveal lay01-reveal--up">
              <div className="lay01-panel__header">
                <span className="lay01-panel__label">Message</span>
                <h2 className="lay01-panel__title">代表メッセージ</h2>
              </div>
              <div className="lay01-message">
                <div className="lay01-message__portrait">
                  <Image
                    src="/keikamotsu-templates/images/ceo-portrait.webp"
                    alt={`${data.ceoMessage.title} ${data.ceoMessage.name}`}
                    width={200}
                    height={250}
                    className="lay01-ceo-img"
                    loading="lazy"
                  />
                </div>
                <div className="lay01-message__body">
                  {data.ceoMessage.message.slice(0, 2).map((p, i) => (
                    <p key={i} className="lay01-message__paragraph">{p}</p>
                  ))}
                  <div className="lay01-message__signature">
                    <span className="lay01-message__title-text">{data.ceoMessage.title}</span>
                    <span className="lay01-message__name">{data.ceoMessage.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ─── SERVICES (2col span) ─── */}
          <section id="services" className="lay01-panel lay01-panel--span2">
            <div ref={rServices} className="lay01-reveal lay01-reveal--up">
              <div className="lay01-panel__header">
                <span className="lay01-panel__label">Services</span>
                <h2 className="lay01-panel__title">事業内容</h2>
              </div>
              <div className="lay01-services-grid">
                {data.services.map((s, i) => (
                  <article key={i} className="lay01-service-card">
                    {serviceImages[i] && (
                      <Image
                        src={serviceImages[i]}
                        alt={serviceAlts[i] || s.title}
                        width={400}
                        height={200}
                        className="lay01-service-img"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    )}
                    <div className="lay01-service-card__body">
                      <div className="lay01-service-card__num">{s.num}</div>
                      <h3 className="lay01-service-card__title">{s.title}</h3>
                      <p className="lay01-service-card__text">{s.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ─── STRENGTHS ─── */}
          <section id="strengths" className="lay01-panel">
            <div ref={rStrengths} className="lay01-reveal lay01-reveal--up">
              <div className="lay01-panel__header">
                <span className="lay01-panel__label">Strengths</span>
                <h2 className="lay01-panel__title">私たちの強み</h2>
              </div>
              <div className="lay01-strengths-list">
                {data.strengths.map((s, i) => (
                  <div key={i} className="lay01-strength-item">
                    <div className="lay01-strength-item__num">{s.num}</div>
                    <div className="lay01-strength-item__content">
                      {strengthImages[i] && (
                        <Image
                          src={strengthImages[i]}
                          alt={strengthAlts[i] || s.title}
                          width={400}
                          height={200}
                          className="lay01-strength-img"
                          loading="lazy"
                        />
                      )}
                      <h3 className="lay01-strength-item__title">{s.title}</h3>
                      <p className="lay01-strength-item__text">{s.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ─── PARTNERS ─── */}
          <section id="partners" className="lay01-panel">
            <div ref={rPartners} className="lay01-reveal lay01-reveal--up">
              <div className="lay01-panel__header">
                <span className="lay01-panel__label">Partners</span>
                <h2 className="lay01-panel__title">主要取引先</h2>
              </div>
              <div className="lay01-partners-grid">
                {data.partners.map((p, i) => (
                  <div key={i} className="lay01-partner-card">
                    <img src={p.logo} alt={p.name} className="lay01-partner-card__logo" />
                    <div className="lay01-partner-card__info">
                      <h3 className="lay01-partner-card__name">{p.name}</h3>
                      <span className="lay01-partner-card__industry">{p.industry}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ─── HISTORY (scroll-linked horizontal) ─── */}
          <div
            id="history"
            ref={historyWrapperRef}
            className="lay01-history-wrapper"
          >
            <div className="lay01-history-sticky">
              <div ref={rHistory} className="lay01-reveal lay01-reveal--up">
                <div className="lay01-panel__header">
                  <span className="lay01-panel__label">History</span>
                  <h2 className="lay01-panel__title">沿革 ─ 2021〜2025</h2>
                </div>
                <div className="lay01-history-viewport">
                  <div ref={historyTrackRef} className="lay01-history-track">
                    {data.history.map((h, i) => (
                      <div key={i} className="lay01-history-card">
                        <div className="lay01-history-card__year">{h.year}</div>
                        <div className="lay01-history-card__dot" />
                        <div className="lay01-history-card__event">{h.event}</div>
                        {historyImageMap[h.year] && (
                          <Image
                            src={historyImageMap[h.year]}
                            alt={`${h.year}年の様子`}
                            width={300}
                            height={170}
                            className="lay01-history-card__img"
                            loading="lazy"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  {/* progress line behind cards */}
                  <div className="lay01-history-line" />
                </div>
                <p className="lay01-history-hint">↓ スクロールでタイムラインが進みます</p>
              </div>
            </div>
          </div>

          {/* ─── NEWS ─── */}
          <section id="news" className="lay01-panel">
            <div ref={rNews} className="lay01-reveal lay01-reveal--up">
              <div className="lay01-panel__header">
                <span className="lay01-panel__label">News</span>
                <h2 className="lay01-panel__title">お知らせ</h2>
              </div>
              <ul className="lay01-news-list">
                {data.news.map((n, i) => (
                  <li key={i} className="lay01-news-item">
                    <time className="lay01-news-date">{n.date}</time>
                    <span className={`lay01-news-tag lay01-news-tag--${n.tagStyle}`}>
                      {n.tag}
                    </span>
                    <span className="lay01-news-title">{n.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ─── RECRUIT ─── */}
          <section id="recruit" className="lay01-panel lay01-panel--accent">
            <div ref={rRecruit} className="lay01-reveal lay01-reveal--up">
              <div className="lay01-panel__header">
                <span className="lay01-panel__label lay01-panel__label--light">Recruit</span>
                <h2 className="lay01-panel__title lay01-panel__title--light">採用情報</h2>
              </div>
              <div className="lay01-recruit">
                <Image
                  src="/keikamotsu-templates/images/delivery.webp"
                  alt="配送風景"
                  width={600}
                  height={200}
                  className="lay01-recruit__img"
                  loading="lazy"
                />
                <h3 className="lay01-recruit__heading">{data.recruit.heading}</h3>
                <p className="lay01-recruit__text">{data.recruit.text}</p>
                <a href={data.recruit.link} className="lay01-btn-secondary">
                  {data.recruit.cta}
                </a>
              </div>
            </div>
          </section>

          {/* ─── COMPANY + ACCESS ─── */}
          <section id="company" className="lay01-panel lay01-panel--span2">
            <div ref={rCompany} className="lay01-reveal lay01-reveal--up">
              <div className="lay01-panel__header">
                <span className="lay01-panel__label">Company</span>
                <h2 className="lay01-panel__title">会社概要</h2>
              </div>
              <div className="lay01-company-layout">
                <dl className="lay01-overview-table">
                  {data.companyOverview.map((item, i) => (
                    <div key={i} className="lay01-overview-row">
                      <dt className="lay01-overview-dt">{item.dt}</dt>
                      <dd className="lay01-overview-dd">{item.dd}</dd>
                    </div>
                  ))}
                </dl>
                <div className="lay01-company-photo">
                  <Image
                    src="/keikamotsu-templates/images/company.webp"
                    alt="会社外観"
                    width={400}
                    height={280}
                    className="lay01-company-img"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ─── ACCESS ─── */}
          <section id="access" className="lay01-panel lay01-panel--span2">
            <div ref={rAccess} className="lay01-reveal lay01-reveal--up">
              <div className="lay01-panel__header">
                <span className="lay01-panel__label">Access</span>
                <h2 className="lay01-panel__title">{data.access.heading}</h2>
              </div>
              <div className="lay01-access">
                <div className="lay01-access__info">
                  <p className="lay01-access__row">
                    <span className="lay01-access__label">所在地</span>
                    {data.access.address}
                  </p>
                  <p className="lay01-access__row">
                    <span className="lay01-access__label">最寄り駅</span>
                    {data.access.nearestStation}
                  </p>
                  <p className="lay01-access__row">
                    <span className="lay01-access__label">お車の場合</span>
                    {data.access.mapNote}
                  </p>
                </div>
                <div className="lay01-access__map">
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

          {/* ─── CONTACT FORM ─── */}
          <section id="contact" className="lay01-panel lay01-panel--span2">
            <div ref={rContact} className="lay01-reveal lay01-reveal--up">
              <div className="lay01-panel__header">
                <span className="lay01-panel__label">Contact</span>
                <h2 className="lay01-panel__title">{data.contact.heading}</h2>
              </div>
              <p className="lay01-contact-intro">{data.contact.intro}</p>
              <form
                className="lay01-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("送信ありがとうございます。");
                }}
              >
                <div className="lay01-form__grid">
                  {data.contact.fields.map((f, i) => (
                    <div
                      key={i}
                      className={`lay01-form__group ${f.type === "textarea" ? "lay01-form__group--full" : ""}`}
                    >
                      <label className="lay01-form__label">
                        {f.label}
                        {f.required && <span className="lay01-form__required">必須</span>}
                      </label>
                      {f.type === "textarea" ? (
                        <textarea
                          name={f.name}
                          className="lay01-form__textarea"
                          rows={5}
                          required={f.required}
                        />
                      ) : (
                        <input
                          type={f.type}
                          name={f.name}
                          className="lay01-form__input"
                          required={f.required}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="lay01-form__privacy">
                  <label className="lay01-form__checkbox-label">
                    <input type="checkbox" required className="lay01-form__checkbox" />
                    プライバシーポリシーに同意する
                  </label>
                </div>
                <button type="submit" className="lay01-form__submit">
                  送信する
                </button>
              </form>
            </div>
          </section>
        </div>

        {/* ─── FOOTER ─── */}
        <footer className="lay01-footer">
          <div className="lay01-footer__inner">
            <div className="lay01-footer__top">
              <div className="lay01-footer__brand">
                <span className="lay01-footer__logo-mark">GL</span>
                <span className="lay01-footer__company-en">{data.company.nameEn}</span>
              </div>
              <p className="lay01-footer__catchphrase">{data.footer.catchphrase}</p>
            </div>
            <div className="lay01-footer__middle">
              <div className="lay01-footer__info">
                <p className="lay01-footer__company-name">{data.company.name}</p>
                <p className="lay01-footer__address">
                  〒{data.company.postalCode} {data.company.address}
                </p>
                <p className="lay01-footer__phone-text">{data.company.phone}</p>
                <p className="lay01-footer__hours">{data.company.hours}</p>
              </div>
              <nav className="lay01-footer__nav">
                <span className="lay01-footer__nav-heading">サイトマップ</span>
                {data.navLinks.slice(0, 8).map((l) => (
                  <a key={l.href} href={l.href} className="lay01-footer__link">
                    {l.label}
                  </a>
                ))}
              </nav>
              <div className="lay01-footer__contact-col">
                <span className="lay01-footer__contact-heading">お問い合わせ</span>
                <a href={`mailto:${data.company.email}`} className="lay01-footer__email-link">
                  {data.company.email}
                </a>
              </div>
            </div>
            <div className="lay01-footer__bottom">
              <p className="lay01-footer__copy">
                &copy; {new Date().getFullYear()} {data.company.name} All Rights Reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>

      {/* ─── MOBILE BOTTOM TAB BAR ─── */}
      <nav className="lay01-bottom-tabs">
        {mobileTabItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`lay01-bottom-tab ${
              activeSection === item.href.replace("#", "") ? "lay01-bottom-tab--active" : ""
            }`}
          >
            <svg
              className="lay01-bottom-tab__icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={item.icon} />
            </svg>
            <span className="lay01-bottom-tab__label">{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
