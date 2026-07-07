// ─────────────────────────────────────────────────────────────────────────
//  ★ THIS IS THE ONLY FILE YOU NEED TO EDIT ★
//  Write your letter here. Drop photos into  public/photos/  and your song
//  into  public/music/  then point to them below.
// ─────────────────────────────────────────────────────────────────────────

export interface Photo {
  src: string;
  caption?: string;
}

export interface Letter {
  to: string;
  from: string;
  date: string;
  /** Small line printed on the front of the sealed envelope. */
  envelopeNote: string;
  /** Prompt shown under the wax seal. */
  openPrompt: string;
  /** Body of the letter — one string per paragraph. */
  paragraphs: string[];
  /** Closing line above the signature, e.g. "Forever yours,". */
  closing: string;
  photos: Photo[];
  music?: {
    src: string;
    title: string;
  };
}

export const letter: Letter = {
  to: "Cea",
  from: "Hecavi",
  date: "July 7, 2026",
  envelopeNote: "To the one who has my whole heart",
  openPrompt: "Tap to open",

  paragraphs: [
    "It’s been a year now since we started this journey together, and I still find myself choosing you every single day. Dating you this long has been more than just time. It’s been a blessing, a chance to witness your wins in life, bit by bit, and to be part of your story. I’m so glad I get to stand beside you, cheering you on in everything you do.",
    "I know you’re leaving soon, and I’ll miss you deeply. But I also know this is for your growth, and that makes me proud. I can't be selfish. Distance may test us, but I believe love will keep us close. May we continue to love each other even when miles separate us.",
    "Every moment I spend with you makes me happy. You made me happy more than you think. Thank you for letting me walk with you in every chapter of your life. I’ll keep supporting you, no matter where you go.",
    "I love you baby!",
  ],

  closing: "Your baby,",

  // Replace these with your own images in public/photos/.
  photos: [
    { src: "/photos/1.png", caption: "The day it all began" },
    { src: "/photos/2.png", caption: "Us, unbothered" },
    { src: "/photos/3.png", caption: "My favorite view" },
  ],

  // Drop an mp3 in public/music/ and update the path (or remove this block).
  music: {
    src: "/music/song.mp3",
    title: "Our Song",
  },
};
