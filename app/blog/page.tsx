// app/blog/page.tsx
import { getJuicerPosts, filterPostsByHashtag } from '@/lib/juicer';
import FeedGrid from '@/components/FeedGrid';

export const metadata = {
  title: 'Blogs & Articles | Atmosphere Daily',
  description: 'Explore all blog posts and editorial articles.',
};

export default async function BlogPage() {
  const posts = await getJuicerPosts('atmosphere-daily');
  const blogPosts = filterPostsByHashtag(posts, '#blog');

  return (
    <main className="w-full min-h-screen md:py-32 py-24 bg-white text-slate-900 antialiased">
      <FeedGrid
        posts={blogPosts}
        title="Blogs & Articles"
        variant="grid"
        initialCount={50}
        defaultHashtag="#BLOG"
      />
    </main>
  );
}