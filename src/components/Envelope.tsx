import { useState } from "react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import type { Letter } from "../content/letter";
import "./Envelope.css";

interface Props {
  letter: Letter;
  onOpened: () => void;
}

export default function Envelope({ letter, onOpened }: Props) {
  const [busy, setBusy] = useState(false);
  const reduce = useReducedMotion();

  const seal = useAnimationControls();
  const flap = useAnimationControls();
  const paper = useAnimationControls();
  const box = useAnimationControls();

  async function open() {
    if (busy) return;
    setBusy(true);

    if (reduce) {
      onOpened();
      return;
    }

    await seal.start({
      scale: 0,
      opacity: 0,
      rotate: -22,
      transition: { duration: 0.45, ease: "easeIn" },
    });
    await flap.start({
      rotateX: 178,
      transition: { duration: 0.75, ease: "easeInOut" },
    });
    await paper.start({
      y: "-62%",
      scale: 1.03,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    });
    await box.start({
      opacity: 0,
      y: 26,
      transition: { duration: 0.4, ease: "easeIn" },
    });
    onOpened();
  }

  return (
    <motion.div
      className="envelope-scene"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.button
        type="button"
        className="envelope"
        onClick={open}
        animate={box}
        aria-label={`Open the letter. ${letter.openPrompt}`}
        whileHover={busy ? undefined : { scale: 1.015 }}
        whileTap={busy ? undefined : { scale: 0.99 }}
      >
        {/* The folded letter that rises out of the pocket */}
        <motion.div className="env-letter" animate={paper} aria-hidden>
          <span className="env-letter__mono">{initials(letter.from)}</span>
        </motion.div>

        {/* Inner back wall of the envelope */}
        <div className="env-back" aria-hidden />

        {/* Front pocket that hides the lower half of the letter */}
        <div className="env-pocket" aria-hidden>
          <span className="env-note">{letter.envelopeNote}</span>
        </div>

        {/* Top flap, hinged at the top edge, rotates open */}
        <motion.div className="env-flap" animate={flap} aria-hidden />

        {/* Wax seal sitting over the flap tip */}
        <motion.div className="env-seal" animate={seal} aria-hidden>
          <HeartMark />
        </motion.div>
      </motion.button>

      <motion.p
        className="env-prompt"
        animate={busy ? { opacity: 0, y: 8 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {letter.openPrompt}
      </motion.p>
    </motion.div>
  );
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function HeartMark() {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" role="presentation">
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill="currentColor"
      />
    </svg>
  );
}
