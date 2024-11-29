import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  maxQuantity: number;
  onChange: (quantity: number) => void;
  store: 'Getir' | 'Yemeksepeti' | 'Migros';
}

export function QuantitySelector({
  quantity,
  maxQuantity,
  onChange,
  store
}: QuantitySelectorProps) {
  const storeThemes = {
    Getir: {
      button: 'hover:bg-purple-100 focus:bg-purple-100',
      active: 'bg-purple-100'
    },
    Yemeksepeti: {
      button: 'hover:bg-red-100 focus:bg-red-100',
      active: 'bg-red-100'
    },
    Migros: {
      button: 'hover:bg-orange-100 focus:bg-orange-100',
      active: 'bg-orange-100'
    }
  };

  return (
    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-1.5">
      <button
        onClick={() => onChange(quantity - 1)}
        className={`w-8 h-8 flex items-center justify-center rounded-md
                   text-gray-600 transition-all duration-200
                   ${storeThemes[store].button}
                   focus:outline-none`}
        aria-label="Azalt"
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
        onClick={() => onChange(quantity + 1)}
        disabled={quantity >= maxQuantity}
        className={`w-8 h-8 flex items-center justify-center rounded-md
                   text-gray-600 transition-all duration-200
                   ${storeThemes[store].button}
                   disabled:opacity-50 disabled:cursor-not-allowed
                   disabled:hover:bg-transparent
                   focus:outline-none`}
        aria-label="Artır"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}