// app/store/page.tsx
import Link from 'next/link';
import { Loader2, ShoppingBag, ArrowLeft, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'My Store | Atmosphere Daily',
  description: 'Atmosphere Daily official merchandise and kingdom resource store coming soon.',
};

export default function StorePage() {
  return (
    <main className="w-full min-h-[80vh] bg-background text-text font-body antialiased flex items-center justify-center px-4 py-24">
      <div className="w-full max-w-xl bg-white border border-text/15 p-8 sm:p-12 text-center shadow-sm rounded-none relative">
        
        {/* Accent Top Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-button-hover" />

        {/* Animated Spinner Icon Container */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-section-background text-button-hover mb-6 rounded-none relative">
          <ShoppingBag className="w-6 h-6 absolute" />
          <Loader2 className="w-12 h-12 animate-spin text-button-hover/40" />
        </div>

        {/* Category Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-background border border-text/10 mb-4 rounded-none">
          <Sparkles className="w-3.5 h-3.5 text-section-background" />
          <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-text/70">
            Official Merchandise & Resources
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-4xl font-heading font-extrabold uppercase tracking-tight text-text mb-3">
          Store Launching Soon
        </h1>

        {/* Description */}
        <p className="text-xs sm:text-sm text-text/70 leading-relaxed max-w-md mx-auto mb-8 font-body">
          We are currently preparing our exclusive collection of kingdom apparel, co-branded merchandise, and curated digital resources. Check back soon for our official drop!
        </p>

        {/* Newsletter / Contact Form Shortcut */}
        <div className="bg-background/60 border border-text/10 p-4 mb-8 text-left rounded-none">
          <label 
            htmlFor="notify-email" 
            className="block text-[10px] font-heading font-bold uppercase tracking-wider text-text mb-2"
          >
            Get Notified On Drop
          </label>
          <div className="flex items-center gap-2">
            <input
              id="notify-email"
              type="email"
              placeholder="Enter your email address"
              className="w-full px-3 py-2 text-xs text-text bg-white border border-text/20 focus:border-section-background focus:outline-none rounded-none placeholder:text-text/40"
            />
            <button
              type="button"
              className="bg-button-background hover:bg-button-hover hover:text-text text-section-text font-heading text-[10px] font-bold uppercase tracking-wider px-4 py-2 transition-colors shrink-0 rounded-none cursor-pointer"
            >
              Notify Me
            </button>
          </div>
        </div>

        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-section-background hover:text-button-hover transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back To Home
        </Link>

      </div>
    </main>
  );
}