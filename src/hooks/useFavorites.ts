import { useState, useCallback, useEffect } from 'react';
import type { Recipe } from '../types/recipe';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const addToFavorites = useCallback((recipeId: string) => {
    setFavorites((prev) => {
      const updated = [...prev, recipeId];
      localStorage.setItem('favorites', JSON.stringify(updated));
      // Dispatch custom event for real-time updates
      window.dispatchEvent(new CustomEvent('favoritesUpdated', { detail: updated }));
      return updated;
    });
  }, []);

  const removeFromFavorites = useCallback((recipeId: string) => {
    setFavorites((prev) => {
      const updated = prev.filter(id => id !== recipeId);
      localStorage.setItem('favorites', JSON.stringify(updated));
      // Dispatch custom event for real-time updates
      window.dispatchEvent(new CustomEvent('favoritesUpdated', { detail: updated }));
      return updated;
    });
  }, []);

  const isFavorite = useCallback((recipeId: string) => {
    return favorites.includes(recipeId);
  }, [favorites]);

  // Listen for favorites updates from other components
  useEffect(() => {
    const handleFavoritesUpdate = (event: CustomEvent<string[]>) => {
      setFavorites(event.detail);
    };

    window.addEventListener('favoritesUpdated', handleFavoritesUpdate as EventListener);
    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdate as EventListener);
    };
  }, []);

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    count: favorites.length
  };
}