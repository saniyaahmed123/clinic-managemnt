import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronDown, Search } from "lucide-react";
import { getDoctors } from "../../api/doctors";
import { useApi } from "../../hooks/useApi";
import ErrorMessage from "../../components/ui/ErrorMessage";
import Spinner from "../../components/ui/Spinner";
import EmptyState from "../../components/ui/EmptyState";
import DoctorCard from "../../components/doctors/DoctorCard";

function FilterField({ label, children }) {
  return (
    <div className="min-w-0">
      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-brand-navy">
        {label}
      </label>
      {children}
    </div>
  );
}

const fieldClass =
  "h-11 w-full border border-ink-300 bg-white text-sm text-brand-navy transition focus:border-[#A30D2A] focus:outline-none focus:ring-1 focus:ring-[#A30D2A]";

export default function DoctorsPage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [debouncedSearch, setDebouncedSearch] = useState(
    searchParams.get("search") || "",
  );
  const [specialization, setSpecialization] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const allDoctors = useApi(useCallback(() => getDoctors(), []));
  const filteredDoctors = useApi(
    useCallback(
      () => getDoctors({ search: debouncedSearch, specialization }),
      [debouncedSearch, specialization],
    ),
    [debouncedSearch, specialization],
  );

  const all = allDoctors.data?.doctors || [];
  const doctors = filteredDoctors.data?.doctors || [];
  const specialties = [
    ...new Set(all.map((doctor) => doctor.specialization).filter(Boolean)),
  ].sort();
  const hasFilters = Boolean(search || specialization);

  const clearFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setSpecialization("");
  };

  return (
    <>
      <header className="-mx-4 -mt-6 border-b-2 border-[#A30D2A] bg-white px-4 pb-8 pt-8 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-body">
              <li>
                <Link to="/" className="hover:text-[#A30D2A]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-brand-navy">
                Doctors
              </li>
            </ol>
          </nav>
          <h1 className="font-serif text-5xl font-normal leading-tight text-brand-navy sm:text-6xl">
            Doctors
          </h1>
          <p className="mt-3 text-base text-brand-body">
            Search by provider name or specialty.
          </p>
        </div>
      </header>

      <section
        aria-label="Filter doctors"
        className="mx-auto max-w-7xl border-b border-ink-200 py-6"
      >
        <div className="grid gap-5 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)_auto] md:items-end">
          <FilterField label="Specialty">
            <div className="relative">
              <select
                value={specialization}
                onChange={(event) => setSpecialization(event.target.value)}
                className={`${fieldClass} appearance-none px-3 pr-10`}
                aria-label="Filter by specialty"
              >
                <option value="">All specialties</option>
                {specialties.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A30D2A]"
                aria-hidden="true"
              />
            </div>
          </FilterField>

          <FilterField label="Search">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A30D2A]"
                aria-hidden="true"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Name or specialty"
                className={`${fieldClass} pl-10 pr-3 placeholder:text-ink-500`}
                aria-label="Search doctors by name or specialty"
              />
            </div>
          </FilterField>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="h-11 px-2 text-sm font-medium text-[#A30D2A] underline underline-offset-4 hover:text-brand-navy focus:outline-none focus-visible:ring-1 focus-visible:ring-[#A30D2A]"
            >
              Clear filters
            </button>
          )}
        </div>
      </section>

      <section
        className="mx-auto max-w-7xl pb-8 pt-8"
        aria-labelledby="doctor-results-title"
      >
        <ErrorMessage message={allDoctors.error} onRetry={allDoctors.reload} />
        <ErrorMessage
          message={filteredDoctors.error}
          onRetry={filteredDoctors.reload}
        />

        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
          <h2
            id="doctor-results-title"
            className="font-serif text-3xl font-normal text-brand-navy"
          >
            All doctors
          </h2>
          <p className="text-sm text-brand-body" aria-live="polite">
            {filteredDoctors.loading
              ? "Updating results…"
              : `${filteredDoctors.data?.count ?? 0} ${filteredDoctors.data?.count === 1 ? "doctor" : "doctors"}`}
          </p>
        </div>

        {filteredDoctors.loading ? (
          <Spinner label="Finding doctors" />
        ) : doctors.length === 0 ? (
          <EmptyState
            icon={Search}
            title="No doctors found"
            description="Try a different search or specialty."
          />
        ) : (
          <div className="divide-y divide-ink-200 border-t border-ink-200">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
