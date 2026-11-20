import { HeartPulse } from "lucide-react";
import Brand from "./Brand";

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-navy via-primary-800 to-accent-700 p-12 text-white lg:flex">
        <Brand light />
        <div className="relative z-10 max-w-md">
          <HeartPulse
            className="mb-6 h-10 w-10 text-accent-200"
            aria-hidden="true"
          />
          <h2 className="font-serif text-3xl font-bold leading-tight">
            Care that fits your schedule.
          </h2>
          <p className="mt-4 text-sm leading-6 text-primary-50">
            Find trusted providers, request appointments and manage every visit
            from one calm, secure place.
          </p>
        </div>
        <p className="relative z-10 text-xs text-primary-100">
          SITE.name Medical Center · Building a healthier community
        </p>
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full border-[40px] border-white/5" />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 lg:px-10">
          <Brand compact />
          <span className="text-xs font-medium text-ink-400">
            Secure patient & staff access
          </span>
        </div>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 pb-12">
          <h1 className="text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-ink-500">{subtitle}</p>
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-6 text-sm text-ink-500">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
