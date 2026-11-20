import { ArrowRight, BriefcaseMedical, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { getInitials } from "../../utils/format";

export default function DoctorCard({ doctor }) {
  return (
    <article className="py-6">
      <div className="grid gap-4 sm:grid-cols-[5.5rem_minmax(0,1fr)_auto] sm:items-center sm:gap-6">
        <div
          className="flex h-20 w-20 items-center justify-center bg-brand-ice font-serif text-2xl text-brand-navy"
          aria-hidden="true"
        >
          {getInitials(doctor.name)}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#A30D2A]">
            {doctor.specialization || "General Practice"}
          </p>
          <h3 className="mt-1 font-serif text-2xl font-semibold leading-tight text-brand-navy">
            <Link
              to={`/patient/doctors/${doctor._id}`}
              className="decoration-[#A30D2A] decoration-1 underline-offset-4 hover:underline focus:outline-none focus-visible:underline"
            >
              {doctor.name}
            </Link>
          </h3>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-brand-body">
            {typeof doctor.experience === "number" && (
              <span className="inline-flex items-center gap-2">
                <BriefcaseMedical
                  className="h-4 w-4 text-[#A30D2A]"
                  aria-hidden="true"
                />
                {doctor.experience} {doctor.experience === 1 ? "year" : "years"}{" "}
                experience
              </span>
            )}
            {doctor.email && (
              <a
                href={`mailto:${doctor.email}`}
                className="inline-flex min-w-0 items-center gap-2 break-all hover:text-[#A30D2A]"
              >
                <Mail
                  className="h-4 w-4 shrink-0 text-[#A30D2A]"
                  aria-hidden="true"
                />
                {doctor.email}
              </a>
            )}
          </div>
        </div>

        <Link
          to={`/patient/doctors/${doctor._id}`}
          className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#A30D2A] hover:text-brand-navy focus:outline-none focus-visible:underline"
        >
          View profile
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
