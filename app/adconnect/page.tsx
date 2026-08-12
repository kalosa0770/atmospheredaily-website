// app/adconnect/page.tsx
import { getJuicerPosts, filterPostsByHashtag } from '@/lib/juicer';
import FeedGrid from '@/components/FeedGrid';

export const metadata = {
  title: 'AD Connect | Atmosphere Daily Connect',
  description: 'Latest AdConnect updates and posts.',
};

export default async function AdConnectPage() {
  const posts = await getJuicerPosts('atmosphere-daily');
  const adConnectPosts = filterPostsByHashtag(posts, '#adconnect');

  return (
    <main className="w-full min-h-screen py-12 bg-white text-slate-900 antialiased">
      <FeedGrid
        posts={adConnectPosts}
        title="AD Connect"
        variant="grid"
        initialCount={50}
        defaultHashtag="#ADCONNECT"
      />
    </main>
  );
}