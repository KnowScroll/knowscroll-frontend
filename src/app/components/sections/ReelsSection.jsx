'use client';

import ReelsDeck from '../ReelsDeck';
import { TrendingUp, ArrowRight } from 'lucide-react';
// Sample data for reels
const sampleReels = [
  {
    id: '1',
    title: 'Introduction to React',
    subtitle: 'Learn the fundamentals of React development',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', // Sample video
    thumbnailUrl: 'https://via.placeholder.com/400x600/1f2937/ffffff?text=React+Basics',
    tags: ['React', 'JavaScript', 'Frontend'],
    instructor: 'Sarah Johnson',
    duration: '2:30',
    views: '12K',
    color: 'from-blue-600 to-purple-600'
  },
  {
    id: '2',
    title: 'Advanced JavaScript',
    subtitle: 'Master async/await and modern JS features',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4', // Sample video
    thumbnailUrl: 'https://via.placeholder.com/400x600/059669/ffffff?text=JavaScript+Pro',
    tags: ['JavaScript', 'ES6+', 'Async'],
    instructor: 'Mike Chen',
    duration: '4:15',
    views: '8.5K',
    color: 'from-emerald-600 to-teal-600'
  },
  {
    id: '3',
    title: 'CSS Grid Mastery',
    subtitle: 'Create complex layouts with CSS Grid',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', // Sample video
    thumbnailUrl: 'https://via.placeholder.com/400x600/dc2626/ffffff?text=CSS+Grid',
    tags: ['CSS', 'Layout', 'Design'],
    instructor: 'Emma Davis',
    duration: '3:45',
    views: '15K',
    color: 'from-red-600 to-pink-600'
  },
  {
    id: '4',
    title: 'Node.js Fundamentals',
    subtitle: 'Build server-side applications with Node.js',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4', // Sample video
    thumbnailUrl: 'https://via.placeholder.com/400x600/7c3aed/ffffff?text=Node.js+Basics',
    tags: ['Node.js', 'Backend', 'Server'],
    instructor: 'Alex Rodriguez',
    duration: '5:20',
    views: '9.2K',
    color: 'from-violet-600 to-purple-600'
  },
  {
    id: '5',
    title: 'Database Design',
    subtitle: 'Learn to design efficient database schemas',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', // Sample video
    thumbnailUrl: 'https://via.placeholder.com/400x600/ea580c/ffffff?text=Database+Design',
    tags: ['Database', 'SQL', 'Design'],
    instructor: 'Lisa Wang',
    duration: '6:10',
    views: '11K',
    color: 'from-orange-600 to-yellow-600'
  }
];
const handleViewAll = () => {
  // Handle view all action
  console.log('View all trending cards');
};

export default function ReelsSection() {
  return (
    <section className="relative py-16 px-4">
      {/* ReelsDeckHeader */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          Pick a card to
          <br />
          play
        </h1>
      </div>

      {/* Trending Section */}
      <div className="flex items-center justify-between">
        {/* Left side - Trending Today */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <span className="text-white font-medium text-lg">
            Trending Today
          </span>
        </div>

        {/* Right side - View All */}
        <button 
          onClick={handleViewAll}
          className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors duration-200"
        >
          <span className="font-medium">View All</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
      {/* ReelsDeck Component */}
      <div className="max-w-6xl mx-auto">
        <ReelsDeck reels={sampleReels} initialIndex={0} />
      </div>

      {/* Call to Action */}
      <div className="max-w-4xl mx-auto text-center mt-12">
        <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-sm">
          <span>Found something interesting?</span>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-sm font-semibold hover:scale-105 transition-transform">
            Start Learning
          </button>
        </div>
      </div>
    </section>
  );
}