import React, { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { FilterDrawer } from './FilterDrawer';
import { SortSelect } from './SortSelect';
import { ActiveFilters } from './ActiveFilters';
import type { FilterState } from '../../types/filters';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onRemoveFilter: (type: keyof FilterState, value: string) => void;
  totalRecipes: number;
}

export function FilterBar({
  filters,
  onFilterChange,
  onRemoveFilter,
  totalRecipes,
}: FilterBarProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="bg-white shadow">
      <div className="max-w-7xl mx-auto">
        <div className="border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filtrele
                </button>
                <div className="hidden sm:block">
                  <span className="text-sm text-gray-500">
                    {totalRecipes} tarif bulundu
                  </span>
                </div>
              </div>
              <div className="w-48">
                <SortSelect
                  value={filters.sort}
                  onChange={(value) => onFilterChange({ ...filters, sort: value })}
                />
              </div>
            </div>
          </div>

          <ActiveFilters filters={filters} onRemove={onRemoveFilter} />
        </div>
      </div>

      <FilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        filters={filters}
        onFilterChange={onFilterChange}
      />
    </div>
  );
}