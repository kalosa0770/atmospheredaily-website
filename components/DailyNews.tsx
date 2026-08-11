// components/DailyNews.tsx
'use client';

import { useJuicerFeedTarget, UNTAGGED_TAG } from './JuicerFeedProvider';

interface DailyNewsProps {
  title?: string;
}

export default function DailyNews({
  title = 'Daily News',
}: DailyNewsProps) {
  // Captures untagged general posts
  const targetRef = useJuicerFeedTarget<HTMLUListElement>(UNTAGGED_TAG);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 font-body">
      {/* Grid container configured for BBC Masonry Layout */}
      <ul ref={targetRef} className="jcr-feed jcr-masonry-grid"></ul>
    </div>
  );
}