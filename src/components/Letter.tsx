import { motion } from "framer-motion";
import type { Letter } from "../content/letter";
import PhotoGallery from "./PhotoGallery";
import "./Letter.css";

interface Props {
  letter: Letter;
  onClose: () => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function LetterView({ letter, onClose }: Props) {
  return (
    <motion.article
      className="letter"
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.96 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        type="button"
        className="letter__close"
        onClick={onClose}
        aria-label="Close the letter and seal the envelope"
        title="Close the letter"
      >
        ×
      </button>
      <motion.div
        className="letter__inner"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p className="letter__date" variants={item}>
          {letter.date}
        </motion.p>

        <motion.h1 className="letter__salutation" variants={item}>
          Dear {letter.to},
        </motion.h1>

        <div className="letter__body">
          {letter.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              className={i === 0 ? "letter__para letter__para--lead" : "letter__para"}
              variants={item}
            >
              {p}
            </motion.p>
          ))}
        </div>

        {letter.photos.length > 0 && (
          <motion.div variants={item} className="letter__gallery">
            <span className="letter__rule" aria-hidden>
              <span className="letter__rule-mark">✦</span>
            </span>
            <PhotoGallery photos={letter.photos} />
          </motion.div>
        )}

        <motion.div className="letter__signoff" variants={item}>
          <p className="letter__closing">{letter.closing}</p>
          <p className="letter__signature">{letter.from}</p>
        </motion.div>

        <motion.div className="letter__seal-back" variants={item}>
          <button type="button" className="seal-back" onClick={onClose}>
            <span className="seal-back__icon" aria-hidden>
              ✉
            </span>
            Seal it back
          </button>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}
