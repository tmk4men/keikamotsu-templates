"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as data from "@/data/siteData";
import "./styles.css";

/* ===================================================
   Template 07: ダイナミック (Dynamic Bold)
   Diagonal sections + oversized numbers + parallax
   =================================================== */

function useReveal(direction: "left" | "right" | "up" = "up") {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, className: `dyn-reveal dyn-reveal--${direction} ${visible ? "dyn-reveal--active" : ""}` };
}

function useScrollAnim() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>(".t07-anim");
    if (targets.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const anim = target.dataset.anim || "t07-anim--powerUp";
            target.classList.add(anim);
            obs.unobserve(target);
          }
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, []);
  return ref;
}

export default function Template07Page() {
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

  const r1 = useReveal("left");
  const r2 = useReveal("right");
  const r3 = useReveal("left");
  const rJobs = useReveal("up");
  const rBenefits = useReveal("up");
  const rDaily = useReveal("up");
  const rVoices = useReveal("up");
  const rGallery = useReveal("up");
  const rFaq = useReveal("up");
  const rNews = useReveal("up");
  const rAccess = useReveal("up");
  const rCompany = useReveal("up");
  const rForm = useReveal("up");
  const rCta = useReveal("up");

  return (
    <div className="theme-07" ref={animRef}>
      {/* ========== Header ========== */}
      <header className={`dyn-header ${scrolled ? "dyn-header--scrolled" : ""}`}>
        <div className="dyn-header__inner">
          <a href="#" className="dyn-logo">
            <span className="dyn-logo__bar" />
            <span className="dyn-logo__text">{data.company.nameEn}</span>
          </a>

          <button className="dyn-hamburger" onClick={() => setMobileNav(!mobileNav)} aria-label="メニュー">
            <span /><span /><span />
          </button>

          <nav className={`dyn-nav ${mobileNav ? "dyn-nav--open" : ""}`}>
            {data.navLinks.map((link) => (
              <a key={link.href} href={link.href} className="dyn-nav__link" onClick={() => setMobileNav(false)}>
                {link.label}
              </a>
            ))}
            <a href="#apply" className="dyn-nav__cta" onClick={() => setMobileNav(false)}>応募する</a>
          </nav>
        </div>
      </header>

      {/* ========== Hero ========== */}
      <section className="dyn-hero">
        <div className="dyn-hero__bg" />
        <div className="dyn-hero__content">
          <div className="dyn-hero__accent-line" />
          <h1 className="dyn-hero__heading">
            {data.hero.headlineParts[0]}<br />{data.hero.headlineParts[1]}
          </h1>
          <p className="dyn-hero__sub">
            {data.hero.subtext.join("")}
          </p>
          <div className="dyn-hero__salary">
            <span className="dyn-hero__salary-num">{data.hero.salaryMin}</span>
            <span className="dyn-hero__salary-sep">〜</span>
            <span className="dyn-hero__salary-num">{data.hero.salaryMax}</span>
            <span className="dyn-hero__salary-unit">万円/月</span>
          </div>
          <div className="dyn-hero__badges">
            {data.hero.badges.map((b) => (
              <span key={b} className="dyn-hero__badge">{b}</span>
            ))}
          </div>
          <a href="#apply" className="dyn-hero__cta">{data.hero.cta}</a>
        </div>
        <div className="dyn-hero__diagonal" />
      </section>

      {/* ========== Marquee (Skewed) ========== */}
      <div className="dyn-marquee">
        <div className="dyn-marquee__track">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="dyn-marquee__items">
              {[...data.marquee.top, ...data.marquee.bottom].map((item) => (
                <span key={item} className="dyn-marquee__item">
                  {item}<span className="dyn-marquee__slash">///</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ========== Reasons (Oversized Numbers) ========== */}
      <section id="reasons" className="dyn-reasons">
        <div className="dyn-container">
          <h2 className="dyn-section-title t07-anim" data-anim="t07-anim--slam">選ばれる<span className="dyn-accent">3</span>つの理由</h2>
          <div className="dyn-reasons__list">
            {data.reasons.map((r, i) => {
              const rev = i === 1 ? r2 : i === 2 ? r3 : r1;
              return (
                <div key={r.num} ref={rev.ref} className={`dyn-reason ${rev.className} t07-anim t07-anim-delay-${Math.min(i + 1, 3) as 1 | 2 | 3}`} data-anim={i % 2 === 0 ? "t07-anim--slideLeft" : "t07-anim--slideRight"}>
                  <span className="dyn-reason__big-num">{r.num}</span>
                  <div className="dyn-reason__content">
                    <h3 className="dyn-reason__title">{r.title}</h3>
                    <p className="dyn-reason__text">{r.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="dyn-diagonal-bg dyn-diagonal-bg--bottom" />
      </section>

      {/* ========== Job Info ========== */}
      <section id="jobs" className="dyn-jobs">
        <div className="dyn-diagonal-bg dyn-diagonal-bg--top" />
        <div className="dyn-container" ref={rJobs.ref}>
          <div className={rJobs.className}>
            <h2 className="dyn-section-title t07-anim" data-anim="t07-anim--slam">求人情報</h2>
            <p className="dyn-section-sub t07-anim t07-anim-delay-1" data-anim="t07-anim--powerUp">{data.jobs.intro}</p>
            <dl className="dyn-jobs__dl t07-anim t07-anim-delay-2" data-anim="t07-anim--slideLeft">
              {data.jobs.rows.map((row) => (
                <div key={row.dt} className="dyn-jobs__row">
                  <dt className="dyn-jobs__dt">{row.dt}</dt>
                  <dd className={`dyn-jobs__dd ${row.accent ? "dyn-jobs__dd--accent" : ""}`}>{row.dd}</dd>
                </div>
              ))}
            </dl>
            <div className="dyn-jobs__req">
              <h4 className="dyn-jobs__req-title">応募条件</h4>
              <ul className="dyn-jobs__req-list">
                {data.jobs.requirements.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========== Benefits (Alternating) ========== */}
      <section id="benefits" className="dyn-benefits">
        <div className="dyn-container" ref={rBenefits.ref}>
          <div className={rBenefits.className}>
            <h2 className="dyn-section-title t07-anim" data-anim="t07-anim--slam">待遇・福利厚生</h2>
            <div className="dyn-benefits__list">
              {data.benefits.map((b, i) => (
                <div key={b.title} className={`dyn-benefit ${i % 2 === 0 ? "dyn-benefit--left" : "dyn-benefit--right"} t07-anim t07-anim-delay-${Math.min(i % 3 + 1, 3) as 1 | 2 | 3}`} data-anim={i % 2 === 0 ? "t07-anim--slideLeft" : "t07-anim--slideRight"}>
                  <div className="dyn-benefit__icon">{b.title[0]}</div>
                  <div className="dyn-benefit__body">
                    <h3 className="dyn-benefit__title">{b.title}</h3>
                    <p className="dyn-benefit__text">{b.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="dyn-diagonal-bg dyn-diagonal-bg--bottom" />
      </section>

      {/* ========== Daily (Vertical + Large Times) ========== */}
      <section id="daily" className="dyn-daily">
        <div className="dyn-diagonal-bg dyn-diagonal-bg--top" />
        <div className="dyn-container" ref={rDaily.ref}>
          <div className={rDaily.className}>
            <h2 className="dyn-section-title t07-anim" data-anim="t07-anim--slam">1日の流れ</h2>
            <p className="dyn-section-sub t07-anim t07-anim-delay-1" data-anim="t07-anim--powerUp">{data.daily.intro}</p>
            <div className="dyn-timeline">
              {data.daily.steps.map((step, i) => (
                <div key={step.time} className={`dyn-timeline__item t07-anim t07-anim-delay-${Math.min(i % 3 + 1, 3) as 1 | 2 | 3}`} data-anim={i % 2 === 0 ? "t07-anim--slideLeft" : "t07-anim--slideRight"}>
                  <div className="dyn-timeline__time">{step.time}</div>
                  <div className="dyn-timeline__bar">
                    <div className="dyn-timeline__dot" />
                    {i < data.daily.steps.length - 1 && <div className="dyn-timeline__line" />}
                  </div>
                  <div className="dyn-timeline__content">
                    <h3 className="dyn-timeline__title">{step.title}</h3>
                    <p className="dyn-timeline__desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== Voices (Diagonal Cut Cards) ========== */}
      <section id="voices" className="dyn-voices">
        <div className="dyn-container" ref={rVoices.ref}>
          <div className={rVoices.className}>
            <h2 className="dyn-section-title t07-anim" data-anim="t07-anim--slam">先輩ドライバーの声</h2>
            <div className="dyn-voices__grid">
              {data.voices.map((v, i) => (
                <article key={v.name} className={`dyn-voice-card t07-anim t07-anim-delay-${Math.min(i + 1, 3) as 1 | 2 | 3}`} data-anim="t07-anim--powerUp">
                  <div className="dyn-voice-card__header">
                    <div className="dyn-voice-card__avatar">{v.name[0]}</div>
                    <div>
                      <p className="dyn-voice-card__name">{v.name}<span className="dyn-voice-card__age"> / {v.age}</span></p>
                      <p className="dyn-voice-card__prev">{v.prev}</p>
                    </div>
                  </div>
                  <p className="dyn-voice-card__text">{v.text}</p>
                  <p className="dyn-voice-card__highlight">{v.highlight}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
        <div className="dyn-diagonal-bg dyn-diagonal-bg--bottom" />
      </section>

      {/* ========== Gallery ========== */}
      <section id="gallery" className="dyn-gallery-section">
        <div className="dyn-diagonal-bg dyn-diagonal-bg--top" />
        <div className="dyn-container" ref={rGallery.ref}>
          <div className={rGallery.className}>
            <h2 className="dyn-section-title t07-anim" data-anim="t07-anim--slam">{data.gallery.heading}</h2>
            <p className="dyn-section-sub t07-anim t07-anim-delay-1" data-anim="t07-anim--powerUp">{data.gallery.intro}</p>
            <div
              className="dyn-carousel"
              onTouchStart={(e) => { galleryTouchStart.current = e.touches[0].clientX; }}
              onTouchEnd={(e) => {
                const diff = galleryTouchStart.current - e.changedTouches[0].clientX;
                if (diff > 50) setGalleryIdx((p) => (p + 1) % data.gallery.images.length);
                if (diff < -50) setGalleryIdx((p) => (p - 1 + data.gallery.images.length) % data.gallery.images.length);
              }}
            >
              <div className="dyn-carousel__track" style={{ transform: `translateX(-${galleryIdx * 100}%)` }}>
                {data.gallery.images.map((img, i) => (
                  <figure key={i} className="dyn-carousel__slide">
                    <Image src={`/keikamotsu-templates${img.src}`} alt={img.alt} width={800} height={500} className="dyn-carousel__img" />
                    <figcaption className="dyn-carousel__caption">{img.caption}</figcaption>
                  </figure>
                ))}
              </div>
              <button className="dyn-carousel__btn dyn-carousel__btn--prev" onClick={() => setGalleryIdx((p) => (p - 1 + data.gallery.images.length) % data.gallery.images.length)} aria-label="前へ">&#8249;</button>
              <button className="dyn-carousel__btn dyn-carousel__btn--next" onClick={() => setGalleryIdx((p) => (p + 1) % data.gallery.images.length)} aria-label="次へ">&#8250;</button>
              <div className="dyn-carousel__dots">
                {data.gallery.images.map((_, i) => (
                  <button key={i} className={`dyn-carousel__dot ${i === galleryIdx ? "dyn-carousel__dot--active" : ""}`} onClick={() => setGalleryIdx(i)} aria-label={`スライド${i + 1}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section id="faq" className="dyn-faq-section">
        <div className="dyn-container" ref={rFaq.ref}>
          <div className={rFaq.className}>
            <h2 className="dyn-section-title t07-anim" data-anim="t07-anim--slam">よくある質問</h2>
            <div className="dyn-faq">
              {data.faq.map((item, i) => (
                <details key={i} className={`dyn-faq__item t07-anim t07-anim-delay-${Math.min(i % 3 + 1, 3) as 1 | 2 | 3}`} data-anim="t07-anim--powerUp">
                  <summary className="dyn-faq__q">{item.q}</summary>
                  <p className="dyn-faq__a">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
        <div className="dyn-diagonal-bg dyn-diagonal-bg--bottom" />
      </section>

      {/* ========== News ========== */}
      <section id="news" className="dyn-news">
        <div className="dyn-diagonal-bg dyn-diagonal-bg--top" />
        <div className="dyn-container" ref={rNews.ref}>
          <div className={rNews.className}>
            <h2 className="dyn-section-title t07-anim" data-anim="t07-anim--slam">お知らせ</h2>
            <ul className="dyn-news__list">
              {data.news.map((n, i) => (
                <li key={n.title} className={`dyn-news__item t07-anim t07-anim-delay-${Math.min(i + 1, 3) as 1 | 2 | 3}`} data-anim="t07-anim--powerUp">
                  <time className="dyn-news__date">{n.date}</time>
                  <span className={`dyn-news__tag dyn-news__tag--${n.tagStyle}`}>{n.tag}</span>
                  <span className="dyn-news__title">{n.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ========== Company ========== */}
      <section id="company" className="dyn-company">
        <div className="dyn-container" ref={rCompany.ref}>
          <div className={rCompany.className}>
            <h2 className="dyn-section-title t07-anim" data-anim="t07-anim--slam">会社概要</h2>
            <dl className="dyn-company__dl t07-anim t07-anim-delay-1" data-anim="t07-anim--slideRight">
              {data.companyInfo.map((row) => (
                <div key={row.dt} className="dyn-company__row">
                  <dt className="dyn-company__dt">{row.dt}</dt>
                  <dd className="dyn-company__dd">{row.dd}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ========== Access ========== */}
      <section id="access" className="dyn-access-section">
        <div className="dyn-diagonal-bg dyn-diagonal-bg--top" />
        <div className="dyn-container" ref={rAccess.ref}>
          <div className={rAccess.className}>
            <h2 className="dyn-section-title t07-anim" data-anim="t07-anim--slam">{data.access.heading}</h2>
            <div className="dyn-access">
              <p className="dyn-access__addr">〒{data.company.postalCode} {data.company.address}</p>
              <p className="dyn-access__station">{data.access.nearestStation}</p>
              <p className="dyn-access__note">{data.access.mapNote}</p>
              <div className="dyn-access__map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.1!2d135.505!3d34.685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z5aSn6Ziq5bqc5aSn6Ziq5biC5Lit5aSu5Yy65pys55S6!5e0!3m2!1sja!2sjp!4v1"
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: "4px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="アクセスマップ"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== Application Form ========== */}
      <section id="apply-form" className="dyn-form-section">
        <div className="dyn-container" ref={rForm.ref}>
          <div className={rForm.className}>
            <h2 className="dyn-section-title t07-anim" data-anim="t07-anim--slam">応募フォーム</h2>
            <p className="dyn-section-sub t07-anim t07-anim-delay-1" data-anim="t07-anim--powerUp">まずはお気軽にご応募ください。</p>
            <form className="dyn-form t07-anim t07-anim-delay-2" data-anim="t07-anim--powerUp" onSubmit={(e) => e.preventDefault()}>
              <div className="dyn-form__group">
                <label className="dyn-form__label" htmlFor="dyn-name">お名前 <span style={{ color: "#dc2626" }}>*</span></label>
                <input id="dyn-name" type="text" className="dyn-form__input" required placeholder="山田 太郎" />
              </div>
              <div className="dyn-form__group">
                <label className="dyn-form__label" htmlFor="dyn-phone">電話番号 <span style={{ color: "#dc2626" }}>*</span></label>
                <input id="dyn-phone" type="tel" className="dyn-form__input" required placeholder="090-1234-5678" />
              </div>
              <div className="dyn-form__group">
                <label className="dyn-form__label" htmlFor="dyn-email">メールアドレス</label>
                <input id="dyn-email" type="email" className="dyn-form__input" placeholder="example@email.com" />
              </div>
              <div className="dyn-form__group">
                <label className="dyn-form__label" htmlFor="dyn-message">メッセージ</label>
                <textarea id="dyn-message" className="dyn-form__textarea" rows={5} placeholder="ご質問やご要望があればご記入ください" />
              </div>
              <button type="submit" className="dyn-form__submit">送信する</button>
            </form>
          </div>
        </div>
        <div className="dyn-diagonal-bg dyn-diagonal-bg--bottom" />
      </section>

      {/* ========== CTA ========== */}
      <section id="apply" className="dyn-cta">
        <div className="dyn-cta__diagonal-top" />
        <div className="dyn-container" ref={rCta.ref}>
          <div className={`dyn-cta__inner ${rCta.className}`}>
            <h2 className="dyn-cta__heading t07-anim" data-anim="t07-anim--slam">{data.cta.heading}</h2>
            <p className="dyn-cta__sub t07-anim t07-anim-delay-1" data-anim="t07-anim--powerUp">{data.cta.subtext}</p>
            <div className="dyn-cta__actions">
              <a href={`tel:${data.cta.phone}`} className="dyn-cta__phone">
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                </svg>
                <span className="dyn-cta__phone-num">{data.cta.phone}</span>
              </a>
              <a href="/apply" className="dyn-cta__web">{data.cta.webLabel}</a>
            </div>
            <p className="dyn-cta__hours">受付時間: {data.company.hours}</p>
          </div>
        </div>
      </section>

      {/* ========== Footer ========== */}
      <footer className="dyn-footer">
        <div className="dyn-footer__inner">
          <div className="dyn-footer__brand">
            <span className="dyn-footer__logo-bar" />
            <span className="dyn-footer__company">{data.company.name}</span>
          </div>
          <p className="dyn-footer__catch">{data.footer.catchphrase}</p>
          <div className="dyn-footer__meta">
            <p>〒{data.company.postalCode} {data.company.address}</p>
            <a href={`tel:${data.company.phone}`} className="dyn-footer__phone">{data.company.phone}</a>
            <p>{data.company.hours}</p>
          </div>
          <p className="dyn-footer__copy">&copy; {new Date().getFullYear()} {data.company.nameEn}</p>
        </div>
      </footer>
    </div>
  );
}
