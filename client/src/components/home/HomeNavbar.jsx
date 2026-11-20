import { useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Menu,
  Phone,
  Twitter,
  X,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";
import Brand from "../layout/Brand";

// Items with `children` get a chevron and a dropdown.
// Use `to` for pages inside the app and `href` for anchors or placeholders.
const links = [
  {
    label: "Services",
    href: "#services",
    children: [
      { label: "Book an appointment", to: "/register" },
      { label: "Find a doctor", href: "#doctors" },
      { label: "Track your visit", to: "/login" },
    ],
  },
  { label: "Departments", href: "#departments" },
  { label: "Doctors", href: "#doctors" },
  {
    label: "About us",
    href: "#about",
    children: [
      { label: "Our story", href: "#about" },
      { label: "Our team", href: "#about" },
    ],
  },
  {
    label: "Patient info",
    href: "#",
    children: [
      { label: "Visiting hours", href: "#" },
      { label: "Insurance & billing", href: "#" },
    ],
  },
  { label: "Contact", href: "#contact" },
];
const socials = [
  { label: "Facebook", Icon: Facebook, href: "#" },
  { label: "X", Icon: Twitter, href: "#" },
  { label: "Instagram", Icon: Instagram, href: "#" },
  { label: "LinkedIn", Icon: Linkedin, href: "#" },
  { label: "YouTube", Icon: Youtube, href: "#" },
];
export const SITE = {
  name: "Dua Clinic",
  tagline: "Book doctors · Track visits",
  emergencyPhone: "+920000000000",
  address: "Your street, your city",
  phone: "+92 000 0000000",
};
function HoverPulse() {
  return (
    <svg
      className="nav-pulse pointer-events-none absolute bottom-3 left-2 h-3 w-[calc(100%-1rem)] text-[#A30D2A]"
      viewBox="0 0 100 12"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        pathLength="1"
        d="M0 6 H34 L40 6 L44 1 L50 11 L56 3 L60 6 H100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function SubLink({ item, className, onClick }) {
  if (item.to) {
    return (
      <Link to={item.to} className={className} onClick={onClick}>
        {item.label}
      </Link>
    );
  }
  return (
    <a href={item.href} className={className} onClick={onClick}>
      {item.label}
    </a>
  );
}

export default function HomeNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto max-w-[1440px] px-4 pt-6 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-1 py-3 text-sm text-white">
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-2">
          <li className="flex items-center gap-2.5">
            <MapPin className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span>{SITE.address}</span>
          </li>
          <li>
            <a
              href={`tel:${SITE.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2.5 transition-colors hover:text-[#A30D2A]"
            >
              <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
              {SITE.phone}
            </a>
          </li>
        </ul>

        <ul className="flex items-center gap-1">
          {socials.map(({ label, Icon, href }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center text-white/75 transition-colors hover:bg-[#A30D2A] hover:text-white"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <header className="relative z-20 border border-white/60 border-b-2 border-b-[#A30D2A] bg-white/60 shadow-[0_8px_32px_rgba(0,17,44,0.12)] backdrop-blur-xl">
        <div className="flex min-h-[104px] items-stretch justify-between pl-5">
          <div className="flex items-center px-5 py-5">
            <Brand />
          </div>

          {/* Desktop */}
          <nav
            className="hidden flex-1 items-stretch lg:flex"
            aria-label="Primary"
          >
            <ul className="flex flex-1 items-stretch justify-center">
              {links.map((l) => (
                <li key={l.label} className="group/nav relative flex">
                  <a
                    href={l.href}
                    className="group relative flex items-center gap-1.5 px-4 text-sm font-semibold uppercase tracking-wide text-navy transition-colors hover:text-[#A30D2A]"
                  >
                    {l.label}
                    {l.children && (
                      <ChevronDown
                        className="h-3.5 w-3.5 opacity-70 transition-transform group-hover/nav:rotate-180"
                        aria-hidden="true"
                      />
                    )}
                  </a>

                  {l.children && (
                    <ul className="absolute left-0 top-full hidden min-w-[220px] border border-navy border-t-2 border-t-[#A30D2A] bg-white group-focus-within/nav:block group-hover/nav:block">
                      {l.children.map((c) => (
                        <li
                          key={c.label}
                          className="border-b border-navy/10 last:border-b-0"
                        >
                          <SubLink
                            item={c}
                            className="block px-4 py-3 text-[13px] font-medium uppercase tracking-wide text-navy transition-colors hover:bg-navy hover:text-white"
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <Link
              to="/login"
              className="flex items-center border-l border-navy/15 px-7 text-sm font-semibold uppercase tracking-wide text-[#00112C] transition-colors hover:text-[#A30D2A]"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="group flex items-center gap-2 bg-[#00112C] px-9 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#A30D2A]"
            >
              Register
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="my-auto mr-4 border border-navy p-2 text-navy lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav
            className="border-t border-navy/15 lg:hidden"
            aria-label="Mobile"
          >
            <ul className="divide-y divide-navy/15">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block px-5 py-4 text-sm font-semibold uppercase tracking-wide text-navy"
                  >
                    {l.label}
                  </a>
                  {l.children && (
                    <ul className="border-t border-navy/10 bg-navy/[0.03]">
                      {l.children.map((c) => (
                        <li key={c.label}>
                          <SubLink
                            item={c}
                            onClick={() => setOpen(false)}
                            className="block py-3 pl-9 pr-5 text-[13px] uppercase tracking-wide text-navy/80"
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              <li>
                <Link
                  to="/login"
                  className="block px-5 py-4 font-mono text-xs font-medium uppercase tracking-wider text-navy"
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="flex items-center justify-between bg-navy px-5 py-4 font-mono text-xs font-medium uppercase tracking-wider text-white"
                >
                  Register
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </div>
  );
}
