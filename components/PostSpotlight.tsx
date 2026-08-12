// components/PostSpotlight.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, X } from 'lucide-react';
import { JuicerPost, extractHashtags, formatRelativeDateTime } from '@/lib/juicer';

interface PostSpotlightProps {
  post?: JuicerPost;
  title?: string;
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
          className="text-text underline hover:text-section-background break-all font-semibold"
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

export default function PostSpotlight({
  post,
  title = 'Spotlight',
  viewMoreHref,
  viewMoreLabel = 'Read Full Article',
  defaultHashtag = '#FEATURED',
}: PostSpotlightProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!post) return null;

  const formattedDateTime = formatRelativeDateTime(post.external_created_at);

  const getPostTagPlaceholder = () => {
    const tags = extractHashtags(post.message);
    return tags.length > 0 ? tags[0].toUpperCase() : defaultHashtag.toUpperCase();
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 font-sans">
      {title && (
        <h2 className="md:text-sm text-[10px] font-bold mb-6 text-left uppercase border-l-4 border-section-background pl-4 text-text">
          {title}
        </h2>
      )}

      <div className="bg-text/5 border border-text/20 rounded-none overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-0 items-center">
        <div className="md:col-span-6 lg:col-span-7 h-64 md:h-96 w-full overflow-hidden bg-slate-900 flex items-center justify-center rounded-none">
          {post.image ? (
            <img
              src={post.image}
              alt="Spotlight media"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white text-2xl sm:text-3xl font-black tracking-widest uppercase p-4 text-center">
              {getPostTagPlaceholder()}
            </span>
          )}
        </div>

        <div className="p-6 sm:p-8 flex flex-col justify-center md:col-span-6 lg:col-span-5">
          <div className="flex items-center gap-2 mb-3 text-[10px] md:text-sm font-bold text-text/50 uppercase tracking-wider">
            <span className="text-section-background">{post.source_type}</span>
            <span>•</span>
            <span>{formattedDateTime}</span>
          </div>

          <div className="text-[10px] md:text-sm  font-body text-text leading-snug mb-6 line-clamp-6">
            {renderMessageWithLinks(post.message)}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-2 px-2 py-1 text-[10px] font-heading tracking-wider text-white bg-section-background hover:bg-section-background/80 transition-colors duration-200 rounded-none"
            >
              Read More
            </button>

            {viewMoreHref && (
              <Link
                href={viewMoreHref}
                className="inline-flex items-center gap-1 text-[10px] font-heading  tracking-wider text-text/70 hover:text-text transition-colors"
              >
                {viewMoreLabel} <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Reader Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-text/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] bg-white shadow-xl overflow-hidden flex flex-col rounded-none">
            <div className="flex items-center justify-between p-4 border-b border-text/20">
              <span className="text-[10px] font-semibold tracking-wider text-text/50">
                {formatRelativeDateTime(post.external_created_at, true)}
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-text/50 hover:text-text hover:bg-text/10 transition-colors rounded-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              {post.image ? (
                <img
                  src={post.image}
                  alt="Spotlight media"
                  className="w-full max-h-80 object-cover bg-text/10 rounded-none"
                />
              ) : (
                <div className="w-full py-12 bg-text/20 flex items-center justify-center rounded-none">
                  <span className="text-white text-[10px] md:text-sm font-black tracking-widest uppercase">
                    {getPostTagPlaceholder()}
                  </span>
                </div>
              )}
              <div className="text-text text-[10px] md:text-sm leading-relaxed whitespace-pre-line font-body">
                {renderMessageWithLinks(post.message)}
              </div>
            </div>

            <div className="p-4 border-t border-text/20 bg-text/10 flex items-center justify-between">
              <a
                href={post.full_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-heading text-section-background hover:underline tracking-wider"
              >
                View original post on ↗
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 text-[10px] font-heading tracking-wider bg-text text-white hover:bg-text/80 transition-colors rounded-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}