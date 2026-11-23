
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, PlusCircle, X } from "lucide-react";
import { toast } from "sonner";
import { fetchWithAuth } from "@/lib/api";

export default function AddServicePage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!imagePreview) return;

    return () => {
      URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!["image/png", "image/jpeg"].includes(file.type)) {
      toast.error("Please select a PNG or JPG image.");
      event.target.value = "";
      return;
    }

    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
    toast.success("Image selected successfully!");
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (!selectedImage) {
      toast.error("Please select a service image.");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Upload image to ImgBB
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

      if (!apiKey) {
        throw new Error("ImgBB API Key not found.");
      }

      const imageData = new FormData();
      imageData.append("image", selectedImage);

      const imageResponse = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: imageData,
        }
      );

      const imageResult = await imageResponse.json();

      if (!imageResponse.ok || !imageResult.success) {
        throw new Error(
          imageResult.error?.message || "Image upload failed."
        );
      }

      const imageUrl = imageResult.data.url;

      // Step 2: Prepare service data
      const formData = new FormData(form);

      const serviceData = {
        title: String(formData.get("title")).trim(),
        category: String(formData.get("category")),
        description: String(formData.get("description")).trim(),
        basePrice: Number(formData.get("basePrice")),
        estimatedDuration: String(
          formData.get("estimatedDuration")
        ).trim(),
        serviceMode: String(formData.get("serviceMode")),
        serviceArea: String(formData.get("serviceArea")).trim(),
        image: imageUrl,
      };

      if (serviceData.basePrice <= 0) {
        throw new Error("Base price must be greater than 0.");
      }

      // Step 3: Save service to backend
      const response = await fetchWithAuth("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit service.");
      }

      toast.success("Service submitted successfully!");

      form.reset();
      setSelectedImage(null);
      setImagePreview("");
    } catch (error) {
      console.error("Add service error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

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

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Service Title
            </label>
            <input
              type="text"
              name="title"
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
              name="category"
              required
              defaultValue=""
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#F59E0B]"
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Smartphone">Smartphone</option>
              <option value="Laptop & PC">Laptop & PC</option>
              <option value="Air Conditioner">Air Conditioner</option>
              <option value="Refrigerator">Refrigerator</option>
              <option value="Television">Television</option>
              <option value="Washing Machine">Washing Machine</option>
              <option value="Electrical">Electrical</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Service Description
            </label>
            <textarea
              name="description"
              rows={5}
              placeholder="Describe your repair service..."
              required
              className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#F59E0B]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Base Price (৳)
            </label>
            <input
              type="number"
              name="basePrice"
              min="1"
              placeholder="Enter base price"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#F59E0B]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Service Mode
            </label>
            <select
              name="serviceMode"
              required
              defaultValue=""
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-[#F59E0B]"
            >
              <option value="" disabled>
                Select service mode
              </option>
              <option value="Home Visit">Home Visit</option>
              <option value="Shop Drop-off">Shop Drop-off</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Estimated Duration
            </label>
            <input
              type="text"
              name="estimatedDuration"
              placeholder="e.g. 1-2 hours"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#F59E0B]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Service Area
            </label>
            <input
              type="text"
              name="serviceArea"
              placeholder="e.g. Chattogram"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-[#F59E0B]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Service Image
            </label>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 px-4 py-8 text-center transition hover:border-[#F59E0B]">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Service preview"
                    className="h-48 w-full rounded-lg object-cover"
                  />

                  <button
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      setSelectedImage(null);
                      setImagePreview("");

                      const input = document.getElementById(
                        "service-image"
                      ) as HTMLInputElement;

                      if (input) input.value = "";
                    }}
                    className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <Upload size={30} className="mb-3 text-[#F59E0B]" />
                  <span className="text-sm font-semibold text-[#142D4E]">
                    Click to upload an image
                  </span>
                  <span className="mt-1 text-xs text-slate-400">
                    PNG, JPG or JPEG
                  </span>
                </>
              )}

              <input
                id="service-image"
                type="file"
                accept="image/png,image/jpeg"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="rounded-lg bg-orange-50 p-4 text-sm leading-6 text-orange-800">
            Your service will remain pending until an admin approves it.
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#F59E0B] py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <PlusCircle size={19} />
            {loading ? "Submitting..." : "Submit Service"}
          </button>
        </form>
      </div>
    </main>
  );
}
