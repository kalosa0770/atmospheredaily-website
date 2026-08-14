// app/about/page.tsx
'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { 
  Target, 
  Eye, 
  Sparkles, 
  BookOpen, 
  Podcast, 
  HeartHandshake, 
  Users, 
  GraduationCap, 
  Palette, 
  Briefcase, 
  Globe, 
  ShoppingBag, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Cpu,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const spotlightFeatures = [
  { id: '01', title: 'Global Insights', desc: 'Spotlight geopolitical or economic risks that could disrupt growth in different industries.' },
  { id: '02', title: 'Policy Watch', desc: 'Spotlight government policies or regulations that are positively or negatively affecting different industries.' },
  { id: '03', title: 'Brand Wars', desc: 'Spotlighting marketing campaigns or strategies that are dominating different markets.' },
  { id: '04', title: 'Market Spotlight', desc: 'Journalism and stories focused on finance, markets, policy, business trends, and merging technologies.' },
  { id: '05', title: 'Major Players', desc: 'Spotlights the biggest players in different industries and highlights what differentiates them.' },
  { id: '06', title: 'Chain Breakers', desc: 'Spotlight narratives of advocates fighting inequity and driving progress.' },
  { id: '07', title: 'Major Moves', desc: 'Spotlight people making extraordinary impact in their sphere of influence and churches serving communities beyond the pulpit.' },
  { id: '08', title: 'Major Quotes', desc: 'Spotlight transformational quotes by leaders and kingdom culture shapers.' },
  { id: '09', title: 'Market Trends', desc: 'What products or services have become cultural & social trends in our market and their main drivers.' },
  { id: '10', title: 'Next Wave', desc: 'Spotlight new technologies which are transforming industries.' },
  { id: '11', title: 'Testimony Spotlight', desc: 'Sharing testimonies from all over the world of lives impacted by the gospel.' },
  { id: '12', title: 'Artist Spotlight', desc: 'Profiling Christian artists, musicians, and designers to amplify their work.' },
  { id: '13', title: 'Prophetic Voices', desc: 'Discerning societal shifts through Scripture or spotlight prophecies by credible voices.' },
  { id: '14', title: 'Ad Awards', desc: 'Celebrating kingdom culture shapers with annual awards to affirm their impact.' },
];

export default function AboutPage() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const scrollAmount = sliderRef.current.clientWidth * 0.8;
    sliderRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <main className="w-full bg-white text-text font-body antialiased selection:bg-button-hover selection:text-text">
      
      {/* 1. HERO & MISSION / VISION SECTION */}
      <section className="w-full bg-section-background text-section-text py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-text/20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <span className="text-button-hover font-heading text-xs uppercase tracking-widest font-bold">
              Who We Are
            </span>
            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold uppercase tracking-tight mt-2 text-white">
              Atmosphere Daily
            </h1>
            <p className="text-sm sm:text-base text-section-text/80 mt-4 leading-relaxed font-body">
              Crafting news content and daily devotionals that take less than 5 minutes to read, equipping believers to lead boldly with biblical knowledge and practical wisdom.
            </p>
          </div>

          {/* Mission & Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mission Card */}
            <div className="bg-white/5 border border-white/10 p-8 flex flex-col justify-between rounded-none hover:border-button-hover transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl sm:text-2xl font-heading uppercase font-bold text-button-hover">
                    Mission
                  </h2>
                  <Target className="w-6 h-6 text-button-hover" />
                </div>
                <p className="text-xs sm:text-sm text-section-text/90 leading-relaxed font-body">
                  To form a global community of culture shapers who lead boldly with biblical knowledge and practical wisdom, living faithfully until "Kingdom come" is realized in every sphere of life.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-button-hover text-text p-8 flex flex-col justify-between rounded-none">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl sm:text-2xl font-heading uppercase font-bold text-text">
                    Vision
                  </h2>
                  <Eye className="w-6 h-6 text-text" />
                </div>
                <p className="text-xs sm:text-sm text-text/90 leading-relaxed font-body font-medium">
                  To craft news content and daily devotionals that take less than 5 minutes to read but equip believers to serve communities, pursue justice, and drive progress in every sphere of society.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. AD CONNECT: DAILY ANCHORS SECTION */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 border-b border-text/10 bg-background/50">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <span className="text-section-background font-heading text-xs uppercase tracking-widest font-bold">
              Core Pillars
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-extrabold uppercase tracking-tight text-text mt-1">
              AD Connect: Daily Anchors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Devotional */}
            <div className="bg-white border border-text/15 p-6 rounded-none flex flex-col justify-between hover:border-section-background transition-colors">
              <div>
                <div className="w-10 h-10 bg-section-background text-white flex items-center justify-center mb-4">
                  <BookOpen className="w-5 h-5 text-button-hover" />
                </div>
                <h3 className="text-base font-heading font-bold uppercase text-text mb-2">
                  AD Connect Devotional
                </h3>
                <p className="text-xs text-text/75 leading-relaxed font-body">
                  5-minute reads that ground believers in Scripture while connecting to real-world issues. We break down complex biblical truths into bite-sized, relatable lessons available across our web pages and growing WhatsApp channel.
                </p>
              </div>
            </div>

            {/* Podcast */}
            <div className="bg-white border border-text/15 p-6 rounded-none flex flex-col justify-between hover:border-section-background transition-colors">
              <div>
                <div className="w-10 h-10 bg-section-background text-white flex items-center justify-center mb-4">
                  <Podcast className="w-5 h-5 text-button-hover" />
                </div>
                <h3 className="text-base font-heading font-bold uppercase text-text mb-2">
                  AD Connect Podcast
                </h3>
                <p className="text-xs text-text/75 leading-relaxed font-body">
                  Based on Bible Study topics, we invite culture shapers to join our podcast conversations. Broadcast live on all social media platforms every Saturday at 11:00 AM.
                </p>
              </div>
            </div>

            {/* Prayer Campaign */}
            <div className="bg-white border border-text/15 p-6 rounded-none flex flex-col justify-between hover:border-section-background transition-colors">
              <div>
                <div className="w-10 h-10 bg-section-background text-white flex items-center justify-center mb-4">
                  <HeartHandshake className="w-5 h-5 text-button-hover" />
                </div>
                <h3 className="text-base font-heading font-bold uppercase text-text mb-2">
                  AD Prayer Campaign
                </h3>
                <p className="text-xs text-text/75 leading-relaxed font-body">
                  Aligning believers worldwide in targeted intercession and prayer for pressing global and social issues.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EQUIPPING CULTURE SHAPERS SECTION */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 border-b border-text/10 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <span className="text-section-background font-heading text-xs uppercase tracking-widest font-bold">
              Gatherings & Advisory
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-extrabold uppercase tracking-tight text-text mt-1">
              Equipping Culture Shapers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Great Migration */}
            <div className="p-6 border-l-4 border-section-background bg-background/40">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-section-background" />
                <h3 className="text-base font-heading font-bold uppercase text-text">
                  The Great Migration Conference
                </h3>
              </div>
              <p className="text-xs text-text/80 leading-relaxed font-body">
                Ticketed conferences providing practical wisdom for leadership in politics, business, and community life. A key highlight topic is exploring how faith can transform business into ministry.
              </p>
            </div>

            {/* Care Culture Workshops */}
            <div className="p-6 border-l-4 border-button-hover bg-background/40">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-4 h-4 text-section-background" />
                <h3 className="text-base font-heading font-bold uppercase text-text">
                  Care Culture Workshops
                </h3>
              </div>
              <p className="text-xs text-text/80 leading-relaxed font-body">
                Providing advisory services and tailored "Faith in the Workplace" devotionals for corporate companies seeking a peak performance culture grounded in care.
              </p>
            </div>

            {/* Higher Learning */}
            <div className="p-6 border-l-4 border-button-hover bg-background/40">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="w-4 h-4 text-section-background" />
                <h3 className="text-base font-heading font-bold uppercase text-text">
                  Higher Learning
                </h3>
              </div>
              <p className="text-xs text-text/80 leading-relaxed font-body">
                Targeted sessions equipping student leaders to spearhead impact across university campus clubs, fellowships, and movements.
              </p>
            </div>

            {/* AD Creatives Conference */}
            <div className="p-6 border-l-4 border-section-background bg-background/40">
              <div className="flex items-center gap-2 mb-2">
                <Palette className="w-4 h-4 text-section-background" />
                <h3 className="text-base font-heading font-bold uppercase text-text">
                  AD Creatives Conference
                </h3>
              </div>
              <p className="text-xs text-text/80 leading-relaxed font-body">
                Connecting Scripture to artistry and innovation. We encourage artists, designers, and innovators to address social issues through their craft.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. AD SPOTLIGHT FEATURES SLIDER SECTION */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-section-background text-section-text border-b border-text/10">
        <div className="max-w-6xl mx-auto">
          
          {/* Header & Navigation Controls */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-button-hover font-heading text-xs uppercase tracking-widest font-bold">
                Editorial Coverage
              </span>
              <h2 className="text-2xl sm:text-4xl font-heading font-extrabold uppercase tracking-tight text-white mt-1">
                AD Spotlight Features
              </h2>
              <p className="text-xs sm:text-sm text-section-text/70 mt-1">
                Our journalism focuses on finance, markets, policy, culture, and emerging tech.
              </p>
            </div>

            {/* Manual Slider Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollSlider('left')}
                aria-label="Previous Spotlight Features"
                className="p-2 border border-white/20 hover:border-button-hover text-white hover:text-button-hover transition-colors rounded-none bg-white/5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollSlider('right')}
                aria-label="Next Spotlight Features"
                className="p-2 border border-white/20 hover:border-button-hover text-white hover:text-button-hover transition-colors rounded-none bg-white/5 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Horizontal Scroll Slider */}
          <div
            ref={sliderRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {spotlightFeatures.map((item) => (
              <div
                key={item.id}
                className="snap-start flex-none w-[260px] sm:w-[280px] lg:w-[300px] bg-white text-text p-5 border-b-4 border-button-hover rounded-none flex flex-col justify-between hover:bg-slate-50 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-heading font-bold text-section-background uppercase tracking-widest">
                      Spotlight #{item.id}
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-button-hover" />
                  </div>
                  <h3 className="text-sm font-heading font-bold uppercase text-text mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-text/75 leading-relaxed font-body">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. FUTURE VISION & EXPANSION */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-background/50 border-b border-text/10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <span className="text-section-background font-heading text-xs uppercase tracking-widest font-bold">
              Strategic Growth
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-extrabold uppercase tracking-tight text-text mt-1">
              Our Vision for the Future
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-text/10 p-6">
              <Globe className="w-6 h-6 text-section-background mb-3" />
              <h3 className="text-base font-heading font-bold uppercase text-text mb-2">
                Market Expansion
              </h3>
              <p className="text-xs text-text/75 leading-relaxed">
                Targeting new geographic regions and industries to broaden our business reach and capitalize on emerging global opportunities.
              </p>
            </div>

            <div className="bg-white border border-text/10 p-6">
              <Cpu className="w-6 h-6 text-section-background mb-3" />
              <h3 className="text-base font-heading font-bold uppercase text-text mb-2">
                Technology Investments
              </h3>
              <p className="text-xs text-text/75 leading-relaxed">
                Allocating resources to research and development, ensuring we stay ahead in AI, automation, and data-driven journalism solutions.
              </p>
            </div>

            <div className="bg-white border border-text/10 p-6">
              <TrendingUp className="w-6 h-6 text-section-background mb-3" />
              <h3 className="text-base font-heading font-bold uppercase text-text mb-2">
                Talent Development
              </h3>
              <p className="text-xs text-text/75 leading-relaxed">
                Investing in workforce training and leadership programs to nurture talent and strengthen our organizational capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PARTNER WITH US & SPONSORED CONTENT */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Partner Callout */}
          <div className="bg-section-background text-section-text p-8 sm:p-12 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-button-hover font-heading text-xs uppercase tracking-widest font-bold">
                Reach & Community
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold uppercase mt-1 text-white">
                Partner With Us
              </h2>
              <p className="text-xs sm:text-sm text-section-text/80 mt-3 leading-relaxed">
                Our platform currently reaches and equips <strong className="text-button-hover">3,000,000+ believers</strong> every 28 days, with <strong>87,000+ fully subscribed followers</strong> across our channels. We invite you to invest in a movement of "King Makers" that disciple nations.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-button-hover hover:bg-white text-text font-heading text-xs font-bold uppercase tracking-wider px-6 py-3 transition-colors duration-200 shrink-0"
            >
              Become a Partner <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Sponsored Opportunities Grid */}
          <div>
            <h3 className="text-lg font-heading font-bold uppercase text-text mb-4">
              Sponsored Content Opportunities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-text/15 p-6 bg-background/30">
                <ShieldCheck className="w-5 h-5 text-section-background mb-2" />
                <h4 className="text-sm font-heading font-bold uppercase text-text mb-1">
                  Ad Placements
                </h4>
                <p className="text-xs text-text/75 leading-relaxed">
                  We collaborate with ethical brands aligned with justice and community service, providing placements on our social pages and premium podcast episodes.
                </p>
              </div>

              <div className="border border-text/15 p-6 bg-background/30">
                <ShoppingBag className="w-5 h-5 text-section-background mb-2" />
                <h4 className="text-sm font-heading font-bold uppercase text-text mb-1">
                  Merchandise Partnerships
                </h4>
                <p className="text-xs text-text/75 leading-relaxed">
                  We collaborate with Christian creatives on co-branded apparel and products.
                </p>
              </div>

              <div className="border border-text/15 p-6 bg-background/30">
                <HeartHandshake className="w-5 h-5 text-section-background mb-2" />
                <h4 className="text-sm font-heading font-bold uppercase text-text mb-1">
                  Affiliate Partnerships
                </h4>
                <p className="text-xs text-text/75 leading-relaxed">
                  We recommend curated kingdom resources, books, and digital tools with commission structures.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}