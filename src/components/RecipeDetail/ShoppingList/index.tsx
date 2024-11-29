import React, { useState } from 'react';
import { ShoppingCart, ChevronDown } from 'lucide-react';
import { IngredientSection } from './IngredientSection';
import { CartSummary } from './CartSummary';
import type { Recipe } from '../../../types/recipe';
import type { MarketProduct } from '../../../types/market';
import { useMarketProducts } from '../../../hooks/useMarketProducts';

interface ShoppingListProps {
  recipe: Recipe;
}

export function ShoppingList({ recipe }: ShoppingListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [cart, setCart] = useState<MarketProduct[]>([]);

  const ingredientsWithStores = recipe.ingredients.map(ingredient => {
    const marketProducts = useMarketProducts(ingredient.name);
    return {
      ...ingredient,
      stores: marketProducts
    };
  });

  const handleAddToCart = (product: MarketProduct) => {
    setCart(prev => [...prev, product]);
  };

  const handleCheckout = () => {
    // Group items by store
    const storeGroups = cart.reduce((acc, item) => {
      const store = item.store;
      if (!acc[store]) acc[store] = [];
      acc[store].push(item);
      return acc;
    }, {} as Record<string, MarketProduct[]>);

    // Process each store's order
    Object.entries(storeGroups).forEach(([store, items]) => {
      console.log(`${store} siparişi işleniyor:`, items);
      // Here you would integrate with each store's checkout API
    });

    // Clear cart after successful checkout
    setCart([]);
  };

  return (
    <section className="my-12 bg-white rounded-xl shadow-sm overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
      >
        <div className="flex items-center gap-3">
          <ShoppingCart className="w-6 h-6 text-orange-600" />
          <h2 className="text-xl font-semibold">Eksikleri Tamamla</h2>
          {cart.length > 0 && (
            <span className="px-2.5 py-1 text-sm font-medium bg-orange-100 text-orange-600 rounded-full">
              {cart.length} ürün
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="p-6 border-t">
          {ingredientsWithStores.map((ingredient) => (
            <IngredientSection
              key={ingredient.name}
              ingredient={ingredient}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {cart.length > 0 && (
          <CartSummary
            items={cart}
            onCheckout={handleCheckout}
          />
        )}
      </div>
    </section>
  );
}