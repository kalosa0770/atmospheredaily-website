import UnderConstruction from "./components/Construction";
import SpotlightNews from "./components/SpotlightNews";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-background py-8">
      {/* <UnderConstruction /> */}
      <SpotlightNews feedId="atmosphere-daily" />
    </main>
  );
}