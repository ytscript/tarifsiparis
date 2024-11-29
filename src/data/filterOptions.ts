import type { FilterOptions } from '../types/filters';

export const filterOptions: FilterOptions = {
  dietary: [
    { value: 'vegetarian', label: 'Vejetaryen' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'gluten-free', label: 'Glutensiz' },
    { value: 'dairy-free', label: 'Süt Ürünsüz' },
  ],
  time: [
    { value: 'quick', label: '30dk veya az', maxMinutes: 30 },
    { value: 'medium', label: '30-60dk', maxMinutes: 60 },
    { value: 'long', label: '60dk üzeri', maxMinutes: Infinity },
  ],
  mealType: [
    { value: 'breakfast', label: 'Kahvaltı' },
    { value: 'lunch', label: 'Öğle Yemeği' },
    { value: 'dinner', label: 'Akşam Yemeği' },
    { value: 'snack', label: 'Atıştırmalık' },
    { value: 'dessert', label: 'Tatlı' },
  ],
  sort: [
    { value: 'popular', label: 'En Popüler' },
    { value: 'rating', label: 'En Yüksek Puan' },
    { value: 'time', label: 'En Hızlı' },
    { value: 'newest', label: 'En Yeni' },
  ],
};