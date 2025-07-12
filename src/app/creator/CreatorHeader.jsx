// src/app/components/creator/CreatorHeader.jsx
'use client';

import { ArrowLeft, Bell, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CreatorHeader({ creatorName }) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      <div className="flex justify-between items-center px-4 py-3">
        {/* Left side - Back button and title */}
        <div className="flex items-center gap-4">
          <button 
            onClick={handleBack}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white font-bold text-lg">
            Know Scroll
          </h1>
        </div>

        {/* Right side - Action buttons */}
        <div className="flex items-center gap-4">
          <button 
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-6 h-6 text-white" />
          </button>
          <button 
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Search"
          >
            <Search className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
}