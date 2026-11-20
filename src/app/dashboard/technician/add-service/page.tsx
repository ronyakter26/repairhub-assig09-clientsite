
"use client";

import Link from "next/link";
import { ArrowLeft, Upload, PlusCircle } from "lucide-react";

export default function AddServicePage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/dashboard/technician"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#F59E0B]"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#142D4E]">
            Add New Service
          </h1>
          <p className="mt-2 text-slate-500">
            Provide the details of the repair service you offer.
          </p>
        </div>

        <form className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Service Title
            </label>
            <input
              type="text"
              placeholder="e.g. Smartphone Screen Repair"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#F59E0B]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Category
            </label>
            <select
              required
              defaultValue=""
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#F59E0B]"
            >
              <option value="" disabled>Select a category</option>
              <option>Smartphone</option>
              <option>Laptop & PC</option>
              <option>Air Conditioner</option>
              <option>Refrigerator</option>
              <option>Television</option>
              <option>Washing Machine</option>
              <option>Electrical</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Service Description
            </label>
            <textarea
              rows={5}
              placeholder="Describe your repair service..."
              required
              className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#F59E0B]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Starting Price (৳)
            </label>
            <input
              type="number"
              min="1"
              placeholder="Enter starting price"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#F59E0B]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Service Mode
            </label>
            <select
              required
              defaultValue=""
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#F59E0B]"
            >
              <option value="" disabled>Select service mode</option>
              <option value="at-home">At Home</option>
              <option value="at-shop">At Shop</option>
              <option value="both">Both</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Service Image
            </label>
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 px-4 py-8 text-center transition hover:border-[#F59E0B]">
              <Upload size={30} className="mb-3 text-[#F59E0B]" />
              <span className="text-sm font-semibold text-[#142D4E]">
                Click to upload an image
              </span>
              <span className="mt-1 text-xs text-slate-400">
                PNG, JPG or JPEG
              </span>
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                className="hidden"
              />
            </label>
          </div>

          <div className="rounded-lg bg-orange-50 p-4 text-sm leading-6 text-orange-800">
            Your service will remain pending until an admin approves it.
          </div>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#F59E0B] py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            <PlusCircle size={19} />
            Submit Service
          </button>
        </form>
      </div>
    </main>
  );
}
