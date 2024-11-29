import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { DetailedRecipeCard } from '../components/RecipeDetail';
import { CollapsibleShoppingList } from '../components/RecipeDetail/CollapsibleShoppingList';
import { CommentSection } from '../components/CommentSection';
import { RelatedRecipes } from '../components/RelatedRecipes';
import { useRecipe } from '../hooks/useRecipe';

export function RecipePage() {
  const { id } = useParams();
  const { recipe, isLoading, error } = useRecipe(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tarif bulunamadı</h2>
          <Link to="/" className="text-orange-600 hover:text-orange-700">
            Ana sayfaya dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tariflere dön
        </Link>
        <DetailedRecipeCard recipe={recipe} />
        <CollapsibleShoppingList recipe={recipe} />
        <CommentSection recipeId={recipe.id} />
        <RelatedRecipes categories={recipe.category} currentRecipeId={recipe.id} />
      </div>
    </main>
  );
}