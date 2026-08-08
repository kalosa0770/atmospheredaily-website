// components/UntaggedPostsSection.tsx
'use client';

import { useJuicerFeedTarget, UNTAGGED_TAG } from './JuicerFeedProvider';

interface UntaggedPostsSectionProps {
  title?: string;
}

export default function UntaggedPostsSection({
  title = 'General Updates',
}: UntaggedPostsSectionProps) {
  // Binds this container to capture posts with zero hashtags
  const targetRef = useJuicerFeedTarget<HTMLUListElement>(UNTAGGED_TAG);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      {title && (
        <h1 className="md:text-xl text-sm font-bold mb-4 text-left text-section-background font-title uppercase border-l-4 border-section-background pl-4">
          {title}
        </h1>
      )}

      {/* Grid container receiving untagged posts */}
      <ul ref={targetRef} className="jcr-feed jcr-feed-grid"></ul>
    </div>
  );
}