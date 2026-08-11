'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, User, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Daily Devotion", href: "/devotion" },
  { id: 3, name: "Daily News", href: "/news" },
  { id: 4, name: "Blog & Articles", href: "/blogs" },
  { id: 5, name: "Spotlight", href: "/spotlight" },
  { id: 6, name: "My Store", href: "/store" },
  { id: 7, name: "About Us", href: "/about" }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    // Padding top prevents underlying page content (like Juicer feed) from clipping under fixed header
    <header className="w-full pt-12 md:pt-16">
      <div
        className={`fixed top-0 left-0 right-0 w-full flex items-center justify-between md:justify-center font-heading px-4 md:px-8 z-50 transition-all duration-200 ${
          isScrolled || isOpen ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center pr-6">
          <Link href="/">
            <Image
              src="/logo.png"
              width={110}
              height={110}
              alt="Logo"
              className="md:w-16 md:h-16 w-12 h-12 object-contain"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <section className="hidden md:flex items-center justify-center">
          {navLinks.map((link) => (
            <nav className="px-4" key={link.id}>
              <Link
                href={link.href}
                className="uppercase tracking-wider text-[12px] font-medium text-slate-800 hover:text-slate-900 hover:underline transition-all duration-150"
              >
                {link.name}
              </Link>
            </nav>
          ))}
        </section>

        {/* Desktop Actions */}
        <div className="hidden md:inline-flex ml-4">
          <Link
            href="/login"
            className="flex items-center gap-2 bg-section-background rounded-full text-white hover:bg-section-hover px-5 py-2.5 transition-all"
          >
            <User className="w-4 h-4" />
            <span className="uppercase text-[12px] tracking-wider font-semibold">
              Login
            </span>
          </Link>
        </div>

        {/* Mobile Actions & Toggle */}
        <section className="md:hidden flex items-center gap-4 z-50">
          <Link
            href="/login"
            className="flex items-center justify-center bg-section-background rounded-full text-white p-1"
          >
            <User className="w-4 h-4" />
          </Link>
          <button
            onClick={toggleMenu}
            aria-label="Toggle Navigation"
            className="p-1 text-slate-900 focus:outline-none border-1 border-text/10 rounded-full"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </section>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 w-full h-screen bg-background flex flex-col items-left justify-center py-12 px-6 overflow-y-auto z-40"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <div key={link.id} className="flex flex-col gap-2">
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="uppercase text-text text-sm font-medium tracking-wider hover:text-background-hover transition-colors"
                  >
                    {link.name}
                    <div className="border-t border-text w-full mt-3" />
                  </Link>
                  
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}