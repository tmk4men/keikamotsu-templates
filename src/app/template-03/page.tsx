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

/* ── bounce reveal ── */
function useBounceIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("t03-bounced"); obs.unobserve(el); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ── confetti ── */
function Confetti({ active }: { active: boolean }) {
  if (!active) return null;
  const colors = ["#ec4899", "#f59e0b", "#8b5cf6", "#10b981", "#3b82f6"];
  return (
    <div className="t03-confetti" aria-hidden="true">
      {Array.from({ length: 40 }).map((_, i) => (
        <span
          key={i}
          className="t03-confetti__dot"
          style={{
            left: `${Math.random() * 100}%`,
            background: colors[i % colors.length],
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${1 + Math.random() * 1.5}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ── blob SVG ── */
function Blob({ className }: { className?: string }) {
  return (
    <svg className={`t03-blob ${className || ""}`} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M44.3,-76.4C57.7,-69.5,69.1,-57.8,77.2,-44.1C85.3,-30.4,90.1,-15.2,89.1,-0.6C88.1,14,81.3,28,72.4,40.3C63.5,52.6,52.5,63.2,39.7,71.1C26.8,79,13.4,84.2,-1.2,86.3C-15.8,88.4,-31.7,87.4,-44.4,79.5C-57.1,71.6,-66.6,56.8,-74.1,41.3C-81.6,25.8,-87.1,9.5,-84.3,1.6C-81.5,-6.3,-70.4,-12.6,-62.1,-21.8C-53.8,-31,-48.3,-43.1,-39.3,-52.6C-30.3,-62.1,-17.7,-69,0.3,-69.5C18.2,-70.1,30.9,-83.3,44.3,-76.4Z" transform="translate(100 100)" />
    </svg>
  );
}

export default function Template03() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const galleryTouchStart = useRef(0);
  const ctaRef = useRef<HTMLDivElement>(null);

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

  /* confetti trigger */
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShowConfetti(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const b1 = useBounceIn(), b2 = useBounceIn(), b3 = useBounceIn();
  const b4 = useBounceIn(), b5 = useBounceIn(), b6 = useBounceIn(), b7 = useBounceIn();
  const b8 = useBounceIn(), b9 = useBounceIn(), b10 = useBounceIn(), b11 = useBounceIn();

  /* scroll-triggered animations */
  const aReasonsTitle = useScrollAnim("t03-anim--bounceUp");
  const aFlip0 = useScrollAnim("t03-anim--popIn");
  const aFlip1 = useScrollAnim("t03-anim--popIn");
  const aFlip2 = useScrollAnim("t03-anim--popIn");
  const aJobsTitle = useScrollAnim("t03-anim--bounceUp");
  const aBenefitsTitle = useScrollAnim("t03-anim--bounceUp");
  const aHoney0 = useScrollAnim("t03-anim--popIn");
  const aHoney1 = useScrollAnim("t03-anim--popIn");
  const aHoney2 = useScrollAnim("t03-anim--popIn");
  const aHoney3 = useScrollAnim("t03-anim--popIn");
  const aHoney4 = useScrollAnim("t03-anim--popIn");
  const aHoney5 = useScrollAnim("t03-anim--popIn");
  const aDailyTitle = useScrollAnim("t03-anim--bounceUp");
  const aVoicesTitle = useScrollAnim("t03-anim--bounceUp");
  const aBubble0 = useScrollAnim("t03-anim--popIn");
  const aBubble1 = useScrollAnim("t03-anim--popIn");
  const aBubble2 = useScrollAnim("t03-anim--popIn");
  const aGalleryTitle = useScrollAnim("t03-anim--bounceUp");
  const aFaqTitle = useScrollAnim("t03-anim--bounceUp");
  const aNewsTitle = useScrollAnim("t03-anim--bounceUp");
  const aAccessTitle = useScrollAnim("t03-anim--bounceUp");
  const aCompanyTitle = useScrollAnim("t03-anim--bounceUp");
  const aApplyTitle = useScrollAnim("t03-anim--bounceUp");
  const aCtaBtn = useScrollAnim("t03-anim--bounceIn");

  return (
    <div className="theme-03">
      {/* ─── HEADER ─── */}
      <header className={`t03-header ${scrolled ? "t03-header--scrolled" : ""}`}>
        <div className="t03-header__inner">
          <a href="#" className="t03-logo">{data.company.nameEn}</a>
          <button
            className={`t03-hamburger ${menuOpen ? "t03-hamburger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニュー"
          >
            <span /><span /><span />
          </button>
          <nav className={`t03-nav ${menuOpen ? "t03-nav--open" : ""}`}>
            {data.navLinks.map((l) => (
              <a key={l.href} href={l.href} className="t03-nav__link" onClick={() => setMenuOpen(false)}>{l.label}</a>
            ))}
            <a href={`tel:${data.company.phone}`} className="t03-nav__cta">{data.hero.cta}</a>
          </nav>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="t03-hero">
        <video className="t03-hero-video" autoPlay muted loop playsInline poster="/keikamotsu-templates/images/hero-bg.webp">
          <source src="/keikamotsu-templates/videos/hero-bright.mp4" type="video/mp4" />
        </video>
        <Blob className="t03-hero__blob t03-hero__blob--1" />
        <Blob className="t03-hero__blob t03-hero__blob--2" />
        <Blob className="t03-hero__blob t03-hero__blob--3" />
        <div className="t03-hero__content">
          <div className="t03-hero__badges-top">
            {data.hero.badges.map((b, i) => (
              <span key={b} className="t03-pill" style={{ animationDelay: `${0.3 + i * 0.15}s` }}>{b}</span>
            ))}
          </div>
          <h1 className="t03-hero__heading">
            {data.hero.headlineParts.map((p, i) => (
              <span key={i} className="t03-hero__heading-line">{p}</span>
            ))}
          </h1>
          <div className="t03-hero__sub">
            {data.hero.subtext.map((t, i) => <p key={i}>{t}</p>)}
          </div>
          <div className="t03-hero__salary">
            月収<strong>{data.hero.salaryMin}万〜{data.hero.salaryMax}万円</strong>
          </div>
          <a href={`tel:${data.company.phone}`} className="t03-btn-rainbow">{data.hero.cta}</a>
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="t03-marquee">
        <div className="t03-marquee__track">
          {[...data.marquee.top, ...data.marquee.bottom, ...data.marquee.top, ...data.marquee.bottom].map((t, i) => (
            <span key={i} className="t03-marquee__item" style={{ animationDelay: `${i * 0.1}s` }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ─── REASONS: 3D flip cards ─── */}
      <section id="reasons" className="t03-section t03-section--pink">
        <div ref={b1} className="t03-bounce t03-container">
          <div ref={aReasonsTitle} className="t03-anim">
            <h2 className="t03-section-title">選ばれる3つの理由</h2>
          </div>
          <div className="t03-reasons-grid">
            {data.reasons.map((r, i) => {
              const faceColors = ["#ec4899", "#8b5cf6", "#3b82f6"];
              const flipRefs = [aFlip0, aFlip1, aFlip2];
              return (
                <div key={i} ref={flipRefs[i]} className={`t03-anim t03-anim-delay-${i + 1} t03-flip-card t03-wiggle`}>
                  <div className="t03-flip-card__inner">
                    <div className="t03-flip-card__front" style={{ background: faceColors[i] }}>
                      <span className="t03-flip-card__num">{r.num}</span>
                      <h3>{r.title}</h3>
                    </div>
                    <div className="t03-flip-card__back">
                      <p>{r.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── JOBS: colorful pills ─── */}
      <section id="jobs" className="t03-section t03-section--yellow">
        <div ref={b2} className="t03-bounce t03-container">
          <div ref={aJobsTitle} className="t03-anim">
            <h2 className="t03-section-title">求人情報</h2>
          </div>
          <p className="t03-section-intro">{data.jobs.intro}</p>
          <div className="t03-jobs-pills">
            {data.jobs.rows.map((row, i) => {
              const pillColors = ["#ec4899", "#8b5cf6", "#f59e0b", "#10b981", "#3b82f6"];
              return (
                <div key={i} className="t03-job-pill" style={{ borderColor: pillColors[i % pillColors.length] }}>
                  <span className="t03-job-pill__label" style={{ background: pillColors[i % pillColors.length] }}>{row.dt}</span>
                  <span className={`t03-job-pill__value ${row.accent ? "t03-accent" : ""}`}>{row.dd}</span>
                </div>
              );
            })}
          </div>
          <div className="t03-req-wrap">
            <h4>応募資格</h4>
            <div className="t03-req-tags">
              {data.jobs.requirements.map((r, i) => (
                <span key={i} className="t03-req-tag">{r}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── BENEFITS: honeycomb offset ─── */}
      <section id="benefits" className="t03-section t03-section--mint">
        <div ref={b3} className="t03-bounce t03-container">
          <div ref={aBenefitsTitle} className="t03-anim">
            <h2 className="t03-section-title">待遇・福利厚生</h2>
          </div>
          <div className="t03-honeycomb">
            {data.benefits.map((b, i) => {
              const honeyRefs = [aHoney0, aHoney1, aHoney2, aHoney3, aHoney4, aHoney5];
              return (
              <div key={i} ref={honeyRefs[i]} className={`t03-anim t03-anim-delay-${Math.min(i + 1, 5)} t03-honeycomb__cell t03-wiggle`}>
                <div className="t03-honeycomb__inner">
                  <h4>{b.title}</h4>
                  <p>{b.text}</p>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── DAILY: stepped layout ─── */}
      <section id="daily" className="t03-section t03-section--lavender">
        <div ref={b4} className="t03-bounce t03-container">
          <div ref={aDailyTitle} className="t03-anim">
            <h2 className="t03-section-title">1日の流れ</h2>
          </div>
          <p className="t03-section-intro">{data.daily.intro}</p>
          <div className="t03-steps">
            {data.daily.steps.map((s, i) => {
              const stepColors = ["#ec4899", "#f59e0b", "#8b5cf6", "#10b981", "#3b82f6", "#ef4444"];
              return (
                <div
                  key={i}
                  className="t03-step"
                  style={{ marginLeft: `${i * 5}%`, borderLeftColor: stepColors[i] }}
                >
                  <div className="t03-step__time" style={{ color: stepColors[i] }}>{s.time}</div>
                  <h4 className="t03-step__title">{s.title}</h4>
                  <p className="t03-step__desc">{s.desc}</p>
                  {i < data.daily.steps.length - 1 && (
                    <div className="t03-step__connector" style={{ borderColor: stepColors[i] }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── VOICES: speech bubble cards ─── */}
      <section id="voices" className="t03-section t03-section--pink">
        <div ref={b5} className="t03-bounce t03-container">
          <div ref={aVoicesTitle} className="t03-anim">
            <h2 className="t03-section-title">先輩の声</h2>
          </div>
          <div className="t03-voices">
            {data.voices.map((v, i) => {
              const bubbleColors = ["#ec4899", "#8b5cf6", "#3b82f6"];
              const bubbleRefs = [aBubble0, aBubble1, aBubble2];
              return (
                <div key={i} ref={bubbleRefs[i]} className={`t03-anim t03-anim-delay-${i + 1} t03-bubble-card`}>
                  <div className="t03-bubble-card__avatar" style={{ background: bubbleColors[i] }}>
                    {v.name.charAt(0)}
                  </div>
                  <div className="t03-bubble-card__speech">
                    <div className="t03-bubble-card__triangle" style={{ borderTopColor: "#fff" }} />
                    <p className="t03-bubble-card__text">{v.text}</p>
                    <p className="t03-bubble-card__highlight" style={{ color: bubbleColors[i] }}>{v.highlight}</p>
                    <footer className="t03-bubble-card__footer">
                      {v.name}（{v.age}・{v.prev}）
                    </footer>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section id="gallery" className="t03-section t03-section--yellow">
        <div ref={b8} className="t03-bounce t03-container">
          <div ref={aGalleryTitle} className="t03-anim">
            <h2 className="t03-section-title">{data.gallery.heading}</h2>
            <p className="t03-section-intro">{data.gallery.intro}</p>
          </div>
          <div
            className="t03-carousel"
            onTouchStart={(e) => { galleryTouchStart.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              const diff = galleryTouchStart.current - e.changedTouches[0].clientX;
              if (diff > 50) setGalleryIdx((p) => (p + 1) % data.gallery.images.length);
              if (diff < -50) setGalleryIdx((p) => (p - 1 + data.gallery.images.length) % data.gallery.images.length);
            }}
          >
            <div className="t03-carousel__track" style={{ transform: `translateX(-${galleryIdx * 100}%)` }}>
              {data.gallery.images.map((img, i) => (
                <figure key={i} className="t03-carousel__slide">
                  <Image src={`/keikamotsu-templates${img.src}`} alt={img.alt} width={800} height={500} className="t03-carousel__img" />
                  <figcaption className="t03-carousel__caption">{img.caption}</figcaption>
                </figure>
              ))}
            </div>
            <button className="t03-carousel__btn t03-carousel__btn--prev" onClick={() => setGalleryIdx((p) => (p - 1 + data.gallery.images.length) % data.gallery.images.length)} aria-label="前へ">&lsaquo;</button>
            <button className="t03-carousel__btn t03-carousel__btn--next" onClick={() => setGalleryIdx((p) => (p + 1) % data.gallery.images.length)} aria-label="次へ">&rsaquo;</button>
            <div className="t03-carousel__dots">
              {data.gallery.images.map((_, i) => (
                <button key={i} className={`t03-carousel__dot ${i === galleryIdx ? "t03-carousel__dot--active" : ""}`} onClick={() => setGalleryIdx(i)} aria-label={`スライド${i + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="t03-section t03-section--mint">
        <div ref={b9} className="t03-bounce t03-container">
          <div ref={aFaqTitle} className="t03-anim">
            <h2 className="t03-section-title">よくある質問</h2>
          </div>
          <div className="t03-faq">
            {data.faq.map((item, i) => (
              <details key={i} className="t03-faq__item">
                <summary className="t03-faq__q">{item.q}</summary>
                <p className="t03-faq__a">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWS ─── */}
      <section id="news" className="t03-section t03-section--white">
        <div ref={b6} className="t03-bounce t03-container">
          <div ref={aNewsTitle} className="t03-anim">
            <h2 className="t03-section-title">お知らせ</h2>
          </div>
          <div className="t03-news-timeline">
            {data.news.map((n, i) => {
              const dotColors = ["#ef4444", "#ec4899", "#10b981", "#8b5cf6"];
              return (
                <div key={i} className="t03-news-item">
                  <div className="t03-news-item__dot" style={{ background: dotColors[i] }} />
                  <time className="t03-news-item__date">{n.date}</time>
                  <span className={`t03-news-item__tag t03-news-item__tag--${n.tagStyle}`}>{n.tag}</span>
                  <span className="t03-news-item__title">{n.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── ACCESS ─── */}
      <section id="access" className="t03-section t03-section--lavender">
        <div ref={b10} className="t03-bounce t03-container">
          <div ref={aAccessTitle} className="t03-anim">
            <h2 className="t03-section-title">{data.access.heading}</h2>
          </div>
          <div className="t03-access">
            <p className="t03-access__addr">{data.company.address}</p>
            <p className="t03-access__station">{data.access.nearestStation}</p>
            <p className="t03-access__note">{data.access.mapNote}</p>
            <div className="t03-access__map">
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
      <section id="company" className="t03-section t03-section--yellow">
        <div ref={b7} className="t03-bounce t03-container">
          <div ref={aCompanyTitle} className="t03-anim">
            <h2 className="t03-section-title">会社概要</h2>
          </div>
          <div className="t03-company-card">
            {data.companyInfo.map((c, i) => (
              <div key={i} className="t03-company-row">
                <span className="t03-company-row__dt">{c.dt}</span>
                <span className="t03-company-row__dd">{c.dd}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── APPLICATION FORM ─── */}
      <section id="apply" className="t03-section t03-section--pink">
        <div ref={b11} className="t03-bounce t03-container">
          <div ref={aApplyTitle} className="t03-anim">
            <h2 className="t03-section-title">Web応募フォーム</h2>
            <p className="t03-section-intro">下記フォームからお気軽にご応募ください。</p>
          </div>
          <form className="t03-form" onSubmit={(e) => e.preventDefault()}>
            <div className="t03-form__group">
              <label className="t03-form__label">お名前 *</label>
              <input type="text" className="t03-form__input" required />
            </div>
            <div className="t03-form__group">
              <label className="t03-form__label">電話番号 *</label>
              <input type="tel" className="t03-form__input" required />
            </div>
            <div className="t03-form__group">
              <label className="t03-form__label">メールアドレス</label>
              <input type="email" className="t03-form__input" />
            </div>
            <div className="t03-form__group">
              <label className="t03-form__label">メッセージ</label>
              <textarea className="t03-form__textarea" rows={4} />
            </div>
            <button type="submit" className="t03-form__submit">送信する</button>
          </form>
        </div>
      </section>

      {/* ─── CTA with confetti ─── */}
      <section className="t03-cta" ref={ctaRef}>
        <Confetti active={showConfetti} />
        <h2 className="t03-cta__heading">{data.cta.heading}</h2>
        <p className="t03-cta__sub">{data.cta.subtext}</p>
        <a href={`tel:${data.company.phone}`} className="t03-cta__phone">{data.cta.phone}</a>
        <p className="t03-cta__hours">{data.company.hours}</p>
        <div ref={aCtaBtn} className="t03-anim" style={{ display: "inline-block" }}>
          <a href="#" className="t03-btn-rainbow t03-btn-rainbow--lg">{data.cta.webLabel}</a>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="t03-footer">
        <div className="t03-footer__inner">
          <p className="t03-footer__catch">{data.footer.catchphrase}</p>
          <p className="t03-footer__name">{data.company.name}</p>
          <p className="t03-footer__addr">{data.company.address}</p>
          <nav className="t03-footer__nav">
            {data.navLinks.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </nav>
          <p className="t03-footer__copy">&copy; {data.company.name}</p>
        </div>
      </footer>
    </div>
  );
}
