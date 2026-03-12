"use client";

/* ===================================================
   Corporate Template 02 — トラストブルー
   信頼・堅実・セリフ体
   青 #0056b3 × 緑 #00a86b
   =================================================== */

import "./styles.css";
import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import * as data from "@/data/corporateSiteData";

/* ─── Ornament Separator ─── */
function OrnamentSeparator() {
  return (
    <div className="cp02-ornament" aria-hidden="true">
      <span className="cp02-ornament-line" />
      <span className="cp02-ornament-diamond" />
      <span className="cp02-ornament-line" />
    </div>
  );
}

/* ─── AnimatedCounter ─── */
function AnimatedCounter({
  value,
  suffix,
}: {
  value: string;
  suffix: string;
}) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const numeric = parseFloat(value.replace(/,/g, ""));
          const isDecimal = value.includes(".");
          const hasComma = value.includes(",");
          const duration = 1600;
          const steps = 40;
          const interval = duration / steps;
          let step = 0;
          const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            const eased = 1 - Math.pow(1 - progress, 3);
            let current = numeric * eased;
            if (isDecimal) {
              let formatted = current.toFixed(1);
              setDisplay(formatted);
            } else {
              let n = Math.round(current);
              if (hasComma) {
                setDisplay(n.toLocaleString());
              } else {
                setDisplay(String(n));
              }
            }
            if (step >= steps) {
              clearInterval(timer);
              setDisplay(value);
            }
          }, interval);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="cp02-counter-value">
      {display}
      <span className="cp02-counter-suffix">{suffix}</span>
    </span>
  );
}

/* ─── Main Component ─── */
export default function CorporateTemplate02() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const heroRef = useRef<HTMLElement>(null);

  /* ── scroll: header, back-to-top, parallax, active section ── */
  useEffect(() => {
    const sectionIds = ["services", "strengths", "message", "company", "history", "numbers", "partners", "news", "recruit", "access", "contact"];
    const handler = () => {
      setScrolled(window.scrollY > 60);
      setShowTop(window.scrollY > 500);

      /* parallax hero */
      if (heroRef.current) {
        const y = window.scrollY;
        heroRef.current.style.setProperty("--parallax-y", `${y * 0.4}px`);
      }

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
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* ── IntersectionObserver scroll reveal ── */
  useEffect(() => {
    const els = document.querySelectorAll(".cp02-reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("cp02-visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* ── Close mobile menu on nav click ── */
  const handleNavClick = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const serviceImages = [
    "/keikamotsu-templates/images/service-ec.png",
    "/keikamotsu-templates/images/service-b2b.png",
    "/keikamotsu-templates/images/service-spot.png",
    "/keikamotsu-templates/images/service-route.png",
  ];

  const strengthImages = [
    "/keikamotsu-templates/images/reasons.png",
    "/keikamotsu-templates/images/workplace.png",
    "/keikamotsu-templates/images/vehicle.png",
  ];

  const galleryPhotos = [
    { src: "/keikamotsu-templates/images/team.png", alt: "チームメンバー", caption: "チームワーク" },
    { src: "/keikamotsu-templates/images/loading.png", alt: "積み込み作業", caption: "丁寧な積み込み" },
    { src: "/keikamotsu-templates/images/workplace.png", alt: "事務所風景", caption: "整備された環境" },
    { src: "/keikamotsu-templates/images/vehicle.png", alt: "配送車両", caption: "配送車両" },
    { src: "/keikamotsu-templates/images/reasons.png", alt: "研修風景", caption: "充実の研修制度" },
    { src: "/keikamotsu-templates/images/delivery.png", alt: "配送業務", caption: "安全な配送" },
  ];

  /* ── tag color helper ── */
  const tagClass = (style: string) => {
    switch (style) {
      case "press":
        return "cp02-tag-press";
      case "new":
        return "cp02-tag-new";
      default:
        return "cp02-tag-default";
    }
  };

  return (
    <div className="theme-cp02">
      {/* ============================================
          1. HEADER / NAV
          ============================================ */}
      <header className={`cp02-header${scrolled ? " cp02-header-scrolled" : ""}`}>
        <div className="cp02-header-inner">
          <a href="#" className="cp02-logo" onClick={scrollToTop}>
            <span className="cp02-logo-icon">GL</span>
            <span className="cp02-logo-text">{data.company.name}</span>
          </a>

          <nav className={`cp02-nav${menuOpen ? " cp02-nav-open" : ""}`}>
            {data.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`cp02-nav-link${activeSection === link.href.replace("#", "") ? " cp02-nav-active" : ""}`}
                onClick={handleNavClick}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a href="#contact" className="cp02-header-cta">
            お問い合わせ
          </a>

          <button
            className={`cp02-hamburger${menuOpen ? " cp02-hamburger-active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニュー"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* ============================================
          2. HERO
          ============================================ */}
      <section className="cp02-hero" ref={heroRef}>
        <video className="cp02-hero__video" autoPlay muted loop playsInline poster="/keikamotsu-templates/images/hero-bg.webp">
          <source src="/keikamotsu-templates/videos/hero-daytime.mp4" type="video/mp4" />
        </video>
        <div className="cp02-hero-bg" />
        <div className="cp02-hero-overlay" />
        <div className="cp02-hero-content cp02-reveal">
          <h1 className="cp02-hero-headline">
            {data.hero.headline.split("、").length > 1 ? (
              <>
                {data.hero.headline.split("、")[0]}、<br className="br-desktop" />
                {data.hero.headline.split("、").slice(1).join("、")}
              </>
            ) : (
              data.hero.headline
            )}
          </h1>
          <div className="cp02-hero-subtext">
            {data.hero.subtext.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <a href="#contact" className="cp02-hero-cta">
            {data.hero.cta}
          </a>
        </div>
      </section>

      <OrnamentSeparator />

      {/* ============================================
          3. SERVICES
          ============================================ */}
      <section id="services" className="cp02-section cp02-section-white">
        <div className="cp02-container">
          <h2 className="cp02-section-title cp02-reveal">
            <span className="cp02-section-title-en">Services</span>
            事業内容
          </h2>
          <div className="cp02-services-grid">
            {data.services.map((svc, i) => (
              <div key={i} className="cp02-service-card cp02-reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <Image src={serviceImages[i]} alt={svc.title} width={400} height={250} className="cp02-service-img" />
                <div className="cp02-service-icon">{svc.icon}</div>
                <span className="cp02-service-num">{svc.num}</span>
                <h3 className="cp02-service-title">{svc.title}</h3>
                <p className="cp02-service-text">{svc.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <OrnamentSeparator />

      {/* ============================================
          4. STRENGTHS
          ============================================ */}
      <section id="strengths" className="cp02-section cp02-section-alt">
        <div className="cp02-container">
          <h2 className="cp02-section-title cp02-reveal">
            <span className="cp02-section-title-en">Strengths</span>
            私たちの強み
          </h2>
          <div className="cp02-strengths-list">
            {data.strengths.map((item, i) => (
              <div key={i} className={`cp02-strength-row cp02-reveal${i % 2 !== 0 ? " cp02-strength-row--reverse" : ""}`} style={{ transitionDelay: `${i * 0.12}s` }}>
                <div className="cp02-strength-row__image">
                  <Image src={strengthImages[i % strengthImages.length]} alt={item.title} width={520} height={340} className="cp02-strength-row__img" />
                </div>
                <div className="cp02-strength-row__content">
                  <div className="cp02-strength-num">{item.num}</div>
                  <h3 className="cp02-strength-title">{item.title}</h3>
                  <p className="cp02-strength-text">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <OrnamentSeparator />

      {/* ============================================
          5. CEO MESSAGE
          ============================================ */}
      <section id="message" className="cp02-section cp02-section-white">
        <div className="cp02-container">
          <h2 className="cp02-section-title cp02-reveal">
            <span className="cp02-section-title-en">Message</span>
            代表メッセージ
          </h2>
          <div className="cp02-vertical-quote cp02-reveal">
            <p className="cp02-vertical-text">信頼を届ける、その先へ。</p>
          </div>
          <div className="cp02-message-layout cp02-reveal">
            <div className="cp02-message-portrait">
              <Image src="/keikamotsu-templates/images/ceo-portrait.png" alt="代表取締役 田中 誠一" width={280} height={350} className="cp02-ceo-img" />
            </div>
            <div className="cp02-message-body">
              <div className="cp02-message-wrapper">
                <div className="cp02-message-left">
                  <div className="cp02-message-bar" />
                  <div className="cp02-message-info">
                    <p className="cp02-message-title">{data.ceoMessage.title}</p>
                    <p className="cp02-message-name">{data.ceoMessage.name}</p>
                  </div>
                </div>
                <div className="cp02-message-right">
                  {data.ceoMessage.message.map((para, i) => (
                    <p key={i} className="cp02-message-para">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <OrnamentSeparator />

      {/* ============================================
          6. COMPANY OVERVIEW
          ============================================ */}
      <section id="company" className="cp02-section cp02-section-alt">
        <div className="cp02-container">
          <h2 className="cp02-section-title cp02-reveal">
            <span className="cp02-section-title-en">Company</span>
            会社概要
          </h2>
          <div className="cp02-company-layout cp02-reveal">
            <div className="cp02-overview-table-wrap">
              <table className="cp02-overview-table">
                <tbody>
                  {data.companyOverview.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "cp02-row-even" : ""}>
                      <th>{row.dt}</th>
                      <td>{row.dd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="cp02-company-photo">
              <Image src="/keikamotsu-templates/images/company.png" alt="本社・寝屋川営業所" width={480} height={360} className="cp02-company-photo__img" />
              <p className="cp02-company-photo__caption">本社・寝屋川営業所</p>
            </div>
          </div>
        </div>
      </section>

      <OrnamentSeparator />

      {/* ============================================
          7. HISTORY (horizontal timeline)
          ============================================ */}
      <section id="history" className="cp02-section cp02-section-white">
        <div className="cp02-container">
          <h2 className="cp02-section-title cp02-reveal">
            <span className="cp02-section-title-en">History</span>
            沿革
          </h2>
          <div className="cp02-timeline-wrap cp02-reveal">
            <div className="cp02-timeline">
              <div className="cp02-timeline-line" />
              {data.history.map((item, i) => (
                <div key={i} className="cp02-timeline-item cp02-reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="cp02-timeline-dot" />
                  <div className="cp02-timeline-year">{item.year}</div>
                  <div className="cp02-timeline-event">{item.event}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          8. NUMBERS
          ============================================ */}
      <section id="numbers" className="cp02-section cp02-section-numbers">
        <div className="cp02-container">
          <h2 className="cp02-section-title cp02-section-title-white cp02-reveal">
            <span className="cp02-section-title-en">Numbers</span>
            数字で見る実績
          </h2>
          <div className="cp02-numbers-grid">
            {data.numbers.map((n, i) => (
              <div key={i} className="cp02-number-card cp02-reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <p className="cp02-number-label">{n.label}</p>
                <div className="cp02-number-value">
                  <AnimatedCounter value={n.value} suffix={n.suffix} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <OrnamentSeparator />

      {/* ============================================
          9. PARTNERS
          ============================================ */}
      <section id="partners" className="cp02-section cp02-section-alt">
        <div className="cp02-container">
          <h2 className="cp02-section-title cp02-reveal">
            <span className="cp02-section-title-en">Partners</span>
            主要取引先
          </h2>
          <div className="cp02-partners-grid">
            {data.partners.map((p, i) => (
              <div key={i} className="cp02-partner-card cp02-reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <img src={p.logo} alt={p.name} className="cp02-partner-logo" />
                <span className="cp02-partner-badge">{p.industry}</span>
                <p className="cp02-partner-name">{p.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          VISUAL INTERLUDE
          ============================================ */}
      <section className="cp02-interlude">
        <Image src="/keikamotsu-templates/images/delivery.png" alt="配送業務" fill className="cp02-interlude__img" />
        <div className="cp02-interlude__overlay" />
        <p className="cp02-interlude__text cp02-reveal">確実に、丁寧に、届ける。</p>
      </section>

      {/* ============================================
          PHOTO GALLERY
          ============================================ */}
      <section className="cp02-section cp02-section-white">
        <div className="cp02-container">
          <h2 className="cp02-section-title cp02-reveal">
            <span className="cp02-section-title-en">Gallery</span>
            フォトギャラリー
          </h2>
          <div className="cp02-gallery-grid">
            {galleryPhotos.map((photo, i) => (
              <div key={i} className="cp02-gallery-item cp02-reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                <Image src={photo.src} alt={photo.alt} width={400} height={300} className="cp02-gallery-item__img" />
                <div className="cp02-gallery-item__overlay">
                  <p className="cp02-gallery-item__caption">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <OrnamentSeparator />

      {/* ============================================
          10. NEWS
          ============================================ */}
      <section id="news" className="cp02-section cp02-section-white">
        <div className="cp02-container">
          <h2 className="cp02-section-title cp02-reveal">
            <span className="cp02-section-title-en">News</span>
            お知らせ
          </h2>
          <ul className="cp02-news-list cp02-reveal">
            {data.news.map((item, i) => (
              <li key={i} className="cp02-news-item" style={{ transitionDelay: `${i * 0.1}s` }}>
                <time className="cp02-news-date">{item.date}</time>
                <span className={`cp02-news-tag ${tagClass(item.tagStyle)}`}>
                  {item.tag}
                </span>
                <span className="cp02-news-title">{item.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================================
          11. RECRUIT CTA
          ============================================ */}
      <section id="recruit" className="cp02-section cp02-section-recruit">
        <div className="cp02-container">
          <div className="cp02-recruit-inner cp02-reveal">
            <h2 className="cp02-recruit-heading">{data.recruit.heading}</h2>
            <p className="cp02-recruit-text">{data.recruit.text}</p>
            <a href={data.recruit.link} className="cp02-recruit-cta">
              {data.recruit.cta}
            </a>
          </div>
        </div>
      </section>

      <OrnamentSeparator />

      {/* ============================================
          12. ACCESS
          ============================================ */}
      <section id="access" className="cp02-section cp02-section-white">
        <div className="cp02-container">
          <h2 className="cp02-section-title cp02-reveal">
            <span className="cp02-section-title-en">Access</span>
            {data.access.heading}
          </h2>
          <div className="cp02-access-wrapper cp02-reveal">
            <div className="cp02-access-info">
              <dl className="cp02-access-dl">
                <dt>所在地</dt>
                <dd>〒{data.company.postalCode} {data.access.address}</dd>
                <dt>最寄り駅</dt>
                <dd>{data.access.nearestStation}</dd>
                <dt>電話番号</dt>
                <dd>{data.company.phone}</dd>
                <dt>営業時間</dt>
                <dd>{data.company.hours}</dd>
              </dl>
              <p className="cp02-access-note">{data.access.mapNote}</p>
            </div>
            <div className="cp02-access-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.1!2d135.5!3d34.68!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDQwJzQ4LjAiTiAxMzXCsDMwJzAwLjAiRQ!5e0!3m2!1sja!2sjp!4v1700000000000"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: 8 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="アクセスマップ"
              />
            </div>
          </div>
        </div>
      </section>

      <OrnamentSeparator />

      {/* ============================================
          13. CONTACT FORM
          ============================================ */}
      <section id="contact" className="cp02-section cp02-section-alt">
        <div className="cp02-container">
          <h2 className="cp02-section-title cp02-reveal">
            <span className="cp02-section-title-en">Contact</span>
            {data.contact.heading}
          </h2>
          <p className="cp02-contact-intro cp02-reveal">{data.contact.intro}</p>
          <form
            className="cp02-contact-form cp02-reveal"
            onSubmit={(e) => {
              e.preventDefault();
              alert("送信が完了しました（デモ）");
            }}
          >
            {data.contact.fields.map((field) => (
              <div key={field.name} className="cp02-form-group">
                <label className="cp02-form-label" htmlFor={`cp02-${field.name}`}>
                  {field.label}
                  {field.required && <span className="cp02-form-req">必須</span>}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    id={`cp02-${field.name}`}
                    name={field.name}
                    className="cp02-form-textarea"
                    rows={5}
                    required={field.required}
                  />
                ) : (
                  <input
                    id={`cp02-${field.name}`}
                    name={field.name}
                    type={field.type}
                    className="cp02-form-input"
                    required={field.required}
                  />
                )}
              </div>
            ))}
            <div className="cp02-form-actions">
              <button type="submit" className="cp02-form-submit">
                送信する
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ============================================
          14. FOOTER
          ============================================ */}
      <footer className="cp02-footer">
        <div className="cp02-container">
          <div className="cp02-footer-inner">
            <div className="cp02-footer-brand">
              <p className="cp02-footer-company">{data.company.name}</p>
              <p className="cp02-footer-catchphrase">{data.footer.catchphrase}</p>
              <p className="cp02-footer-address">
                〒{data.company.postalCode} {data.company.address}
              </p>
              <p className="cp02-footer-tel">TEL: {data.company.phone}</p>
            </div>
            <nav className="cp02-footer-nav">
              {data.navLinks.map((link) => (
                <a key={link.href} href={link.href} className="cp02-footer-link">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="cp02-footer-bottom">
            <p>&copy; {new Date().getFullYear()} {data.company.name} All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* ── Back to Top ── */}
      <button
        className={`cp02-back-to-top${showTop ? " cp02-back-to-top-show" : ""}`}
        onClick={scrollToTop}
        aria-label="ページトップへ"
      >
        &#9650;
      </button>
    </div>
  );
}
