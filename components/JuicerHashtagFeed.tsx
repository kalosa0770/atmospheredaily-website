// components/JuicerHashtagFeed.tsx
'use client';

import { useEffect, useId } from 'react';
import Script from 'next/script';
import { getPostFullText, extractHashtags } from '@/lib/hashtagFilter';

interface JuicerHashtagFeedProps {
  feedId: string;
  /** This section's hashtag, e.g. "#news" or "#blog" */
  tag: string;
  title?: string;
}

export default function JuicerHashtagFeed({
  feedId,
  tag,
  title,
}: JuicerHashtagFeedProps) {
  // Unique id so multiple instances of this component on the same page scope their filtering
  const containerId = useId().replace(/[:]/g, '');
  const normalizedTag = tag.toLowerCase();

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Juicer) {
      (window as any).Juicer.initialize();
    }

    const container = document.getElementById(containerId);
    if (!container) return;

    const filterPosts = () => {
      const items = container.querySelectorAll('.jcr-post, .juicer-item');

      items.forEach((item) => {
        const text = getPostFullText(item);
        const presentHashtags = extractHashtags(text);
        const shouldShow = presentHashtags.includes(normalizedTag);

        (item as HTMLElement).style.display = shouldShow ? '' : 'none';
      });
    };

    filterPosts();

    // Posts load asynchronously, so keep watching for new ones
    const observer = new MutationObserver(filterPosts);
    observer.observe(container, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [containerId, normalizedTag]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

      <ul
        id={containerId}
        className="juicer-feed jcr-feed"
        data-feed-id={feedId}
        data-endpoint="https://www.juicer.io/api"
        data-overlay="true"
        data-per="100"
        data-page="1"
      ></ul>

      <Script
        src={`https://www.juicer.io/embed/${feedId}/embed-code.js`}
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