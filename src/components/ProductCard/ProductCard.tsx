import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { CartItem } from '../../types/cart';
import { QuantitySelector } from './QuantitySelector';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
    stock: number;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cart-items', []);

  const existingItem = cartItems.find(item => item.productId === product.id);

  useEffect(() => {
    if (existingItem) {
      setQuantity(existingItem.quantity);
      setIsAddingToCart(true);
    }
  }, [existingItem]);

  const handleAddToCart = () => {
    if (!isAddingToCart) {
      setIsAddingToCart(true);
      return;
    }

    const newItem: CartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      imageUrl: product.imageUrl
    };

    setCartItems(prev => {
      const existing = prev.findIndex(item => item.productId === product.id);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = newItem;
        return updated;
      }
      return [...prev, newItem];
    });
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(prev => prev.filter(item => item.productId !== product.id));
      setIsAddingToCart(false);
      setQuantity(1);
      return;
    }
    setQuantity(newQuantity);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute top-2 left-2 px-3 py-1 bg-red-500/90 backdrop-blur-sm text-white text-sm font-medium rounded-full">
            Son {product.stock} ürün
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-bold text-gray-900">
            ₺{product.price.toFixed(2)}
          </span>
          {product.stock === 0 && (
            <span className="text-sm font-medium text-red-500">
              Stokta yok
            </span>
          )}
        </div>

        {product.stock > 0 && (
          <div className={`transition-all duration-300 ${isAddingToCart ? 'h-24' : 'h-12'}`}>
            {isAddingToCart ? (
              <div className="space-y-3">
                <QuantitySelector
                  quantity={quantity}
                  maxQuantity={product.stock}
                  onChange={handleQuantityChange}
                />
                <button
                  onClick={handleAddToCart}
                  className="w-full py-2.5 bg-orange-600 text-white rounded-lg
                           hover:bg-orange-700 active:bg-orange-800
                           transition-colors duration-200
                           flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Sepete Ekle</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className="w-full py-2.5 bg-orange-600 text-white rounded-lg
                         hover:bg-orange-700 active:bg-orange-800
                         transition-colors duration-200
                         flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Sepete Ekle</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}