'use client';

import { MoreHorizontal, Play, Heart, Share } from 'lucide-react';
import { useState } from 'react';

export default function ReelCard({ reel }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Define heights based on reel.height property
  const getCardHeight = (height) => {
    switch (height) {
      case 'short':
        return 'h-64';
      case 'medium':
        return 'h-80';
      case 'tall':
        return 'h-96';
      default:
        return 'h-80';
    }
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    // Implement share functionality
    console.log('Share reel:', reel.id);
  };

  const handleMenuClick = (e) => {
    e.stopPropagation();
    // Implement menu functionality
    console.log('Open menu for reel:', reel.id);
  };

  return (
    <div
      className={`
        relative bg-white rounded-2xl overflow-hidden cursor-pointer
        transform transition-all duration-300 ease-in-out
        hover:scale-[1.02] hover:shadow-xl
        ${getCardHeight(reel.height)}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video Placeholder Area */}
      <div className="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        {/* Play Button Overlay */}
        <div
          className={`
            absolute inset-0 flex items-center justify-center
            bg-black/10 transition-opacity duration-300
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <div className="bg-white/90 rounded-full p-4 shadow-lg">
            <Play className="w-8 h-8 text-black fill-current" />
          </div>
        </div>

        {/* Video Placeholder Content */}
        <div className="text-center text-gray-400">
          <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto mb-2"></div>
          <p className="text-sm">Video Preview</p>
        </div>

        {/* Action Buttons - Show on Hover */}
        <div
          className={`
            absolute top-4 right-4 flex flex-col gap-2
            transition-opacity duration-300
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <button
            onClick={handleLike}
            className={`
              p-2 rounded-full shadow-lg transition-colors
              ${isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-white/90 text-gray-700 hover:bg-red-50'
              }
            `}
          >
            <Heart 
              className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} 
            />
          </button>
          
          <button
            onClick={handleShare}
            className="p-2 bg-white/90 text-gray-700 rounded-full shadow-lg hover:bg-blue-50 transition-colors"
          >
            <Share className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Video Info Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium text-sm truncate">
              {reel.title}
            </h3>
            <p className="text-gray-300 text-xs mt-1">
              2.3M views • 2 days ago
            </p>
          </div>
          
          <button
            onClick={handleMenuClick}
            className="p-1 text-white/80 hover:text-white transition-colors"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}