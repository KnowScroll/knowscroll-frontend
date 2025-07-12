'use client';

import { MoreHorizontal, Play, Heart, Share, Clock, Eye } from 'lucide-react';
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

  const handlePlayClick = (e) => {
    e.stopPropagation();
    console.log('Play reel:', reel.id);
    // Implement play functionality
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
      onClick={handlePlayClick}
    >
      {/* Video/Thumbnail Area */}
      <div className="relative w-full h-full">
        {reel.thumbnailUrl ? (
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${reel.thumbnailUrl})` }}
          >
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>
        ) : (
          // Fallback for reels without thumbnails
          <div className="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto mb-2"></div>
              <p className="text-sm">Video Preview</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        )}

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

        {/* Video Info Footer */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-semibold text-sm truncate mb-1">
                {reel.title}
              </h3>
              {reel.subtitle && (
                <p className="text-gray-300 text-xs mb-2 line-clamp-2">
                  {reel.subtitle}
                </p>
              )}
              
              {/* Instructor info */}
              {reel.instructor && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">
                      {reel.instructor.charAt(0)}
                    </span>
                  </div>
                  <span className="text-gray-300 text-xs">
                    {reel.instructor}
                  </span>
                </div>
              )}

              {/* Duration and Views */}
              <div className="flex items-center gap-4 text-gray-300 text-xs">
                {reel.duration && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{reel.duration}</span>
                  </div>
                )}
                {reel.views && (
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{reel.views}</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {reel.tags && reel.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {reel.tags.slice(0, 2).map((tag, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-white/20 text-white px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <button
              onClick={handleMenuClick}
              className="p-1 text-white/80 hover:text-white transition-colors ml-2"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}