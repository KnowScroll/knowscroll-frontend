'use client';

import ExploreSection from './ExploreSection';

export default function Hero() {
  return (
    <section className="min-h-screen w-full">
      {/* Hero Content Container */}
      <div className="container mx-auto px-4 py-8">
        {/* Main Hero Content */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Discover Amazing Content
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore trending videos, shorts, and creative content from creators around the world
          </p>
        </div>

        {/* Explore Shorts Section */}
        <ExploreSection heading="Explore"/>
      </div>
    </section>
  );
}