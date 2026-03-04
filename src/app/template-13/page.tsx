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
          setTimeout(() => el.classList.add("t13-revealed"), delay);
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
    const els = document.querySelectorAll<HTMLElement>(".t13-anim");
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

export default function Template13() {
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
    <div className="theme-13">
      {/* ─── STICKY HEADER ─── */}
      <header className={`t13-header ${scrolled ? "t13-header--scrolled" : ""}`}>
        <div className="t13-header__inner">
          <a href="#" className="t13-logo">
            <span className="t13-logo__mark">GL</span>
            <span className="t13-logo__text">{data.company.nameEn}</span>
          </a>
          <button
            className={`t13-hamburger ${menuOpen ? "t13-hamburger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニュー"
          >
            <span /><span /><span />
          </button>
          <nav className={`t13-nav ${menuOpen ? "t13-nav--open" : ""}`}>
            {data.navLinks.map((l) => (
              <a key={l.href} href={l.href} className="t13-nav__link" onClick={closeMenu}>
                {l.label}
              </a>
            ))}
            <a href={`tel:${data.company.phone}`} className="t13-nav__cta">
              {data.hero.cta}
            </a>
          </nav>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="t13-hero">
        <div className="t13-hero__bg" />
        <div className="t13-hero__watermark" aria-hidden="true">DRIVER</div>
        <div className="t13-hero__content">
          <h1 className="t13-hero__heading">
            {data.hero.headlineParts.map((part, i) => (
              <span key={i} className="t13-hero__heading-line">
                {part}
              </span>
            ))}
          </h1>
          <div className="t13-hero__sub">
            {data.hero.subtext.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>
          <div className="t13-hero__badges">
            {data.hero.badges.map((b) => (
              <span key={b} className="t13-badge">{b}</span>
            ))}
          </div>
          <div className="t13-hero__salary">
            月収<strong>{data.hero.salaryMin}万〜{data.hero.salaryMax}万円</strong>
          </div>
          <a href={`tel:${data.company.phone}`} className="t13-btn-heavy">
            {data.hero.cta}
          </a>
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="t13-marquee">
        <div className="t13-marquee__track">
          {[...data.marquee.top, ...data.marquee.top, ...data.marquee.top].map((t, i) => (
            <span key={i} className="t13-marquee__item">{t}</span>
          ))}
        </div>
      </div>

      {/* ─── REASONS ─── */}
      <section id="reasons" className="t13-section">
        <div ref={r1} className="t13-reveal t13-container">
          <h2 className="t13-section-title t13-anim" data-anim="t13-anim--stamp">
            選ばれる<span className="t13-amber">3</span>つの理由
          </h2>
          <div className="t13-reasons-grid">
            {data.reasons.map((r, i) => (
              <article key={i} className={`t13-reason-card t13-anim t13-anim-delay-${i + 1}`} data-anim="t13-anim--heavySlide">
                <div className="t13-reason-card__watermark">{r.num}</div>
                <span className="t13-reason-card__num">{r.num}</span>
                <h3 className="t13-reason-card__title">{r.title}</h3>
                <p className="t13-reason-card__text">{r.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── JOB INFO (industrial table) ─── */}
      <section id="jobs" className="t13-section t13-section--dark">
        <div ref={r2} className="t13-reveal t13-container">
          <h2 className="t13-section-title t13-anim" data-anim="t13-anim--stamp">求人情報</h2>
          <p className="t13-section-intro">{data.jobs.intro}</p>
          <div className="t13-industrial-table t13-anim t13-anim-delay-1" data-anim="t13-anim--heavySlide">
            <table>
              <tbody>
                {data.jobs.rows.map((row, i) => (
                  <tr key={i} className={row.accent ? "t13-row--accent" : ""}>
                    <th>{row.dt}</th>
                    <td>{row.dd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="t13-jobs-req">
            <h4>応募資格</h4>
            <div className="t13-req-grid">
              {data.jobs.requirements.map((r, i) => (
                <div key={i} className="t13-req-item">
                  <span className="t13-req-bullet" />
                  {r}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── BENEFITS (stamp cards) ─── */}
      <section id="benefits" className="t13-section">
        <div ref={r3} className="t13-reveal t13-container">
          <h2 className="t13-section-title t13-anim" data-anim="t13-anim--stamp">待遇・福利厚生</h2>
          <div className="t13-benefits-grid">
            {data.benefits.map((b, i) => (
              <div key={i} className={`t13-benefit-card t13-anim t13-anim-delay-${(i % 3) + 1}`} data-anim="t13-anim--heavySlide">
                <div className="t13-benefit-card__stamp">
                  <span>{b.title.charAt(0)}</span>
                </div>
                <h4 className="t13-benefit-card__title">{b.title}</h4>
                <p className="t13-benefit-card__text">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DAILY SCHEDULE (bold timeline) ─── */}
      <section id="daily" className="t13-section t13-section--dark">
        <div ref={r4} className="t13-reveal t13-container">
          <h2 className="t13-section-title t13-anim" data-anim="t13-anim--stamp">1日の流れ</h2>
          <p className="t13-section-intro">{data.daily.intro}</p>
          <div className="t13-timeline">
            <div className="t13-timeline__rail" />
            {data.daily.steps.map((s, i) => (
              <div key={i} className={`t13-timeline__step t13-anim t13-anim-delay-${(i % 3) + 1}`} data-anim="t13-anim--heavySlide">
                <div className="t13-timeline__marker" />
                <div className="t13-timeline__time">{s.time}</div>
                <div className="t13-timeline__content">
                  <h4 className="t13-timeline__title">{s.title}</h4>
                  <p className="t13-timeline__desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VOICES ─── */}
      <section id="voices" className="t13-section">
        <div ref={r5} className="t13-reveal t13-container">
          <h2 className="t13-section-title t13-anim" data-anim="t13-anim--stamp">先輩ドライバーの声</h2>
          <div className="t13-voices-grid">
            {data.voices.map((v, i) => (
              <article key={i} className={`t13-voice-card t13-anim t13-anim-delay-${i + 1}`} data-anim="t13-anim--heavySlide">
                <div className="t13-voice-card__name-block">
                  <strong className="t13-voice-card__name">{v.name}</strong>
                  <span className="t13-voice-card__meta">{v.age}・{v.prev}</span>
                </div>
                <p className="t13-voice-card__body">{v.text}</p>
                <p className="t13-voice-card__highlight">{v.highlight}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section id="gallery" className="t13-section t13-section--dark">
        <div ref={rGallery} className="t13-reveal t13-container">
          <h2 className="t13-section-title t13-anim" data-anim="t13-anim--stamp">{data.gallery.heading}</h2>
          <p className="t13-section-intro">{data.gallery.intro}</p>
          <div
            className="t13-carousel"
            onTouchStart={(e) => { galleryTouchStart.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              const diff = galleryTouchStart.current - e.changedTouches[0].clientX;
              if (diff > 50) setGalleryIdx((prev) => (prev + 1) % data.gallery.images.length);
              if (diff < -50) setGalleryIdx((prev) => (prev - 1 + data.gallery.images.length) % data.gallery.images.length);
            }}
          >
            <div className="t13-carousel__track" style={{ transform: `translateX(-${galleryIdx * 100}%)` }}>
              {data.gallery.images.map((img, i) => (
                <div key={i} className="t13-carousel__slide">
                  <Image src={`/keikamotsu-templates${img.src}`} alt={img.alt} width={600} height={400} className="t13-carousel__img" />
                  <p className="t13-carousel__caption">{img.caption}</p>
                </div>
              ))}
            </div>
            <button className="t13-carousel__btn t13-carousel__btn--prev" onClick={() => setGalleryIdx((prev) => (prev - 1 + data.gallery.images.length) % data.gallery.images.length)} aria-label="前へ">{"\u2039"}</button>
            <button className="t13-carousel__btn t13-carousel__btn--next" onClick={() => setGalleryIdx((prev) => (prev + 1) % data.gallery.images.length)} aria-label="次へ">{"\u203A"}</button>
            <div className="t13-carousel__dots">
              {data.gallery.images.map((_, i) => (
                <button key={i} className={`t13-carousel__dot ${i === galleryIdx ? "t13-carousel__dot--active" : ""}`} onClick={() => setGalleryIdx(i)} aria-label={`スライド${i + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="t13-section">
        <div ref={rFaq} className="t13-reveal t13-container">
          <h2 className="t13-section-title t13-anim" data-anim="t13-anim--stamp">よくある質問</h2>
          <div className="t13-faq">
            {data.faq.map((item, i) => (
              <details key={i} className="t13-faq__item">
                <summary className="t13-faq__q">{item.q}</summary>
                <p className="t13-faq__a">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWS ─── */}
      <section id="news" className="t13-section t13-section--dark">
        <div ref={r6} className="t13-reveal t13-container">
          <h2 className="t13-section-title t13-anim" data-anim="t13-anim--stamp">お知らせ</h2>
          <div className="t13-news-table">
            {data.news.map((n, i) => (
              <div key={i} className={`t13-news-row t13-anim t13-anim-delay-${(i % 3) + 1}`} data-anim="t13-anim--expand">
                <time className="t13-news-date">{n.date}</time>
                <span className={`t13-news-tag t13-news-tag--${n.tagStyle}`}>{n.tag}</span>
                <span className="t13-news-title">{n.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ACCESS ─── */}
      <section id="access" className="t13-section">
        <div ref={rAccess} className="t13-reveal t13-container">
          <h2 className="t13-section-title t13-anim" data-anim="t13-anim--stamp">{data.access.heading}</h2>
          <div className="t13-access">
            <p className="t13-access__addr">{data.company.address}</p>
            <p className="t13-access__station">{data.access.nearestStation}</p>
            <p className="t13-access__note">{data.access.mapNote}</p>
            <div className="t13-access__map">
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
      <section id="company" className="t13-section">
        <div ref={r7} className="t13-reveal t13-container">
          <h2 className="t13-section-title t13-anim" data-anim="t13-anim--stamp">会社概要</h2>
          <div className="t13-industrial-table t13-industrial-table--compact">
            <table>
              <tbody>
                {data.companyInfo.map((c, i) => (
                  <tr key={i}>
                    <th>{c.dt}</th>
                    <td>{c.dd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── APPLICATION FORM ─── */}
      <section id="apply" className="t13-section t13-section--dark">
        <div ref={rApply} className="t13-reveal t13-container">
          <h2 className="t13-section-title t13-anim" data-anim="t13-anim--stamp">応募フォーム</h2>
          <form className="t13-form" onSubmit={(e) => e.preventDefault()}>
            <div className="t13-form__group">
              <label className="t13-form__label" htmlFor="t13-name">お名前 <span className="t13-amber">*</span></label>
              <input id="t13-name" type="text" className="t13-form__input" required placeholder="山田 太郎" />
            </div>
            <div className="t13-form__group">
              <label className="t13-form__label" htmlFor="t13-phone">電話番号 <span className="t13-amber">*</span></label>
              <input id="t13-phone" type="tel" className="t13-form__input" required placeholder="090-1234-5678" />
            </div>
            <div className="t13-form__group">
              <label className="t13-form__label" htmlFor="t13-email">メールアドレス</label>
              <input id="t13-email" type="email" className="t13-form__input" placeholder="example@email.com" />
            </div>
            <div className="t13-form__group">
              <label className="t13-form__label" htmlFor="t13-message">メッセージ</label>
              <textarea id="t13-message" className="t13-form__textarea" rows={5} placeholder="ご質問やご希望があればご記入ください" />
            </div>
            <button type="submit" className="t13-form__submit">送信する</button>
          </form>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="t13-cta-section">
        <div className="t13-cta-watermark" aria-hidden="true">RECRUIT</div>
        <div ref={r8} className="t13-reveal t13-container">
          <h2 className="t13-cta-heading t13-anim" data-anim="t13-anim--stamp">{data.cta.heading}</h2>
          <p className="t13-cta-sub t13-anim t13-anim-delay-1" data-anim="t13-anim--heavySlide">{data.cta.subtext}</p>
          <div className="t13-cta-phone-wrap">
            <a href={`tel:${data.company.phone}`} className="t13-cta-phone">
              {data.cta.phone}
            </a>
          </div>
          <p className="t13-cta-hours">{data.company.hours}</p>
          <a href="#" className="t13-btn-heavy t13-btn-heavy--amber t13-anim t13-anim-delay-2" data-anim="t13-anim--stamp">
            {data.cta.webLabel}
          </a>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="t13-footer">
        <div className="t13-footer__inner">
          <p className="t13-footer__catch">{data.footer.catchphrase}</p>
          <p className="t13-footer__company">{data.company.name}</p>
          <p className="t13-footer__addr">{data.company.address}</p>
          <nav className="t13-footer__nav">
            {data.navLinks.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </nav>
          <p className="t13-footer__copy">&copy; {data.company.name}</p>
        </div>
      </footer>
    </div>
  );
}
