import { removeSpecialCharacter } from './removeSpecialCharacter';

describe('Try CamelCase conversion', () => {
  test('"é â õ ç ó" must be "e a o c o"', () => {
    expect(removeSpecialCharacter('é â õ ç ó')).toEqual('e a o c o');
  });
});
