"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import * as data from "@/data/corporateSiteData";
import "./styles.css";

/* ── prefix for images ── */
const IMG = "/keikamotsu-templates/images";
const VID = "/keikamotsu-templates/videos";

/* ── typing animation hook ── */
function useTyping(text: string, speed = 110, startDelay = 600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);
  return { displayed, done };
}

/* ── Typing Headline component ── */
function TypingHeadline() {
  const line1 = "物流で、";
  const line2 = "未来を変えていく。";
  const { displayed: d1, done: done1 } = useTyping(line1, 120, 800);
  const { displayed: d2, done: done2 } = useTyping(line2, 120, 800 + line1.length * 120 + 300);
  return (
    <h1 className="l05-hero__headline">
      {d1}
      {done1 && <br />}
      {done1 && d2}
      {!done2 && <span className="l05-typing-cursor">|</span>}
      {done2 && (
        <span className="l05-hero__headline-accent l05-fade-in">
          Transforming the Future through Logistics
        </span>
      )}
    </h1>
  );
}

/* ── section metadata ── */
const SECTIONS = [
  { id: "hero", label: "トップ", icon: "◇" },
  { id: "services", label: "事業内容", icon: "■" },
  { id: "strengths", label: "強み", icon: "▲" },
  { id: "numbers-ceo", label: "実績・代表", icon: "●" },
  { id: "history", label: "沿革", icon: "―" },
  { id: "company", label: "会社概要", icon: "□" },
  { id: "news", label: "お知らせ", icon: "◆" },
  { id: "contact", label: "お問い合わせ", icon: "○" },
  { id: "access", label: "アクセス", icon: "▽" },
] as const;

/* ── scroll-reveal hook ── */
function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add("l05-revealed"), delay + 80);
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    const t = setTimeout(() => obs.observe(el), 60);
    return () => { clearTimeout(t); obs.disconnect(); };
  }, [delay]);
  return ref;
}

/* ── animated counter ── */
function AnimCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          let s = 0;
          const step = () => {
            s += Math.ceil(end / 36);
            if (s >= end) { setVal(end); return; }
            setVal(s);
            requestAnimationFrame(step);
          };
          step();
          obs.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [end]);
  return (
    <span ref={ref} className="l05-numbers__value">
      {val.toLocaleString()}
      <span className="l05-numbers__suffix">{suffix}</span>
    </span>
  );
}

/* ══════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════ */
export default function Layout05Page() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hintVisible, setHintVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  /* ── detect mobile ── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── html/body overflow制御 ── */
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (!isMobile) {
      html.style.overflowX = "visible";
      html.style.overflowY = "hidden";
      body.style.overflowX = "visible";
      body.style.overflowY = "hidden";
      body.style.maxWidth = "none";
    }
    return () => {
      html.style.overflowX = "";
      html.style.overflowY = "";
      body.style.overflowX = "";
      body.style.overflowY = "";
      body.style.maxWidth = "";
    };
  }, [isMobile]);

  /* ── wheel → horizontal scroll (PC only) ── */
  const scrollingRef = useRef(false);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || isMobile) return;

    let accumulated = 0;
    let scrollTimer: ReturnType<typeof setTimeout> | null = null;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (scrollingRef.current) return;

      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      accumulated += delta;

      // 閾値を超えたらパネル単位で移動
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => { accumulated = 0; }, 200);

      const threshold = 50;
      if (Math.abs(accumulated) >= threshold) {
        scrollingRef.current = true;
        const panels = el.querySelectorAll(".l05-panel");
        const panelPositions = Array.from(panels).map(p => (p as HTMLElement).offsetLeft);
        const currentScroll = el.scrollLeft;
        const direction = accumulated > 0 ? 1 : -1;

        let targetIdx = 0;
        if (direction > 0) {
          // 次のパネルへ
          targetIdx = panelPositions.findIndex(pos => pos > currentScroll + 10);
          if (targetIdx === -1) targetIdx = panelPositions.length - 1;
        } else {
          // 前のパネルへ
          for (let i = panelPositions.length - 1; i >= 0; i--) {
            if (panelPositions[i] < currentScroll - 10) { targetIdx = i; break; }
          }
        }

        el.scrollTo({ left: panelPositions[targetIdx], behavior: "smooth" });
        accumulated = 0;
        setTimeout(() => { scrollingRef.current = false; }, 600);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [isMobile]);

  /* ── track scroll position ── */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      if (isMobile) {
        const scrollY = window.scrollY;
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(docH > 0 ? (scrollY / docH) * 100 : 0);

        // Find active section by checking panel positions
        const panels = el.querySelectorAll(".l05-panel");
        let idx = 0;
        panels.forEach((p, i) => {
          const rect = p.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) idx = i;
        });
        setActiveIdx(idx);
      } else {
        const maxScroll = el.scrollWidth - el.clientWidth;
        const pct = maxScroll > 0 ? (el.scrollLeft / maxScroll) * 100 : 0;
        setProgress(pct);

        const panelW = el.clientWidth;
        const idx = Math.round(el.scrollLeft / panelW);
        setActiveIdx(idx);
      }

      if (hintVisible) setHintVisible(false);
    };

    if (isMobile) {
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    } else {
      el.addEventListener("scroll", onScroll, { passive: true });
      return () => el.removeEventListener("scroll", onScroll);
    }
  }, [isMobile, hintVisible]);

  /* ── keyboard navigation (PC) ── */
  useEffect(() => {
    if (isMobile) return;
    const el = scrollRef.current;
    if (!el) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        el.scrollBy({ left: el.clientWidth, behavior: "smooth" });
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        el.scrollBy({ left: -el.clientWidth, behavior: "smooth" });
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobile]);

  /* ── navigate to panel ── */
  const goTo = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    if (isMobile) {
      const panels = el.querySelectorAll(".l05-panel");
      if (panels[idx]) {
        panels[idx].scrollIntoView({ behavior: "smooth" });
      }
    } else {
      el.scrollTo({ left: idx * el.clientWidth, behavior: "smooth" });
    }
  }, [isMobile]);

  /* ── reveal refs ── */
  const r1 = useReveal(0);
  const r2 = useReveal(100);
  const r3 = useReveal(0);
  const r4 = useReveal(50);
  const r5 = useReveal(100);
  const r6 = useReveal(0);
  const r7 = useReveal(50);
  const r8 = useReveal(0);
  const r9 = useReveal(50);
  const r10 = useReveal(100);
  const r11 = useReveal(0);
  const r12 = useReveal(50);
  const r13 = useReveal(0);
  const r14 = useReveal(100);

  return (
    <div className="l05-wrapper">
      {/* ── Progress Bar ── */}
      <div className="l05-progress" style={{ width: `${progress}%` }} />

      {/* ── Navigation Dots (PC only) ── */}
      <nav className="l05-nav" aria-label="セクションナビゲーション">
        {SECTIONS.map((s, i) => (
          <button
            key={s.id}
            className={`l05-nav__dot${activeIdx === i ? " l05-nav__dot--active" : ""}`}
            onClick={() => goTo(i)}
            data-label={s.label}
            aria-label={s.label}
          />
        ))}
      </nav>

      {/* ── Keyboard Hint (PC only) ── */}
      <div className={`l05-key-hint${!hintVisible ? " l05-key-hint--hidden" : ""}`}>
        <span className="l05-key-hint__arrow">←</span>
        <span className="l05-key-hint__arrow">→</span>
        <span>スクロールまたは矢印キーで移動</span>
      </div>

      {/* ── Mobile Bottom Nav ── */}
      <nav className="l05-mobile-nav">
        <div className="l05-mobile-nav__list">
          {[
            { idx: 0, icon: "◇", label: "TOP" },
            { idx: 1, icon: "■", label: "事業" },
            { idx: 3, icon: "●", label: "実績" },
            { idx: 7, icon: "○", label: "問合せ" },
            { idx: 8, icon: "▽", label: "MAP" },
          ].map((item) => (
            <button
              key={item.idx}
              className={`l05-mobile-nav__item${activeIdx === item.idx ? " l05-mobile-nav__item--active" : ""}`}
              onClick={() => goTo(item.idx)}
              aria-label={item.label}
            >
              <span className="l05-mobile-nav__icon">{item.icon}</span>
              <span className="l05-mobile-nav__label">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* ══════════════════════════════════════
          SCROLL CONTAINER
          ══════════════════════════════════════ */}
      <div className="l05-scroll-container" ref={scrollRef}>

        {/* ──────── PANEL 01: HERO ──────── */}
        <section className="l05-panel l05-hero" id="hero">
          <div className="l05-hero__bg">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={`${IMG}/hero-bg.webp`}
            >
              <source src={`${VID}/hero-nightcity.mp4`} type="video/mp4" />
            </video>
          </div>
          <div className="l05-hero__overlay" />

          <div className="l05-hero__content" ref={r1}>
            <div className="l05-reveal l05-revealed">
              <p className="l05-hero__tagline">Green Logistics Co., Ltd.</p>
              <TypingHeadline />
              <p className="l05-hero__sub">
                大手運輸会社の委託配送と
                <br className="br-desktop" />
                通販サイト荷物配送を軽自動車でメイン展開。
                <br />
                高い技術力と経験で、安全かつ迅速な配送を実現します。
              </p>
              <a href="#contact" className="l05-hero__cta" onClick={(e) => { e.preventDefault(); goTo(7); }}>
                お問い合わせ
                <span className="l05-hero__cta-arrow">→</span>
              </a>
            </div>
          </div>

          <div className="l05-hero__scroll-hint">
            <span>Scroll</span>
            <span className="l05-hero__scroll-line" />
          </div>
        </section>

        {/* ──────── PANEL 02: SERVICES ──────── */}
        <section className="l05-panel l05-services" id="services">
          <div className="l05-panel__inner l05-panel__inner--start">
            <div className="l05-services__inner">
              <div className="l05-services__header" ref={r2}>
                <div className="l05-reveal l05-reveal--up">
                  <span className="l05-section-num" style={{ top: -10, left: 0 }}>02</span>
                  <p className="l05-section-label">Services</p>
                  <h2 className="l05-heading-ja l05-services__title">事業内容</h2>
                  <p className="l05-services__intro">
                    軽貨物運送を軸に、
                    <br />
                    車両リース・レンタカー・
                    <br />
                    ロードサービスまで。
                    <br />
                    配送業の「始める」から
                    <br />
                    「続ける」までを支えます。
                  </p>
                </div>
              </div>

              <div className="l05-services__list">
                {data.services.map((s, i) => (
                  <div
                    key={s.num}
                    className="l05-services__item l05-reveal l05-reveal--up"
                    ref={i === 0 ? r3 : undefined}
                    style={{ transitionDelay: `${i * 0.08}s` }}
                  >
                    <span className="l05-services__item-num">{s.num}</span>
                    <div>
                      <h3 className="l05-services__item-title">{s.title}</h3>
                      <p className="l05-services__item-text">
                        {s.text.split("\n").map((line, li) => (
                          <span key={li}>
                            {line}
                            {li < s.text.split("\n").length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ──────── PANEL 03: STRENGTHS ──────── */}
        <section className="l05-panel l05-strengths" id="strengths">
          <div className="l05-strengths__inner">
            <div className="l05-strengths__image-col" ref={r4}>
              <div className="l05-reveal l05-reveal--left l05-revealed" style={{ height: "100%" }}>
                <Image
                  src={`${IMG}/team.webp`}
                  alt="チームの活躍"
                  width={800}
                  height={1000}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  priority={false}
                />
              </div>
            </div>
            <div className="l05-strengths__content" ref={r5}>
              <div className="l05-reveal">
                <span className="l05-section-num" style={{ top: 20, right: 20 }}>03</span>
                <p className="l05-section-label" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Our Strengths
                </p>
                <h2 className="l05-heading-ja l05-strengths__title">私たちの強み</h2>

                {data.strengths.map((s, i) => (
                  <div
                    key={s.num}
                    className="l05-strengths__card l05-reveal l05-reveal--up"
                    style={{ transitionDelay: `${0.15 + i * 0.1}s` }}
                  >
                    <div className="l05-strengths__card-header">
                      <span className="l05-strengths__card-num">{s.num}</span>
                      <h3 className="l05-strengths__card-title">{s.title}</h3>
                    </div>
                    <p className="l05-strengths__card-text">
                      {s.text.split("\n").map((line, li) => (
                        <span key={li}>
                          {line}
                          {li < s.text.split("\n").length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ──────── PANEL 04: NUMBERS & CEO ──────── */}
        <section className="l05-panel l05-numbers-ceo" id="numbers-ceo">
          <div className="l05-numbers-ceo__inner">
            {/* Numbers */}
            <div className="l05-numbers" ref={r6}>
              <div className="l05-reveal l05-reveal--up">
                <span className="l05-section-num" style={{ top: 20, left: 20 }}>04</span>
                <p className="l05-section-label">Performance</p>
                <h2 className="l05-heading-ja l05-numbers__title">実績で語る信頼</h2>
                <div className="l05-numbers__grid">
                  {data.numbers.map((n) => {
                    const numVal = parseFloat(n.value.replace(/,/g, ""));
                    return (
                      <div key={n.label} className="l05-numbers__item">
                        <AnimCounter end={numVal} suffix={n.suffix} />
                        <p className="l05-numbers__label">{n.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* CEO */}
            <div className="l05-ceo" ref={r7}>
              <div className="l05-reveal l05-reveal--up">
                <p className="l05-section-label">Message</p>
                <h2 className="l05-heading-ja l05-ceo__title">代表メッセージ</h2>
                <div className="l05-ceo__body">
                  <div className="l05-ceo__portrait">
                    <Image
                      src={`${IMG}/ceo-portrait.webp`}
                      alt={`${data.ceoMessage.title} ${data.ceoMessage.name}`}
                      width={240}
                      height={320}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div className="l05-ceo__text-area">
                    {data.ceoMessage.message.map((p, i) => (
                      <p key={i} className="l05-ceo__message">{p}</p>
                    ))}
                    <div className="l05-ceo__signature">
                      <span className="l05-ceo__signature-title">{data.ceoMessage.title}</span>
                      {data.ceoMessage.name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ──────── PANEL 05: HISTORY (1年ごとにパネル) ──────── */}
        {data.history.map((h, i) => (
          <section
            key={h.year}
            className={`l05-panel l05-history${i === 0 ? "" : " l05-history--continued"}`}
            id={i === 0 ? "history" : undefined}
          >
            <div className="l05-history__single">
              {i === 0 && (
                <div className="l05-history__header l05-reveal l05-reveal--up" ref={r8}>
                  <p className="l05-section-label">History</p>
                  <h2 className="l05-heading-ja l05-history__title">沿革</h2>
                </div>
              )}
              <div className="l05-history__card l05-reveal l05-reveal--up">
                <p className="l05-history__year">{h.year}</p>
                <div className="l05-history__image">
                  <Image
                    src={`${IMG}/history-${h.year}.webp`}
                    alt={`${h.year}年の出来事`}
                    width={400}
                    height={300}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <p className="l05-history__event">{h.event}</p>
              </div>
              <div className="l05-history__progress">
                <span className="l05-history__progress-text">{i + 1} / {data.history.length}</span>
              </div>
            </div>
          </section>
        ))}

        {/* ──────── PANEL 06: COMPANY & PARTNERS ──────── */}
        <section className="l05-panel l05-company-partners" id="company">
          <div className="l05-panel__inner">
            <div className="l05-company-partners__inner">
              {/* Company */}
              <div className="l05-company" ref={r9}>
                <div className="l05-reveal l05-reveal--up">
                  <span className="l05-section-num" style={{ top: -10, left: 0 }}>06</span>
                  <p className="l05-section-label">Company</p>
                  <h2 className="l05-heading-ja l05-company__title">会社概要</h2>
                  <table className="l05-company__table">
                    <tbody>
                      {data.companyOverview.map((row) => (
                        <tr key={row.dt}>
                          <th>{row.dt}</th>
                          <td>{row.dd}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Partners */}
              <div className="l05-partners" ref={r10}>
                <div className="l05-reveal l05-reveal--up">
                  <p className="l05-section-label">Partners</p>
                  <h2 className="l05-heading-ja l05-partners__title">主要取引先</h2>
                  <div className="l05-partners__grid">
                    {data.partners.map((p, i) => (
                      <div
                        key={p.name}
                        className="l05-partners__card"
                        style={{ transitionDelay: `${i * 0.05}s` }}
                      >
                        <div className="l05-partners__logo">
                          <Image
                            src={p.logo}
                            alt={p.name}
                            width={96}
                            height={96}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </div>
                        <div>
                          <p className="l05-partners__name">{p.name}</p>
                          <p className="l05-partners__industry">{p.industry}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ──────── PANEL 07: NEWS & RECRUIT ──────── */}
        <section className="l05-panel l05-news-recruit" id="news">
          <div className="l05-panel__inner">
            <div className="l05-news-recruit__inner">
              {/* News */}
              <div ref={r11}>
                <div className="l05-reveal l05-reveal--up">
                  <span className="l05-section-num" style={{ top: -10, left: 0 }}>07</span>
                  <p className="l05-section-label">News</p>
                  <h2 className="l05-heading-ja l05-news__title">お知らせ</h2>
                  <ul className="l05-news__list">
                    {data.news.map((n, i) => (
                      <li key={i} className="l05-news__item">
                        <span className="l05-news__date">{n.date}</span>
                        <span className={`l05-news__tag${
                          n.tagStyle === "press" ? " l05-news__tag--press" :
                          n.tagStyle === "new" ? " l05-news__tag--new" : ""
                        }`}>{n.tag}</span>
                        <span className="l05-news__title-text">{n.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recruit */}
              <div ref={r12}>
                <div className="l05-reveal l05-reveal--up" style={{ transitionDelay: "0.15s" }}>
                  <div className="l05-recruit">
                    <p className="l05-section-label l05-recruit__label">Recruit</p>
                    <h3 className="l05-recruit__title">
                      一緒に物流の未来を
                      <br />
                      変えていく仲間を募集
                    </h3>
                    <p className="l05-recruit__text">
                      学歴・経験不問。配達車無料貸出、
                      <br />
                      リース料・加盟料ゼロ。
                      <br />
                      月収40万〜100万円が目指せます。
                    </p>
                    <Link href="/" className="l05-recruit__cta">
                      {data.recruit.cta}
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ──────── PANEL 08: CONTACT ──────── */}
        <section className="l05-panel l05-contact" id="contact">
          <div className="l05-panel__inner">
            <div className="l05-contact__inner">
              <div className="l05-contact__header" ref={r13}>
                <div className="l05-reveal l05-reveal--up">
                  <span className="l05-section-num" style={{ top: -10, left: 0 }}>08</span>
                  <p className="l05-section-label">Contact</p>
                  <h2 className="l05-heading-ja l05-contact__title">お問い合わせ</h2>
                  <p className="l05-contact__intro">
                    配送サービス・車両リース・
                    <br />
                    レンタカー・ロードサービスに関する
                    <br />
                    ご相談・お見積もりなど、
                    <br />
                    お気軽にお問い合わせください。
                  </p>
                  <div className="l05-contact__info">
                    <div className="l05-contact__info-item">
                      <span className="l05-contact__info-icon">☎</span>
                      <span>{data.company.phone}</span>
                    </div>
                    <div className="l05-contact__info-item">
                      <span className="l05-contact__info-icon">✉</span>
                      <span>{data.company.email}</span>
                    </div>
                    <div className="l05-contact__info-item">
                      <span className="l05-contact__info-icon">◷</span>
                      <span>{data.company.hours}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div ref={r14}>
              <form
                className="l05-contact__form"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="l05-reveal l05-reveal--up">
                  {data.contact.fields.map((f) => (
                    <div key={f.name} className="l05-contact__field">
                      <label className="l05-contact__label" htmlFor={`l05-${f.name}`}>
                        {f.label}
                        {f.required && <span className="l05-contact__label-required">必須</span>}
                      </label>
                      {f.type === "textarea" ? (
                        <textarea
                          id={`l05-${f.name}`}
                          name={f.name}
                          className="l05-contact__textarea"
                          required={f.required}
                        />
                      ) : (
                        <input
                          id={`l05-${f.name}`}
                          type={f.type}
                          name={f.name}
                          className="l05-contact__input"
                          required={f.required}
                        />
                      )}
                    </div>
                  ))}
                  <button type="submit" className="l05-contact__submit">
                    送信する
                  </button>
                </div>
              </form>
              </div>
            </div>
          </div>
        </section>

        {/* ──────── PANEL 09: ACCESS & FOOTER ──────── */}
        <section className="l05-panel l05-access-footer" id="access">
          <div className="l05-access-footer__inner">
            <div className="l05-access__content">
              <div>
                <span className="l05-section-num" style={{ top: -10, left: 0, color: "rgba(196,154,108,0.2)" }}>09</span>
                <p className="l05-section-label" style={{ color: "rgba(255,255,255,0.35)" }}>Access</p>
                <h2 className="l05-heading-ja l05-access__title">アクセス</h2>
                <p className="l05-access__detail">
                  〒{data.company.postalCode}
                  <br />
                  {data.access.address}
                </p>
                <p className="l05-access__detail">{data.access.nearestStation}</p>
                <p className="l05-access__detail" style={{ fontSize: "clamp(11px, 0.85vw, 12px)" }}>
                  {data.access.mapNote}
                </p>
              </div>
              <div className="l05-access__map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3278.5!2d135.63!3d34.76!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDQ1JzM2LjAiTiAxMzXCsDM3JzQ4LjAiRQ!5e0!3m2!1sja!2sjp!4v1"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="グリーンロジスティクス所在地"
                />
              </div>
            </div>

            <footer className="l05-footer">
              <div className="l05-footer__skyline">
                <svg viewBox="0 0 1200 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="l05-footer__skyline-svg" preserveAspectRatio="none">
                  <path
                    d="M0,80 L0,60 L30,60 L30,40 L40,40 L40,30 L50,30 L50,40 L60,40 L60,60
                    L80,60 L80,50 L90,50 L90,35 L95,30 L100,35 L100,50 L110,50 L110,60
                    L140,60 L140,20 L150,20 L150,15 L155,10 L160,15 L160,20 L170,20 L170,45 L180,45 L180,60
                    L200,60 L200,55 L210,55 L210,25 L220,25 L220,55 L230,55 L230,60
                    L250,60 L260,60 L260,45 L265,40 L270,45 L270,60
                    L300,60 L300,35 L310,35 L310,18 L315,12 L320,18 L320,35 L330,35 L330,60
                    L360,60 L360,50 L370,50 L370,55 L380,55 L380,60
                    L400,60 L400,42 L410,42 L410,28 L420,28 L420,42 L430,42 L430,60
                    L460,60 L465,55 L470,50 L475,55 L480,60
                    L510,60 L510,30 L520,30 L520,22 L525,16 L530,22 L530,30 L540,30 L540,50 L550,50 L550,60
                    L580,60 L580,48 L590,48 L590,60
                    L610,60 L610,55 L615,50 L620,45 L625,50 L630,55 L630,60
                    L660,60 L660,38 L670,38 L670,20 L680,20 L680,38 L690,38 L690,60
                    L720,60 L720,52 L730,52 L730,45 L740,45 L740,52 L750,52 L750,60
                    L780,60 L785,55 L790,48 L795,52 L800,60
                    L830,60 L830,25 L840,25 L840,15 L845,8 L850,15 L850,25 L860,25 L860,45 L870,45 L870,60
                    L900,60 L900,50 L910,50 L910,40 L920,40 L920,50 L930,50 L930,60
                    L950,60 L955,55 L960,52 L965,55 L970,60
                    L1000,60 L1000,35 L1010,35 L1010,22 L1015,16 L1020,22 L1020,35 L1030,35 L1030,60
                    L1060,60 L1060,48 L1070,48 L1070,55 L1080,55 L1080,60
                    L1100,60 L1100,42 L1110,42 L1110,30 L1120,30 L1120,42 L1130,42 L1130,60
                    L1160,60 L1165,55 L1170,50 L1175,55 L1180,60
                    L1200,60 L1200,80 Z"
                    className="l05-footer__skyline-path"
                  />
                </svg>
              </div>
              <div className="l05-footer__inner">
                <p className="l05-footer__catchphrase">{data.footer.catchphrase}</p>
                <p className="l05-footer__copyright">
                  © {new Date().getFullYear()} {data.company.name} All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </section>
      </div>
    </div>
  );
}
