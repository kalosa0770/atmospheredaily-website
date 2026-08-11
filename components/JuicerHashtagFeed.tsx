// components/JuicerHashtagFeed.tsx
'use client';

import { useEffect, useId, useState, useRef } from 'react';
import Script from 'next/script';
import { Loader2 } from 'lucide-react';
import { filterPostsInContainer } from '@/lib/hashtagFilter';

interface JuicerHashtagFeedProps {
  feedId: string;
  /** Hashtag filter string, e.g. "#news" or "#blog" */
  tag: string;
  title?: string;
  /** Minimum delay in milliseconds to keep the spinner visible (default: 1000ms) */
  delayMs?: number;
}

export default function JuicerHashtagFeed({
  feedId,
  tag,
  title,
  delayMs = 5000,
}: JuicerHashtagFeedProps) {
  const containerId = useId().replace(/[:]/g, '');
  const [isLoading, setIsLoading] = useState(true);
  const [hasMatches, setHasMatches] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Juicer) {
      (window as any).Juicer.initialize();
    }

    const container = document.getElementById(containerId);
    if (!container) return;

    const runFilter = () => {
      const { totalItems, visibleCount } = filterPostsInContainer(container, tag);

      // Once Juicer injects post items into the DOM
      if (totalItems > 0) {
        if (!timerRef.current) {
          // Delay content reveal to allow full image/text rendering & smooth spinner experience
          timerRef.current = setTimeout(() => {
            setIsLoading(false);
            setHasMatches(visibleCount > 0);
          }, delayMs);
        }
      }
    };

    runFilter();

    const observer = new MutationObserver(runFilter);
    observer.observe(container, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [containerId, tag, delayMs]);

  // Handle direct card clicks to social platforms
  const handleFeedClick = (e: React.MouseEvent<HTMLUListElement>) => {
    e.stopPropagation();

    const targetEl = e.target as HTMLElement;

    // 1. Direct anchor tag click
    const directAnchor = targetEl.closest<HTMLAnchorElement>('a[href]');
    if (
      directAnchor &&
      directAnchor.href &&
      !directAnchor.href.endsWith('#') &&
      !directAnchor.href.startsWith('javascript:')
    ) {
      window.open(directAnchor.href, '_blank', 'noopener,noreferrer');
      return;
    }

    // 2. Identify parent post card
    const postElement = targetEl.closest<HTMLElement>(
      '.jcr-post, .juicer-item, .j-stack, .j-poster, li'
    );

    if (!postElement) return;

    // 3. Post element itself is an anchor tag
    if (
      postElement instanceof HTMLAnchorElement &&
      postElement.href &&
      !postElement.href.endsWith('#')
    ) {
      window.open(postElement.href, '_blank', 'noopener,noreferrer');
      return;
    }

    // 4. Search for social network link targets
    const anchors = Array.from(
      postElement.querySelectorAll<HTMLAnchorElement>('a[href]')
    );
    if (postElement instanceof HTMLAnchorElement) {
      anchors.unshift(postElement);
    }

    const socialLink = anchors.find((a) => {
      const href = a.href || '';
      return (
        href.includes('facebook.com') ||
        href.includes('fb.watch') ||
        href.includes('instagram.com') ||
        href.includes('twitter.com') ||
        href.includes('x.com') ||
        href.includes('linkedin.com')
      );
    });

    if (socialLink && socialLink.href) {
      window.open(socialLink.href, '_blank', 'noopener,noreferrer');
      return;
    }

    // 5. Fallback to Juicer data attributes
    const dataUrl =
      postElement.getAttribute('data-url') ||
      postElement.getAttribute('data-permalink') ||
      postElement.getAttribute('data-external-url') ||
      postElement.getAttribute('data-link') ||
      postElement.querySelector('[data-url]')?.getAttribute('data-url') ||
      postElement.querySelector('[data-permalink]')?.getAttribute('data-permalink');

    if (dataUrl && dataUrl.startsWith('http')) {
      window.open(dataUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    // 6. Generic external link fallback
    const fallbackLink = anchors.find(
      (a) =>
        a.href &&
        a.href.startsWith('http') &&
        !a.href.includes(window.location.hostname)
    );

    if (fallbackLink) {
      window.open(fallbackLink.href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 overflow-x-hidden font-body">
      <link
        rel="stylesheet"
        href="https://assets.juicer.io/embed.css"
        type="text/css"
      />

      {title && (
        <h1 className="md:text-base text-[10px] font-bold mb-4 text-left font-title uppercase border-l-4 border-section-background pl-4">
          {title}
        </h1>
      )}

      {/* Standalone React Spinner Loader */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-16 w-full space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-red-700" />
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500">
            Fetching Posts...
          </p>
        </div>
      )}

      {/* Empty State Notice */}
      {!isLoading && !hasMatches && (
        <div className="flex items-center justify-center py-12 text-slate-400 text-xs sm:text-sm font-semibold uppercase tracking-wider">
          No posts found for {tag}
        </div>
      )}

      {/* Juicer Inject Target Container */}
      <ul
        id={containerId}
        onClickCapture={handleFeedClick}
        className={`
          juicer-feed jcr-feed w-full max-w-full overflow-x-hidden list-none p-0 m-0 font-sans text-sm items-start
          !grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3 gap-6 lg:gap-8
          transition-opacity duration-300
          ${isLoading || !hasMatches ? 'opacity-0 h-0 overflow-hidden pointer-events-none' : 'opacity-100 h-auto'}

          /* Universal min-width reset to stop horizontal scrollbars */
          [&_*]:!min-w-0 [&_*]:!max-w-full [&_*]:!box-border

          /* Card Containers */
          [&_.jcr-post]:!w-full [&_.jcr-post]:!max-w-full [&_li]:!w-full [&_li]:!max-w-full
          [&_.jcr-post]:!flex [&_.jcr-post]:!flex-col [&_.jcr-post]:!static [&_.jcr-post]:!bg-white [&_.jcr-post]:!border-b [&_.jcr-post]:!border-gray-200 [&_.jcr-post]:!pb-5 [&_.jcr-post]:!cursor-pointer [&_.jcr-post]:!transition-colors [&_.jcr-post]:hover:!border-red-700
          [&_li]:!flex [&_li]:!flex-col [&_li]:!static [&_li]:!bg-white [&_li]:!border-b [&_li]:!border-gray-200 [&_li]:!pb-5 [&_li]:!cursor-pointer [&_li]:!transition-colors [&_li]:hover:!border-red-700
          
          /* Neutralize Juicer Modal Overlays */
          [&_.jcr-post-overlay]:!static [&_.jcr-post-overlay]:!flex [&_.jcr-post-overlay]:!flex-col [&_.jcr-post-overlay]:!p-0 [&_.jcr-post-overlay]:!bg-transparent [&_.jcr-post-overlay]:!w-full

          /* 1. Images */
          [&_img]:!static [&_img]:!block [&_img]:!w-full [&_img]:!h-48 [&_img]:!object-cover [&_img]:!bg-gray-100 [&_img]:!mb-3 [&_img]:!order-1 [&_img]:!pointer-events-none
          [&_.jcr-post-image]:!h-48 [&_.jcr-post-image]:!w-full [&_.jcr-post-image]:!object-cover [&_.jcr-post-image]:!order-1

          /* 2. Metadata Header & Timestamps */
          [&_.jcr-post-header]:!static [&_.jcr-post-header]:!flex [&_.jcr-post-header]:!items-center [&_.jcr-post-header]:!w-full [&_.jcr-post-header]:!mb-2 [&_.jcr-post-header]:!order-2
          [&_.jcr-author-name]:!hidden
          [&_.jcr-post-timestamp]:!ml-auto [&_.jcr-post-timestamp]:!text-[11px] [&_.jcr-post-timestamp]:!font-semibold [&_.jcr-post-timestamp]:!text-gray-500 [&_.jcr-post-timestamp]:!uppercase

          /* 3. Text Message & Headlines */
          [&_.jcr-post-content]:!static [&_.jcr-post-content]:!block [&_.jcr-post-content]:!w-full [&_.jcr-post-content]:!order-3
          [&_.jcr-post-message]:!static [&_.jcr-post-message]:!line-clamp-4 [&_.jcr-post-message]:!font-bold [&_.jcr-post-message]:!text-[13px] sm:[&_.jcr-post-message]:!text-[14px] [&_.jcr-post-message]:!text-gray-900 [&_.jcr-post-message]:!leading-snug [&_.jcr-post-message]:!break-words
        `}
        data-feed-id={feedId}
        data-overlay="false"
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