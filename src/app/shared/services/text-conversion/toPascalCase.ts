import { pascal } from 'case';

import { removeSpecialCharacter } from './removeSpecialCharacter';

export function toPascalCase(value: string): string {
  return pascal(removeSpecialCharacter(value));
}
