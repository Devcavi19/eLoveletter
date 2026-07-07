import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { letter } from "./content/letter";
import Envelope from "./components/Envelope";
import LetterView from "./components/Letter";
import MusicPlayer from "./components/MusicPlayer";
import FloatingHearts from "./components/FloatingHearts";
import "./styles/app.css";

export default function App() {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Fired from the user's tap on the seal — a real gesture, so audio is allowed.
  function handleOpen() {
    setOpened(true);
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.55;
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  }

  // Fold the letter away and seal the envelope again.
  function handleClose() {
    setOpened(false);
    const audio = audioRef.current;
    if (audio && !audio.paused) {
      audio.pause();
      audio.currentTime = 0;
    }
    setPlaying(false);
  }

  function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  return (
    <>
      <FloatingHearts active={opened} />

      <main className="stage">
        <AnimatePresence mode="wait">
          {!opened ? (
            <Envelope key="envelope" letter={letter} onOpened={handleOpen} />
          ) : (
            <LetterView key="letter" letter={letter} onClose={handleClose} />
          )}
        </AnimatePresence>
      </main>

      {letter.music && (
        <>
          <audio
            ref={audioRef}
            src={letter.music.src}
            loop
            preload="auto"
            onCanPlay={() => setAudioReady(true)}
            onError={() => setAudioReady(false)}
          />
          {opened && audioReady && (
            <MusicPlayer
              title={letter.music.title}
              playing={playing}
              onToggle={toggleMusic}
            />
          )}
        </>
      )}
    </>
  );
}
