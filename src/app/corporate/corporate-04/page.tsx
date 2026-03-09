"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import * as data from "@/data/corporateSiteData";
import "./styles.css";

/* ─── Gold Line Divider ─── */
function GoldDivider() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("cp04-gold-divider--visible"); obs.unobserve(el); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className="cp04-gold-divider" aria-hidden="true"><span className="cp04-gold-divider-line" /></div>;
}

/* ─── Gold Ring Progress for Numbers ─── */
function GoldRing({ progress }: { progress: number }) {
  const r = 44;
  const circ = 2 * Math.PI * r;
  return (
    <svg className="cp04-gold-ring" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(201,168,76,0.12)" strokeWidth="2" />
      <circle
        cx="50" cy="50" r={r} fill="none"
        stroke="url(#cp04-ring-grad)" strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - progress)}
        transform="rotate(-90 50 50)"
        style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.25,0.46,0.45,0.94)" }}
      />
      <defs>
        <linearGradient id="cp04-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c9a84c" />
          <stop offset="50%" stopColor="#f0d78c" />
          <stop offset="100%" stopColor="#c9a84c" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── scroll-reveal hook ── */
function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add("cp04-revealed"), delay);
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
    <span ref={ref} className="cp04-counter">
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ══════════════════════════════════════════════
   Corporate Template 04 – エグゼクティブ
   Dark luxury / gold accent executive theme
   ══════════════════════════════════════════════ */
export default function CorporateTemplate04() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerSolid, setHeaderSolid] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [ringVisible, setRingVisible] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const numbersRef2 = useRef<HTMLDivElement>(null);
  const galleryRef = useReveal(100);
  const interludeRef = useReveal(100);

  /* ── scroll handler ── */
  useEffect(() => {
    const sectionIds = ["services", "strengths", "message", "company", "history", "numbers", "partners", "news", "recruit", "access", "contact"];
    const onScroll = () => {
      setHeaderSolid(window.scrollY > 60);
      setShowTop(window.scrollY > 500);

      /* active section */
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom > 120) current = id;
        }
      }
      setActiveSection(current);

      /* timeline progress */
      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const viewH = window.innerHeight;
        const start = rect.top - viewH * 0.7;
        const end = rect.bottom - viewH * 0.3;
        const range = end - start;
        if (range > 0) setTimelineProgress(Math.max(0, Math.min(1, -start / range)));
      }

      /* ring trigger */
      if (numbersRef2.current && !ringVisible) {
        const rect = numbersRef2.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.7) setRingVisible(true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ringVisible]);

  /* ── lock body on mobile menu ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  /* reveal refs */
  const heroRef = useReveal(0);
  const servicesRef = useReveal(100);
  const strengthsRef = useReveal(100);
  const ceoRef = useReveal(100);
  const companyRef = useReveal(100);
  const historyRef = useReveal(100);
  const numbersRef = useReveal(100);
  const partnersRef = useReveal(100);
  const newsRef = useReveal(100);
  const recruitRef = useReveal(100);
  const accessRef = useReveal(100);
  const contactRef = useReveal(100);

  return (
    <div className="theme-cp04">
      {/* ────────────────────── HEADER ────────────────────── */}
      <header
        className={`cp04-header${headerSolid ? " cp04-header--solid" : ""}`}
      >
        <div className="cp04-header-inner">
          <a href="#" className="cp04-logo">
            <span className="cp04-logo-text">{data.company.name}</span>
          </a>

          <nav className="cp04-nav-desktop">
            {data.navLinks.map((l) => (
              <a key={l.href} href={l.href} className={`cp04-nav-link${activeSection === l.href.replace("#", "") ? " cp04-nav-active" : ""}`}>
                {l.label}
              </a>
            ))}
          </nav>

          <button
            className={`cp04-hamburger${menuOpen ? " cp04-hamburger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニュー"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* mobile overlay */}
      <div
        className={`cp04-mobile-overlay${menuOpen ? " cp04-mobile-overlay--open" : ""}`}
      >
        <nav className="cp04-mobile-nav">
          {data.navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="cp04-mobile-link"
              onClick={closeMenu}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      {/* ────────────────────── HERO ────────────────────── */}
      <section className="cp04-hero" ref={heroRef}>
        <div className="cp04-hero-bg">
          <video
            className="cp04-hero-video"
            autoPlay
            muted
            loop
            playsInline
            poster="/keikamotsu-templates/images/hero-bg.webp"
          >
            <source src="/keikamotsu-templates/videos/hero-nightcity.mp4" type="video/mp4" />
          </video>
          <Image
            src="/keikamotsu-templates/images/hero-bg.webp"
            alt=""
            fill
            priority
            style={{ objectFit: "cover" }}
            className="cp04-hero-fallback"
          />
          <div className="cp04-hero-overlay" />
        </div>
        <div className="cp04-hero-content cp04-reveal">
          <h1 className="cp04-hero-headline">{data.hero.headline}<br className="br-desktop" /></h1>
          <div className="cp04-hero-subtext">
            {data.hero.subtext.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <a href="#contact" className="cp04-hero-cta">
            {data.hero.cta}
          </a>
        </div>
        <div className="cp04-hero-scroll-hint">
          <span>Scroll</span>
          <div className="cp04-scroll-line" />
        </div>
      </section>

      <GoldDivider />

      {/* ────────────────────── SERVICES ────────────────────── */}
      <section id="services" className="cp04-services" ref={servicesRef}>
        <div className="cp04-container cp04-reveal">
          <div className="cp04-section-header">
            <span className="cp04-section-en">Services</span>
            <h2 className="cp04-section-title">事業内容</h2>
            <div className="cp04-section-line" />
          </div>
          <div className="cp04-services-grid">
            {(() => {
              const serviceImages = ["/keikamotsu-templates/images/service-ec.png", "/keikamotsu-templates/images/service-b2b.png", "/keikamotsu-templates/images/service-spot.png", "/keikamotsu-templates/images/service-route.png"];
              return data.services.map((s, i) => (
                <div key={i} className="cp04-service-card cp04-gold-border-card cp04-reveal" style={{ transitionDelay: `${i * 0.15}s` }}>
                  <Image src={serviceImages[i]} alt={s.title} width={400} height={250} className="cp04-service-img" />
                  <div className="cp04-service-icon">{s.icon}</div>
                  <span className="cp04-service-num">{s.num}</span>
                  <h3 className="cp04-service-title">{s.title}</h3>
                  <p className="cp04-service-text">{s.text}</p>
                </div>
              ));
            })()}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ────────────────────── STRENGTHS ────────────────────── */}
      <section id="strengths" className="cp04-strengths" ref={strengthsRef}>
        <div className="cp04-container cp04-reveal">
          <div className="cp04-section-header">
            <span className="cp04-section-en">Strengths</span>
            <h2 className="cp04-section-title">私たちの強み</h2>
            <div className="cp04-section-line" />
          </div>
          <div className="cp04-strengths-list">
            {(() => {
              const strengthImages = [
                "/keikamotsu-templates/images/reasons.png",
                "/keikamotsu-templates/images/workplace.png",
                "/keikamotsu-templates/images/vehicle.png",
              ];
              return data.strengths.map((s, i) => (
                <div key={i} className={`cp04-strength-item cp04-strength-item--grid ${i % 2 !== 0 ? "cp04-strength-item--reverse" : ""} ${i % 2 === 0 ? "cp04-reveal-left" : "cp04-reveal-right"}`} style={{ transitionDelay: `${i * 0.15}s` }}>
                  <div className="cp04-strength-image-wrap">
                    <Image
                      src={strengthImages[i % strengthImages.length]}
                      alt={s.title}
                      width={500}
                      height={320}
                      className="cp04-strength-img"
                    />
                  </div>
                  <div className="cp04-strength-content">
                    <div className="cp04-strength-num">{s.num}</div>
                    <h3 className="cp04-strength-title">{s.title}</h3>
                    <p className="cp04-strength-text">{s.text}</p>
                  </div>
                  {i < data.strengths.length - 1 && (
                    <div className="cp04-strength-divider" />
                  )}
                </div>
              ));
            })()}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ────────────────────── CEO MESSAGE ────────────────────── */}
      <section id="message" className="cp04-message" ref={ceoRef}>
        <div className="cp04-container cp04-reveal">
          <div className="cp04-section-header">
            <span className="cp04-section-en">Message</span>
            <h2 className="cp04-section-title">代表メッセージ</h2>
            <div className="cp04-section-line" />
          </div>
          <div className="cp04-message-body">
            <div className="cp04-message-portrait">
              <Image src="/keikamotsu-templates/images/ceo-portrait.png" alt="代表取締役 田中 誠一" width={280} height={350} className="cp04-ceo-img" />
            </div>
            <div className="cp04-message-content">
              <div className="cp04-message-quote-mark">&ldquo;</div>
              <div className="cp04-message-text">
                {data.ceoMessage.message.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="cp04-message-quote-mark cp04-message-quote-mark--end">
                &rdquo;
              </div>
              <div className="cp04-message-author">
                <span className="cp04-message-role">{data.ceoMessage.title}</span>
                <span className="cp04-message-name">{data.ceoMessage.name}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ────────────────────── COMPANY OVERVIEW ────────────────────── */}
      <section id="company" className="cp04-company" ref={companyRef}>
        <div className="cp04-container cp04-reveal">
          <div className="cp04-section-header">
            <span className="cp04-section-en">Company</span>
            <h2 className="cp04-section-title">会社概要</h2>
            <div className="cp04-section-line" />
          </div>
          <div className="cp04-company-grid">
            <dl className="cp04-company-table">
              {data.companyOverview.map((row, i) => (
                <div key={i} className="cp04-company-row">
                  <dt className="cp04-company-dt">{row.dt}</dt>
                  <dd className="cp04-company-dd">{row.dd}</dd>
                </div>
              ))}
            </dl>
            <div className="cp04-company-photo">
              <Image
                src="/keikamotsu-templates/images/company.png"
                alt="本社・寝屋川営業所"
                width={480}
                height={360}
                className="cp04-company-img"
              />
              <span className="cp04-company-caption">本社・寝屋川営業所</span>
            </div>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ────────────────────── HISTORY ────────────────────── */}
      <section id="history" className="cp04-history" ref={historyRef}>
        <div className="cp04-container cp04-reveal">
          <div className="cp04-section-header">
            <span className="cp04-section-en">History</span>
            <h2 className="cp04-section-title">沿革</h2>
            <div className="cp04-section-line" />
          </div>
          <div className="cp04-timeline" ref={timelineRef}>
            <div className="cp04-timeline-line" />
            <div className="cp04-timeline-fill" style={{ height: `${timelineProgress * 100}%` }} />
            {data.history.map((h, i) => {
              const dotActive = timelineProgress > (i / data.history.length);
              return (
                <div key={i} className={`cp04-timeline-item ${i % 2 === 0 ? 'cp04-reveal-left' : 'cp04-reveal-right'}`} style={{ transitionDelay: `${i * 0.15}s` }}>
                  <div className={`cp04-timeline-dot${dotActive ? " cp04-timeline-dot--active" : ""}`} />
                  <div className="cp04-timeline-year">{h.year}</div>
                  <div className="cp04-timeline-event">{h.event}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ────────────────────── NUMBERS ────────────────────── */}
      <section id="numbers" className="cp04-numbers" ref={numbersRef}>
        <div className="cp04-container cp04-reveal" ref={numbersRef2}>
          <div className="cp04-section-header">
            <span className="cp04-section-en">Numbers</span>
            <h2 className="cp04-section-title">数字で見る実績</h2>
            <div className="cp04-section-line" />
          </div>
          <div className="cp04-numbers-grid">
            {data.numbers.map((n, i) => (
              <div key={i} className="cp04-number-item cp04-reveal-scale" style={{ transitionDelay: `${i * 0.15}s`, '--item-index': i } as React.CSSProperties}>
                <div className="cp04-number-ring-wrap">
                  <GoldRing progress={ringVisible ? 1 : 0} />
                  <div className="cp04-number-value">
                    <AnimatedCounter
                      end={parseFloat(n.value.replace(/,/g, ""))}
                      suffix={n.suffix}
                    />
                  </div>
                </div>
                <div className="cp04-number-label">{n.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ────────────────────── PARTNERS ────────────────────── */}
      <section id="partners" className="cp04-partners" ref={partnersRef}>
        <div className="cp04-container cp04-reveal">
          <div className="cp04-section-header">
            <span className="cp04-section-en">Partners</span>
            <h2 className="cp04-section-title">主要取引先</h2>
            <div className="cp04-section-line" />
          </div>
          <div className="cp04-partners-grid">
            {data.partners.map((p, i) => (
              <div key={i} className="cp04-partner-card cp04-reveal-scale" style={{ transitionDelay: `${i * 0.15}s` }}>
                <span className="cp04-partner-industry">{p.industry}</span>
                <span className="cp04-partner-name">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ────────────────────── PHOTO GALLERY ────────────────────── */}
      <section className="cp04-gallery" ref={galleryRef}>
        <div className="cp04-container cp04-reveal">
          <div className="cp04-section-header">
            <span className="cp04-section-en">Gallery</span>
            <h2 className="cp04-section-title">フォトギャラリー</h2>
            <div className="cp04-section-line" />
          </div>
          <div className="cp04-gallery-grid">
            {[
              { src: "/keikamotsu-templates/images/vehicle.png", alt: "配送車両" },
              { src: "/keikamotsu-templates/images/workplace.png", alt: "職場環境" },
              { src: "/keikamotsu-templates/images/team.png", alt: "チーム" },
              { src: "/keikamotsu-templates/images/loading.png", alt: "積込作業" },
              { src: "/keikamotsu-templates/images/delivery.png", alt: "配送風景" },
              { src: "/keikamotsu-templates/images/daily-flow.png", alt: "日常業務" },
            ].map((photo, i) => (
              <div key={i} className="cp04-gallery-item cp04-reveal-scale" style={{ transitionDelay: `${i * 0.1}s` }}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={400}
                  height={300}
                  className="cp04-gallery-img"
                />
                <div className="cp04-gallery-overlay">
                  <span className="cp04-gallery-label">{photo.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ────────────────────── VISUAL INTERLUDE ────────────────────── */}
      <section className="cp04-interlude" ref={interludeRef}>
        <div className="cp04-interlude-bg">
          <Image
            src="/keikamotsu-templates/images/delivery.png"
            alt=""
            fill
            style={{ objectFit: "cover" }}
          />
          <div className="cp04-interlude-overlay" />
        </div>
        <div className="cp04-interlude-content cp04-reveal">
          <span className="cp04-interlude-en">Reliability</span>
          <p className="cp04-interlude-text">確かな品質と信頼で、<br />お客様の物流を支え続けます。</p>
        </div>
      </section>

      <GoldDivider />

      {/* ────────────────────── NEWS ────────────────────── */}
      <section id="news" className="cp04-news" ref={newsRef}>
        <div className="cp04-container cp04-reveal">
          <div className="cp04-section-header">
            <span className="cp04-section-en">News</span>
            <h2 className="cp04-section-title">お知らせ</h2>
            <div className="cp04-section-line" />
          </div>
          <ul className="cp04-news-list">
            {data.news.map((n, i) => (
              <li key={i} className="cp04-news-item cp04-reveal-right" style={{ transitionDelay: `${i * 0.15}s` }}>
                <time className="cp04-news-date">{n.date}</time>
                <span className={`cp04-news-tag cp04-news-tag--${n.tagStyle}`}>
                  {n.tag}
                </span>
                <span className="cp04-news-title">{n.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <GoldDivider />

      {/* ────────────────────── RECRUIT ────────────────────── */}
      <section id="recruit" className="cp04-recruit" ref={recruitRef}>
        <div className="cp04-container cp04-reveal">
          <div className="cp04-recruit-frame cp04-glow-frame">
            <div className="cp04-section-header">
              <span className="cp04-section-en">Recruit</span>
              <h2 className="cp04-section-title">{data.recruit.heading}</h2>
              <div className="cp04-section-line" />
            </div>
            <p className="cp04-recruit-text">{data.recruit.text}</p>
            <a href={data.recruit.link} className="cp04-recruit-cta">
              {data.recruit.cta}
            </a>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* ────────────────────── ACCESS ────────────────────── */}
      <section id="access" className="cp04-access" ref={accessRef}>
        <div className="cp04-container cp04-reveal">
          <div className="cp04-section-header">
            <span className="cp04-section-en">Access</span>
            <h2 className="cp04-section-title">{data.access.heading}</h2>
            <div className="cp04-section-line" />
          </div>
          <div className="cp04-access-body">
            <div className="cp04-access-info">
              <p className="cp04-access-address">
                〒{data.company.postalCode}
                <br />
                {data.access.address}
              </p>
              <p className="cp04-access-station">
                {data.access.nearestStation}
              </p>
              <p className="cp04-access-note">{data.access.mapNote}</p>
            </div>
            <div className="cp04-access-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.1!2d135.505!3d34.683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDQxJzAwLjAiTiAxMzXCsDMwJzE4LjAiRQ!5e0!3m2!1sja!2sjp!4v1700000000000"
                width="100%"
                height="350"
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

      <GoldDivider />

      {/* ────────────────────── CONTACT ────────────────────── */}
      <section id="contact" className="cp04-contact" ref={contactRef}>
        <div className="cp04-container cp04-reveal">
          <div className="cp04-section-header">
            <span className="cp04-section-en">Contact</span>
            <h2 className="cp04-section-title">{data.contact.heading}</h2>
            <div className="cp04-section-line" />
          </div>
          <p className="cp04-contact-intro">{data.contact.intro}</p>
          <form
            className="cp04-contact-form"
            onSubmit={(e) => e.preventDefault()}
          >
            {data.contact.fields.map((f) => (
              <div key={f.name} className="cp04-form-group">
                <label className="cp04-form-label" htmlFor={`cp04-${f.name}`}>
                  {f.label}
                  {f.required && <span className="cp04-form-req">*</span>}
                </label>
                {f.type === "textarea" ? (
                  <textarea
                    id={`cp04-${f.name}`}
                    className="cp04-form-textarea"
                    rows={6}
                    required={f.required}
                  />
                ) : (
                  <input
                    id={`cp04-${f.name}`}
                    type={f.type}
                    className="cp04-form-input"
                    required={f.required}
                  />
                )}
              </div>
            ))}
            <button type="submit" className="cp04-form-submit">
              送信する
            </button>
          </form>
        </div>
      </section>

      {/* ────────────────────── FOOTER ────────────────────── */}
      <footer className="cp04-footer">
        <div className="cp04-container">
          <div className="cp04-footer-top">
            <span className="cp04-footer-brand">{data.company.name}</span>
            <p className="cp04-footer-catch">{data.footer.catchphrase}</p>
          </div>
          <div className="cp04-footer-divider" />
          <div className="cp04-footer-mid">
            <div className="cp04-footer-info">
              <p>〒{data.company.postalCode} {data.company.address}</p>
              <p>TEL: {data.company.phone} / FAX: {data.company.fax}</p>
              <p>{data.company.hours}</p>
            </div>
            <nav className="cp04-footer-nav">
              {data.navLinks.slice(0, 6).map((l) => (
                <a key={l.href} href={l.href} className="cp04-footer-link">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="cp04-footer-divider" />
          <p className="cp04-footer-copy">
            &copy; {new Date().getFullYear()} {data.company.name} All Rights
            Reserved.
          </p>
        </div>
      </footer>

      {/* ── back to top ── */}
      <button
        className={`cp04-back-top${showTop ? " cp04-back-top--show" : ""}`}
        onClick={scrollToTop}
        aria-label="ページ上部へ"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </div>
  );
}
