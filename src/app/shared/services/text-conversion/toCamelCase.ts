import { camel } from 'case';

import { removeSpecialCharacter } from './removeSpecialCharacter';

export function toCamelCase(value: string): string {
  return camel(removeSpecialCharacter(value));
}
