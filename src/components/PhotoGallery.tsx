import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Photo } from "../content/letter";
import "./PhotoGallery.css";

interface Props {
  photos: Photo[];
}

const slide = {
  enter: (d: number) => ({ opacity: 0, x: d > 0 ? 40 : -40, rotate: d > 0 ? 3 : -3 }),
  center: { opacity: 1, x: 0, rotate: -1.4 },
  exit: (d: number) => ({ opacity: 0, x: d > 0 ? -40 : 40, rotate: d > 0 ? -3 : 3 }),
};

export default function PhotoGallery({ photos }: Props) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(0);

  function go(step: number) {
    setDir(step);
    setIndex((i) => (i + step + photos.length) % photos.length);
  }

  const photo = photos[index];

  return (
    <div className="gallery">
      <div className="gallery__frame">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.figure
            key={index}
            className="polaroid"
            custom={dir}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="polaroid__photo">
              <img
                src={photo.src}
                alt={photo.caption ?? "A photo of us"}
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                  e.currentTarget.parentElement?.classList.add("polaroid__photo--empty");
                }}
              />
            </div>
            {photo.caption && <figcaption className="polaroid__caption">{photo.caption}</figcaption>}
          </motion.figure>
        </AnimatePresence>
      </div>

      {photos.length > 1 && (
        <div className="gallery__controls">
          <button className="gallery__arrow" onClick={() => go(-1)} aria-label="Previous photo">
            ‹
          </button>
          <div className="gallery__dots" role="tablist" aria-label="Photos">
            {photos.map((_, i) => (
              <button
                key={i}
                className={i === index ? "gallery__dot is-active" : "gallery__dot"}
                aria-label={`Go to photo ${i + 1}`}
                aria-selected={i === index}
                role="tab"
                onClick={() => {
                  setDir(i > index ? 1 : -1);
                  setIndex(i);
                }}
              />
            ))}
          </div>
          <button className="gallery__arrow" onClick={() => go(1)} aria-label="Next photo">
            ›
          </button>
        </div>
      )}
    </div>
  );
}
