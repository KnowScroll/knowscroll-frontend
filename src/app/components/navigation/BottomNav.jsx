'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Play, Plus, Layers, User } from 'lucide-react';
import styles from './BottomNav.module.css';

export default function BottomNav() {
  const pathname = usePathname();
  
  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <footer className={styles.bottomNav}>
      <div className={styles.navContainer}>
        <div className={styles.navItems}>
          <NavItem 
            href="/" 
            icon={<Home size={24} />} 
            label="Home" 
            isActive={isActive('/')} 
          />
          <NavItem 
            href="/play" 
            icon={<Play size={24} />} 
            label="Play" 
            isActive={isActive('/play')} 
          />
          <NavItem 
            href="/create" 
            icon={<Plus size={24} />} 
            label="Create" 
            isActive={isActive('/create')} 
          />
          <NavItem 
            href="/gallery" 
            icon={<Layers size={24} />} 
            label="Gallery" 
            isActive={isActive('/gallery')} 
          />
          <NavItem 
            href="/profile" 
            icon={<User size={24} />} 
            label="Profile" 
            isActive={isActive('/profile')} 
          />
        </div>
      </div>
    </footer>
  );
}

// Individual nav item component
function NavItem({ href, icon, label, isActive }) {
  return (
    <Link 
      href={href} 
      className={`${styles.navItem} ${isActive ? styles.active : styles.inactive}`}
    >
      <div className={isActive ? styles.activeItem : styles.iconWrapper}>
        {icon}
        {isActive && <span className={styles.label}>{label}</span>}
      </div>
    </Link>
  );
}