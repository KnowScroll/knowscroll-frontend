'use client';

import Link from 'next/link';

export default function Logo({ size = 'default' }) {
  const circleSize = size === 'small' ? 'w-8 h-8' : 'w-10 h-10';
  const textSize = size === 'small' ? 'text-base' : 'text-lg';
  
  return (
      <div className="text-white">
        <div className={`font-bold ${textSize} leading-tight text-white`}>KnowScroll</div>
      </div>

  );
}