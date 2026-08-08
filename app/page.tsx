import JuicerFeedProvider from '@/components/JuicerFeedProvider';
import JuicerHashtagSection from '@/components/JuicerHashtagSection';
import UntaggedPostsSection from '@/components/UntaggedPostsSection';

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-background py-12 md:py-24">
      <JuicerFeedProvider feedId="atmosphere-daily">
        {/* Captures #news */}
        <JuicerHashtagSection tag="#news" title="Daily News" />

        {/* Captures #blog */}
        <JuicerHashtagSection tag="#blog" title="Blogs & Articles" />

        {/* Captures all posts that do NOT have any hashtags */}
        <UntaggedPostsSection title="General Updates" />
      </JuicerFeedProvider>
    </main>
  );
}