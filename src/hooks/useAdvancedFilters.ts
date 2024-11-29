import { useState, useCallback } from 'react';
import type { Recipe } from '../types/recipe';
import type { FilterState, TimeFilter } from '../types/filters';
import { filterOptions } from '../data/filterOptions';

const initialFilters: FilterState = {
  sort: 'popular',
  dietary: [],
  time: [],
  mealType: [],
  difficulty: [],
};

export function useAdvancedFilters() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const getTimeRange = (timeFilter: TimeFilter) => {
    const option = filterOptions.time.find((t) => t.value === timeFilter);
    return option?.maxMinutes || Infinity;
  };

  const filterRecipes = useCallback(
    (recipes: Recipe[]) => {
      return recipes
        .filter((recipe) => {
          // Apply difficulty filters
          if (filters.difficulty.length > 0) {
            if (!filters.difficulty.includes(recipe.difficulty)) {
              return false;
            }
          }

          // Apply dietary filters
          if (filters.dietary.length > 0) {
            const hasDietary = filters.dietary.every((diet) =>
              recipe.category.includes(diet)
            );
            if (!hasDietary) return false;
          }

          // Apply time filters
          if (filters.time.length > 0) {
            const totalTime = recipe.prepTime + recipe.cookTime;
            const matchesTime = filters.time.some(
              (time) => totalTime <= getTimeRange(time)
            );
            if (!matchesTime) return false;
          }

          // Apply meal type filters
          if (filters.mealType.length > 0) {
            const hasMealType = filters.mealType.some((type) =>
              recipe.category.includes(type)
            );
            if (!hasMealType) return false;
          }

          return true;
        })
        .sort((a, b) => {
          switch (filters.sort) {
            case 'rating':
              return b.rating - a.rating;
            case 'time':
              return (
                a.prepTime + a.cookTime - (b.prepTime + b.cookTime)
              );
            case 'popular':
              return b.reviews - a.reviews;
            default:
              return 0;
          }
        });
    },
    [filters]
  );

  const removeFilter = (type: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: Array.isArray(prev[type])
        ? type === 'difficulty'
          ? (prev[type] as number[]).filter(v => v.toString() !== value)
          : (prev[type] as string[]).filter((v) => v !== value)
        : prev[type],
    }));
  };

  return {
    filters,
    setFilters,
    filterRecipes,
    removeFilter,
  };
}