import React from 'react';
import { X, Flame } from 'lucide-react';
import { filterOptions } from '../../data/filterOptions';
import type { FilterState } from '../../types/filters';

interface ActiveFiltersProps {
  filters: FilterState;
  onRemove: (type: keyof FilterState, value: string) => void;
}

export function ActiveFilters({ filters, onRemove }: ActiveFiltersProps) {
  const getLabel = (type: keyof FilterState, value: string) => {
    switch (type) {
      case 'dietary':
        return filterOptions.dietary.find((o) => o.value === value)?.label;
      case 'time':
        return filterOptions.time.find((o) => o.value === value)?.label;
      case 'mealType':
        return filterOptions.mealType.find((o) => o.value === value)?.label;
      case 'difficulty':
        return `Zorluk: ${value === '1' ? 'Kolay' : value === '2' ? 'Orta' : 'Zor'}`;
      default:
        return value;
    }
  };

  const activeFilters = [
    ...filters.dietary.map((value) => ({ type: 'dietary' as const, value })),
    ...filters.time.map((value) => ({ type: 'time' as const, value })),
    ...filters.mealType.map((value) => ({ type: 'mealType' as const, value })),
    ...filters.difficulty.map((value) => ({ type: 'difficulty' as const, value: value.toString() }))
  ];

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 px-4 sm:px-6 lg:px-8 py-2">
      {activeFilters.map(({ type, value }) => (
        <span
          key={`${type}-${value}`}
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
            type === 'difficulty'
              ? 'bg-orange-100 text-orange-800'
              : 'bg-orange-100 text-orange-800'
          }`}
        >
          {type === 'difficulty' && (
            <Flame className="w-4 h-4 mr-1.5" />
          )}
          {getLabel(type, value)}
          <button
            onClick={() => onRemove(type, value)}
            className="ml-2 hover:text-orange-900"
          >
            <X className="w-4 h-4" />
          </button>
        </span>
      ))}
    </div>
  );
}