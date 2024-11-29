import React from 'react';
import { Leaf, Wheat, Milk } from 'lucide-react';

interface DietaryBadgesProps {
  categories: string[];
}

export function DietaryBadges({ categories }: DietaryBadgesProps) {
  const badges = [
    {
      type: 'Vegan',
      icon: Leaf,
      color: 'text-green-600',
      bgColor: 'bg-green-50/90 backdrop-blur-sm',
      show: categories.includes('Vegan'),
      description: 'Sadece bitkisel içerikli'
    },
    {
      type: 'Vejetaryen',
      icon: Leaf,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50/90 backdrop-blur-sm',
      show: categories.includes('Vejetaryen'),
      description: 'Et içermeyen'
    },
    {
      type: 'Glutensiz',
      icon: Wheat,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50/90 backdrop-blur-sm',
      show: categories.includes('Glutensiz'),
      description: 'Gluten içermeyen'
    },
    {
      type: 'Süt Ürünsüz',
      icon: Milk,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50/90 backdrop-blur-sm',
      show: categories.includes('Süt Ürünsüz'),
      description: 'Süt ve süt ürünleri içermeyen'
    }
  ];

  const visibleBadges = badges.filter(badge => badge.show);

  if (visibleBadges.length === 0) return null;

  return (
    <div className="flex flex-col gap-1.5">
      {visibleBadges.map((badge) => (
        <div
          key={badge.type}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg ${badge.bgColor} ${badge.color} text-xs font-medium shadow-sm`}
          title={badge.description}
        >
          <badge.icon className="w-3.5 h-3.5" />
          <span>{badge.type}</span>
        </div>
      ))}
    </div>
  );
}