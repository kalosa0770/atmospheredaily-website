'use client';

import { useJuicerFeedTarget } from './JuicerFeedProvider';

interface JuicerHashtagSectionProps {
  tag: string;
  title?: string;
  variant?: 'grid' | 'bento' | 'list';
}

export default function JuicerHashtagSection({
  tag,
  title,
  variant = 'grid',
}: JuicerHashtagSectionProps) {
  const targetRef = useJuicerFeedTarget<HTMLUListElement>(tag);

  const layoutClass = {
    grid: '!grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3 gap-6 lg:gap-8',
    bento: '!grid !grid-cols-1 md:!grid-cols-3 gap-6',
    list: 'flex flex-col space-y-6',
  }[variant];

  const handleFeedClick = (e: React.MouseEvent<HTMLUListElement>) => {
    // Intercept event before Juicer's internal modal script fires
    e.stopPropagation();

    const postElement = (e.target as HTMLElement).closest<HTMLElement>(
      '.jcr-post, .juicer-item, .j-stack, .j-poster, li'
    );

    if (!postElement) return;

    // 1. Search for direct social media links inside the post
    const links = Array.from(postElement.querySelectorAll<HTMLAnchorElement>('a[href]'));
    const socialLink = links.find((a) => {
      const href = a.href;
      return (
        href.includes('facebook.com') ||
        href.includes('fb.watch') ||
        href.includes('instagram.com') ||
        href.includes('twitter.com') ||
        href.includes('x.com') ||
        href.includes('linkedin.com')
      );
    });

    if (socialLink) {
      window.open(socialLink.href, '_blank', 'noopener,noreferrer');
      return;
    }

    // 2. Check Juicer data attributes attached to the element
    const externalUrl =
      postElement.getAttribute('data-url') ||
      postElement.getAttribute('data-external-url');

    if (externalUrl && externalUrl.startsWith('http')) {
      window.open(externalUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    // 3. Fallback link target
    const fallback = postElement.querySelector<HTMLAnchorElement>(
      'a.jcr-post-timestamp, a.j-timestamp, a.jcr-post-source-icon, a.j-source-icon'
    );
    if (fallback && fallback.href && !fallback.href.includes('#')) {
      window.open(fallback.href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 overflow-x-hidden font-body">
      {title && (
        <h1 className="md:text-base text-[10px] font-bold mb-4 text-left font-title uppercase border-l-4 border-section-background pl-4">
          {title}
        </h1>
      )}

      {/* Target element with Tailwind styling for injected Juicer sub-elements */}
      <ul
        ref={targetRef}
        onClickCapture={handleFeedClick}
        data-overlay="false"
        className={`
          w-full max-w-full overflow-x-hidden list-none p-0 m-0 font-sans text-sm align-top items-start
          ${layoutClass}

          /* Reset fixed dimensions & prevent horizontal scroll */
          [&_*]:!min-w-0 [&_*]:!max-w-full [&_*]:!box-border

          /* Target injected Juicer cards */
          [&_.jcr-post]:!w-full [&_.jcr-post]:!max-w-full [&_li]:!w-full [&_li]:!max-w-full
          [&_.jcr-post]:!flex [&_.jcr-post]:!flex-col [&_.jcr-post]:!static [&_.jcr-post]:!bg-white [&_.jcr-post]:!border-b [&_.jcr-post]:!border-gray-200 [&_.jcr-post]:!pb-5 [&_.jcr-post]:!cursor-pointer [&_.jcr-post]:!transition-colors [&_.jcr-post]:hover:!border-red-700
          [&_li]:!flex [&_li]:!flex-col [&_li]:!static [&_li]:!bg-white [&_li]:!border-b [&_li]:!border-gray-200 [&_li]:!pb-5 [&_li]:!cursor-pointer [&_li]:!transition-colors [&_li]:hover:!border-red-700

          /* Disable absolute overlays injected by Juicer */
          [&_.jcr-post-overlay]:!static [&_.jcr-post-overlay]:!flex [&_.jcr-post-overlay]:!flex-col [&_.jcr-post-overlay]:!p-0 [&_.jcr-post-overlay]:!bg-transparent [&_.jcr-post-overlay]:!w-full

          /* 1. Images */
          [&_img]:!static [&_img]:!block [&_img]:!w-full [&_img]:!h-48 [&_img]:!object-cover [&_img]:!bg-gray-100 [&_img]:!mb-3 [&_img]:!order-1 [&_img]:!pointer-events-none
          [&_.jcr-post-image]:!h-48 [&_.jcr-post-image]:!w-full [&_.jcr-post-image]:!object-cover [&_.jcr-post-image]:!order-1

          /* 2. Post Header & Author Metadata */
          [&_.jcr-post-header]:!static [&_.jcr-post-header]:!flex [&_.jcr-post-header]:!items-center [&_.jcr-post-header]:!w-full [&_.jcr-post-header]:!mb-2 [&_.jcr-post-header]:!order-2
          [&_.jcr-author-name]:!hidden
          [&_.jcr-post-timestamp]:!ml-auto [&_.jcr-post-timestamp]:!text-[11px] [&_.jcr-post-timestamp]:!font-semibold [&_.jcr-post-timestamp]:!text-gray-500 [&_.jcr-post-timestamp]:!uppercase

          /* 3. Headlines & Text Body */
          [&_.jcr-post-content]:!static [&_.jcr-post-content]:!block [&_.jcr-post-content]:!w-full [&_.jcr-post-content]:!order-3
          [&_.jcr-post-message]:!static [&_.jcr-post-message]:!line-clamp-4 [&_.jcr-post-message]:!font-bold [&_.jcr-post-message]:!text-[13px] sm:[&_.jcr-post-message]:!text-[14px] [&_.jcr-post-message]:!text-gray-900 [&_.jcr-post-message]:!leading-snug [&_.jcr-post-message]:!break-words
        `}
      ></ul>
    </div>
  );
}