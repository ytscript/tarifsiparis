import React from 'react';
import { ProductCard } from './ProductCard';
import type { IngredientWithStores } from './types';

interface IngredientSectionProps {
  ingredient: IngredientWithStores;
  onAddToCart: (product: IngredientWithStores['stores'][0]) => void;
}

export function IngredientSection({ ingredient, onAddToCart }: IngredientSectionProps) {
  return (
    <div className="py-8 first:pt-0 last:pb-0 border-b last:border-b-0">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{ingredient.name}</h3>
          <p className="text-sm text-gray-600 mt-1">
            Tarif için gereken miktar: {ingredient.amount} {ingredient.unit}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ingredient.stores
          .sort((a, b) => a.price - b.price)
          .map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
      </div>
    </div>
  );
}