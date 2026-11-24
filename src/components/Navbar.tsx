
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Wrench, Menu, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "How It Works", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  const user = session?.user as
  | { role?: string; name?: string; email?: string; image?: string }
  | undefined;

  const dashboardHref =
    user?.role === "admin"
      ? "/dashboard/admin"
      : user?.role === "technician"
        ? "/dashboard/technician"
        : "/dashboard/customer";

  const handleSignOut = async () => {
    await authClient.signOut();
    setMenuOpen(false);
    router.push("/sign-in");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#142D4E] text-white">
            <Wrench size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-[#142D4E]">
              Fix<span className="text-[#F59E0B]">Mate</span>
            </h1>
            <p className="text-[10px] font-medium tracking-wider text-slate-500">
              REPAIR MADE EASY
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition ${
                pathname === link.href
                  ? "text-[#F59E0B]"
                  : "text-slate-600 hover:text-[#142D4E]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {!isPending &&
            (user ? (
              <>
                <Link
                  href={dashboardHref}
                  className="px-4 py-2.5 text-sm font-semibold text-[#142D4E] transition hover:text-[#F59E0B]"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleSignOut}
                  className="rounded-lg bg-[#142D4E] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-slate-700"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="px-4 py-2.5 text-sm font-semibold text-[#142D4E] transition hover:text-[#F59E0B]"
                >
                  Sign In
                </Link>

                <Link
                  href="/sign-up"
                  className="rounded-lg bg-[#F59E0B] px-5 py-2.5 text-sm font-bold text-[#142D4E] transition hover:bg-amber-400"
                >
                  Get Started
                </Link>
              </>
            ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-[#142D4E] hover:bg-slate-100 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-5 py-5 shadow-lg md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-semibold ${
                  pathname === link.href
                    ? "text-[#F59E0B]"
                    : "text-slate-700"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {!isPending && (
              <div className="flex flex-col gap-3 border-t border-slate-200 pt-4">
                {user ? (
                  <>
                    <Link
                      href={dashboardHref}
                      onClick={() => setMenuOpen(false)}
                      className="text-sm font-semibold text-[#142D4E]"
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="rounded-lg bg-[#142D4E] px-5 py-3 text-center text-sm font-bold text-white"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/sign-in"
                      onClick={() => setMenuOpen(false)}
                      className="text-sm font-semibold text-[#142D4E]"
                    >
                      Sign In
                    </Link>

                    <Link
                      href="/sign-up"
                      onClick={() => setMenuOpen(false)}
                      className="rounded-lg bg-[#F59E0B] px-5 py-3 text-center text-sm font-bold text-[#142D4E]"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
