// components/Navbar.tsx
'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, User, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "AD Connect", href: "/adconnect" },
  { id: 3, name: "Daily News", href: "/daily-news" },
  { id: 4, name: "Blog & Articles", href: "/blog" },
  { id: 5, name: "Spotlight", href: "/spotlight" },
  { id: 6, name: "My Store", href: "/store" },
  { id: 7, name: "About Us", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="w-full pt-12 md:pt-16 font-body antialiased">
      <div
        className={`fixed top-0 left-0 right-0 w-full backdrop-blur-md shadow-sm flex items-center justify-between md:justify-center px-4 md:px-8 z-50 transition-all duration-200 border-b border-gray-100 ${
          isScrolled || isOpen ? "bg-white/95" : "bg-white/80"
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
        <nav className="hidden md:flex items-center justify-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <div className="px-3 lg:px-4" key={link.id}>
                <Link
                  href={link.href}
                  className={`uppercase tracking-wider font-heading text-[10px] transition-all duration-150 relative py-2 ${
                    isActive
                      ? "text-section-background"
                      : "text-text hover:text-section-background"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-section-background rounded-none"
                    />
                  )}
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:inline-flex ml-4">
          <Link
            href="/login"
            className="flex items-center gap-2 bg-text text-white hover:bg-section-background px-5 py-2 transition-colors rounded-none"
          >
            <User className="w-4 h-4" />
            <span className="uppercase text-[10px] tracking-wider">
              Login
            </span>
          </Link>
        </div>

        {/* Mobile Actions & Toggle */}
        <section className="md:hidden flex items-center gap-4 z-50">
          <Link
            href="/login"
            className="flex items-center justify-center bg-text text-white p-1 rounded-none"
          >
            <User className="w-4 h-4" />
          </Link>
          <button
            onClick={toggleMenu}
            aria-label="Toggle Navigation"
            className="p-1 text-text border border-text/20 rounded-none focus:outline-none bg-white"
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
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 w-full h-screen bg-white flex flex-col justify-center py-32 my-6 px-6 overflow-y-auto z-40"
          >
            <nav className="flex flex-col gap-5 max-w-sm w-full mx-auto">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <div key={link.id} className="flex flex-col">
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`uppercase text-[10px] font-heading tracking-wider py-2 transition-colors ${
                        isActive ? "text-section-background" : "text-section-background hover:text-section-background"
                      }`}
                    >
                      {link.name}
                    </Link>
                    <div className="border-t border-text/10 w-full mt-2" />
                  </div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}