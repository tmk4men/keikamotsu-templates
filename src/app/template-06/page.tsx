"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as data from "@/data/siteData";
import "./styles.css";

/* ===================================================
   Template 06: 温かみ (Warm Handcraft)
   Handwritten / postcard style with stamp effects
   =================================================== */

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
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
    const targets = el.querySelectorAll<HTMLElement>(".t06-anim");
    if (targets.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const anim = target.dataset.anim || "t06-anim--softFloat";
            target.classList.add(anim);
            obs.unobserve(target);
          }
        });
      },
      { threshold: 0.15 }
    );
    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Section({ id, className, children }: { id?: string; className?: string; children: React.ReactNode }) {
  const { ref, visible } = useScrollReveal();
  return (
    <section id={id} ref={ref} className={`warm-section ${className ?? ""} ${visible ? "is-visible" : ""}`}>
      {children}
    </section>
  );
}

export default function Template06Page() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const galleryTouchStart = useRef(0);
  const animRef = useScrollAnim();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
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
    <div className="theme-06" ref={animRef}>
      {/* ========== Header ========== */}
      <header className={`warm-header ${scrolled ? "warm-header--scrolled" : ""}`}>
        <div className="warm-header__inner">
          <a href="#" className="warm-logo">
            <span className="warm-logo__stamp">GL</span>
            <span className="warm-logo__name">{data.company.name.replace("株式会社", "")}</span>
          </a>

          <button className="warm-hamburger" onClick={() => setMobileNav(!mobileNav)} aria-label="メニュー">
            <span /><span /><span />
          </button>

          <nav className={`warm-nav ${mobileNav ? "warm-nav--open" : ""}`}>
            {data.navLinks.map((link) => (
              <a key={link.href} href={link.href} className="warm-nav__link" onClick={() => setMobileNav(false)}>
                {link.label}
              </a>
            ))}
            <a href="#apply" className="warm-nav__cta" onClick={() => setMobileNav(false)}>応募する</a>
          </nav>
        </div>
      </header>

      {/* ========== Hero ========== */}
      <section className="warm-hero">
        <div className="warm-hero__grain" />
        <div className="warm-hero__content">
          <h1 className="warm-hero__heading">
            <span className="warm-hero__line warm-hero__line--1">{data.hero.headlineParts[0]}</span>
            <span className="warm-hero__line warm-hero__line--2">{data.hero.headlineParts[1]}</span>
          </h1>
          <div className="warm-hero__subtext">
            {data.hero.subtext.map((line, i) => (
              <p key={i} className="warm-hero__sub-line">{line}</p>
            ))}
          </div>
          <div className="warm-hero__salary-stamp">
            <span className="warm-hero__salary-label">月収</span>
            <span className="warm-hero__salary-num">{data.hero.salaryMin}〜{data.hero.salaryMax}</span>
            <span className="warm-hero__salary-unit">万円</span>
          </div>
          <div className="warm-hero__badges">
            {data.hero.badges.map((b) => (
              <span key={b} className="warm-hero__badge">{b}</span>
            ))}
          </div>
          <a href="#apply" className="warm-hero__cta">{data.hero.cta}</a>
        </div>
      </section>

      {/* ========== Marquee (Ribbon Banner) ========== */}
      <div className="warm-ribbon">
        <div className="warm-ribbon__track">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="warm-ribbon__items">
              {data.marquee.top.map((item) => (
                <span key={item} className="warm-ribbon__item">
                  {item}<span className="warm-ribbon__dot">●</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ========== Reasons (Postcards) ========== */}
      <Section id="reasons" className="warm-reasons">
        <div className="warm-container">
          <h2 className="warm-heading t06-anim" data-anim="t06-anim--softFloat">選ばれる3つの理由</h2>
          <p className="warm-subheading t06-anim t06-anim-delay-1" data-anim="t06-anim--softFloat">「ここで始めてよかった」——そう思える理由があります。</p>
          <div className="warm-postcards">
            {data.reasons.map((r, i) => (
              <article key={r.num} className={`warm-postcard warm-postcard--${i % 2 === 0 ? "left" : "right"} t06-anim t06-anim-delay-${(i + 1) as 1 | 2 | 3} t06-sway`} data-anim="t06-anim--softFloat">
                <div className="warm-postcard__stamp">{r.num}</div>
                <h3 className="warm-postcard__title">{r.title}</h3>
                <p className="warm-postcard__text">{r.text}</p>
                <div className="warm-postcard__postmark">APPROVED</div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* ========== Job Info (Handwritten Letter) ========== */}
      <Section id="jobs" className="warm-jobs">
        <div className="warm-container">
          <h2 className="warm-heading t06-anim" data-anim="t06-anim--softFloat">求人情報</h2>
          <p className="warm-subheading t06-anim t06-anim-delay-1" data-anim="t06-anim--softFloat">{data.jobs.intro}</p>
          <div className="warm-letter t06-anim t06-anim-delay-2" data-anim="t06-anim--softFloat">
            <div className="warm-letter__lines">
              <dl className="warm-letter__dl">
                {data.jobs.rows.map((row) => (
                  <div key={row.dt} className="warm-letter__row">
                    <dt className="warm-letter__dt">{row.dt}</dt>
                    <dd className={`warm-letter__dd ${row.accent ? "warm-letter__dd--accent" : ""}`}>{row.dd}</dd>
                  </div>
                ))}
              </dl>
              <div className="warm-letter__req">
                <h4 className="warm-letter__req-title">応募条件</h4>
                <ul className="warm-letter__req-list">
                  {data.jobs.requirements.map((r) => (
                    <li key={r} className="warm-letter__req-item">{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ========== Benefits (Sticky Notes) ========== */}
      <Section id="benefits" className="warm-benefits">
        <div className="warm-container">
          <h2 className="warm-heading t06-anim" data-anim="t06-anim--softFloat">待遇・福利厚生</h2>
          <p className="warm-subheading t06-anim t06-anim-delay-1" data-anim="t06-anim--softFloat">「長く続けられるかな」——その不安に、制度で応えます。</p>
          <div className="warm-sticky-board">
            {data.benefits.map((b, i) => (
              <div key={b.title} className={`warm-sticky warm-sticky--${i} t06-anim t06-anim-delay-${Math.min(i % 3 + 1, 3) as 1 | 2 | 3} t06-sway`} data-anim="t06-anim--softFloat">
                <div className="warm-sticky__pin" />
                <h3 className="warm-sticky__title">{b.title}</h3>
                <p className="warm-sticky__text">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ========== Daily Schedule (Scrapbook) ========== */}
      <Section id="daily" className="warm-daily">
        <div className="warm-container">
          <h2 className="warm-heading t06-anim" data-anim="t06-anim--softFloat">1日の流れ</h2>
          <p className="warm-subheading t06-anim t06-anim-delay-1" data-anim="t06-anim--softFloat">{data.daily.intro}</p>
          <div className="warm-scrapbook">
            {data.daily.steps.map((step, i) => (
              <div key={step.time} className={`warm-scrap-card warm-scrap-card--${i} t06-anim t06-anim-delay-${Math.min(i % 3 + 1, 3) as 1 | 2 | 3} t06-sway`} data-anim="t06-anim--softFloat">
                <div className="warm-scrap-card__pin" />
                <div className="warm-scrap-card__time">{step.time}</div>
                <h3 className="warm-scrap-card__title">{step.title}</h3>
                <p className="warm-scrap-card__desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ========== Voices (Handwritten Letters) ========== */}
      <Section id="voices" className="warm-voices">
        <div className="warm-container">
          <h2 className="warm-heading t06-anim" data-anim="t06-anim--softFloat">先輩ドライバーの声</h2>
          <p className="warm-subheading t06-anim t06-anim-delay-1" data-anim="t06-anim--softFloat">実際に働いている仲間のリアルな声をご紹介します。</p>
          <div className="warm-voices__grid">
            {data.voices.map((v, i) => (
              <article key={v.name} className={`warm-voice-letter t06-anim t06-anim-delay-${Math.min(i + 1, 3) as 1 | 2 | 3}`} data-anim="t06-anim--softFloat">
                <div className="warm-voice-letter__avatar">
                  <span className="warm-voice-letter__avatar-text">{v.name[0]}</span>
                </div>
                <div className="warm-voice-letter__profile">
                  <span className="warm-voice-letter__name">{v.name}</span>
                  <span className="warm-voice-letter__age">{v.age}</span>
                  <span className="warm-voice-letter__prev">{v.prev}</span>
                </div>
                <blockquote className="warm-voice-letter__quote">{v.text}</blockquote>
                <p className="warm-voice-letter__highlight">{v.highlight}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* ========== Gallery ========== */}
      <Section id="gallery" className="warm-gallery-section">
        <div className="warm-container">
          <h2 className="warm-heading t06-anim" data-anim="t06-anim--softFloat">{data.gallery.heading}</h2>
          <p className="warm-subheading t06-anim t06-anim-delay-1" data-anim="t06-anim--softFloat">{data.gallery.intro}</p>
          <div
            className="warm-carousel"
            onTouchStart={(e) => { galleryTouchStart.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              const diff = galleryTouchStart.current - e.changedTouches[0].clientX;
              if (diff > 50) setGalleryIdx((p) => (p + 1) % data.gallery.images.length);
              if (diff < -50) setGalleryIdx((p) => (p - 1 + data.gallery.images.length) % data.gallery.images.length);
            }}
          >
            <div className="warm-carousel__track" style={{ transform: `translateX(-${galleryIdx * 100}%)` }}>
              {data.gallery.images.map((img, i) => (
                <figure key={i} className="warm-carousel__slide">
                  <Image src={`/keikamotsu-hp${img.src}`} alt={img.alt} width={800} height={500} className="warm-carousel__img" />
                  <figcaption className="warm-carousel__caption">{img.caption}</figcaption>
                </figure>
              ))}
            </div>
            <button className="warm-carousel__btn warm-carousel__btn--prev" onClick={() => setGalleryIdx((p) => (p - 1 + data.gallery.images.length) % data.gallery.images.length)} aria-label="前へ">&#8249;</button>
            <button className="warm-carousel__btn warm-carousel__btn--next" onClick={() => setGalleryIdx((p) => (p + 1) % data.gallery.images.length)} aria-label="次へ">&#8250;</button>
            <div className="warm-carousel__dots">
              {data.gallery.images.map((_, i) => (
                <button key={i} className={`warm-carousel__dot ${i === galleryIdx ? "warm-carousel__dot--active" : ""}`} onClick={() => setGalleryIdx(i)} aria-label={`スライド${i + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ========== FAQ ========== */}
      <Section id="faq" className="warm-faq-section">
        <div className="warm-container">
          <h2 className="warm-heading t06-anim" data-anim="t06-anim--softFloat">よくある質問</h2>
          <div className="warm-faq">
            {data.faq.map((item, i) => (
              <details key={i} className={`warm-faq__item t06-anim t06-anim-delay-${Math.min(i % 3 + 1, 3) as 1 | 2 | 3}`} data-anim="t06-anim--softFloat">
                <summary className="warm-faq__q">{item.q}</summary>
                <p className="warm-faq__a">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* ========== News ========== */}
      <Section id="news" className="warm-news">
        <div className="warm-container">
          <h2 className="warm-heading t06-anim" data-anim="t06-anim--softFloat">お知らせ</h2>
          <ul className="warm-news__list">
            {data.news.map((n, i) => (
              <li key={n.title} className={`warm-news__item t06-anim t06-anim-delay-${Math.min(i + 1, 3) as 1 | 2 | 3}`} data-anim="t06-anim--softFloat">
                <time className="warm-news__date">{n.date}</time>
                <span className={`warm-news__tag warm-news__tag--${n.tagStyle}`}>{n.tag}</span>
                <span className="warm-news__title">{n.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ========== Company Info ========== */}
      <Section id="company" className="warm-company">
        <div className="warm-container">
          <h2 className="warm-heading t06-anim" data-anim="t06-anim--softFloat">会社概要</h2>
          <dl className="warm-company__dl t06-anim t06-anim-delay-1" data-anim="t06-anim--softFloat">
            {data.companyInfo.map((row) => (
              <div key={row.dt} className="warm-company__row">
                <dt className="warm-company__dt">{row.dt}</dt>
                <dd className="warm-company__dd">{row.dd}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* ========== Access ========== */}
      <Section id="access" className="warm-access-section">
        <div className="warm-container">
          <h2 className="warm-heading t06-anim" data-anim="t06-anim--softFloat">{data.access.heading}</h2>
          <div className="warm-access">
            <p className="warm-access__addr">〒{data.company.postalCode} {data.company.address}</p>
            <p className="warm-access__station">{data.access.nearestStation}</p>
            <p className="warm-access__note">{data.access.mapNote}</p>
            <div className="warm-access__map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.1!2d135.505!3d34.685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z5aSn6Ziq5bqc5aSn6Ziq5biC5Lit5aSu5Yy65pys55S6!5e0!3m2!1sja!2sjp!4v1"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: "8px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="アクセスマップ"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ========== Application Form ========== */}
      <Section id="apply-form" className="warm-form-section">
        <div className="warm-container">
          <h2 className="warm-heading t06-anim" data-anim="t06-anim--softFloat">応募フォーム</h2>
          <p className="warm-subheading t06-anim t06-anim-delay-1" data-anim="t06-anim--softFloat">まずはお気軽にご応募ください。</p>
          <form className="warm-form t06-anim t06-anim-delay-2" data-anim="t06-anim--softFloat" onSubmit={(e) => e.preventDefault()}>
            <div className="warm-form__group">
              <label className="warm-form__label" htmlFor="warm-name">お名前 <span style={{ color: "var(--warm-red)" }}>*</span></label>
              <input id="warm-name" type="text" className="warm-form__input" required placeholder="山田 太郎" />
            </div>
            <div className="warm-form__group">
              <label className="warm-form__label" htmlFor="warm-phone">電話番号 <span style={{ color: "var(--warm-red)" }}>*</span></label>
              <input id="warm-phone" type="tel" className="warm-form__input" required placeholder="090-1234-5678" />
            </div>
            <div className="warm-form__group">
              <label className="warm-form__label" htmlFor="warm-email">メールアドレス</label>
              <input id="warm-email" type="email" className="warm-form__input" placeholder="example@email.com" />
            </div>
            <div className="warm-form__group">
              <label className="warm-form__label" htmlFor="warm-message">メッセージ</label>
              <textarea id="warm-message" className="warm-form__textarea" rows={5} placeholder="ご質問やご要望があればご記入ください" />
            </div>
            <button type="submit" className="warm-form__submit">送信する</button>
          </form>
        </div>
      </Section>

      {/* ========== CTA (Envelope) ========== */}
      <Section id="apply" className="warm-cta">
        <div className="warm-container">
          <div className="warm-envelope t06-anim t06-warm-glow" data-anim="t06-anim--softFloat">
            <div className="warm-envelope__flap" />
            <div className="warm-envelope__body">
              <h2 className="warm-envelope__heading">{data.cta.heading}</h2>
              <p className="warm-envelope__text">{data.cta.subtext}</p>
              <div className="warm-envelope__actions">
                <a href={`tel:${data.cta.phone}`} className="warm-envelope__phone">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                  </svg>
                  {data.cta.phone}
                </a>
                <a href="/apply" className="warm-envelope__web">{data.cta.webLabel}</a>
              </div>
              <p className="warm-envelope__hours">受付時間: {data.company.hours}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ========== Footer ========== */}
      <footer className="warm-footer">
        <div className="warm-footer__inner">
          <p className="warm-footer__catch">{data.footer.catchphrase}</p>
          <div className="warm-footer__info">
            <p className="warm-footer__company-name">{data.company.name}</p>
            <p className="warm-footer__address">〒{data.company.postalCode} {data.company.address}</p>
            <a href={`tel:${data.company.phone}`} className="warm-footer__phone">{data.company.phone}</a>
            <p className="warm-footer__hours">{data.company.hours}</p>
          </div>
          <p className="warm-footer__copy">&copy; {new Date().getFullYear()} {data.company.nameEn}</p>
        </div>
      </footer>
    </div>
  );
}
