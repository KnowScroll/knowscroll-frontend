'use client';

import { Inter } from 'next/font/google';
import '../../app/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function AuthLayout({ children }) {
  return (
    <div className={`${inter.className} min-h-screen `}>
      {children}
    </div>
  );
}