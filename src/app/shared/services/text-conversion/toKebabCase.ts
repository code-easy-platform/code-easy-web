import { removeSpecialCharacter } from './removeSpecialCharacter';

export function toKebabCase(value: string): string {
  return removeSpecialCharacter(value)
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    ?.map(word => word.toLowerCase())
    .join('-') || '';
}
