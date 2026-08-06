'use client';
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, User, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";


const navLinks = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Daily Devotion", href: "/devotion" },
  { id: 3, name: "Daily News", href: "/news" },
  { id: 4, name: "Blog & Articles", href: "/blogs"},
  { id: 5, name: "Spotlight", href: "/spotlight" },
  { id: 6, name: "My Store", href: "/store"},
  { id: 7, name: "About Us", href: "/about"}
];
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <header className="w-full max-w-6xl flex flex-col overflow-hidden">
        <div className={`fixed top-0 left-0 right-0 w-full flex items-center md:justify-center justify-between md:mx-auto font-heading md:py-8 py-1 px-3 z-50 ${isOpen ? "bg-background shadow-md" : "bg-transparent"} transition duration-100`}>
            <div className="flex pr-6">
                <Image src='/logo.png' width={110} height={110} alt="Logo" className="md:w-24 md:h-24 w-22 h-22 object-contain" />
            </div>
            <section className="hidden md:flex px-3 items-center justify-center">
                {navLinks.map((links => (
                    <nav className="px-6 text-text" key={links.id}>
                        <Link href={links.href} className="uppercase tracking-wider text-[12px] hover:underline transition:underline duration-60">{links.name}</Link>
                    </nav>
                )))}
            </section>
            <section className="md:hidden flex items-center justify-center gap-6">
                <button onClick={toggleMenu} className="items-center justify-center z-40">
                    {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                </button>
                <Link href='/login' className="flex gap-6 bg-button-background rounded-full items-center text-white hover:button-hover p-2">
                    <User className="w-7 h-7"/>
                    <span className="hidden md:inline-block">Login</span>
                </Link>
            </section>
            <div className="hidden md:inline-flex">
            <Link href='/login' className="flex gap-2 bg-button-background rounded-full items-center text-white hover:button-hover px-4 py-2">
                    <User className="w-6 h-6"/>
                    <span className=" uppercase text-[12px] tracking-wider">Login</span>
                </Link>
            </div>
        </div>

        {/* Menu Links */}
        <AnimatePresence>
            {isOpen && 
                <motion.div 
                    initial={{ x: 150, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }} 
                    exit={{ x: 150, opacity: 0 }}
                    transition={{ duration: 0.6}}
                    className="fixed top-0 left-0 flex flex-col gap-8 w-full h-screen py-42 bg-text items-left h-screen justify-start"
                >
                    {navLinks.map((links => (
                        <nav className="px-6 text-text flex-1 overflow-y-auto" key={links.id}>
                            <Link href={links.href} className="uppercase text-white text-[12px] hover:underline transition:underline duration-60">{links.name}</Link>
                            <div className="border-t-1 border-gray-100 mt-4 w-full" />
                        </nav>
                    )))}
                </motion.div>
            }
        </AnimatePresence>
    
    </header>
  )
}
