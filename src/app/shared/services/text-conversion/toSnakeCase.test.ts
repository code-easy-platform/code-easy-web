import { toSnakeCase } from './toSnakeCase';

describe('Try PascalCase conversion', () => {
  test('"Generator is better" must be "generator_is_better"', () => {
    expect(toSnakeCase('Generator is better')).toEqual('generator_is_better');
  });

  test('"Generator Is Better" must be "generator_is_better"', () => {
    expect(toSnakeCase('Generator Is Better')).toEqual('generator_is_better');
  });

  test('"GENERATOR IS BETTER" must be "generator_is_better"', () => {
    expect(toSnakeCase('GENERATOR IS BETTER')).toEqual('generator_is_better');
  });

  test('"generator-is-better" must be "generator_is_better"', () => {
    expect(toSnakeCase('generator-is-better')).toEqual('generator_is_better');
  });

  test('"generator-Is-Better" must be "generator_is_better"', () => {
    expect(toSnakeCase('generator-Is-Better')).toEqual('generator_is_better');
  });

  test('"Generator-Is-Better" must be "generator_is_better"', () => {
    expect(toSnakeCase('Generator-Is-Better')).toEqual('generator_is_better');
  });

  test('"GENERATOR-IS-BETTER" must be "generator_is_better"', () => {
    expect(toSnakeCase('GENERATOR-IS-BETTER')).toEqual('generator_is_better');
  });

  test('"generator_is_better" must be "generator_is_better"', () => {
    expect(toSnakeCase('generator_is_better')).toEqual('generator_is_better');
  });

  test('"generator_Is_Better" must be "generator_is_better"', () => {
    expect(toSnakeCase('generator_Is_Better')).toEqual('generator_is_better');
  });

  test('"Generator_Is_Better" must be "generator_is_better"', () => {
    expect(toSnakeCase('Generator_Is_Better')).toEqual('generator_is_better');
  });

  test('"GENERATOR_IS_BETTER" must be "generator_is_better"', () => {
    expect(toSnakeCase('GENERATOR_IS_BETTER')).toEqual('generator_is_better');
  });

  test('"generatorisbetter" must be "generatorisbetter"', () => {
    expect(toSnakeCase('generatorisbetter')).toEqual('generatorisbetter');
  });

  test('"generatorIsBetter" must be "generator_is_better"', () => {
    expect(toSnakeCase('generatorIsBetter')).toEqual('generator_is_better');
  });

  test('" GeneratorIsBetter" must be " generator_is_better"', () => {
    expect(toSnakeCase(' GeneratorIsBetter')).toEqual('generator_is_better');
  });

  test('"éâõ" must be "eao"', () => {
    expect(toSnakeCase('éâõ')).toEqual('eao');
  });

  test('"é â õ" must be "eAO"', () => {
    expect(toSnakeCase('é â õ')).toEqual('e_a_o');
  });
});
