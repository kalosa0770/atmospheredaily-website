// app/spotlight/page.tsx
import { getJuicerPosts, filterPostsByHashtag } from '@/lib/juicer';
import PostSpotlight from '@/components/PostSpotlight';
import FeedGrid from '@/components/FeedGrid';

export const metadata = {
  title: 'Featured Spotlight | Atmosphere Daily',
  description: 'Highlighted stories, top posts, and featured articles.',
};

export default async function SpotlightPage() {
  const posts = await getJuicerPosts('atmosphere-daily');
  
  // Optionally filter by #spotlight or #featured hashtag if present in your feed
  const taggedSpotlights = filterPostsByHashtag(posts, '#spotlight');
  const spotlightPosts = taggedSpotlights.length > 0 ? taggedSpotlights : posts;

  const featuredPost = spotlightPosts[0];
  const secondaryPosts = spotlightPosts.slice(1);

  return (
    <main className="w-full min-h-screen py-12 bg-white text-slate-900 antialiased">
      {/* Featured Main Spotlight */}
      {featuredPost && (
        <PostSpotlight
          post={featuredPost}
          title="Featured Story"
          defaultHashtag="#SPOTLIGHT"
        />
      )}

      {/* Grid of Other Spotlight Stories */}
      {secondaryPosts.length > 0 && (
        <FeedGrid
          posts={secondaryPosts}
          title="More Featured Stories"
          variant="grid"
          initialCount={50}
          defaultHashtag="#SPOTLIGHT"
        />
      )}
    </main>
  );
}