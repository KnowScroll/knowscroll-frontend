'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  X, 
  TrendingUp, 
  Clock, 
  Star,
  Sparkles,
  Zap,
  ChevronDown,
  History,
  Hash,
  User,
  Play,
  ArrowRight
} from 'lucide-react';

// Import the components
import { ReelsForYou, MustWatchPlaylists, UploadedShorts } from '@/app/components/sections';

// Search Header Component
const SearchHeader = ({ searchQuery, setSearchQuery, suggestions, showSuggestions, setShowSuggestions }) => {
  const [recentSearches] = useState(['React hooks', 'Machine Learning', 'CSS Grid', 'System Design']);
  const [trendingTopics] = useState(['AI Ethics', 'Web3', 'DevOps', 'TypeScript', 'Flutter']);
  const inputRef = useRef(null);

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for reels, playlists, creators..."
          className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl py-4 pl-12 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/15 transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
        />
        {searchQuery && (
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            onClick={() => {
              setSearchQuery('');
              inputRef.current?.focus();
            }}
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Search Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && (searchQuery || true) && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {searchQuery ? (
              // Show filtered suggestions when typing
              <div className="p-4">
                <div className="text-gray-300 text-sm mb-3 flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Search suggestions
                </div>
                {suggestions.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5).map((suggestion, index) => (
                  <motion.div
                    key={suggestion}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-white/10 cursor-pointer transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      setSearchQuery(suggestion);
                      setShowSuggestions(false);
                    }}
                  >
                    <Search className="w-4 h-4 text-gray-400" />
                    <span className="text-white">{suggestion}</span>
                  </motion.div>
                ))}
              </div>
            ) : (
              // Show recent searches and trending when not typing
              <div className="p-4 space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-gray-300 text-sm mb-3">
                    <History className="w-4 h-4" />
                    Recent searches
                  </div>
                  {recentSearches.map((search, index) => (
                    <motion.div
                      key={search}
                      className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-white/10 cursor-pointer transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        setSearchQuery(search);
                        setShowSuggestions(false);
                      }}
                    >
                      <History className="w-4 h-4 text-gray-400" />
                      <span className="text-white">{search}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-4">
                  <div className="flex items-center gap-2 text-gray-300 text-sm mb-3">
                    <Hash className="w-4 h-4" />
                    Trending topics
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {trendingTopics.map((topic, index) => (
                      <motion.button
                        key={topic}
                        className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-sm text-white transition-colors"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => {
                          setSearchQuery(topic);
                          setShowSuggestions(false);
                        }}
                      >
                        {topic}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Search Results Component
const SearchResults = ({ searchQuery }) => {
  // Mock search results
  const searchResults = {
    reels: [
      {
        id: 'sr1',
        title: 'Advanced React Hooks in Practice',
        instructor: 'Sarah Johnson',
        duration: '4:32',
        views: '28K',
        thumbnailUrl: 'https://via.placeholder.com/300x400/1f2937/ffffff?text=React+Result',
        relevance: 95
      },
      {
        id: 'sr2',
        title: 'React Performance Optimization',
        instructor: 'Mike Chen',
        duration: '6:15',
        views: '45K',
        thumbnailUrl: 'https://via.placeholder.com/300x400/059669/ffffff?text=React+Perf',
        relevance: 87
      }
    ],
    playlists: [
      {
        id: 'sp1',
        title: 'Complete React Development Course',
        description: 'Master React from basics to advanced concepts',
        videoCount: 32,
        rating: 4.9,
        coverImage: 'https://via.placeholder.com/400x300/7c3aed/ffffff?text=React+Course',
        relevance: 98
      }
    ],
    creators: [
      {
        id: 'sc1',
        name: 'React Expert',
        username: '@reactexpert',
        followers: '125K',
        avatar: 'https://via.placeholder.com/100x100/4f46e5/ffffff?text=RE',
        verified: true,
        specialties: ['React', 'JavaScript', 'Frontend']
      }
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-8 space-y-12"
    >
      {/* Search Results Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          Search results for "{searchQuery}"
        </h2>
        <p className="text-gray-300">Found {searchResults.reels.length + searchResults.playlists.length + searchResults.creators.length} results in 0.05 seconds</p>
      </div>

      {/* Top Results */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-bold text-white">Top Results</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Reels Results */}
          {searchResults.reels.slice(0, 3).map((reel, index) => (
            <motion.div
              key={reel.id}
              className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer hover:bg-white/10 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div 
                className="h-48 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${reel.thumbnailUrl})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white/80 text-sm mb-1">
                    <Play className="w-4 h-4" />
                    <span>Reel</span>
                  </div>
                  <h4 className="text-white font-semibold">{reel.title}</h4>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>{reel.instructor}</span>
                  <span>{reel.duration}</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-500">{reel.views} views</span>
                  <span className="text-xs text-green-400">{reel.relevance}% match</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* All Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Reels Column */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Reels</h3>
            <button className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1">
              View all
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {searchResults.reels.map((reel, index) => (
              <motion.div
                key={reel.id}
                className="flex gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div 
                  className="w-16 h-16 bg-cover bg-center rounded-lg flex-shrink-0"
                  style={{ backgroundImage: `url(${reel.thumbnailUrl})` }}
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium text-sm mb-1 truncate">{reel.title}</h4>
                  <p className="text-gray-400 text-xs mb-1">{reel.instructor}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{reel.duration}</span>
                    <span>•</span>
                    <span>{reel.views}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Playlists Column */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Playlists</h3>
            <button className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1">
              View all
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {searchResults.playlists.map((playlist, index) => (
              <motion.div
                key={playlist.id}
                className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h4 className="text-white font-medium mb-2">{playlist.title}</h4>
                <p className="text-gray-400 text-sm mb-3">{playlist.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">{playlist.videoCount} videos</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-white">{playlist.rating}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Creators Column */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Creators</h3>
            <button className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1">
              View all
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {searchResults.creators.map((creator, index) => (
              <motion.div
                key={creator.id}
                className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div 
                  className="w-12 h-12 bg-cover bg-center rounded-full flex-shrink-0"
                  style={{ backgroundImage: `url(${creator.avatar})` }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-white font-medium text-sm">{creator.name}</h4>
                    {creator.verified && (
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-400 text-xs mb-1">{creator.username}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{creator.followers} followers</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {creator.specialties.slice(0, 2).map((specialty, i) => (
                      <span key={i} className="text-xs bg-white/10 text-gray-300 px-2 py-0.5 rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

// Main Search Page Component
const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  
  const suggestions = [
    'React hooks patterns',
    'Machine learning basics',
    'CSS grid layout',
    'System design interview',
    'TypeScript advanced',
    'Node.js best practices',
    'UI/UX design principles',
    'Database optimization',
    'Docker containers',
    'API design patterns'
  ];

  const filters = ['All', 'Reels', 'Playlists', 'Creators', 'Recent'];

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-container')) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen text-white relative overflow-hidden">


      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-5 backdrop-blur-xl border-b ">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4 mb-4">
              <motion.h1 
                className="text-2xl font-bold text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                Discover
              </motion.h1>
              <motion.div
                className="flex-1 max-w-2xl search-container"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <SearchHeader
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  suggestions={suggestions}
                  showSuggestions={showSuggestions}
                  setShowSuggestions={setShowSuggestions}
                />
              </motion.div>
            </div>

            {/* Filter Tabs */}
            <motion.div 
              className="flex gap-2 overflow-x-auto scrollbar-hide"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {filters.map((filter) => (
                <button
                  key={filter}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeFilter === filter
                      ? 'bg-white text-black'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </motion.div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4">
          {!searchQuery ? (
            // Default content when not searching
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <ReelsForYou />
              <MustWatchPlaylists />
              <UploadedShorts />
            </motion.div>
          ) : (
            // Search results
            <SearchResults searchQuery={searchQuery} />
          )}
        </main>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default SearchPage;