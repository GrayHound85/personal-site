"use client";

import { useEffect, useState } from "react";

type ScrambleTextProps = {
  text: string;
  // Milliseconds per character
  speed?: number;
  // Milliseconds to wait before the reveal starts
  delay?: number;
};

const GLYPHS = "abcdefghijklmnopqrstuvwxyz0123456789#%&*+=<>/";
// How many scrambled characters run ahead of the decoded text
const NOISE_LENGTH = 6;

function randomGlyphs(text: string) {
  return Array.from(text, (char) =>
    char === " " ? " " : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
  ).join("");
}

// Reveals text left to right like it's being decrypted: a short run of random
// characters sweeps across and settles into the real text behind it.
// Use it on monospace text, so the random characters are the same width as
// the real ones and nothing shifts.
export default function ScrambleText({
  text,
  speed = 12,
  delay = 0,
}: ScrambleTextProps) {
  const [decoded, setDecoded] = useState(0);
  const [noise, setNoise] = useState("");

  useEffect(() => {
    // With reduced motion the whole string appears on the first tick
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const step = reduceMotion ? text.length : 1;

    let count = 0;
    let interval: number | undefined;

    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        count = Math.min(count + step, text.length);

        setDecoded(count);
        setNoise(randomGlyphs(text.slice(count, count + NOISE_LENGTH)));

        if (count === text.length) {
          window.clearInterval(interval);
        }
      }, speed);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [text, speed, delay]);

  return (
    <>
      {/* Screen readers and crawlers get the full text straight away */}
      <span className="sr-only">{text}</span>

      {/* The rest is rendered invisibly so the text keeps its final size */}
      <span aria-hidden="true">
        {text.slice(0, decoded)}
        <span className="text-primary/70">{noise}</span>
        <span className="invisible">{text.slice(decoded + noise.length)}</span>
      </span>
    </>
  );
}
