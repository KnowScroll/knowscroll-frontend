// src/app/components/creator/CreatorStats.jsx
'use client';

export default function CreatorStats({ followers, shortsUploaded, formatNumber }) {
  return (
    <div className="flex justify-between items-end">
      {/* Followers */}
      <div className="text-left">
        <div className="text-3xl font-bold text-white">
          {formatNumber(followers)}
        </div>
        <div className="text-gray-300 text-sm">
          followers
        </div>
      </div>
      
      {/* Shorts Uploaded */}
      <div className="text-right">
        <div className="text-3xl font-bold text-white">
          {shortsUploaded}
        </div>
        <div className="text-gray-300 text-sm">
          shorts
        </div>
        <div className="text-gray-300 text-sm">
          uploaded
        </div>
      </div>
    </div>
  );
}