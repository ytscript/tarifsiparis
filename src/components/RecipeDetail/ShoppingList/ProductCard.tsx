import React, { useState } from 'react';
import { Store, ShoppingCart, Plus, Minus } from 'lucide-react';
import type { MarketProduct } from '../../../types/market';

interface ProductCardProps {
  product: MarketProduct;
  onAddToCart: (product: MarketProduct) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const storeThemes = {
    Getir: {
      badge: 'bg-purple-600',
      button: 'bg-purple-600 hover:bg-purple-700',
      hover: 'hover:border-purple-200'
    },
    Yemeksepeti: {
      badge: 'bg-red-600',
      button: 'bg-red-600 hover:bg-red-700',
      hover: 'hover:border-red-200'
    },
    Migros: {
      badge: 'bg-orange-600',
      button: 'bg-orange-600 hover:bg-orange-700',
      hover: 'hover:border-orange-200'
    }
  }[product.store];

  const handleAddToCart = () => {
    if (!isAddingToCart) {
      setIsAddingToCart(true);
      return;
    }
    onAddToCart({ ...product, amount: quantity });
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity === 0) {
      setIsAddingToCart(false);
      setQuantity(1);
      return;
    }
    setQuantity(newQuantity);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100">
      <div className="relative aspect-square">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1.5 rounded-full text-sm font-medium text-white ${storeThemes.badge}`}>
            {product.store}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-3">
          <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
          <h4 className="font-medium">{product.name}</h4>
          <div className="text-sm text-gray-600 mt-1">
            {product.amount} {product.unit}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <Store className="w-4 h-4" />
            <span>{product.deliveryTime}</span>
          </div>
          <div className="text-xl font-bold">
            {product.price.toFixed(2)} ₺
          </div>
        </div>

        {product.inStock ? (
          <div className={`transition-all duration-300 ${isAddingToCart ? 'h-24' : 'h-12'}`}>
            {isAddingToCart ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-1">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-md
                             text-gray-600 transition-all duration-200
                             hover:bg-gray-200"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="w-8 text-center font-medium text-gray-900">
                      {quantity}
                    </span>
                    <span className="text-sm text-gray-500">adet</span>
                  </div>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-md
                             text-gray-600 transition-all duration-200
                             hover:bg-gray-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-white transition-all duration-200 ${storeThemes.button}`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span className="font-medium">Sepete Ekle</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-white transition-all duration-200 ${storeThemes.button}`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="font-medium">Sepete Ekle</span>
              </button>
            )}
          </div>
        ) : (
          <div className="text-center py-2.5 text-red-500 font-medium bg-red-50 rounded-lg">
            Stokta Yok
          </div>
        )}
      </div>
    </div>
  );
}