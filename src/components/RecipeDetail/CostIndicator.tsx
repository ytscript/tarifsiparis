import React from 'react';
import type { CostLevel } from '../../types/recipe';

interface CostIndicatorProps {
  level: CostLevel;
}

export function CostIndicator({ level }: CostIndicatorProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 3 }).map((_, index) => (
        <span
          key={index}
          className={`font-semibold ${
            index < level ? 'text-green-600' : 'text-gray-300'
          }`}
        >
          $
        </span>
      ))}
    </div>
  );
}