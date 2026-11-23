
type Service = {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  basePrice: number;
  estimatedDuration: string;
  serviceMode: string;
  serviceArea: string;
  technicianName: string;
};

type PageProps = {
  searchParams: Promise<{
    search?: string;
    category?: string;
    sort?: string;
  }>;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const categories = [
  "Mobile & Gadgets",
  "Computer & Laptop",
  "Home Appliances",
  "Electronics",
];

async function getServices(
  search: string,
  category: string,
  sort: string
): Promise<Service[]> {
  try {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (category && category !== "all") {
      params.set("category", category);
    }
    if (sort) params.set("sort", sort);

    const response = await fetch(
      `${API_URL}/api/services?${params.toString()}`,
      { cache: "no-store" }
    );

    if (!response.ok) return [];

    const data = await response.json();
    return data.services || [];
  } catch (error) {
    console.error("Failed to load services:", error);
    return [];
  }
}

export default async function ServicesPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;

  const search = params.search || "";
  const category = params.category || "all";
  const sort = params.sort || "newest";

  const services = await getServices(search, category, sort);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Browse Repair Services
          </h1>
          <p className="mt-3 text-gray-600">
            Find trusted technicians for your repair needs.
          </p>
        </div>

        {/* Search and Filters */}
        <form
          method="GET"
          action="/services"
          className="mb-8 grid grid-cols-1 gap-4 rounded-xl bg-white p-5 shadow-sm md:grid-cols-4"
        >
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search services..."
            className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />

          <select
            name="category"
            defaultValue={category}
            className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="all">All Categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            name="sort"
            defaultValue={sort}
            className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Apply Filters
          </button>
        </form>

        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Available Services
          </h2>
          <p className="text-sm text-gray-500">
            {services.length} services found
          </p>
        </div>

        {/* Services */}
        {services.length === 0 ? (
          <div className="rounded-xl bg-white px-5 py-16 text-center shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800">
              No Services Found
            </h3>
            <p className="mt-2 text-gray-500">
              No approved services match your search. Try another search or category.
            </p>
            <a
              href="/services"
              className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Clear Filters
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service._id}
                className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={service.image || "/placeholder.png"}
                  alt={service.title}
                  className="h-52 w-full object-cover"
                />

                <div className="p-5">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    {service.category}
                  </span>

                  <h3 className="mt-4 text-xl font-bold text-gray-900">
                    {service.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                    {service.description}
                  </p>

                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <p>
                      <strong>Technician:</strong>{" "}
                      {service.technicianName || "Technician"}
                    </p>
                    <p>
                      <strong>Duration:</strong>{" "}
                      {service.estimatedDuration || "Not specified"}
                    </p>
                    <p>
                      <strong>Service Mode:</strong>{" "}
                      {service.serviceMode || "Not specified"}
                    </p>
                    <p>
                      <strong>Service Area:</strong>{" "}
                      {service.serviceArea || "Not specified"}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t pt-4">
                    <p className="text-lg font-bold text-blue-700">
                      ৳{Number(service.basePrice || 0).toLocaleString("en-BD")}
                    </p>

                    <a
                      href={`/services/${service._id}`}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
