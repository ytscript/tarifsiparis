import type { Recipe } from './recipe';

export type SortOption = 'popular' | 'rating' | 'time' | 'newest';
export type DietaryFilter = 'vegetarian' | 'vegan' | 'gluten-free' | 'dairy-free';
export type TimeFilter = 'quick' | 'medium' | 'long';
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'dessert';

export interface FilterState {
  sort: SortOption;
  dietary: DietaryFilter[];
  time: TimeFilter[];
  mealType: MealType[];
  difficulty: number[];
}

export interface FilterOptions {
  dietary: Array<{ value: DietaryFilter; label: string }>;
  time: Array<{ value: TimeFilter; label: string; maxMinutes: number }>;
  mealType: Array<{ value: MealType; label: string }>;
  sort: Array<{ value: SortOption; label: string }>;
}