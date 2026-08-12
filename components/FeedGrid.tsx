// components/FeedGrid.tsx
'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { X, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { JuicerPost, extractHashtags, formatRelativeDateTime } from '@/lib/juicer';

interface FeedGridProps {
  posts: JuicerPost[];
  title?: string;
  variant?: 'grid' | 'masonry' | 'slider' | 'list';
  initialCount?: number;
  viewMoreHref?: string;
  viewMoreLabel?: string;
  defaultHashtag?: string;
}

function renderMessageWithLinks(text: string) {
  if (!text) return null;

  let cleaned = text.replace(/<[^>]*>/g, ' ');
  cleaned = cleaned.replace(/#[a-z0-9_]+\b/gi, '');
  cleaned = cleaned.replace(/\s+/g, ' ').trim();

  const urlRegex = /(https?:\/\/[^\s<]+)/gi;
  const parts = cleaned.split(urlRegex);

  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-section-background underline hover:text-section-background/80 break-all font-semibold"
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

export default function FeedGrid({
  posts,
  title,
  variant = 'grid',
  initialCount = 6,
  viewMoreHref,
  viewMoreLabel = 'View More Posts',
  defaultHashtag = '#NEWS',
}: FeedGridProps) {
  const [selectedPost, setSelectedPost] = useState<JuicerPost | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  if (!posts || posts.length === 0) {
    return (
      <div className="w-full max-w-6xl font-heading mx-auto px-4 py-8 text-center text-text text-xs sm:text-sm uppercase tracking-wider font-semibold">
        No posts available
      </div>
    );
  }

  const visiblePosts = posts.slice(0, initialCount);

  const getPostTagPlaceholder = (post: JuicerPost) => {
    const tags = extractHashtags(post.message);
    if (tags.length > 0) {
      return tags[0].toUpperCase();
    }
    return defaultHashtag.toUpperCase();
  };

  const scrollSlider = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const scrollAmount = sliderRef.current.clientWidth * 0.8;
    sliderRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 font-body">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        {title && (
          <h2 className="md:text-sm text-[10px] font-heading text-left uppercase border-l-4 border-section-background pl-4 text-text">
            {title}
          </h2>
        )}

        {variant === 'slider' && (
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => scrollSlider('left')}
              aria-label="Previous posts"
              className="p-1.5 border border-text/30 hover:border-text/90 text-text hover:text-text/80 transition-colors rounded-none bg-white"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => scrollSlider('right')}
              aria-label="Next posts"
              className="p-1.5 border border-text/30 hover:border-text/90 text-text hover:text-text/80 transition-colors rounded-none bg-white"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* 1. SLIDER VARIANT */}
      {variant === 'slider' ? (
        <div
          ref={sliderRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {visiblePosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="snap-center flex-none w-[260px] sm:w-[290px] lg:w-[320px] flex flex-col bg-white border-b border-text/30 pb-4 cursor-pointer transition-colors hover:border-section-background group rounded-none"
            >
              {post.image ? (
                <div className="w-full h-32 sm:h-36 bg-section-background mb-2.5 overflow-hidden rounded-none">
                  <img
                    src={post.image}
                    alt="Post media"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="w-full h-32 sm:h-36 bg-text mb-2.5 flex items-center justify-center p-3 text-center rounded-none">
                  <span className="text-white text-base font-black tracking-widest uppercase">
                    {getPostTagPlaceholder(post)}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between mb-1.5 text-[10px] font-semibold text-text/50 uppercase tracking-wider">
                <span className="text-red-700 font-bold">
                  {post.source_type}
                </span>
                <span>{formatRelativeDateTime(post.external_created_at)}</span>
              </div>

              <p className="text-[10px] sm:text-xs text-text leading-snug line-clamp-3 break-words font-medium">
                {renderMessageWithLinks(post.message)}
              </p>
            </article>
          ))}
        </div>
      ) : variant === 'list' ? (
        /* 2. COMPACT LIST VARIANT (BBC Mobile Style with Small Thumbnails) */
        <div className="flex flex-col space-y-3 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-5 lg:gap-6">
          {visiblePosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="flex flex-row sm:flex-col items-start gap-3 sm:gap-0 bg-white border-b border-text/20 pb-3 sm:pb-4 cursor-pointer transition-colors hover:border-section-background group rounded-none"
            >
              {/* Reduced Thumbnail Image */}
              {post.image ? (
                <div className="w-16 h-16 sm:w-full sm:h-36 flex-none bg-section-background sm:mb-2.5 overflow-hidden rounded-none">
                  <img
                    src={post.image}
                    alt="Post media"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 sm:w-full sm:h-36 flex-none bg-text sm:mb-2.5 flex items-center justify-center p-1.5 text-center rounded-none">
                  <span className="text-white text-[10px] sm:text-sm font-black tracking-widest uppercase">
                    {getPostTagPlaceholder(post)}
                  </span>
                </div>
              )}

              {/* Text & Metadata */}
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-1.5 mb-1 text-[10px] font-semibold text-text/50 uppercase tracking-wider">
                  <span className="text-red-700 font-bold">
                    {post.source_type}
                  </span>
                  <span>•</span>
                  <span>{formatRelativeDateTime(post.external_created_at)}</span>
                </div>

                <p className="text-xs sm:text-sm font-bold text-text leading-snug line-clamp-3 break-words">
                  {renderMessageWithLinks(post.message)}
                </p>
              </div>
            </article>
          ))}
        </div>
      ) : variant === 'masonry' ? (
        /* 3. MASONRY VARIANT */
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 lg:gap-6 space-y-5 lg:space-y-6">
          {visiblePosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="break-inside-avoid flex flex-col bg-white border-b border-text/20 pb-4 cursor-pointer transition-colors hover:border-text/50 group rounded-none"
            >
              {post.image ? (
                <div className="w-full max-h-52 bg-text/10 mb-2.5 overflow-hidden rounded-none">
                  <img
                    src={post.image}
                    alt="Post media"
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="w-full h-36 bg-text mb-2.5 flex items-center justify-center p-3 text-center rounded-none">
                  <span className="text-white text-base font-black tracking-widest uppercase">
                    {getPostTagPlaceholder(post)}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between mb-1.5 text-[10px] font-semibold text-text/50 uppercase tracking-wider">
                <span className="text-red-700 font-bold">
                  {post.source_type}
                </span>
                <span>{formatRelativeDateTime(post.external_created_at)}</span>
              </div>

              <p className="text-xs sm:text-sm font-body text-text leading-snug line-clamp-4 break-words">
                {renderMessageWithLinks(post.message)}
              </p>
            </article>
          ))}
        </div>
      ) : (
        /* 4. UNIFORM GRID VARIANT */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-start">
          {visiblePosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="flex flex-col bg-white border-b border-text/30 pb-4 cursor-pointer transition-colors hover:border-section-background group rounded-none"
            >
              {post.image ? (
                <div className="w-full h-32 sm:h-36 bg-section-background mb-2.5 overflow-hidden rounded-none">
                  <img
                    src={post.image}
                    alt="Post media"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="w-full h-32 sm:h-36 bg-text mb-2.5 flex items-center justify-center p-3 text-center rounded-none">
                  <span className="text-white text-base font-black tracking-widest uppercase">
                    {getPostTagPlaceholder(post)}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between mb-1.5 text-[10px] font-semibold text-text/50 uppercase tracking-wider">
                <span className="text-red-700 font-bold">
                  {post.source_type}
                </span>
                <span>{formatRelativeDateTime(post.external_created_at)}</span>
              </div>

              <p className="text-[10px] sm:text-xs text-text leading-snug line-clamp-3 break-words font-medium">
                {renderMessageWithLinks(post.message)}
              </p>
            </article>
          ))}
        </div>
      )}

      {/* Redirect Button */}
      {viewMoreHref && (
        <div className="mt-6 flex justify-center">
          <Link
            href={viewMoreHref}
            className="inline-flex items-center gap-2 px-5 py-2 text-[10px] font-heading uppercase tracking-wider text-text/80 bg-text/10 hover:bg-text hover:text-white transition-colors duration-200 rounded-none"
          >
            {viewMoreLabel} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl max-h-[90vh] bg-white shadow-xl overflow-hidden flex flex-col rounded-none">
            <div className="flex items-center justify-between p-3.5 border-b border-text/30">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-text/50">
                {formatRelativeDateTime(selectedPost.external_created_at, true)}
              </span>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-1 text-text/50 hover:text-text hover:bg-text/10 transition-colors rounded-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-3.5">
              {selectedPost.image ? (
                <img
                  src={selectedPost.image}
                  alt="Post media"
                  className="w-full max-h-60 object-cover bg-text/10 rounded-none"
                />
              ) : (
                <div className="w-full py-8 bg-text/20 flex items-center justify-center rounded-none">
                  <span className="text-text/80 text-xl font-black tracking-widest uppercase">
                    {getPostTagPlaceholder(selectedPost)}
                  </span>
                </div>
              )}
              <div className="text-text/80 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans">
                {renderMessageWithLinks(selectedPost.message)}
              </div>
            </div>

            <div className="p-3.5 border-t border-text/30 bg-text/10 flex items-center justify-between">
              <a
                href={selectedPost.full_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-semibold text-section-background hover:underline uppercase tracking-wider"
              >
                View original post on {selectedPost.source_type} ↗
              </a>
              <button
                onClick={() => setSelectedPost(null)}
                className="px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-white hover:bg-slate-800 transition-colors rounded-none"
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