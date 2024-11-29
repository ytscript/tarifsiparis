import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';

interface FavoriteButtonProps {
  recipeId: string;
  className?: string;
}

export function FavoriteButton({ recipeId, className = '' }: FavoriteButtonProps) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(isFavorite(recipeId));
  }, [isFavorite, recipeId]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when inside a link
    if (isFav) {
      removeFromFavorites(recipeId);
    } else {
      addToFavorites(recipeId);
    }
    setIsFav(!isFav);
  };

  return (
    <button
      onClick={handleClick}
      className={`group relative inline-flex items-center justify-center p-2
                 rounded-full transition-all duration-300 
                 hover:bg-red-50 focus:outline-none focus:ring-2 
                 focus:ring-red-400 focus:ring-offset-2 ${className}`}
      aria-label={isFav ? "Favorilerden çıkar" : "Favorilere ekle"}
    >
      <Heart
        className={`w-6 h-6 transition-all duration-300 
                   ${isFav 
                     ? 'text-red-500 fill-current' 
                     : 'text-gray-400 group-hover:text-red-500'}`}
      />
      
      {/* Tooltip */}
      <span className="absolute -bottom-12 px-3 py-1.5 bg-gray-900 text-white text-sm
                     rounded-lg opacity-0 group-hover:opacity-100 transition-opacity
                     whitespace-nowrap pointer-events-none">
        {isFav ? 'Favorilerden çıkar' : 'Favorilere ekle'}
      </span>
    </button>
  );
}