import { motion } from "framer-motion";
import "./MusicPlayer.css";

interface Props {
  title: string;
  playing: boolean;
  onToggle: () => void;
}

export default function MusicPlayer({ title, playing, onToggle }: Props) {
  return (
    <motion.button
      type="button"
      className={playing ? "music is-playing" : "music"}
      onClick={onToggle}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      aria-label={playing ? `Pause ${title}` : `Play ${title}`}
      title={title}
    >
      <span className="music__icon" aria-hidden>
        <span className="music__bar" />
        <span className="music__bar" />
        <span className="music__bar" />
      </span>
      <span className="music__title">{title}</span>
    </motion.button>
  );
}
