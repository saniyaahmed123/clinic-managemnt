import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import slide1 from "../../assets/carousel/1.png";
import slide2 from "../../assets/carousel/2.png";

// Add more slides by importing another image and adding a line here.
const slides = [
  { src: slide1, alt: "Dua Clinic slide 1" },
  { src: slide2, alt: "Dua Clinic slide 2" },
];

const INTERVAL_MS = 5000;

export default function HeroCarousel({ children }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const go = useCallback((i) => setIndex((i + count) % count), [count]);

  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, count, index]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured"
      className="relative isolate min-h-[560px] overflow-hidden bg-[#00112C] sm:min-h-[640px] lg:min-h-[760px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Slides, behind everything */}
      <div className="absolute inset-0 -z-10">
        {slides.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            alt={s.alt}
            aria-hidden={i !== index}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Dark fade at the top so white text stays readable */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-[#00112C]/80 to-transparent" />

      {/* Navbar (or anything else) sits on top of the image */}
      <div className="relative z-10">{children}</div>

      {/* Arrows */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous slide"
            className="absolute left-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-white/90 text-[#00112C] transition-colors hover:bg-[#A30D2A] hover:text-white"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next slide"
            className="absolute right-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-white/90 text-[#00112C] transition-colors hover:bg-[#A30D2A] hover:text-white"
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
        </>
      )}

      {/* Counter + dots */}
      {count > 1 && (
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-[#00112C]/80 px-4 py-2.5 font-mono text-xs text-white sm:px-6 lg:px-8">
          <span aria-live="off">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(count).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className={`h-1.5 transition-all ${
                  i === index
                    ? "w-10 bg-[#A30D2A]"
                    : "w-6 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
