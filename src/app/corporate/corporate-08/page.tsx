"use client";
/* ===================================================
   Corporate Template 08 — クリアブリーズ
   清潔感・信頼・透明性・スカイブルー×ミントグリーン
   =================================================== */

import "./styles.css";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import * as data from "@/data/corporateSiteData";

/* ── scroll-reveal hook ── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".cp08-reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("cp08-visible");
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
    <span ref={ref} className="cp08-counter-value">
      {display}
      <span className="cp08-counter-suffix">{suffix}</span>
    </span>
  );
}

/* ── floating bubbles ── */
function FloatingBubbles() {
  const bubbles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: 6 + Math.random() * 16,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 10 + Math.random() * 12,
    opacity: 0.04 + Math.random() * 0.08,
  }));
  return (
    <div className="cp08-bubbles" aria-hidden="true">
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="cp08-bubble"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.left}%`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
            opacity: b.opacity,
          }}
        />
      ))}
    </div>
  );
}

/* ── wave divider ── */
function WaveDivider({ flip = false, color = "var(--cp08-bg-alt)" }: { flip?: boolean; color?: string }) {
  return (
    <div className={`cp08-wave-divider ${flip ? "cp08-wave-divider--flip" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="cp08-wave-svg">
        <path d="M0,20 C360,50 720,0 1080,30 C1260,42 1380,10 1440,20 L1440,60 L0,60 Z" fill={color} />
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   Main Page
   ════════════════════════════════════════════════════ */
export default function Corporate08Page() {
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

  const serviceImages = [
    "/keikamotsu-templates/images/service-ec.png",
    "/keikamotsu-templates/images/service-b2b.png",
    "/keikamotsu-templates/images/service-spot.png",
    "/keikamotsu-templates/images/service-route.png",
  ];

  return (
    <div className="theme-cp08">
      <div className="cp08-progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* ─── HEADER ─── */}
      <header className={`cp08-header ${scrolled ? "cp08-header--scrolled" : ""}`}>
        <div className="cp08-header-inner">
          <a href="#" className="cp08-logo">
            <span className="cp08-logo-mark">GL</span>
            <span className="cp08-logo-text">{data.company.name}</span>
          </a>

          <nav className={`cp08-nav ${menuOpen ? "cp08-nav--open" : ""}`}>
            {data.navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`cp08-nav-link ${activeSection === l.href.replace("#", "") ? "cp08-nav-link--active" : ""}`}
                onClick={closeMenu}
              >
                {l.label}
              </a>
            ))}
            <a href="#contact" className="cp08-nav-cta" onClick={closeMenu}>お問い合わせ</a>
          </nav>

          <button
            className={`cp08-hamburger ${menuOpen ? "cp08-hamburger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニュー"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {menuOpen && <div className="cp08-overlay" onClick={closeMenu} aria-hidden="true" />}

      {/* ─── HERO ─── */}
      <section className="cp08-hero" style={{ position: "relative", overflow: "hidden" }}>
        <video className="cp08-hero-video" autoPlay muted loop playsInline poster="/keikamotsu-templates/images/hero-bg.webp">
          <source src="/keikamotsu-templates/videos/hero-daytime.mp4" type="video/mp4" />
        </video>
        <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
          <Image
            src="/keikamotsu-templates/images/vehicle.png"
            alt=""
            fill
            style={{ objectFit: "cover", opacity: 0.25 }}
            aria-hidden="true"
          />
        </div>
        <FloatingBubbles />
        <div className="cp08-hero-content cp08-reveal">
          <p className="cp08-hero-label">Trusted Logistics Partner</p>
          <h1 className="cp08-hero-headline">{data.hero.headline}</h1>
          <div className="cp08-hero-sub">
            {data.hero.subtext.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <a href="#contact" className="cp08-btn-primary">{data.hero.cta}</a>
        </div>
      </section>

      <WaveDivider color="var(--cp08-bg)" />

      {/* ─── SERVICES ─── */}
      <section id="services" className="cp08-section">
        <div className="cp08-container">
          <div className="cp08-section-header cp08-reveal">
            <span className="cp08-section-label">Services</span>
            <h2 className="cp08-section-title">事業内容</h2>
            <div className="cp08-title-line" />
          </div>
          <div className="cp08-services-grid">
            {data.services.map((s, i) => (
              <article key={i} className="cp08-service-card cp08-reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <Image src={serviceImages[i]} alt={s.title} width={400} height={250} className="cp08-service-img" />
                <div className="cp08-service-body">
                  <div className="cp08-service-meta">
                    <span className="cp08-service-icon">{s.icon}</span>
                    <span className="cp08-service-num">{s.num}</span>
                  </div>
                  <h3 className="cp08-service-title">{s.title}</h3>
                  <p className="cp08-service-text">{s.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider color="var(--cp08-bg-alt)" />

      {/* ─── STRENGTHS ─── */}
      <section id="strengths" className="cp08-section cp08-section--alt">
        <div className="cp08-container">
          <div className="cp08-section-header cp08-reveal">
            <span className="cp08-section-label">Strengths</span>
            <h2 className="cp08-section-title">私たちの強み</h2>
            <div className="cp08-title-line" />
          </div>
          <div className="cp08-strengths-grid">
            {data.strengths.map((s, i) => (
              <div key={i} className="cp08-strength-card cp08-reveal" style={{ transitionDelay: `${i * 0.12}s` }}>
                <div className="cp08-strength-num">{s.num}</div>
                <h3 className="cp08-strength-title">{s.title}</h3>
                <p className="cp08-strength-text">{s.text}</p>
              </div>
            ))}
          </div>
          <div
            className="cp08-reveal"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
              marginTop: 48,
            }}
          >
            {[
              { src: "/keikamotsu-templates/images/reasons.png", alt: "研修風景" },
              { src: "/keikamotsu-templates/images/workplace.png", alt: "事務所" },
              { src: "/keikamotsu-templates/images/team.png", alt: "チーム" },
            ].map((img, i) => (
              <div
                key={i}
                style={{
                  borderRadius: 10,
                  overflow: "hidden",
                  lineHeight: 0,
                  opacity: 0.85,
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={400}
                  height={260}
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider flip color="var(--cp08-bg)" />

      {/* ─── CEO MESSAGE ─── */}
      <section id="message" className="cp08-section">
        <div className="cp08-container">
          <div className="cp08-section-header cp08-reveal">
            <span className="cp08-section-label">Message</span>
            <h2 className="cp08-section-title">代表メッセージ</h2>
            <div className="cp08-title-line" />
          </div>
          <div className="cp08-message cp08-reveal">
            <div className="cp08-message-portrait">
              <Image src="/keikamotsu-templates/images/ceo-portrait.png" alt={`${data.ceoMessage.title} ${data.ceoMessage.name}`} width={280} height={350} className="cp08-ceo-img" />
            </div>
            <div className="cp08-message-content">
              {data.ceoMessage.message.map((p, i) => (
                <p key={i} className="cp08-message-paragraph">{p}</p>
              ))}
              <div className="cp08-message-signature">
                <span className="cp08-message-role">{data.ceoMessage.title}</span>
                <span className="cp08-message-name">{data.ceoMessage.name}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COMPANY OVERVIEW ─── */}
      <section id="company" className="cp08-section cp08-section--alt">
        <div className="cp08-container">
          <div className="cp08-section-header cp08-reveal">
            <span className="cp08-section-label">Company</span>
            <h2 className="cp08-section-title">会社概要</h2>
            <div className="cp08-title-line" />
          </div>
          <div className="cp08-reveal" style={{ marginBottom: 32, borderRadius: 12, overflow: "hidden", lineHeight: 0 }}>
            <Image
              src="/keikamotsu-templates/images/company.png"
              alt="社屋外観"
              width={1200}
              height={400}
              style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: 12, maxHeight: 360 }}
            />
          </div>
          <dl className="cp08-overview-table cp08-reveal">
            {data.companyOverview.map((item, i) => (
              <div key={i} className="cp08-overview-row">
                <dt className="cp08-overview-dt">{item.dt}</dt>
                <dd className="cp08-overview-dd">{item.dd}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <WaveDivider color="var(--cp08-bg)" />

      {/* ─── HISTORY ─── */}
      <section id="history" className="cp08-section">
        <div className="cp08-container">
          <div className="cp08-section-header cp08-reveal">
            <span className="cp08-section-label">History</span>
            <h2 className="cp08-section-title">沿革</h2>
            <div className="cp08-title-line" />
          </div>
          <div className="cp08-timeline" ref={timelineRef}>
            <div className="cp08-timeline-line" style={{ height: `${timelineProgress * 100}%` }} aria-hidden="true" />
            {data.history.map((h, i) => {
              const dotActive = timelineProgress > i / data.history.length;
              return (
                <div key={i} className="cp08-timeline-item cp08-reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className={`cp08-timeline-dot ${dotActive ? "cp08-timeline-dot--active" : ""}`} />
                  <div className="cp08-timeline-year">{h.year}</div>
                  <div className="cp08-timeline-event">{h.event}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── NUMBERS ─── */}
      <section id="numbers" className="cp08-section cp08-section--numbers" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
          <Image
            src="/keikamotsu-templates/images/loading.png"
            alt=""
            fill
            style={{ objectFit: "cover", opacity: 0.2 }}
            aria-hidden="true"
          />
        </div>
        <div className="cp08-container" style={{ position: "relative", zIndex: 1 }}>
          <div className="cp08-section-header cp08-section-header--light cp08-reveal">
            <span className="cp08-section-label">Numbers</span>
            <h2 className="cp08-section-title">数字で見る実績</h2>
            <div className="cp08-title-line" />
          </div>
          <div className="cp08-numbers-grid">
            {data.numbers.map((n, i) => (
              <div key={i} className="cp08-number-card cp08-reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <AnimatedCounter value={n.value} suffix={n.suffix} />
                <span className="cp08-number-label">{n.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider color="var(--cp08-bg)" />

      {/* ─── PARTNERS ─── */}
      <section id="partners" className="cp08-section">
        <div className="cp08-container">
          <div className="cp08-section-header cp08-reveal">
            <span className="cp08-section-label">Partners</span>
            <h2 className="cp08-section-title">主要取引先</h2>
            <div className="cp08-title-line" />
          </div>
          <div className="cp08-partners-grid">
            {data.partners.map((p, i) => (
              <div key={i} className="cp08-partner-card cp08-reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="cp08-partner-icon">{p.name.charAt(0)}</div>
                <h3 className="cp08-partner-name">{p.name}</h3>
                <span className="cp08-partner-industry">{p.industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWS ─── */}
      <section id="news" className="cp08-section cp08-section--alt">
        <div className="cp08-container">
          <div className="cp08-section-header cp08-reveal">
            <span className="cp08-section-label">News</span>
            <h2 className="cp08-section-title">お知らせ</h2>
            <div className="cp08-title-line" />
          </div>
          <ul className="cp08-news-list">
            {data.news.map((n, i) => (
              <li key={i} className="cp08-news-item cp08-reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                <time className="cp08-news-date">{n.date}</time>
                <span className={`cp08-news-tag cp08-news-tag--${n.tagStyle}`}>{n.tag}</span>
                <span className="cp08-news-title">{n.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <WaveDivider flip color="var(--cp08-primary)" />

      {/* ─── RECRUIT CTA ─── */}
      <section id="recruit" className="cp08-section cp08-recruit-section" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
          <Image
            src="/keikamotsu-templates/images/jobs.png"
            alt=""
            fill
            style={{ objectFit: "cover", opacity: 0.28 }}
            aria-hidden="true"
          />
          <div style={{ position: "absolute", inset: 0, background: "rgba(56, 189, 248, 0.25)" }} />
        </div>
        <div className="cp08-container" style={{ position: "relative", zIndex: 1 }}>
          <div className="cp08-recruit cp08-reveal">
            <h2 className="cp08-recruit-heading">{data.recruit.heading}</h2>
            <p className="cp08-recruit-text">{data.recruit.text}</p>
            <a href={data.recruit.link} className="cp08-btn-primary cp08-btn-primary--white">{data.recruit.cta}</a>
          </div>
        </div>
      </section>

      {/* ─── ACCESS ─── */}
      <section id="access" className="cp08-section">
        <div className="cp08-container">
          <div className="cp08-section-header cp08-reveal">
            <span className="cp08-section-label">Access</span>
            <h2 className="cp08-section-title">{data.access.heading}</h2>
            <div className="cp08-title-line" />
          </div>
          <div className="cp08-access cp08-reveal">
            <div className="cp08-access-info">
              <p><span className="cp08-access-label">所在地</span>{data.access.address}</p>
              <p><span className="cp08-access-label">最寄り駅</span>{data.access.nearestStation}</p>
              <p><span className="cp08-access-label">お車の場合</span>{data.access.mapNote}</p>
            </div>
            <div className="cp08-access-map">
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
      <section id="contact" className="cp08-section cp08-section--alt">
        <div className="cp08-container">
          <div className="cp08-section-header cp08-reveal">
            <span className="cp08-section-label">Contact</span>
            <h2 className="cp08-section-title">{data.contact.heading}</h2>
            <div className="cp08-title-line" />
          </div>
          <p className="cp08-contact-intro cp08-reveal">{data.contact.intro}</p>
          <form className="cp08-form cp08-reveal" onSubmit={handleSubmit}>
            {data.contact.fields.map((f) => (
              <div key={f.name} className={`cp08-form-group ${f.type === "textarea" ? "cp08-form-group--full" : ""}`}>
                <label className="cp08-form-label">
                  {f.label}
                  {f.required && <span className="cp08-form-req">必須</span>}
                </label>
                {f.type === "textarea" ? (
                  <textarea name={f.name} className="cp08-form-textarea" rows={5} required={f.required} />
                ) : (
                  <input type={f.type} name={f.name} className="cp08-form-input" required={f.required} />
                )}
              </div>
            ))}
            <div className="cp08-form-group cp08-form-group--full">
              <label className="cp08-form-checkbox-label">
                <input type="checkbox" required className="cp08-form-checkbox" />
                プライバシーポリシーに同意する
              </label>
            </div>
            <div className="cp08-form-group cp08-form-group--full cp08-form-submit-wrap">
              <button type="submit" className="cp08-form-submit">送信する</button>
            </div>
          </form>
        </div>
      </section>

      {/* ─── BACK TO TOP ─── */}
      <button
        className={`cp08-back-top ${showTop ? "cp08-back-top--visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="トップへ戻る"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 16V4M4 10l6-6 6 6" />
        </svg>
      </button>

      {/* ─── FOOTER ─── */}
      <footer className="cp08-footer">
        <div className="cp08-footer-inner">
          <div className="cp08-footer-top">
            <div className="cp08-footer-brand">
              <span className="cp08-footer-logo-mark">GL</span>
              <span className="cp08-footer-company">{data.company.name}</span>
            </div>
            <p className="cp08-footer-catchphrase">{data.footer.catchphrase}</p>
          </div>
          <div className="cp08-footer-middle">
            <div className="cp08-footer-info">
              <p>〒{data.company.postalCode} {data.company.address}</p>
              <p>TEL: {data.company.phone}</p>
              <p>{data.company.hours}</p>
            </div>
            <nav className="cp08-footer-nav">
              {data.navLinks.slice(0, 8).map((l) => (
                <a key={l.href} href={l.href} className="cp08-footer-link">{l.label}</a>
              ))}
            </nav>
          </div>
          <div className="cp08-footer-bottom">
            <small>&copy; {new Date().getFullYear()} {data.company.name} All Rights Reserved.</small>
          </div>
        </div>
      </footer>
    </div>
  );
}
