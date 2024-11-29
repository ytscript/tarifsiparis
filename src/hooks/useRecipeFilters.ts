import { useState, useCallback } from 'react';
import type { Recipe } from '../types/recipe';

export function useRecipeFilters() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterRecipes = useCallback((recipes: Recipe[]) => {
    return recipes.filter((recipe) => {
      const matchesCategory = selectedCategory === 'Tümü' || recipe.category.includes(selectedCategory);
      const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.category.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    filterRecipes
  };
}