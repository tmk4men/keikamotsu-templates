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

/* ── slow fade observer ── */
function useSlowFade(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => el.classList.add("t04-in"), delay); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

/* ── gold constellation particles ── */
function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number }[] = [];

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(212,165,116,0.6)"; ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(212,165,116,${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="t04-constellation" />;
}

export default function Template04() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const galleryTouchStart = useRef(0);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setGalleryIdx((prev) => (prev + 1) % data.gallery.images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const f1 = useSlowFade(0), f2 = useSlowFade(200), f3 = useSlowFade(0);
  const f4 = useSlowFade(200), f5 = useSlowFade(0), f6 = useSlowFade(200);
  const f7 = useSlowFade(0), f8 = useSlowFade(0);
  const f9 = useSlowFade(0), f10 = useSlowFade(200), f11 = useSlowFade(0), f12 = useSlowFade(200);

  /* scroll-triggered animations */
  const aReasonsTitle = useScrollAnim("t04-anim--revealUp");
  const aReason0 = useScrollAnim("t04-anim--revealUp");
  const aReason1 = useScrollAnim("t04-anim--revealUp");
  const aReason2 = useScrollAnim("t04-anim--revealUp");
  const aJobsTitle = useScrollAnim("t04-anim--revealUp");
  const aBenefitsTitle = useScrollAnim("t04-anim--revealUp");
  const aBenefit0 = useScrollAnim("t04-anim--revealUp");
  const aBenefit1 = useScrollAnim("t04-anim--revealUp");
  const aBenefit2 = useScrollAnim("t04-anim--revealUp");
  const aBenefit3 = useScrollAnim("t04-anim--revealUp");
  const aBenefit4 = useScrollAnim("t04-anim--revealUp");
  const aBenefit5 = useScrollAnim("t04-anim--revealUp");
  const aDailyTitle = useScrollAnim("t04-anim--revealUp");
  const aVoicesTitle = useScrollAnim("t04-anim--revealUp");
  const aVoice0 = useScrollAnim("t04-anim--fadeIn");
  const aVoice1 = useScrollAnim("t04-anim--fadeIn");
  const aVoice2 = useScrollAnim("t04-anim--fadeIn");
  const aGalleryTitle = useScrollAnim("t04-anim--revealUp");
  const aFaqTitle = useScrollAnim("t04-anim--revealUp");
  const aNewsTitle = useScrollAnim("t04-anim--revealUp");
  const aAccessTitle = useScrollAnim("t04-anim--revealUp");
  const aCompanyTitle = useScrollAnim("t04-anim--revealUp");
  const aApplyTitle = useScrollAnim("t04-anim--revealUp");
  const aCtaSection = useScrollAnim("t04-anim--revealUp");

  return (
    <div className="theme-04">
      {/* ─── HEADER ─── */}
      <header className={`t04-header ${scrolled ? "t04-header--scrolled" : ""}`}>
        <div className="t04-header__inner">
          <a href="#" className="t04-logo">{data.company.nameEn}</a>
          <button
            className={`t04-hamburger ${menuOpen ? "t04-hamburger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニュー"
          >
            <span /><span />
          </button>
          <nav className={`t04-nav ${menuOpen ? "t04-nav--open" : ""}`}>
            {data.navLinks.map((l) => (
              <a key={l.href} href={l.href} className="t04-nav__link" onClick={() => setMenuOpen(false)}>{l.label}</a>
            ))}
            <a href={`tel:${data.company.phone}`} className="t04-nav__cta">{data.hero.cta}</a>
          </nav>
        </div>
      </header>

      {/* ─── HERO: split-screen ─── */}
      <section className="t04-hero">
        <video className="t04-hero-video" autoPlay muted loop playsInline poster="/keikamotsu-templates/images/hero-bg.webp">
          <source src="/keikamotsu-templates/videos/hero-nightcity.mp4" type="video/mp4" />
        </video>
        <div className="t04-hero__left">
          <div className="t04-hero__image" />
        </div>
        <div className="t04-hero__right">
          <Constellation />
          <div className="t04-hero__content">
            <h1 className="t04-hero__heading">
              {data.hero.headlineParts.map((p, i) => (
                <span key={i} className="t04-hero__heading-line t04-gold-text">{p}</span>
              ))}
            </h1>
            <div className="t04-hero__sub">
              {data.hero.subtext.map((t, i) => <p key={i}>{t}</p>)}
            </div>
            <div className="t04-hero__badges">
              {data.hero.badges.map((b) => <span key={b} className="t04-badge">{b}</span>)}
            </div>
            <div className="t04-hero__salary">
              月収 <span className="t04-gold-text">{data.hero.salaryMin}万〜{data.hero.salaryMax}万円</span>
            </div>
            <a href={`tel:${data.company.phone}`} className="t04-btn-gold">{data.hero.cta}</a>
          </div>
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="t04-marquee">
        <div className="t04-marquee__track">
          {[...data.marquee.top, ...data.marquee.bottom, ...data.marquee.top, ...data.marquee.bottom].map((t, i) => (
            <span key={i} className="t04-marquee__item">{t}<span className="t04-marquee__diamond">&nbsp;&#9670;&nbsp;</span></span>
          ))}
        </div>
      </div>

      {/* ─── REASONS: wide horizontal cards ─── */}
      <section id="reasons" className="t04-section">
        <div ref={f1} className="t04-fade t04-container">
          <div ref={aReasonsTitle} className="t04-anim">
            <h2 className="t04-section-title">選ばれる理由</h2>
          </div>
          <div className="t04-reasons">
            {data.reasons.map((r, i) => {
              const reasonRefs = [aReason0, aReason1, aReason2];
              return (
              <article key={i} ref={reasonRefs[i]} className={`t04-anim t04-anim-delay-${i + 1} t04-reason-wide`}>
                <div className="t04-reason-wide__num">{r.num}</div>
                <div className="t04-reason-wide__gold-line" />
                <div className="t04-reason-wide__body">
                  <h3>{r.title}</h3>
                  <p>{r.text}</p>
                </div>
              </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── JOBS ─── */}
      <section id="jobs" className="t04-section t04-section--alt">
        <div ref={f2} className="t04-fade t04-container">
          <div ref={aJobsTitle} className="t04-anim">
            <h2 className="t04-section-title">求人情報</h2>
          </div>
          <p className="t04-section-intro">{data.jobs.intro}</p>
          <div className="t04-table-gold">
            <div className="t04-table-gold__header">求人詳細</div>
            {data.jobs.rows.map((row, i) => (
              <div key={i} className="t04-table-gold__row">
                <span className="t04-table-gold__dt">{row.dt}</span>
                <span className={`t04-table-gold__dd ${row.accent ? "t04-gold-text" : ""}`}>{row.dd}</span>
              </div>
            ))}
          </div>
          <div className="t04-req">
            <h4>応募資格</h4>
            <ul>
              {data.jobs.requirements.map((r, i) => (
                <li key={i}><span className="t04-gold-dot" />{r}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── BENEFITS ─── */}
      <section id="benefits" className="t04-section">
        <div ref={f3} className="t04-fade t04-container">
          <div ref={aBenefitsTitle} className="t04-anim">
            <h2 className="t04-section-title">待遇・福利厚生</h2>
          </div>
          <div className="t04-benefits-grid">
            {data.benefits.map((b, i) => {
              const benefitRefs = [aBenefit0, aBenefit1, aBenefit2, aBenefit3, aBenefit4, aBenefit5];
              return (
                <div key={i} ref={benefitRefs[i]} className={`t04-anim t04-anim-delay-${Math.min(i + 1, 4)} t04-benefit-card`}>
                  <h4>{b.title}</h4>
                  <p>{b.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── DAILY: cinematic timeline ─── */}
      <section id="daily" className="t04-section t04-section--alt">
        <div ref={f4} className="t04-fade t04-container">
          <div ref={aDailyTitle} className="t04-anim">
            <h2 className="t04-section-title">1日の流れ</h2>
          </div>
          <p className="t04-section-intro">{data.daily.intro}</p>
          <div className="t04-cinema-timeline">
            {data.daily.steps.map((s, i) => (
              <div key={i} className="t04-cinema-step">
                <div className="t04-cinema-step__marker">
                  <div className="t04-cinema-step__dot" />
                  {i < data.daily.steps.length - 1 && <div className="t04-cinema-step__line" />}
                </div>
                <div className="t04-cinema-step__content">
                  <span className="t04-cinema-step__time">{s.time}</span>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VOICES ─── */}
      <section id="voices" className="t04-section">
        <div ref={f5} className="t04-fade t04-container">
          <div ref={aVoicesTitle} className="t04-anim">
            <h2 className="t04-section-title">先輩の声</h2>
          </div>
          <div className="t04-voices">
            {data.voices.map((v, i) => {
              const voiceRefs = [aVoice0, aVoice1, aVoice2];
              return (
              <div key={i} ref={voiceRefs[i]} className={`t04-anim t04-anim-delay-${i + 1}`}>
                <blockquote className="t04-voice">
                  <span className="t04-voice__mark">&ldquo;</span>
                  <p className="t04-voice__text">{v.text}</p>
                  <p className="t04-voice__highlight">{v.highlight}</p>
                  <cite className="t04-voice__cite">
                    {v.name}（{v.age}・{v.prev}）
                  </cite>
                </blockquote>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section id="gallery" className="t04-section t04-section--alt">
        <div ref={f9} className="t04-fade t04-container">
          <div ref={aGalleryTitle} className="t04-anim">
            <h2 className="t04-section-title">{data.gallery.heading}</h2>
          </div>
          <p className="t04-section-intro">{data.gallery.intro}</p>
          <div
            className="t04-carousel"
            onTouchStart={(e) => { galleryTouchStart.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              const diff = galleryTouchStart.current - e.changedTouches[0].clientX;
              if (diff > 50) setGalleryIdx((p) => (p + 1) % data.gallery.images.length);
              if (diff < -50) setGalleryIdx((p) => (p - 1 + data.gallery.images.length) % data.gallery.images.length);
            }}
          >
            <div className="t04-carousel__track" style={{ transform: `translateX(-${galleryIdx * 100}%)` }}>
              {data.gallery.images.map((img, i) => (
                <figure key={i} className="t04-carousel__slide">
                  <Image src={`/keikamotsu-templates${img.src}`} alt={img.alt} width={800} height={500} className="t04-carousel__img" />
                  <figcaption className="t04-carousel__caption">{img.caption}</figcaption>
                </figure>
              ))}
            </div>
            <button className="t04-carousel__btn t04-carousel__btn--prev" onClick={() => setGalleryIdx((p) => (p - 1 + data.gallery.images.length) % data.gallery.images.length)} aria-label="前へ">&lsaquo;</button>
            <button className="t04-carousel__btn t04-carousel__btn--next" onClick={() => setGalleryIdx((p) => (p + 1) % data.gallery.images.length)} aria-label="次へ">&rsaquo;</button>
            <div className="t04-carousel__dots">
              {data.gallery.images.map((_, i) => (
                <button key={i} className={`t04-carousel__dot ${i === galleryIdx ? "t04-carousel__dot--active" : ""}`} onClick={() => setGalleryIdx(i)} aria-label={`スライド${i + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="t04-section">
        <div ref={f10} className="t04-fade t04-container">
          <div ref={aFaqTitle} className="t04-anim">
            <h2 className="t04-section-title">よくある質問</h2>
          </div>
          <div className="t04-faq">
            {data.faq.map((item, i) => (
              <details key={i} className="t04-faq__item">
                <summary className="t04-faq__q">{item.q}</summary>
                <p className="t04-faq__a">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWS ─── */}
      <section id="news" className="t04-section t04-section--alt">
        <div ref={f6} className="t04-fade t04-container">
          <div ref={aNewsTitle} className="t04-anim">
            <h2 className="t04-section-title">お知らせ</h2>
          </div>
          <ul className="t04-news">
            {data.news.map((n, i) => (
              <li key={i} className="t04-news__item">
                <time className="t04-news__date">{n.date}</time>
                <span className={`t04-news__tag t04-news__tag--${n.tagStyle}`}>{n.tag}</span>
                <span className="t04-news__title">{n.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── ACCESS ─── */}
      <section id="access" className="t04-section">
        <div ref={f11} className="t04-fade t04-container">
          <div ref={aAccessTitle} className="t04-anim">
            <h2 className="t04-section-title">{data.access.heading}</h2>
          </div>
          <div className="t04-access">
            <p className="t04-access__addr">{data.company.address}</p>
            <p className="t04-access__station">{data.access.nearestStation}</p>
            <p className="t04-access__note">{data.access.mapNote}</p>
            <div className="t04-access__map">
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
      <section id="company" className="t04-section t04-section--alt">
        <div ref={f7} className="t04-fade t04-container">
          <div ref={aCompanyTitle} className="t04-anim">
            <h2 className="t04-section-title">会社概要</h2>
          </div>
          <div className="t04-table-gold t04-table-gold--narrow">
            {data.companyInfo.map((c, i) => (
              <div key={i} className="t04-table-gold__row">
                <span className="t04-table-gold__dt">{c.dt}</span>
                <span className="t04-table-gold__dd">{c.dd}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── APPLICATION FORM ─── */}
      <section id="apply" className="t04-section">
        <div ref={f12} className="t04-fade t04-container">
          <div ref={aApplyTitle} className="t04-anim">
            <h2 className="t04-section-title">Web応募フォーム</h2>
          </div>
          <p className="t04-section-intro">下記フォームからお気軽にご応募ください。</p>
          <form className="t04-form" onSubmit={(e) => e.preventDefault()}>
            <div className="t04-form__group">
              <label className="t04-form__label">お名前 *</label>
              <input type="text" className="t04-form__input" required />
            </div>
            <div className="t04-form__group">
              <label className="t04-form__label">電話番号 *</label>
              <input type="tel" className="t04-form__input" required />
            </div>
            <div className="t04-form__group">
              <label className="t04-form__label">メールアドレス</label>
              <input type="email" className="t04-form__input" />
            </div>
            <div className="t04-form__group">
              <label className="t04-form__label">メッセージ</label>
              <textarea className="t04-form__textarea" rows={4} />
            </div>
            <button type="submit" className="t04-form__submit">送信する</button>
          </form>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="t04-cta">
        <div ref={f8} className="t04-fade t04-container">
          <div className="t04-cta__gold-line t04-shimmer" />
          <div ref={aCtaSection} className="t04-anim">
            <h2 className="t04-cta__heading">{data.cta.heading}</h2>
          </div>
          <p className="t04-cta__sub">{data.cta.subtext}</p>
          <a href={`tel:${data.company.phone}`} className="t04-cta__phone">{data.cta.phone}</a>
          <p className="t04-cta__hours">{data.company.hours}</p>
          <a href="#" className="t04-btn-gold">{data.cta.webLabel}</a>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="t04-footer">
        <div className="t04-footer__inner">
          <p className="t04-footer__catch">{data.footer.catchphrase}</p>
          <div className="t04-footer__gold-line" />
          <p className="t04-footer__name">{data.company.name}</p>
          <p className="t04-footer__addr">{data.company.address}</p>
          <nav className="t04-footer__nav">
            {data.navLinks.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </nav>
          <p className="t04-footer__copy">&copy; {data.company.name}</p>
        </div>
      </footer>
    </div>
  );
}
