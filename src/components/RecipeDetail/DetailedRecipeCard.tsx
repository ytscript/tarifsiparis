import React from 'react';
import { Clock, Users, ChefHat } from 'lucide-react';
import type { Recipe } from '../../types/recipe';
import { DifficultyIndicator } from './DifficultyIndicator';
import { CostIndicator } from './CostIndicator';
import { ShareButton } from './ShareButton';
import { FavoriteButton } from '../FavoriteButton';

interface DetailedRecipeCardProps {
  recipe: Recipe;
}

export function DetailedRecipeCard({ recipe }: DetailedRecipeCardProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="relative h-96">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <ShareButton recipeId={recipe.id} title={recipe.title} />
          <FavoriteButton recipeId={recipe.id} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
          <h1 className="text-3xl font-bold text-white mb-2">{recipe.title}</h1>
          <div className="flex items-center text-white gap-4">
            <div className="flex items-center gap-2">
              <ChefHat className="w-5 h-5" />
              <span>{recipe.author.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-600 text-sm">Zorluk</span>
            <DifficultyIndicator level={recipe.difficulty} />
          </div>
          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-600 text-sm">Maliyet</span>
            <CostIndicator level={recipe.costLevel} />
          </div>
          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-600 text-sm">Süre</span>
            <div className="flex items-center gap-1">
              <Clock className="w-5 h-5 text-gray-600" />
              <span>{recipe.prepTime + recipe.cookTime} dk</span>
            </div>
          </div>
          <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-600 text-sm">Porsiyon</span>
            <div className="flex items-center gap-1">
              <Users className="w-5 h-5 text-gray-600" />
              <span>{recipe.servings} kişilik</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="bg-orange-50 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-orange-900">Malzemeler</h2>
              <div className="divide-y divide-orange-100">
                {recipe.ingredients.map((ingredient, index) => (
                  <div 
                    key={index} 
                    className="py-3 flex items-center justify-between hover:bg-orange-100/50 rounded-lg transition-colors px-2"
                  >
                    <span className="text-orange-950">{ingredient.name}</span>
                    <span className="text-orange-700 font-medium">
                      {ingredient.amount} {ingredient.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Gerekli Ekipmanlar</h2>
              <ul className="space-y-2">
                {recipe.equipment.map((item, index) => (
                  <li 
                    key={index}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Hazırlanışı</h2>
            <ol className="space-y-4">
              {recipe.instructions.map((step, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                    {index + 1}
                  </span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">İpuçları</h2>
            <ul className="list-disc list-inside space-y-2">
              {recipe.tips.map((tip, index) => (
                <li key={index} className="text-gray-700">{tip}</li>
              ))}
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">Besin Değerleri</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-600">Kalori:</span>
                  <span className="ml-2">{recipe.nutritionFacts.calories} kcal</span>
                </div>
                <div>
                  <span className="text-gray-600">Protein:</span>
                  <span className="ml-2">{recipe.nutritionFacts.protein}g</span>
                </div>
                <div>
                  <span className="text-gray-600">Karbonhidrat:</span>
                  <span className="ml-2">{recipe.nutritionFacts.carbs}g</span>
                </div>
                <div>
                  <span className="text-gray-600">Yağ:</span>
                  <span className="ml-2">{recipe.nutritionFacts.fat}g</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Saklama Koşulları</h2>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-gray-700">{recipe.storage.method}</p>
              <p className="text-gray-600 mt-2">Süre: {recipe.storage.duration}</p>
            </div>

            <h2 className="text-xl font-semibold mb-4">Alternatif Öneriler</h2>
            <ul className="list-disc list-inside space-y-2">
              {recipe.variations.map((variation, index) => (
                <li key={index} className="text-gray-700">{variation}</li>
              ))}
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-4">Yanında İyi Gider</h2>
            <ul className="list-disc list-inside space-y-2">
              {recipe.pairings.map((pairing, index) => (
                <li key={index} className="text-gray-700">{pairing}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t">
          <div className="flex flex-wrap gap-2">
            {recipe.category.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}