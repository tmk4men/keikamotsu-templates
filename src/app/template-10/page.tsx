"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as data from "@/data/siteData";
import "./styles.css";

/* ===================================================
   Template 10: クラシック (Classic Elegant)
   Ornamental frames + decorative dividers + book layout
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
    const targets = el.querySelectorAll<HTMLElement>(".t10-anim");
    if (targets.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const anim = target.dataset.anim || "t10-anim--revealUp";
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

function ClassicReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div ref={ref} className={`classic-reveal ${visible ? "classic-reveal--in" : ""} ${className}`}>
      {children}
    </div>
  );
}

function OrnamentalDivider() {
  return (
    <div className="classic-divider">
      <span className="classic-divider__line" />
      <span className="classic-divider__diamond" />
      <span className="classic-divider__line" />
    </div>
  );
}

export default function Template10Page() {
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
    <div className="theme-10" ref={animRef}>
      {/* ========== Header ========== */}
      <header className={`classic-header ${scrolled ? "classic-header--scrolled" : ""}`}>
        <div className="classic-header__inner">
          <a href="#" className="classic-logo">
            <span className="classic-logo__ornament">&#9670;</span>
            <span className="classic-logo__name">{data.company.name.replace("株式会社", "")}</span>
          </a>

          <button className="classic-hamburger" onClick={() => setMobileNav(!mobileNav)} aria-label="メニュー">
            <span /><span /><span />
          </button>

          <nav className={`classic-nav ${mobileNav ? "classic-nav--open" : ""}`}>
            {data.navLinks.map((link) => (
              <a key={link.href} href={link.href} className="classic-nav__link" onClick={() => setMobileNav(false)}>
                {link.label}
              </a>
            ))}
            <a href="#apply" className="classic-nav__cta" onClick={() => setMobileNav(false)}>応募する</a>
          </nav>
        </div>
      </header>

      {/* ========== Hero ========== */}
      <section className="classic-hero">
        <video className="t10-hero-video" autoPlay muted loop playsInline poster="/keikamotsu-templates/images/hero-bg.webp">
          <source src="/keikamotsu-templates/videos/hero-daytime.mp4" type="video/mp4" />
        </video>
        <div className="classic-hero__overlay" />
        <div className="classic-hero__frame">
          <div className="classic-hero__frame-corner classic-hero__frame-corner--tl" />
          <div className="classic-hero__frame-corner classic-hero__frame-corner--tr" />
          <div className="classic-hero__frame-corner classic-hero__frame-corner--bl" />
          <div className="classic-hero__frame-corner classic-hero__frame-corner--br" />
          <div className="classic-hero__content">
            <h1 className="classic-hero__heading">
              {data.hero.headlineParts[0]}<br className="br-desktop" />{data.hero.headlineParts[1]}
            </h1>
            <p className="classic-hero__sub">
              {data.hero.subtext.map((line, i) => (
                <span key={i}>{line}<br className="br-desktop" /></span>
              ))}
            </p>
            <div className="classic-hero__salary">
              月収 <span className="classic-hero__salary-num">{data.hero.salaryMin}</span>
              〜<span className="classic-hero__salary-num">{data.hero.salaryMax}</span> 万円
            </div>
            <div className="classic-hero__badges">
              {data.hero.badges.map((b) => (
                <span key={b} className="classic-hero__badge">{b}</span>
              ))}
            </div>
            <a href="#apply" className="classic-hero__cta">{data.hero.cta}</a>
          </div>
        </div>
      </section>

      {/* ========== Marquee (Elegant) ========== */}
      <div className="classic-marquee">
        <div className="classic-marquee__track">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="classic-marquee__items">
              {[...data.marquee.top, ...data.marquee.bottom].map((item) => (
                <span key={item} className="classic-marquee__item">
                  {item}<span className="classic-marquee__ornament">&#10070;</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <OrnamentalDivider />

      {/* ========== Reasons (Book/Chapter Style) ========== */}
      <ClassicReveal>
        <section id="reasons" className="classic-section classic-reasons">
          <div className="classic-container">
            <h2 className="classic-section-title t10-anim" data-anim="t10-anim--revealUp">選ばれる三つの理由</h2>
            <OrnamentalDivider />
            <div className="classic-chapters">
              {data.reasons.map((r, i) => (
                <article key={r.num} className={`classic-chapter t10-anim t10-anim-delay-${Math.min(i + 1, 3) as 1 | 2 | 3}`} data-anim="t10-anim--revealUp">
                  <p className="classic-chapter__text">
                    <span className="classic-chapter__drop-cap t10-anim" data-anim="t10-anim--dropCap">{r.title[0]}</span>
                    <strong className="classic-chapter__title-inline">{r.title.slice(1)}</strong>
                    <br className="br-desktop" />{r.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </ClassicReveal>

      <OrnamentalDivider />

      {/* ========== Job Info (Formal Document) ========== */}
      <ClassicReveal>
        <section id="jobs" className="classic-section classic-jobs">
          <div className="classic-container">
            <h2 className="classic-section-title t10-anim" data-anim="t10-anim--revealUp">求人情報</h2>
            <OrnamentalDivider />
            <p className="classic-section-intro t10-anim t10-anim-delay-1" data-anim="t10-anim--fadeIn">{data.jobs.intro}</p>
            <div className="classic-formal-doc t10-anim t10-anim-delay-2" data-anim="t10-anim--revealUp">
              <dl className="classic-formal-doc__dl">
                {data.jobs.rows.map((row) => (
                  <div key={row.dt} className="classic-formal-doc__row">
                    <dt className="classic-formal-doc__dt">{row.dt}</dt>
                    <dd className={`classic-formal-doc__dd ${row.accent ? "classic-formal-doc__dd--accent" : ""}`}>{row.dd}</dd>
                  </div>
                ))}
              </dl>
              <div className="classic-formal-doc__req">
                <h4 className="classic-formal-doc__req-title">応募条件</h4>
                <ul className="classic-formal-doc__req-list">
                  {data.jobs.requirements.map((r) => (
                    <li key={r} className="classic-formal-doc__req-item">
                      <span className="classic-formal-doc__bullet">&#9670;</span>{r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </ClassicReveal>

      <OrnamentalDivider />

      {/* ========== Benefits (Two-Column List) ========== */}
      <ClassicReveal>
        <section id="benefits" className="classic-section classic-benefits">
          <div className="classic-container">
            <h2 className="classic-section-title t10-anim" data-anim="t10-anim--revealUp">待遇・福利厚生</h2>
            <OrnamentalDivider />
            <div className="classic-benefits__grid">
              {data.benefits.map((b, i) => (
                <div key={b.title} className={`classic-benefit-item t10-anim t10-anim-delay-${Math.min(i % 3 + 1, 3) as 1 | 2 | 3}`} data-anim="t10-anim--revealUp">
                  <span className="classic-benefit-item__bullet">&#9670;</span>
                  <div>
                    <h3 className="classic-benefit-item__title">{b.title}</h3>
                    <p className="classic-benefit-item__text">{b.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ClassicReveal>

      <OrnamentalDivider />

      {/* ========== Daily (Ornamental Timeline) ========== */}
      <ClassicReveal>
        <section id="daily" className="classic-section classic-daily">
          <div className="classic-container">
            <h2 className="classic-section-title t10-anim" data-anim="t10-anim--revealUp">一日の流れ</h2>
            <OrnamentalDivider />
            <p className="classic-section-intro t10-anim t10-anim-delay-1" data-anim="t10-anim--fadeIn">{data.daily.intro}</p>
            <div className="classic-timeline">
              {data.daily.steps.map((step, i) => (
                <div key={step.time} className={`classic-timeline__item t10-anim t10-anim-delay-${Math.min(i % 3 + 1, 3) as 1 | 2 | 3}`} data-anim="t10-anim--revealUp">
                  <div className="classic-timeline__marker">
                    <div className="classic-timeline__dot" />
                    {i < data.daily.steps.length - 1 && <div className="classic-timeline__line" />}
                  </div>
                  <div className="classic-timeline__content">
                    <span className="classic-timeline__time">{step.time}</span>
                    <h3 className="classic-timeline__title">{step.title}</h3>
                    <p className="classic-timeline__desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ClassicReveal>

      <OrnamentalDivider />

      {/* ========== Voices (Bordered Cards with Corners) ========== */}
      <ClassicReveal>
        <section id="voices" className="classic-section classic-voices">
          <div className="classic-container">
            <h2 className="classic-section-title t10-anim" data-anim="t10-anim--revealUp">先輩ドライバーの声</h2>
            <OrnamentalDivider />
            <div className="classic-voices__grid">
              {data.voices.map((v, i) => (
                <article key={v.name} className={`classic-voice-card t10-anim t10-anim-delay-${Math.min(i + 1, 3) as 1 | 2 | 3}`} data-anim="t10-anim--fadeIn">
                  <div className="classic-voice-card__corner classic-voice-card__corner--tl" />
                  <div className="classic-voice-card__corner classic-voice-card__corner--br" />
                  <div className="classic-voice-card__profile">
                    <span className="classic-voice-card__name">{v.name}</span>
                    <span className="classic-voice-card__meta">{v.age} / {v.prev}</span>
                  </div>
                  <blockquote className="classic-voice-card__quote">
                    <span className="classic-voice-card__open-quote">「</span>
                    {v.text}
                    <span className="classic-voice-card__close-quote">」</span>
                  </blockquote>
                  <p className="classic-voice-card__highlight">{v.highlight}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </ClassicReveal>

      <OrnamentalDivider />

      {/* ========== Gallery ========== */}
      <ClassicReveal>
        <section id="gallery" className="classic-section classic-gallery-section">
          <div className="classic-container">
            <h2 className="classic-section-title t10-anim" data-anim="t10-anim--revealUp">{data.gallery.heading}</h2>
            <OrnamentalDivider />
            <p className="classic-section-intro t10-anim t10-anim-delay-1" data-anim="t10-anim--fadeIn">{data.gallery.intro}</p>
            <div
              className="classic-carousel"
              onTouchStart={(e) => { galleryTouchStart.current = e.touches[0].clientX; }}
              onTouchEnd={(e) => {
                const diff = galleryTouchStart.current - e.changedTouches[0].clientX;
                if (diff > 50) setGalleryIdx((p) => (p + 1) % data.gallery.images.length);
                if (diff < -50) setGalleryIdx((p) => (p - 1 + data.gallery.images.length) % data.gallery.images.length);
              }}
            >
              <div className="classic-carousel__track" style={{ transform: `translateX(-${galleryIdx * 100}%)` }}>
                {data.gallery.images.map((img, i) => (
                  <figure key={i} className="classic-carousel__slide">
                    <Image src={`/keikamotsu-templates${img.src}`} alt={img.alt} width={800} height={500} className="classic-carousel__img" />
                    <figcaption className="classic-carousel__caption">{img.caption}</figcaption>
                  </figure>
                ))}
              </div>
              <button className="classic-carousel__btn classic-carousel__btn--prev" onClick={() => setGalleryIdx((p) => (p - 1 + data.gallery.images.length) % data.gallery.images.length)} aria-label="前へ">&#8249;</button>
              <button className="classic-carousel__btn classic-carousel__btn--next" onClick={() => setGalleryIdx((p) => (p + 1) % data.gallery.images.length)} aria-label="次へ">&#8250;</button>
              <div className="classic-carousel__dots">
                {data.gallery.images.map((_, i) => (
                  <button key={i} className={`classic-carousel__dot ${i === galleryIdx ? "classic-carousel__dot--active" : ""}`} onClick={() => setGalleryIdx(i)} aria-label={`スライド${i + 1}`} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </ClassicReveal>

      <OrnamentalDivider />

      {/* ========== FAQ ========== */}
      <ClassicReveal>
        <section id="faq" className="classic-section classic-faq-section">
          <div className="classic-container">
            <h2 className="classic-section-title t10-anim" data-anim="t10-anim--revealUp">よくある質問</h2>
            <OrnamentalDivider />
            <div className="classic-faq">
              {data.faq.map((item, i) => (
                <details key={i} className={`classic-faq__item t10-anim t10-anim-delay-${Math.min(i % 3 + 1, 3) as 1 | 2 | 3}`} data-anim="t10-anim--revealUp">
                  <summary className="classic-faq__q">{item.q}</summary>
                  <p className="classic-faq__a">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </ClassicReveal>

      <OrnamentalDivider />

      {/* ========== News ========== */}
      <ClassicReveal>
        <section id="news" className="classic-section classic-news">
          <div className="classic-container">
            <h2 className="classic-section-title t10-anim" data-anim="t10-anim--revealUp">お知らせ</h2>
            <OrnamentalDivider />
            <ul className="classic-news__list">
              {data.news.map((n, i) => (
                <li key={n.title} className={`classic-news__item t10-anim t10-anim-delay-${Math.min(i + 1, 3) as 1 | 2 | 3}`} data-anim="t10-anim--revealUp">
                  <time className="classic-news__date">{n.date}</time>
                  <span className={`classic-news__tag classic-news__tag--${n.tagStyle}`}>{n.tag}</span>
                  <span className="classic-news__title">{n.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </ClassicReveal>

      <OrnamentalDivider />

      {/* ========== Company (Double-Border Table) ========== */}
      <ClassicReveal>
        <section id="company" className="classic-section classic-company">
          <div className="classic-container">
            <h2 className="classic-section-title t10-anim" data-anim="t10-anim--revealUp">会社概要</h2>
            <OrnamentalDivider />
            <table className="classic-company__table t10-anim t10-anim-delay-1" data-anim="t10-anim--fadeIn">
              <tbody>
                {data.companyInfo.map((row) => (
                  <tr key={row.dt}>
                    <th className="classic-company__th">{row.dt}</th>
                    <td className="classic-company__td">{row.dd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </ClassicReveal>

      <OrnamentalDivider />

      {/* ========== Access ========== */}
      <ClassicReveal>
        <section id="access" className="classic-section classic-access-section">
          <div className="classic-container">
            <h2 className="classic-section-title t10-anim" data-anim="t10-anim--revealUp">{data.access.heading}</h2>
            <OrnamentalDivider />
            <div className="classic-access t10-anim t10-anim-delay-1" data-anim="t10-anim--fadeIn">
              <p className="classic-access__addr">〒{data.company.postalCode} {data.company.address}</p>
              <p className="classic-access__station">{data.access.nearestStation}</p>
              <p className="classic-access__note">{data.access.mapNote}</p>
              <div className="classic-access__map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.1!2d135.505!3d34.685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z5aSn6Ziq5bqc5aSn6Ziq5biC5Lit5aSu5Yy65pys55S6!5e0!3m2!1sja!2sjp!4v1"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="アクセスマップ"
                />
              </div>
            </div>
          </div>
        </section>
      </ClassicReveal>

      <OrnamentalDivider />

      {/* ========== Application Form ========== */}
      <ClassicReveal>
        <section id="apply-form" className="classic-section classic-form-section">
          <div className="classic-container">
            <h2 className="classic-section-title t10-anim" data-anim="t10-anim--revealUp">応募フォーム</h2>
            <OrnamentalDivider />
            <p className="classic-section-intro t10-anim t10-anim-delay-1" data-anim="t10-anim--fadeIn">まずはお気軽にご応募ください。</p>
            <form className="classic-form t10-anim t10-anim-delay-2" data-anim="t10-anim--revealUp" onSubmit={(e) => e.preventDefault()}>
              <div className="classic-form__group">
                <label className="classic-form__label" htmlFor="classic-name">お名前 <span style={{ color: "#b71c1c" }}>*</span></label>
                <input id="classic-name" type="text" className="classic-form__input" required placeholder="山田 太郎" />
              </div>
              <div className="classic-form__group">
                <label className="classic-form__label" htmlFor="classic-phone">電話番号 <span style={{ color: "#b71c1c" }}>*</span></label>
                <input id="classic-phone" type="tel" className="classic-form__input" required placeholder="090-1234-5678" />
              </div>
              <div className="classic-form__group">
                <label className="classic-form__label" htmlFor="classic-email">メールアドレス</label>
                <input id="classic-email" type="email" className="classic-form__input" placeholder="example@email.com" />
              </div>
              <div className="classic-form__group">
                <label className="classic-form__label" htmlFor="classic-message">メッセージ</label>
                <textarea id="classic-message" className="classic-form__textarea" rows={5} placeholder="ご質問やご要望があればご記入ください" />
              </div>
              <button type="submit" className="classic-form__submit">送信する</button>
            </form>
          </div>
        </section>
      </ClassicReveal>

      <OrnamentalDivider />

      {/* ========== CTA (Ornamental Border) ========== */}
      <ClassicReveal>
        <section id="apply" className="classic-section classic-cta">
          <div className="classic-container">
            <div className="classic-cta__frame t10-anim" data-anim="t10-anim--revealUp">
              <h2 className="classic-cta__heading">{data.cta.heading}</h2>
              <p className="classic-cta__sub">{data.cta.subtext}</p>
              <div className="classic-cta__actions">
                <a href={`tel:${data.cta.phone}`} className="classic-cta__phone">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                  </svg>
                  {data.cta.phone}
                </a>
                <a href="/apply" className="classic-cta__web">{data.cta.webLabel}</a>
              </div>
              <p className="classic-cta__hours">受付時間: {data.company.hours}</p>
            </div>
          </div>
        </section>
      </ClassicReveal>

      {/* ========== Footer ========== */}
      <footer className="classic-footer">
        <div className="classic-footer__inner">
          <p className="classic-footer__catch">{data.footer.catchphrase}</p>
          <OrnamentalDivider />
          <div className="classic-footer__info">
            <p className="classic-footer__company">{data.company.name}</p>
            <p className="classic-footer__address">〒{data.company.postalCode} {data.company.address}</p>
            <a href={`tel:${data.company.phone}`} className="classic-footer__phone">{data.company.phone}</a>
            <p className="classic-footer__hours">{data.company.hours}</p>
          </div>
          <p className="classic-footer__copy">&copy; {new Date().getFullYear()} {data.company.nameEn}</p>
        </div>
      </footer>
    </div>
  );
}
