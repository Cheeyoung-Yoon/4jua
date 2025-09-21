"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "@/styles/letter.module.css";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function LetterScroll({ onEndReach }: { onEndReach: () => void }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [locked, setLocked] = useState(false);

  const updateProgress = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const scrollY = window.scrollY;
    const stageTop = stage.offsetTop;
    const stageHeight = stage.offsetHeight;
    const viewport = window.innerHeight;
    const scrollRange = Math.max(stageHeight - viewport, 1);
    const scrolled = clamp(scrollY - stageTop, 0, scrollRange);
    const value = clamp(scrolled / scrollRange, 0, 1);
    setProgress(value);
    return value;
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        updateProgress();
        ticking = false;
      });
    };

    const handleResize = () => {
      updateProgress();
    };

    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [updateProgress]);

  useEffect(() => {
    if (locked || progress < 0.985) return;
    setLocked(true);
    const stage = stageRef.current;
    const targetTop = stage ? stage.offsetTop + stage.offsetHeight : window.scrollY;
    window.scrollTo({ top: targetTop, behavior: "smooth" });
    const timeout = window.setTimeout(() => {
      onEndReach();
    }, 220);
    return () => window.clearTimeout(timeout);
  }, [locked, onEndReach, progress]);

  const leftRotation = useMemo(() => -8 + progress * 20, [progress]);
  const rightRotation = useMemo(() => 8 - progress * 20, [progress]);

  return (
    <div className={styles.stage} ref={stageRef}>
      <aside
        className={`${styles.side} ${styles.left}`}
        style={{ transform: `rotate(${leftRotation}deg)` }}
      />
      <aside
        className={`${styles.side} ${styles.right}`}
        style={{ transform: `rotate(${rightRotation}deg)` }}
      />

      <section className={styles.letter}>
        <header className={styles.header}>
          <div className={styles.ribbon} />
          <h1>서신(書信)</h1>
          <p className={styles.sub}>달빛 아래 붓을 적시어…</p>
        </header>

        <article className={styles.body}>
          <p>
            바람이 잔잔한 밤, 당신께 전해지는 글월 하나. 마음의 결을 따라 종이가 한 장씩
            넘겨지듯, 이 편지도 천천히, 그러나 분명하게 닿기를 바랍니다.
          </p>
          <p>
            … 여기에 실제 편지 내용을 길게 넣어도 좋고, 여러 문단과 삽화를 섞으며 스크롤
            흐름에 맞춰 연출할 수 있어요.
          </p>
          <p>
            스크롤을 내릴수록 양옆의 서신 장식이 방향에 맞춰 회전하며 화면의 몰입감을
            높입니다.
          </p>
          <p>끝까지 내리면 편지가 조용히 닫혀요.</p>
          <div style={{ height: "40vh" }} />
        </article>
      </section>
    </div>
  );
}
