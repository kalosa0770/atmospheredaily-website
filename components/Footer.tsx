// components/Footer.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';

const mainLinks = [
  { name: 'Home', href: '/' },
  { name: 'AD Connect', href: '/adconnect' },
  { name: 'Daily News', href: '/daily-news' },
  { name: 'Blog & Articles', href: '/blog' },
  { name: 'Spotlight', href: '/spotlight' },
  { name: 'My Store', href: '/store' },
  { name: 'About Us', href: '/about' },
];

const legalLinks = [
  { name: 'Terms of Use', href: '/terms' },
  { name: 'About Atmosphere Daily', href: '/about' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'Partner With Us', href: '/partner' },
  { name: 'Help & FAQs', href: '/faq' },
];

// Custom X (Twitter) icon
function XIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Custom Facebook icon
function FacebookIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

// Custom Instagram icon
function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

// Custom TikTok icon
function TikTokIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.98-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.56-1.31 1.53-1.29 2.53-.02.82.35 1.64.97 2.16.85.71 2.06.88 3.03.4 1.11-.53 1.81-1.68 1.83-2.91.02-4.52.01-9.04.01-13.56z" />
    </svg>
  );
}

// Custom WhatsApp icon
function WhatsAppIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

// Custom YouTube icon
function YoutubeIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white text-text border-t border-gray-200 font-body pt-8 pb-12 antialiased">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div className="mb-6">
          <Link href="/">
            <Image
              src="/logo.png"
              width={110}
              height={110}
              alt="Atmosphere Daily"
              className="h-6 md:h-8 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Primary Navigation Links */}
        <nav className="flex md:flex-row flex-col items-start gap-x-6 gap-y-3 mb-6">
          {mainLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[10px] md:text-xs font-heading text-text hover:text-red-700 hover:underline transition-colors uppercase tracking-wider"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6" />

        {/* Social Media Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
          <span className="text-xs sm:text-sm font-heading text-text">
            Follow Atmosphere Daily on:
          </span>
          <div className="flex flex-row items-center gap-4 text-slate-900">
            <a
              href="https://x.com/atmospheredaily"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="hover:text-red-700 transition-colors"
            >
              <XIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/share/1YMJJZMvZh/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-red-700 transition-colors"
            >
              <FacebookIcon className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/atmospheredaily_?igsh=ZjNjOGdrbmxjdnlj"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-red-700 transition-colors"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.tiktok.com/@atmosphere.daily0?_r=1&_t=ZS-98M9ISx7ebw"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="hover:text-red-700 transition-colors"
            >
              <TikTokIcon className="w-4 h-4" />
            </a>
            <a
              href="https://whatsapp.com/channel/0029Vb7Eo1AFcow11VmbE43J"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hover:text-red-700 transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com/@atmospheredaily?si=Hsd0rp74UKPEJAuou"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-red-700 transition-colors"
            >
              <YoutubeIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6" />

        {/* Legal & Utility Links */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-x-5 gap-y-2 mb-6">
          {legalLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[10px] md:text-xs text-slate-600 hover:text-red-700 hover:underline transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6" />

        {/* Copyright */}
        <p className="text-[10px] md:text-xs text-text">
          Copyright {currentYear} Atmosphere Daily. All rights reserved.
        </p>

      </div>
    </footer>
  );
}