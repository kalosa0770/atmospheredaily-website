// components/FeedGrid.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { X, ArrowRight, ChevronLeft, ChevronRight, Play, Volume2, VolumeX } from 'lucide-react';
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

function getPostVideoUrl(post: JuicerPost): string | null {
  if (post.video) return post.video;
  if ((post as unknown as { video_url?: string }).video_url) {
    return (post as unknown as { video_url?: string }).video_url || null;
  }
  return null;
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
  const [isMuted, setIsMuted] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play handler with unmuted fallback
  useEffect(() => {
    if (selectedPost && videoRef.current) {
      const video = videoRef.current;
      video.currentTime = 0;
      video.muted = false; // Attempt unmuted first

      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback to muted playback if blocked by browser policy
          video.muted = true;
          video.play().catch((err) => console.log('Autoplay blocked:', err));
        });
      }
    }
  }, [selectedPost]);

  // Keep isMuted in sync with the ACTUAL video element state, no matter
  // what changed it (our custom button, native controls, or the
  // autoplay-blocked fallback above). This is what the old code was
  // missing: it set isMuted manually in a couple of places but never
  // listened for the real, authoritative state, so the two could drift
  // apart and the "Tap To Unmute" button could show/hide incorrectly.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const syncMuted = () => setIsMuted(video.muted);
    syncMuted(); // sync immediately on mount too

    video.addEventListener('volumechange', syncMuted);
    return () => video.removeEventListener('volumechange', syncMuted);
  }, [selectedPost]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      // isMuted state now updates itself via the volumechange listener above
    }
  };

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
          <h2 className="md:text-sm text-[10px] font-heading text-left uppercase border-l-4 border-button-hover pl-4 text-text">
            {title}
          </h2>
        )}

        {variant === 'slider' && (
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => scrollSlider('left')}
              aria-label="Previous posts"
              className="p-2 border border-text/30 hover:border-text/90 text-text hover:text-text/80 transition-colors rounded-none bg-white cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollSlider('right')}
              aria-label="Next posts"
              className="p-2 border border-text/30 hover:border-text/90 text-text hover:text-text/80 transition-colors rounded-none bg-white cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* 1. SLIDER VARIANT */}
      {variant === 'slider' ? (
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {visiblePosts.map((post) => {
            const hasVideo = Boolean(getPostVideoUrl(post));

            return (
              <article
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="snap-center flex-none w-[280px] sm:w-[320px] lg:w-[350px] flex flex-col bg-white border-b border-text/30 pb-5 cursor-pointer transition-colors hover:border-button-hover group rounded-none"
              >
                {post.image ? (
                  <div className="w-full h-48 bg-section-background mb-3 overflow-hidden rounded-none relative">
                    <img
                      src={post.image}
                      alt="Post media"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    {hasVideo && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-10 h-10 bg-button-hover text-text flex items-center justify-center shadow-md">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-48 bg-text mb-3 flex items-center justify-center p-4 text-center rounded-none relative">
                    <span className="text-white text-lg font-black tracking-widest uppercase">
                      {getPostTagPlaceholder(post)}
                    </span>
                    {hasVideo && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-10 h-10 bg-button-hover text-text flex items-center justify-center shadow-md">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="pr-12 flex items-center justify-between mb-2 text-[10px] font-semibold text-text/50 uppercase tracking-wider">
                  <span className="text-red-700 font-bold">
                    {post.source_type}
                  </span>
                  <span>{formatRelativeDateTime(post.external_created_at)}</span>
                </div>

                <p className="px-4 text-[10px] sm:text-sm text-text leading-snug line-clamp-4 break-words">
                  {renderMessageWithLinks(post.message)}
                </p>
              </article>
            );
          })}
        </div>
      ) : variant === 'list' ? (
        /* 2. COMPACT LIST VARIANT */
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 lg:gap-8">
          {visiblePosts.map((post) => {
            const hasVideo = Boolean(getPostVideoUrl(post));

            return (
              <article
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="flex flex-row sm:flex-col items-start gap-3 sm:gap-0 bg-white border-b border-text/20 pb-4 sm:pb-5 cursor-pointer transition-colors hover:border-button-hover group rounded-none"
              >
                {post.image ? (
                  <div className="w-24 h-24 sm:w-full sm:h-48 flex-none bg-section-background sm:mb-3 overflow-hidden rounded-none relative">
                    <img
                      src={post.image}
                      alt="Post media"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    {hasVideo && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-button-hover text-text flex items-center justify-center shadow-md">
                          <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-24 h-24 sm:w-full sm:h-48 flex-none bg-text sm:mb-3 flex items-center justify-center p-2 text-center rounded-none relative">
                    <span className="text-white text-xs sm:text-lg font-black tracking-widest uppercase">
                      {getPostTagPlaceholder(post)}
                    </span>
                    {hasVideo && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-button-hover text-text flex items-center justify-center shadow-md">
                          <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1 text-[10px] font-semibold text-text/50 uppercase tracking-wider">
                    <span className="text-red-700 font-bold">
                      {post.source_type}
                    </span>
                    <span>•</span>
                    <span>{formatRelativeDateTime(post.external_created_at)}</span>
                  </div>

                  <p className="text-xs sm:text-sm font-bold text-text leading-snug line-clamp-3 sm:line-clamp-4 break-words">
                    {renderMessageWithLinks(post.message)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      ) : variant === 'masonry' ? (
        /* 3. MASONRY VARIANT */
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 lg:gap-8 space-y-6 lg:space-y-8">
          {visiblePosts.map((post) => {
            const hasVideo = Boolean(getPostVideoUrl(post));

            return (
              <article
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="break-inside-avoid flex flex-col bg-white border-b border-text/20 pb-5 cursor-pointer transition-colors hover:border-button-hover group rounded-none"
              >
                {post.image ? (
                  <div className="w-full bg-text/10 mb-3 overflow-hidden rounded-none relative">
                    <img
                      src={post.image}
                      alt="Post media"
                      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    {hasVideo && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-10 h-10 bg-button-hover text-text flex items-center justify-center shadow-md">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-48 bg-text mb-3 flex items-center justify-center p-4 text-center rounded-none relative">
                    <span className="text-white text-lg font-black tracking-widest uppercase">
                      {getPostTagPlaceholder(post)}
                    </span>
                    {hasVideo && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-10 h-10 bg-button-hover text-text flex items-center justify-center shadow-md">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between mb-2 text-[10px] font-semibold text-text/50 uppercase tracking-wider">
                  <span className="text-red-700 font-bold">
                    {post.source_type}
                  </span>
                  <span>{formatRelativeDateTime(post.external_created_at)}</span>
                </div>

                <p className="text-xs sm:text-sm font-body text-text leading-snug line-clamp-4 break-words">
                  {renderMessageWithLinks(post.message)}
                </p>
              </article>
            );
          })}
        </div>
      ) : (
        /* 4. UNIFORM GRID VARIANT */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {visiblePosts.map((post) => {
            const hasVideo = Boolean(getPostVideoUrl(post));

            return (
              <article
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="flex flex-col bg-white border-b border-text/30 pb-5 cursor-pointer transition-colors hover:border-button-hover group rounded-none"
              >
                {post.image ? (
                  <div className="w-full h-48 bg-section-background mb-3 overflow-hidden rounded-none relative">
                    <img
                      src={post.image}
                      alt="Post media"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    {hasVideo && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-10 h-10 bg-button-hover text-text flex items-center justify-center shadow-md">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-48 bg-text mb-3 flex items-center justify-center p-4 text-center rounded-none relative">
                    <span className="text-white text-lg font-black tracking-widest uppercase">
                      {getPostTagPlaceholder(post)}
                    </span>
                    {hasVideo && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-10 h-10 bg-button-hover text-text flex items-center justify-center shadow-md">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between mb-2 text-[10px] font-semibold text-text/50 uppercase tracking-wider">
                  <span className="text-red-700 font-bold">
                    {post.source_type}
                  </span>
                  <span>{formatRelativeDateTime(post.external_created_at)}</span>
                </div>

                <p className="text-[10px] md:text-sm text-text leading-snug line-clamp-4 break-words">
                  {renderMessageWithLinks(post.message)}
                </p>
              </article>
            );
          })}
        </div>
      )}

      {/* Redirect Button */}
      {viewMoreHref && (
        <div className="mt-8 flex justify-center">
          <Link
            href={viewMoreHref}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-[10px] font-heading uppercase tracking-wider text-text/80 bg-text/10 hover:bg-button-hover hover:text-text transition-colors duration-200 rounded-none font-bold"
          >
            {viewMoreLabel} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] bg-white shadow-xl overflow-hidden flex flex-col rounded-none">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-text/30">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-text/50">
                {formatRelativeDateTime(selectedPost.external_created_at, true)}
              </span>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-1 text-text/50 hover:text-text hover:bg-text/10 transition-colors rounded-none cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-4">
              {getPostVideoUrl(selectedPost) ? (
                <div className="w-full bg-black aspect-video rounded-none overflow-hidden relative group">
                  <video
                    ref={videoRef}
                    src={getPostVideoUrl(selectedPost) || undefined}
                    controls
                    playsInline
                    className="w-full h-full object-contain"
                  >
                    Your browser does not support playing HTML video.
                  </video>

                  {/* Manual Unmute Control */}
                  {isMuted ? (
                    <button
                      onClick={toggleMute}
                      className="absolute top-3 right-3 bg-button-hover text-text px-3 py-1.5 text-[10px] font-heading font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors z-10 rounded-none cursor-pointer shadow-md"
                    >
                      <VolumeX className="w-3.5 h-3.5" /> Tap To Unmute
                    </button>
                  ) : (
                    <button
                      onClick={toggleMute}
                      className="absolute top-3 right-3 bg-black/60 hover:bg-black text-white px-2.5 py-1 text-[10px] font-heading uppercase tracking-wider flex items-center gap-1 transition-colors z-10 rounded-none cursor-pointer opacity-0 group-hover:opacity-100"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Mute
                    </button>
                  )}
                </div>
              ) : selectedPost.image ? (
                <img
                  src={selectedPost.image}
                  alt="Post media"
                  className="w-full max-h-80 object-cover bg-text/10 rounded-none"
                />
              ) : (
                <div className="w-full py-12 bg-text/20 flex items-center justify-center rounded-none">
                  <span className="text-text/80 text-2xl font-black tracking-widest uppercase">
                    {getPostTagPlaceholder(selectedPost)}
                  </span>
                </div>
              )}

              <div className="text-text/80 text-sm sm:text-base leading-relaxed whitespace-pre-line font-sans">
                {renderMessageWithLinks(selectedPost.message)}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-text/30 bg-text/10 flex items-center justify-between">
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
                className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider bg-button-background text-section-text hover:bg-button-hover hover:text-text transition-colors rounded-none cursor-pointer"
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