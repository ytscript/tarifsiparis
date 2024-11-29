import React, { useState, useEffect } from 'react';
import { Share2, Check } from 'lucide-react';

interface ShareButtonProps {
  recipeId: string;
  title: string;
}

export function ShareButton({ recipeId, title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const recipeUrl = `${window.location.origin}/recipe/${recipeId}`;

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(recipeUrl);
      setCopied(true);
    } catch (err) {
      console.error('Kopyalama başarısız:', err);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className="px-6 py-3 rounded-lg bg-white shadow-md hover:shadow-lg
                 transition-all duration-200 flex items-center gap-3
                 group relative"
        aria-label="Tarifi paylaş"
      >
        {copied ? (
          <>
            <Check className="w-5 h-5 text-green-600" />
            <span className="text-green-600 font-medium">Kopyalandı!</span>
          </>
        ) : (
          <>
            <Share2 className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
            <span className="text-gray-700 group-hover:text-gray-900 font-medium">
              Tarifi Paylaş
            </span>
          </>
        )}
      </button>

      {copied && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2
                      px-4 py-2 bg-green-100 text-green-800 rounded-md text-sm
                      shadow-sm border border-green-200 whitespace-nowrap">
          Tarif linki panoya kopyalandı!
        </div>
      )}
    </div>
  );
}