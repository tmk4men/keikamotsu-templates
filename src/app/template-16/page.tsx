/* ===================================================
   Template 16 — 配送クエスト RPG横スクロールテンプレート
   =================================================== */
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import * as data from "@/data/siteData";
import "./styles.css";

/* ── 定数 ── */
const STAGES = [
  { label: "城門",   section: "Hero" },
  { label: "草原",   section: "選ばれる理由" },
  { label: "街",     section: "求人情報" },
  { label: "峠",     section: "待遇・福利" },
  { label: "港町",   section: "1日の流れ" },
  { label: "酒場",   section: "先輩の声" },
  { label: "王城",   section: "ギルド情報" },
  { label: "記録",   section: "ギャラリー" },
  { label: "地図",   section: "アクセス" },
  { label: "出発！", section: "応募" },
] as const;

const SKILL_ICONS = ["🚗", "⛽", "🛡️", "👔", "📚", "💰"];

/* ── カスタムフック ── */
function useHorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollRatio, setScrollRatio] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const stageRef = useRef(0);          // wheel用の即時参照
  const scrollingRef = useRef(false);   // 連続wheel抑制

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  /* body縦スクロール無効化（デスクトップ時） */
  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [isMobile]);

  const goToStage = useCallback((idx: number) => {
    const el = containerRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(STAGES.length - 1, idx));
    stageRef.current = clamped;
    if (isMobile) {
      const stageEls = el.querySelectorAll<HTMLElement>(".t16-stage");
      stageEls[clamped]?.scrollIntoView({ behavior: "smooth" });
    } else {
      el.scrollTo({ left: clamped * window.innerWidth, behavior: "smooth" });
    }
  }, [isMobile]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    /* wheelでステージ単位移動（scroll-snapと競合しない） */
    const handleWheel = (e: WheelEvent) => {
      if (isMobile) return;
      e.preventDefault();
      if (scrollingRef.current) return;
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 10) return;
      scrollingRef.current = true;
      const dir = delta > 0 ? 1 : -1;
      goToStage(stageRef.current + dir);
      setTimeout(() => { scrollingRef.current = false; }, 700);
    };

    const handleScroll = () => {
      if (isMobile) {
        const ratio = el.scrollTop / (el.scrollHeight - el.clientHeight || 1);
        setScrollRatio(Math.min(1, Math.max(0, ratio)));
        const stage = Math.round(ratio * (STAGES.length - 1));
        setCurrentStage(Math.min(STAGES.length - 1, Math.max(0, stage)));
        stageRef.current = Math.min(STAGES.length - 1, Math.max(0, stage));
      } else {
        const ratio = el.scrollLeft / (el.scrollWidth - el.clientWidth || 1);
        setScrollRatio(Math.min(1, Math.max(0, ratio)));
        const stage = Math.round(ratio * (STAGES.length - 1));
        setCurrentStage(Math.min(STAGES.length - 1, Math.max(0, stage)));
        stageRef.current = Math.min(STAGES.length - 1, Math.max(0, stage));
      }
    };

    document.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("wheel", handleWheel);
      el.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile, goToStage]);

  return { containerRef, scrollRatio, currentStage, isMobile, scrollToStage: goToStage };
}

function useStageReveal(container: React.RefObject<HTMLDivElement | null>) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { root: container.current, threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [container]);
  return { ref, revealed };
}

/* ── サブコンポーネント ── */
function ProgressBar({ scrollRatio, currentStage }: { scrollRatio: number; currentStage: number }) {
  return (
    <div className="t16-progress">
      <span className="t16-progress-label">HP</span>
      <div className="t16-progress-track">
        <div className="t16-progress-fill" style={{ width: `${scrollRatio * 100}%` }} />
        <div className="t16-progress-dots">
          {STAGES.map((_, i) => (
            <span key={i} className={`t16-progress-dot${i <= currentStage ? " active" : ""}`} />
          ))}
        </div>
      </div>
      <span className="t16-progress-label">{currentStage + 1}/{STAGES.length}</span>
    </div>
  );
}

function CommandMenu({ currentStage, onSelect }: { currentStage: number; onSelect: (i: number) => void }) {
  return (
    <nav className="t16-command-menu" aria-label="ステージナビ">
      {STAGES.map((s, i) => (
        <button
          key={i}
          className={`t16-command-item${i === currentStage ? " active" : ""}`}
          onClick={() => onSelect(i)}
        >
          <span className="t16-command-cursor" aria-hidden="true">▶</span>
          {s.label}
        </button>
      ))}
    </nav>
  );
}

function RpgDialogBox({ speaker, children }: { speaker?: string; children: React.ReactNode }) {
  return (
    <div className="t16-dialog">
      {speaker && <div className="t16-dialog-speaker">{speaker}</div>}
      <div className="t16-dialog-text">
        {children}
        <span className="t16-dialog-cursor" aria-hidden="true" />
      </div>
    </div>
  );
}

function StatusWindow({ title, rows, requirements }: {
  title: string;
  rows: typeof data.jobs.rows;
  requirements: string[];
}) {
  return (
    <div className="t16-status-window">
      <div className="t16-status-title">{title}</div>
      {rows.map((r, i) => (
        <div key={i} className="t16-status-row">
          <span className="t16-status-label">{r.dt}</span>
          <span className={`t16-status-value${r.accent ? " accent" : ""}`}>{r.dd}</span>
        </div>
      ))}
      <ul className="t16-req-list">
        {requirements.map((req, i) => (
          <li key={i}>{req}</li>
        ))}
      </ul>
    </div>
  );
}

function TreasureChest({ reason }: { reason: typeof data.reasons[number] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="t16-chest-item">
      <div className={`t16-chest-wrapper${open ? " open" : ""}`} onClick={() => setOpen(!open)}>
        <div className="t16-chest">
          <div className="t16-chest-lid" />
          <div className="t16-chest-body">
            <div className="t16-chest-lock" />
          </div>
          <div className="t16-chest-glow" />
          <div className="t16-chest-content">
            <div className="t16-chest-card">
              <div className="t16-chest-card-title">{reason.num}. {reason.title}</div>
              <div className="t16-chest-card-text">{reason.text}</div>
            </div>
          </div>
        </div>
      </div>
      {!open && (
        <span style={{ fontFamily: "var(--font-dot)", fontSize: "0.7rem", color: "var(--t16-parchment-dim)" }}>
          タップして開く
        </span>
      )}
    </div>
  );
}

function GalleryCarousel() {
  const [idx, setIdx] = useState(0);
  const imgs = data.gallery.images;
  const touchX = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    timerRef.current = setInterval(() => setIdx((p) => (p + 1) % imgs.length), 4000);
    return () => clearInterval(timerRef.current);
  }, [imgs.length]);

  const go = (dir: number) => {
    setIdx((p) => (p + dir + imgs.length) % imgs.length);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setIdx((p) => (p + 1) % imgs.length), 4000);
  };

  return (
    <div className="t16-gallery-wrap">
      <div
        className="t16-gallery-viewport"
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          const diff = touchX.current - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 50) go(diff > 0 ? 1 : -1);
        }}
      >
        <div className="t16-gallery-track" style={{ transform: `translateX(-${idx * 100}%)` }}>
          {imgs.map((img, i) => (
            <div key={i} className="t16-gallery-slide">
              <Image src={`/keikamotsu-templates${img.src}`} alt={img.alt} fill style={{ objectFit: "cover" }} sizes="600px" />
              <div className="t16-gallery-caption">{img.caption}</div>
            </div>
          ))}
        </div>
      </div>
      <button className="t16-gallery-btn prev" onClick={() => go(-1)} aria-label="前へ">◀</button>
      <button className="t16-gallery-btn next" onClick={() => go(1)} aria-label="次へ">▶</button>
      <div className="t16-gallery-dots">
        {imgs.map((_, i) => (
          <button key={i} className={`t16-gallery-dot${i === idx ? " active" : ""}`} onClick={() => { setIdx(i); clearInterval(timerRef.current); }} aria-label={`スライド${i + 1}`} />
        ))}
      </div>
    </div>
  );
}

/* ── メインコンポーネント ── */
export default function Template16() {
  const { containerRef, scrollRatio, currentStage, isMobile, scrollToStage } = useHorizontalScroll();
  const [mapLocked, setMapLocked] = useState(true);

  /* ステージリビール（IntersectionObserver） */
  const s0 = useStageReveal(containerRef);
  const s1 = useStageReveal(containerRef);
  const s2 = useStageReveal(containerRef);
  const s3 = useStageReveal(containerRef);
  const s4 = useStageReveal(containerRef);
  const s5 = useStageReveal(containerRef);
  const s6 = useStageReveal(containerRef);
  const s7 = useStageReveal(containerRef);
  const s8 = useStageReveal(containerRef);
  const s9 = useStageReveal(containerRef);
  const stages = [s0, s1, s2, s3, s4, s5, s6, s7, s8, s9];

  return (
    <>
      <ProgressBar scrollRatio={scrollRatio} currentStage={currentStage} />
      {!isMobile && <CommandMenu currentStage={currentStage} onSelect={scrollToStage} />}
      {!isMobile && (
        <div className="t16-scroll-hint" aria-hidden="true">
          Scroll →
        </div>
      )}

      <div ref={containerRef} className="t16-scroll-container">
        {/* ── Stage 0: 城門 (Hero) ── */}
        <section className="t16-stage t16-stage--castle-gate">
          <video className="t16-hero-video" autoPlay muted loop playsInline poster="/keikamotsu-templates/images/hero-bg.webp">
            <source src="/keikamotsu-templates/videos/hero-nightcity.mp4" type="video/mp4" />
          </video>
          <div ref={stages[0].ref} className={`t16-stage-inner${stages[0].revealed ? " revealed" : ""}`}>
            <div className="t16-stage-title">STAGE 0 — 城門</div>
            <div className="t16-hero-content">
              <div className="t16-hero-guild">⚔ {data.company.name} ギルド ⚔</div>
              <h1 className="t16-hero-title">
                {data.hero.headlineParts.map((p, i) => (
                  <span key={i}>{p}<br /></span>
                ))}
              </h1>
              <div className="t16-hero-salary">
                <span>報酬:</span>
                <span className="t16-hero-salary-num">{data.hero.salaryMin}万</span>
                <span>〜</span>
                <span className="t16-hero-salary-num">{data.hero.salaryMax}万</span>
                <span>ゴールド/月</span>
              </div>
              <div className="t16-hero-badges">
                {data.hero.badges.map((b, i) => (
                  <span key={i} className="t16-hero-badge">{b}</span>
                ))}
              </div>
              <a href="#apply" onClick={(e) => { e.preventDefault(); scrollToStage(9); }} className="t16-hero-cta">
                ▶ クエストを受ける
              </a>
            </div>
          </div>
        </section>

        {/* ── Stage 1: 草原 (選ばれる理由) ── */}
        <section className="t16-stage t16-stage--grassland">
          <div ref={stages[1].ref} className={`t16-stage-inner${stages[1].revealed ? " revealed" : ""}`}>
            <div className="t16-stage-title">STAGE 1 — 草原</div>
            <div className="t16-stage-subtitle">3つの宝箱を開けて、冒険の理由を見つけよう</div>
            <div className="t16-chest-grid">
              {data.reasons.map((r, i) => (
                <TreasureChest key={i} reason={r} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Stage 2: 街 (求人情報) ── */}
        <section className="t16-stage t16-stage--town">
          <div ref={stages[2].ref} className={`t16-stage-inner${stages[2].revealed ? " revealed" : ""}`}>
            <div className="t16-stage-title" style={{ color: "var(--t16-dark)" }}>STAGE 2 — 街</div>
            <div className="t16-stage-subtitle" style={{ color: "var(--t16-border)" }}>装備を確認しよう</div>
            <RpgDialogBox speaker="ギルド受付嬢">
              {data.jobs.intro}
            </RpgDialogBox>
            <div style={{ height: 20 }} />
            <StatusWindow title="≪ 装備情報 ≫" rows={data.jobs.rows} requirements={data.jobs.requirements} />
          </div>
        </section>

        {/* ── Stage 3: 峠 (待遇・福利厚生) ── */}
        <section className="t16-stage t16-stage--mountain">
          <div ref={stages[3].ref} className={`t16-stage-inner${stages[3].revealed ? " revealed" : ""}`}>
            <div className="t16-stage-title">STAGE 3 — 峠</div>
            <div className="t16-stage-subtitle">習得スキル一覧</div>
            <div className="t16-skill-grid">
              {data.benefits.map((b, i) => (
                <div key={i} className="t16-skill-card">
                  <span className="t16-skill-icon">{SKILL_ICONS[i] || "✨"}</span>
                  <div className="t16-skill-name">{b.title}</div>
                  <div className="t16-skill-desc">{b.text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stage 4: 港町 (1日の流れ) ── */}
        <section className="t16-stage t16-stage--port">
          <div ref={stages[4].ref} className={`t16-stage-inner${stages[4].revealed ? " revealed" : ""}`}>
            <div className="t16-stage-title">STAGE 4 — 港町</div>
            <div className="t16-stage-subtitle">クエスト行程表</div>
            <div className="t16-quest-log">
              {data.daily.steps.map((s, i) => (
                <div key={i} className="t16-quest-step">
                  <div className="t16-quest-marker">{i + 1}</div>
                  <div className="t16-quest-info">
                    <div className="t16-quest-time">{s.time}</div>
                    <div className="t16-quest-title">{s.title}</div>
                    <div className="t16-quest-desc">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stage 5: 酒場 (先輩の声) ── */}
        <section className="t16-stage t16-stage--tavern">
          <div ref={stages[5].ref} className={`t16-stage-inner${stages[5].revealed ? " revealed" : ""}`}>
            <div className="t16-stage-title">STAGE 5 — 酒場</div>
            <div className="t16-stage-subtitle">先輩冒険者の話を聞こう</div>
            <div className="t16-npc-cards">
              {data.voices.map((v, i) => (
                <div key={i} className="t16-npc-card">
                  <div className="t16-npc-name">{v.name}</div>
                  <div className="t16-npc-meta">{v.age}・{v.prev}</div>
                  <div className="t16-npc-text">{v.text}</div>
                  <span className="t16-npc-highlight">「{v.highlight}」</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stage 6: 王城 (会社概要+FAQ+News) ── */}
        <section className="t16-stage t16-stage--royal">
          <div ref={stages[6].ref} className={`t16-stage-inner${stages[6].revealed ? " revealed" : ""}`}>
            <div className="t16-stage-title">STAGE 6 — 王城</div>
            <div className="t16-stage-subtitle">ギルド情報・掲示板</div>
            <div className="t16-guild-panels">
              {/* 会社概要 */}
              <div className="t16-guild-panel">
                <div className="t16-guild-panel-title">≪ ギルド情報 ≫</div>
                {data.companyInfo.map((r, i) => (
                  <div key={i} className="t16-info-row">
                    <span className="t16-info-label">{r.dt}</span>
                    <span className="t16-info-value">{r.dd}</span>
                  </div>
                ))}
                <div style={{ marginTop: 12 }}>
                  <div className="t16-info-row">
                    <span className="t16-info-label">営業時間</span>
                    <span className="t16-info-value">{data.company.hours}</span>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="t16-guild-panel">
                <div className="t16-guild-panel-title">≪ よくある質問 ≫</div>
                {data.faq.map((f, i) => (
                  <details key={i} className="t16-faq-item">
                    <summary>{f.q}</summary>
                    <div className="t16-faq-answer">{f.a}</div>
                  </details>
                ))}
              </div>

              {/* News */}
              <div className="t16-guild-panel" style={{ gridColumn: "1 / -1" }}>
                <div className="t16-guild-panel-title">≪ 掲示板 ≫</div>
                {data.news.map((n, i) => (
                  <div key={i} className="t16-news-item">
                    <span className="t16-news-date">{n.date}</span>
                    <span className={`t16-news-tag ${n.tagStyle}`}>{n.tag}</span>
                    <span className="t16-news-title">{n.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Stage 7: 記録 (ギャラリー) ── */}
        <section className="t16-stage t16-stage--records">
          <div ref={stages[7].ref} className={`t16-stage-inner${stages[7].revealed ? " revealed" : ""}`}>
            <div className="t16-stage-title">STAGE 7 — 記録</div>
            <div className="t16-stage-subtitle">{data.gallery.heading}</div>
            <GalleryCarousel />
          </div>
        </section>

        {/* ── Stage 8: 地図 (アクセス) ── */}
        <section className="t16-stage t16-stage--map">
          <div ref={stages[8].ref} className={`t16-stage-inner${stages[8].revealed ? " revealed" : ""}`}>
            <div className="t16-stage-title" style={{ color: "var(--t16-dark)" }}>STAGE 8 — 地図</div>
            <div className="t16-stage-subtitle" style={{ color: "var(--t16-border)" }}>{data.access.heading}</div>
            <div className="t16-map-wrap">
              <div
                className={`t16-map-frame${mapLocked ? " locked" : ""}`}
                onClick={() => setMapLocked(false)}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.1!2d135.5023!3d34.6837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDQxJzAxLjMiTiAxMzXCsDMwJzA4LjMiRQ!5e0!3m2!1sja!2sjp!4v1"
                  title="Google Maps"
                  style={{ pointerEvents: mapLocked ? "none" : "auto" }}
                  loading="lazy"
                />
              </div>
              <div className="t16-map-info">
                <p>{data.company.address}</p>
                <p>{data.access.nearestStation}</p>
                <p style={{ fontSize: "0.72rem", opacity: 0.7 }}>{data.access.mapNote}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stage 9: 出発！ (CTA + 応募フォーム) ── */}
        <section className="t16-stage t16-stage--departure">
          <div ref={stages[9].ref} className={`t16-stage-inner${stages[9].revealed ? " revealed" : ""}`}>
            <div className="t16-stage-title">FINAL STAGE — 出発！</div>
            <div className="t16-final">
              <div className="t16-final-question">仲間になりますか？</div>
              <div className="t16-final-choices">
                <button
                  className="t16-choice-btn primary"
                  onClick={() => {
                    document.getElementById("t16-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                >
                  ▶ はい
                </button>
                <button
                  className="t16-choice-btn"
                  onClick={() => scrollToStage(0)}
                >
                  　いいえ（もう一度見る）
                </button>
              </div>

              <form
                id="t16-form"
                className="t16-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("ご応募ありがとうございます！担当者より折り返しご連絡いたします。");
                }}
              >
                <div className="t16-form-title">≪ 冒険者登録 ≫</div>
                <div className="t16-form-group">
                  <label className="t16-form-label">
                    名前 <span className="t16-form-required">*</span>
                  </label>
                  <input type="text" className="t16-form-input" required placeholder="山田 太郎" />
                </div>
                <div className="t16-form-group">
                  <label className="t16-form-label">
                    電話番号 <span className="t16-form-required">*</span>
                  </label>
                  <input type="tel" className="t16-form-input" required placeholder="090-1234-5678" />
                </div>
                <div className="t16-form-group">
                  <label className="t16-form-label">メールアドレス</label>
                  <input type="email" className="t16-form-input" placeholder="example@mail.com" />
                </div>
                <div className="t16-form-group">
                  <label className="t16-form-label">メッセージ</label>
                  <textarea className="t16-form-textarea" placeholder="質問や希望があればどうぞ" />
                </div>
                <button type="submit" className="t16-form-submit">
                  ▶ 冒険に出発する
                </button>
              </form>

              {/* Phone CTA */}
              <div style={{ marginTop: 20, textAlign: "center" }}>
                <RpgDialogBox speaker="ギルドマスター">
                  {data.cta.subtext}<br />
                  <span style={{ color: "var(--t16-gold)", fontFamily: "var(--font-dot)", fontSize: "1.1rem" }}>
                    ☎ {data.cta.phone}
                  </span>
                </RpgDialogBox>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="t16-footer" style={{ position: "absolute", bottom: 0, left: 0, width: "100%" }}>
            <div className="t16-footer-catch">{data.footer.catchphrase}</div>
            <div className="t16-footer-company">{data.company.name}</div>
            <div className="t16-footer-copy">&copy; {new Date().getFullYear()} {data.company.nameEn}. All rights reserved.</div>
          </div>
        </section>
      </div>
    </>
  );
}
