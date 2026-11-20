import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Replace these with your clinic's real numbers and labels
const STATS = [
  { value: 5000, suffix: "+", label: "Patients cared for every month" },
  { value: 50, suffix: "+", label: "Verified doctors" },
  { value: 12, suffix: "", label: "Specialist departments" },
  { value: 24, suffix: "/7", label: "Emergency helpline" },
  { value: 15000, suffix: "+", label: "Appointments booked online" },
];

const NOTE = "* Sample figures, replace with your own";

export default function HomeStats() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count);

        if (reduceMotion) {
          el.textContent = end.toLocaleString("en-US");
          return;
        }

        const counter = { val: 0 };
        el.textContent = "0";

        gsap.to(counter, {
          val: end,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = Math.round(counter.val).toLocaleString("en-US");
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="mx-auto max-w-[1440px] px-4 pb-10 pt-14 sm:px-6 lg:px-8"
    >
      <dl className="grid grid-cols-2 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="px-4 text-center lg:border-l lg:border-[#00112C]/15 lg:first:border-l-0"
          >
            <dd className="order-1 font-sans text-5xl font-bold tabular-nums tracking-tight text-[#00112C] lg:text-6xl">
              <span data-count={s.value}>
                {s.value.toLocaleString("en-US")}
              </span>
              <span className="text-[#A30D2A]">{s.suffix}</span>
            </dd>
            <dt className="mt-2 text-base font-semibold text-[#00112C]/70">
              {s.label}
            </dt>
          </div>
        ))}
      </dl>
      <p className="mt-8 text-right text-xs text-[#00112C]/50">{NOTE}</p>
    </section>
  );
}
