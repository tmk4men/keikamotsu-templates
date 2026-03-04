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
          setTimeout(() => el.classList.add("t12-revealed"), delay);
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

/* ── scroll-triggered animation hook ── */
function useScrollAnim() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".t12-anim");
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

/* ── Sparkle particles ── */
function Sparkles({ count = 24 }: { count?: number }) {
  return (
    <div className="t12-sparkles" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="t12-sparkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${1.5 + Math.random() * 3}s`,
            width: `${3 + Math.random() * 4}px`,
            height: `${3 + Math.random() * 4}px`,
          }}
        />
      ))}
    </div>
  );
}

export default function Template12() {
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
    <div className="theme-12">
      {/* ─── STICKY HEADER ─── */}
      <header className={`t12-header ${scrolled ? "t12-header--scrolled" : ""}`}>
        <div className="t12-header__inner">
          <a href="#" className="t12-logo">
            <span className="t12-logo__icon">GL</span>
            <span className="t12-logo__text">{data.company.nameEn}</span>
          </a>
          <button
            className={`t12-hamburger ${menuOpen ? "t12-hamburger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニュー"
          >
            <span /><span /><span />
          </button>
          <nav className={`t12-nav ${menuOpen ? "t12-nav--open" : ""}`}>
            {data.navLinks.map((l) => (
              <a key={l.href} href={l.href} className="t12-nav__link" onClick={closeMenu}>
                {l.label}
              </a>
            ))}
            <a href={`tel:${data.company.phone}`} className="t12-nav__cta">
              {data.hero.cta}
            </a>
          </nav>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="t12-hero">
        <div className="t12-hero__bg" />
        <Sparkles count={30} />
        <div className="t12-hero__content">
          <h1 className="t12-hero__heading">
            {data.hero.headlineParts.map((part, i) => (
              <span key={i} className="t12-hero__heading-line t12-shimmer-text" style={{ animationDelay: `${i * 0.3}s` }}>
                {part}
              </span>
            ))}
          </h1>
          <div className="t12-hero__sub">
            {data.hero.subtext.map((t, i) => (
              <p key={i} style={{ animationDelay: `${0.6 + i * 0.15}s` }}>{t}</p>
            ))}
          </div>
          <div className="t12-hero__badges">
            {data.hero.badges.map((b, i) => (
              <span key={b} className="t12-badge" style={{ animationDelay: `${1.0 + i * 0.1}s` }}>{b}</span>
            ))}
          </div>
          <div className="t12-hero__salary" style={{ animationDelay: "1.3s" }}>
            月収<strong>{data.hero.salaryMin}万〜{data.hero.salaryMax}万円</strong>
          </div>
          <a href={`tel:${data.company.phone}`} className="t12-btn-primary" style={{ animationDelay: "1.5s" }}>
            {data.hero.cta}
          </a>
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="t12-marquee">
        <div className="t12-marquee__track">
          {[...data.marquee.top, ...data.marquee.top, ...data.marquee.top].map((t, i) => (
            <span key={i} className="t12-marquee__item" style={{ animationDelay: `${i * 0.2}s` }}>
              {t}
            </span>
          ))}
        </div>
        <div className="t12-marquee__track t12-marquee__track--reverse">
          {[...data.marquee.bottom, ...data.marquee.bottom, ...data.marquee.bottom].map((t, i) => (
            <span key={i} className="t12-marquee__item" style={{ animationDelay: `${i * 0.2}s` }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ─── REASONS ─── */}
      <section id="reasons" className="t12-section">
        <Sparkles count={12} />
        <div ref={r1} className="t12-reveal t12-container">
          <h2 className="t12-section-title t12-anim" data-anim="t12-anim--shimmer">
            選ばれる<span className="t12-gradient-text">3</span>つの理由
          </h2>
          <div className="t12-reasons-grid">
            {data.reasons.map((r, i) => (
              <article key={i} className={`t12-reason-card t12-anim t12-anim-delay-${i + 1}`} data-anim="t12-anim--float">
                <div className="t12-reason-card__border-wrap">
                  <div className="t12-reason-card__inner">
                    <span className="t12-reason-card__num">{r.num}</span>
                    <h3 className="t12-reason-card__title">{r.title}</h3>
                    <p className="t12-reason-card__text">{r.text}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── JOB INFO ─── */}
      <section id="jobs" className="t12-section t12-section--alt">
        <div ref={r2} className="t12-reveal t12-container">
          <h2 className="t12-section-title t12-anim" data-anim="t12-anim--shimmer">求人情報</h2>
          <p className="t12-section-intro">{data.jobs.intro}</p>
          <div className="t12-jobs-card t12-anim t12-anim-delay-1" data-anim="t12-anim--float">
            <dl className="t12-dl">
              {data.jobs.rows.map((row, i) => (
                <div key={i} className={`t12-dl__row ${row.accent ? "t12-dl__row--accent" : ""}`}>
                  <dt className="t12-dl__dt">{row.dt}</dt>
                  <dd className="t12-dl__dd">{row.dd}</dd>
                </div>
              ))}
            </dl>
            <div className="t12-jobs-req">
              <h4>応募資格</h4>
              <ul>
                {data.jobs.requirements.map((r, i) => (
                  <li key={i}><span className="t12-req-sparkle">✦</span>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BENEFITS ─── */}
      <section id="benefits" className="t12-section">
        <div ref={r3} className="t12-reveal t12-container">
          <h2 className="t12-section-title t12-anim" data-anim="t12-anim--shimmer">待遇・福利厚生</h2>
          <div className="t12-benefits-grid">
            {data.benefits.map((b, i) => (
              <div key={i} className={`t12-benefit-card t12-anim t12-anim-delay-${(i % 4) + 1}`} data-anim="t12-anim--float">
                <span className="t12-benefit-card__sparkle t12-sparkle-hover">✦</span>
                <div className="t12-benefit-card__pink-top" />
                <h4 className="t12-benefit-card__title">{b.title}</h4>
                <p className="t12-benefit-card__text">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DAILY SCHEDULE ─── */}
      <section id="daily" className="t12-section t12-section--alt">
        <div ref={r4} className="t12-reveal t12-container">
          <h2 className="t12-section-title t12-anim" data-anim="t12-anim--shimmer">1日の流れ</h2>
          <p className="t12-section-intro">{data.daily.intro}</p>
          <div className="t12-timeline">
            <div className="t12-timeline__line" />
            {data.daily.steps.map((s, i) => (
              <div key={i} className={`t12-timeline__step t12-anim t12-anim-delay-${(i % 4) + 1}`} data-anim="t12-anim--float">
                <div className="t12-timeline__dot" />
                <div className="t12-timeline__card">
                  <span className="t12-timeline__time">{s.time}</span>
                  <h4 className="t12-timeline__title">{s.title}</h4>
                  <p className="t12-timeline__desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VOICES ─── */}
      <section id="voices" className="t12-section">
        <div ref={r5} className="t12-reveal t12-container">
          <h2 className="t12-section-title t12-anim" data-anim="t12-anim--shimmer">先輩ドライバーの声</h2>
          <div className="t12-voices-grid">
            {data.voices.map((v, i) => (
              <article key={i} className={`t12-voice-card t12-anim t12-anim-delay-${i + 1}`} data-anim="t12-anim--rotate">
                <div className="t12-voice-card__gradient-border" />
                <div className="t12-voice-card__content">
                  <span className="t12-voice-card__quote">「</span>
                  <p className="t12-voice-card__body">{v.text}</p>
                  <p className="t12-voice-card__highlight">{v.highlight}</p>
                  <span className="t12-voice-card__quote-end">」</span>
                  <footer className="t12-voice-card__footer">
                    <strong>{v.name}</strong>（{v.age}・{v.prev}）
                  </footer>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section id="gallery" className="t12-section t12-section--alt">
        <div ref={rGallery} className="t12-reveal t12-container">
          <h2 className="t12-section-title t12-anim" data-anim="t12-anim--shimmer">{data.gallery.heading}</h2>
          <p className="t12-section-intro">{data.gallery.intro}</p>
          <div
            className="t12-carousel"
            onTouchStart={(e) => { galleryTouchStart.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              const diff = galleryTouchStart.current - e.changedTouches[0].clientX;
              if (diff > 50) setGalleryIdx((prev) => (prev + 1) % data.gallery.images.length);
              if (diff < -50) setGalleryIdx((prev) => (prev - 1 + data.gallery.images.length) % data.gallery.images.length);
            }}
          >
            <div className="t12-carousel__track" style={{ transform: `translateX(-${galleryIdx * 100}%)` }}>
              {data.gallery.images.map((img, i) => (
                <div key={i} className="t12-carousel__slide">
                  <Image src={`/keikamotsu-templates${img.src}`} alt={img.alt} width={600} height={400} className="t12-carousel__img" />
                  <p className="t12-carousel__caption">{img.caption}</p>
                </div>
              ))}
            </div>
            <button className="t12-carousel__btn t12-carousel__btn--prev" onClick={() => setGalleryIdx((prev) => (prev - 1 + data.gallery.images.length) % data.gallery.images.length)} aria-label="前へ">{"\u2039"}</button>
            <button className="t12-carousel__btn t12-carousel__btn--next" onClick={() => setGalleryIdx((prev) => (prev + 1) % data.gallery.images.length)} aria-label="次へ">{"\u203A"}</button>
            <div className="t12-carousel__dots">
              {data.gallery.images.map((_, i) => (
                <button key={i} className={`t12-carousel__dot ${i === galleryIdx ? "t12-carousel__dot--active" : ""}`} onClick={() => setGalleryIdx(i)} aria-label={`スライド${i + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="t12-section">
        <div ref={rFaq} className="t12-reveal t12-container">
          <h2 className="t12-section-title t12-anim" data-anim="t12-anim--shimmer">よくある質問</h2>
          <div className="t12-faq">
            {data.faq.map((item, i) => (
              <details key={i} className="t12-faq__item">
                <summary className="t12-faq__q">{item.q}</summary>
                <p className="t12-faq__a">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWS ─── */}
      <section id="news" className="t12-section t12-section--alt">
        <div ref={r6} className="t12-reveal t12-container">
          <h2 className="t12-section-title t12-anim" data-anim="t12-anim--shimmer">お知らせ</h2>
          <ul className="t12-news-list">
            {data.news.map((n, i) => (
              <li key={i} className={`t12-news-item t12-anim t12-anim-delay-${(i % 4) + 1}`} data-anim="t12-anim--float">
                <span className="t12-news-date">{n.date}</span>
                <span className={`t12-news-tag t12-news-tag--${n.tagStyle}`}>{n.tag}</span>
                <span className="t12-news-title">{n.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── ACCESS ─── */}
      <section id="access" className="t12-section">
        <div ref={rAccess} className="t12-reveal t12-container">
          <h2 className="t12-section-title t12-anim" data-anim="t12-anim--shimmer">{data.access.heading}</h2>
          <div className="t12-access">
            <p className="t12-access__addr">{data.company.address}</p>
            <p className="t12-access__station">{data.access.nearestStation}</p>
            <p className="t12-access__note">{data.access.mapNote}</p>
            <div className="t12-access__map">
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
      <section id="company" className="t12-section">
        <div ref={r7} className="t12-reveal t12-container">
          <h2 className="t12-section-title t12-anim" data-anim="t12-anim--shimmer">会社概要</h2>
          <dl className="t12-dl t12-dl--company">
            {data.companyInfo.map((c, i) => (
              <div key={i} className="t12-dl__row">
                <dt className="t12-dl__dt">{c.dt}</dt>
                <dd className="t12-dl__dd">{c.dd}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ─── APPLICATION FORM ─── */}
      <section id="apply" className="t12-section t12-section--alt">
        <div ref={rApply} className="t12-reveal t12-container">
          <h2 className="t12-section-title t12-anim" data-anim="t12-anim--shimmer">応募フォーム</h2>
          <form className="t12-form" onSubmit={(e) => e.preventDefault()}>
            <div className="t12-form__group">
              <label className="t12-form__label" htmlFor="t12-name">お名前 <span className="t12-gradient-text">*</span></label>
              <input id="t12-name" type="text" className="t12-form__input" required placeholder="山田 太郎" />
            </div>
            <div className="t12-form__group">
              <label className="t12-form__label" htmlFor="t12-phone">電話番号 <span className="t12-gradient-text">*</span></label>
              <input id="t12-phone" type="tel" className="t12-form__input" required placeholder="090-1234-5678" />
            </div>
            <div className="t12-form__group">
              <label className="t12-form__label" htmlFor="t12-email">メールアドレス</label>
              <input id="t12-email" type="email" className="t12-form__input" placeholder="example@email.com" />
            </div>
            <div className="t12-form__group">
              <label className="t12-form__label" htmlFor="t12-message">メッセージ</label>
              <textarea id="t12-message" className="t12-form__textarea" rows={5} placeholder="ご質問やご希望があればご記入ください" />
            </div>
            <button type="submit" className="t12-form__submit">送信する</button>
          </form>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="t12-cta-section">
        <Sparkles count={20} />
        <div ref={r8} className="t12-reveal t12-container">
          <h2 className="t12-cta-heading t12-anim" data-anim="t12-anim--shimmer">{data.cta.heading}</h2>
          <p className="t12-cta-sub t12-anim t12-anim-delay-1" data-anim="t12-anim--float">{data.cta.subtext}</p>
          <div className="t12-cta-phone-wrap">
            <a href={`tel:${data.company.phone}`} className="t12-cta-phone">
              {data.cta.phone}
            </a>
          </div>
          <p className="t12-cta-hours">{data.company.hours}</p>
          <a href="#" className="t12-btn-primary t12-btn-primary--glow t12-anim t12-anim-delay-3" data-anim="t12-anim--float">
            {data.cta.webLabel}
          </a>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="t12-footer">
        <div className="t12-footer__inner">
          <p className="t12-footer__catch">{data.footer.catchphrase}</p>
          <p className="t12-footer__company">{data.company.name}</p>
          <p className="t12-footer__addr">{data.company.address}</p>
          <nav className="t12-footer__nav">
            {data.navLinks.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </nav>
          <p className="t12-footer__copy">&copy; {data.company.name}</p>
        </div>
      </footer>
    </div>
  );
}
