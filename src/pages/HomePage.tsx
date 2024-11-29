import React, { useState } from 'react';
import { RecipeGrid } from '../components/RecipeGrid';
import { CategoryFilter } from '../components/CategoryFilter';
import { SearchBar } from '../components/SearchBar';
import { CollapsibleFilterPanel } from '../components/Filters/CollapsibleFilterPanel';
import { useAdvancedFilters } from '../hooks/useAdvancedFilters';
import { sampleRecipes } from '../data/recipes';

export function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [searchQuery, setSearchQuery] = useState('');
  const { filters, setFilters, filterRecipes } = useAdvancedFilters();

  const filteredRecipes = filterRecipes(
    sampleRecipes.filter((recipe) => {
      const matchesCategory = selectedCategory === 'Tümü' || recipe.category.includes(selectedCategory);
      const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.category.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    })
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto pt-6">
        <div className="px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Lezzetli Tarifler
          </h1>
          
          <div className="mb-6">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <div className="mt-6">
            <CollapsibleFilterPanel
              filters={filters}
              onFilterChange={setFilters}
            />
          </div>
        </div>

        <RecipeGrid recipes={filteredRecipes} />
      </div>
    </main>
  );
}