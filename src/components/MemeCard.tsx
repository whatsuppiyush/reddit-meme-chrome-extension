import React from 'react';
import type { Meme } from '../types';

interface MemeCardProps {
  meme: Meme;
}

export const MemeCard: React.FC<MemeCardProps> = ({ meme }) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-white/10 h-full flex flex-col max-w-xl mx-auto">
      <div className="p-2">
        <h2 className="text-base font-semibold text-white line-clamp-1">{meme.title}</h2>
      </div>
      <div className="flex-1 relative bg-white flex items-center justify-center">
        <img
          src={meme.url}
          alt={meme.title}
          className="max-w-full max-h-[calc(100vh-240px)] object-contain"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/800x600?text=Failed+to+load+meme';
          }}
        />
      </div>
      <div className="p-1.5 bg-black/20">
        <div className="text-xs text-gray-400">
          r/{meme.subreddit}
        </div>
      </div>
    </div>
  );
};