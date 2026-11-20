import { ArrowRight, CalendarCheck2, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ROLE_HOME, SITE } from "../../utils/constants";

const primaryBtn =
  "inline-flex items-center gap-2 rounded-none border border-navy bg-navy px-6 py-3 font-mono text-xs font-medium uppercase tracking-wider text-white transition-colors hover:border-[#A30D2A] hover:bg-[#A30D2A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A30D2A]";
const secondaryBtn =
  "inline-flex items-center gap-2 rounded-none border border-navy bg-transparent px-6 py-3 font-mono text-xs font-medium uppercase tracking-wider text-navy transition-colors hover:bg-navy hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A30D2A]";

const steps = [
  ["Choose a specialist", "Browse verified profiles and qualifications."],
  ["Request a time", "Pick a slot that fits your schedule."],
  ["Track your visit", "See approvals and updates in one place."],
];

export default function HomeHero() {
  const { user } = useAuth();

  const bookPath =
    user?.role === "patient"
      ? "/patient/book"
      : user
        ? ROLE_HOME[user.role]
        : "/register";
  const doctorPath =
    user?.role === "patient"
      ? "/patient/doctors"
      : user
        ? ROLE_HOME[user.role]
        : "/login";

  return (
    <section className="ecg-grid relative overflow-hidden border-b border-navy">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-40 pt-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8 lg:pb-48 lg:pt-24">
        <div className="relative z-10">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[#A30D2A]">
            {SITE.name}
          </p>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-navy lg:text-6xl">
            Book the right doctor.{" "}
            <span className="text-navy/55">Track every visit.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-navy/75">
            Browse specialists, request a time that suits you, and follow each
            appointment from request to approval, all in one place.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to={bookPath} className={primaryBtn}>
              <CalendarCheck2 className="h-4 w-4" aria-hidden="true" />
              Book an appointment
            </Link>
            <Link to={doctorPath} className={secondaryBtn}>
              <Stethoscope className="h-4 w-4" aria-hidden="true" />
              Find a doctor
            </Link>
          </div>
        </div>

        <div className="relative z-10 hidden lg:block">
          <div className="border border-navy bg-white">
            <div className="flex items-center justify-between bg-navy px-5 py-3 font-mono text-[11px] uppercase tracking-widest text-white">
              <span>Your visit</span>
              <span className="text-[#A30D2A]">3 steps</span>
            </div>
            <ol className="divide-y divide-navy/15">
              {steps.map(([title, text], index) => (
                <li key={title} className="flex gap-4 px-5 py-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-navy font-mono text-sm font-medium text-navy">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-display text-base font-semibold text-navy">
                      {title}
                    </p>
                    <p className="mt-0.5 text-sm text-navy/65">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link
              to={doctorPath}
              className="flex items-center justify-between border-t border-navy px-5 py-3 font-mono text-xs font-medium uppercase tracking-wider text-navy transition-colors hover:bg-navy hover:text-white"
            >
              Explore our doctors
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* Full-width ECG line */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-10 h-24 w-full text-[#A30D2A]"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className="pulse-path"
          pathLength="1"
          d="M0 60 H820 L850 60 L870 30 L895 90 L925 0 L955 120 L985 60 H1440"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </section>
  );
}
