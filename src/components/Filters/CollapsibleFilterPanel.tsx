import React, { useState } from 'react';
import { ChevronDown, Filter, ArrowUpDown } from 'lucide-react';
import { DifficultyFilter } from './DifficultyFilter';
import { filterOptions } from '../../data/filterOptions';
import type { FilterState, SortOption } from '../../types/filters';

interface CollapsibleFilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export function CollapsibleFilterPanel({
  filters,
  onFilterChange,
}: CollapsibleFilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const togglePanel = () => {
    setIsExpanded(!isExpanded);
  };

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

  const handleSortChange = (value: SortOption) => {
    onFilterChange({ ...filters, sort: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <button
        onClick={togglePanel}
        className="w-full px-4 py-3 flex items-center justify-between text-gray-700 hover:bg-gray-50 transition-all duration-300"
        aria-expanded={isExpanded}
        aria-controls="filter-content"
      >
        <div className="flex items-center gap-2">
          <Filter className={`w-5 h-5 transition-colors duration-300 ${
            isExpanded ? 'text-orange-600' : 'text-gray-500'
          }`} />
          <span className={`font-medium transition-colors duration-300 ${
            isExpanded ? 'text-orange-600' : 'text-gray-700'
          }`}>
            Detaylı Filtreler
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 transition-all duration-300 ${
            isExpanded ? 'rotate-180 text-orange-600' : 'text-gray-500'
          }`}
        />
      </button>

      <div
        id="filter-content"
        className={`grid transition-all duration-300 ease-in-out ${
          isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
        aria-hidden={!isExpanded}
      >
        <div className="overflow-hidden">
          <div className="p-4 border-t border-gray-200 space-y-6">
            {/* Sorting Section */}
            <div className="filter-section">
              <div className="flex items-center gap-2 mb-3">
                <ArrowUpDown className="w-4 h-4 text-gray-500" />
                <h3 className="text-sm font-medium text-gray-900">
                  Sıralama
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {filterOptions.sort.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSortChange(option.value)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium 
                              transition-all duration-200 
                              ${filters.sort === option.value
                                ? 'bg-orange-100 text-orange-800 shadow-sm border-2 border-orange-200'
                                : 'bg-gray-50 text-gray-700 hover:bg-orange-50 hover:text-orange-600 border-2 border-transparent'
                              }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Zorluk Seviyesi
              </h3>
              <DifficultyFilter
                selectedLevels={filters.difficulty}
                onChange={(levels) => onFilterChange({ ...filters, difficulty: levels })}
              />
            </div>

            <div className="filter-section">
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Diyet Tercihleri
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {filterOptions.dietary.map((option) => (
                  <label
                    key={option.value}
                    className="relative flex items-center group"
                  >
                    <input
                      type="checkbox"
                      checked={filters.dietary.includes(option.value)}
                      onChange={() => handleDietaryChange(option.value)}
                      className="peer sr-only"
                    />
                    <div className="w-full p-3 rounded-lg flex items-center gap-3
                                  border-2 transition-all duration-200
                                  peer-checked:border-orange-200 peer-checked:bg-orange-50
                                  peer-checked:text-orange-800
                                  peer-hover:border-orange-100 peer-hover:bg-orange-50/50
                                  cursor-pointer border-transparent bg-gray-50">
                      <div className="w-5 h-5 rounded border-2 transition-all duration-200
                                    flex items-center justify-center
                                    peer-checked:border-orange-500 peer-checked:bg-orange-500
                                    border-gray-300 bg-white group-hover:border-orange-400">
                        <svg
                          className={`w-3 h-3 text-white transition-all duration-200 ${
                            filters.dietary.includes(option.value) ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-sm font-medium">{option.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Hazırlama Süresi
              </h3>
              <div className="flex flex-wrap gap-2">
                {filterOptions.time.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleTimeChange(option.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium 
                              transition-all duration-200 transform hover:scale-105 
                              ${filters.time.includes(option.value)
                                ? 'bg-orange-100 text-orange-800 shadow-sm'
                                : 'bg-gray-100 text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                              }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}