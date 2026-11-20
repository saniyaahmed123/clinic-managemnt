import {
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";
import img1 from "../../assets/bento/1.png";
import img2 from "../../assets/bento/2.png";
import img3 from "../../assets/bento/3.png";
import img4 from "../../assets/bento/4.png";
import img5 from "../../assets/bento/5.png";

const IMAGES = {
  left: img1,
  second: img5, // where the red socials tile used to be
  large: img2,
  small: img3,
  tall: img4,
};

const socials = [
  { label: "X", Icon: Twitter, href: "#" },
  { label: "YouTube", Icon: Youtube, href: "#" },
  { label: "Instagram", Icon: Instagram, href: "#" },
  { label: "LinkedIn", Icon: Linkedin, href: "#" },
  { label: "Facebook", Icon: Facebook, href: "#" },
];

const tile = "group relative overflow-hidden min-h-[220px] lg:min-h-0";
const zoomImg =
  "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105";

export default function HomeBento() {
  return (
    <section className="bg-black">
      <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[88px] lg:grid-cols-4">
          {/* A: headline tile */}
          <div
            className={`${tile} flex flex-col justify-between bg-[#00112C] p-8 sm:col-span-2 lg:col-span-2 lg:col-start-1 lg:row-span-3 lg:row-start-1`}
          >
            <div>
              <h3 className="max-w-md font-sans text-3xl font-bold leading-tight tracking-tight text-white lg:text-4xl">
                Care that keeps you informed
              </h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-white/70">
                Find a verified specialist, request a time and follow every
                update online.
              </p>
            </div>
            <Link
              to="/register"
              className="group/btn mt-6 inline-flex w-fit items-center gap-2 bg-[#A30D2A] px-6 py-3 font-sans text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-[#00112C]"
            >
              Book an appointment
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover/btn:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* B: photo, bottom left */}
          <div
            className={`${tile} lg:col-start-1 lg:row-span-3 lg:row-start-4`}
          >
            <img src={IMAGES.left} alt="Dua Clinic" className={zoomImg} />
          </div>

          {/* C: photo, where the socials tile used to be */}
          <div
            className={`${tile} lg:col-start-2 lg:row-span-3 lg:row-start-4`}
          >
            <img src={IMAGES.second} alt="Dua Clinic" className={zoomImg} />
          </div>
          {/* D: large photo, middle column */}
          <div
            className={`${tile} lg:col-start-3 lg:row-span-4 lg:row-start-1`}
          >
            <img src={IMAGES.large} alt="Dua Clinic" className={zoomImg} />
          </div>

          {/* E: small photo, middle column */}
          <div
            className={`${tile} lg:col-start-3 lg:row-span-2 lg:row-start-5`}
          >
            <img src={IMAGES.small} alt="Dua Clinic" className={zoomImg} />
          </div>

          {/* F: tall tile, right, photo background with text */}
          <div
            className={`${tile} flex min-h-[320px] flex-col justify-end bg-[#00112C] p-8 sm:col-span-2 lg:col-span-1 lg:col-start-4 lg:row-span-6 lg:row-start-1`}
          >
            <img
              src={IMAGES.tall}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00112C] via-[#00112C]/60 to-[#00112C]/10" />

            <div className="relative text-center">
              <p className="font-sans text-4xl font-bold tracking-tight text-white">
                50+
              </p>
              <p className="mt-1 font-sans text-xl font-semibold text-white/90">
                Verified doctors
              </p>
              <div
                className="mt-4 flex justify-center gap-1.5"
                aria-hidden="true"
              >
                <span className="h-1.5 w-6 bg-[#A30D2A]" />
                <span className="h-1.5 w-1.5 bg-white/40" />
                <span className="h-1.5 w-1.5 bg-white/40" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
