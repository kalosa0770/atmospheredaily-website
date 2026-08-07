// components/SpotlightNewsFeed.tsx
'use client';

import { useEffect } from 'react';
import Script from 'next/script';

interface SpotlightNewsFeedProps {
  feedId: string;
}

export default function SpotlightNewsFeed({ feedId }: SpotlightNewsFeedProps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Juicer) {
      (window as any).Juicer.initialize();
    }
  }, [feedId]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Juicer Base Stylesheet */}
      <link
        rel="stylesheet"
        href="https://assets.juicer.io/embed.css"
        type="text/css"
      />

      {/* Custom Slider CSS */}
      <style jsx global>{`
        /* Convert feed container into a horizontal scroll container */
        ul.juicer-feed {
          display: flex !important;
          flex-direction: row !important;
          flex-wrap: nowrap !important;
          overflow-x: auto !important;
          overflow-y: hidden !important;
          scroll-snap-type: x mandatory !important;
          scroll-behavior: smooth !important;
          gap: 1.25rem !important;
          padding: 1rem 0 !important;
          margin: 0 !important;
          list-style: none !important;
          width: 100% !important;

          /* Hide scrollbar for Chrome, Safari, and Opera */
          -webkit-overflow-scrolling: touch;
        }

        ul.juicer-feed::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge, and Firefox */
        ul.juicer-feed {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }

        /* Set individual slide item dimensions and snap points */
        ul.juicer-feed > li.juicer-item {
          flex: 0 0 85% !important; /* Mobile: 85% width so next slide peek is visible */
          max-width: 85% !important;
          scroll-snap-align: start !important;
          float: none !important;
          margin: 0 !important;
          background-color: #ffffff !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 0.75rem !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06) !important;
          box-sizing: border-box !important;
        }

        /* Tablet slide width */
        @media (min-width: 640px) {
          ul.juicer-feed > li.juicer-item {
            flex: 0 0 45% !important;
            max-width: 45% !important;
          }
        }

        /* Desktop slide width (Shows ~3 slides in view) */
        @media (min-width: 1024px) {
          ul.juicer-feed > li.juicer-item {
            flex: 0 0 31% !important;
            max-width: 31% !important;
          }
        }
      `}</style>

        <h1 className="md:text-xl text-sm font-bold mb-4 text-left text-section-background font-title uppercase border-l-4 border-section-background pl-4">Daily News</h1>
      {/* Default Juicer Feed Container */}
      <ul className="juicer-feed" data-feed-id={feedId}></ul>

      {/* Juicer JS Script */}
     
      <Script
        src="https://www.juicer.io/embed/atmosphere-daily/embed-code.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (typeof window !== 'undefined' && (window as any).Juicer) {
            (window as any).Juicer.initialize();
          }
        }}
      />
    </div>
  );
}