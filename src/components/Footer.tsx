
import Link from "next/link";
import { Wrench, Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About Us", href: "/about" },
  { name: "Sign In", href: "/sign-in" },
];

const categories = [
  "Smartphone Repair",
  "Laptop & PC",
  "AC Repair",
  "Refrigerator Repair",
  "TV Repair",
  "Washing Machine Repair",
  "Electrical Services",
];

const socialLinks = [
  { name: "f", label: "Facebook", href: "https://facebook.com" },
  { name: "◎", label: "Instagram", href: "https://instagram.com" },
  { name: "in", label: "LinkedIn", href: "https://linkedin.com" },
  { name: "𝕏", label: "X", href: "https://x.com" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0D2038] px-6 pt-16 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="grid gap-12 pb-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="mb-5 inline-flex items-center gap-2 text-2xl font-bold"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F59E0B]">
                <Wrench size={23} />
              </span>
              FixMate
            </Link>

            <p className="mb-6 max-w-xs text-sm leading-7 text-slate-300">
              Your trusted partner for finding professional repair
              services. We make repairs simple, reliable, and affordable.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-700 font-bold transition hover:bg-[#F59E0B]"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-bold">Quick Links</h3>

            <ul className="space-y-4 text-sm text-slate-300">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="transition hover:text-[#F59E0B]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-6 text-lg font-bold">Our Services</h3>

            <ul className="space-y-4 text-sm text-slate-300">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    href="/services"
                    className="transition hover:text-[#F59E0B]"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="mb-6 text-lg font-bold">Contact Us</h3>

            <ul className="space-y-5 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <MapPin
                  size={19}
                  className="mt-1 shrink-0 text-[#F59E0B]"
                />
                <span>Chattogram, Chandanaish, Bangladesh</span>
              </li>

              <li className="flex items-center gap-3">
                <Phone size={19} className="shrink-0 text-[#F59E0B]" />
                <span>Contact number coming soon</span>
              </li>

              <li className="flex items-center gap-3">
                <Mail size={19} className="shrink-0 text-[#F59E0B]" />
                <span>Email information coming soon</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-700 py-6 text-center text-sm text-slate-400">
© 2026 FixMate. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
