// components/AdConnectSection.tsx
'use client';

import { useJuicerFeedTarget } from './JuicerFeedProvider';

interface AdConnectSectionProps {
  tag?: string; // e.g. "#adconnect"
  title?: string;
}

export default function AdConnectSection({
  tag = '#adconnect',
  title = 'AdConnect',
}: AdConnectSectionProps) {
  // Registers this container as the target for #adconnect posts
  const targetRef = useJuicerFeedTarget<HTMLUListElement>(tag);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      {title && (
        <h1 className="md:text-base text-[10px] font-bold font-title mb-4 text-left text-section-background font-title uppercase border-l-4 border-section-background pl-4">
          {title}
        </h1>
      )}

      {/* Grid container receiving posts tagged with #adconnect */}
      <ul ref={targetRef} className="jcr-feed font-body jcr-feed-grid jcr-adconnect-grid"></ul>
    </section>
  );
}