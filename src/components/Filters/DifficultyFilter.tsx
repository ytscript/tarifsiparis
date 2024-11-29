import React from 'react';
import { Flame } from 'lucide-react';

interface DifficultyFilterProps {
  selectedLevels: number[];
  onChange: (levels: number[]) => void;
}

export function DifficultyFilter({ selectedLevels, onChange }: DifficultyFilterProps) {
  const difficulties = [
    { level: 1, label: 'Kolay' },
    { level: 2, label: 'Orta' },
    { level: 3, label: 'Zor' }
  ];

  const handleClick = (level: number) => {
    if (selectedLevels.includes(level)) {
      onChange(selectedLevels.filter(l => l !== level));
    } else {
      onChange([...selectedLevels, level]);
    }
  };

  return (
    <div className="space-y-3">
      {difficulties.map(({ level, label }) => (
        <button
          key={level}
          onClick={() => handleClick(level)}
          className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
            selectedLevels.includes(level)
              ? 'bg-orange-50 border-orange-200 border-2'
              : 'bg-gray-50 border-2 border-transparent hover:border-gray-200'
          }`}
        >
          <span className="font-medium text-gray-700">{label}</span>
          <div className="flex items-center gap-1">
            {Array.from({ length: 3 }).map((_, index) => (
              <Flame
                key={index}
                className={`w-5 h-5 transition-colors ${
                  index < level
                    ? selectedLevels.includes(level)
                      ? 'text-orange-500'
                      : 'text-gray-400'
                    : 'text-gray-200'
                }`}
                fill={index < level ? 'currentColor' : 'none'}
              />
            ))}
          </div>
        </button>
      ))}
    </div>
  );
}