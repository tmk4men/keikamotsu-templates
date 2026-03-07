"use client";
/* ===================================================
   Corporate Template 07 — ボールドインパクト
   力強さ・スピード感・ダークネイビー×オレンジ
   =================================================== */

import "./styles.css";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import * as data from "@/data/corporateSiteData";

/* ── scroll-reveal hook ── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".cp07-reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("cp07-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
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
    <span ref={ref} className="cp07-counter-value">
      {display}
      <span className="cp07-counter-suffix">{suffix}</span>
    </span>
  );
}

/* ── speed lines background ── */
function SpeedLines() {
  const lines = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    top: 10 + Math.random() * 80,
    width: 60 + Math.random() * 200,
    delay: Math.random() * 4,
    duration: 2 + Math.random() * 3,
    opacity: 0.03 + Math.random() * 0.05,
  }));
  return (
    <div className="cp07-speed-lines" aria-hidden="true">
      {lines.map((l) => (
        <span
          key={l.id}
          className="cp07-speed-line"
          style={{
            top: `${l.top}%`,
            width: l.width,
            animationDelay: `${l.delay}s`,
            animationDuration: `${l.duration}s`,
            opacity: l.opacity,
          }}
        />
      ))}
    </div>
  );
}

/* ── skew divider ── */
function SkewDivider({ color = "var(--cp07-bg-alt)" }: { color?: string }) {
  return (
    <div className="cp07-skew-divider" aria-hidden="true">
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="cp07-skew-svg">
        <polygon points="0,60 1440,0 1440,60" fill={color} />
      </svg>
    </div>
  );
}

function SkewDividerFlip({ color = "var(--cp07-bg)" }: { color?: string }) {
  return (
    <div className="cp07-skew-divider cp07-skew-divider--flip" aria-hidden="true">
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="cp07-skew-svg">
        <polygon points="0,0 1440,60 0,60" fill={color} />
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   Main Page
   ════════════════════════════════════════════════════ */
export default function Corporate07Page() {
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

      const ids = ["services", "strengths", "message", "company", "history", "numbers", "partners", "news", "recruit", "access", "contact"];
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
          setTimelineProgress(Math.min(1, Math.max(0, (vh - rect.top) / (rect.height + vh * 0.5))));
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    alert("お問い合わせありがとうございます。担当者より折り返しご連絡いたします。");
  }, []);

  const strengthImages = [
    "/keikamotsu-templates/images/reasons.png",
    "/keikamotsu-templates/images/workplace.png",
    "/keikamotsu-templates/images/vehicle.png",
  ];

  const serviceImages = [
    "/keikamotsu-templates/images/service-ec.png",
    "/keikamotsu-templates/images/service-b2b.png",
    "/keikamotsu-templates/images/service-spot.png",
    "/keikamotsu-templates/images/service-route.png",
  ];

  return (
    <div className="theme-cp07">
      <div className="cp07-progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* ─── HEADER ─── */}
      <header className={`cp07-header ${scrolled ? "cp07-header--scrolled" : ""}`}>
        <div className="cp07-header-inner">
          <a href="#" className="cp07-logo">
            <span className="cp07-logo-mark">GL</span>
            <span className="cp07-logo-text">{data.company.nameEn}</span>
          </a>

          <nav className={`cp07-nav ${menuOpen ? "cp07-nav--open" : ""}`}>
            {data.navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`cp07-nav-link ${activeSection === l.href.replace("#", "") ? "cp07-nav-link--active" : ""}`}
                onClick={closeMenu}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <button
            className={`cp07-hamburger ${menuOpen ? "cp07-hamburger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニュー"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {menuOpen && <div className="cp07-overlay" onClick={closeMenu} aria-hidden="true" />}

      {/* ─── HERO ─── */}
      <section className="cp07-hero" style={{ position: "relative", overflow: "hidden" }}>
        <Image
          src="/keikamotsu-templates/images/delivery.png"
          alt="配達風景"
          fill
          style={{ objectFit: "cover", opacity: 0.25, position: "absolute", top: 0, left: 0, zIndex: 0 }}
          priority
        />
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "linear-gradient(135deg, rgba(10,20,40,0.85) 0%, rgba(10,20,40,0.6) 100%)", zIndex: 1 }} aria-hidden="true" />
        <SpeedLines />
        <div className="cp07-hero-content cp07-reveal" style={{ position: "relative", zIndex: 2 }}>
          <h1 className="cp07-hero-headline">
            物流の力で、<br />未来を切り拓く。
          </h1>
          <div className="cp07-hero-sub">
            {data.hero.subtext.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <a href="#contact" className="cp07-btn-primary">{data.hero.cta}</a>
        </div>
        <div className="cp07-hero-accent" aria-hidden="true" />
      </section>

      <SkewDivider color="var(--cp07-bg)" />

      {/* ─── SERVICES ─── */}
      <section id="services" className="cp07-section">
        <div className="cp07-container">
          <div className="cp07-section-header cp07-reveal">
            <span className="cp07-section-label">Services</span>
            <h2 className="cp07-section-title">事業内容</h2>
            <div className="cp07-title-bar" />
          </div>
          <div className="cp07-services-grid">
            {data.services.map((s, i) => (
              <article key={i} className={`cp07-service-card cp07-reveal cp07-reveal--${i % 2 === 0 ? "left" : "right"}`} style={{ transitionDelay: `${i * 0.1}s` }}>
                <Image src={serviceImages[i]} alt={s.title} width={400} height={250} className="cp07-service-img" />
                <div className="cp07-service-body">
                  <div className="cp07-service-num-wrap">
                    <span className="cp07-service-num">{s.num}</span>
                    <span className="cp07-service-icon">{s.icon}</span>
                  </div>
                  <h3 className="cp07-service-title">{s.title}</h3>
                  <p className="cp07-service-text">{s.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SkewDividerFlip color="var(--cp07-bg-alt)" />

      {/* ─── STRENGTHS ─── */}
      <section id="strengths" className="cp07-section cp07-section--alt">
        <div className="cp07-container">
          <div className="cp07-section-header cp07-reveal">
            <span className="cp07-section-label">Strengths</span>
            <h2 className="cp07-section-title">私たちの強み</h2>
            <div className="cp07-title-bar" />
          </div>
          <div className="cp07-strengths-list">
            {data.strengths.map((s, i) => (
              <div key={i} className={`cp07-strength-card cp07-reveal cp07-reveal--${i % 2 === 0 ? "left" : "right"}`} style={{ transitionDelay: `${i * 0.12}s` }}>
                {strengthImages[i] && (
                  <div style={{ width: "120px", minWidth: "120px", height: "120px", borderRadius: "8px", overflow: "hidden", border: "2px solid var(--cp07-accent, #f57c00)", flexShrink: 0 }}>
                    <Image
                      src={strengthImages[i]}
                      alt={s.title}
                      width={120}
                      height={120}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>
                )}
                <div className="cp07-strength-num">{s.num}</div>
                <div className="cp07-strength-body">
                  <h3 className="cp07-strength-title">{s.title}</h3>
                  <p className="cp07-strength-text">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SkewDivider color="var(--cp07-bg)" />

      {/* ─── CEO MESSAGE ─── */}
      <section id="message" className="cp07-section">
        <div className="cp07-container">
          <div className="cp07-section-header cp07-reveal">
            <span className="cp07-section-label">Message</span>
            <h2 className="cp07-section-title">代表メッセージ</h2>
            <div className="cp07-title-bar" />
          </div>
          <div className="cp07-message cp07-reveal">
            <div className="cp07-message-portrait">
              <Image src="/keikamotsu-templates/images/ceo-portrait.png" alt={`${data.ceoMessage.title} ${data.ceoMessage.name}`} width={280} height={350} className="cp07-ceo-img" />
            </div>
            <div className="cp07-message-content">
              {data.ceoMessage.message.map((p, i) => (
                <p key={i} className="cp07-message-paragraph">{p}</p>
              ))}
              <div className="cp07-message-signature">
                <span className="cp07-message-role">{data.ceoMessage.title}</span>
                <span className="cp07-message-name">{data.ceoMessage.name}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COMPANY OVERVIEW ─── */}
      <section id="company" className="cp07-section cp07-section--alt">
        <div className="cp07-container">
          <div className="cp07-section-header cp07-reveal">
            <span className="cp07-section-label">Company</span>
            <h2 className="cp07-section-title">会社概要</h2>
            <div className="cp07-title-bar" />
          </div>
          <div className="cp07-reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", alignItems: "start" }}>
            <dl className="cp07-overview-table" style={{ margin: 0 }}>
              {data.companyOverview.map((item, i) => (
                <div key={i} className="cp07-overview-row">
                  <dt className="cp07-overview-dt">{item.dt}</dt>
                  <dd className="cp07-overview-dd">{item.dd}</dd>
                </div>
              ))}
            </dl>
            <div style={{ position: "relative", borderRight: "4px solid var(--cp07-accent, #f57c00)", borderBottom: "4px solid var(--cp07-accent, #f57c00)", borderRadius: "8px", overflow: "hidden" }}>
              <Image
                src="/keikamotsu-templates/images/company.png"
                alt="社屋外観"
                width={560}
                height={380}
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "8px" }}
              />
            </div>
          </div>
        </div>
      </section>

      <SkewDividerFlip color="var(--cp07-bg)" />

      {/* ─── HISTORY ─── */}
      <section id="history" className="cp07-section">
        <div className="cp07-container">
          <div className="cp07-section-header cp07-reveal">
            <span className="cp07-section-label">History</span>
            <h2 className="cp07-section-title">沿革</h2>
            <div className="cp07-title-bar" />
          </div>
          <div className="cp07-timeline" ref={timelineRef}>
            <div className="cp07-timeline-line" style={{ height: `${timelineProgress * 100}%` }} aria-hidden="true" />
            {data.history.map((h, i) => {
              const dotActive = timelineProgress > i / data.history.length;
              return (
                <div key={i} className="cp07-timeline-item cp07-reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className={`cp07-timeline-dot ${dotActive ? "cp07-timeline-dot--active" : ""}`} />
                  <div className="cp07-timeline-year">{h.year}</div>
                  <div className="cp07-timeline-event">{h.event}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── NUMBERS ─── */}
      <section id="numbers" className="cp07-section cp07-section--numbers" style={{ position: "relative", overflow: "hidden" }}>
        <Image
          src="/keikamotsu-templates/images/team.png"
          alt="チーム"
          fill
          style={{ objectFit: "cover", opacity: 0.15, position: "absolute", top: 0, left: 0, zIndex: 0 }}
        />
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(10,20,40,0.7)", zIndex: 1 }} aria-hidden="true" />
        <div className="cp07-container" style={{ position: "relative", zIndex: 2 }}>
          <div className="cp07-section-header cp07-section-header--light cp07-reveal">
            <span className="cp07-section-label">Numbers</span>
            <h2 className="cp07-section-title">数字で見る実績</h2>
            <div className="cp07-title-bar" />
          </div>
          <div className="cp07-numbers-grid">
            {data.numbers.map((n, i) => (
              <div key={i} className="cp07-number-card cp07-reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <AnimatedCounter value={n.value} suffix={n.suffix} />
                <span className="cp07-number-label">{n.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SkewDivider color="var(--cp07-bg)" />

      {/* ─── PARTNERS ─── */}
      <section id="partners" className="cp07-section">
        <div className="cp07-container">
          <div className="cp07-section-header cp07-reveal">
            <span className="cp07-section-label">Partners</span>
            <h2 className="cp07-section-title">主要取引先</h2>
            <div className="cp07-title-bar" />
          </div>
          <div className="cp07-partners-grid">
            {data.partners.map((p, i) => (
              <div key={i} className="cp07-partner-card cp07-reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="cp07-partner-icon">{p.name.charAt(0)}</div>
                <h3 className="cp07-partner-name">{p.name}</h3>
                <span className="cp07-partner-industry">{p.industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWS ─── */}
      <section id="news" className="cp07-section cp07-section--alt">
        <div className="cp07-container">
          <div className="cp07-section-header cp07-reveal">
            <span className="cp07-section-label">News</span>
            <h2 className="cp07-section-title">お知らせ</h2>
            <div className="cp07-title-bar" />
          </div>
          <ul className="cp07-news-list">
            {data.news.map((n, i) => (
              <li key={i} className="cp07-news-item cp07-reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                <time className="cp07-news-date">{n.date}</time>
                <span className={`cp07-news-tag cp07-news-tag--${n.tagStyle}`}>{n.tag}</span>
                <span className="cp07-news-title">{n.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SkewDividerFlip color="var(--cp07-accent)" />

      {/* ─── RECRUIT CTA ─── */}
      <section id="recruit" className="cp07-section cp07-recruit-section" style={{ position: "relative", overflow: "hidden" }}>
        <Image
          src="/keikamotsu-templates/images/jobs.png"
          alt="求人イメージ"
          fill
          style={{ objectFit: "cover", opacity: 0.2, position: "absolute", top: 0, left: 0, zIndex: 0 }}
        />
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(10,20,40,0.6)", zIndex: 1 }} aria-hidden="true" />
        <div className="cp07-container" style={{ position: "relative", zIndex: 2 }}>
          <div className="cp07-recruit cp07-reveal">
            <h2 className="cp07-recruit-heading">{data.recruit.heading}</h2>
            <p className="cp07-recruit-text">{data.recruit.text}</p>
            <a href={data.recruit.link} className="cp07-btn-primary cp07-btn-primary--light">{data.recruit.cta}</a>
          </div>
        </div>
      </section>

      {/* ─── ACCESS ─── */}
      <section id="access" className="cp07-section">
        <div className="cp07-container">
          <div className="cp07-section-header cp07-reveal">
            <span className="cp07-section-label">Access</span>
            <h2 className="cp07-section-title">{data.access.heading}</h2>
            <div className="cp07-title-bar" />
          </div>
          <div className="cp07-access cp07-reveal">
            <div className="cp07-access-info">
              <p><span className="cp07-access-label">所在地</span>{data.access.address}</p>
              <p><span className="cp07-access-label">最寄り駅</span>{data.access.nearestStation}</p>
              <p><span className="cp07-access-label">お車の場合</span>{data.access.mapNote}</p>
            </div>
            <div className="cp07-access-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.1!2d135.505!3d34.685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z5aSn6Ziq5bqc5aSn6Ziq5biC5Lit5aSu5Yy65pys55S6!5e0!3m2!1sja!2sjp!4v1"
                width="100%" height="350" style={{ border: 0 }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" title="Google Maps"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="cp07-section cp07-section--alt">
        <div className="cp07-container">
          <div className="cp07-section-header cp07-reveal">
            <span className="cp07-section-label">Contact</span>
            <h2 className="cp07-section-title">{data.contact.heading}</h2>
            <div className="cp07-title-bar" />
          </div>
          <p className="cp07-contact-intro cp07-reveal">{data.contact.intro}</p>
          <form className="cp07-form cp07-reveal" onSubmit={handleSubmit}>
            {data.contact.fields.map((f) => (
              <div key={f.name} className={`cp07-form-group ${f.type === "textarea" ? "cp07-form-group--full" : ""}`}>
                <label className="cp07-form-label">
                  {f.label}
                  {f.required && <span className="cp07-form-req">必須</span>}
                </label>
                {f.type === "textarea" ? (
                  <textarea name={f.name} className="cp07-form-textarea" rows={5} required={f.required} />
                ) : (
                  <input type={f.type} name={f.name} className="cp07-form-input" required={f.required} />
                )}
              </div>
            ))}
            <div className="cp07-form-group cp07-form-group--full">
              <label className="cp07-form-checkbox-label">
                <input type="checkbox" required className="cp07-form-checkbox" />
                プライバシーポリシーに同意する
              </label>
            </div>
            <div className="cp07-form-group cp07-form-group--full cp07-form-submit-wrap">
              <button type="submit" className="cp07-form-submit">送信する</button>
            </div>
          </form>
        </div>
      </section>

      {/* ─── BACK TO TOP ─── */}
      <button
        className={`cp07-back-top ${showTop ? "cp07-back-top--visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="トップへ戻る"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 16V4M4 10l6-6 6 6" />
        </svg>
      </button>

      {/* ─── FOOTER ─── */}
      <footer className="cp07-footer">
        <div className="cp07-footer-inner">
          <div className="cp07-footer-top">
            <div className="cp07-footer-brand">
              <span className="cp07-footer-logo-mark">GL</span>
              <span className="cp07-footer-company-en">{data.company.nameEn}</span>
            </div>
            <p className="cp07-footer-catchphrase">{data.footer.catchphrase}</p>
          </div>
          <div className="cp07-footer-middle">
            <div className="cp07-footer-info">
              <p>{data.company.name}</p>
              <p>〒{data.company.postalCode} {data.company.address}</p>
              <p>TEL: {data.company.phone}</p>
              <p>{data.company.hours}</p>
            </div>
            <nav className="cp07-footer-nav">
              {data.navLinks.slice(0, 8).map((l) => (
                <a key={l.href} href={l.href} className="cp07-footer-link">{l.label}</a>
              ))}
            </nav>
          </div>
          <div className="cp07-footer-bottom">
            <small>&copy; {new Date().getFullYear()} {data.company.name} All Rights Reserved.</small>
          </div>
        </div>
      </footer>
    </div>
  );
}
