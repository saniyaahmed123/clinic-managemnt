import logo from "../../assets/logo.png";
import { SITE } from "../../utils/constants";

export default function Brand({ compact = false, light = false }) {
  return (
    <div className="flex items-center gap-3">
      <img
        src={logo}
        alt={`${SITE.name} logo`}
        className="h-24 w-auto object-contain"
      />
    </div>
  );
}
