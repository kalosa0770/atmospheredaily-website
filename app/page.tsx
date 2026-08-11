import JuicerFeedProvider from '@/components/JuicerFeedProvider';
import DailyNews from '@/components/DailyNews';
import JuicerHashtagSection from '@/components/JuicerHashtagSection';
import AdConnectSection from '@/components/AdConnectSection';

export default function Home() {
  return (
    <main className="w-full  py-12 overflow-x-hidden bg-white text-slate-900 antialiased">
      <JuicerFeedProvider feedId="atmosphere-daily">
        
        {/* Untagged posts */}
        <DailyNews />

        {/* Posts tagged with #adconnect */}
        <AdConnectSection tag="#adconnect" title="AdConnect" />

        {/* Posts tagged with #blog */}
        <JuicerHashtagSection tag="#blog" title="Blogs & Articles" />

      </JuicerFeedProvider>
    </main>
  );
}