export interface Recipe {
  id: string;
  title: string;
  author: {
    name: string;
    background: string;
  };
  difficulty: 1 | 2 | 3;
  prepTime: number;
  cookTime: number;
  servings: number;
  costLevel: 1 | 2 | 3;
  category: string[];
  ingredients: {
    name: string;
    amount: number;
    unit: string;
  }[];
  equipment: string[];
  instructions: string[];
  tips: string[];
  nutritionFacts: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  storage: {
    method: string;
    duration: string;
  };
  variations: string[];
  pairings: string[];
  imageUrl: string;
  rating: number;
  reviews: number;
}

export type CostLevel = 1 | 2 | 3;
export type DifficultyLevel = 1 | 2 | 3;