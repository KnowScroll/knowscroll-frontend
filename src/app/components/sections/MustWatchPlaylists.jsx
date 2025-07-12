'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  PlayCircle, 
  Clock, 
  Users, 
  Star,
  Filter,
  Grid3X3,
  List,
  ChevronDown,
  BookOpen,
  Code,
  Palette,
  Briefcase,
  Lightbulb,
  Zap,
  Eye,
  Heart
} from 'lucide-react';

// Mock data for playlists
const generatePlaylists = () => [
  {
    id: 'pl1',
    title: 'Complete React Mastery',
    description: 'From basics to advanced patterns, master React development with real-world projects',
    coverImage: 'https://via.placeholder.com/400x300/1f2937/ffffff?text=React+Mastery',
    videoCount: 24,
    totalDuration: '8h 45m',
    difficulty: 'Beginner to Advanced',
    category: 'Frontend',
    instructor: 'Sarah Johnson',
    rating: 4.9,
    enrolledCount: 15600,
    tags: ['React', 'JavaScript', 'Frontend', 'Projects'],
    color: 'from-blue-600 to-purple-600',
    featured: true,
    lastUpdated: '2 days ago',
    completionRate: 87
  },
  {
    id: 'pl2',
    title: 'AI & Machine Learning Fundamentals',
    description: 'Understand AI concepts, build ML models, and deploy them in production',
    coverImage: 'https://via.placeholder.com/400x300/059669/ffffff?text=AI+ML+Course',
    videoCount: 18,
    totalDuration: '12h 30m',
    difficulty: 'Intermediate',
    category: 'AI/ML',
    instructor: 'Dr. Alex Chen',
    rating: 4.8,
    enrolledCount: 8900,
    tags: ['AI', 'Machine Learning', 'Python', 'Data Science'],
    color: 'from-emerald-600 to-teal-600',
    featured: true,
    lastUpdated: '1 week ago',
    completionRate: 73
  },
  {
    id: 'pl3',
    title: 'System Design Interview Prep',
    description: 'Master system design concepts for technical interviews at top tech companies',
    coverImage: 'https://via.placeholder.com/400x300/dc2626/ffffff?text=System+Design',
    videoCount: 15,
    totalDuration: '6h 20m',
    difficulty: 'Advanced',
    category: 'Backend',
    instructor: 'Mike Rodriguez',
    rating: 4.9,
    enrolledCount: 12300,
    tags: ['System Design', 'Architecture', 'Interviews', 'Scalability'],
    color: 'from-red-600 to-pink-600',
    featured: false,
    lastUpdated: '3 days ago',
    completionRate: 91
  },
  {
    id: 'pl4',
    title: 'Modern CSS & Design Systems',
    description: 'Build beautiful, maintainable UIs with modern CSS techniques and design systems',
    coverImage: 'https://via.placeholder.com/400x300/7c3aed/ffffff?text=CSS+Design',
    videoCount: 20,
    totalDuration: '5h 15m',
    difficulty: 'Intermediate',
    category: 'Design',
    instructor: 'Emma Thompson',
    rating: 4.7,
    enrolledCount: 6700,
    tags: ['CSS', 'Design Systems', 'UI/UX', 'Responsive'],
    color: 'from-violet-600 to-purple-600',
    featured: false,
    lastUpdated: '5 days ago',
    completionRate: 82
  },
  {
    id: 'pl5',
    title: 'DevOps & Cloud Architecture',
    description: 'Learn Docker, Kubernetes, CI/CD, and cloud deployment strategies',
    coverImage: 'https://via.placeholder.com/400x300/ea580c/ffffff?text=DevOps+Cloud',
    videoCount: 22,
    totalDuration: '10h 40m',
    difficulty: 'Intermediate to Advanced',
    category: 'DevOps',
    instructor: 'David Liu',
    rating: 4.8,
    enrolledCount: 9800,
    tags: ['DevOps', 'Docker', 'Kubernetes', 'AWS', 'CI/CD'],
    color: 'from-orange-600 to-yellow-600',
    featured: true,
    lastUpdated: '1 day ago',
    completionRate: 76
  },
  {
    id: 'pl6',
    title: 'Full-Stack JavaScript Bootcamp',
    description: 'Build complete web applications using Node.js, Express, React, and MongoDB',
    coverImage: 'https://via.placeholder.com/400x300/0891b2/ffffff?text=Full+Stack+JS',
    videoCount: 35,
    totalDuration: '15h 55m',
    difficulty: 'Beginner to Intermediate',
    category: 'Full-Stack',
    instructor: 'Jordan Park',
    rating: 4.6,
    enrolledCount: 18900,
    tags: ['JavaScript', 'Node.js', 'React', 'MongoDB', 'Full-Stack'],
    color: 'from-cyan-600 to-blue-600',
    featured: false,
    lastUpdated: '1 week ago',
    completionRate: 69
  }
];

// Category icons mapping
const categoryIcons = {
  'Frontend': Code,
  'Backend': Briefcase,
  'AI/ML': Lightbulb,
  'Design': Palette,
  'DevOps': Zap,
  'Full-Stack': BookOpen
};

// Playlist Card Component
const PlaylistCard = ({ playlist, index, viewMode }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const CategoryIcon = categoryIcons[playlist.category] || BookOpen;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: index * 0.1, duration: 0.5 }
    }
  };

  const handlePlaylistClick = () => {
    console.log('Opening playlist:', playlist.title);
    // TODO: Navigate to playlist page or open playlist modal
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    // TODO: API call to like/unlike playlist
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        variants={cardVariants}
        className="bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
        whileHover={{ scale: 1.02 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handlePlaylistClick}
      >
        <div className="flex items-center gap-4">
          {/* Cover Image */}
          <div className="relative w-24 h-18 rounded-lg overflow-hidden flex-shrink-0">
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${playlist.coverImage})` }}
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${playlist.color} opacity-60`} />
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayCircle className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">{playlist.title}</h3>
                <p className="text-gray-300 text-sm mb-2 line-clamp-2">{playlist.description}</p>
                
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span>{playlist.videoCount} videos</span>
                  <span>{playlist.totalDuration}</span>
                  <span>{playlist.enrolledCount.toLocaleString()} enrolled</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-white text-sm">{playlist.rating}</span>
                </div>
                
                <motion.button
                  className={`p-2 rounded-full transition-colors ${
                    isLiked ? 'bg-red-500 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleLike}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={cardVariants}
      className="relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden cursor-pointer group"
      whileHover={{ scale: 1.05, y: -8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handlePlaylistClick}
    >
      {/* Featured Badge */}
      {playlist.featured && (
        <div className="absolute top-4 left-4 z-10 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <Star className="w-3 h-3 fill-current" />
          Featured
        </div>
      )}

      {/* Cover Image */}
      <div className="relative h-48 overflow-hidden">
        <div 
          className="w-full h-full bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${playlist.coverImage})` }}
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${playlist.color} opacity-60`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Category Icon */}
        <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full">
          <CategoryIcon className="w-4 h-4 text-white" />
        </div>

        {/* Play Button Overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-black/30 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white/90 rounded-full p-3 shadow-lg"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
              >
                <PlayCircle className="w-6 h-6 text-black" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Count Badge */}
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
          {playlist.videoCount} videos
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-white font-bold text-lg leading-tight pr-2">{playlist.title}</h3>
          <motion.button
            className={`flex-shrink-0 p-1 rounded-full transition-colors ${
              isLiked ? 'bg-red-500 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </motion.button>
        </div>

        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{playlist.description}</p>

        {/* Instructor */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">
              {playlist.instructor.charAt(0)}
            </span>
          </div>
          <span className="text-gray-300 text-sm">{playlist.instructor}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-gray-400 text-xs mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{playlist.totalDuration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{playlist.enrolledCount.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-white">{playlist.rating}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span>Completion Rate</span>
            <span>{playlist.completionRate}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1">
            <motion.div
              className={`h-1 rounded-full bg-gradient-to-r ${playlist.color}`}
              initial={{ width: 0 }}
              animate={{ width: `${playlist.completionRate}%` }}
              transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
            />
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {playlist.tags.slice(0, 3).map((tag, i) => (
            <span 
              key={i}
              className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Main Must Watch Playlists Component
const MustWatchPlaylists = () => {
  const [playlists, setPlaylists] = useState(generatePlaylists());
  const [filteredPlaylists, setFilteredPlaylists] = useState(playlists);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');

  const categories = ['All', 'Frontend', 'Backend', 'AI/ML', 'Design', 'DevOps', 'Full-Stack'];

  useEffect(() => {
    let filtered = playlists;
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(playlist => playlist.category === selectedCategory);
    }

    // Sort playlists
    switch (sortBy) {
      case 'featured':
        filtered = filtered.sort((a, b) => b.featured - a.featured);
        break;
      case 'rating':
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'enrolled':
        filtered = filtered.sort((a, b) => b.enrolledCount - a.enrolledCount);
        break;
      case 'recent':
        filtered = filtered.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
        break;
      default:
        break;
    }

    setFilteredPlaylists(filtered);
  }, [selectedCategory, sortBy, playlists]);

  return (
    <section className="py-12 px-4">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <motion.div
            className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <TrendingUp className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <p className="text-xl md:text-4xl font-bold text-white mb-1">
              Must Watch Playlists
            </p>
            {/* <p className="text-gray-300 text-sm">
              Curated learning paths from industry experts
            </p> */}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* View Mode Toggle */}
          <div className="flex bg-white/10 rounded-lg p-1">
            <button
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid' ? 'bg-white/20 text-white' : 'text-gray-400'
              }`}
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              className={`p-2 rounded transition-colors ${
                viewMode === 'list' ? 'bg-white/20 text-white' : 'text-gray-400'
              }`}
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/10 text-white rounded-lg px-4 py-2 pr-8 text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              <option value="featured" className="bg-gray-800">Featured</option>
              <option value="rating" className="bg-gray-800">Highest Rated</option>
              <option value="enrolled" className="bg-gray-800">Most Popular</option>
              <option value="recent" className="bg-gray-800">Recently Updated</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Category Filters */}
      {/* <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <motion.button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-white text-black'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
            onClick={() => setSelectedCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div> */}

      {/* Playlists Grid/List */}
      <motion.div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }
        layout
      >
        <AnimatePresence mode="wait">
          {filteredPlaylists.map((playlist, index) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              index={index}
              viewMode={viewMode}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* No Results */}
      {filteredPlaylists.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-gray-400 mb-4">
            <BookOpen className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No playlists found</h3>
            <p>Try adjusting your filters or check back later for new content.</p>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default MustWatchPlaylists;