"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import CloseCurtain from "@/components/CloseCurtain";
import KnotGate from "@/components/KnotGate";
import LetterScroll from "@/components/LetterScroll";
import PetalsCanvas from "@/components/PetalsCanvas";

type Stage = "closed" | "opened" | "closing" | "closed-final";

export default function LetterTestPage() {
  const [stage, setStage] = useState<Stage>("closed");
  const [burstKey, setBurstKey] = useState(0);

  const mainStyle = useMemo(() => {
    return {
      minHeight: "100vh",
      overflow: "hidden",
      position: "relative",
      background: "#e9e3d7",
      color: "var(--ink)",
      "--paper": "#faf6ef",
      "--ink": "#2a2826",
      "--red": "#bb2b3b",
      fontFamily: 'ui-serif, "Iowan Old Style", "Nanum Myeongjo", serif',
    } as CSSProperties;
  }, []);

  return (
    <main style={mainStyle}>
      {stage === "closed" && (
        <KnotGate
          onUntie={() => {
            setStage("opened");
            setBurstKey((value) => value + 1);
          }}
        />
      )}

      {stage === "opened" && (
        <>
          <PetalsCanvas burstKey={burstKey} />
          <LetterScroll
            onEndReach={() => {
              setStage("closing");
            }}
          />
        </>
      )}

      {stage === "closing" && (
        <CloseCurtain
          onClosed={() => {
            setStage("closed-final");
          }}
        />
      )}

      {stage === "closed-final" && (
        <div
          style={{
            height: "100vh",
            display: "grid",
            placeItems: "center",
            background: "#e9e3d7",
          }}
        >
          <button
            onClick={() => {
              setStage("closed");
              setBurstKey((value) => value + 1);
            }}
            style={{
              padding: "12px 18px",
              border: "1px solid #000",
              background: "#fff",
            }}
          >
            다시 열기
          </button>
        </div>
      )}
    </main>
  );
}
