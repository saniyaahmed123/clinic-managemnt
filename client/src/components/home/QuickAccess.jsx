import { Clock3, FlaskConical, HeartPulse, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../ui/Card";

const items = [
  {
    icon: Clock3,
    title: "OPD Timings & Schedules",
    text: "Plan your visit with current clinic hours and department schedules.",
  },
  {
    icon: FlaskConical,
    title: "Online Lab Reports",
    text: "Access results securely through your patient account.",
  },
  {
    icon: Stethoscope,
    title: "Departments & Specialties",
    text: "Explore the care teams and services available to you.",
  },
  {
    icon: HeartPulse,
    title: "Health Packages",
    text: "Preventive checkups designed for every stage of life.",
  },
];

export default function QuickAccess() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-widest text-[#A30D2A]">
          Patient portal
        </p>
        <h2 className="mt-2 font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
          What do you need today?
        </h2>
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.title} to="/login" className="group">
              <Card className="h-full p-6 transition-shadow group-hover:shadow-soft">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-ice text-[#A30D2A]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-serif text-lg font-bold text-brand-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-brand-body">
                  {item.text}
                </p>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
