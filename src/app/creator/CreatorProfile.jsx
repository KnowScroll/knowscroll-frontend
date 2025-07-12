// src/app/components/creator/CreatorProfile.jsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import CreatorStats from './CreatorStats';
import { formatNumber, creatorAPI } from '@/app/utils/creatorUtils';

export default function CreatorProfile({ creator }) {
  const [isFollowing, setIsFollowing] = useState(creator.isFollowing);
  const [followerCount, setFollowerCount] = useState(creator.stats.followers);
  const [isLoading, setIsLoading] = useState(false);

  const handleFollowToggle = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    const newFollowState = !isFollowing;
    
    // Optimistic update
    setIsFollowing(newFollowState);
    setFollowerCount(prev => newFollowState ? prev + 1 : prev - 1);
    
    try {
      // TODO: Replace with actual API call
      await creatorAPI.toggleFollow(creator.id, newFollowState);
    } catch (error) {
      // Revert on error
      setIsFollowing(!newFollowState);
      setFollowerCount(prev => newFollowState ? prev - 1 : prev + 1);
      console.error('Failed to update follow status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      {/* Main Profile Card */}
      <div className="relative w-full max-w-sm mx-auto">
        {/* Card with blue glow border effect */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border-2 border-blue-500/50 shadow-2xl shadow-blue-500/20">
          
          {/* Background Image */}
          <div className="relative h-96 w-full">
            <Image
              src={creator.backgroundImage}
              alt={`${creator.displayName} background`}
              fill
              className="object-cover"
              priority
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            {/* Profile Info Overlay */}
            <div className="absolute top-6 left-6 right-6">
              <div className="flex items-center justify-between">
                {/* Profile Image and Info */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Image
                      src={creator.profileImage}
                      alt={creator.displayName}
                      width={60}
                      height={60}
                      className="rounded-full border-2 border-white/50"
                    />
                    {creator.isVerified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h1 className="text-white font-bold text-xl">
                      {creator.displayName}
                    </h1>
                    <p className="text-gray-300 text-sm">
                      {creator.bio}
                    </p>
                  </div>
                </div>
                
                {/* Follow Button */}
                <button
                  onClick={handleFollowToggle}
                  className={`
                    px-6 py-2 rounded-full font-semibold text-sm transition-all duration-200
                    ${isFollowing 
                      ? 'bg-gray-600 text-white hover:bg-gray-700' 
                      : 'bg-white text-black hover:bg-gray-200'
                    }
                  `}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            </div>
            
            {/* Stats at bottom of card */}
            <div className="absolute bottom-6 left-6 right-6">
              <CreatorStats 
                followers={followerCount}
                shortsUploaded={creator.stats.shortsUploaded}
                formatNumber={formatNumber}
              />
            </div>
          </div>
        </div>
        
        {/* Additional glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl -z-10 scale-105" />
      </div>
      
      {/* Creator Actions */}
      <div className="mt-8 flex gap-4">
        <button className="px-6 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors">
          Message
        </button>
        <button className="px-6 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors">
          Share Profile
        </button>
      </div>
      
      {/* Bio Section */}
      {creator.bio && (
        <div className="mt-6 max-w-sm text-center">
          <p className="text-gray-300 text-sm leading-relaxed">
            Passionate about creating amazing content and sharing knowledge with the community. 
            Join me on this creative journey!
          </p>
        </div>
      )}
    </div>
  );
}