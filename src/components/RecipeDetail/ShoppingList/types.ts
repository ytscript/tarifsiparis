import type { Recipe } from '../../../types/recipe';
import type { MarketProduct } from '../../../types/market';

export interface IngredientWithStores extends Recipe['ingredients'][0] {
  stores: MarketProduct[];
}