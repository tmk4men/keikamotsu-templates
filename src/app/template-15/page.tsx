"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import * as data from "@/data/siteData";
import "./styles.css";

/* ── scroll-reveal with different animations ── */
function useReveal(animation = "fadeUp", delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => {
            el.classList.add("t15-revealed");
            el.classList.add(`t15-anim--${animation}`);
          }, delay);
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [animation, delay]);
  return ref;
}

/* ── scroll-triggered animation hook ── */
function useScrollAnim() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".t15-anim");
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

export default function Template15() {
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

  const r1 = useReveal("fadeUp", 0);
  const r2 = useReveal("slideRight", 100);
  const r3 = useReveal("scaleIn", 0);
  const r4 = useReveal("fadeUp", 100);
  const r5 = useReveal("rotateIn", 0);
  const rGallery = useReveal("scaleIn", 0);
  const rFaq = useReveal("fadeUp", 100);
  const r6 = useReveal("fadeUp", 100);
  const rAccess = useReveal("slideRight", 0);
  const r7 = useReveal("slideRight", 0);
  const rApply = useReveal("rotateIn", 100);
  const r8 = useReveal("scaleIn", 0);

  return (
    <div className="theme-15">
      {/* ─── STICKY HEADER ─── */}
      <header className={`t15-header ${scrolled ? "t15-header--scrolled" : ""}`}>
        <div className="t15-header__inner">
          <a href="#" className="t15-logo">
            <span className="t15-logo__mark">GL</span>
            <span className="t15-logo__text">{data.company.nameEn}</span>
          </a>
          <button
            className={`t15-hamburger ${menuOpen ? "t15-hamburger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニュー"
          >
            <span /><span /><span />
          </button>
          <nav className={`t15-nav ${menuOpen ? "t15-nav--open" : ""}`}>
            {data.navLinks.map((l) => (
              <a key={l.href} href={l.href} className="t15-nav__link" onClick={closeMenu}>
                {l.label}
              </a>
            ))}
            <a href={`tel:${data.company.phone}`} className="t15-nav__cta">
              {data.hero.cta}
            </a>
          </nav>
        </div>
      </header>

      {/* ─── HERO (collage style) ─── */}
      <section className="t15-hero">
        <div className="t15-hero__bg" />
        <div className="t15-hero__collage-circle" aria-hidden="true" />
        <div className="t15-hero__content">
          <div className="t15-hero__text-block">
            <h1 className="t15-hero__heading">
              {data.hero.headlineParts.map((part, i) => (
                <span key={i} className="t15-hero__heading-line">{part}</span>
              ))}
            </h1>
            <div className="t15-hero__sub">
              {data.hero.subtext.map((t, i) => (
                <p key={i}>{t}</p>
              ))}
            </div>
          </div>
          <div className="t15-hero__side">
            <div className="t15-hero__salary-block">
              <span className="t15-hero__salary-label">月収</span>
              <strong>{data.hero.salaryMin}万〜{data.hero.salaryMax}万円</strong>
            </div>
            <div className="t15-hero__badges">
              {data.hero.badges.map((b) => (
                <span key={b} className="t15-badge">{b}</span>
              ))}
            </div>
            <a href={`tel:${data.company.phone}`} className="t15-btn-creative">
              {data.hero.cta}
            </a>
          </div>
        </div>
        <div className="t15-hero__overlap-text" aria-hidden="true">RECRUIT</div>
      </section>

      {/* ─── MARQUEE (artistic) ─── */}
      <div className="t15-marquee">
        <div className="t15-marquee__track">
          {[...data.marquee.top, ...data.marquee.top, ...data.marquee.top].map((t, i) => (
            <span
              key={i}
              className={`t15-marquee__item ${i % 3 === 0 ? "t15-marquee__item--bold" : ""} ${i % 3 === 1 ? "t15-marquee__item--light" : ""}`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ─── REASONS (magazine spread) ─── */}
      <section id="reasons" className="t15-section">
        <div ref={r1} className="t15-reveal t15-container">
          <h2 className="t15-section-title t15-section-title--creative t15-anim" data-anim="t15-anim--skew">
            選ばれる<span className="t15-orange">3</span>つの理由
          </h2>

          {/* Full-width first reason */}
          <div className="t15-reason-featured t15-anim t15-anim-delay-1" data-anim="t15-anim--clipDown">
            <span className="t15-reason-featured__num">{data.reasons[0].num}</span>
            <h3 className="t15-reason-featured__title">{data.reasons[0].title}</h3>
            <p className="t15-reason-featured__text">{data.reasons[0].text}</p>
          </div>

          {/* Pull quote between sections */}
          <div className="t15-pull-quote t15-anim t15-anim-delay-2" data-anim="t15-anim--tilt">
            <p>&ldquo;普通免許ひとつで、新しいキャリアが始まる&rdquo;</p>
          </div>

          {/* Side-by-side second and third */}
          <div className="t15-reasons-pair">
            <article className="t15-reason-card t15-reason-card--tall t15-anim t15-anim-delay-1" data-anim="t15-anim--tilt">
              <span className="t15-reason-card__num">{data.reasons[1].num}</span>
              <h3 className="t15-reason-card__title">{data.reasons[1].title}</h3>
              <p className="t15-reason-card__text">{data.reasons[1].text}</p>
            </article>
            <article className="t15-reason-card t15-reason-card--short t15-anim t15-anim-delay-2" data-anim="t15-anim--zoomRotate">
              <span className="t15-reason-card__num">{data.reasons[2].num}</span>
              <h3 className="t15-reason-card__title">{data.reasons[2].title}</h3>
              <p className="t15-reason-card__text">{data.reasons[2].text}</p>
            </article>
          </div>
        </div>
      </section>

      {/* ─── JOB INFO (split layout) ─── */}
      <section id="jobs" className="t15-section t15-section--flush">
        <div ref={r2} className="t15-reveal">
          <div className="t15-jobs-split">
            <div className="t15-jobs-split__left">
              <h2 className="t15-jobs-split__heading t15-anim" data-anim="t15-anim--tilt">求人情報</h2>
              <p className="t15-jobs-split__sub">{data.jobs.intro}</p>
            </div>
            <div className="t15-jobs-split__right">
              <dl className="t15-dl">
                {data.jobs.rows.map((row, i) => (
                  <div key={i} className={`t15-dl__row ${row.accent ? "t15-dl__row--accent" : ""}`}>
                    <dt className="t15-dl__dt">{row.dt}</dt>
                    <dd className="t15-dl__dd">{row.dd}</dd>
                  </div>
                ))}
              </dl>
              <div className="t15-jobs-req">
                <h4>応募資格</h4>
                <ul>
                  {data.jobs.requirements.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BENEFITS (collage grid) ─── */}
      <section id="benefits" className="t15-section">
        <div ref={r3} className="t15-reveal t15-container">
          <h2 className="t15-section-title t15-section-title--creative t15-anim" data-anim="t15-anim--zoomRotate">待遇・福利厚生</h2>
          <div className="t15-benefits-collage">
            {data.benefits.map((b, i) => {
              const variants = [
                "t15-benefit--orange-bg",
                "t15-benefit--white",
                "t15-benefit--purple-bg",
                "t15-benefit--white",
                "t15-benefit--outlined",
                "t15-benefit--orange-bg",
              ];
              const sizes = [
                "t15-benefit--wide",
                "t15-benefit--normal",
                "t15-benefit--normal",
                "t15-benefit--wide",
                "t15-benefit--normal",
                "t15-benefit--normal",
              ];
              const animTypes = ["t15-anim--tilt", "t15-anim--clipDown", "t15-anim--skew", "t15-anim--zoomRotate", "t15-anim--tilt", "t15-anim--clipDown"];
              return (
                <div key={i} className={`t15-benefit-card ${variants[i]} ${sizes[i]} t15-anim t15-anim-delay-${(i % 4) + 1}`} data-anim={animTypes[i]}>
                  <h4 className="t15-benefit-card__title">{b.title}</h4>
                  <p className="t15-benefit-card__text">{b.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── DAILY (zigzag) ─── */}
      <section id="daily" className="t15-section t15-section--cream">
        <div ref={r4} className="t15-reveal t15-container">
          <h2 className="t15-section-title t15-section-title--creative t15-anim" data-anim="t15-anim--clipDown">1日の流れ</h2>
          <p className="t15-section-intro">{data.daily.intro}</p>
          <div className="t15-zigzag">
            {data.daily.steps.map((s, i) => (
              <div key={i} className={`t15-zigzag__step ${i % 2 === 1 ? "t15-zigzag__step--reverse" : ""} t15-anim t15-anim-delay-${(i % 4) + 1}`} data-anim={i % 2 === 0 ? "t15-anim--skew" : "t15-anim--tilt"}>
                <div className="t15-zigzag__time">
                  <span>{s.time}</span>
                </div>
                <div className="t15-zigzag__line" />
                <div className="t15-zigzag__content">
                  <h4 className="t15-zigzag__title">{s.title}</h4>
                  <p className="t15-zigzag__desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VOICES (each card different style) ─── */}
      <section id="voices" className="t15-section">
        <div ref={r5} className="t15-reveal t15-container">
          <h2 className="t15-section-title t15-section-title--creative t15-anim" data-anim="t15-anim--tilt">先輩ドライバーの声</h2>
          <div className="t15-voices-grid">
            {/* Card 1: white with orange accent */}
            <article className="t15-voice-card t15-voice-card--style-a t15-anim t15-anim-delay-1" data-anim="t15-anim--skew">
              <p className="t15-voice-card__body">{data.voices[0].text}</p>
              <p className="t15-voice-card__highlight">{data.voices[0].highlight}</p>
              <footer className="t15-voice-card__footer">
                <strong>{data.voices[0].name}</strong>（{data.voices[0].age}・{data.voices[0].prev}）
              </footer>
            </article>

            {/* Card 2: purple bg, white text */}
            <article className="t15-voice-card t15-voice-card--style-b t15-anim t15-anim-delay-2" data-anim="t15-anim--zoomRotate">
              <p className="t15-voice-card__body">{data.voices[1].text}</p>
              <p className="t15-voice-card__highlight">{data.voices[1].highlight}</p>
              <footer className="t15-voice-card__footer">
                <strong>{data.voices[1].name}</strong>（{data.voices[1].age}・{data.voices[1].prev}）
              </footer>
            </article>

            {/* Card 3: outlined only */}
            <article className="t15-voice-card t15-voice-card--style-c t15-anim t15-anim-delay-3" data-anim="t15-anim--clipDown">
              <p className="t15-voice-card__body">{data.voices[2].text}</p>
              <p className="t15-voice-card__highlight">{data.voices[2].highlight}</p>
              <footer className="t15-voice-card__footer">
                <strong>{data.voices[2].name}</strong>（{data.voices[2].age}・{data.voices[2].prev}）
              </footer>
            </article>
          </div>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section id="gallery" className="t15-section t15-section--cream">
        <div ref={rGallery} className="t15-reveal t15-container">
          <h2 className="t15-section-title t15-section-title--creative t15-anim" data-anim="t15-anim--zoomRotate">{data.gallery.heading}</h2>
          <p className="t15-section-intro">{data.gallery.intro}</p>
          <div
            className="t15-carousel"
            onTouchStart={(e) => { galleryTouchStart.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              const diff = galleryTouchStart.current - e.changedTouches[0].clientX;
              if (diff > 50) setGalleryIdx((prev) => (prev + 1) % data.gallery.images.length);
              if (diff < -50) setGalleryIdx((prev) => (prev - 1 + data.gallery.images.length) % data.gallery.images.length);
            }}
          >
            <div className="t15-carousel__track" style={{ transform: `translateX(-${galleryIdx * 100}%)` }}>
              {data.gallery.images.map((img, i) => (
                <div key={i} className="t15-carousel__slide">
                  <Image src={`/keikamotsu-hp${img.src}`} alt={img.alt} width={600} height={400} className="t15-carousel__img" />
                  <p className="t15-carousel__caption">{img.caption}</p>
                </div>
              ))}
            </div>
            <button className="t15-carousel__btn t15-carousel__btn--prev" onClick={() => setGalleryIdx((prev) => (prev - 1 + data.gallery.images.length) % data.gallery.images.length)} aria-label="前へ">{"\u2039"}</button>
            <button className="t15-carousel__btn t15-carousel__btn--next" onClick={() => setGalleryIdx((prev) => (prev + 1) % data.gallery.images.length)} aria-label="次へ">{"\u203A"}</button>
            <div className="t15-carousel__dots">
              {data.gallery.images.map((_, i) => (
                <button key={i} className={`t15-carousel__dot ${i === galleryIdx ? "t15-carousel__dot--active" : ""}`} onClick={() => setGalleryIdx(i)} aria-label={`スライド${i + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="t15-section">
        <div ref={rFaq} className="t15-reveal t15-container">
          <h2 className="t15-section-title t15-section-title--creative t15-anim" data-anim="t15-anim--tilt">よくある質問</h2>
          <div className="t15-faq">
            {data.faq.map((item, i) => (
              <details key={i} className="t15-faq__item">
                <summary className="t15-faq__q">{item.q}</summary>
                <p className="t15-faq__a">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWS ─── */}
      <section id="news" className="t15-section t15-section--cream">
        <div ref={r6} className="t15-reveal t15-container">
          <h2 className="t15-section-title t15-section-title--creative t15-anim" data-anim="t15-anim--skew">お知らせ</h2>
          <div className="t15-news-list">
            {data.news.map((n, i) => (
              <div key={i} className={`t15-news-item t15-anim t15-anim-delay-${(i % 4) + 1}`} data-anim="t15-anim--clipDown">
                <span className="t15-news-date">{n.date}</span>
                <span className={`t15-news-tag t15-news-tag--${n.tagStyle}`}>{n.tag}</span>
                <span className="t15-news-title">{n.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ACCESS ─── */}
      <section id="access" className="t15-section t15-section--cream">
        <div ref={rAccess} className="t15-reveal t15-container">
          <h2 className="t15-section-title t15-anim" data-anim="t15-anim--skew">{data.access.heading}</h2>
          <div className="t15-access">
            <p className="t15-access__addr">{data.company.address}</p>
            <p className="t15-access__station">{data.access.nearestStation}</p>
            <p className="t15-access__note">{data.access.mapNote}</p>
            <div className="t15-access__map">
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
      <section id="company" className="t15-section">
        <div ref={r7} className="t15-reveal t15-container">
          <h2 className="t15-section-title t15-anim" data-anim="t15-anim--tilt">会社概要</h2>
          <dl className="t15-dl t15-dl--company">
            {data.companyInfo.map((c, i) => (
              <div key={i} className="t15-dl__row">
                <dt className="t15-dl__dt">{c.dt}</dt>
                <dd className="t15-dl__dd">{c.dd}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ─── APPLICATION FORM ─── */}
      <section id="apply" className="t15-section">
        <div ref={rApply} className="t15-reveal t15-container">
          <h2 className="t15-section-title t15-section-title--creative t15-anim" data-anim="t15-anim--clipDown">応募フォーム</h2>
          <form className="t15-form" onSubmit={(e) => e.preventDefault()}>
            <div className="t15-form__group">
              <label className="t15-form__label" htmlFor="t15-name">お名前 <span className="t15-orange">*</span></label>
              <input id="t15-name" type="text" className="t15-form__input" required placeholder="山田 太郎" />
            </div>
            <div className="t15-form__group">
              <label className="t15-form__label" htmlFor="t15-phone">電話番号 <span className="t15-orange">*</span></label>
              <input id="t15-phone" type="tel" className="t15-form__input" required placeholder="090-1234-5678" />
            </div>
            <div className="t15-form__group">
              <label className="t15-form__label" htmlFor="t15-email">メールアドレス</label>
              <input id="t15-email" type="email" className="t15-form__input" placeholder="example@email.com" />
            </div>
            <div className="t15-form__group">
              <label className="t15-form__label" htmlFor="t15-message">メッセージ</label>
              <textarea id="t15-message" className="t15-form__textarea" rows={5} placeholder="ご質問やご希望があればご記入ください" />
            </div>
            <button type="submit" className="t15-form__submit">送信する</button>
          </form>
        </div>
      </section>

      {/* ─── CTA (split) ─── */}
      <section className="t15-cta-section">
        <div ref={r8} className="t15-reveal">
          <div className="t15-cta-split">
            <div className="t15-cta-split__left">
              <div className="t15-cta-split__graphic" aria-hidden="true">
                <span>APPLY</span>
                <span>NOW</span>
              </div>
            </div>
            <div className="t15-cta-split__right">
              <h2 className="t15-cta-heading t15-anim" data-anim="t15-anim--zoomRotate">{data.cta.heading}</h2>
              <p className="t15-cta-sub t15-anim t15-anim-delay-1" data-anim="t15-anim--clipDown">{data.cta.subtext}</p>
              <div className="t15-cta-phone-wrap">
                <a href={`tel:${data.company.phone}`} className="t15-cta-phone">
                  {data.cta.phone}
                </a>
              </div>
              <p className="t15-cta-hours">{data.company.hours}</p>
              <a href="#" className="t15-btn-creative t15-btn-creative--lg t15-anim t15-anim-delay-2" data-anim="t15-anim--skew">
                {data.cta.webLabel}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="t15-footer">
        <div className="t15-footer__overlap" aria-hidden="true">GREEN LOGISTICS</div>
        <div className="t15-footer__inner">
          <p className="t15-footer__catch">{data.footer.catchphrase}</p>
          <p className="t15-footer__company">{data.company.name}</p>
          <p className="t15-footer__addr">{data.company.address}</p>
          <nav className="t15-footer__nav">
            {data.navLinks.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </nav>
          <p className="t15-footer__copy">&copy; {data.company.name}</p>
        </div>
      </footer>
    </div>
  );
}
