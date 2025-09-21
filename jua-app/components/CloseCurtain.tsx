"use client";

import { useEffect, useState } from "react";

export default function CloseCurtain({ onClosed }: { onClosed: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setVisible(true));
    const timeout = window.setTimeout(() => {
      onClosed();
    }, 900);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [onClosed]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "grid",
        placeItems: "center",
        background: "rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          width: "min(820px, 86vw)",
          height: "70vh",
          background: "var(--paper)",
          border: "1px solid #d8cdbb",
          boxShadow: "0 30px 80px rgba(0,0,0,0.18)",
          transform: `scaleY(${visible ? 1 : 0.1})`,
          opacity: visible ? 1 : 0,
          borderRadius: 18,
          transition: "transform 0.6s cubic-bezier(0.2,0.8,0.2,1), opacity 0.6s cubic-bezier(0.2,0.8,0.2,1)",
          transformOrigin: "center",
        }}
      />
    </div>
  );
}
