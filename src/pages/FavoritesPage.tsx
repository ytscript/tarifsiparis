import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';
import { RecipeGrid } from '../components/RecipeGrid';
import { useFavorites } from '../hooks/useFavorites';
import { sampleRecipes } from '../data/recipes';

export function FavoritesPage() {
  const { favorites } = useFavorites();
  const favoriteRecipes = sampleRecipes.filter(recipe => favorites.includes(recipe.id));

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              to="/"
              className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Ana sayfaya dön
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              Favori Tariflerim
              <Heart className="w-8 h-8 text-red-500 fill-current" />
            </h1>
          </div>
        </div>

        {favoriteRecipes.length > 0 ? (
          <RecipeGrid recipes={favoriteRecipes} />
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-900 mb-2">
              Henüz favori tarifiniz yok
            </h2>
            <p className="text-gray-600 mb-6">
              Beğendiğiniz tarifleri favorilere ekleyerek daha sonra kolayca ulaşabilirsiniz
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-orange-600 text-white 
                       rounded-md hover:bg-orange-700 transition-colors duration-200"
            >
              Tariflere göz at
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}