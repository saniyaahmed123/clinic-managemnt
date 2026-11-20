import { ArrowRight } from "lucide-react";
import { SITE } from "../../utils/constants";

// Edit the wording here
const TITLE = `About ${SITE.name}`;
const TEXT = `At ${SITE.name}, we believe good healthcare should feel clear and unhurried. Our doctors, nurses and care team work together to diagnose, treat and follow up with every patient, and our online system lets you find a verified specialist, request an appointment and track its status without the phone calls and waiting-room guesswork. Whatever brings you in, our goal is the same: care that is accessible, respectful and centred on you.`;

// Change this to a real page when you have an About page, for example "/about"
const READ_MORE_HREF = "#";

export default function HomeAbout() {
  return (
    <section
      id="about"
      className="border-t bg-[#D9D9D9] border-[#00112C]/10 px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="font-sans text-3xl font-bold tracking-tight text-[#00112C] sm:text-4xl lg:text-5xl">
          {TITLE}
        </h2>

        <p className="mt-8 font-sans text-base italic leading-8 text-[#00112C]/75 lg:text-lg">
          {TEXT}
        </p>

        <a
          href={READ_MORE_HREF}
          className="group mt-10 inline-flex items-center gap-2 bg-[#00112C] px-8 py-4 font-sans text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#A30D2A]"
        >
          Read More
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </a>
      </div>
    </section>
  );
}
