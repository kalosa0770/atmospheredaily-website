// components/SpotlightNews.tsx
'use client';

import { useJuicerFeedTarget } from '@/components/JuicerFeedProvider';

interface SpotlightNewsProps {
  filterHashtag: string;
  title?: string;
}

export default function SpotlightNews({
  filterHashtag,
  title = "Daily News",
}: SpotlightNewsProps) {
  // Register this section's container element as the target for #news
  const targetRef = useJuicerFeedTarget<HTMLUListElement>(filterHashtag);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      {title && (
        <h1 className="md:text-xl text-sm font-bold mb-6 text-left text-section-background font-title uppercase border-l-4 border-section-background pl-4">
          {title}
        </h1>
      )}

      {/* Routed posts carrying #news will be dynamically appended here */}
      <ul ref={targetRef} className="juicer-feed jcr-feed"></ul>
    </section>
  );
}