import React from 'react';
import { Clock, Users, Star } from 'lucide-react';
import type { Recipe } from '../types/recipe';
import { DifficultyIndicator } from './RecipeDetail/DifficultyIndicator';
import { DietaryBadges } from './DietaryBadges';
import { FavoriteButton } from './FavoriteButton';

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group relative">
      <div className="absolute top-3 right-3 z-10">
        <DietaryBadges categories={recipe.category} />
      </div>
      
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent p-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">{recipe.prepTime + recipe.cookTime} dk</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">{recipe.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors">
          {recipe.title}
        </h3>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-4 h-4" />
            <span className="text-sm">{recipe.servings} kişilik</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Zorluk:</span>
            <DifficultyIndicator level={recipe.difficulty} />
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex flex-wrap gap-2">
            {recipe.category.slice(0, 2).map((cat) => (
              <span
                key={cat}
                className="px-2.5 py-1 text-xs font-medium rounded-full bg-orange-50 text-orange-700"
              >
                {cat}
              </span>
            ))}
          </div>
          <FavoriteButton recipeId={recipe.id} />
        </div>
      </div>
    </div>
  );
}