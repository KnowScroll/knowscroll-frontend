'use client';

import { Bell, Search } from 'lucide-react';
import Logo from '@/app/ui/Logo';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-transparent backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto">
        <nav className="flex justify-between items-center px-4 py-3">
          {/* Logo Component */}
          <Logo />

          {/* Right Icons */}
          <div className="flex items-center gap-6">
            <button 
              aria-label="Notifications" 
              className="bg-transparent border-none text-white cursor-pointer p-0 hover:opacity-80 transition-opacity"
            >
              <Bell className="w-6 h-6" />
            </button>
            <button 
              aria-label="Search" 
              className="bg-transparent border-none text-white cursor-pointer p-0 hover:opacity-80 transition-opacity"
            >
              <Search className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}