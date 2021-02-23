import { useCallback, useRef } from 'react';

export const useDebounce = (delay: number = 1000) => {
  const debouncing = useRef<NodeJS.Timeout | null>();

  const debounce = useCallback((func: Function) => {
    if (debouncing.current) {
      clearTimeout(debouncing.current);
    }

    debouncing.current = setTimeout(() => func(), delay);
  }, [delay]);

  return { debounce }
}
