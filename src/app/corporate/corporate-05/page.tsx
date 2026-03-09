"use client";
/* ===================================================
   Corporate Template 05 — フューチャーフロー
   テック・グラデーション・グラスモーフィズム
   =================================================== */

import "./styles.css";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import * as data from "@/data/corporateSiteData";

/* ────────────────────────────────────────────────────
   Floating Particles (CSS-only driven, DOM nodes)
   ──────────────────────────────────────────────────── */
function FloatingParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: Math.random() * 12 + 10,
    color: i % 3 === 0 ? "var(--cp05-cyan)" : i % 3 === 1 ? "var(--cp05-purple-light)" : "var(--cp05-purple)",
  }));
  return (
    <div className="cp05-particles" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="cp05-particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            background: p.color,
          }}
        />
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────
   Matrix Rain Background
   ──────────────────────────────────────────────────── */
function MatrixRain() {
  const columns = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    left: (i / 24) * 100 + Math.random() * 2,
    delay: Math.random() * 8,
    duration: Math.random() * 6 + 6,
    chars: Array.from({ length: 12 }, () =>
      Math.random() > 0.5 ? String(Math.floor(Math.random() * 2)) : String.fromCharCode(0x30A0 + Math.random() * 96)
    ).join("\n"),
  }));
  return (
    <div className="cp05-matrix-rain" aria-hidden="true">
      {columns.map((c) => (
        <span
          key={c.id}
          className="cp05-matrix-col"
          style={{
            left: `${c.left}%`,
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.duration}s`,
          }}
        >
          {c.chars}
        </span>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────
   Animated Counter
   ──────────────────────────────────────────────────── */
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
            if (isDecimal) {
              setDisplay(current.toFixed(1));
            } else {
              setDisplay(Math.floor(current).toLocaleString());
            }
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
    <span ref={ref} className="cp05-counter-value">
      {display}
      <span className="cp05-counter-suffix">{suffix}</span>
    </span>
  );
}

/* ────────────────────────────────────────────────────
   Scroll Reveal Hook
   ──────────────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".cp05-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("cp05-visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ════════════════════════════════════════════════════
   Main Page Component
   ════════════════════════════════════════════════════ */
export default function Corporate05Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [timelineProgress, setTimelineProgress] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  useScrollReveal();

  /* scroll-based header + back-to-top + active section + timeline */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setShowTop(window.scrollY > 600);

      /* active section detection */
      const sections = document.querySelectorAll<HTMLElement>(".cp05-section, .cp05-hero");
      let current = "";
      sections.forEach((sec) => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom > 200) {
          current = sec.id || "hero";
        }
      });
      setActiveSection(current);

      /* timeline data stream progress */
      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const vh = window.innerHeight;
        if (rect.top < vh && rect.bottom > 0) {
          const progress = Math.min(1, Math.max(0, (vh - rect.top) / (rect.height + vh * 0.5)));
          setTimelineProgress(progress);
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /* close menu on anchor click */
  const handleNavClick = useCallback(() => setMenuOpen(false), []);

  /* form submit */
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    alert("お問い合わせありがとうございます。担当者より折り返しご連絡いたします。");
  }, []);

  return (
    <div className="theme-cp05">
      {/* ─── Header ─── */}
      <header className={`cp05-header${scrolled ? " cp05-header--scrolled" : ""}`}>
        <div className="cp05-header-inner">
          <a href="#" className="cp05-logo">
            <span className="cp05-logo-text">{data.company.name}</span>
          </a>

          <nav className={`cp05-nav${menuOpen ? " cp05-nav--open" : ""}`}>
            {data.navLinks.map((l) => {
              const sectionId = l.href.replace("#", "");
              return (
                <a key={l.href} href={l.href} className={`cp05-nav-link${activeSection === sectionId ? " cp05-nav-active" : ""}`} onClick={handleNavClick}>
                  {l.label}
                </a>
              );
            })}
          </nav>

          <button
            className={`cp05-hamburger${menuOpen ? " cp05-hamburger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニュー"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section className="cp05-hero">
        <video
          className="cp05-hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster="/keikamotsu-templates/images/hero-bg.webp"
        >
          <source src="/keikamotsu-templates/videos/hero-nightcity.mp4" type="video/mp4" />
        </video>
        <div className="cp05-hero-mesh" aria-hidden="true" />
        <MatrixRain />
        <FloatingParticles />
        <div className="cp05-hero-content cp05-reveal">
          <h1 className="cp05-hero-heading">{data.hero.headline}<br className="br-desktop" /></h1>
          <div className="cp05-hero-sub">
            {data.hero.subtext.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <a href="#contact" className="cp05-hero-cta">{data.hero.cta}</a>
        </div>
      </section>

      {/* ─── Services ─── */}
      <section id="services" className="cp05-section">
        <div className="cp05-container">
          <h2 className="cp05-section-title cp05-glitch-title cp05-reveal">
            <span className="cp05-section-title-en">Services</span>
            事業内容
          </h2>
          <div className="cp05-services-grid">
            {data.services.map((s, i) => {
              const serviceImages = ["/keikamotsu-templates/images/service-ec.png", "/keikamotsu-templates/images/service-b2b.png", "/keikamotsu-templates/images/service-spot.png", "/keikamotsu-templates/images/service-route.png"];
              return (
              <div key={i} className="cp05-service-card cp05-reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <Image src={serviceImages[i]} alt={s.title} width={400} height={250} className="cp05-service-img" />
                <div className="cp05-service-icon">{s.icon}</div>
                <span className="cp05-service-num">{s.num}</span>
                <h3 className="cp05-service-title">{s.title}</h3>
                <p className="cp05-service-text">{s.text}</p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Strengths ─── */}
      <section id="strengths" className="cp05-section cp05-section--alt">
        <div className="cp05-container">
          <h2 className="cp05-section-title cp05-glitch-title cp05-reveal">
            <span className="cp05-section-title-en">Strengths</span>
            私たちの強み
          </h2>
          <div className="cp05-strengths-rows">
            {data.strengths.map((s, i) => {
              const strengthImages = [
                "/keikamotsu-templates/images/reasons.png",
                "/keikamotsu-templates/images/workplace.png",
                "/keikamotsu-templates/images/vehicle.png",
              ];
              const imgSrc = strengthImages[i % strengthImages.length];
              const isReversed = i % 2 === 1;
              return (
                <div key={i} className={`cp05-strength-row cp05-reveal${isReversed ? " cp05-strength-row--reverse" : ""}`} style={{ transitionDelay: `${i * 0.12}s` }}>
                  <div className="cp05-strength-row-img-wrap">
                    <Image src={imgSrc} alt={s.title} width={520} height={340} className="cp05-strength-row-img" />
                    <div className="cp05-strength-row-img-glow" aria-hidden="true" />
                  </div>
                  <div className="cp05-strength-row-content">
                    <div className="cp05-strength-badge">{s.num}</div>
                    <h3 className="cp05-strength-title">{s.title}</h3>
                    <p className="cp05-strength-text">{s.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CEO Message ─── */}
      <section id="message" className="cp05-section">
        <div className="cp05-container">
          <h2 className="cp05-section-title cp05-glitch-title cp05-reveal">
            <span className="cp05-section-title-en">Message</span>
            代表メッセージ
          </h2>
          <div className="cp05-message-box cp05-reveal">
            <span className="cp05-message-quote" aria-hidden="true">&ldquo;</span>
            <div className="cp05-message-layout">
              <Image src="/keikamotsu-templates/images/ceo-portrait.png" alt="代表取締役 田中 誠一" width={280} height={350} className="cp05-ceo-img" />
              <div className="cp05-message-content">
                <div className="cp05-message-body">
                  {data.ceoMessage.message.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className="cp05-message-author">
                  <span className="cp05-message-role">{data.ceoMessage.title}</span>
                  <span className="cp05-message-name">{data.ceoMessage.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Company Overview ─── */}
      <section id="company" className="cp05-section cp05-section--alt">
        <div className="cp05-container">
          <h2 className="cp05-section-title cp05-glitch-title cp05-reveal">
            <span className="cp05-section-title-en">Company</span>
            会社概要
          </h2>
          <div className="cp05-company-layout cp05-reveal">
            <div className="cp05-company-table">
              <dl>
                {data.companyOverview.map((row, i) => (
                  <div key={i} className="cp05-company-row">
                    <dt>{row.dt}</dt>
                    <dd>{row.dd}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="cp05-company-photo-wrap">
              <Image src="/keikamotsu-templates/images/company.png" alt="本社・寝屋川営業所" width={480} height={360} className="cp05-company-photo" />
              <span className="cp05-company-photo-caption">本社・寝屋川営業所</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── History ─── */}
      <section id="history" className="cp05-section">
        <div className="cp05-container">
          <h2 className="cp05-section-title cp05-glitch-title cp05-reveal">
            <span className="cp05-section-title-en">History</span>
            沿革
          </h2>
          <div className="cp05-timeline" ref={timelineRef}>
            <div className="cp05-timeline-stream" style={{ height: `${timelineProgress * 100}%` }} />
            {data.history.map((h, i) => {
              const dotActive = timelineProgress > (i / data.history.length);
              return (
                <div key={i} className="cp05-timeline-item cp05-reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                  <div className={`cp05-timeline-dot${dotActive ? " cp05-timeline-dot--active" : ""}`} />
                  <div className="cp05-timeline-year">{h.year}</div>
                  <div className="cp05-timeline-event">{h.event}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Numbers ─── */}
      <section id="numbers" className="cp05-section cp05-section--alt">
        <div className="cp05-container">
          <h2 className="cp05-section-title cp05-glitch-title cp05-reveal">
            <span className="cp05-section-title-en">Numbers</span>
            実績
          </h2>
          <div className="cp05-numbers-grid">
            {data.numbers.map((n, i) => (
              <div key={i} className="cp05-number-card cp05-reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <AnimatedCounter value={n.value} suffix={n.suffix} />
                <span className="cp05-number-label">{n.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Partners ─── */}
      <section id="partners" className="cp05-section">
        <div className="cp05-container">
          <h2 className="cp05-section-title cp05-glitch-title cp05-reveal">
            <span className="cp05-section-title-en">Partners</span>
            主要取引先
          </h2>
          <div className="cp05-partners-grid">
            {data.partners.map((p, i) => (
              <div key={i} className="cp05-partner-card cp05-reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                <span className="cp05-partner-industry">{p.industry}</span>
                <span className="cp05-partner-name">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Visual Interlude ─── */}
      <div className="cp05-visual-interlude">
        <Image src="/keikamotsu-templates/images/delivery.png" alt="配送風景" width={1920} height={400} className="cp05-interlude-img" />
        <div className="cp05-interlude-overlay" aria-hidden="true" />
        <div className="cp05-interlude-content cp05-reveal">
          <p className="cp05-interlude-text">信頼と実績で、物流の未来を創る</p>
          <p className="cp05-interlude-sub">Delivering the Future of Logistics</p>
        </div>
      </div>

      {/* ─── Photo Gallery ─── */}
      <section id="gallery" className="cp05-section">
        <div className="cp05-container">
          <h2 className="cp05-section-title cp05-glitch-title cp05-reveal">
            <span className="cp05-section-title-en">Gallery</span>
            フォトギャラリー
          </h2>
          <div className="cp05-gallery-grid">
            {[
              { src: "/keikamotsu-templates/images/vehicle.png", alt: "車両紹介" },
              { src: "/keikamotsu-templates/images/workplace.png", alt: "職場環境" },
              { src: "/keikamotsu-templates/images/loading.png", alt: "積み込み作業" },
              { src: "/keikamotsu-templates/images/team.png", alt: "チームワーク" },
              { src: "/keikamotsu-templates/images/daily-flow.png", alt: "日々の業務" },
              { src: "/keikamotsu-templates/images/delivery.png", alt: "配送の様子" },
            ].map((photo, i) => (
              <div key={i} className="cp05-gallery-item cp05-reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                <Image src={photo.src} alt={photo.alt} width={400} height={300} className="cp05-gallery-img" />
                <div className="cp05-gallery-overlay">
                  <span className="cp05-gallery-label">{photo.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── News ─── */}
      <section id="news" className="cp05-section cp05-section--alt">
        <div className="cp05-container">
          <h2 className="cp05-section-title cp05-glitch-title cp05-reveal">
            <span className="cp05-section-title-en">News</span>
            お知らせ
          </h2>
          <div className="cp05-news-list">
            {data.news.map((n, i) => (
              <article key={i} className="cp05-news-item cp05-reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                <span className="cp05-news-date">{n.date}</span>
                <span className={`cp05-news-tag cp05-news-tag--${n.tagStyle}`}>{n.tag}</span>
                <span className="cp05-news-title">{n.title}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Recruit CTA ─── */}
      <section id="recruit" className="cp05-section">
        <div className="cp05-container">
          <div className="cp05-recruit-box cp05-neon-frame cp05-reveal">
            <h2 className="cp05-recruit-heading">{data.recruit.heading}</h2>
            <p className="cp05-recruit-text">{data.recruit.text}</p>
            <a href={data.recruit.link} className="cp05-recruit-cta">{data.recruit.cta}</a>
          </div>
        </div>
      </section>

      {/* ─── Access ─── */}
      <section id="access" className="cp05-section cp05-section--alt">
        <div className="cp05-container">
          <h2 className="cp05-section-title cp05-glitch-title cp05-reveal">
            <span className="cp05-section-title-en">Access</span>
            {data.access.heading}
          </h2>
          <div className="cp05-access-box cp05-reveal">
            <div className="cp05-access-info">
              <p className="cp05-access-address">{data.access.address}</p>
              <p className="cp05-access-station">{data.access.nearestStation}</p>
              <p className="cp05-access-note">{data.access.mapNote}</p>
            </div>
            <div className="cp05-access-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.1!2d135.5023!3d34.6837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDQxJzAxLjMiTiAxMzXCsDMwJzA4LjMiRQ!5e0!3m2!1sja!2sjp!4v1700000000000"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="オフィス所在地"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Contact ─── */}
      <section id="contact" className="cp05-section">
        <div className="cp05-container">
          <h2 className="cp05-section-title cp05-glitch-title cp05-reveal">
            <span className="cp05-section-title-en">Contact</span>
            {data.contact.heading}
          </h2>
          <p className="cp05-contact-intro cp05-reveal">{data.contact.intro}</p>
          <form className="cp05-contact-form cp05-reveal" onSubmit={handleSubmit}>
            {data.contact.fields.map((f) =>
              f.type === "textarea" ? (
                <div key={f.name} className="cp05-form-group cp05-form-group--full">
                  <label className="cp05-form-label">
                    {f.label}
                    {f.required && <span className="cp05-form-req">*</span>}
                  </label>
                  <textarea
                    name={f.name}
                    required={f.required}
                    rows={5}
                    className="cp05-form-textarea"
                  />
                </div>
              ) : (
                <div key={f.name} className="cp05-form-group">
                  <label className="cp05-form-label">
                    {f.label}
                    {f.required && <span className="cp05-form-req">*</span>}
                  </label>
                  <input
                    type={f.type}
                    name={f.name}
                    required={f.required}
                    className="cp05-form-input"
                  />
                </div>
              )
            )}
            <div className="cp05-form-group cp05-form-group--full cp05-form-submit-wrap">
              <button type="submit" className="cp05-form-submit">送信する</button>
            </div>
          </form>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="cp05-footer">
        <div className="cp05-footer-inner">
          <div className="cp05-footer-top">
            <div className="cp05-footer-brand">
              <span className="cp05-footer-logo">{data.company.name}</span>
              <p className="cp05-footer-catchphrase">{data.footer.catchphrase}</p>
            </div>
            <nav className="cp05-footer-nav">
              {data.navLinks.map((l) => (
                <a key={l.href} href={l.href} className="cp05-footer-link">{l.label}</a>
              ))}
            </nav>
          </div>
          <div className="cp05-footer-info">
            <p>{data.company.address}</p>
            <p>TEL: {data.company.phone} / FAX: {data.company.fax}</p>
            <p>{data.company.hours}</p>
          </div>
          <div className="cp05-footer-bottom">
            <small>&copy; {new Date().getFullYear()} {data.company.name} All Rights Reserved.</small>
          </div>
        </div>
      </footer>

      {/* ─── Back to Top ─── */}
      <button
        className={`cp05-back-top${showTop ? " cp05-back-top--show" : ""}`}
        onClick={scrollToTop}
        aria-label="ページ上部へ"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </div>
  );
}
