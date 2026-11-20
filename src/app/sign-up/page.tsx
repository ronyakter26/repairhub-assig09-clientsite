
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Wrench,
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  UserRound,
  BriefcaseBusiness,
  ShieldCheck,
} from "lucide-react";

export default function SignUpPage() {
  const [role, setRole] = useState("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4 py-12">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-lg md:grid-cols-2">

        {/* Left Information Section */}
        <div className="flex flex-col justify-center bg-[#142D4E] p-8 text-white md:p-12">
          <Link
            href="/"
            className="mb-10 inline-flex w-fit items-center gap-3 text-2xl font-bold"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F59E0B]">
              <Wrench size={25} />
            </span>
            FixMate
          </Link>

          <span className="mb-4 text-sm font-bold uppercase tracking-wider text-[#F59E0B]">
            Join FixMate Today
          </span>

          <h1 className="mb-6 text-3xl font-extrabold leading-tight md:text-4xl">
            Start Your Journey With
            <span className="block text-[#F59E0B]">FixMate</span>
          </h1>

          <p className="mb-10 leading-8 text-slate-300">
            Join our repair service marketplace. Find reliable
            technicians for your repair needs or grow your
            business by offering professional repair services.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#F59E0B]">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="mb-1 font-bold">Trusted Professionals</h3>
                <p className="text-sm leading-6 text-slate-300">
                  Connect with technicians through an approval-based platform.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#F59E0B]">
                <Wrench size={24} />
              </div>
              <div>
                <h3 className="mb-1 font-bold">Easy Repair Management</h3>
                <p className="text-sm leading-6 text-slate-300">
                  Manage repair requests and track service progress easily.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sign Up Form */}
        <div className="p-6 md:p-12">
          <div className="mb-8">
            <h2 className="mb-2 text-3xl font-bold text-[#142D4E]">
              Create Account
            </h2>
            <p className="text-sm text-slate-500">
              Enter your information to get started.
            </p>
          </div>

          <form className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Full Name
              </label>
              <div className="relative">
                <User
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  required
                  className="w-full rounded-lg border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-[#F59E0B] focus:ring-2 focus:ring-amber-100"
                />
              </div>
            </div>

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
                  placeholder="example@email.com"
                  required
                  className="w-full rounded-lg border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-[#F59E0B] focus:ring-2 focus:ring-amber-100"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Phone Number
              </label>
              <div className="relative">
                <Phone
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  required
                  className="w-full rounded-lg border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-[#F59E0B] focus:ring-2 focus:ring-amber-100"
                />
              </div>
            </div>

            {/* Area */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Area / Address
              </label>
              <div className="relative">
                <MapPin
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Enter your area or address"
                  required
                  className="w-full rounded-lg border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-[#F59E0B] focus:ring-2 focus:ring-amber-100"
                />
              </div>
            </div>

            {/* Account Role */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-700">
                Select Account Type
              </label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("customer")}
                  className={`flex items-center justify-center gap-2 rounded-lg border p-4 font-semibold transition ${
                    role === "customer"
                      ? "border-[#F59E0B] bg-amber-50 text-[#142D4E]"
                      : "border-slate-200 text-slate-500"
                  }`}
                >
                  <UserRound size={20} />
                  Customer
                </button>

                <button
                  type="button"
                  onClick={() => setRole("technician")}
                  className={`flex items-center justify-center gap-2 rounded-lg border p-4 font-semibold transition ${
                    role === "technician"
                      ? "border-[#F59E0B] bg-amber-50 text-[#142D4E]"
                      : "border-slate-200 text-slate-500"
                  }`}
                >
                  <BriefcaseBusiness size={20} />
                  Technician
                </button>
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
                  placeholder="Create a password"
                  required
                  minLength={8}
                  className="w-full rounded-lg border border-slate-200 py-3 pl-11 pr-12 outline-none transition focus:border-[#F59E0B] focus:ring-2 focus:ring-amber-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>

              <p className="mt-2 text-xs text-slate-400">
                Password must be at least 8 characters.
              </p>
            </div>

            {/* Terms */}
            <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-slate-600">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 h-4 w-4 accent-[#F59E0B]"
              />
              <span>
                I agree to the Terms & Conditions and Privacy Policy.
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={!agreed}
              className="w-full rounded-lg bg-[#F59E0B] py-4 font-bold text-[#142D4E] transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Create Account
            </button>

            <p className="text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-bold text-[#F59E0B] hover:underline"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
