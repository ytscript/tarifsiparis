import { useState, useEffect } from 'react';
import type { Recipe } from '../types/recipe';
import { sampleRecipes } from '../data/recipes';

export function useRelatedRecipes(categories: string[], currentRecipeId: string) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const related = sampleRecipes
        .filter(recipe => 
          recipe.id !== currentRecipeId &&
          recipe.category.some(cat => categories.includes(cat))
        )
        .slice(0, 3);
      setRecipes(related);
    }, 300);
  }, [categories, currentRecipeId]);

  return { recipes };
}