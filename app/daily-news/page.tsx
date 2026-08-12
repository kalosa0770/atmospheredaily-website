// app/daily-news/page.tsx
import { getJuicerPosts } from '@/lib/juicer';
import FeedGrid from '@/components/FeedGrid';

export const metadata = {
  title: 'Daily News | Atmosphere Daily',
  description: 'Latest daily news updates and posts.',
};

export default async function DailyNewsPage() {
  const posts = await getJuicerPosts('atmosphere-daily');

  return (
    <main className="w-full min-h-screen py-12 bg-white text-slate-900 antialiased">
      <FeedGrid
        posts={posts}
        title="All Daily News"
        variant="masonry"
        initialCount={50}
        defaultHashtag="#DAILYNEWS"
      />
    </main>
  );
}