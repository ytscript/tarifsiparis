import React from 'react';
import { Flame } from 'lucide-react';
import type { DifficultyLevel } from '../../types/recipe';

interface DifficultyIndicatorProps {
  level: DifficultyLevel;
}

export function DifficultyIndicator({ level }: DifficultyIndicatorProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 3 }).map((_, index) => (
        <Flame
          key={index}
          className={`w-5 h-5 ${
            index < level ? 'text-red-500' : 'text-gray-300'
          }`}
          fill={index < level ? 'currentColor' : 'none'}
        />
      ))}
    </div>
  );
}