// components/JuicerHashtagSection.tsx
'use client';

import { useJuicerFeedTarget } from './JuicerFeedProvider';

interface JuicerHashtagSectionProps {
  tag: string; // e.g. "#news" or "#blog"
  title?: string;
}

export default function JuicerHashtagSection({
  tag,
  title,
}: JuicerHashtagSectionProps) {
  const targetRef = useJuicerFeedTarget<HTMLUListElement>(tag);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      {title && (
        <h1 className="md:text-xl text-sm font-bold mb-4 text-left text-section-background font-title uppercase border-l-4 border-section-background pl-4">
          {title}
        </h1>
      )}

      {/* Grid container receiving routed posts */}
      <ul ref={targetRef} className="jcr-feed jcr-feed-grid"></ul>
    </div>
  );
}