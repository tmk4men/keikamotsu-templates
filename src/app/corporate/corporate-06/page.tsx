"use client";
/* ===================================================
   Corporate Template 06 — ウォームドライブ
   温かみ・アースカラー・地域密着・紙テクスチャ
   =================================================== */

import "./styles.css";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import * as data from "@/data/corporateSiteData";

/* ── scroll-reveal hook ── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".cp06-reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("cp06-visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ── animated counter ── */
function AnimatedCounter({ value, suffix }: { value: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const numericStr = value.replace(/,/g, "");
          const target = parseFloat(numericStr);
          const isDecimal = numericStr.includes(".");
          const steps = 50;
          let step = 0;
          const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;
            setDisplay(
              isDecimal
                ? current.toFixed(1)
                : Math.floor(current).toLocaleString()
            );
            if (step >= steps) clearInterval(timer);
          }, 30);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="cp06-counter-value">
      {display}
      <span className="cp06-counter-suffix">{suffix}</span>
    </span>
  );
}

/* ── warm floating particles ── */
function WarmParticles() {
  const particles = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    size: 4 + Math.random() * 8,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 8 + Math.random() * 10,
    opacity: 0.06 + Math.random() * 0.1,
  }));
  return (
    <div className="cp06-warm-particles" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="cp06-warm-particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

/* ── organic wave divider ── */
function WaveDivider({
  flip = false,
  color = "var(--cp06-bg-alt)",
}: {
  flip?: boolean;
  color?: string;
}) {
  return (
    <div
      className={`cp06-wave-divider ${flip ? "cp06-wave-divider--flip" : ""}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="cp06-wave-svg"
      >
        <path
          d="M0,28 C240,52 480,4 720,28 C960,52 1200,4 1440,28 L1440,60 L0,60 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   Main Page
   ════════════════════════════════════════════════════ */
export default function Corporate06Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  useScrollReveal();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setShowTop(window.scrollY > 500);

      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? (window.scrollY / docH) * 100 : 0);

      const ids = [
        "services",
        "strengths",
        "message",
        "company",
        "history",
        "numbers",
        "partners",
        "news",
        "recruit",
        "access",
        "contact",
      ];
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 200) current = id;
      }
      setActiveSection(current);

      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const vh = window.innerHeight;
        if (rect.top < vh && rect.bottom > 0) {
          setTimelineProgress(
            Math.min(
              1,
              Math.max(0, (vh - rect.top) / (rect.height + vh * 0.5))
            )
          );
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    alert("お問い合わせありがとうございます。担当者より折り返しご連絡いたします。");
  }, []);

  const serviceImages = [
    "/keikamotsu-templates/images/service-ec.png",
    "/keikamotsu-templates/images/service-b2b.png",
    "/keikamotsu-templates/images/service-spot.png",
    "/keikamotsu-templates/images/service-route.png",
  ];

  return (
    <div className="theme-cp06">
      <div
        className="cp06-progress-bar"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* ─── HEADER ─── */}
      <header
        className={`cp06-header ${scrolled ? "cp06-header--scrolled" : ""}`}
      >
        <div className="cp06-header-inner">
          <a href="#" className="cp06-logo">
            <span className="cp06-logo-icon">GL</span>
            <span className="cp06-logo-text">{data.company.name}</span>
          </a>

          <nav className={`cp06-nav ${menuOpen ? "cp06-nav--open" : ""}`}>
            {data.navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`cp06-nav-link ${activeSection === l.href.replace("#", "") ? "cp06-nav-link--active" : ""}`}
                onClick={closeMenu}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <button
            className={`cp06-hamburger ${menuOpen ? "cp06-hamburger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニュー"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="cp06-overlay" onClick={closeMenu} aria-hidden="true" />
      )}

      {/* ─── HERO ─── */}
      <section className="cp06-hero" style={{ position: "relative", overflow: "hidden" }}>
        <video className="cp06-hero-video" autoPlay muted loop playsInline poster="/keikamotsu-templates/images/hero-bg.webp">
          <source src="/keikamotsu-templates/videos/hero-daytime.mp4" type="video/mp4" />
        </video>
        <Image
          src="/keikamotsu-templates/images/team.png"
          alt="チームの集合写真"
          fill
          style={{
            objectFit: "cover",
            opacity: 0.3,
            zIndex: 0,
            pointerEvents: "none",
          }}
          priority
        />
        <WarmParticles />
        <div className="cp06-hero-content cp06-reveal" style={{ position: "relative", zIndex: 1 }}>
          <p className="cp06-hero-label">地域をつなぐ、温かな物流</p>
          <h1 className="cp06-hero-headline">{data.hero.headline}</h1>
          <div className="cp06-hero-sub">
            {data.hero.subtext.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <a href="#contact" className="cp06-btn-primary">
            {data.hero.cta}
          </a>
        </div>
      </section>

      <WaveDivider color="var(--cp06-bg)" />

      {/* ─── SERVICES ─── */}
      <section id="services" className="cp06-section">
        <div className="cp06-container">
          <div className="cp06-section-header cp06-reveal">
            <span className="cp06-section-label">Services</span>
            <h2 className="cp06-section-title">事業内容</h2>
            <div className="cp06-wavy-line" aria-hidden="true" />
          </div>
          <div className="cp06-services-grid">
            {data.services.map((s, i) => (
              <article
                key={i}
                className="cp06-service-card cp06-reveal"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <Image
                  src={serviceImages[i]}
                  alt={s.title}
                  width={400}
                  height={250}
                  className="cp06-service-img"
                />
                <div className="cp06-service-body">
                  <div className="cp06-service-header">
                    <span className="cp06-service-icon">{s.icon}</span>
                    <span className="cp06-service-num">{s.num}</span>
                  </div>
                  <h3 className="cp06-service-title">{s.title}</h3>
                  <p className="cp06-service-text">{s.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider color="var(--cp06-bg-alt)" />

      {/* ─── STRENGTHS ─── */}
      <section id="strengths" className="cp06-section cp06-section--alt" style={{ position: "relative", overflow: "hidden" }}>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "-60px",
            bottom: "-40px",
            width: "340px",
            height: "340px",
            opacity: 0.1,
            borderRadius: "24px",
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <Image
            src="/keikamotsu-templates/images/reasons.png"
            alt=""
            width={340}
            height={340}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </div>
        <div className="cp06-container" style={{ position: "relative", zIndex: 1 }}>
          <div className="cp06-section-header cp06-reveal">
            <span className="cp06-section-label">Strengths</span>
            <h2 className="cp06-section-title">私たちの強み</h2>
            <div className="cp06-wavy-line" aria-hidden="true" />
          </div>
          <div className="cp06-strengths-list">
            {data.strengths.map((s, i) => (
              <div
                key={i}
                className="cp06-strength-card cp06-reveal"
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <div className="cp06-strength-num">{s.num}</div>
                <div className="cp06-strength-body">
                  <h3 className="cp06-strength-title">{s.title}</h3>
                  <p className="cp06-strength-text">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider flip color="var(--cp06-bg)" />

      {/* ─── CEO MESSAGE ─── */}
      <section id="message" className="cp06-section">
        <div className="cp06-container">
          <div className="cp06-section-header cp06-reveal">
            <span className="cp06-section-label">Message</span>
            <h2 className="cp06-section-title">代表メッセージ</h2>
            <div className="cp06-wavy-line" aria-hidden="true" />
          </div>
          <div className="cp06-message cp06-reveal">
            <div className="cp06-message-portrait">
              <Image
                src="/keikamotsu-templates/images/ceo-portrait.png"
                alt={`${data.ceoMessage.title} ${data.ceoMessage.name}`}
                width={280}
                height={350}
                className="cp06-ceo-img"
              />
            </div>
            <div className="cp06-message-content">
              <span className="cp06-message-quote" aria-hidden="true">
                &ldquo;
              </span>
              {data.ceoMessage.message.map((p, i) => (
                <p key={i} className="cp06-message-paragraph">
                  {p}
                </p>
              ))}
              <div className="cp06-message-signature">
                <span className="cp06-message-role">
                  {data.ceoMessage.title}
                </span>
                <span className="cp06-message-name">
                  {data.ceoMessage.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COMPANY OVERVIEW ─── */}
      <section id="company" className="cp06-section cp06-section--alt">
        <div className="cp06-container">
          <div className="cp06-section-header cp06-reveal">
            <span className="cp06-section-label">Company</span>
            <h2 className="cp06-section-title">会社概要</h2>
            <div className="cp06-wavy-line" aria-hidden="true" />
          </div>
          <div
            className="cp06-reveal"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.5fr",
              gap: "2rem",
              alignItems: "start",
            }}
          >
            <div style={{ borderRadius: "12px", overflow: "hidden" }}>
              <Image
                src="/keikamotsu-templates/images/company.png"
                alt="社屋外観"
                width={520}
                height={380}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
            </div>
            <dl className="cp06-overview-table">
              {data.companyOverview.map((item, i) => (
                <div key={i} className="cp06-overview-row">
                  <dt className="cp06-overview-dt">{item.dt}</dt>
                  <dd className="cp06-overview-dd">{item.dd}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <WaveDivider color="var(--cp06-bg)" />

      {/* ─── HISTORY ─── */}
      <section id="history" className="cp06-section">
        <div className="cp06-container">
          <div className="cp06-section-header cp06-reveal">
            <span className="cp06-section-label">History</span>
            <h2 className="cp06-section-title">沿革</h2>
            <div className="cp06-wavy-line" aria-hidden="true" />
          </div>
          <div className="cp06-timeline" ref={timelineRef}>
            <div
              className="cp06-timeline-line"
              style={{ height: `${timelineProgress * 100}%` }}
              aria-hidden="true"
            />
            {data.history.map((h, i) => {
              const dotActive = timelineProgress > i / data.history.length;
              return (
                <div
                  key={i}
                  className="cp06-timeline-item cp06-reveal"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div
                    className={`cp06-timeline-dot ${dotActive ? "cp06-timeline-dot--active" : ""}`}
                  />
                  <div className="cp06-timeline-year">{h.year}</div>
                  <div className="cp06-timeline-event">{h.event}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── NUMBERS ─── */}
      <section id="numbers" className="cp06-section cp06-section--warm" style={{ position: "relative", overflow: "hidden" }}>
        <Image
          src="/keikamotsu-templates/images/loading.png"
          alt=""
          fill
          style={{
            objectFit: "cover",
            opacity: 0.18,
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
        <div className="cp06-container" style={{ position: "relative", zIndex: 1 }}>
          <div className="cp06-section-header cp06-section-header--light cp06-reveal">
            <span className="cp06-section-label">Numbers</span>
            <h2 className="cp06-section-title">数字で見る実績</h2>
            <div className="cp06-wavy-line" aria-hidden="true" />
          </div>
          <div className="cp06-numbers-grid">
            {data.numbers.map((n, i) => (
              <div
                key={i}
                className="cp06-number-card cp06-reveal"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <AnimatedCounter value={n.value} suffix={n.suffix} />
                <span className="cp06-number-label">{n.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider color="var(--cp06-bg)" />

      {/* ─── PARTNERS ─── */}
      <section id="partners" className="cp06-section">
        <div className="cp06-container">
          <div className="cp06-section-header cp06-reveal">
            <span className="cp06-section-label">Partners</span>
            <h2 className="cp06-section-title">主要取引先</h2>
            <div className="cp06-wavy-line" aria-hidden="true" />
          </div>
          <div className="cp06-partners-grid">
            {data.partners.map((p, i) => (
              <div
                key={i}
                className="cp06-partner-card cp06-reveal"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="cp06-partner-icon" aria-hidden="true">
                  {p.name.charAt(0)}
                </div>
                <h3 className="cp06-partner-name">{p.name}</h3>
                <span className="cp06-partner-industry">{p.industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWS ─── */}
      <section id="news" className="cp06-section cp06-section--alt">
        <div className="cp06-container">
          <div className="cp06-section-header cp06-reveal">
            <span className="cp06-section-label">News</span>
            <h2 className="cp06-section-title">お知らせ</h2>
            <div className="cp06-wavy-line" aria-hidden="true" />
          </div>
          <ul className="cp06-news-list">
            {data.news.map((n, i) => (
              <li
                key={i}
                className="cp06-news-item cp06-reveal"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <time className="cp06-news-date">{n.date}</time>
                <span
                  className={`cp06-news-tag cp06-news-tag--${n.tagStyle}`}
                >
                  {n.tag}
                </span>
                <span className="cp06-news-title">{n.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <WaveDivider flip color="var(--cp06-primary)" />

      {/* ─── RECRUIT CTA ─── */}
      <section
        id="recruit"
        className="cp06-section cp06-recruit-section"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <Image
          src="/keikamotsu-templates/images/jobs.png"
          alt="求人イメージ"
          fill
          style={{
            objectFit: "cover",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(139,90,43,0.85) 0%, rgba(78,52,28,0.90) 100%)",
            zIndex: 1,
          }}
        />
        <div className="cp06-container" style={{ position: "relative", zIndex: 2 }}>
          <div className="cp06-recruit cp06-reveal">
            <h2 className="cp06-recruit-heading">{data.recruit.heading}</h2>
            <p className="cp06-recruit-text">{data.recruit.text}</p>
            <a href={data.recruit.link} className="cp06-btn-primary">
              {data.recruit.cta}
            </a>
          </div>
        </div>
      </section>

      {/* ─── ACCESS ─── */}
      <section id="access" className="cp06-section">
        <div className="cp06-container">
          <div className="cp06-section-header cp06-reveal">
            <span className="cp06-section-label">Access</span>
            <h2 className="cp06-section-title">{data.access.heading}</h2>
            <div className="cp06-wavy-line" aria-hidden="true" />
          </div>
          <div className="cp06-access cp06-reveal">
            <div className="cp06-access-info">
              <p>
                <span className="cp06-access-label">所在地</span>
                {data.access.address}
              </p>
              <p>
                <span className="cp06-access-label">最寄り駅</span>
                {data.access.nearestStation}
              </p>
              <p>
                <span className="cp06-access-label">お車の場合</span>
                {data.access.mapNote}
              </p>
            </div>
            <div className="cp06-access-map">
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

      {/* ─── CONTACT ─── */}
      <section id="contact" className="cp06-section cp06-section--alt">
        <div className="cp06-container">
          <div className="cp06-section-header cp06-reveal">
            <span className="cp06-section-label">Contact</span>
            <h2 className="cp06-section-title">{data.contact.heading}</h2>
            <div className="cp06-wavy-line" aria-hidden="true" />
          </div>
          <p className="cp06-contact-intro cp06-reveal">{data.contact.intro}</p>
          <form className="cp06-form cp06-reveal" onSubmit={handleSubmit}>
            {data.contact.fields.map((f) => (
              <div
                key={f.name}
                className={`cp06-form-group ${f.type === "textarea" ? "cp06-form-group--full" : ""}`}
              >
                <label className="cp06-form-label">
                  {f.label}
                  {f.required && <span className="cp06-form-req">必須</span>}
                </label>
                {f.type === "textarea" ? (
                  <textarea
                    name={f.name}
                    className="cp06-form-textarea"
                    rows={5}
                    required={f.required}
                  />
                ) : (
                  <input
                    type={f.type}
                    name={f.name}
                    className="cp06-form-input"
                    required={f.required}
                  />
                )}
              </div>
            ))}
            <div className="cp06-form-group cp06-form-group--full">
              <label className="cp06-form-checkbox-label">
                <input type="checkbox" required className="cp06-form-checkbox" />
                プライバシーポリシーに同意する
              </label>
            </div>
            <div className="cp06-form-group cp06-form-group--full cp06-form-submit-wrap">
              <button type="submit" className="cp06-form-submit">
                送信する
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ─── BACK TO TOP ─── */}
      <button
        className={`cp06-back-top ${showTop ? "cp06-back-top--visible" : ""}`}
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
      <footer className="cp06-footer">
        <div className="cp06-footer-inner">
          <div className="cp06-footer-top">
            <div className="cp06-footer-brand">
              <span className="cp06-footer-logo-icon">GL</span>
              <span className="cp06-footer-company">{data.company.name}</span>
            </div>
            <p className="cp06-footer-catchphrase">
              {data.footer.catchphrase}
            </p>
          </div>
          <div className="cp06-footer-middle">
            <div className="cp06-footer-info">
              <p>
                〒{data.company.postalCode} {data.company.address}
              </p>
              <p>TEL: {data.company.phone}</p>
              <p>{data.company.hours}</p>
            </div>
            <nav className="cp06-footer-nav">
              {data.navLinks.slice(0, 8).map((l) => (
                <a key={l.href} href={l.href} className="cp06-footer-link">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="cp06-footer-bottom">
            <small>
              &copy; {new Date().getFullYear()} {data.company.name} All Rights
              Reserved.
            </small>
          </div>
        </div>
      </footer>
    </div>
  );
}
