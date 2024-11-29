export interface MarketProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  description: string;
  inStock: boolean;
  imageUrl: string;
  unit: string;
  amount: number;
  store: 'Getir' | 'Yemeksepeti' | 'Migros';
  deliveryTime: string;
}

export interface MarketPlatform {
  name: string;
  deliveryTime: string;
  minOrderAmount: number;
  products: Omit<MarketProduct, 'store' | 'deliveryTime'>[];
}

export interface MarketData {
  getir: MarketPlatform;
  yemeksepeti: MarketPlatform;
  migros: MarketPlatform;
}