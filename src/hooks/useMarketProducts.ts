import { useMemo } from 'react';
import marketData from '../data/delivery_platforms_data.json';
import type { MarketProduct, MarketData } from '../types/market';

export function useMarketProducts(ingredients: string | string[]) {
  return useMemo(() => {
    const data = marketData as MarketData;
    const productsByIngredient: Record<string, MarketProduct[]> = {};
    
    // Ensure ingredients is an array and filter out any undefined/null values
    const ingredientArray = (Array.isArray(ingredients) ? ingredients : [ingredients])
      .filter((ing): ing is string => Boolean(ing))
      .map(ing => ing.toLowerCase().trim());

    // Only proceed if we have valid ingredients
    if (ingredientArray.length === 0) {
      return productsByIngredient;
    }

    // Process each platform's products
    Object.entries(data).forEach(([platform, { name: storeName, deliveryTime, products }]) => {
      if (!products) return; // Skip if products is undefined

      products.forEach(product => {
        if (!product?.name) return; // Skip if product name is undefined

        // Match ingredient by checking if product name includes the ingredient name
        // or if ingredient name includes the product name (to handle variations)
        const matchingIngredient = ingredientArray.find(ing => 
          product.name.toLowerCase().includes(ing) || ing.includes(product.name.toLowerCase())
        );

        if (matchingIngredient) {
          const originalIngredient = Array.isArray(ingredients) 
            ? ingredients.find(ing => ing?.toLowerCase().trim() === matchingIngredient)
            : ingredients;

          if (originalIngredient) {
            if (!productsByIngredient[originalIngredient]) {
              productsByIngredient[originalIngredient] = [];
            }

            // Ensure all required properties are present
            const marketProduct: MarketProduct = {
              ...product,
              store: storeName as 'Getir' | 'Yemeksepeti' | 'Migros',
              deliveryTime,
              inStock: true,
              id: product.id || `${platform}-${product.name}`,
              brand: product.brand || storeName,
              category: product.category || 'Genel',
              description: product.description || product.name,
              unit: product.unit || 'adet',
              amount: product.amount || 1
            };

            // Only add if not already added from this store
            if (!productsByIngredient[originalIngredient].some(p => p.store === marketProduct.store)) {
              productsByIngredient[originalIngredient].push(marketProduct);
            }
          }
        }
      });
    });

    // Sort products by price for each ingredient
    Object.keys(productsByIngredient).forEach(ingredient => {
      productsByIngredient[ingredient].sort((a, b) => a.price - b.price);
    });

    return productsByIngredient;
  }, [ingredients]);
}