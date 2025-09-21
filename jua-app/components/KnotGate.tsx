"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "@/styles/knot.module.css";

type Point = { x: number; y: number };

export default function KnotGate({ onUntie }: { onUntie: () => void }) {
  const radius = 120;
  const sealRef = useRef<HTMLDivElement>(null);
  const startPointer = useRef<Point | null>(null);
  const startOffset = useRef<Point>({ x: 0, y: 0 });
  const [position, setPosition] = useState<Point>({ x: 0, y: 0 });
  const [transitioning, setTransitioning] = useState(false);
  const [released, setReleased] = useState(false);
  const [triggered, setTriggered] = useState(false);

  const dist = useMemo(() => Math.hypot(position.x, position.y), [position]);

  const resetTransition = useCallback(() => {
    if (!transitioning) return;
    const id = window.setTimeout(() => setTransitioning(false), 260);
    return () => window.clearTimeout(id);
  }, [transitioning]);

  useEffect(() => resetTransition(), [transitioning, resetTransition]);

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      if (!startPointer.current || released) return;
      const current: Point = { x: event.clientX, y: event.clientY };
      const nextX = current.x - startPointer.current.x + startOffset.current.x;
      const nextY = current.y - startPointer.current.y + startOffset.current.y;
      setTransitioning(false);
      setPosition({ x: nextX, y: nextY });
    },
    [released]
  );

  const endDrag = useCallback(
    (event?: PointerEvent) => {
      if (!startPointer.current) return;
      if (event?.pointerId !== undefined) {
        sealRef.current?.releasePointerCapture(event.pointerId);
      }
      startPointer.current = null;

      if (released) return;

      const distance = Math.hypot(position.x, position.y);
      if (distance > radius + 40) {
        setReleased(true);
        setTransitioning(true);
        setPosition(({ x, y }) => ({ x: x + 200, y: y - 200 }));
        window.setTimeout(() => {
          if (!triggered) {
            setTriggered(true);
            onUntie();
          }
        }, 320);
        return;
      }

      setTransitioning(true);
      setPosition({ x: 0, y: 0 });
    },
    [onUntie, position.x, position.y, radius, released, triggered]
  );

  const handlePointerUp = useCallback(
    (event: PointerEvent) => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      endDrag(event);
    },
    [endDrag, handlePointerMove]
  );

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (released) return;
      event.preventDefault();
      startPointer.current = { x: event.clientX, y: event.clientY };
      startOffset.current = position;
      setTransitioning(false);
      sealRef.current?.setPointerCapture(event.pointerId);
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      window.addEventListener("pointerup", handlePointerUp, { passive: true });
      window.addEventListener("pointercancel", handlePointerUp, { passive: true });
    },
    [handlePointerMove, handlePointerUp, position, released]
  );

  useEffect(() => {
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  const ringScale = 1 + Math.min(dist / radius, 1) * 0.06;
  const hintOpacity = dist >= radius ? 0 : dist >= radius * 0.6 ? 0.2 : 0.6;

  return (
    <div className={styles.wrap}>
      <div className={styles.paper} />
      <div
        className={styles.ring}
        style={{ transform: `scale(${ringScale.toFixed(3)})` }}
      />
      <div
        ref={sealRef}
        className={styles.seal}
        onPointerDown={handlePointerDown}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: transitioning ? "transform 0.25s ease" : "none",
        }}
      >
        <span>결</span>
      </div>
      <div className={styles.hint} style={{ opacity: hintOpacity }}>
        클릭 & 드래그로 매듭을 풀어주세요
      </div>
    </div>
  );
}
