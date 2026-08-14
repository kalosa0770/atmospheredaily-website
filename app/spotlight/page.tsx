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
  
  // Filter all posts tagged with #spotlight (case-insensitive)
  const spotlightPosts = filterPostsByHashtag(posts, '#spotlight');

  // Fall back to all posts if no specific #spotlight hashtags are found
  const displayPosts = spotlightPosts.length > 0 ? spotlightPosts : posts;

  const featuredPost = displayPosts[0];
  const secondaryPosts = displayPosts.slice(1);

  return (
    <main className="w-full min-h-screen md:py-32 py-24 bg-white text-slate-900 antialiased">
      {/* Primary Featured Spotlight */}
      {featuredPost && (
        <PostSpotlight
          post={featuredPost}
          title="Featured Story"
          defaultHashtag="#SPOTLIGHT"
        />
      )}

      {/* Grid displaying all remaining Spotlight stories */}
      {secondaryPosts.length > 0 && (
        <FeedGrid
          posts={secondaryPosts}
          title="More Spotlight Stories"
          variant="grid"
          initialCount={secondaryPosts.length} // Renders all remaining posts without truncating
          defaultHashtag="#SPOTLIGHT"
        />
      )}
    </main>
  );
}