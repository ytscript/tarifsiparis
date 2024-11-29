import React from 'react';
import { Link } from 'react-router-dom';
import { RecipeCard } from './RecipeCard';
import type { Recipe } from '../types/recipe';

interface RecipeGridProps {
  recipes: Recipe[];
}

export function RecipeGrid({ recipes }: RecipeGridProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <Link key={recipe.id} to={`/recipe/${recipe.id}`} className="block">
            <RecipeCard recipe={recipe} />
          </Link>
        ))}
      </div>
      
      {recipes.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Tarif bulunamadı
          </h3>
          <p className="text-gray-600">
            Daha sonra tekrar deneyin
          </p>
        </div>
      )}
    </div>
  );
}