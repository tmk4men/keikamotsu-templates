"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as data from "@/data/siteData";
import "./styles.css";

/* ===================================================
   Template 09: モダン (Modern Glass)
   Bento grid + glassmorphism + mesh gradient
   =================================================== */

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function useScrollAnim() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>(".t09-anim");
    if (targets.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const anim = target.dataset.anim || "t09-anim--slideScale";
            target.classList.add(anim);
            obs.unobserve(target);
          }
        });
      },
      { threshold: 0.1 }
    );
    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, []);
  return ref;
}

function GlassReveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`glass-reveal ${visible ? "glass-reveal--in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Template09Page() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const galleryTouchStart = useRef(0);
  const animRef = useScrollAnim();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setGalleryIdx((prev) => (prev + 1) % data.gallery.images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="theme-09" ref={animRef}>
      {/* Animated mesh gradient background */}
      <div className="glass-mesh-bg" />

      {/* ========== Header ========== */}
      <header className={`glass-header ${scrolled ? "glass-header--scrolled" : ""}`}>
        <div className="glass-header__inner">
          <a href="#" className="glass-logo">
            <span className="glass-logo__gradient">GL</span>
            <span className="glass-logo__name">{data.company.nameEn}</span>
          </a>

          <button className="glass-hamburger" onClick={() => setMobileNav(!mobileNav)} aria-label="メニュー">
            <span /><span /><span />
          </button>

          <nav className={`glass-nav ${mobileNav ? "glass-nav--open" : ""}`}>
            {data.navLinks.map((link) => (
              <a key={link.href} href={link.href} className="glass-nav__link" onClick={() => setMobileNav(false)}>
                {link.label}
              </a>
            ))}
            <a href="#apply" className="glass-nav__cta" onClick={() => setMobileNav(false)}>応募する</a>
          </nav>
        </div>
      </header>

      {/* ========== Hero ========== */}
      <section className="glass-hero">
        <div className="glass-hero__mesh" />
        <div className="glass-hero__particles">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`glass-hero__particle glass-hero__particle--${i}`} />
          ))}
        </div>
        <div className="glass-hero__card">
          <h1 className="glass-hero__heading">
            {data.hero.headlineParts[0]}<br />{data.hero.headlineParts[1]}
          </h1>
          <p className="glass-hero__sub">
            {data.hero.subtext.map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}
          </p>
          <div className="glass-hero__salary">
            <span className="glass-hero__salary-num">{data.hero.salaryMin}</span>
            <span className="glass-hero__salary-sep">〜</span>
            <span className="glass-hero__salary-num">{data.hero.salaryMax}</span>
            <span className="glass-hero__salary-unit">万円/月</span>
          </div>
          <div className="glass-hero__badges">
            {data.hero.badges.map((b) => (
              <span key={b} className="glass-hero__badge">{b}</span>
            ))}
          </div>
          <a href="#apply" className="glass-hero__cta">{data.hero.cta}</a>
        </div>
      </section>

      {/* ========== Marquee (Glass Strip) ========== */}
      <div className="glass-marquee">
        <div className="glass-marquee__track">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="glass-marquee__items">
              {[...data.marquee.top, ...data.marquee.bottom].map((item) => (
                <span key={item} className="glass-marquee__item">
                  {item}<span className="glass-marquee__sep">/</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ========== Reasons (Bento Grid) ========== */}
      <GlassReveal>
        <section id="reasons" className="glass-section glass-reasons">
          <div className="glass-container">
            <h2 className="glass-section-title t09-anim" data-anim="t09-anim--fadeBlur">選ばれる3つの理由</h2>
            <p className="glass-section-sub t09-anim t09-anim-delay-1" data-anim="t09-anim--fadeBlur">「ここで始めてよかった」——そう思える理由があります。</p>
            <div className="glass-bento-reasons">
              {data.reasons.map((r, i) => (
                <div key={r.num} className={`glass-bento-card glass-bento-card--r${i} t09-anim t09-anim-delay-${Math.min(i + 1, 3) as 1 | 2 | 3}`} data-anim="t09-anim--glassIn">
                  <span className="glass-bento-card__num">{r.num}</span>
                  <h3 className="glass-bento-card__title">{r.title}</h3>
                  <p className="glass-bento-card__text">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </GlassReveal>

      {/* ========== Job Info (Glass Card) ========== */}
      <GlassReveal>
        <section id="jobs" className="glass-section glass-jobs">
          <div className="glass-container">
            <h2 className="glass-section-title t09-anim" data-anim="t09-anim--fadeBlur">求人情報</h2>
            <p className="glass-section-sub t09-anim t09-anim-delay-1" data-anim="t09-anim--fadeBlur">{data.jobs.intro}</p>
            <div className="glass-info-card t09-anim t09-anim-delay-2" data-anim="t09-anim--glassIn">
              <dl className="glass-info-card__dl">
                {data.jobs.rows.map((row) => (
                  <div key={row.dt} className="glass-info-card__row">
                    <dt className="glass-info-card__dt">{row.dt}</dt>
                    <dd className={`glass-info-card__dd ${row.accent ? "glass-info-card__dd--accent" : ""}`}>{row.dd}</dd>
                  </div>
                ))}
              </dl>
              <div className="glass-info-card__req">
                <h4 className="glass-info-card__req-title">応募条件</h4>
                <ul className="glass-info-card__req-list">
                  {data.jobs.requirements.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </GlassReveal>

      {/* ========== Benefits (Bento Grid) ========== */}
      <GlassReveal>
        <section id="benefits" className="glass-section glass-benefits">
          <div className="glass-container">
            <h2 className="glass-section-title t09-anim" data-anim="t09-anim--fadeBlur">待遇・福利厚生</h2>
            <div className="glass-bento-benefits">
              {data.benefits.map((b, i) => (
                <div key={b.title} className={`glass-bento-item glass-bento-item--${i} t09-anim t09-anim-delay-${Math.min(i % 3 + 1, 3) as 1 | 2 | 3}`} data-anim="t09-anim--slideScale">
                  <div className="glass-bento-item__icon">{b.title[0]}</div>
                  <h3 className="glass-bento-item__title">{b.title}</h3>
                  <p className="glass-bento-item__text">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </GlassReveal>

      {/* ========== Daily (Staggered / Masonry) ========== */}
      <GlassReveal>
        <section id="daily" className="glass-section glass-daily">
          <div className="glass-container">
            <h2 className="glass-section-title t09-anim" data-anim="t09-anim--fadeBlur">1日の流れ</h2>
            <p className="glass-section-sub t09-anim t09-anim-delay-1" data-anim="t09-anim--fadeBlur">{data.daily.intro}</p>
            <div className="glass-masonry">
              <div className="glass-masonry__line" />
              {data.daily.steps.map((step, i) => (
                <GlassReveal key={step.time} delay={i * 100}>
                  <div className={`glass-masonry-card glass-masonry-card--${i} t09-anim t09-anim-delay-${Math.min(i % 3 + 1, 3) as 1 | 2 | 3}`} data-anim="t09-anim--slideScale">
                    <span className="glass-masonry-card__time">{step.time}</span>
                    <h3 className="glass-masonry-card__title">{step.title}</h3>
                    <p className="glass-masonry-card__desc">{step.desc}</p>
                  </div>
                </GlassReveal>
              ))}
            </div>
          </div>
        </section>
      </GlassReveal>

      {/* ========== Voices ========== */}
      <GlassReveal>
        <section id="voices" className="glass-section glass-voices">
          <div className="glass-container">
            <h2 className="glass-section-title t09-anim" data-anim="t09-anim--fadeBlur">先輩ドライバーの声</h2>
            <div className="glass-voices__grid">
              {data.voices.map((v, i) => (
                <article key={v.name} className={`glass-voice-card t09-anim t09-anim-delay-${Math.min(i + 1, 3) as 1 | 2 | 3}`} data-anim="t09-anim--glassIn">
                  <div className="glass-voice-card__avatar">
                    <span className="glass-voice-card__avatar-letter">{v.name[0]}</span>
                  </div>
                  <p className="glass-voice-card__name">{v.name}</p>
                  <p className="glass-voice-card__meta">{v.age} / {v.prev}</p>
                  <p className="glass-voice-card__text">{v.text}</p>
                  <p className="glass-voice-card__highlight">{v.highlight}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </GlassReveal>

      {/* ========== Gallery ========== */}
      <GlassReveal>
        <section id="gallery" className="glass-section glass-gallery-section">
          <div className="glass-container">
            <h2 className="glass-section-title t09-anim" data-anim="t09-anim--fadeBlur">{data.gallery.heading}</h2>
            <p className="glass-section-sub t09-anim t09-anim-delay-1" data-anim="t09-anim--fadeBlur">{data.gallery.intro}</p>
            <div
              className="glass-carousel"
              onTouchStart={(e) => { galleryTouchStart.current = e.touches[0].clientX; }}
              onTouchEnd={(e) => {
                const diff = galleryTouchStart.current - e.changedTouches[0].clientX;
                if (diff > 50) setGalleryIdx((p) => (p + 1) % data.gallery.images.length);
                if (diff < -50) setGalleryIdx((p) => (p - 1 + data.gallery.images.length) % data.gallery.images.length);
              }}
            >
              <div className="glass-carousel__track" style={{ transform: `translateX(-${galleryIdx * 100}%)` }}>
                {data.gallery.images.map((img, i) => (
                  <figure key={i} className="glass-carousel__slide">
                    <Image src={`/keikamotsu-hp${img.src}`} alt={img.alt} width={800} height={500} className="glass-carousel__img" />
                    <figcaption className="glass-carousel__caption">{img.caption}</figcaption>
                  </figure>
                ))}
              </div>
              <button className="glass-carousel__btn glass-carousel__btn--prev" onClick={() => setGalleryIdx((p) => (p - 1 + data.gallery.images.length) % data.gallery.images.length)} aria-label="前へ">&#8249;</button>
              <button className="glass-carousel__btn glass-carousel__btn--next" onClick={() => setGalleryIdx((p) => (p + 1) % data.gallery.images.length)} aria-label="次へ">&#8250;</button>
              <div className="glass-carousel__dots">
                {data.gallery.images.map((_, i) => (
                  <button key={i} className={`glass-carousel__dot ${i === galleryIdx ? "glass-carousel__dot--active" : ""}`} onClick={() => setGalleryIdx(i)} aria-label={`スライド${i + 1}`} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </GlassReveal>

      {/* ========== FAQ ========== */}
      <GlassReveal>
        <section id="faq" className="glass-section glass-faq-section">
          <div className="glass-container">
            <h2 className="glass-section-title t09-anim" data-anim="t09-anim--fadeBlur">よくある質問</h2>
            <div className="glass-faq">
              {data.faq.map((item, i) => (
                <details key={i} className={`glass-faq__item t09-anim t09-anim-delay-${Math.min(i % 3 + 1, 3) as 1 | 2 | 3}`} data-anim="t09-anim--slideScale">
                  <summary className="glass-faq__q">{item.q}</summary>
                  <p className="glass-faq__a">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </GlassReveal>

      {/* ========== News ========== */}
      <GlassReveal>
        <section id="news" className="glass-section glass-news">
          <div className="glass-container">
            <h2 className="glass-section-title t09-anim" data-anim="t09-anim--fadeBlur">お知らせ</h2>
            <div className="glass-news__card t09-anim t09-anim-delay-1" data-anim="t09-anim--glassIn">
              {data.news.map((n) => (
                <div key={n.title} className="glass-news__item">
                  <span className={`glass-news__date-badge glass-news__date-badge--${n.tagStyle}`}>{n.date}</span>
                  <span className="glass-news__tag">{n.tag}</span>
                  <span className="glass-news__title">{n.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </GlassReveal>

      {/* ========== Company ========== */}
      <GlassReveal>
        <section id="company" className="glass-section glass-company">
          <div className="glass-container">
            <h2 className="glass-section-title t09-anim" data-anim="t09-anim--fadeBlur">会社概要</h2>
            <div className="glass-company__card t09-anim t09-anim-delay-1" data-anim="t09-anim--glassIn">
              <dl className="glass-company__dl">
                {data.companyInfo.map((row) => (
                  <div key={row.dt} className="glass-company__row">
                    <dt className="glass-company__dt">{row.dt}</dt>
                    <dd className="glass-company__dd">{row.dd}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </GlassReveal>

      {/* ========== Access ========== */}
      <GlassReveal>
        <section id="access" className="glass-section glass-access-section">
          <div className="glass-container">
            <h2 className="glass-section-title t09-anim" data-anim="t09-anim--fadeBlur">{data.access.heading}</h2>
            <div className="glass-access t09-anim t09-anim-delay-1" data-anim="t09-anim--glassIn">
              <p className="glass-access__addr">〒{data.company.postalCode} {data.company.address}</p>
              <p className="glass-access__station">{data.access.nearestStation}</p>
              <p className="glass-access__note">{data.access.mapNote}</p>
              <div className="glass-access__map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.1!2d135.505!3d34.685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z5aSn6Ziq5bqc5aSn6Ziq5biC5Lit5aSu5Yy65pys55S6!5e0!3m2!1sja!2sjp!4v1"
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: "16px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="アクセスマップ"
                />
              </div>
            </div>
          </div>
        </section>
      </GlassReveal>

      {/* ========== Application Form ========== */}
      <GlassReveal>
        <section id="apply-form" className="glass-section glass-form-section">
          <div className="glass-container">
            <h2 className="glass-section-title t09-anim" data-anim="t09-anim--fadeBlur">応募フォーム</h2>
            <p className="glass-section-sub t09-anim t09-anim-delay-1" data-anim="t09-anim--fadeBlur">まずはお気軽にご応募ください。</p>
            <form className="glass-form t09-anim t09-anim-delay-2" data-anim="t09-anim--glassIn" onSubmit={(e) => e.preventDefault()}>
              <div className="glass-form__group">
                <label className="glass-form__label" htmlFor="glass-name">お名前 <span style={{ color: "#ef4444" }}>*</span></label>
                <input id="glass-name" type="text" className="glass-form__input" required placeholder="山田 太郎" />
              </div>
              <div className="glass-form__group">
                <label className="glass-form__label" htmlFor="glass-phone">電話番号 <span style={{ color: "#ef4444" }}>*</span></label>
                <input id="glass-phone" type="tel" className="glass-form__input" required placeholder="090-1234-5678" />
              </div>
              <div className="glass-form__group">
                <label className="glass-form__label" htmlFor="glass-email">メールアドレス</label>
                <input id="glass-email" type="email" className="glass-form__input" placeholder="example@email.com" />
              </div>
              <div className="glass-form__group">
                <label className="glass-form__label" htmlFor="glass-message">メッセージ</label>
                <textarea id="glass-message" className="glass-form__textarea" rows={5} placeholder="ご質問やご要望があればご記入ください" />
              </div>
              <button type="submit" className="glass-form__submit">送信する</button>
            </form>
          </div>
        </section>
      </GlassReveal>

      {/* ========== CTA ========== */}
      <GlassReveal>
        <section id="apply" className="glass-section glass-cta">
          <div className="glass-cta__gradient-bg t09-mesh-animate" />
          <div className="glass-container">
            <div className="glass-cta__card t09-anim" data-anim="t09-anim--glassIn">
              <h2 className="glass-cta__heading">{data.cta.heading}</h2>
              <p className="glass-cta__sub">{data.cta.subtext}</p>
              <div className="glass-cta__actions">
                <a href={`tel:${data.cta.phone}`} className="glass-cta__phone">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                  </svg>
                  {data.cta.phone}
                </a>
                <a href="/apply" className="glass-cta__web">{data.cta.webLabel}</a>
              </div>
              <p className="glass-cta__hours">受付時間: {data.company.hours}</p>
            </div>
          </div>
        </section>
      </GlassReveal>

      {/* ========== Footer ========== */}
      <footer className="glass-footer">
        <div className="glass-footer__inner">
          <div className="glass-footer__brand">
            <span className="glass-footer__gradient-text">{data.company.name}</span>
            <p className="glass-footer__catch">{data.footer.catchphrase}</p>
          </div>
          <div className="glass-footer__links">
            {data.navLinks.map((link) => (
              <a key={link.href} href={link.href} className="glass-footer__link">{link.label}</a>
            ))}
          </div>
          <div className="glass-footer__contact">
            <a href={`tel:${data.company.phone}`} className="glass-footer__phone">{data.company.phone}</a>
            <p className="glass-footer__address">〒{data.company.postalCode} {data.company.address}</p>
            <p className="glass-footer__hours">{data.company.hours}</p>
          </div>
        </div>
        <div className="glass-footer__copy">
          &copy; {new Date().getFullYear()} {data.company.nameEn}
        </div>
      </footer>
    </div>
  );
}
