
import Link from "next/link";
import { UserRound, ArrowLeft } from "lucide-react";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-[#F59E0B]"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#142D4E]">
            My Profile
          </h1>
          <p className="mt-2 text-slate-500">
            View and manage your personal information.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8 flex items-center gap-4 border-b border-slate-100 pb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <UserRound size={32} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#142D4E]">
                Profile Information
              </h2>
              <p className="text-sm text-slate-500">
                Update your account details.
              </p>
            </div>
          </div>

          <form className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#F59E0B]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#F59E0B]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#F59E0B]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Area / Address
              </label>
              <input
                type="text"
                placeholder="Enter your area or address"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#F59E0B]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Bio
              </label>
              <textarea
                rows={4}
                placeholder="Write something about yourself"
                className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#F59E0B]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Account Role
              </label>
              <input
                type="text"
                value="Customer / Technician / Admin"
                readOnly
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500 outline-none"
              />
            </div>

            <button
              type="button"
              className="w-full rounded-lg bg-[#142D4E] px-6 py-3 font-semibold text-white transition hover:bg-[#1e416d] sm:w-auto"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
