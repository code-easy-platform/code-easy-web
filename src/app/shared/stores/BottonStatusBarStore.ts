import { observe } from 'react-observing';

interface IAlert {
  color?: string;
  messageLong?: string;
  message: string | string[] | number | number[] | undefined;
  type: 'warning' | 'success' | 'loading' | 'normal' | 'error' | 'info';
}

export const BottonStatusBarStore = observe<IAlert>({
  message: undefined,
  type: 'normal',
});
