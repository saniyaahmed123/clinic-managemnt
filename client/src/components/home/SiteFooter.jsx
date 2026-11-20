import {
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  PhoneCall,
  Twitter,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";
import Brand from "../layout/Brand";
import { SITE } from "../../utils/constants";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "About us", href: "#about" },
      { label: "Departments", href: "#departments" },
      { label: "Doctors", href: "#doctors" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Patients",
    links: [
      { label: "Book an appointment", to: "/register" },
      { label: "Create an account", to: "/register" },
      { label: "Sign in", to: "/login" },
      { label: "Track your visit", to: "/login" },
    ],
  },
];

const socials = [
  { label: "Facebook", Icon: Facebook, href: "#" },
  { label: "X", Icon: Twitter, href: "#" },
  { label: "Instagram", Icon: Instagram, href: "#" },
  { label: "LinkedIn", Icon: Linkedin, href: "#" },
  { label: "YouTube", Icon: Youtube, href: "#" },
];

// Placeholder hours, replace with your real ones
const HOURS = [
  ["Emergency", "24 hours, 7 days"],
  ["Outpatient clinic", "Mon to Sat, 9:00 to 17:00"],
];

const linkClass =
  "inline-block text-sm text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline hover:decoration-[#A30D2A] hover:decoration-2";

function FooterLink({ item }) {
  return item.to ? (
    <Link to={item.to} className={linkClass}>
      {item.label}
    </Link>
  ) : (
    <a href={item.href} className={linkClass}>
      {item.label}
    </a>
  );
}

export default function SiteFooter() {
  return (
    <footer id="contact" className="bg-[#00112C] text-white my-2 py-3">
      {/* ECG line across the top */}

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Emergency strip */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 bg-[#A30D2A] px-6 py-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <PhoneCall className="h-7 w-7 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-lg font-bold leading-tight">
                Need urgent care?
              </p>
              <p className="text-sm text-white/85">
                Our emergency helpline is open 24 hours a day.
              </p>
            </div>
          </div>
          <a
            href={`tel:${SITE.emergencyPhone}`}
            className="group inline-flex items-center gap-2 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#00112C] transition-colors hover:bg-[#00112C] hover:text-white"
          >
            Call {SITE.emergencyPhone}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </div>

        {/* Columns */}
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          {/* Brand */}
          <div>
            <div className="inline-block bg-white p-3 ">
              <Brand />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/70">
              {SITE.name} brings experienced doctors and a simpler way to manage
              every visit together. Find a specialist, request a time and follow
              every update online.
            </p>
            <ul className="mt-6 flex items-center gap-1.5">
              {socials.map(({ label, Icon, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center border border-white/20 text-white/80 transition-colors hover:border-[#A30D2A] hover:bg-[#A30D2A] hover:text-white"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-white/50">
                <span className="h-2 w-2 bg-[#A30D2A]" aria-hidden="true" />
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <FooterLink item={l} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <div>
            <h3 className="flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.18em] text-white/50">
              <span className="h-2 w-2 bg-[#A30D2A]" aria-hidden="true" />
              Contact
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-white/70">
              <li className="flex gap-3">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-white"
                  aria-hidden="true"
                />
                <span>{SITE.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone
                  className="mt-0.5 h-4 w-4 shrink-0 text-white"
                  aria-hidden="true"
                />
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-white"
                >
                  {SITE.phone}
                </a>
              </li>
            </ul>
            <dl className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm">
              {HOURS.map(([label, time]) => (
                <div key={label}>
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-white/50">
                    {label}
                  </dt>
                  <dd className="mt-0.5 text-white/85">{time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="max-w-xl sm:text-right">
            In a life-threatening emergency, call your local emergency number
            immediately.
          </p>
          <ul className="flex gap-5">
            <li>
              <a href="#" className="transition-colors hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-white">
                Terms of Use
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
