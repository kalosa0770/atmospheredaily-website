// app/page.tsx
import { getJuicerPosts, filterPostsByHashtag } from '@/lib/juicer';
import FeedGrid from '@/components/FeedGrid';
import PostSpotlight from '@/components/PostSpotlight';

export default async function HomePage() {
  const posts = await getJuicerPosts('atmosphere-daily');

  const adConnectPosts = filterPostsByHashtag(posts, '#adconnect');
  const blogPosts = filterPostsByHashtag(posts, '#blog');

  return (
    <main className="w-full min-h-screen py-12 bg-white text-slate-900 antialiased">
      
      {/* Daily News Section (Masonry, No title, Hashtag placeholder for text posts) */}
      <FeedGrid
        posts={posts.slice(1)}
        variant="masonry"
        initialCount={6}
        viewMoreHref="/daily-news"
        viewMoreLabel="View More Daily News"
        defaultHashtag="#DAILYNEWS"
      />

      {/* AdConnect Section (Uniform Grid) */}
      <FeedGrid
        posts={adConnectPosts}
        title="AD Connect"
        variant="list"
        initialCount={6}
        viewMoreHref="/adconnect"
        viewMoreLabel="View More Posts"
        defaultHashtag="#ADCONNECT"
      />

      {/* Blogs Section (Manual Horizontal Slider) */}
      <FeedGrid
        posts={blogPosts}
        title="Blogs & Articles"
        variant="slider"
        initialCount={10}
        viewMoreHref="/blog"
        viewMoreLabel="View All Articles"
        defaultHashtag="#BLOG"
      />

      {/* Featured Spotlight Card */}
      {posts[0] && (
        <PostSpotlight
          post={posts[0]}
          title="Featured Spotlight"
          viewMoreHref="/daily-news"
          viewMoreLabel="All Daily News"
        />
      )}
    </main>
  );
}