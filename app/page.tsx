'use client';
import {useEffect, useState} from 'react';
import {Loader} from 'lucide-react';
import JuicerFeedProvider from '@/components/JuicerFeedProvider';
import DailyNews from '@/components/DailyNews';
import JuicerHashtagSection from '@/components/JuicerHashtagSection';
import AdConnectSection from '@/components/AdConnectSection';

export default function Home() {
  const [isJuicerLoaded, setIsJuicerLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.juicer.io/embed.js';
    script.async = true;
    script.onload = () => setIsJuicerLoaded(true);
    document.body.appendChild(script);
  }, []);

  if (!isJuicerLoaded) {
    return (
      <main className="w-full  py-12 overflow-x-hidden bg-white text-slate-900 antialiased min-h-screen flex flex-col items-center justify-center">
        <Loader className="animate-spin mx-auto" />
        <h1 className="text-center text-sm font-semibold mt-4">
          Loading Feed...
        </h1>
      </main>
    );
  }


  return (
    <main className="w-full  py-12 overflow-x-hidden bg-white text-slate-900 antialiased">
      <JuicerFeedProvider feedId="atmosphere-daily">
        
        {/* Untagged posts */}
        <DailyNews />

        {/* Posts tagged with #adconnect */}
        <AdConnectSection tag="#adconnect" title="AdConnect" />

        {/* Posts tagged with #blog */}
        <JuicerHashtagSection tag="#blog" title="Blogs & Articles" delayMs={5000} />

      </JuicerFeedProvider>
    </main>
  );
}