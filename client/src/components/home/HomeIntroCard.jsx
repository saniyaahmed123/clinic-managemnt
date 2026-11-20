import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ROLE_HOME, SITE } from "../../utils/constants";

// Edit the wording here
const TITLE = "Compassionate Care, Made Simple";
const TEXT = `${SITE.name} brings experienced doctors, modern diagnostics and a simpler way to manage every visit under one roof. Find a verified specialist, request a time that suits you, and follow every approval and update online, without waiting on the phone.`;

export default function HomeIntroCard() {
  const { user } = useAuth();

  const to =
    user?.role === "patient"
      ? "/patient/book"
      : user
        ? ROLE_HOME[user.role]
        : "/register";
  const label =
    user && user.role !== "patient" ? "Open Dashboard" : "Book an Appointment";

  return (
    <section className="relative z-20 mx-auto -mt-16 max-w-[1440px] px-4 sm:px-6 lg:-mt-28 lg:px-8">
      <div className="grid min-h-[250px] border border-white/60 border-t-2 border-t-[#A30D2A] bg-white/55 shadow-[0_8px_32px_rgba(0,17,44,0.12)] backdrop-blur-xl lg:grid-cols-[1fr_auto]">
        <div className="flex flex-col justify-center px-6 py-8 lg:px-10">
          <h2 className="font-sans text-3xl font-bold leading-tight tracking-tight text-[#00112C] lg:text-4xl">
            {TITLE}
          </h2>
          <p className="mt-4 max-w-4xl font-sans text-base leading-7 text-[#00112C]/80">
            {TEXT}
          </p>
        </div>

        <div className="flex items-center border-t border-[#00112C]/15 px-6 py-6 lg:my-8 lg:border-l lg:border-t-0 lg:px-14 lg:py-0">
          <Link
            to={to}
            className="group inline-flex items-center gap-2 bg-[#00112C] px-8 py-4 font-sans text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#A30D2A]"
          >
            {label}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
