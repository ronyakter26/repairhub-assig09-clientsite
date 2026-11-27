
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  Wrench,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export default function SignInPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        rememberMe,
      });

      if (error) {
        setErrorMessage(error.message || "Invalid email or password.");
        return;
      }

      const sessionResult = await authClient.getSession();

      if (sessionResult.error || !sessionResult.data?.user) {
        setErrorMessage("Login successful, but session could not be loaded.");
        return;
      }

      const userRole = (
        sessionResult.data.user as typeof sessionResult.data.user & {
          role?: string;
        }
      ).role;

      if (userRole === "admin") {
        router.push("/dashboard/admin");
      } else if (userRole === "technician") {
        router.push("/dashboard/technician");
      } else if (userRole === "customer") {
        router.push("/dashboard/customer");
      } else {
        setErrorMessage("Your account role is not configured.");
        return;
      }

      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4 py-12">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-lg md:grid-cols-2">

        {/* Left Information Section */}
        <div className="flex flex-col justify-center bg-[#142D4E] p-8 text-white md:p-12">
          <Link
            href="/"
            className="mb-12 inline-flex w-fit items-center gap-3 text-2xl font-bold"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F59E0B]">
              <Wrench size={25} />
            </span>
            FixMate
          </Link>

          <span className="mb-4 text-sm font-bold uppercase tracking-wider text-[#F59E0B]">
            Welcome Back
          </span>

          <h1 className="mb-6 text-3xl font-extrabold leading-tight md:text-4xl">
            Your Repair Solutions
            <span className="block text-[#F59E0B]">
              Start Here.
            </span>
          </h1>

          <p className="mb-10 leading-8 text-slate-300">
            Sign in to your FixMate account to manage repair
            requests, track service progress, and connect
            with professional technicians.
          </p>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#F59E0B]">
              <ShieldCheck size={26} />
            </div>

            <div>
              <h3 className="mb-2 font-bold">
                Secure Account Access
              </h3>
              <p className="text-sm leading-6 text-slate-300">
                Access your account and manage your repair
                activities from one convenient platform.
              </p>
            </div>
          </div>
        </div>

        {/* Sign In Form */}
        <div className="flex flex-col justify-center p-6 md:p-12">
          <div className="mb-8">
            <h2 className="mb-3 text-3xl font-bold text-[#142D4E]">
              Sign In
            </h2>

            <p className="text-sm text-slate-500">
              Welcome back! Please enter your account details.
            </p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-6">

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-[#F59E0B] focus:ring-2 focus:ring-amber-100"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-200 py-3 pl-11 pr-12 outline-none transition focus:border-[#F59E0B] focus:ring-2 focus:ring-amber-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 accent-[#F59E0B]"
                />
                Remember Me
              </label>

              <Link
                href="/forgot-password"
                className="text-sm font-semibold text-[#F59E0B] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {errorMessage}
              </p>
            )}

            {/* Sign In Button */}
            <button
  type="button"
  onClick={() =>
    authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    })
  }
  className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-200 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
>
              {loading ? "Signing In..." : "Sign In"}
              {!loading && <ArrowRight size={19} />}
            </button>

            {/* Divider */}
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-slate-200" />
              <span className="mx-4 text-sm text-slate-400">
                Or continue with
              </span>
              <div className="flex-grow border-t border-slate-200" />
            </div>

            {/* Google Sign In */}
            <button
  type="button"
  onClick={() =>
    authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    })
  }
  className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-200 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
>
              <svg
                viewBox="0 0 48 48"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
                  transform="translate(0 4)"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.72 7.18l7.62 5.91c4.45-4.1 7.14-10.14 7.14-17.56Z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.92-2.14 15.9-5.89l-7.62-5.91c-2.12 1.42-4.84 2.26-8.28 2.26-6.37 0-11.77-4.3-13.7-10.1l-7.98 6.19C6.26 43.44 14.43 48 24 48Z"
                  transform="translate(0 -2)"
                />
                <path
                  fill="#FBBC05"
                  d="M10.3 28.36A14.4 14.4 0 0 1 9.5 24c0-1.51.27-2.98.76-4.36l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.85.92 7.49 2.56 10.55l7.74-6.19Z"
                />
              </svg>
              Continue with Google
            </button>

            {/* Sign Up Link */}
            <p className="pt-2 text-center text-sm text-slate-600">
              Don't have an account?{" "}
              <Link
                href="/sign-up"
                className="font-bold text-[#F59E0B] hover:underline"
              >
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
