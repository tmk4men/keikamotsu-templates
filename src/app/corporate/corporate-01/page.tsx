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
          setTimeout(() => el.classList.add("cp01-revealed"), delay);
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
    <span ref={ref} className="cp01-counter-value">
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

function HeroParticles({ count = 20 }: { count?: number }) {
  return (
    <div className="cp01-particles" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={`cp01-particle cp01-particle--${i % 3 === 0 ? 'square' : i % 3 === 1 ? 'circle' : 'triangle'}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 8}s`,
            opacity: 0.08 + Math.random() * 0.12,
            fontSize: `${4 + Math.random() * 12}px`,
          }}
        />
      ))}
    </div>
  );
}

function WaveDivider({ flip = false, color = "var(--cp01-bg-alt)" }: { flip?: boolean; color?: string }) {
  return (
    <div className={`cp01-wave-divider ${flip ? 'cp01-wave-divider--flip' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="cp01-wave-svg">
        <path d="M0,32 C360,60 720,0 1080,32 C1260,48 1380,20 1440,32 L1440,60 L0,60 Z" fill={color} />
      </svg>
    </div>
  );
}

export default function Corporate01() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [timelineProgress, setTimelineProgress] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  /* scroll handler */
  useEffect(() => {
    const h = () => {
      setScrolled(window.scrollY > 60);
      setShowBackTop(window.scrollY > 400);

      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? (window.scrollY / docH) * 100 : 0);

      const sectionIds = ["services", "strengths", "message", "company", "history", "numbers", "partners", "news", "recruit", "access", "contact"];
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) current = id;
        }
      }
      setActiveSection(current);

      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const height = timelineRef.current.offsetHeight;
        const visible = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (height + window.innerHeight * 0.5)));
        setTimelineProgress(visible * 100);
      }
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  /* close menu on link click */
  const closeMenu = useCallback(() => setMenuOpen(false), []);

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

  /* staggered reveals */
  const rHero = useReveal(0);
  const rServices = useReveal(0);
  const rStrengths = useReveal(0);
  const rMessage = useReveal(0);
  const rCompany = useReveal(0);
  const rHistory = useReveal(0);
  const rNumbers = useReveal(0);
  const rPartners = useReveal(0);
  const rNews = useReveal(0);
  const rRecruit = useReveal(0);
  const rAccess = useReveal(0);
  const rContact = useReveal(0);

  /* parse number from strings like "500,000" or "99.2" */
  const parseNumericValue = (v: string): number => {
    const cleaned = v.replace(/,/g, "");
    return parseFloat(cleaned);
  };

  return (
    <div className="theme-cp01">
      <div className="cp01-progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* ─── HEADER ─── */}
      <header
        className={`cp01-header ${scrolled ? "cp01-header--scrolled" : ""}`}
      >
        <div className="cp01-header__inner">
          <a href="#" className="cp01-logo">
            <span className="cp01-logo__mark">GL</span>
            <span className="cp01-logo__text">{data.company.nameEn}</span>
          </a>

          <button
            className={`cp01-hamburger ${menuOpen ? "cp01-hamburger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニュー"
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={`cp01-nav ${menuOpen ? "cp01-nav--open" : ""}`}>
            {data.navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`cp01-nav__link ${activeSection === l.href.replace('#', '') ? 'cp01-nav__link--active' : ''}`}
                onClick={closeMenu}
              >
                {l.label}
              </a>
            ))}
            <a href="#contact" className="cp01-nav__cta" onClick={closeMenu}>
              お問い合わせ
            </a>
          </nav>
        </div>
      </header>

      {/* mobile overlay */}
      {menuOpen && (
        <div className="cp01-overlay" onClick={closeMenu} aria-hidden="true" />
      )}

      {/* ─── HERO ─── */}
      <section className="cp01-hero">
        <video
          className="cp01-hero__video"
          autoPlay
          muted
          loop
          playsInline
          poster="/keikamotsu-templates/images/hero-bg.webp"
        >
          <source src="/keikamotsu-templates/videos/hero-daytime.mp4" type="video/mp4" />
        </video>
        <HeroParticles count={20} />
        <div ref={rHero} className="cp01-reveal cp01-hero__content">
          <h1 className="cp01-hero__headline">
            届ける力で、<br className="br-desktop" />社会をつなぐ。
          </h1>
          <div className="cp01-hero__subtext">
            {data.hero.subtext.map((line, i) => (
              <p key={i} className="cp01-hero__subline">
                {line}
              </p>
            ))}
          </div>
          <a href="#contact" className="cp01-btn-primary">
            {data.hero.cta}
          </a>
        </div>
        <div className="cp01-hero__decoration" aria-hidden="true" />
      </section>

      <WaveDivider color="var(--cp01-bg)" />

      {/* ─── SERVICES ─── */}
      <section id="services" className="cp01-section">
        <div ref={rServices} className="cp01-reveal cp01-container">
          <div className="cp01-section-header">
            <span className="cp01-section-label">Services</span>
            <h2 className="cp01-section-title">事業内容</h2>
            <div className="cp01-section-divider" />
          </div>
          <div className="cp01-services-grid">
            {(() => {
              const serviceImages = [
                "/keikamotsu-templates/images/service-ec.png",
                "/keikamotsu-templates/images/service-b2b.png",
                "/keikamotsu-templates/images/service-spot.png",
                "/keikamotsu-templates/images/service-route.png",
              ];
              const serviceAlts = ["EC物流配送", "企業間配送", "スポット便", "ルート配送"];
              return data.services.map((s, i) => (
                <article key={i} className="cp01-service-card" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="cp01-service-card__flipper">
                    <div className="cp01-service-card__front">
                      {serviceImages[i] && (
                        <Image src={serviceImages[i]} alt={serviceAlts[i] || s.title} width={400} height={250} className="cp01-service-img" />
                      )}
                      <div className="cp01-service-card__header">
                        <span className="cp01-service-card__num">{s.num}</span>
                        <span className="cp01-service-card__icon">{s.icon}</span>
                      </div>
                      <h3 className="cp01-service-card__title">{s.title}</h3>
                    </div>
                    <div className="cp01-service-card__back">
                      <span className="cp01-service-card__icon">{s.icon}</span>
                      <h3 className="cp01-service-card__title">{s.title}</h3>
                      <p className="cp01-service-card__text">{s.text}</p>
                    </div>
                  </div>
                </article>
              ));
            })()}
          </div>
        </div>
      </section>

      <WaveDivider color="var(--cp01-bg-alt)" />

      {/* ─── STRENGTHS ─── */}
      <section id="strengths" className="cp01-section cp01-section--alt">
        <div ref={rStrengths} className="cp01-reveal cp01-container">
          <div className="cp01-section-header">
            <span className="cp01-section-label">Strengths</span>
            <h2 className="cp01-section-title">私たちの強み</h2>
            <div className="cp01-section-divider" />
          </div>
          <div className="cp01-strengths-list">
            {(() => {
              const strengthImages = [
                "/keikamotsu-templates/images/reasons.png",
                "/keikamotsu-templates/images/workplace.png",
                "/keikamotsu-templates/images/vehicle.png",
              ];
              const strengthAlts = ["直接契約ドライバー", "スピーディーな対応", "幅広い人材"];
              return data.strengths.map((s, i) => (
                <div
                  key={i}
                  className={`cp01-strength-item ${i % 2 !== 0 ? "cp01-strength-item--reverse" : ""}`}
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <div className="cp01-strength-item__image">
                    <Image
                      src={strengthImages[i]}
                      alt={strengthAlts[i]}
                      width={480}
                      height={320}
                      className="cp01-strength-img"
                    />
                  </div>
                  <div className="cp01-strength-item__content">
                    <div className="cp01-strength-item__num">{s.num}</div>
                    <h3 className="cp01-strength-item__title">{s.title}</h3>
                    <p className="cp01-strength-item__text">{s.text}</p>
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>
      </section>

      <WaveDivider flip color="var(--cp01-bg)" />

      {/* ─── CEO MESSAGE ─── */}
      <section id="message" className="cp01-section">
        <div ref={rMessage} className="cp01-reveal cp01-container">
          <div className="cp01-section-header">
            <span className="cp01-section-label">Message</span>
            <h2 className="cp01-section-title">代表メッセージ</h2>
            <div className="cp01-section-divider" />
          </div>
          <div className="cp01-message">
            <div className="cp01-message__portrait">
              <Image src="/keikamotsu-templates/images/ceo-portrait.png" alt="代表取締役 田中 誠一" width={280} height={350} className="cp01-ceo-img" />
              <div className="cp01-message__initial" aria-hidden="true">
                T
              </div>
            </div>
            <div className="cp01-message__content">
              {data.ceoMessage.message.map((p, i) => (
                <p key={i} className="cp01-message__paragraph">
                  {p}
                </p>
              ))}
              <div className="cp01-message__signature">
                <span className="cp01-message__title">
                  {data.ceoMessage.title}
                </span>
                <span className="cp01-message__name">
                  {data.ceoMessage.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COMPANY OVERVIEW ─── */}
      <section id="company" className="cp01-section cp01-section--alt">
        <div ref={rCompany} className="cp01-reveal cp01-container">
          <div className="cp01-section-header">
            <span className="cp01-section-label">Company</span>
            <h2 className="cp01-section-title">会社概要</h2>
            <div className="cp01-section-divider" />
          </div>
          <div className="cp01-company-layout">
            <dl className="cp01-overview-table">
              {data.companyOverview.map((item, i) => (
                <div key={i} className="cp01-overview-row">
                  <dt className="cp01-overview-dt">{item.dt}</dt>
                  <dd className="cp01-overview-dd">{item.dd}</dd>
                </div>
              ))}
            </dl>
            <div className="cp01-company-photo">
              <Image
                src="/keikamotsu-templates/images/company.png"
                alt="会社外観"
                width={500}
                height={350}
                className="cp01-company-img"
              />
              <p className="cp01-company-photo__caption">本社・寝屋川営業所</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HISTORY / TIMELINE ─── */}
      <section id="history" className="cp01-section">
        <div ref={rHistory} className="cp01-reveal cp01-container">
          <div className="cp01-section-header">
            <span className="cp01-section-label">History</span>
            <h2 className="cp01-section-title">沿革</h2>
            <div className="cp01-section-divider" />
          </div>
          <div className="cp01-timeline" ref={timelineRef}>
            <div className="cp01-timeline__line" style={{ height: `${timelineProgress}%` }} aria-hidden="true" />
            {data.history.map((h, i) => (
              <div
                key={i}
                className="cp01-timeline__item"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="cp01-timeline__dot" />
                <div className="cp01-timeline__year">{h.year}</div>
                <div className="cp01-timeline__event">{h.event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NUMBERS ─── */}
      <section id="numbers" className="cp01-section cp01-section--dark">
        <div ref={rNumbers} className="cp01-reveal cp01-container">
          <div className="cp01-section-header cp01-section-header--light">
            <span className="cp01-section-label">Numbers</span>
            <h2 className="cp01-section-title">数字で見る実績</h2>
            <div className="cp01-section-divider" />
          </div>
          <div className="cp01-numbers-grid">
            {data.numbers.map((n, i) => (
              <div key={i} className="cp01-number-card">
                <div className="cp01-number-card__value">
                  <AnimatedCounter
                    end={parseNumericValue(n.value)}
                    suffix={n.suffix}
                  />
                </div>
                <div className="cp01-number-card__label">{n.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider color="var(--cp01-bg)" />

      {/* ─── PARTNERS ─── */}
      <section id="partners" className="cp01-section">
        <div ref={rPartners} className="cp01-reveal cp01-container">
          <div className="cp01-section-header">
            <span className="cp01-section-label">Partners</span>
            <h2 className="cp01-section-title">主要取引先</h2>
            <div className="cp01-section-divider" />
          </div>
          <div className="cp01-partners-grid">
            {data.partners.map((p, i) => (
              <div
                key={i}
                className="cp01-partner-card"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <img src={p.logo} alt={p.name} className="cp01-partner-card__logo" />
                <h3 className="cp01-partner-card__name">{p.name}</h3>
                <span className="cp01-partner-card__industry">
                  {p.industry}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VISUAL INTERLUDE ─── */}
      <div className="cp01-interlude" aria-hidden="true">
        <Image
          src="/keikamotsu-templates/images/delivery.png"
          alt=""
          width={1920}
          height={600}
          className="cp01-interlude__img"
        />
        <div className="cp01-interlude__overlay">
          <span className="cp01-interlude__text">確実に、丁寧に、届ける。</span>
        </div>
      </div>

      {/* ─── PHOTO GALLERY ─── */}
      <section id="gallery" className="cp01-section">
        <div className="cp01-reveal cp01-container">
          <div className="cp01-section-header">
            <span className="cp01-section-label">Gallery</span>
            <h2 className="cp01-section-title">職場の風景</h2>
            <div className="cp01-section-divider" />
          </div>
          <div className="cp01-gallery-grid">
            {[
              { src: "/keikamotsu-templates/images/team.png", alt: "チームメンバー", caption: "チームワーク" },
              { src: "/keikamotsu-templates/images/loading.png", alt: "積み込み作業", caption: "丁寧な積み込み" },
              { src: "/keikamotsu-templates/images/workplace.png", alt: "事務所風景", caption: "整備された環境" },
              { src: "/keikamotsu-templates/images/vehicle.png", alt: "配送車両", caption: "配送車両" },
              { src: "/keikamotsu-templates/images/reasons.png", alt: "研修風景", caption: "充実の研修制度" },
              { src: "/keikamotsu-templates/images/delivery.png", alt: "配送業務", caption: "安全な配送" },
            ].map((photo, i) => (
              <div key={i} className="cp01-gallery-item" style={{ animationDelay: `${i * 0.08}s` }}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={400}
                  height={300}
                  className="cp01-gallery-img"
                />
                <div className="cp01-gallery-item__overlay">
                  <span className="cp01-gallery-item__caption">{photo.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWS ─── */}
      <section id="news" className="cp01-section cp01-section--alt">
        <div ref={rNews} className="cp01-reveal cp01-container">
          <div className="cp01-section-header">
            <span className="cp01-section-label">News</span>
            <h2 className="cp01-section-title">お知らせ</h2>
            <div className="cp01-section-divider" />
          </div>
          <ul className="cp01-news-list">
            {data.news.map((n, i) => (
              <li key={i} className="cp01-news-item">
                <time className="cp01-news-date">{n.date}</time>
                <span className={`cp01-news-tag cp01-news-tag--${n.tagStyle}`}>
                  {n.tag}
                </span>
                <span className="cp01-news-title">{n.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <WaveDivider flip color="var(--cp01-primary-dark)" />

      {/* ─── RECRUIT CTA ─── */}
      <section id="recruit" className="cp01-section cp01-recruit-section">
        <div ref={rRecruit} className="cp01-reveal cp01-container">
          <div className="cp01-recruit">
            <h2 className="cp01-recruit__heading">{data.recruit.heading}</h2>
            <p className="cp01-recruit__text">{data.recruit.text}</p>
            <a href={data.recruit.link} className="cp01-btn-primary">
              {data.recruit.cta}
            </a>
          </div>
        </div>
      </section>

      {/* ─── ACCESS ─── */}
      <section id="access" className="cp01-section">
        <div ref={rAccess} className="cp01-reveal cp01-container">
          <div className="cp01-section-header">
            <span className="cp01-section-label">Access</span>
            <h2 className="cp01-section-title">{data.access.heading}</h2>
            <div className="cp01-section-divider" />
          </div>
          <div className="cp01-access">
            <div className="cp01-access__info">
              <p className="cp01-access__address">
                <span className="cp01-access__label">所在地</span>
                {data.access.address}
              </p>
              <p className="cp01-access__station">
                <span className="cp01-access__label">最寄り駅</span>
                {data.access.nearestStation}
              </p>
              <p className="cp01-access__note">
                <span className="cp01-access__label">お車の場合</span>
                {data.access.mapNote}
              </p>
            </div>
            <div className="cp01-access__map">
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

      {/* ─── CONTACT FORM ─── */}
      <section id="contact" className="cp01-section cp01-section--alt">
        <div ref={rContact} className="cp01-reveal cp01-container">
          <div className="cp01-section-header">
            <span className="cp01-section-label">Contact</span>
            <h2 className="cp01-section-title">{data.contact.heading}</h2>
            <div className="cp01-section-divider" />
          </div>
          <p className="cp01-contact-intro">{data.contact.intro}</p>
          <form
            className="cp01-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert("送信ありがとうございます。");
            }}
          >
            {data.contact.fields.map((f, i) => (
              <div key={i} className="cp01-form__group">
                <label className="cp01-form__label">
                  {f.label}
                  {f.required && (
                    <span className="cp01-form__required">必須</span>
                  )}
                </label>
                {f.type === "textarea" ? (
                  <textarea
                    name={f.name}
                    className="cp01-form__textarea"
                    rows={5}
                    required={f.required}
                  />
                ) : (
                  <input
                    type={f.type}
                    name={f.name}
                    className="cp01-form__input"
                    required={f.required}
                  />
                )}
              </div>
            ))}
            <div className="cp01-form__privacy">
              <label className="cp01-form__checkbox-label">
                <input type="checkbox" required className="cp01-form__checkbox" />
                プライバシーポリシーに同意する
              </label>
            </div>
            <button type="submit" className="cp01-form__submit">
              送信する
            </button>
          </form>
        </div>
      </section>

      {/* ─── BACK TO TOP ─── */}
      <button
        className={`cp01-back-top ${showBackTop ? "cp01-back-top--visible" : ""}`}
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
      <footer className="cp01-footer cp01-footer--with-bg">
        <div className="cp01-footer__inner">
          <div className="cp01-footer__top">
            <div className="cp01-footer__brand">
              <span className="cp01-footer__logo-mark">GL</span>
              <span className="cp01-footer__company-en">
                {data.company.nameEn}
              </span>
            </div>
            <p className="cp01-footer__catchphrase">
              {data.footer.catchphrase}
            </p>
          </div>

          <div className="cp01-footer__middle">
            {/* Column 1: Company Info */}
            <div className="cp01-footer__info">
              <p className="cp01-footer__company-name">{data.company.name}</p>
              <p className="cp01-footer__address">
                〒{data.company.postalCode} {data.company.address}
              </p>
              <p className="cp01-footer__hours">{data.company.hours}</p>
            </div>

            {/* Column 2: Nav Links */}
            <nav className="cp01-footer__nav">
              <span className="cp01-footer__nav-heading">サイトマップ</span>
              {data.navLinks.slice(0, 8).map((l) => (
                <a key={l.href} href={l.href} className="cp01-footer__link">
                  {l.label}
                </a>
              ))}
            </nav>

            {/* Column 3: Contact */}
            <div className="cp01-footer__contact-col">
              <span className="cp01-footer__contact-heading">お問い合わせ</span>
              <div className="cp01-footer__phone">
                <span className="cp01-footer__phone-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </span>
                {data.company.phone}
              </div>
              <p className="cp01-footer__hours-text">{data.company.hours}</p>
              <a href={`mailto:${data.company.email}`} className="cp01-footer__email-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 6L2 7" />
                </svg>
                {data.company.email}
              </a>
            </div>
          </div>

          <div className="cp01-footer__bottom">
            <p className="cp01-footer__copy">
              &copy; {new Date().getFullYear()} {data.company.name} All Rights Reserved.
            </p>
            <div className="cp01-footer__bottom-links">
              <a href="#" className="cp01-footer__bottom-link">プライバシーポリシー</a>
              <a href="#" className="cp01-footer__bottom-link">サイトマップ</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
