import { Baby, Bone, HeartPulse, ScanLine } from "lucide-react";
import Card from "../ui/Card";

const departments = [
  {
    icon: HeartPulse,
    title: "Cardiology",
    text: "Heart care, diagnostics and ongoing monitoring.",
  },
  {
    icon: Baby,
    title: "Maternity",
    text: "Support before, during and after pregnancy.",
  },
  {
    icon: Bone,
    title: "Orthopedics",
    text: "Bone, joint and mobility care for all ages.",
  },
  {
    icon: ScanLine,
    title: "Diagnostics",
    text: "Modern imaging and laboratory services.",
  },
];

export default function Departments() {
  return (
    <section className="bg-brand-ice py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-[#A30D2A]">
              Centers of excellence
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-brand-navy sm:text-4xl">
              Specialized care, close to home
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-brand-body">
            Our teams combine clinical expertise with a calm, patient-first
            experience.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {departments.map((department) => {
            const Icon = department.icon;
            return (
              <Card key={department.title} className="border-0 bg-white p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-ice text-brand-navy">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-serif text-lg font-bold text-brand-navy">
                  {department.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-brand-body">
                  {department.text}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
