"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as data from "@/data/siteData";
import "./styles.css";

/* ── Monochrome SVG Illustrations ── */
function IllustTruck({ className = "" }: { className?: string }) {
  return (
    <svg className={`t02-illust ${className}`} viewBox="0 0 200 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="10" y="40" width="100" height="50" rx="3" />
      <path d="M110 55h40l25 20v15h-65" />
      <rect x="110" y="55" width="30" height="25" rx="2" />
      <circle cx="40" cy="95" r="12" /><circle cx="40" cy="95" r="5" />
      <circle cx="150" cy="95" r="12" /><circle cx="150" cy="95" r="5" />
      <line x1="52" y1="95" x2="138" y2="95" />
      <rect x="30" y="50" width="20" height="15" rx="2" opacity="0.4" />
      <rect x="60" y="50" width="20" height="15" rx="2" opacity="0.4" />
      <rect x="30" y="70" width="20" height="10" rx="2" opacity="0.3" />
    </svg>
  );
}

function IllustPackage({ className = "" }: { className?: string }) {
  return (
    <svg className={`t02-illust ${className}`} viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M60 10L110 35v50L60 110L10 85V35L60 10z" />
      <path d="M60 10v100" opacity="0.5" />
      <path d="M10 35l50 25l50-25" />
      <path d="M35 22.5L85 47.5" opacity="0.3" />
      <circle cx="60" cy="60" r="3" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

function IllustClipboard({ className = "" }: { className?: string }) {
  return (
    <svg className={`t02-illust ${className}`} viewBox="0 0 100 130" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="15" y="15" width="70" height="100" rx="4" />
      <rect x="32" y="5" width="36" height="20" rx="4" />
      <circle cx="50" cy="15" r="3" fill="currentColor" opacity="0.3" />
      <line x1="30" y1="45" x2="70" y2="45" opacity="0.5" />
      <line x1="30" y1="58" x2="65" y2="58" opacity="0.4" />
      <line x1="30" y1="71" x2="60" y2="71" opacity="0.3" />
      <line x1="30" y1="84" x2="55" y2="84" opacity="0.3" />
      <path d="M30 97l5 5 12-12" opacity="0.5" />
    </svg>
  );
}

function IllustClock({ className = "" }: { className?: string }) {
  return (
    <svg className={`t02-illust ${className}`} viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="60" cy="60" r="48" />
      <circle cx="60" cy="60" r="44" opacity="0.15" />
      <line x1="60" y1="60" x2="60" y2="28" strokeWidth="2" />
      <line x1="60" y1="60" x2="82" y2="52" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="3" fill="currentColor" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <line
          key={deg}
          x1={60 + 40 * Math.cos((deg - 90) * Math.PI / 180)}
          y1={60 + 40 * Math.sin((deg - 90) * Math.PI / 180)}
          x2={60 + (deg % 90 === 0 ? 44 : 42) * Math.cos((deg - 90) * Math.PI / 180)}
          y2={60 + (deg % 90 === 0 ? 44 : 42) * Math.sin((deg - 90) * Math.PI / 180)}
          strokeWidth={deg % 90 === 0 ? 2 : 1}
          opacity={deg % 90 === 0 ? 0.6 : 0.3}
        />
      ))}
    </svg>
  );
}

function IllustQuote({ className = "" }: { className?: string }) {
  return (
    <svg className={`t02-illust ${className}`} viewBox="0 0 140 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 65c0-22 12-40 35-50" opacity="0.4" />
      <path d="M20 40c-8 10-12 20-12 30 0 12 8 18 16 18s14-6 14-14-6-14-14-14c-2 0-4 0.5-6 1.5" fill="currentColor" opacity="0.08" stroke="currentColor" />
      <path d="M70 65c0-22 12-40 35-50" opacity="0.4" />
      <path d="M75 40c-8 10-12 20-12 30 0 12 8 18 16 18s14-6 14-14-6-14-14-14c-2 0-4 0.5-6 1.5" fill="currentColor" opacity="0.08" stroke="currentColor" />
    </svg>
  );
}

function IllustPerson({ className = "" }: { className?: string }) {
  return (
    <svg className={`t02-illust ${className}`} viewBox="0 0 100 140" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="50" cy="25" r="16" />
      <path d="M50 41v30" />
      <path d="M50 71l-20 35" />
      <path d="M50 71l20 35" />
      <path d="M50 50l-25 15" />
      <path d="M50 50l25 15" />
      <rect x="62" y="58" width="18" height="22" rx="2" opacity="0.3" />
      <line x1="66" y1="64" x2="76" y2="64" opacity="0.2" />
      <line x1="66" y1="69" x2="74" y2="69" opacity="0.2" />
    </svg>
  );
}

function IllustMap({ className = "" }: { className?: string }) {
  return (
    <svg className={`t02-illust ${className}`} viewBox="0 0 140 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 15l40 10 40-10 40 10v70l-40-10-40 10-40-10V15z" opacity="0.15" fill="currentColor" />
      <path d="M10 15l40 10 40-10 40 10v70l-40-10-40 10-40-10V15z" />
      <line x1="50" y1="25" x2="50" y2="95" opacity="0.3" />
      <line x1="90" y1="15" x2="90" y2="85" opacity="0.3" />
      <circle cx="70" cy="45" r="8" />
      <circle cx="70" cy="42" r="3" fill="currentColor" opacity="0.3" />
      <path d="M70 53l-8-11a8 8 0 1 1 16 0z" opacity="0.2" fill="currentColor" />
    </svg>
  );
}

function IllustPhone({ className = "" }: { className?: string }) {
  return (
    <svg className={`t02-illust ${className}`} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M25 15c0 0-10 5-12 15s5 25 20 40s30 22 40 20s15-12 15-12l-15-15c-2-2-6-1-8 1l-5 5c-2 2-5 2-7 0l-18-18c-2-2-2-5 0-7l5-5c2-2 3-6 1-8L25 15z" />
      <path d="M60 20c10 0 20 10 20 20" opacity="0.3" />
      <path d="M60 30c6 0 10 4 10 10" opacity="0.3" />
      <circle cx="70" cy="40" r="2" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

/* ── scroll-triggered staggered animation for child elements ── */
function useScrollAnimList<T extends HTMLElement = HTMLElement>(childSelector: string, visibleClass: string) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.querySelectorAll(childSelector).forEach((child, i) => {
          setTimeout(() => child.classList.add(visibleClass), i * 120);
        });
        obs.unobserve(el);
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [childSelector, visibleClass]);
  return ref;
}

/* ── fade-in observer ── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("t02-visible"); obs.unobserve(el); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ── split title (top/bottom merge) ── */
function SplitTitle({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <h2 ref={ref} className="t02-split-title">
      {text.split("").map((c, i) => (
        <span
          key={i}
          className={`t02-split-char ${vis ? "t02-split-char--in" : ""}`}
          style={{ transitionDelay: `${i * 45}ms` }}
          data-from={i % 2 === 0 ? "top" : "bottom"}
        >{c}</span>
      ))}
    </h2>
  );
}

/* ── underline animation on scroll ── */
function useUnderline() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = el.querySelectorAll(".t02-underline");
    if (!spans.length) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          spans.forEach((s, i) =>
            setTimeout(() => s.classList.add("t02-underline--visible"), i * 200)
          );
          obs.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ── typewriter animation ── */
function TypewriterHeadline() {
  const ref = useRef<HTMLDivElement>(null);
  const [displayed, setDisplayed] = useState<string[]>([]);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          obs.unobserve(el);
          const lines = data.hero.headlineParts;
          const full = lines.join("\n");
          let idx = 0;
          const tick = () => {
            idx++;
            const slice = full.slice(0, idx);
            setDisplayed(slice.split("\n"));
            if (idx < full.length) setTimeout(tick, 80);
          };
          setTimeout(tick, 400);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="t02-typewriter">
      {data.hero.headlineParts.map((_, pi) => (
        <span key={pi} className="t02-typewriter__line">
          {displayed[pi] || ""}
          {/* blinking cursor on the active line */}
          {pi === (displayed.length - 1) && (displayed[pi]?.length || 0) < data.hero.headlineParts[pi].length && (
            <span className="t02-typewriter__cursor" />
          )}
          {/* cursor at end when fully typed */}
          {pi === data.hero.headlineParts.length - 1 && displayed[pi] === data.hero.headlineParts[pi] && (
            <span className="t02-typewriter__cursor t02-typewriter__cursor--done" />
          )}
        </span>
      ))}
    </div>
  );
}

export default function Template02() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeReason, setActiveReason] = useState(0);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  /* scroll snap on html */
  useEffect(() => {
    document.documentElement.style.scrollSnapType = "y proximity";
    return () => { document.documentElement.style.scrollSnapType = ""; };
  }, []);

  const f1 = useFadeIn(), f2 = useFadeIn(), f3 = useFadeIn(), f4 = useFadeIn();
  const f5 = useFadeIn(), f6 = useFadeIn(), f7 = useFadeIn();
  const f8 = useFadeIn(), f9 = useFadeIn(), f10 = useFadeIn(), f11 = useFadeIn();

  /* underline refs */
  const ulJobs = useUnderline();
  const ulVoices = useUnderline();
  const ulBenefits = useUnderline();
  const ulCta = useUnderline();

  /* scroll-triggered staggered animations */
  const voicesRef = useScrollAnimList<HTMLDivElement>(".t02-voice", "t02-voice--visible");
  const newsRef = useScrollAnimList<HTMLUListElement>(".t02-news__item", "t02-news__item--visible");
  const benefitsRef = useScrollAnimList<HTMLUListElement>(".t02-benefits-item", "t02-benefits-item--visible");
  const timelineRef = useScrollAnimList<HTMLDivElement>(".t02-timeline__item", "t02-timeline__item--visible");

  return (
    <div className="theme-02">
      {/* ─── HEADER ─── */}
      <header className={`t02-header ${scrolled ? "t02-header--scrolled" : ""}`}>
        <div className="t02-header__inner">
          <a href="#" className="t02-logo">{data.company.nameEn}</a>
          <button className={`t02-hamburger ${menuOpen ? "t02-hamburger--open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="メニュー">
            <span /><span />
          </button>
          <nav className={`t02-nav ${menuOpen ? "t02-nav--open" : ""}`}>
            {data.navLinks.map((l) => (
              <a key={l.href} href={l.href} className="t02-nav__link" onClick={() => setMenuOpen(false)}>{l.label}</a>
            ))}
          </nav>
        </div>
      </header>

      {/* ─── HERO: kinetic typography, no bg image ─── */}
      <section className="t02-hero t02-snap-section">
        <video className="t02-hero-video" autoPlay muted loop playsInline poster="/keikamotsu-templates/images/hero-bg.webp">
          <source src="/keikamotsu-templates/videos/hero-daytime.mp4" type="video/mp4" />
        </video>
        <div className="t02-hero__inner">
          <IllustTruck className="t02-illust--hero" />
          <TypewriterHeadline />
          <div className="t02-hero__sub">
            {data.hero.subtext.map((t, i) => <p key={i}>{t}</p>)}
          </div>
          <div className="t02-hero__salary">
            月収 {data.hero.salaryMin}万〜{data.hero.salaryMax}万円
          </div>
          <div className="t02-hero__badges">
            {data.hero.badges.map((b) => <span key={b} className="t02-badge">{b}</span>)}
          </div>
          <a href={`tel:${data.company.phone}`} className="t02-btn">{data.hero.cta}</a>
        </div>
      </section>

      {/* ─── NO MARQUEE (minimal design) ─── */}

      {/* ─── REASONS: one-per-page snap sections ─── */}
      <section id="reasons" className="t02-snap-section">
        <span className="t02-section-num">01</span>
        <div ref={f1} className="t02-fade">
          <div className="t02-reasons-snap">
            <IllustPackage className="t02-illust--reasons" />
            <div className="t02-reasons-tabs">
              {data.reasons.map((r, i) => (
                <button
                  key={i}
                  className={`t02-reasons-tab ${activeReason === i ? "t02-reasons-tab--active" : ""}`}
                  onClick={() => setActiveReason(i)}
                >
                  {r.num}
                </button>
              ))}
            </div>
            <div className="t02-reason-display">
              <span className="t02-reason-display__num">{data.reasons[activeReason].num}</span>
              <div className="t02-reason-display__line" />
              <h3 className="t02-reason-display__title">{data.reasons[activeReason].title}</h3>
              <p className="t02-reason-display__text">{data.reasons[activeReason].text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── JOB INFO ─── */}
      <section id="jobs" className="t02-section t02-snap-section" ref={ulJobs as React.RefObject<HTMLElement>}>
        <span className="t02-section-num">02</span>
        <div ref={f2} className="t02-fade t02-container">
          <IllustClipboard className="t02-illust--section" />
          <SplitTitle text="求人情報" />
          <p className="t02-section-sub">{data.jobs.intro}</p>
          <div className="t02-table-clean">
            {data.jobs.rows.map((row, i) => (
              <div key={i} className="t02-table-clean__row">
                <span className="t02-table-clean__label">{row.dt}</span>
                <span className={`t02-table-clean__value ${row.accent ? "t02-accent" : ""}`}>
                  {row.accent ? <span className="t02-underline">{row.dd}</span> : row.dd}
                </span>
              </div>
            ))}
          </div>
          <div className="t02-req">
            <h4 className="t02-req__heading">応募資格</h4>
            <ul className="t02-req__list">
              {data.jobs.requirements.map((r, i) => (
                <li key={i}><span className="t02-dot" />{r}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── BENEFITS: minimal list ─── */}
      <section id="benefits" className="t02-section t02-snap-section" ref={ulBenefits as React.RefObject<HTMLElement>}>
        <span className="t02-section-num">03</span>
        <div ref={f3} className="t02-fade t02-container">
          <IllustPerson className="t02-illust--section" />
          <SplitTitle text="待遇・福利厚生" />
          <ul className="t02-benefits-list" ref={benefitsRef}>
            {data.benefits.map((b, i) => (
              <li key={i} className="t02-benefits-item">
                <span className="t02-benefits-dot" />
                <div>
                  <strong><span className="t02-underline">{b.title}</span></strong>
                  <span className="t02-benefits-sep"> &mdash; </span>
                  <span className="t02-benefits-desc">{b.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── DAILY: vertical timeline with large times ─── */}
      <section id="daily" className="t02-section t02-snap-section">
        <span className="t02-section-num">04</span>
        <div ref={f4} className="t02-fade t02-container">
          <IllustClock className="t02-illust--section" />
          <SplitTitle text="1日の流れ" />
          <p className="t02-section-sub">{data.daily.intro}</p>
          <div className="t02-timeline" ref={timelineRef}>
            {data.daily.steps.map((s, i) => (
              <div key={i} className="t02-timeline__item">
                <span className="t02-timeline__time">{s.time}</span>
                <div className="t02-timeline__line" />
                <div className="t02-timeline__content">
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VOICES: one-per-card large italic quotes ─── */}
      <section id="voices" className="t02-section t02-snap-section" ref={ulVoices as React.RefObject<HTMLElement>}>
        <span className="t02-section-num">05</span>
        <div ref={f5} className="t02-fade t02-container">
          <IllustQuote className="t02-illust--section" />
          <SplitTitle text="先輩の声" />
          <div className="t02-voices" ref={voicesRef}>
            {data.voices.map((v, i) => (
              <blockquote key={i} className="t02-voice">
                <p className="t02-voice__text">&ldquo;{v.text}&rdquo;</p>
                <cite className="t02-voice__cite">
                  {v.name}（{v.age}・{v.prev}）
                </cite>
                <p className="t02-voice__highlight"><span className="t02-underline">{v.highlight}</span></p>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALLERY: filmstrip horizontal scroll ─── */}
      <section id="gallery" className="t02-section t02-snap-section">
        <span className="t02-section-num">06</span>
        <div ref={f8} className="t02-fade t02-container">
          <SplitTitle text={data.gallery.heading} />
          <p className="t02-section-sub">{data.gallery.intro}</p>
        </div>
        <div className="t02-filmstrip">
          {data.gallery.images.map((img, i) => (
            <figure key={i} className="t02-filmstrip__frame">
              <span className="t02-filmstrip__idx">{String(i + 1).padStart(2, "0")}</span>
              <Image src={`/keikamotsu-templates${img.src}`} alt={img.alt} width={600} height={400} className="t02-filmstrip__img" />
              <figcaption className="t02-filmstrip__caption">{img.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="t02-section t02-snap-section">
        <span className="t02-section-num">07</span>
        <div ref={f9} className="t02-fade t02-container">
          <SplitTitle text="よくある質問" />
          <div className="t02-faq">
            {data.faq.map((item, i) => (
              <details key={i} className="t02-faq__item">
                <summary className="t02-faq__q">{item.q}</summary>
                <p className="t02-faq__a">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWS ─── */}
      <section id="news" className="t02-section t02-snap-section">
        <span className="t02-section-num">08</span>
        <div ref={f6} className="t02-fade t02-container">
          <SplitTitle text="お知らせ" />
          <ul className="t02-news" ref={newsRef}>
            {data.news.map((n, i) => (
              <li key={i} className="t02-news__item">
                <time>{n.date}</time>
                <span className={`t02-news__tag t02-news__tag--${n.tagStyle}`}>{n.tag}</span>
                <span>{n.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── ACCESS ─── */}
      <section id="access" className="t02-section t02-snap-section">
        <span className="t02-section-num">09</span>
        <div ref={f10} className="t02-fade t02-container">
          <IllustMap className="t02-illust--section" />
          <SplitTitle text={data.access.heading} />
          <div className="t02-access">
            <p className="t02-access__addr">{data.company.address}</p>
            <p className="t02-access__station">{data.access.nearestStation}</p>
            <p className="t02-access__note">{data.access.mapNote}</p>
            <div className="t02-access__map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.1!2d135.505!3d34.685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z5aSn6Ziq5bqc5aSn6Ziq5biC5Lit5aSu5Yy65pys55S6!5e0!3m2!1sja!2sjp!4v1"
                width="100%" height="300" style={{ border: 0 }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── COMPANY ─── */}
      <section id="company" className="t02-section t02-snap-section">
        <span className="t02-section-num">10</span>
        <div ref={f7} className="t02-fade t02-container">
          <SplitTitle text="会社概要" />
          <div className="t02-table-clean t02-table-clean--narrow">
            {data.companyInfo.map((c, i) => (
              <div key={i} className="t02-table-clean__row">
                <span className="t02-table-clean__label">{c.dt}</span>
                <span className="t02-table-clean__value">{c.dd}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── APPLICATION FORM ─── */}
      <section id="apply" className="t02-section t02-snap-section">
        <div ref={f11} className="t02-fade t02-container">
          <SplitTitle text="Web応募フォーム" />
          <p className="t02-section-sub">下記フォームからお気軽にご応募ください。</p>
          <form className="t02-form" onSubmit={(e) => e.preventDefault()}>
            <div className="t02-form__group">
              <label className="t02-form__label">お名前 *</label>
              <input type="text" className="t02-form__input" required />
            </div>
            <div className="t02-form__group">
              <label className="t02-form__label">電話番号 *</label>
              <input type="tel" className="t02-form__input" required />
            </div>
            <div className="t02-form__group">
              <label className="t02-form__label">メールアドレス</label>
              <input type="email" className="t02-form__input" />
            </div>
            <div className="t02-form__group">
              <label className="t02-form__label">メッセージ</label>
              <textarea className="t02-form__textarea" rows={4} />
            </div>
            <button type="submit" className="t02-form__submit">送信する</button>
          </form>
        </div>
      </section>

      {/* ─── CTA: just phone in huge text ─── */}
      <section className="t02-cta t02-snap-section" ref={ulCta as React.RefObject<HTMLElement>}>
        <IllustPhone className="t02-illust--cta" />
        <h2 className="t02-cta__heading"><span className="t02-underline">「ちょっと話を聞いてみたい」</span>——それだけで大丈夫です。</h2>
        <p className="t02-cta__sub">{data.cta.subtext}</p>
        <a href={`tel:${data.company.phone}`} className="t02-cta__phone">{data.cta.phone}</a>
        <p className="t02-cta__hours">{data.company.hours}</p>
        <a href="#" className="t02-btn">{data.cta.webLabel}</a>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="t02-footer">
        <div className="t02-footer__inner">
          <p className="t02-footer__catch">{data.footer.catchphrase}</p>
          <div className="t02-footer__line" />
          <p className="t02-footer__name">{data.company.name}</p>
          <p className="t02-footer__addr">{data.company.address}</p>
          <nav className="t02-footer__nav">
            {data.navLinks.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </nav>
          <p className="t02-footer__copy">&copy; {data.company.name}</p>
        </div>
      </footer>
    </div>
  );
}
