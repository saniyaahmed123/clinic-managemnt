import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useMutation } from "../../hooks/useApi";
import { ROLE_HOME } from "../../utils/constants";
import Brand from "../../components/layout/Brand";
import sideImage from "../../assets/carousel/1.png";

const field =
  "block h-12 w-full rounded-none border border-[#00112C]/25 bg-white px-4 text-base text-[#00112C] placeholder:text-[#00112C]/40 transition-colors focus:border-[#A30D2A] focus:outline-none focus:ring-2 focus:ring-[#A30D2A]/20";
const label =
  "mb-2 block text-xs font-semibold uppercase tracking-wide text-[#00112C]";

const points = [
  "Find a verified specialist",
  "Request a time that suits you",
  "Track approvals in one place",
];

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [localError, setLocalError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const mutation = useMutation(login);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLocalError("");
    if (!form.email || !form.password) {
      setLocalError("Email and password are required.");
      return;
    }
    const user = await mutation.run({
      email: form.email,
      password: form.password,
    });
    if (user) {
      navigate(location.state?.from || ROLE_HOME[user.role] || "/", {
        replace: true,
      });
    }
  };

  const error = localError || mutation.error;

  return (
    <div className="grid min-h-screen font-sans lg:grid-cols-[1.05fr_1fr]">
      {/* Left: image panel (desktop only) */}
      <aside className="relative hidden overflow-hidden bg-[#00112C] lg:block">
        <img
          src={sideImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#00112C] via-[#00112C]/70 to-[#00112C]/40" />

        <div className="relative flex h-full flex-col justify-between p-12">
          <Link
            to="/"
            className="inline-block w-fit bg-white px-4 py-3"
            aria-label="Back to home"
          >
            <Brand />
          </Link>

          <div className="pb-24">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-white/60">
              Patient &amp; staff portal
            </p>
            <h2 className="mt-4 max-w-md text-5xl font-bold leading-[1.1] tracking-tight text-white">
              Your care, all in one place.
            </h2>
            <ol className="mt-8 space-y-3">
              {points.map((p, i) => (
                <li
                  key={p}
                  className="flex items-center gap-4 text-base text-white/85"
                >
                  <span className="font-mono text-xs text-[#A30D2A] brightness-150">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {p}
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* ECG line */}
        <svg
          className="pointer-events-none absolute inset-x-0 bottom-10 h-16 w-full text-[#A30D2A]"
          viewBox="0 0 1000 80"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="pulse-path"
            pathLength="1"
            d="M0 40 H560 L580 40 L594 22 L610 62 L626 0 L642 80 L658 40 H1000"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </aside>

      {/* Right: form */}
      <main className="flex items-center justify-center bg-[#F5F4EF] px-6 py-12 sm:px-10">
        <div className="w-full max-w-md">
          {/* Logo on small screens */}
          <Link
            to="/"
            className="mb-8 inline-block bg-white px-3 py-2 lg:hidden"
            aria-label="Back to home"
          >
            <Brand compact />
          </Link>

          <Link
            to="/"
            className="hidden items-center gap-2 text-sm font-medium text-[#00112C]/70 transition-colors hover:text-[#A30D2A] lg:inline-flex"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to home
          </Link>

          <div className="border-t-2 border-[#A30D2A] bg-white p-8 shadow-[0_8px_32px_rgba(0,17,44,0.08)] lg:mt-6 sm:p-10">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-[#A30D2A]">
              Sign in
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#00112C] sm:text-4xl">
              Welcome back
            </h1>
            <p className="mt-2 text-sm leading-6 text-[#00112C]/70">
              Sign in to manage your appointments and care.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {error && (
                <div
                  role="alert"
                  className="border-l-4 border-[#A30D2A] bg-[#A30D2A]/5 px-4 py-3 text-sm text-[#7A0A1F]"
                >
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className={label}>
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, email: event.target.value }))
                  }
                  required
                  className={field}
                />
              </div>

              <div>
                <label htmlFor="password" className={label}>
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Your password"
                    value={form.password}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        password: event.target.value,
                      }))
                    }
                    required
                    className={`${field} pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    aria-pressed={showPassword}
                    className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-[#00112C]/55 transition-colors hover:text-[#A30D2A]"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Eye className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={mutation.loading}
                className="group flex h-12 w-full items-center justify-center gap-2 bg-[#00112C] text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#A30D2A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A30D2A] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {mutation.loading ? (
                  <>
                    <Loader2
                      className="h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                    Signing in
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </>
                )}
              </button>
            </form>

            <p className="mt-8 border-t border-[#00112C]/10 pt-6 text-sm text-[#00112C]/70">
              New patient?{" "}
              <Link
                to="/register"
                className="font-semibold text-[#A30D2A] underline-offset-4 hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
