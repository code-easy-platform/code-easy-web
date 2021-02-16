import { snake } from 'case';

import { removeSpecialCharacter } from './removeSpecialCharacter';

export function toSnakeCase(value: string): string {
  return snake(removeSpecialCharacter(value).trim());
}
