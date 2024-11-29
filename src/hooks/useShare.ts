import { useState, useCallback } from 'react';

interface ShareOptions {
  title: string;
  text: string;
  url: string;
}

export function useShare() {
  const [isSharing, setIsSharing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const share = useCallback(async (options: ShareOptions) => {
    setIsSharing(true);
    setError(null);

    try {
      if (navigator.share) {
        await navigator.share(options);
      } else {
        throw new Error('Web Share API not supported');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to share');
      return false;
    } finally {
      setIsSharing(false);
    }

    return true;
  }, []);

  return {
    isSharing,
    error,
    share
  };
}