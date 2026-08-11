// components/JuicerHashtagSection.tsx
'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { useJuicerFeedTarget } from './JuicerFeedProvider';
import { getPostFullText } from '@/lib/hashtagFilter';

interface JuicerHashtagSectionProps {
  tag: string;
  title?: string;
  variant?: 'grid' | 'bento' | 'list';
}

interface PostModalData {
  text: string;
  image?: string;
  date?: string;
}

export default function JuicerHashtagSection({
  tag,
  title,
  variant = 'grid',
}: JuicerHashtagSectionProps) {
  const targetRef = useJuicerFeedTarget<HTMLUListElement>(tag);
  const [selectedPost, setSelectedPost] = useState<PostModalData | null>(null);

  const layoutClass = {
    grid: '!grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3 gap-6 lg:gap-8',
    bento: '!grid !grid-cols-1 md:!grid-cols-3 gap-6',
    list: 'flex flex-col space-y-6',
  }[variant];

  // Intercept click and open internal modal instead of navigating away
  const handleFeedClick = (e: React.MouseEvent<HTMLUListElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    const targetEl = e.target as HTMLElement;

    const postElement = targetEl.closest<HTMLElement>(
      '.jcr-post, .juicer-item, .j-stack, .j-poster, li'
    );

    if (!postElement) return;

    // Extract caption message
    const fullText = getPostFullText(postElement);

    // Extract post image source
    const imgElement = postElement.querySelector<HTMLImageElement>('img');
    const imageSrc = imgElement?.src || '';

    // Extract timestamp metadata
    const timeElement = postElement.querySelector(
      '.jcr-post-timestamp, .j-timestamp'
    );
    const timeText = timeElement?.textContent || '';

    setSelectedPost({
      text: fullText,
      image: imageSrc,
      date: timeText,
    });
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

          /* Disable native pointer events on inner <a> tags so clicks bubble to React */
          [&_a]:!pointer-events-none

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

      {/* Article Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-lg shadow-xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                {selectedPost.date || 'Article Details'}
              </span>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-1 text-gray-400 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-4">
              {selectedPost.image && (
                <img
                  src={selectedPost.image}
                  alt="Post media"
                  className="w-full max-h-80 object-cover rounded-md bg-gray-100"
                />
              )}
              <div className="text-gray-900 text-sm sm:text-base leading-relaxed whitespace-pre-line font-sans">
                {selectedPost.text}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button
                onClick={() => setSelectedPost(null)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-slate-900 text-white rounded hover:bg-slate-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}