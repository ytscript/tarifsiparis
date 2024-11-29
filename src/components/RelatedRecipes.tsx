import React from 'react';
import { RecipeCard } from './RecipeCard';
import { useRelatedRecipes } from '../hooks/useRelatedRecipes';

interface RelatedRecipesProps {
  categories: string[];
  currentRecipeId: string;
}

export function RelatedRecipes({ categories, currentRecipeId }: RelatedRecipesProps) {
  const { recipes } = useRelatedRecipes(categories, currentRecipeId);

  if (!recipes.length) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">Benzer Tarifler</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </section>
  );
}