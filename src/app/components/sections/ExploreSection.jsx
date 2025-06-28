'use client';

import { Zap, ArrowRight } from 'lucide-react';
import ReelCard from './ReelCard';

export default function ExploreSection({heading , reelsData}) {
  // Sample data for reels - you can replace this with actual data
  const reels = [
    {
      id: 1,
      title: "Amazing Travel Adventure",
      thumbnail: null, // Placeholder for now
      height: "tall", // Different heights for masonry layout
    },
    {
      id: 2,
      title: "Cooking Masterclass",
      thumbnail: null,
      height: "medium",
    },
    {
      id: 3,
      title: "Dance Performance",
      thumbnail: null,
      height: "tall",
    },
    {
      id: 4,
      title: "Tech Review",
      thumbnail: null,
      height: "short",
    },
    {
      id: 5,
      title: "Art Tutorial",
      thumbnail: null,
      height: "medium",
    },
    {
      id: 6,
      title: "Fitness Workout",
      thumbnail: null,
      height: "tall",
    },
  ];

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-full">
            <Zap className="w-6 h-6 text-black" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {heading || "Explore Shorts"}
          </h2>
        </div>
        
        <button className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
          <span className="text-lg font-medium">View All</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Masonry Grid Layout */}
      <div className="grid grid-cols-2 gap-4 max-w-4xl">
        {/* Left Column */}
        <div className="space-y-4">
          {reels
            .filter((_, index) => index % 2 === 0)
            .map((reel) => (
              <ReelCard key={reel.id} reel={reel} />
            ))}
        </div>
        
        {/* Right Column */}
        <div className="space-y-4">
          {reels
            .filter((_, index) => index % 2 === 1)
            .map((reel) => (
              <ReelCard key={reel.id} reel={reel} />
            ))}
        </div>
      </div>
    </div>
  );
}