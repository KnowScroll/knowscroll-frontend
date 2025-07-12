// src/app/creator/[username]/not-found.jsx
'use client';

import Link from 'next/link';
import { ArrowLeft, UserX } from 'lucide-react';

export default function CreatorNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-white">
      {/* Icon */}
      <div className="mb-8">
        <UserX className="w-24 h-24 text-gray-400" />
      </div>
      
      {/* Error Message */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Creator Not Found</h1>
        <p className="text-gray-400 text-lg max-w-md">
          Sorry, we couldn't find the creator you're looking for. 
          They may have changed their username or the account may not exist.
        </p>
      </div>
      
      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/"
          className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        
        <Link 
          href="/explore"
          className="px-6 py-3 border border-white/20 text-white rounded-full hover:bg-white/10 transition-colors font-semibold"
        >
          Discover Creators
        </Link>
      </div>
      
      {/* Suggestion */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Try searching for creators in the{' '}
          <Link href="/explore" className="text-blue-400 hover:underline">
            explore section
          </Link>
        </p>
      </div>
    </div>
  );
}