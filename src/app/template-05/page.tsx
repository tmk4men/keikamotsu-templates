"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as data from "@/data/siteData";
import "./styles.css";

/* ── scroll-triggered animation hook ── */
function useScrollAnim(animClass: string) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add(animClass); obs.unobserve(el); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [animClass]);
  return ref;
}

/* ── float-up reveal ── */
function useFloatUp(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => el.classList.add("t05-floated"), delay); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

/* ── Animated wave SVG ── */
function WaveDivider({ flip, variant }: { flip?: boolean; variant: 1 | 2 | 3 }) {
  const paths = {
    1: [
      "M0,32 C120,52 240,12 360,32 C480,52 600,12 720,32 C840,52 960,12 1080,32 C1200,52 1320,12 1440,32 L1440,0 L0,0 Z",
      "M0,28 C120,8 240,48 360,28 C480,8 600,48 720,28 C840,8 960,48 1080,28 C1200,8 1320,48 1440,28 L1440,0 L0,0 Z",
    ],
    2: [
      "M0,24 C180,56 360,8 540,24 C720,40 900,8 1080,24 C1260,40 1380,16 1440,24 L1440,0 L0,0 Z",
      "M0,20 C180,4 360,44 540,20 C720,4 900,44 1080,20 C1260,4 1380,36 1440,20 L1440,0 L0,0 Z",
    ],
    3: [
      "M0,20 C240,48 480,8 720,28 C960,48 1200,8 1440,20 L1440,0 L0,0 Z",
      "M0,28 C240,4 480,44 720,24 C960,4 1200,44 1440,28 L1440,0 L0,0 Z",
    ],
  };

  return (
    <div className={`t05-wave-divider ${flip ? "t05-wave-divider--flip" : ""}`}>
      <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="t05-wave-svg">
        <path className="t05-wave-path" fill="currentColor">
          <animate
            attributeName="d"
            values={`${paths[variant][0]};${paths[variant][1]};${paths[variant][0]}`}
            dur="6s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  );
}

/* ── Ripple card ── */
function RippleCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ripple = document.createElement("span");
    ripple.className = "t05-ripple";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    card.appendChild(ripple);
    setTimeout(() => ripple.remove(), 800);
  };

  return (
    <div ref={cardRef} className={`t05-ripple-card ${className || ""}`} onClick={handleClick}>
      {children}
    </div>
  );
}

export default function Template05() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const galleryTouchStart = useRef(0);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setGalleryIdx((prev) => (prev + 1) % data.gallery.images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const u1 = useFloatUp(0), u2 = useFloatUp(100), u3 = useFloatUp(0);
  const u4 = useFloatUp(100), u5 = useFloatUp(0), u6 = useFloatUp(100);
  const u7 = useFloatUp(0), u8 = useFloatUp(0);
  const u9 = useFloatUp(0), u10 = useFloatUp(100), u11 = useFloatUp(0), u12 = useFloatUp(100);

  /* scroll-triggered animations */
  const aReasonsTitle = useScrollAnim("t05-anim--floatUp");
  const aReason0 = useScrollAnim("t05-anim--floatIn");
  const aReason1 = useScrollAnim("t05-anim--floatIn");
  const aReason2 = useScrollAnim("t05-anim--floatIn");
  const aJobsTitle = useScrollAnim("t05-anim--floatUp");
  const aBenefitsTitle = useScrollAnim("t05-anim--floatUp");
  const aBenefit0 = useScrollAnim("t05-anim--floatIn");
  const aBenefit1 = useScrollAnim("t05-anim--floatIn");
  const aBenefit2 = useScrollAnim("t05-anim--floatIn");
  const aBenefit3 = useScrollAnim("t05-anim--floatIn");
  const aBenefit4 = useScrollAnim("t05-anim--floatIn");
  const aBenefit5 = useScrollAnim("t05-anim--floatIn");
  const aDailyTitle = useScrollAnim("t05-anim--floatUp");
  const aVoicesTitle = useScrollAnim("t05-anim--floatUp");
  const aVoice0 = useScrollAnim("t05-anim--floatIn");
  const aVoice1 = useScrollAnim("t05-anim--floatIn");
  const aVoice2 = useScrollAnim("t05-anim--floatIn");
  const aGalleryTitle = useScrollAnim("t05-anim--floatUp");
  const aFaqTitle = useScrollAnim("t05-anim--floatUp");
  const aNewsTitle = useScrollAnim("t05-anim--floatUp");
  const aAccessTitle = useScrollAnim("t05-anim--floatUp");
  const aCompanyTitle = useScrollAnim("t05-anim--floatUp");
  const aApplyTitle = useScrollAnim("t05-anim--floatUp");
  const aCtaSection = useScrollAnim("t05-anim--floatUp");

  return (
    <div className="theme-05">
      {/* ─── HEADER ─── */}
      <header className={`t05-header ${scrolled ? "t05-header--scrolled" : ""}`}>
        <div className="t05-header__inner">
          <a href="#" className="t05-logo">
            <svg className="t05-logo__wave" viewBox="0 0 32 20" fill="none">
              <path d="M0 10C4 4 8 16 12 10C16 4 20 16 24 10C28 4 32 16 32 10" stroke="currentColor" strokeWidth="2.5" fill="none" />
            </svg>
            <span>{data.company.nameEn}</span>
          </a>
          <button
            className={`t05-hamburger ${menuOpen ? "t05-hamburger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニュー"
          >
            <span /><span /><span />
          </button>
          <nav className={`t05-nav ${menuOpen ? "t05-nav--open" : ""}`}>
            {data.navLinks.map((l) => (
              <a key={l.href} href={l.href} className="t05-nav__link" onClick={() => setMenuOpen(false)}>{l.label}</a>
            ))}
            <a href={`tel:${data.company.phone}`} className="t05-nav__cta">{data.hero.cta}</a>
          </nav>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="t05-hero">
        <div className="t05-hero__bg" />
        <div className="t05-hero__content">
          <h1 className="t05-hero__heading">
            {data.hero.headlineParts.map((p, i) => (
              <span key={i} className="t05-hero__heading-line">{p}</span>
            ))}
          </h1>
          <div className="t05-hero__sub">
            {data.hero.subtext.map((t, i) => <p key={i}>{t}</p>)}
          </div>
          <div className="t05-hero__badges">
            {data.hero.badges.map((b) => <span key={b} className="t05-badge">{b}</span>)}
          </div>
          <div className="t05-hero__salary">
            月収<strong>{data.hero.salaryMin}万〜{data.hero.salaryMax}万円</strong>
          </div>
          <a href={`tel:${data.company.phone}`} className="t05-btn">{data.hero.cta}</a>
        </div>
        <WaveDivider flip variant={1} />
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="t05-marquee">
        <div className="t05-marquee__track">
          {[...data.marquee.top, ...data.marquee.bottom, ...data.marquee.top, ...data.marquee.bottom].map((t, i) => (
            <span key={i} className="t05-marquee__item">{t}</span>
          ))}
        </div>
      </div>

      {/* ─── REASONS ─── */}
      <section id="reasons" className="t05-section t05-section--light">
        <div ref={u1} className="t05-float t05-container">
          <div ref={aReasonsTitle} className="t05-anim">
            <h2 className="t05-section-title">選ばれる3つの理由</h2>
          </div>
          <div className="t05-reasons-grid">
            {data.reasons.map((r, i) => {
              const reasonRefs = [aReason0, aReason1, aReason2];
              return (
              <div key={i} ref={reasonRefs[i]} className={`t05-anim t05-anim-delay-${i + 1}`}>
                <RippleCard className="t05-reason-card t05-ripple-hover">
                  <span className="t05-reason-card__num">{r.num}</span>
                  <h3 className="t05-reason-card__title">{r.title}</h3>
                  <p className="t05-reason-card__text">{r.text}</p>
                </RippleCard>
              </div>
              );
            })}
          </div>
        </div>
        <WaveDivider variant={2} />
      </section>

      {/* ─── JOBS ─── */}
      <section id="jobs" className="t05-section t05-section--white">
        <div ref={u2} className="t05-float t05-container">
          <div ref={aJobsTitle} className="t05-anim">
            <h2 className="t05-section-title">求人情報</h2>
          </div>
          <p className="t05-section-intro">{data.jobs.intro}</p>
          <div className="t05-job-card">
            <dl className="t05-dl">
              {data.jobs.rows.map((row, i) => (
                <div key={i} className="t05-dl__row">
                  <dt className="t05-dl__dt">{row.dt}</dt>
                  <dd className={`t05-dl__dd ${row.accent ? "t05-accent" : ""}`}>{row.dd}</dd>
                </div>
              ))}
            </dl>
            <div className="t05-req">
              <h4>応募資格</h4>
              <ul>
                {data.jobs.requirements.map((r, i) => (
                  <li key={i}><span className="t05-blue-dot" />{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <WaveDivider flip variant={3} />
      </section>

      {/* ─── BENEFITS ─── */}
      <section id="benefits" className="t05-section t05-section--light">
        <div ref={u3} className="t05-float t05-container">
          <div ref={aBenefitsTitle} className="t05-anim">
            <h2 className="t05-section-title">待遇・福利厚生</h2>
          </div>
          <div className="t05-benefits-grid">
            {data.benefits.map((b, i) => {
              const benefitRefs = [aBenefit0, aBenefit1, aBenefit2, aBenefit3, aBenefit4, aBenefit5];
              return (
                <div key={i} ref={benefitRefs[i]} className={`t05-anim t05-anim-delay-${Math.min(i + 1, 4)} t05-benefit-card`}>
                  <h4>{b.title}</h4>
                  <p>{b.text}</p>
                </div>
              );
            })}
          </div>
        </div>
        <WaveDivider variant={1} />
      </section>

      {/* ─── DAILY ─── */}
      <section id="daily" className="t05-section t05-section--white">
        <div ref={u4} className="t05-float t05-container">
          <div ref={aDailyTitle} className="t05-anim">
            <h2 className="t05-section-title">1日の流れ</h2>
          </div>
          <p className="t05-section-intro">{data.daily.intro}</p>
          <div className="t05-timeline">
            {data.daily.steps.map((s, i) => (
              <div key={i} className="t05-timeline__item">
                <div className="t05-timeline__marker">
                  <div className="t05-timeline__dot t05-wave-anim" />
                  {i < data.daily.steps.length - 1 && <div className="t05-timeline__line" />}
                </div>
                <div className="t05-timeline__content">
                  <span className="t05-timeline__time">{s.time}</span>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <WaveDivider flip variant={2} />
      </section>

      {/* ─── VOICES ─── */}
      <section id="voices" className="t05-section t05-section--light">
        <div ref={u5} className="t05-float t05-container">
          <div ref={aVoicesTitle} className="t05-anim">
            <h2 className="t05-section-title">先輩の声</h2>
          </div>
          <div className="t05-voices">
            {data.voices.map((v, i) => {
              const voiceRefs = [aVoice0, aVoice1, aVoice2];
              return (
                <div key={i} ref={voiceRefs[i]} className={`t05-anim t05-anim-delay-${i + 1}`}>
                  <div className="t05-voice-card" style={{ transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)` }}>
                    <p className="t05-voice-card__text">&ldquo;{v.text}&rdquo;</p>
                    <p className="t05-voice-card__highlight">{v.highlight}</p>
                    <footer className="t05-voice-card__footer">
                      {v.name}（{v.age}・{v.prev}）
                    </footer>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <WaveDivider variant={3} />
      </section>

      {/* ─── GALLERY ─── */}
      <section id="gallery" className="t05-section t05-section--white">
        <div ref={u9} className="t05-float t05-container">
          <div ref={aGalleryTitle} className="t05-anim">
            <h2 className="t05-section-title">{data.gallery.heading}</h2>
            <p className="t05-section-intro">{data.gallery.intro}</p>
          </div>
          <div
            className="t05-carousel"
            onTouchStart={(e) => { galleryTouchStart.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              const diff = galleryTouchStart.current - e.changedTouches[0].clientX;
              if (diff > 50) setGalleryIdx((p) => (p + 1) % data.gallery.images.length);
              if (diff < -50) setGalleryIdx((p) => (p - 1 + data.gallery.images.length) % data.gallery.images.length);
            }}
          >
            <div className="t05-carousel__track" style={{ transform: `translateX(-${galleryIdx * 100}%)` }}>
              {data.gallery.images.map((img, i) => (
                <figure key={i} className="t05-carousel__slide">
                  <Image src={`/keikamotsu-templates${img.src}`} alt={img.alt} width={800} height={500} className="t05-carousel__img" />
                  <figcaption className="t05-carousel__caption">{img.caption}</figcaption>
                </figure>
              ))}
            </div>
            <button className="t05-carousel__btn t05-carousel__btn--prev" onClick={() => setGalleryIdx((p) => (p - 1 + data.gallery.images.length) % data.gallery.images.length)} aria-label="前へ">&lsaquo;</button>
            <button className="t05-carousel__btn t05-carousel__btn--next" onClick={() => setGalleryIdx((p) => (p + 1) % data.gallery.images.length)} aria-label="次へ">&rsaquo;</button>
            <div className="t05-carousel__dots">
              {data.gallery.images.map((_, i) => (
                <button key={i} className={`t05-carousel__dot ${i === galleryIdx ? "t05-carousel__dot--active" : ""}`} onClick={() => setGalleryIdx(i)} aria-label={`スライド${i + 1}`} />
              ))}
            </div>
          </div>
        </div>
        <WaveDivider flip variant={1} />
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="t05-section t05-section--light">
        <div ref={u10} className="t05-float t05-container">
          <div ref={aFaqTitle} className="t05-anim">
            <h2 className="t05-section-title">よくある質問</h2>
          </div>
          <div className="t05-faq">
            {data.faq.map((item, i) => (
              <details key={i} className="t05-faq__item">
                <summary className="t05-faq__q">{item.q}</summary>
                <p className="t05-faq__a">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
        <WaveDivider variant={2} />
      </section>

      {/* ─── NEWS ─── */}
      <section id="news" className="t05-section t05-section--white">
        <div ref={u6} className="t05-float t05-container">
          <div ref={aNewsTitle} className="t05-anim">
            <h2 className="t05-section-title">お知らせ</h2>
          </div>
          <ul className="t05-news">
            {data.news.map((n, i) => (
              <li key={i} className="t05-news__item">
                <time>{n.date}</time>
                <span className={`t05-news__tag t05-news__tag--${n.tagStyle}`}>{n.tag}</span>
                <span>{n.title}</span>
              </li>
            ))}
          </ul>
        </div>
        <WaveDivider flip variant={1} />
      </section>

      {/* ─── ACCESS ─── */}
      <section id="access" className="t05-section t05-section--light">
        <div ref={u11} className="t05-float t05-container">
          <div ref={aAccessTitle} className="t05-anim">
            <h2 className="t05-section-title">{data.access.heading}</h2>
          </div>
          <div className="t05-access">
            <p className="t05-access__addr">{data.company.address}</p>
            <p className="t05-access__station">{data.access.nearestStation}</p>
            <p className="t05-access__note">{data.access.mapNote}</p>
            <div className="t05-access__map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.1!2d135.505!3d34.685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z5aSn6Ziq5bqc5aSn6Ziq5biC5Lit5aSu5Yy65pys55S6!5e0!3m2!1sja!2sjp!4v1"
                width="100%" height="300" style={{ border: 0 }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
        <WaveDivider variant={3} />
      </section>

      {/* ─── COMPANY ─── */}
      <section id="company" className="t05-section t05-section--white">
        <div ref={u7} className="t05-float t05-container">
          <div ref={aCompanyTitle} className="t05-anim">
            <h2 className="t05-section-title">会社概要</h2>
          </div>
          <div className="t05-job-card t05-job-card--narrow">
            <dl className="t05-dl">
              {data.companyInfo.map((c, i) => (
                <div key={i} className="t05-dl__row">
                  <dt className="t05-dl__dt">{c.dt}</dt>
                  <dd className="t05-dl__dd">{c.dd}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ─── APPLICATION FORM ─── */}
      <section id="apply" className="t05-section t05-section--light">
        <div ref={u12} className="t05-float t05-container">
          <div ref={aApplyTitle} className="t05-anim">
            <h2 className="t05-section-title">Web応募フォーム</h2>
            <p className="t05-section-intro">下記フォームからお気軽にご応募ください。</p>
          </div>
          <form className="t05-form" onSubmit={(e) => e.preventDefault()}>
            <div className="t05-form__group">
              <label className="t05-form__label">お名前 *</label>
              <input type="text" className="t05-form__input" required />
            </div>
            <div className="t05-form__group">
              <label className="t05-form__label">電話番号 *</label>
              <input type="tel" className="t05-form__input" required />
            </div>
            <div className="t05-form__group">
              <label className="t05-form__label">メールアドレス</label>
              <input type="email" className="t05-form__input" />
            </div>
            <div className="t05-form__group">
              <label className="t05-form__label">メッセージ</label>
              <textarea className="t05-form__textarea" rows={4} />
            </div>
            <button type="submit" className="t05-form__submit">送信する</button>
          </form>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="t05-cta">
        <WaveDivider variant={2} />
        <div ref={u8} className="t05-float t05-container">
          <div ref={aCtaSection} className="t05-anim">
            <h2 className="t05-cta__heading">{data.cta.heading}</h2>
          </div>
          <p className="t05-cta__sub">{data.cta.subtext}</p>
          <a href={`tel:${data.company.phone}`} className="t05-cta__phone t05-ripple-hover">{data.cta.phone}</a>
          <p className="t05-cta__hours">{data.company.hours}</p>
          <a href="#" className="t05-btn t05-btn--white">{data.cta.webLabel}</a>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="t05-footer">
        <div className="t05-footer__wave">
          <WaveDivider variant={3} />
        </div>
        <div className="t05-footer__inner">
          <p className="t05-footer__catch">{data.footer.catchphrase}</p>
          <p className="t05-footer__name">{data.company.name}</p>
          <p className="t05-footer__addr">{data.company.address}</p>
          <nav className="t05-footer__nav">
            {data.navLinks.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </nav>
          <p className="t05-footer__copy">&copy; {data.company.name}</p>
        </div>
      </footer>
    </div>
  );
}
