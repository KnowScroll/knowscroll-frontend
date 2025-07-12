// src/app/creator/[username]/page.jsx
'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import { CreatorProfile, CreatorHeader } from '../index';
import { isValidUsername } from '@/app/utils/creatorUtils';
import Navbar from '@/app/components/navigation/Navbar';
import { UploadedShorts } from '@/app/components/sections';


// Dummy data - replace with API call in the future
const getDummyCreatorData = (username) => {
  const creators = {
    'mrigu': {
      id: 1,
      username: 'Mrigesh The Legend',
      displayName: 'Chota NUNU',
      bio: '# Art Based Creator',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      backgroundImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
      stats: {
        followers: 321000,
        shortsUploaded: 131,
        likes: 2500000
      },
      isVerified: false,
      isFollowing: false,
      joinedDate: '2023-05-15'
    },
    'Shivalik': {
      id: 2,
      username: 'tech-guru',
      displayName: 'Tech Guru',
      bio: '# Technology Expert & Educator',
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      backgroundImage: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=600&fit=crop',
      stats: {
        followers: 156000,
        shortsUploaded: 89,
        likes: 890000
      },
      isVerified: true,
      isFollowing: true,
      joinedDate: '2022-11-20'
    },
    'Asrani': {
      id: 3,
      username: 'HEHEEEEE',
      displayName: 'Artist Hu broo',
      bio: '# Digital Artist & Designer',
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      backgroundImage: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=600&fit=crop',
      stats: {
        followers: 78000,
        shortsUploaded: 45,
        likes: 450000
      },
      isVerified: false,
      isFollowing: false,
      joinedDate: '2024-01-10'
    }
  };

  return creators[username] || null;
};

export default function CreatorPage({ params }) {
  // Unwrap the params Promise using React.use()
  const { username } = use(params);

  // Validate username format (commented out as requested)
  // if (!isValidUsername(username)) {
  //   notFound();
  // }

  const creatorData = getDummyCreatorData(username);

  if (!creatorData) {
    notFound();
  }

  return (
    <div className="min-h-screen text-white">
      {/* <CreatorHeader creatorName={creatorData.displayName} />
       */}
       <Navbar/>
      <div > {/* Account for fixed header */}
        <CreatorProfile creator={creatorData} />
      </div>
      <div className="px-2"> 
        <UploadedShorts />
      </div>
    </div>
  );
}

// Generate static params for known creators (optional, for better performance)
// export async function generateStaticParams() {
//   return [
//     { username: 'grind-hallo' },
//     { username: 'tech-guru' },
//     { username: 'creative-soul' }
//   ];
// }