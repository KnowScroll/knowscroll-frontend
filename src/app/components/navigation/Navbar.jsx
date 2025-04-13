'use client';

import { Bell, Search } from 'lucide-react';
import Logo from '@/app/ui/Logo';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className="container mx-auto">
        <nav className="flex justify-between items-center px-4 py-3">
          {/* Logo Component */}
          <Logo />

          {/* Right Icons */}
          <div className={styles.iconsContainer}>
            <button 
              aria-label="Notifications" 
              className={styles.iconButton}
            >
              <Bell className="w-6 h-6" />
            </button>
            <button 
              aria-label="Search" 
              className={styles.iconButton}
            >
              <Search className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}