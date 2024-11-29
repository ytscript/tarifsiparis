import React from 'react';
import { X } from 'lucide-react';
import { filterOptions } from '../../data/filterOptions';
import { DifficultyFilter } from './DifficultyFilter';
import type { FilterState } from '../../types/filters';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export function FilterDrawer({
  isOpen,
  onClose,
  filters,
  onFilterChange,
}: FilterDrawerProps) {
  const handleDietaryChange = (value: string) => {
    const newDietary = filters.dietary.includes(value as any)
      ? filters.dietary.filter((v) => v !== value)
      : [...filters.dietary, value as any];
    onFilterChange({ ...filters, dietary: newDietary });
  };

  const handleTimeChange = (value: string) => {
    const newTime = filters.time.includes(value as any)
      ? filters.time.filter((v) => v !== value)
      : [...filters.time, value as any];
    onFilterChange({ ...filters, time: newTime });
  };

  const handleMealTypeChange = (value: string) => {
    const newMealType = filters.mealType.includes(value as any)
      ? filters.mealType.filter((v) => v !== value)
      : [...filters.mealType, value as any];
    onFilterChange({ ...filters, mealType: newMealType });
  };

  const handleDifficultyChange = (levels: number[]) => {
    onFilterChange({ ...filters, difficulty: levels });
  };

  return (
    <div
      className={`filter-drawer w-full sm:w-96 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Filtreler</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-8">
            <div className="filter-section">
              <h3 className="filter-heading">Zorluk Seviyesi</h3>
              <DifficultyFilter
                selectedLevels={filters.difficulty}
                onChange={handleDifficultyChange}
              />
            </div>

            <div className="filter-section">
              <h3 className="filter-heading">Diyet Tercihleri</h3>
              <div className="space-y-3">
                {filterOptions.dietary.map((option) => (
                  <label key={option.value} className="filter-label">
                    <input
                      type="checkbox"
                      checked={filters.dietary.includes(option.value)}
                      onChange={() => handleDietaryChange(option.value)}
                      className="filter-checkbox"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3 className="filter-heading">Pişirme Süresi</h3>
              <div className="space-y-3">
                {filterOptions.time.map((option) => (
                  <label key={option.value} className="filter-label">
                    <input
                      type="checkbox"
                      checked={filters.time.includes(option.value)}
                      onChange={() => handleTimeChange(option.value)}
                      className="filter-checkbox"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3 className="filter-heading">Öğün Tipi</h3>
              <div className="space-y-3">
                {filterOptions.mealType.map((option) => (
                  <label key={option.value} className="filter-label">
                    <input
                      type="checkbox"
                      checked={filters.mealType.includes(option.value)}
                      onChange={() => handleMealTypeChange(option.value)}
                      className="filter-checkbox"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 bg-orange-600 text-white rounded-md 
                     hover:bg-orange-700 transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Filtreleri Uygula
          </button>
        </div>
      </div>
    </div>
  );
}