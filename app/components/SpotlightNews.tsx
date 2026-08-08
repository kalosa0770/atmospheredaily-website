// components/SpotlightNewsFeed.tsx
'use client';

import { useEffect } from 'react';
import Script from 'next/script';

interface SpotlightNewsFeedProps {
  feedId: string;
  filterHashtag?: string;
  title?: string;
}

export default function SpotlightNewsFeed({
  feedId,
  filterHashtag,
  title = "Daily News",
}: SpotlightNewsFeedProps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Juicer) {
      (window as any).Juicer.initialize();
    }

    if (!filterHashtag) return;

    // Filter posts based on hashtag text present in the card
    const filterPosts = () => {
      const items = document.querySelectorAll('.juicer-feed > li.juicer-item');
      items.forEach((item) => {
        const text = item.textContent || '';
        const matches = text.toLowerCase().includes(filterHashtag.toLowerCase());
        (item as HTMLElement).style.display = matches ? 'flex' : 'none';
      });
    };

    // Observe Juicer feed container for DOM updates as posts load asynchronously
    const feedContainer = document.querySelector('.juicer-feed');
    if (feedContainer) {
      const observer = new MutationObserver(filterPosts);
      observer.observe(feedContainer, { childList: true, subtree: true });
      return () => observer.disconnect();
    }
  }, [feedId, filterHashtag]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Juicer Base Stylesheet */}
      <link
        rel="stylesheet"
        href="https://assets.juicer.io/embed.css"
        type="text/css"
      />

      {title && (
        <h1 className="md:text-xl text-sm font-bold mb-4 text-left text-section-background font-title uppercase border-l-4 border-section-background pl-4">
          {title}
        </h1>
      )}

      {/* Juicer Target Container */}
      <ul
        className="juicer-feed jcr-feed"
        data-feed-id={feedId}
        data-overlay="true"
      ></ul>

      {/* Juicer Global Script */}
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