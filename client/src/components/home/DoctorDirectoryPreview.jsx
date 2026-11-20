import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck2,
  Search,
  Stethoscope,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { ROLE_HOME } from "../../utils/constants";
import Button from "../ui/Button";

export default function DoctorDirectoryPreview() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const search = query.trim();
    if (user?.role === "patient") {
      navigate(
        `/patient/doctors${search ? `?search=${encodeURIComponent(search)}` : ""}`,
      );
      return;
    }
    navigate(user ? ROLE_HOME[user.role] : "/login");
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-[#A30D2A]">
            Doctor directory
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
            Find the right specialist for you
          </h2>
          <p className="mt-4 max-w-lg text-base leading-7 text-brand-body">
            Search verified profiles, qualifications and available booking slots
            in one place. Sign in to explore the full directory and request an
            appointment.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium text-brand-body">
            <span className="flex items-center gap-2">
              <BadgeCheck
                className="h-5 w-5 text-[#A30D2A]"
                aria-hidden="true"
              />
              Verified profiles
            </span>
            <span className="flex items-center gap-2">
              <Stethoscope
                className="h-5 w-5 text-[#A30D2A]"
                aria-hidden="true"
              />
              Qualifications
            </span>
            <span className="flex items-center gap-2">
              <CalendarCheck2
                className="h-5 w-5 text-[#A30D2A]"
                aria-hidden="true"
              />
              Direct booking
            </span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-brand-ice p-6 shadow-soft sm:p-8"
        >
          <label
            htmlFor="doctor-search"
            className="text-sm font-bold text-brand-navy"
          >
            Search by name or specialty
          </label>
          <div className="relative mt-3">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#A30D2A]"
              aria-hidden="true"
            />
            <input
              id="doctor-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="e.g. Cardiology"
              className="h-12 w-full rounded-xl border border-[#A30D2A] bg-white pl-12 pr-4 text-sm text-brand-body placeholder:text-ink-400 focus:border-accent-600 focus:outline-none focus:ring-2 focus:ring-[#A30D2A]/20"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="mt-5 w-full !bg-brand-navy hover:!bg-primary-700 sm:w-auto"
          >
            Search doctors
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Button>
          <p className="mt-4 text-xs text-ink-600">
            You will be asked to sign in before viewing patient records or
            booking.
          </p>
        </form>
      </div>
    </section>
  );
}
