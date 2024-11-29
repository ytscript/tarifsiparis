import React from 'react';
import { ShoppingBag, Store } from 'lucide-react';
import type { MarketProduct } from '../../../types/market';

interface CartSummaryProps {
  items: MarketProduct[];
  onCheckout: () => void;
}

export function CartSummary({ items, onCheckout }: CartSummaryProps) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const groupedByStore = items.reduce((acc, item) => {
    acc[item.store] = (acc[item.store] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="sticky bottom-0 p-6 bg-white border-t shadow-lg">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              {Object.entries(groupedByStore).map(([store, count]) => (
                <div
                  key={store}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100"
                >
                  <Store className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {store}: {count} ürün
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-sm text-gray-600">Toplam:</span>
              <span className="text-2xl font-bold">{total.toFixed(2)}</span>
              <span className="text-gray-600">₺</span>
            </div>
          </div>
          
          <button
            onClick={onCheckout}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200 font-medium"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Sepeti Onayla ({items.length} Ürün)</span>
          </button>
        </div>
      </div>
    </div>
  );
}