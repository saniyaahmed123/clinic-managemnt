export const ROLE_HOME = {
  admin: "/admin",
  doctor: "/doctor",
  patient: "/patient",
};
export const SITE = {
  name: "Dua Clinic",
  tagline: "Book doctors · Track visits",
  emergencyPhone: "+920000000000", // put your real number
  address: "Your street, your city",
  phone: "+92 000 0000000",
};
export const STATUS_STYLES = {
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  approved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  rejected: "bg-rose-50 text-rose-700 ring-rose-200",
  cancelled: "bg-ink-100 text-ink-600 ring-ink-200",
};

export const TIME_SLOTS = Array.from({ length: 18 }, (_, index) => {
  const totalMinutes = 8 * 60 + index * 30;
  const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
  const minutes = String(totalMinutes % 60).padStart(2, "0");
  return `${hours}:${minutes}`;
});
