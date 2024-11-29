import { useState, useEffect } from 'react';
import type { Recipe } from '../types/recipe';
import { sampleRecipes } from '../data/recipes';

export function useRecipe(id: string | undefined) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRecipe = () => {
      try {
        // Simulate API call
        setTimeout(() => {
          const found = sampleRecipes.find(r => r.id === id);
          if (found) {
            setRecipe(found);
          } else {
            throw new Error('Recipe not found');
          }
          setIsLoading(false);
        }, 500);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  return { recipe, isLoading, error };
}