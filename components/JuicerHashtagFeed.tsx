// components/JuicerHashtagFeed.tsx
'use client';

import { useEffect, useId, useState } from 'react';
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
  const containerId = useId().replace(/[:]/g, '');
  const normalizedTag = tag.toLowerCase();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Juicer) {
      (window as any).Juicer.initialize();
    }

    const container = document.getElementById(containerId);
    if (!container) return;

    const filterPosts = () => {
      const items = container.querySelectorAll('.jcr-post, .juicer-item, li');

      if (items.length > 0) {
        setIsLoading(false);
      }

      items.forEach((item) => {
        const text = getPostFullText(item);
        const presentHashtags = extractHashtags(text);
        const shouldShow = presentHashtags.includes(normalizedTag);

        const el = item as HTMLElement;
        if (shouldShow) {
          el.classList.remove('hidden');
          el.style.setProperty('display', 'flex', 'important');
        } else {
          el.classList.add('hidden');
          el.style.setProperty('display', 'none', 'important');
        }
      });
    };

    filterPosts();

    const observer = new MutationObserver(filterPosts);
    observer.observe(container, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [containerId, normalizedTag]);

 const handleFeedClick = (e: React.MouseEvent<HTMLUListElement>) => {
  e.stopPropagation();

  const targetEl = e.target as HTMLElement;

  // 1. Check if the clicked element itself or a parent is a direct <a> tag
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

  // 2. Identify the post card container or list item
  const postElement = targetEl.closest<HTMLElement>(
    '.jcr-post, .juicer-item, .j-stack, .j-poster, li'
  );

  if (!postElement) return;

  // 3. Check if the post container itself is an anchor tag
  if (
    postElement instanceof HTMLAnchorElement &&
    postElement.href &&
    !postElement.href.endsWith('#')
  ) {
    window.open(postElement.href, '_blank', 'noopener,noreferrer');
    return;
  }

  // 4. Gather ALL <a> tags on or inside the post card
  const anchors = Array.from(
    postElement.querySelectorAll<HTMLAnchorElement>('a[href]')
  );
  if (postElement instanceof HTMLAnchorElement) {
    anchors.unshift(postElement);
  }

  // Find social network URLs (Facebook, Instagram, X/Twitter, LinkedIn)
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

  // 5. Extract Juicer data attributes (where Juicer often stores the real post URL)
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

  // 6. Fallback: Use any non-relative valid HTTP link found inside the card
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
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 overflow-x-hidden">
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

      {/* Skeleton Grid */}
      {isLoading && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="flex flex-col border-b border-gray-200 pb-5 animate-pulse"
            >
              <div className="w-full h-48 bg-gray-200 mb-3"></div>
              <div className="flex items-center justify-between mb-2">
                <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                <div className="w-16 h-3 bg-gray-200"></div>
              </div>
              <div className="w-full h-4 bg-gray-200 mb-2"></div>
              <div className="w-4/5 h-4 bg-gray-200 mb-2"></div>
              <div className="w-2/3 h-4 bg-gray-200"></div>
            </div>
          ))}
        </div>
      )}

      {/* Juicer Inject Target Container */}
      <ul
        id={containerId}
        onClickCapture={handleFeedClick}
        className={`
          juicer-feed jcr-feed w-full max-w-full overflow-x-hidden list-none p-0 m-0 font-sans text-sm items-start
          !grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3 gap-6 lg:gap-8
          ${isLoading ? 'hidden' : ''}

          /* Strip Juicer's fixed min-widths and forced overflow properties */
          [&_*]:!min-w-0 [&_*]:!max-w-full [&_*]:!box-border

          /* Card Containers */
          [&_.jcr-post]:!w-full [&_.jcr-post]:!max-w-full [&_li]:!w-full [&_li]:!max-w-full
          [&_.jcr-post]:!flex [&_.jcr-post]:!flex-col [&_.jcr-post]:!static [&_.jcr-post]:!bg-white [&_.jcr-post]:!border-b [&_.jcr-post]:!border-gray-200 [&_.jcr-post]:!pb-5 [&_.jcr-post]:!cursor-pointer [&_.jcr-post]:!transition-colors [&_.jcr-post]:hover:!border-red-700
          [&_li]:!flex [&_li]:!flex-col [&_li]:!static [&_li]:!bg-white [&_li]:!border-b [&_li]:!border-gray-200 [&_li]:!pb-5 [&_li]:!cursor-pointer [&_li]:!transition-colors [&_li]:hover:!border-red-700
          
          /* Neutralize Injected Overlays */
          [&_.jcr-post-overlay]:!static [&_.jcr-post-overlay]:!flex [&_.jcr-post-overlay]:!flex-col [&_.jcr-post-overlay]:!p-0 [&_.jcr-post-overlay]:!bg-transparent [&_.jcr-post-overlay]:!w-full

          /* 1. Images */
          [&_img]:!static [&_img]:!block [&_img]:!w-full [&_img]:!h-48 [&_img]:!object-cover [&_img]:!bg-gray-100 [&_img]:!mb-3 [&_img]:!order-1 [&_img]:!pointer-events-none
          [&_.jcr-post-image]:!h-48 [&_.jcr-post-image]:!w-full [&_.jcr-post-image]:!object-cover [&_.jcr-post-image]:!order-1

          /* 2. Metadata Header & Author Details */
          [&_.jcr-post-header]:!static [&_.jcr-post-header]:!flex [&_.jcr-post-header]:!items-center [&_.jcr-post-header]:!w-full [&_.jcr-post-header]:!mb-2 [&_.jcr-post-header]:!order-2
          [&_.jcr-author-name]:!hidden
          [&_.jcr-post-timestamp]:!ml-auto [&_.jcr-post-timestamp]:!text-[11px] [&_.jcr-post-timestamp]:!font-semibold [&_.jcr-post-timestamp]:!text-gray-500 [&_.jcr-post-timestamp]:!uppercase

          /* 3. Article Headline & Excerpt */
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