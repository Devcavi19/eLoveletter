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
        d="M12 21s-7.5-4.6-10-9.2C.4 8.6 2 5.2 5.3 5c2-.1 3.4 1 4.7 2.6C11.3 6 12.7 5 14.7 5 18 5.2 19.6 8.6 22 11.8 19.5 16.4 12 21 12 21Z"
        fill="currentColor"
      />
    </svg>
  );
}
