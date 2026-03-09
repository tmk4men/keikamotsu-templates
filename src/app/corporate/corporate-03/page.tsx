"use client";

import "./styles.css";
import Image from "next/image";
import * as data from "@/data/corporateSiteData";
import { useEffect, useRef, useState, useCallback } from "react";

/* ─── Falling Leaves ─── */
function FallingLeaves() {
  const leaves = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${6 + Math.random() * 6}s`,
    size: 12 + Math.random() * 14,
    rotate: Math.random() * 360,
  }));
  return (
    <div className="cp03-leaves" aria-hidden="true">
      {leaves.map((l) => (
        <span
          key={l.id}
          className="cp03-leaf"
          style={{
            left: l.left,
            animationDelay: l.delay,
            animationDuration: l.duration,
            width: l.size,
            height: l.size,
            transform: `rotate(${l.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Organic Wave Divider ─── */
function WaveDivider({ flip, color }: { flip?: boolean; color?: string }) {
  return (
    <div className={`cp03-wave${flip ? " cp03-wave--flip" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,32 C240,56 480,8 720,32 C960,56 1200,8 1440,32 L1440,60 L0,60 Z"
          fill={color || "var(--cp03-bg)"}
        />
      </svg>
    </div>
  );
}

/* ─── Sprout SVG for Numbers ─── */
function Sprout() {
  return (
    <svg className="cp03-sprout" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className="cp03-sprout-stem" d="M16 38 L16 18" stroke="var(--cp03-accent-light)" strokeWidth="2.5" strokeLinecap="round" />
      <path className="cp03-sprout-leaf-l" d="M16 22 C10 18 6 12 8 6 C12 10 16 16 16 22Z" fill="var(--cp03-accent-light)" opacity="0.7" />
      <path className="cp03-sprout-leaf-r" d="M16 18 C22 14 26 8 24 2 C20 6 16 12 16 18Z" fill="rgba(255,255,255,0.5)" />
    </svg>
  );
}

/* ───────── AnimatedCounter ───────── */
function AnimatedCounter({
  value,
  suffix,
}: {
  value: string;
  suffix: string;
}) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const numericStr = value.replace(/,/g, "");
          const target = parseFloat(numericStr);
          const isDecimal = numericStr.includes(".");
          const duration = 1800;
          const start = performance.now();
          const step = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;
            if (isDecimal) {
              setDisplay(current.toFixed(1));
            } else {
              const num = Math.floor(current);
              setDisplay(num >= 1000 ? num.toLocaleString() : String(num));
            }
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="cp03-counter-value">
      {display}
      <span className="cp03-counter-suffix">{suffix}</span>
    </span>
  );
}

/* ─────────────────────────────────────
   Main Page Component
   ───────────────────────────────────── */
export default function Corporate03Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const timelineRef = useRef<HTMLDivElement>(null);
  const [vineProgress, setVineProgress] = useState(0);

  /* scroll listener */
  useEffect(() => {
    const sectionIds = ["services", "strengths", "message", "company", "history", "numbers", "partners", "gallery", "news", "recruit", "access", "contact"];
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setShowTop(window.scrollY > 500);

      /* active section detection */
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom > 120) {
            current = id;
          }
        }
      }
      setActiveSection(current);

      /* timeline vine progress */
      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const viewH = window.innerHeight;
        const start = rect.top - viewH * 0.7;
        const end = rect.bottom - viewH * 0.3;
        const range = end - start;
        if (range > 0) {
          const progress = Math.max(0, Math.min(1, -start / range));
          setVineProgress(progress);
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* scroll reveal */
  useEffect(() => {
    const els = document.querySelectorAll(".cp03-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("cp03-visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <div className="theme-cp03">
      {/* ====== HEADER ====== */}
      <header className={`cp03-header${scrolled ? " cp03-header--scrolled" : ""}`}>
        <div className="cp03-header-inner">
          <a href="#" className="cp03-logo" onClick={closeMenu}>
            <span className="cp03-logo-leaf" aria-hidden="true" />
            <span className="cp03-logo-text">{data.company.name}</span>
          </a>

          <nav className={`cp03-nav${menuOpen ? " cp03-nav--open" : ""}`}>
            {data.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`cp03-nav-link${activeSection === link.href.replace("#", "") ? " cp03-nav-active" : ""}`}
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            className={`cp03-hamburger${menuOpen ? " cp03-hamburger--active" : ""}`}
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="メニュー"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* ====== HERO ====== */}
      <section className="cp03-hero">
        <video className="cp03-hero__video" autoPlay muted loop playsInline poster="/keikamotsu-templates/images/hero-bg.webp">
          <source src="/keikamotsu-templates/videos/hero-daytime.mp4" type="video/mp4" />
        </video>
        <FallingLeaves />
        <div className="cp03-hero-bg-shapes" aria-hidden="true">
          <div className="cp03-hero-blob cp03-hero-blob--1" />
          <div className="cp03-hero-blob cp03-hero-blob--2" />
          <div className="cp03-hero-blob cp03-hero-blob--3" />
        </div>
        <div className="cp03-hero-inner cp03-reveal">
          <h1 className="cp03-hero-headline">{data.hero.headline}<br className="br-desktop" /></h1>
          <div className="cp03-hero-subtext">
            {data.hero.subtext.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <a href="#contact" className="cp03-btn cp03-btn--primary">
            {data.hero.cta}
          </a>
        </div>
      </section>

      <WaveDivider color="var(--cp03-bg-alt)" />

      {/* ====== SERVICES ====== */}
      <section id="services" className="cp03-section cp03-section--alt">
        <div className="cp03-container">
          <h2 className="cp03-section-title cp03-reveal">
            <span className="cp03-section-title-en">Services</span>
            事業内容
          </h2>
          <div className="cp03-services-grid">
            {data.services.map((s, i) => {
              const serviceImages = ["/keikamotsu-templates/images/service-ec.png", "/keikamotsu-templates/images/service-b2b.png", "/keikamotsu-templates/images/service-spot.png", "/keikamotsu-templates/images/service-route.png"];
              return (
              <div key={s.num} className="cp03-service-card cp03-reveal" style={{ transitionDelay: `${i * 0.12}s`, animationDelay: `${i * 0.12}s` }}>
                <Image src={serviceImages[i]} alt={s.title} width={400} height={250} className="cp03-service-img" />
                <div className="cp03-service-icon">{s.icon}</div>
                <span className="cp03-service-num">{s.num}</span>
                <h3 className="cp03-service-title">{s.title}</h3>
                <p className="cp03-service-text">{s.text}</p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      <WaveDivider color="var(--cp03-bg)" flip />

      {/* ====== STRENGTHS ====== */}
      <section id="strengths" className="cp03-section">
        <div className="cp03-container">
          <h2 className="cp03-section-title cp03-reveal">
            <span className="cp03-section-title-en">Strengths</span>
            私たちの強み
          </h2>
          <div className="cp03-strengths-list">
            {data.strengths.map((s, i) => {
              const strengthImages = [
                "/keikamotsu-templates/images/reasons.png",
                "/keikamotsu-templates/images/workplace.png",
                "/keikamotsu-templates/images/vehicle.png",
              ];
              return (
                <div key={s.num} className={`cp03-strength-row cp03-reveal${i % 2 === 1 ? " cp03-strength-row--reverse" : ""}`} style={{ transitionDelay: `${i * 0.15}s`, animationDelay: `${i * 0.15}s` }}>
                  <div className="cp03-strength-img-wrap">
                    <Image src={strengthImages[i % strengthImages.length]} alt={s.title} width={520} height={340} className="cp03-strength-img" />
                  </div>
                  <div className="cp03-strength-body">
                    <div className="cp03-strength-num">{s.num}</div>
                    <h3 className="cp03-strength-title">{s.title}</h3>
                    <p className="cp03-strength-text">{s.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== VISUAL INTERLUDE ====== */}
      <div className="cp03-interlude">
        <Image src="/keikamotsu-templates/images/delivery.png" alt="配送イメージ" width={1920} height={400} className="cp03-interlude-img" />
        <div className="cp03-interlude-overlay">
          <p className="cp03-interlude-text cp03-reveal">確実に、丁寧に、届ける。</p>
        </div>
      </div>

      <WaveDivider color="var(--cp03-bg-alt)" />

      {/* ====== CEO MESSAGE ====== */}
      <section id="message" className="cp03-section cp03-section--alt">
        <div className="cp03-container">
          <h2 className="cp03-section-title cp03-reveal">
            <span className="cp03-section-title-en">Message</span>
            代表メッセージ
          </h2>
          <div className="cp03-message-card cp03-reveal">
            <div className="cp03-message-layout">
              <div className="cp03-message-portrait">
                <Image src="/keikamotsu-templates/images/ceo-portrait.png" alt="代表取締役 田中 誠一" width={280} height={350} className="cp03-ceo-img" />
              </div>
              <div className="cp03-message-content">
                <div className="cp03-message-body">
                  {data.ceoMessage.message.map((p, i) => (
                    <p key={i} className="cp03-message-paragraph">{p}</p>
                  ))}
                </div>
                <div className="cp03-message-author">
                  <span className="cp03-message-leaf" aria-hidden="true" />
                  <div>
                    <span className="cp03-message-title">{data.ceoMessage.title}</span>
                    <span className="cp03-message-name">{data.ceoMessage.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider color="var(--cp03-bg)" flip />

      {/* ====== COMPANY OVERVIEW ====== */}
      <section id="company" className="cp03-section">
        <div className="cp03-container">
          <h2 className="cp03-section-title cp03-reveal">
            <span className="cp03-section-title-en">Company</span>
            会社概要
          </h2>
          <div className="cp03-company-grid cp03-reveal">
            <div className="cp03-overview-table">
              {data.companyOverview.map((row, i) => (
                <div key={row.dt} className={`cp03-overview-row${i % 2 === 0 ? " cp03-overview-row--alt" : ""}`}>
                  <dt className="cp03-overview-dt">{row.dt}</dt>
                  <dd className="cp03-overview-dd">{row.dd}</dd>
                </div>
              ))}
            </div>
            <div className="cp03-company-photo">
              <Image src="/keikamotsu-templates/images/company.png" alt="本社・寝屋川営業所" width={480} height={360} className="cp03-company-img" />
              <span className="cp03-company-caption">本社・寝屋川営業所</span>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider color="var(--cp03-bg-alt)" />

      {/* ====== HISTORY ====== */}
      <section id="history" className="cp03-section cp03-section--alt">
        <div className="cp03-container">
          <h2 className="cp03-section-title cp03-reveal">
            <span className="cp03-section-title-en">History</span>
            沿革
          </h2>
          <div className="cp03-timeline" ref={timelineRef}>
            <div className="cp03-timeline-vine" style={{ height: `${vineProgress * 100}%` }} />
            {data.history.map((h, i) => {
              const dotActive = vineProgress > (i / data.history.length);
              return (
                <div key={h.year} className="cp03-timeline-item cp03-reveal" style={{ transitionDelay: `${i * 0.12}s`, animationDelay: `${i * 0.12}s` }}>
                  <div className={`cp03-timeline-dot${dotActive ? " cp03-timeline-dot--active" : ""}`} />
                  <div className="cp03-timeline-content">
                    <span className="cp03-timeline-year">{h.year}</span>
                    <p className="cp03-timeline-event">{h.event}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== NUMBERS ====== */}
      <section id="numbers" className="cp03-section cp03-numbers-section">
        <div className="cp03-container">
          <h2 className="cp03-section-title cp03-section-title--light cp03-reveal">
            <span className="cp03-section-title-en">Numbers</span>
            数字で見る実績
          </h2>
          <div className="cp03-numbers-grid">
            {data.numbers.map((n, i) => (
              <div key={n.label} className="cp03-number-circle cp03-reveal" style={{ transitionDelay: `${i * 0.12}s`, animationDelay: `${i * 0.12}s` }}>
                <AnimatedCounter value={n.value} suffix={n.suffix} />
                <span className="cp03-number-label">{n.label}</span>
                <Sprout />
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider color="var(--cp03-bg)" flip />

      {/* ====== PARTNERS ====== */}
      <section id="partners" className="cp03-section">
        <div className="cp03-container">
          <h2 className="cp03-section-title cp03-reveal">
            <span className="cp03-section-title-en">Partners</span>
            主要取引先
          </h2>
          <div className="cp03-partners-grid">
            {data.partners.map((p, i) => (
              <div key={p.name} className="cp03-partner-card cp03-reveal" style={{ transitionDelay: `${i * 0.12}s`, animationDelay: `${i * 0.12}s` }}>
                <span className="cp03-partner-industry">{p.industry}</span>
                <span className="cp03-partner-name">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== PHOTO GALLERY ====== */}
      <section className="cp03-section">
        <div className="cp03-container">
          <h2 className="cp03-section-title cp03-reveal">
            <span className="cp03-section-title-en">Gallery</span>
            フォトギャラリー
          </h2>
          <div className="cp03-gallery-grid">
            {[
              { src: "/keikamotsu-templates/images/team.png", alt: "チーム" },
              { src: "/keikamotsu-templates/images/loading.png", alt: "積み込み作業" },
              { src: "/keikamotsu-templates/images/workplace.png", alt: "職場環境" },
              { src: "/keikamotsu-templates/images/vehicle.png", alt: "車両" },
              { src: "/keikamotsu-templates/images/reasons.png", alt: "選ばれる理由" },
              { src: "/keikamotsu-templates/images/delivery.png", alt: "配送風景" },
            ].map((photo, i) => (
              <div key={i} className="cp03-gallery-item cp03-reveal" style={{ transitionDelay: `${i * 0.1}s`, animationDelay: `${i * 0.1}s` }}>
                <Image src={photo.src} alt={photo.alt} width={400} height={300} className="cp03-gallery-img" />
                <div className="cp03-gallery-overlay">
                  <span className="cp03-gallery-label">{photo.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider color="var(--cp03-bg-alt)" />

      {/* ====== NEWS ====== */}
      <section id="news" className="cp03-section cp03-section--alt">
        <div className="cp03-container">
          <h2 className="cp03-section-title cp03-reveal">
            <span className="cp03-section-title-en">News</span>
            お知らせ
          </h2>
          <div className="cp03-news-list">
            {data.news.map((n, i) => (
              <article key={i} className="cp03-news-item cp03-reveal" style={{ transitionDelay: `${i * 0.12}s` }}>
                <span className="cp03-news-date">{n.date}</span>
                <span className={`cp03-news-tag cp03-news-tag--${n.tagStyle}`}>{n.tag}</span>
                <span className="cp03-news-title">{n.title}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ====== RECRUIT CTA ====== */}
      <section id="recruit" className="cp03-recruit">
        <div className="cp03-container cp03-reveal">
          <h2 className="cp03-recruit-heading">{data.recruit.heading}</h2>
          <p className="cp03-recruit-text">{data.recruit.text}</p>
          <a href={data.recruit.link} className="cp03-btn cp03-btn--accent">
            {data.recruit.cta}
          </a>
        </div>
      </section>

      <WaveDivider color="var(--cp03-bg)" flip />

      {/* ====== ACCESS ====== */}
      <section id="access" className="cp03-section">
        <div className="cp03-container">
          <h2 className="cp03-section-title cp03-reveal">
            <span className="cp03-section-title-en">Access</span>
            {data.access.heading}
          </h2>
          <div className="cp03-access-card cp03-reveal">
            <div className="cp03-access-info">
              <p className="cp03-access-address">{data.access.address}</p>
              <p className="cp03-access-station">{data.access.nearestStation}</p>
              <p className="cp03-access-note">{data.access.mapNote}</p>
            </div>
            <div className="cp03-access-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.049129218498!2d135.50224887619028!3d34.683037985909186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000e7224e5ff0e7%3A0xb41df759916fffab!2z5pys55S66aeF!5e0!3m2!1sja!2sjp!4v1700000000000"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="アクセスマップ"
              />
            </div>
          </div>
        </div>
      </section>

      <WaveDivider color="var(--cp03-bg-alt)" />

      {/* ====== CONTACT ====== */}
      <section id="contact" className="cp03-section cp03-section--alt">
        <div className="cp03-container">
          <h2 className="cp03-section-title cp03-reveal">
            <span className="cp03-section-title-en">Contact</span>
            {data.contact.heading}
          </h2>
          <p className="cp03-contact-intro cp03-reveal">{data.contact.intro}</p>
          <form className="cp03-contact-form cp03-reveal" onSubmit={(e) => e.preventDefault()}>
            {data.contact.fields.map((field) => (
              <div key={field.name} className="cp03-form-group">
                <label className="cp03-form-label" htmlFor={`cp03-${field.name}`}>
                  {field.label}
                  {field.required && <span className="cp03-form-required">必須</span>}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    id={`cp03-${field.name}`}
                    className="cp03-form-input cp03-form-textarea"
                    rows={5}
                    required={field.required}
                  />
                ) : (
                  <input
                    id={`cp03-${field.name}`}
                    type={field.type}
                    className="cp03-form-input"
                    required={field.required}
                  />
                )}
              </div>
            ))}
            <button type="submit" className="cp03-btn cp03-btn--submit">
              送信する
            </button>
          </form>
        </div>
      </section>

      {/* ====== FOOTER ====== */}
      <footer className="cp03-footer">
        <div className="cp03-footer-inner">
          <div className="cp03-footer-top">
            <div className="cp03-footer-brand">
              <span className="cp03-footer-logo-leaf" aria-hidden="true" />
              <span className="cp03-footer-company">{data.company.name}</span>
              <p className="cp03-footer-catchphrase">{data.footer.catchphrase}</p>
            </div>
            <nav className="cp03-footer-nav">
              {data.navLinks.map((link) => (
                <a key={link.href} href={link.href} className="cp03-footer-link">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="cp03-footer-info">
            <p>{data.company.address}</p>
            <p>TEL: {data.company.phone} / FAX: {data.company.fax}</p>
            <p>{data.company.hours}</p>
          </div>
          <div className="cp03-footer-bottom">
            <small>&copy; {new Date().getFullYear()} {data.company.name} All Rights Reserved.</small>
          </div>
        </div>
      </footer>

      {/* ====== BACK TO TOP ====== */}
      <button
        className={`cp03-back-to-top${showTop ? " cp03-back-to-top--show" : ""}`}
        onClick={scrollToTop}
        aria-label="ページトップへ"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 4L3 13h14L10 4z" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
}
