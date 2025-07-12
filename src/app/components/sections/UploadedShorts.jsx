'use client';

import { useState } from 'react';
import { Rocket } from 'lucide-react';
import ExploreSection from './ExploreSection';

export default function UploadedShorts() {
  const [activeFilter, setActiveFilter] = useState('Latest');

  // Sample data for latest reels
  const latestReels = [
    {
      id: '1',
      title: 'Introduction to React',
      subtitle: 'Learn the fundamentals of React development',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      thumbnailUrl: 'https://via.placeholder.com/400x600/1f2937/ffffff?text=React+Basics',
      tags: ['React', 'JavaScript', 'Frontend'],
      instructor: 'Sarah Johnson',
      duration: '2:30',
      views: '12K',
      color: 'from-blue-600 to-purple-600',
      height: 'tall'
    },
    {
      id: '2',
      title: 'Advanced JavaScript',
      subtitle: 'Master async/await and modern JS features',
      videoUrl: 'https://www.w3schools.com/html/movie.mp4',
      thumbnailUrl: 'https://via.placeholder.com/400x600/059669/ffffff?text=JavaScript+Pro',
      tags: ['JavaScript', 'ES6+', 'Async'],
      instructor: 'Mike Chen',
      duration: '4:15',
      views: '8.5K',
      color: 'from-emerald-600 to-teal-600',
      height: 'medium'
    },
    {
      id: '3',
      title: 'CSS Grid Mastery',
      subtitle: 'Create complex layouts with CSS Grid',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      thumbnailUrl: 'https://via.placeholder.com/400x600/dc2626/ffffff?text=CSS+Grid',
      tags: ['CSS', 'Layout', 'Design'],
      instructor: 'Emma Davis',
      duration: '3:45',
      views: '15K',
      color: 'from-red-600 to-pink-600',
      height: 'short'
    },
    {
      id: '4',
      title: 'Python for Beginners',
      subtitle: 'Start your journey with Python programming',
      videoUrl: 'https://www.w3schools.com/html/movie.mp4',
      thumbnailUrl: 'https://via.placeholder.com/400x600/059669/ffffff?text=Python+Basics',
      tags: ['Python', 'Programming', 'Beginner'],
      instructor: 'John Smith',
      duration: '6:20',
      views: '25K',
      color: 'from-green-600 to-blue-600',
      height: 'tall'
    },
    {
      id: '5',
      title: 'UI/UX Design Trends',
      subtitle: 'Latest design trends for 2024',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      thumbnailUrl: 'https://via.placeholder.com/400x600/7c3aed/ffffff?text=Design+Trends',
      tags: ['Design', 'UI/UX', 'Trends'],
      instructor: 'Maria Garcia',
      duration: '5:10',
      views: '18K',
      color: 'from-purple-600 to-pink-600',
      height: 'medium'
    },
    {
      id: '6',
      title: 'Mobile App Development',
      subtitle: 'Build your first mobile app',
      videoUrl: 'https://www.w3schools.com/html/movie.mp4',
      thumbnailUrl: 'https://via.placeholder.com/400x600/ea580c/ffffff?text=Mobile+Dev',
      tags: ['Mobile', 'App', 'Development'],
      instructor: 'David Lee',
      duration: '8:30',
      views: '32K',
      color: 'from-orange-600 to-red-600',
      height: 'tall'
    }
  ];

  // Sample data for popular reels (sorted by views)
  const popularReels = [
    {
      id: '7',
      title: 'Machine Learning Explained',
      subtitle: 'Understanding AI and ML concepts',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      thumbnailUrl: 'https://via.placeholder.com/400x600/1f2937/ffffff?text=Machine+Learning',
      tags: ['AI', 'Machine Learning', 'Data'],
      instructor: 'Dr. Amanda Wilson',
      duration: '7:45',
      views: '156K',
      color: 'from-indigo-600 to-purple-600',
      height: 'tall'
    },
    {
      id: '8',
      title: 'Blockchain Basics',
      subtitle: 'Cryptocurrency and blockchain technology',
      videoUrl: 'https://www.w3schools.com/html/movie.mp4',
      thumbnailUrl: 'https://via.placeholder.com/400x600/f59e0b/ffffff?text=Blockchain',
      tags: ['Blockchain', 'Crypto', 'Technology'],
      instructor: 'Robert Chen',
      duration: '9:20',
      views: '98K',
      color: 'from-yellow-600 to-orange-600',
      height: 'medium'
    },
    {
      id: '9',
      title: 'Photography Masterclass',
      subtitle: 'Professional photography techniques',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      thumbnailUrl: 'https://via.placeholder.com/400x600/059669/ffffff?text=Photography',
      tags: ['Photography', 'Art', 'Visual'],
      instructor: 'Lisa Park',
      duration: '12:15',
      views: '87K',
      color: 'from-teal-600 to-green-600',
      height: 'short'
    },
    {
      id: '10',
      title: 'Digital Marketing Strategy',
      subtitle: 'Grow your online presence',
      videoUrl: 'https://www.w3schools.com/html/movie.mp4',
      thumbnailUrl: 'https://via.placeholder.com/400x600/dc2626/ffffff?text=Digital+Marketing',
      tags: ['Marketing', 'Digital', 'Business'],
      instructor: 'Kevin Brown',
      duration: '6:50',
      views: '76K',
      color: 'from-red-600 to-pink-600',
      height: 'tall'
    },
    {
      id: '11',
      title: 'Data Science Fundamentals',
      subtitle: 'Introduction to data analysis',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      thumbnailUrl: 'https://via.placeholder.com/400x600/7c3aed/ffffff?text=Data+Science',
      tags: ['Data Science', 'Analytics', 'Statistics'],
      instructor: 'Dr. Jennifer Liu',
      duration: '10:30',
      views: '65K',
      color: 'from-violet-600 to-blue-600',
      height: 'medium'
    },
    {
      id: '12',
      title: 'Cloud Computing Essentials',
      subtitle: 'AWS, Azure, and Google Cloud basics',
      videoUrl: 'https://www.w3schools.com/html/movie.mp4',
      thumbnailUrl: 'https://via.placeholder.com/400x600/0891b2/ffffff?text=Cloud+Computing',
      tags: ['Cloud', 'AWS', 'Infrastructure'],
      instructor: 'Michael Zhang',
      duration: '8:45',
      views: '54K',
      color: 'from-cyan-600 to-blue-600',
      height: 'tall'
    }
  ];

  // Sample data for oldest reels
  const oldestReels = [
    {
      id: '13',
      title: 'HTML & CSS Basics',
      subtitle: 'Your first steps in web development',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      thumbnailUrl: 'https://via.placeholder.com/400x600/059669/ffffff?text=HTML+CSS',
      tags: ['HTML', 'CSS', 'Web Development'],
      instructor: 'Mark Johnson',
      duration: '15:20',
      views: '245K',
      color: 'from-green-600 to-teal-600',
      height: 'tall'
    },
    {
      id: '14',
      title: 'JavaScript Fundamentals',
      subtitle: 'Core JavaScript concepts explained',
      videoUrl: 'https://www.w3schools.com/html/movie.mp4',
      thumbnailUrl: 'https://via.placeholder.com/400x600/f59e0b/ffffff?text=JavaScript',
      tags: ['JavaScript', 'Programming', 'Web'],
      instructor: 'Sarah Williams',
      duration: '18:45',
      views: '198K',
      color: 'from-yellow-600 to-orange-600',
      height: 'medium'
    },
    {
      id: '15',
      title: 'Database Fundamentals',
      subtitle: 'SQL and database design principles',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      thumbnailUrl: 'https://via.placeholder.com/400x600/7c3aed/ffffff?text=Database',
      tags: ['Database', 'SQL', 'Backend'],
      instructor: 'Tom Anderson',
      duration: '22:10',
      views: '167K',
      color: 'from-purple-600 to-indigo-600',
      height: 'short'
    },
    {
      id: '16',
      title: 'Version Control with Git',
      subtitle: 'Master Git and GitHub workflow',
      videoUrl: 'https://www.w3schools.com/html/movie.mp4',
      thumbnailUrl: 'https://via.placeholder.com/400x600/dc2626/ffffff?text=Git+GitHub',
      tags: ['Git', 'GitHub', 'Version Control'],
      instructor: 'Emily Davis',
      duration: '14:30',
      views: '143K',
      color: 'from-red-600 to-pink-600',
      height: 'tall'
    },
    {
      id: '17',
      title: 'Computer Science Basics',
      subtitle: 'Algorithms and data structures',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      thumbnailUrl: 'https://via.placeholder.com/400x600/0891b2/ffffff?text=CS+Basics',
      tags: ['Computer Science', 'Algorithms', 'Data Structures'],
      instructor: 'Prof. Richard Taylor',
      duration: '25:40',
      views: '134K',
      color: 'from-cyan-600 to-blue-600',
      height: 'medium'
    },
    {
      id: '18',
      title: 'Web Design Principles',
      subtitle: 'Creating beautiful and functional websites',
      videoUrl: 'https://www.w3schools.com/html/movie.mp4',
      thumbnailUrl: 'https://via.placeholder.com/400x600/1f2937/ffffff?text=Web+Design',
      tags: ['Web Design', 'UI', 'Visual Design'],
      instructor: 'Anna Martinez',
      duration: '19:15',
      views: '128K',
      color: 'from-gray-600 to-blue-600',
      height: 'tall'
    }
  ];

  // Get current reels based on active filter
  const getCurrentReels = () => {
    switch (activeFilter) {
      case 'Latest':
        return latestReels;
      case 'Popular':
        return popularReels;
      case 'Oldest':
        return oldestReels;
      default:
        return latestReels;
    }
  };

  const filters = ['Latest', 'Popular', 'Oldest'];

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
          <Rocket className="w-6 h-6 text-black" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Uploaded shorts
        </h1>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-4 mb-8">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`
              px-6 py-3 rounded-full font-medium text-lg transition-all duration-300
              ${activeFilter === filter
                ? 'bg-gray-600 text-white shadow-lg'
                : 'bg-gray-400 text-gray-800 hover:bg-gray-500 hover:text-white'
              }
            `}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <ExploreSection 
        heading={`${activeFilter} Uploads`}
        reelsData={getCurrentReels()}
      />
    </div>
  );
}