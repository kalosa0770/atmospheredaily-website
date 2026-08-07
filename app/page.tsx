import BlogsAndArticles from "./components/Blogs&Articles";
import UnderConstruction from "./components/Construction";
import SpotlightNews from "./components/SpotlightNews";


export default function Home() {
  return (
    <main className="w-full min-h-screen bg-background py-12 md:py-24">
      {/* <UnderConstruction /> */}
      <SpotlightNews feedId="atmosphere-daily" />
      <BlogsAndArticles />
    </main>
  );
}