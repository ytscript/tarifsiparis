import React from 'react';

const categories = [
  'Tümü',
  'Ana Yemek',
  'Tatlı',
  'Çorba',
  'Vegan',
  'İtalyan',
  'Türk Mutfağı',
  'Fırın'
];

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto py-4 px-4 sm:px-6 lg:px-8 no-scrollbar">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
            ${selectedCategory === category
              ? 'bg-orange-600 text-white'
              : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
            }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}