'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  RefreshCw, 
  Clock, 
  Eye, 
  Play, 
  Heart,
  Bookmark,
  Share2,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react';

// Mock data for personalized reels
const generatePersonalizedReels = () => [
  {
    id: 'p1',
    title: 'Advanced React Hooks Patterns',
    subtitle: 'Master useCallback, useMemo, and custom hooks',
    thumbnailUrl: 'https://via.placeholder.com/320x480/1f2937/ffffff?text=React+Hooks',
    instructor: 'Alex Chen',
    duration: '4:32',
    views: '28K',
    tags: ['React', 'JavaScript', 'Advanced'],
    color: 'from-blue-600 to-purple-600',
    recommendationReason: 'Based on your React learning',
    trending: true,
    difficulty: 'Advanced',
    category: 'Frontend'
  },
  {
    id: 'p2',
    title: 'AI Ethics in Modern Development',
    subtitle: 'Understanding responsible AI implementation',
    thumbnailUrl: 'https://via.placeholder.com/320x480/059669/ffffff?text=AI+Ethics',
    instructor: 'Dr. Sarah Kim',
    duration: '6:15',
    views: '45K',
    tags: ['AI', 'Ethics', 'Technology'],
    color: 'from-emerald-600 to-teal-600',
    recommendationReason: 'Trending in AI community',
    trending: false,
    difficulty: 'Intermediate',
    category: 'AI/ML'
  },
  {
    id: 'p3',
    title: 'Microservices Architecture Deep Dive',
    subtitle: 'Building scalable distributed systems',
    thumbnailUrl: 'https://via.placeholder.com/320x480/dc2626/ffffff?text=Microservices',
    instructor: 'Mike Rodriguez',
    duration: '8:45',
    views: '67K',
    tags: ['Architecture', 'Backend', 'Scalability'],
    color: 'from-red-600 to-pink-600',
    recommendationReason: 'Popular among developers',
    trending: true,
    difficulty: 'Advanced',
    category: 'Backend'
  },
  {
    id: 'p4',
    title: 'CSS Grid vs Flexbox: When to Use What',
    subtitle: 'Master modern CSS layout techniques',
    thumbnailUrl: 'https://via.placeholder.com/320x480/7c3aed/ffffff?text=CSS+Layouts',
    instructor: 'Emma Thompson',
    duration: '5:20',
    views: '34K',
    tags: ['CSS', 'Layout', 'Design'],
    color: 'from-violet-600 to-purple-600',
    recommendationReason: 'Matches your CSS interests',
    trending: false,
    difficulty: 'Intermediate',
    category: 'Frontend'
  },
  {
    id: 'p5',
    title: 'Machine Learning Model Deployment',
    subtitle: 'From Jupyter to production with Docker',
    thumbnailUrl: 'https://via.placeholder.com/320x480/ea580c/ffffff?text=ML+Deploy',
    instructor: 'David Liu',
    duration: '12:30',
    views: '89K',
    tags: ['ML', 'DevOps', 'Docker'],
    color: 'from-orange-600 to-yellow-600',
    recommendationReason: 'Based on your ML progress',
    trending: true,
    difficulty: 'Advanced',
    category: 'AI/ML'
  },
  {
    id: 'p6',
    title: 'TypeScript Generics Masterclass',
    subtitle: 'Write type-safe, reusable code',
    thumbnailUrl: 'https://via.placeholder.com/320x480/0891b2/ffffff?text=TypeScript',
    instructor: 'Jordan Park',
    duration: '7:18',
    views: '52K',
    tags: ['TypeScript', 'JavaScript', 'Types'],
    color: 'from-cyan-600 to-blue-600',
    recommendationReason: 'Next step in your TS journey',
    trending: false,
    difficulty: 'Advanced',
    category: 'Frontend'
  }
];

// Individual Reel Card Component
const ReelCard = ({ reel, index, onPlay, onLike, onBookmark, onShare }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <motion.div
      className="relative flex-shrink-0 w-72 h-96 rounded-2xl overflow-hidden cursor-pointer group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onPlay(reel)}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${reel.thumbnailUrl})` }}
      />
      
      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t ${reel.color} opacity-40 mix-blend-overlay`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      
      {/* Trending Badge */}
      {reel.trending && (
        <motion.div
          className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          <TrendingUp className="w-3 h-3" />
          Trending
        </motion.div>
      )}

      {/* Difficulty Badge */}
      <div className={`absolute top-4 right-4 ${getDifficultyColor(reel.difficulty)} text-white px-2 py-1 rounded-full text-xs font-semibold`}>
        {reel.difficulty}
      </div>

      {/* Play Button Overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-black/20 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white/90 rounded-full p-4 shadow-lg"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Play className="w-8 h-8 text-black fill-current" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute top-20 right-4 flex flex-col gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <motion.button
              className={`p-2 rounded-full shadow-lg transition-colors ${
                isLiked ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-700'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
                onLike(reel);
              }}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </motion.button>
            
            <motion.button
              className={`p-2 rounded-full shadow-lg transition-colors ${
                isBookmarked ? 'bg-blue-500 text-white' : 'bg-white/90 text-gray-700'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsBookmarked(!isBookmarked);
                onBookmark(reel);
              }}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </motion.button>
            
            <motion.button
              className="p-2 bg-white/90 text-gray-700 rounded-full shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onShare(reel);
              }}
            >
              <Share2 className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        {/* Category Tag */}
        <div className="mb-2">
          <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full">
            {reel.category}
          </span>
        </div>

        {/* Title and Subtitle */}
        <h3 className="text-white font-bold text-lg mb-1 line-clamp-2">
          {reel.title}
        </h3>
        <p className="text-white/80 text-sm mb-3 line-clamp-2">
          {reel.subtitle}
        </p>

        {/* Instructor */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">
              {reel.instructor.charAt(0)}
            </span>
          </div>
          <span className="text-white/80 text-sm">{reel.instructor}</span>
        </div>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-white/60 text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{reel.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{reel.views}</span>
            </div>
          </div>
        </div>

        {/* Recommendation Reason */}
        <div className="mt-2 text-xs text-blue-300 font-medium">
          {reel.recommendationReason}
        </div>
      </div>
    </motion.div>
  );
};

// Main ReelsForYou Component
const ReelsForYou = () => {
  const [reels, setReels] = useState(generatePersonalizedReels());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const scrollContainerRef = useRef(null);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setReels(generatePersonalizedReels());
    setIsRefreshing(false);
  };

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 320; // Card width + gap
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handlePlay = (reel) => {
    console.log('Playing reel:', reel.title);
    // TODO: Implement play functionality - navigate to reel player
  };

  const handleLike = (reel) => {
    console.log('Liked reel:', reel.title);
    // TODO: Implement like functionality - API call to like reel
  };

  const handleBookmark = (reel) => {
    console.log('Bookmarked reel:', reel.title);
    // TODO: Implement bookmark functionality - API call to bookmark reel
  };

  const handleShare = (reel) => {
    console.log('Sharing reel:', reel.title);
    // TODO: Implement share functionality - native share API or custom modal
  };

  return (
    <section className="relative py-12 px-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <motion.div
            className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-1">
              Reels For You
            </h2>
            {/* <p className="text-gray-300 text-sm">
              Personalized content based on your learning journey
            </p> */}
          </div>
        </div>

        <motion.button
          className={`flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors ${
            isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleRefresh}
          disabled={isRefreshing}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={isRefreshing ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0, ease: "linear" }}
          >
            <RefreshCw className="w-4 h-4" />
          </motion.div>
          <span className="text-sm font-medium">
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </span>
        </motion.button>
      </div>

      {/* Reels Container */}
      <div className="relative">
        {/* Navigation Buttons */}
        <div className="hidden md:block">
          <motion.button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors -ml-6"
            onClick={() => scroll('left')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          
          <motion.button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors -mr-6"
            onClick={() => scroll('right')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Scrollable Reels */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <AnimatePresence mode="wait">
            {reels.map((reel, index) => (
              <ReelCard
                key={reel.id}
                reel={reel}
                index={index}
                onPlay={handlePlay}
                onLike={handleLike}
                onBookmark={handleBookmark}
                onShare={handleShare}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Loading State */}
      <AnimatePresence>
        {isRefreshing && (
          <motion.div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-full p-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="w-8 h-8 text-white" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default ReelsForYou;