"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import * as data from "@/data/siteData";
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
          setTimeout(() => el.classList.add("t11-revealed"), delay);
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

/* ── typewriter hook ── */
function useTypewriter(text: string, speed = 60) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const started = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          let i = 0;
          const iv = setInterval(() => {
            i++;
            setDisplayed(text.slice(0, i));
            if (i >= text.length) {
              clearInterval(iv);
              setDone(true);
            }
          }, speed);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [text, speed]);

  return { ref, displayed, done };
}

/* ── scroll-triggered animation hook ── */
function useScrollAnim() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".t11-anim");
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const anim = el.dataset.anim;
            if (anim) el.classList.add(anim);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ── Matrix rain columns ── */
function MatrixRain() {
  const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789DRIVER";
  const cols = 30;
  return (
    <div className="t11-matrix" aria-hidden="true">
      {Array.from({ length: cols }).map((_, i) => (
        <div
          key={i}
          className="t11-matrix__col"
          style={{
            left: `${(i / cols) * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 8}s`,
          }}
        >
          {Array.from({ length: 20 }).map((_, j) => (
            <span key={j} style={{ animationDelay: `${j * 0.15}s` }}>
              {chars[Math.floor(Math.random() * chars.length)]}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Template11() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const galleryTouchStart = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setGalleryIdx((prev) => (prev + 1) % data.gallery.images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useScrollAnim();

  const heroText = data.hero.headlineParts.join("");
  const tw = useTypewriter(heroText, 50);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const r1 = useReveal(0);
  const r2 = useReveal(100);
  const r3 = useReveal(0);
  const r4 = useReveal(100);
  const r5 = useReveal(0);
  const rGallery = useReveal(0);
  const rFaq = useReveal(100);
  const r6 = useReveal(100);
  const rAccess = useReveal(0);
  const r7 = useReveal(0);
  const rApply = useReveal(100);
  const r8 = useReveal(0);

  return (
    <div className="theme-11">
      {/* Grid overlay */}
      <div className="t11-grid-overlay" aria-hidden="true" />

      {/* ─── STICKY HEADER ─── */}
      <header className={`t11-header ${scrolled ? "t11-header--scrolled" : ""}`}>
        <div className="t11-header__inner">
          <a href="#" className="t11-logo">
            <span className="t11-logo__bracket">&lt;</span>
            <span className="t11-logo__text">{data.company.nameEn}</span>
            <span className="t11-logo__bracket">/&gt;</span>
          </a>
          <button
            className={`t11-hamburger ${menuOpen ? "t11-hamburger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニュー"
          >
            <span /><span /><span />
          </button>
          <nav className={`t11-nav ${menuOpen ? "t11-nav--open" : ""}`}>
            {data.navLinks.map((l) => (
              <a key={l.href} href={l.href} className="t11-nav__link" onClick={closeMenu}>
                <span className="t11-nav__prefix">&gt; </span>{l.label}
              </a>
            ))}
            <a href={`tel:${data.company.phone}`} className="t11-nav__cta">
              {data.hero.cta}
            </a>
          </nav>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="t11-hero">
        <video className="t11-hero-video" autoPlay muted loop playsInline poster="/keikamotsu-templates/images/hero-bg.webp">
          <source src="/keikamotsu-templates/videos/hero-nightcity.mp4" type="video/mp4" />
        </video>
        <div className="t11-hero__bg" />
        <MatrixRain />
        <div className="t11-hero__content" ref={tw.ref}>
          <div className="t11-hero__terminal">
            <div className="t11-terminal-bar">
              <span className="t11-dot t11-dot--red" />
              <span className="t11-dot t11-dot--yellow" />
              <span className="t11-dot t11-dot--green" />
              <span className="t11-terminal-bar__title">recruit.exe</span>
            </div>
            <div className="t11-terminal-body">
              <p className="t11-hero__prompt">
                <span className="t11-prompt-symbol">$ </span>
                <span className="t11-typewriter">{tw.displayed}</span>
                <span className={`t11-cursor ${tw.done ? "t11-cursor--blink" : ""}`}>_</span>
              </p>
              <div className="t11-hero__sub">
                {data.hero.subtext.map((t, i) => (
                  <p key={i} className="t11-hero__subline">
                    <span className="t11-prompt-symbol">&gt; </span>{t}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="t11-hero__badges">
            {data.hero.badges.map((b, i) => (
              <span key={b} className="t11-badge" style={{ animationDelay: `${1.5 + i * 0.15}s` }}>
                [{b}]
              </span>
            ))}
          </div>
          <div className="t11-hero__salary">
            <span className="t11-salary-label">salary:</span>
            <strong className="t11-glitch" data-text={`${data.hero.salaryMin}万〜${data.hero.salaryMax}万円`}>
              {data.hero.salaryMin}万〜{data.hero.salaryMax}万円
            </strong>
          </div>
          <a href={`tel:${data.company.phone}`} className="t11-btn-neon">
            {data.hero.cta}
          </a>
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="t11-marquee">
        <div className="t11-marquee__track">
          {[...data.marquee.top, ...data.marquee.top, ...data.marquee.top].map((t, i) => (
            <span key={i} className="t11-marquee__item">&gt; {t}</span>
          ))}
        </div>
        <div className="t11-marquee__track t11-marquee__track--reverse">
          {[...data.marquee.bottom, ...data.marquee.bottom, ...data.marquee.bottom].map((t, i) => (
            <span key={i} className="t11-marquee__item">&gt; {t}</span>
          ))}
        </div>
      </div>

      {/* ─── REASONS ─── */}
      <section id="reasons" className="t11-section">
        <div ref={r1} className="t11-reveal t11-container">
          <h2 className="t11-section-title t11-glitch t11-anim" data-text="選ばれる3つの理由" data-anim="t11-anim--glitch">
            選ばれる<span className="t11-cyan">3</span>つの理由
          </h2>
          <div className="t11-reasons-grid">
            {data.reasons.map((r, i) => (
              <article key={i} className={`t11-reason-card t11-anim t11-anim-delay-${i + 1}`} data-anim="t11-anim--scan">
                <div className="t11-terminal-bar">
                  <span className="t11-dot t11-dot--red" />
                  <span className="t11-dot t11-dot--yellow" />
                  <span className="t11-dot t11-dot--green" />
                  <span className="t11-terminal-bar__title">reason_{r.num}.sh</span>
                </div>
                <div className="t11-reason-card__body">
                  <span className="t11-reason-card__num">{r.num}</span>
                  <h3 className="t11-reason-card__title">{r.title}</h3>
                  <p className="t11-reason-card__text">{r.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── JOB INFO (code/config style) ─── */}
      <section id="jobs" className="t11-section">
        <div ref={r2} className="t11-reveal t11-container">
          <h2 className="t11-section-title t11-glitch t11-anim" data-text="求人情報" data-anim="t11-anim--glitch">求人情報</h2>
          <p className="t11-section-intro">{data.jobs.intro}</p>
          <div className="t11-code-block">
            <div className="t11-terminal-bar">
              <span className="t11-dot t11-dot--red" />
              <span className="t11-dot t11-dot--yellow" />
              <span className="t11-dot t11-dot--green" />
              <span className="t11-terminal-bar__title">job_config.yaml</span>
            </div>
            <div className="t11-code-body">
              {data.jobs.rows.map((row, i) => (
                <div key={i} className="t11-code-line">
                  <span className="t11-line-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="t11-code-key">{row.dt}:</span>
                  <span className={`t11-code-val ${row.accent ? "t11-purple" : ""}`}>{row.dd}</span>
                </div>
              ))}
              <div className="t11-code-line">
                <span className="t11-line-num">{String(data.jobs.rows.length + 1).padStart(2, "0")}</span>
                <span className="t11-code-key">応募資格:</span>
              </div>
              {data.jobs.requirements.map((req, i) => (
                <div key={i} className="t11-code-line t11-code-line--indent">
                  <span className="t11-line-num">{String(data.jobs.rows.length + 2 + i).padStart(2, "0")}</span>
                  <span className="t11-code-comment">  - {req}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── BENEFITS ─── */}
      <section id="benefits" className="t11-section">
        <div ref={r3} className="t11-reveal t11-container">
          <h2 className="t11-section-title t11-glitch t11-anim" data-text="待遇・福利厚生" data-anim="t11-anim--glitch">待遇・福利厚生</h2>
          <div className="t11-benefits-grid">
            {data.benefits.map((b, i) => (
              <div key={i} className={`t11-benefit-card t11-anim t11-anim-delay-${(i % 4) + 1}`} data-anim="t11-anim--scan">
                <div className="t11-benefit-card__scan" />
                <div className="t11-benefit-card__icon">
                  <span>{b.title.charAt(0)}</span>
                </div>
                <h4 className="t11-benefit-card__title">{b.title}</h4>
                <p className="t11-benefit-card__text">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DAILY SCHEDULE ─── */}
      <section id="daily" className="t11-section">
        <div ref={r4} className="t11-reveal t11-container">
          <h2 className="t11-section-title t11-glitch t11-anim" data-text="1日の流れ" data-anim="t11-anim--glitch">1日の流れ</h2>
          <p className="t11-section-intro">{data.daily.intro}</p>
          <div className="t11-daily-grid">
            {data.daily.steps.map((s, i) => (
              <div key={i} className={`t11-daily-step t11-anim t11-anim-delay-${(i % 4) + 1}`} data-anim="t11-anim--scan">
                <div className="t11-daily-step__time">
                  <span className="t11-digital-time">{s.time}</span>
                </div>
                {i < data.daily.steps.length - 1 && (
                  <div className="t11-daily-step__connector" />
                )}
                <div className="t11-daily-step__content">
                  <h4 className="t11-daily-step__title">{s.title}</h4>
                  <p className="t11-daily-step__desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VOICES ─── */}
      <section id="voices" className="t11-section">
        <div ref={r5} className="t11-reveal t11-container">
          <h2 className="t11-section-title t11-glitch t11-anim" data-text="先輩ドライバーの声" data-anim="t11-anim--glitch">先輩ドライバーの声</h2>
          <div className="t11-voices-grid">
            {data.voices.map((v, i) => (
              <article key={i} className={`t11-voice-card t11-anim t11-anim-delay-${i + 1}`} data-anim="t11-anim--scan">
                <div className="t11-voice-card__header">
                  <span className="t11-voice-card__avatar">{v.name.charAt(0)}</span>
                  <div>
                    <strong className="t11-voice-card__name">{v.name}</strong>
                    <span className="t11-voice-card__meta">{v.age}・{v.prev}</span>
                  </div>
                </div>
                <p className="t11-voice-card__body">
                  <span className="t11-prompt-symbol">&gt; </span>{v.text}
                </p>
                <p className="t11-voice-card__highlight">
                  <span className="t11-cyan">&quot;{v.highlight}&quot;</span>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section id="gallery" className="t11-section">
        <div ref={rGallery} className="t11-reveal t11-container">
          <h2 className="t11-section-title t11-glitch t11-anim" data-text={data.gallery.heading} data-anim="t11-anim--glitch">{data.gallery.heading}</h2>
          <p className="t11-section-intro">{data.gallery.intro}</p>
          <div
            className="t11-carousel"
            onTouchStart={(e) => { galleryTouchStart.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              const diff = galleryTouchStart.current - e.changedTouches[0].clientX;
              if (diff > 50) setGalleryIdx((prev) => (prev + 1) % data.gallery.images.length);
              if (diff < -50) setGalleryIdx((prev) => (prev - 1 + data.gallery.images.length) % data.gallery.images.length);
            }}
          >
            <div className="t11-carousel__track" style={{ transform: `translateX(-${galleryIdx * 100}%)` }}>
              {data.gallery.images.map((img, i) => (
                <div key={i} className="t11-carousel__slide">
                  <Image src={`/keikamotsu-templates${img.src}`} alt={img.alt} width={600} height={400} className="t11-carousel__img" />
                  <p className="t11-carousel__caption">{img.caption}</p>
                </div>
              ))}
            </div>
            <button className="t11-carousel__btn t11-carousel__btn--prev" onClick={() => setGalleryIdx((prev) => (prev - 1 + data.gallery.images.length) % data.gallery.images.length)} aria-label="前へ">{"\u2039"}</button>
            <button className="t11-carousel__btn t11-carousel__btn--next" onClick={() => setGalleryIdx((prev) => (prev + 1) % data.gallery.images.length)} aria-label="次へ">{"\u203A"}</button>
            <div className="t11-carousel__dots">
              {data.gallery.images.map((_, i) => (
                <button key={i} className={`t11-carousel__dot ${i === galleryIdx ? "t11-carousel__dot--active" : ""}`} onClick={() => setGalleryIdx(i)} aria-label={`スライド${i + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="t11-section">
        <div ref={rFaq} className="t11-reveal t11-container">
          <h2 className="t11-section-title t11-glitch t11-anim" data-text="よくある質問" data-anim="t11-anim--glitch">よくある質問</h2>
          <div className="t11-faq">
            {data.faq.map((item, i) => (
              <details key={i} className="t11-faq__item">
                <summary className="t11-faq__q">{item.q}</summary>
                <p className="t11-faq__a">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWS (ticker) ─── */}
      <section id="news" className="t11-section">
        <div ref={r6} className="t11-reveal t11-container">
          <h2 className="t11-section-title t11-glitch t11-anim" data-text="お知らせ" data-anim="t11-anim--glitch">お知らせ</h2>
          <div className="t11-news-ticker">
            <div className="t11-news-ticker__track">
              {[...data.news, ...data.news, ...data.news].map((n, i) => (
                <div key={i} className="t11-news-ticker__item">
                  <span className="t11-news-ticker__date">[{n.date}]</span>
                  <span className={`t11-news-ticker__tag t11-news-ticker__tag--${n.tagStyle}`}>{n.tag}</span>
                  <span className="t11-news-ticker__title">{n.title}</span>
                  <span className="t11-news-ticker__sep">///</span>
                </div>
              ))}
            </div>
          </div>
          <ul className="t11-news-list">
            {data.news.map((n, i) => (
              <li key={i} className={`t11-news-item t11-anim t11-anim-delay-${(i % 4) + 1}`} data-anim="t11-anim--scan">
                <time className="t11-news-date">{n.date}</time>
                <span className={`t11-news-tag t11-news-tag--${n.tagStyle}`}>{n.tag}</span>
                <span className="t11-news-title">{n.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── ACCESS ─── */}
      <section id="access" className="t11-section">
        <div ref={rAccess} className="t11-reveal t11-container">
          <h2 className="t11-section-title t11-glitch t11-anim" data-text={data.access.heading} data-anim="t11-anim--glitch">{data.access.heading}</h2>
          <div className="t11-access">
            <p className="t11-access__addr"><span className="t11-code-key">address:</span> {data.company.address}</p>
            <p className="t11-access__station"><span className="t11-code-key">station:</span> {data.access.nearestStation}</p>
            <p className="t11-access__note">{data.access.mapNote}</p>
            <div className="t11-access__map">
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

      {/* ─── COMPANY ─── */}
      <section id="company" className="t11-section">
        <div ref={r7} className="t11-reveal t11-container">
          <h2 className="t11-section-title t11-glitch t11-anim" data-text="会社概要" data-anim="t11-anim--glitch">会社概要</h2>
          <div className="t11-company-table">
            {data.companyInfo.map((c, i) => (
              <div key={i} className="t11-company-row">
                <span className="t11-line-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="t11-code-key">{c.dt}:</span>
                <span className="t11-code-val">{c.dd}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── APPLICATION FORM ─── */}
      <section id="apply" className="t11-section">
        <div ref={rApply} className="t11-reveal t11-container">
          <h2 className="t11-section-title t11-glitch t11-anim" data-text="応募フォーム" data-anim="t11-anim--glitch">応募フォーム</h2>
          <form className="t11-form" onSubmit={(e) => e.preventDefault()}>
            <div className="t11-form__group">
              <label className="t11-form__label" htmlFor="t11-name">お名前 <span className="t11-cyan">*</span></label>
              <input id="t11-name" type="text" className="t11-form__input" required placeholder="山田 太郎" />
            </div>
            <div className="t11-form__group">
              <label className="t11-form__label" htmlFor="t11-phone">電話番号 <span className="t11-cyan">*</span></label>
              <input id="t11-phone" type="tel" className="t11-form__input" required placeholder="090-1234-5678" />
            </div>
            <div className="t11-form__group">
              <label className="t11-form__label" htmlFor="t11-email">メールアドレス</label>
              <input id="t11-email" type="email" className="t11-form__input" placeholder="example@email.com" />
            </div>
            <div className="t11-form__group">
              <label className="t11-form__label" htmlFor="t11-message">メッセージ</label>
              <textarea id="t11-message" className="t11-form__textarea" rows={5} placeholder="ご質問やご希望があればご記入ください" />
            </div>
            <button type="submit" className="t11-form__submit">送信する</button>
          </form>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="t11-cta-section">
        <div ref={r8} className="t11-reveal t11-container">
          <h2 className="t11-cta-heading t11-glitch t11-anim" data-text={data.cta.heading} data-anim="t11-anim--glitch">
            {data.cta.heading}
          </h2>
          <p className="t11-cta-sub t11-anim t11-anim-delay-1" data-anim="t11-anim--scan">{data.cta.subtext}</p>
          <div className="t11-cta-phone-wrap t11-anim t11-anim-delay-2" data-anim="t11-anim--flicker">
            <a href={`tel:${data.company.phone}`} className="t11-cta-phone">
              {data.cta.phone}
            </a>
          </div>
          <p className="t11-cta-hours">{data.company.hours}</p>
          <a href="#" className="t11-btn-neon t11-btn-neon--lg t11-btn-neon--pulse t11-anim t11-anim-delay-3" data-anim="t11-anim--flicker">
            {data.cta.webLabel}
          </a>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="t11-footer">
        <div className="t11-footer__inner">
          <p className="t11-footer__catch">
            <span className="t11-prompt-symbol">$ </span>{data.footer.catchphrase}
          </p>
          <p className="t11-footer__company">{data.company.name}</p>
          <p className="t11-footer__addr">{data.company.address}</p>
          <nav className="t11-footer__nav">
            {data.navLinks.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </nav>
          <p className="t11-footer__exit">System.exit(0); // {data.company.name}</p>
          <p className="t11-footer__copy">&copy; {data.company.name}</p>
        </div>
      </footer>
    </div>
  );
}
