import React, { useState } from 'react';
import { ShoppingCart, Store, Heart, Plus, Check } from 'lucide-react';
import type { Recipe } from '../../types/recipe';

interface MarketItem {
  store: 'Getir' | 'Yemeksepeti' | 'Migros';
  price: number;
  available: boolean;
  url: string;
  imageUrl: string;
}

interface IngredientWithAlternatives {
  name: string;
  amount: number;
  unit: string;
  category: string;
  imageUrl: string;
  alternatives: MarketItem[];
}

interface ShoppingListProps {
  recipe: Recipe;
}

export function ShoppingList({ recipe }: ShoppingListProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Simulate marketplace data with categories and images
  const getMarketAlternatives = (ingredient: typeof recipe.ingredients[0]): IngredientWithAlternatives => {
    const categories: Record<string, string> = {
      'Un': 'Temel Gıda',
      'Maya': 'Temel Gıda',
      'Su': 'İçecek',
      'Zeytinyağı': 'Yağlar',
      'Tuz': 'Baharatlar',
      'Mercimek': 'Bakliyat',
      'Soğan': 'Sebze',
      'Havuç': 'Sebze',
      'Patates': 'Sebze',
    };

    const images: Record<string, string> = {
      'Un': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200',
      'Maya': 'https://images.unsplash.com/photo-1584478036074-dab24b902aef?w=200',
      'Zeytinyağı': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200',
      'Mercimek': 'https://images.unsplash.com/photo-1515942400420-2b98fed1f515?w=200',
      'Soğan': 'https://images.unsplash.com/photo-1508747703725-719777637510?w=200',
      'Havuç': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=200',
      'Patates': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200',
    };

    return {
      ...ingredient,
      category: categories[ingredient.name] || 'Diğer',
      imageUrl: images[ingredient.name] || 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=200',
      alternatives: [
        {
          store: 'Getir',
          price: Math.random() * 50 + 10,
          available: true,
          url: '#',
          imageUrl: 'https://cdn.getir.com/getir-images/logo.png'
        },
        {
          store: 'Yemeksepeti',
          price: Math.random() * 50 + 10,
          available: Math.random() > 0.2,
          url: '#',
          imageUrl: 'https://images.deliveryhero.io/image/fd-tr/LH/k7ty-hero.jpg'
        },
        {
          store: 'Migros',
          price: Math.random() * 50 + 10,
          available: Math.random() > 0.1,
          url: '#',
          imageUrl: 'https://www.migros.com.tr/assets/logos/migros-logo.png'
        }
      ]
    };
  };

  const ingredientsWithAlternatives = recipe.ingredients.map(getMarketAlternatives);
  const groupedIngredients = ingredientsWithAlternatives.reduce((acc, ingredient) => {
    if (!acc[ingredient.category]) {
      acc[ingredient.category] = [];
    }
    acc[ingredient.category].push(ingredient);
    return acc;
  }, {} as Record<string, typeof ingredientsWithAlternatives>);

  const toggleSelect = (name: string) => {
    setSelectedItems(prev =>
      prev.includes(name)
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  return (
    <section className="my-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <ShoppingCart className="w-7 h-7 text-orange-600" />
          <h2 className="text-2xl font-semibold">Malzeme Listesi</h2>
        </div>
        {selectedItems.length > 0 && (
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <span>Seçilenleri Sepete Ekle ({selectedItems.length})</span>
          </button>
        )}
      </div>

      <div className="space-y-8">
        {Object.entries(groupedIngredients).map(([category, ingredients]) => (
          <div key={category}>
            <h3 className="text-lg font-semibold mb-4">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ingredients.map((ingredient) => (
                <div
                  key={ingredient.name}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                >
                  <div className="relative aspect-[4/3]">
                    <img
                      src={ingredient.imageUrl}
                      alt={ingredient.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => toggleSelect(ingredient.name)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm
                               hover:bg-white transition-colors duration-200 group"
                    >
                      <Heart
                        className={`w-5 h-5 transition-colors duration-200
                                 ${selectedItems.includes(ingredient.name)
                                   ? 'text-red-500 fill-current'
                                   : 'text-gray-600 group-hover:text-red-500'
                                 }`}
                      />
                    </button>
                  </div>

                  <div className="p-4">
                    <h4 className="font-medium text-lg mb-1">{ingredient.name}</h4>
                    <p className="text-gray-600 text-sm mb-4">
                      {ingredient.amount} {ingredient.unit}
                    </p>

                    <div className="space-y-3">
                      {ingredient.alternatives
                        .sort((a, b) => a.price - b.price)
                        .map((alt) => (
                          <div
                            key={alt.store}
                            className="flex items-center justify-between p-2 rounded-lg
                                     bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                          >
                            <div className="flex items-center gap-2">
                              <Store className="w-4 h-4 text-gray-500" />
                              <span className="text-sm font-medium">{alt.store}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-semibold">
                                {alt.price.toFixed(2)} ₺
                              </span>
                              {alt.available ? (
                                <button className="flex items-center gap-1 px-3 py-1.5 text-xs
                                                 bg-orange-600 text-white rounded-full
                                                 hover:bg-orange-700 transition-colors duration-200">
                                  <Plus className="w-3 h-3" />
                                  Sepete Ekle
                                </button>
                              ) : (
                                <span className="text-xs text-red-500">Stokta yok</span>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}