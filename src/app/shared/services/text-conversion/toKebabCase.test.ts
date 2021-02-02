import { toKebabCase } from './toKebabCase';

describe('Try KebabCase conversion', () => {
  test('"Generator is better" must be "generator-is-better"', () => {
    expect(toKebabCase('Generator is better')).toEqual('generator-is-better');
  });

  test('"Generator Is Better" must be "generator-is-better"', () => {
    expect(toKebabCase('Generator Is Better')).toEqual('generator-is-better');
  });

  test('"generator-is-better" must be "generator-is-better"', () => {
    expect(toKebabCase('generator-is-better')).toEqual('generator-is-better');
  });

  test('"generator_is_better" must be "generator-is-better"', () => {
    expect(toKebabCase('generator_is_better')).toEqual('generator-is-better');
  });

  test('"generatorIsBetter" must be "generator-is-better"', () => {
    expect(toKebabCase('generatorIsBetter')).toEqual('generator-is-better');
  });

  test('" GeneratorIsBetter" must be " generator-is-better"', () => {
    expect(toKebabCase(' GeneratorIsBetter')).toEqual('generator-is-better');
  });

  test('"GENERATOR IS BETTER" must be "generator-is-better"', () => {
    expect(toKebabCase('GENERATOR IS BETTER')).toEqual('generator-is-better');
  });

  test('"GENERATOR-IS-BETTER" must be "generator-is-better"', () => {
    expect(toKebabCase('GENERATOR-IS-BETTER')).toEqual('generator-is-better');
  });

  test('"éâõ" must be "eao"', () => {
    expect(toKebabCase('éâõ')).toEqual('eao');
  });

  test('"é â õ" must be "e-a-o"', () => {
    expect(toKebabCase('é â õ')).toEqual('e-a-o');
  });
});
