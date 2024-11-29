import React, { useState } from 'react';
import { ShoppingCart, ChevronDown, Store } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Recipe } from '../../types/recipe';
import { useMarketProducts } from '../../hooks/useMarketProducts';
import { QuantitySelector } from './ShoppingList/QuantitySelector';
import { useCartStore } from '../../stores/useCartStore';
import { useAuthStore } from '../../stores/useAuthStore';

interface CollapsibleShoppingListProps {
  recipe: Recipe;
}

export function CollapsibleShoppingList({ recipe }: CollapsibleShoppingListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const { items: cartItems, addItem, removeItem, updateQuantity } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  
  const ingredientNames = recipe.ingredients.map(ing => ing.name);
  const productsByIngredient = useMarketProducts(ingredientNames);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity === 0) {
      removeItem(productId);
      return;
    }
    updateQuantity(productId, quantity);
  };

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      store: product.store
    });
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate('/cart');
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
          {totalItems > 0 && (
            <span className="px-2.5 py-1 text-sm font-medium bg-orange-100 text-orange-600 rounded-full">
              {totalItems} ürün
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
        <div className="p-6 border-t space-y-8">
          {Object.entries(productsByIngredient).map(([ingredientName, products]) => (
            <div key={ingredientName} className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <span>{ingredientName}</span>
                <span className="text-sm font-normal text-gray-500">
                  ({recipe.ingredients.find(ing => ing.name === ingredientName)?.amount} {
                    recipe.ingredients.find(ing => ing.name === ingredientName)?.unit
                  })
                </span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map((product) => {
                  const cartItem = cartItems.find(item => item.id === product.id);
                  
                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-gray-300 transition-all duration-200"
                    >
                      <div className="relative aspect-video">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium text-white
                            ${product.store === 'Getir' ? 'bg-purple-600' : 
                              product.store === 'Yemeksepeti' ? 'bg-red-600' : 
                              'bg-orange-600'}`}
                          >
                            {product.store}
                          </span>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="mb-3">
                          <div className="text-sm text-gray-500">{product.brand}</div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-gray-600 mt-1">
                            {product.amount} {product.unit}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-1.5 text-sm text-gray-600">
                            <Store className="w-4 h-4" />
                            <span>{product.deliveryTime}</span>
                          </div>
                          <div className="text-lg font-bold">
                            {product.price.toFixed(2)} ₺
                          </div>
                        </div>

                        {product.inStock ? (
                          cartItem ? (
                            <QuantitySelector
                              quantity={cartItem.quantity}
                              maxQuantity={10}
                              onChange={(quantity) => handleQuantityChange(product.id, quantity)}
                              store={product.store}
                            />
                          ) : (
                            <button
                              onClick={() => handleAddToCart(product)}
                              className={`w-full py-2.5 text-white rounded-lg transition-colors duration-200
                                ${product.store === 'Getir' 
                                  ? 'bg-purple-600 hover:bg-purple-700' 
                                  : product.store === 'Yemeksepeti'
                                  ? 'bg-red-600 hover:bg-red-700'
                                  : 'bg-orange-600 hover:bg-orange-700'
                                }`}
                            >
                              Sepete Ekle
                            </button>
                          )
                        ) : (
                          <div className="text-center py-2.5 text-red-500 font-medium bg-red-50 rounded-lg">
                            Stokta Yok
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {cartItems.length > 0 && (
          <div className="sticky bottom-0 p-4 bg-white border-t shadow-lg">
            <div className="max-w-3xl mx-auto">
              <button
                onClick={handleCheckout}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>
                  {isAuthenticated ? 'Sepeti Görüntüle' : 'Giriş Yap ve Devam Et'} ({totalItems} Ürün)
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}