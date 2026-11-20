import { Ambulance, MapPin, PhoneCall } from "lucide-react";

export default function EmergencyBar() {
  return (
    <div className="sticky top-0 z-30 bg-navy text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-2 font-mono text-[11px] uppercase tracking-wider sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 bg-emerald-400" />
            </span>
            <PhoneCall className="h-3.5 w-3.5" aria-hidden="true" />
            24/7 Emergency Helpline
          </span>
          <span className="flex items-center gap-2">
            <Ambulance className="h-3.5 w-3.5" aria-hidden="true" />
            Ambulance Dispatch
          </span>
        </div>
        <a
          href="https://www.google.com/maps"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 transition-colors hover:text-[#A30D2A]"
        >
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          Find our location
        </a>
      </div>
    </div>
  );
}
