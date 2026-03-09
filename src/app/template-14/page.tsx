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
          setTimeout(() => el.classList.add("t14-revealed"), delay);
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
    const els = document.querySelectorAll<HTMLElement>(".t14-anim");
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

/* ── Floating bubbles ── */
function Bubbles({ count = 12 }: { count?: number }) {
  const colors = ["#d1fae5", "#ede9fe", "#fce7f3", "#dbeafe", "#fef3c7"];
  return (
    <div className="t14-bubbles" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        const size = 20 + Math.random() * 60;
        return (
          <span
            key={i}
            className="t14-bubble"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${size}px`,
              height: `${size}px`,
              background: colors[i % colors.length],
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        );
      })}
    </div>
  );
}

export default function Template14() {
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

  const pastelColors = ["#d1fae5", "#ede9fe", "#fce7f3"];
  const pastelBgs = ["#f0fdf4", "#f5f3ff", "#fdf2f8", "#eff6ff", "#fefce8", "#fdf2f8"];

  return (
    <div className="theme-14">
      {/* ─── STICKY HEADER ─── */}
      <header className={`t14-header ${scrolled ? "t14-header--scrolled" : ""}`}>
        <div className="t14-header__inner">
          <a href="#" className="t14-logo">
            <span className="t14-logo__circle">GL</span>
            <span className="t14-logo__text">{data.company.nameEn}</span>
          </a>
          <button
            className={`t14-hamburger ${menuOpen ? "t14-hamburger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニュー"
          >
            <span /><span /><span />
          </button>
          <nav className={`t14-nav ${menuOpen ? "t14-nav--open" : ""}`}>
            {data.navLinks.map((l) => (
              <a key={l.href} href={l.href} className="t14-nav__link" onClick={closeMenu}>
                {l.label}
              </a>
            ))}
            <a href={`tel:${data.company.phone}`} className="t14-nav__cta">
              {data.hero.cta}
            </a>
          </nav>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="t14-hero">
        <video className="t14-hero-video" autoPlay muted loop playsInline poster="/keikamotsu-templates/images/hero-bg.webp">
          <source src="/keikamotsu-templates/videos/hero-bright.mp4" type="video/mp4" />
        </video>
        <div className="t14-hero__bg" />
        <Bubbles count={15} />
        <div className="t14-hero__content">
          <h1 className="t14-hero__heading">
            {data.hero.headlineParts.map((part, i) => (
              <span key={i} className="t14-hero__heading-line">{part}</span>
            ))}
          </h1>
          <div className="t14-hero__sub">
            {data.hero.subtext.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>
          <div className="t14-hero__badges">
            {data.hero.badges.map((b) => (
              <span key={b} className="t14-badge">{b}</span>
            ))}
          </div>
          <div className="t14-hero__salary">
            月収<strong>{data.hero.salaryMin}万〜{data.hero.salaryMax}万円</strong>
          </div>
          <a href={`tel:${data.company.phone}`} className="t14-btn-friendly">
            {data.hero.cta}
          </a>
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="t14-marquee">
        <div className="t14-marquee__track">
          {[...data.marquee.top, ...data.marquee.top, ...data.marquee.top].map((t, i) => (
            <span key={i} className="t14-marquee__item">{t}</span>
          ))}
        </div>
        <div className="t14-marquee__track t14-marquee__track--reverse">
          {[...data.marquee.bottom, ...data.marquee.bottom, ...data.marquee.bottom].map((t, i) => (
            <span key={i} className="t14-marquee__item">{t}</span>
          ))}
        </div>
      </div>

      {/* ─── REASONS ─── */}
      <section id="reasons" className="t14-section">
        <div className="t14-deco-dots t14-float-deco" aria-hidden="true" />
        <div ref={r1} className="t14-reveal t14-container">
          <h2 className="t14-section-title t14-anim" data-anim="t14-anim--popUp">
            選ばれる<span className="t14-emerald">3</span>つの理由
          </h2>
          <div className="t14-reasons-grid">
            {data.reasons.map((r, i) => (
              <article
                key={i}
                className={`t14-reason-card t14-wobble t14-anim t14-anim-delay-${i + 1}`}
                data-anim="t14-anim--popUp"
                style={{ borderTopColor: pastelColors[i % 3] }}
              >
                <span className="t14-reason-card__num">{r.num}</span>
                <h3 className="t14-reason-card__title">{r.title}</h3>
                <p className="t14-reason-card__text">{r.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── JOB INFO ─── */}
      <section id="jobs" className="t14-section t14-section--white">
        <div ref={r2} className="t14-reveal t14-container">
          <h2 className="t14-section-title t14-anim" data-anim="t14-anim--popUp">求人情報</h2>
          <p className="t14-section-intro">{data.jobs.intro}</p>
          <div className="t14-jobs-card t14-anim t14-anim-delay-1" data-anim="t14-anim--popUp">
            <dl className="t14-dl">
              {data.jobs.rows.map((row, i) => (
                <div key={i} className={`t14-dl__row ${row.accent ? "t14-dl__row--accent" : ""}`}>
                  <dt className="t14-dl__dt">{row.dt}</dt>
                  <dd className="t14-dl__dd">{row.dd}</dd>
                </div>
              ))}
            </dl>
            <div className="t14-jobs-req">
              <h4>応募資格</h4>
              <ul>
                {data.jobs.requirements.map((r, i) => (
                  <li key={i}>
                    <span className="t14-req-circle" style={{ background: pastelColors[i % 3] }} />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BENEFITS ─── */}
      <section id="benefits" className="t14-section">
        <div ref={r3} className="t14-reveal t14-container">
          <h2 className="t14-section-title t14-anim" data-anim="t14-anim--popUp">待遇・福利厚生</h2>
          <div className="t14-benefits-grid">
            {data.benefits.map((b, i) => (
              <div key={i} className={`t14-benefit-card t14-wobble t14-anim t14-anim-delay-${(i % 4) + 1}`} data-anim="t14-anim--popUp">
                <div
                  className="t14-benefit-card__circle"
                  style={{ background: pastelBgs[i % 6] }}
                >
                  <span>{b.title.charAt(0)}</span>
                </div>
                <h4 className="t14-benefit-card__title">{b.title}</h4>
                <p className="t14-benefit-card__text">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DAILY SCHEDULE ─── */}
      <section id="daily" className="t14-section t14-section--white">
        <div ref={r4} className="t14-reveal t14-container">
          <h2 className="t14-section-title t14-anim" data-anim="t14-anim--popUp">1日の流れ</h2>
          <p className="t14-section-intro">{data.daily.intro}</p>
          <div className="t14-timeline">
            <div className="t14-timeline__line" />
            {data.daily.steps.map((s, i) => (
              <div key={i} className={`t14-timeline__step t14-anim t14-anim-delay-${(i % 4) + 1}`} data-anim="t14-anim--popUp">
                <div
                  className="t14-timeline__dot"
                  style={{ background: pastelBgs[i % 6] }}
                >
                  <span className="t14-timeline__time">{s.time}</span>
                </div>
                <div
                  className="t14-timeline__card"
                  style={{ background: pastelBgs[i % 6] }}
                >
                  <h4 className="t14-timeline__title">{s.title}</h4>
                  <p className="t14-timeline__desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VOICES (speech bubbles) ─── */}
      <section id="voices" className="t14-section">
        <div ref={r5} className="t14-reveal t14-container">
          <h2 className="t14-section-title t14-anim" data-anim="t14-anim--popUp">先輩ドライバーの声</h2>
          <div className="t14-voices-grid">
            {data.voices.map((v, i) => (
              <article key={i} className={`t14-voice-card t14-anim t14-anim-delay-${i + 1}`} data-anim="t14-anim--expandBubble">
                <div className="t14-voice-card__bubble">
                  <p className="t14-voice-card__body">{v.text}</p>
                  <p className="t14-voice-card__highlight">{v.highlight}</p>
                  <div className="t14-voice-card__triangle" />
                </div>
                <div className="t14-voice-card__footer">
                  <div
                    className="t14-voice-card__avatar"
                    style={{ background: pastelBgs[i % 6] }}
                  >
                    {v.name.charAt(0)}
                  </div>
                  <div>
                    <strong>{v.name}</strong>
                    <span className="t14-voice-card__meta">（{v.age}・{v.prev}）</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section id="gallery" className="t14-section t14-section--white">
        <div ref={rGallery} className="t14-reveal t14-container">
          <h2 className="t14-section-title t14-anim" data-anim="t14-anim--popUp">{data.gallery.heading}</h2>
          <p className="t14-section-intro">{data.gallery.intro}</p>
          <div
            className="t14-carousel"
            onTouchStart={(e) => { galleryTouchStart.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              const diff = galleryTouchStart.current - e.changedTouches[0].clientX;
              if (diff > 50) setGalleryIdx((prev) => (prev + 1) % data.gallery.images.length);
              if (diff < -50) setGalleryIdx((prev) => (prev - 1 + data.gallery.images.length) % data.gallery.images.length);
            }}
          >
            <div className="t14-carousel__track" style={{ transform: `translateX(-${galleryIdx * 100}%)` }}>
              {data.gallery.images.map((img, i) => (
                <div key={i} className="t14-carousel__slide">
                  <Image src={`/keikamotsu-templates${img.src}`} alt={img.alt} width={600} height={400} className="t14-carousel__img" />
                  <p className="t14-carousel__caption">{img.caption}</p>
                </div>
              ))}
            </div>
            <button className="t14-carousel__btn t14-carousel__btn--prev" onClick={() => setGalleryIdx((prev) => (prev - 1 + data.gallery.images.length) % data.gallery.images.length)} aria-label="前へ">{"\u2039"}</button>
            <button className="t14-carousel__btn t14-carousel__btn--next" onClick={() => setGalleryIdx((prev) => (prev + 1) % data.gallery.images.length)} aria-label="次へ">{"\u203A"}</button>
            <div className="t14-carousel__dots">
              {data.gallery.images.map((_, i) => (
                <button key={i} className={`t14-carousel__dot ${i === galleryIdx ? "t14-carousel__dot--active" : ""}`} onClick={() => setGalleryIdx(i)} aria-label={`スライド${i + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="t14-section">
        <div ref={rFaq} className="t14-reveal t14-container">
          <h2 className="t14-section-title t14-anim" data-anim="t14-anim--popUp">よくある質問</h2>
          <div className="t14-faq">
            {data.faq.map((item, i) => (
              <details key={i} className="t14-faq__item">
                <summary className="t14-faq__q">{item.q}</summary>
                <p className="t14-faq__a">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWS ─── */}
      <section id="news" className="t14-section t14-section--white">
        <div ref={r6} className="t14-reveal t14-container">
          <h2 className="t14-section-title t14-anim" data-anim="t14-anim--popUp">お知らせ</h2>
          <ul className="t14-news-list">
            {data.news.map((n, i) => (
              <li key={i} className={`t14-news-item t14-anim t14-anim-delay-${(i % 4) + 1}`} data-anim="t14-anim--popUp">
                <span className="t14-news-date">{n.date}</span>
                <span className={`t14-news-tag t14-news-tag--${n.tagStyle}`}>{n.tag}</span>
                <span className="t14-news-title">{n.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── ACCESS ─── */}
      <section id="access" className="t14-section t14-section--white">
        <div ref={rAccess} className="t14-reveal t14-container">
          <h2 className="t14-section-title t14-anim" data-anim="t14-anim--popUp">{data.access.heading}</h2>
          <div className="t14-access">
            <p className="t14-access__addr">{data.company.address}</p>
            <p className="t14-access__station">{data.access.nearestStation}</p>
            <p className="t14-access__note">{data.access.mapNote}</p>
            <div className="t14-access__map">
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
      <section id="company" className="t14-section">
        <div ref={r7} className="t14-reveal t14-container">
          <h2 className="t14-section-title t14-anim" data-anim="t14-anim--popUp">会社概要</h2>
          <dl className="t14-dl t14-dl--company">
            {data.companyInfo.map((c, i) => (
              <div key={i} className="t14-dl__row">
                <dt className="t14-dl__dt">{c.dt}</dt>
                <dd className="t14-dl__dd">{c.dd}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ─── APPLICATION FORM ─── */}
      <section id="apply" className="t14-section t14-section--white">
        <div ref={rApply} className="t14-reveal t14-container">
          <h2 className="t14-section-title t14-anim" data-anim="t14-anim--popUp">応募フォーム</h2>
          <form className="t14-form" onSubmit={(e) => e.preventDefault()}>
            <div className="t14-form__group">
              <label className="t14-form__label" htmlFor="t14-name">お名前 <span className="t14-emerald">*</span></label>
              <input id="t14-name" type="text" className="t14-form__input" required placeholder="山田 太郎" />
            </div>
            <div className="t14-form__group">
              <label className="t14-form__label" htmlFor="t14-phone">電話番号 <span className="t14-emerald">*</span></label>
              <input id="t14-phone" type="tel" className="t14-form__input" required placeholder="090-1234-5678" />
            </div>
            <div className="t14-form__group">
              <label className="t14-form__label" htmlFor="t14-email">メールアドレス</label>
              <input id="t14-email" type="email" className="t14-form__input" placeholder="example@email.com" />
            </div>
            <div className="t14-form__group">
              <label className="t14-form__label" htmlFor="t14-message">メッセージ</label>
              <textarea id="t14-message" className="t14-form__textarea" rows={5} placeholder="ご質問やご希望があればご記入ください" />
            </div>
            <button type="submit" className="t14-form__submit">送信する</button>
          </form>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="t14-cta-section">
        <Bubbles count={8} />
        <div ref={r8} className="t14-reveal t14-container">
          <h2 className="t14-cta-heading t14-anim" data-anim="t14-anim--popUp">{data.cta.heading}</h2>
          <p className="t14-cta-sub t14-anim t14-anim-delay-1" data-anim="t14-anim--popUp">{data.cta.subtext}</p>
          <div className="t14-cta-phone-wrap">
            <a href={`tel:${data.company.phone}`} className="t14-cta-phone">
              {data.cta.phone}
            </a>
          </div>
          <p className="t14-cta-hours">{data.company.hours}</p>
          <a href="#" className="t14-btn-friendly t14-btn-friendly--lg t14-wobble t14-anim t14-anim-delay-2" data-anim="t14-anim--expandBubble">
            {data.cta.webLabel}
          </a>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="t14-footer">
        <div className="t14-footer__inner">
          <p className="t14-footer__catch">{data.footer.catchphrase}</p>
          <p className="t14-footer__company">{data.company.name}</p>
          <p className="t14-footer__addr">{data.company.address}</p>
          <nav className="t14-footer__nav">
            {data.navLinks.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </nav>
          <p className="t14-footer__copy">&copy; {data.company.name}</p>
        </div>
      </footer>
    </div>
  );
}
