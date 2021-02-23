import { toCamelCase } from './toCamelCase';

describe('Try CamelCase conversion', () => {
  test('"Generator is better" must be "generatorIsBetter"', () => {
    expect(toCamelCase('Generator is better')).toEqual('generatorIsBetter');
  });

  test('"Generator Is Better" must be "generatorIsBetter"', () => {
    expect(toCamelCase('Generator Is Better')).toEqual('generatorIsBetter');
  });

  test('"GENERATOR IS BETTER" must be "generatorIsBetter"', () => {
    expect(toCamelCase('GENERATOR IS BETTER')).toEqual('generatorIsBetter');
  });

  test('"generator-is-better" must be "generatorIsBetter"', () => {
    expect(toCamelCase('generator-is-better')).toEqual('generatorIsBetter');
  });

  test('"generator-Is-Better" must be "generatorIsBetter"', () => {
    expect(toCamelCase('generator-Is-Better')).toEqual('generatorIsBetter');
  });

  test('"Generator-Is-Better" must be "generatorIsBetter"', () => {
    expect(toCamelCase('Generator-Is-Better')).toEqual('generatorIsBetter');
  });

  test('"GENERATOR-IS-BETTER" must be "generatorIsBetter"', () => {
    expect(toCamelCase('GENERATOR-IS-BETTER')).toEqual('generatorIsBetter');
  });

  test('"generator_is_better" must be "generatorIsBetter"', () => {
    expect(toCamelCase('generator_is_better')).toEqual('generatorIsBetter');
  });

  test('"generator_Is_Better" must be "generatorIsBetter"', () => {
    expect(toCamelCase('generator_Is_Better')).toEqual('generatorIsBetter');
  });

  test('"Generator_Is_Better" must be "generatorIsBetter"', () => {
    expect(toCamelCase('Generator_Is_Better')).toEqual('generatorIsBetter');
  });

  test('"GENERATOR_IS_BETTER" must be "generatorIsBetter"', () => {
    expect(toCamelCase('GENERATOR_IS_BETTER')).toEqual('generatorIsBetter');
  });

  test('"generatorisbetter" must be "generatorisbetter"', () => {
    expect(toCamelCase('generatorisbetter')).toEqual('generatorisbetter');
  });

  test('"generatorIsBetter" must be "generatorIsBetter"', () => {
    expect(toCamelCase('generatorIsBetter')).toEqual('generatorIsBetter');
  });

  test('" GeneratorIsBetter" must be " generatorIsBetter"', () => {
    expect(toCamelCase(' GeneratorIsBetter')).toEqual('generatorIsBetter');
  });

  test('"éâõ" must be "eao"', () => {
    expect(toCamelCase('éâõ')).toEqual('eao');
  });

  test('"é â õ" must be "eAO"', () => {
    expect(toCamelCase('é â õ')).toEqual('eAO');
  });
});
