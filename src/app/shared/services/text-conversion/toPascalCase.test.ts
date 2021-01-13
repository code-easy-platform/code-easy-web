import { toPascalCase } from './toPascalCase';

describe('Try PascalCase conversion', () => {
  test('"Generator is better" must be "GeneratorIsBetter"', () => {
    expect(toPascalCase('Generator is better')).toEqual('GeneratorIsBetter');
  });

  test('"Generator Is Better" must be "GeneratorIsBetter"', () => {
    expect(toPascalCase('Generator Is Better')).toEqual('GeneratorIsBetter');
  });

  test('"GENERATOR IS BETTER" must be "GeneratorIsBetter"', () => {
    expect(toPascalCase('GENERATOR IS BETTER')).toEqual('GeneratorIsBetter');
  });

  test('"generator-is-better" must be "GeneratorIsBetter"', () => {
    expect(toPascalCase('generator-is-better')).toEqual('GeneratorIsBetter');
  });

  test('"generator-Is-Better" must be "GeneratorIsBetter"', () => {
    expect(toPascalCase('generator-Is-Better')).toEqual('GeneratorIsBetter');
  });

  test('"Generator-Is-Better" must be "GeneratorIsBetter"', () => {
    expect(toPascalCase('Generator-Is-Better')).toEqual('GeneratorIsBetter');
  });

  test('"GENERATOR-IS-BETTER" must be "GeneratorIsBetter"', () => {
    expect(toPascalCase('GENERATOR-IS-BETTER')).toEqual('GeneratorIsBetter');
  });

  test('"generator_is_better" must be "GeneratorIsBetter"', () => {
    expect(toPascalCase('generator_is_better')).toEqual('GeneratorIsBetter');
  });

  test('"generator_Is_Better" must be "GeneratorIsBetter"', () => {
    expect(toPascalCase('generator_Is_Better')).toEqual('GeneratorIsBetter');
  });

  test('"Generator_Is_Better" must be "GeneratorIsBetter"', () => {
    expect(toPascalCase('Generator_Is_Better')).toEqual('GeneratorIsBetter');
  });

  test('"GENERATOR_IS_BETTER" must be "GeneratorIsBetter"', () => {
    expect(toPascalCase('GENERATOR_IS_BETTER')).toEqual('GeneratorIsBetter');
  });

  test('"generatorisbetter" must be "Generatorisbetter"', () => {
    expect(toPascalCase('generatorisbetter')).toEqual('Generatorisbetter');
  });

  test('"generatorIsBetter" must be "GeneratorIsBetter"', () => {
    expect(toPascalCase('generatorIsBetter')).toEqual('GeneratorIsBetter');
  });

  test('" GeneratorIsBetter" must be " GeneratorIsBetter"', () => {
    expect(toPascalCase(' GeneratorIsBetter')).toEqual('GeneratorIsBetter');
  });

  test('"éâõ" must be "eao"', () => {
    expect(toPascalCase('éâõ')).toEqual('Eao');
  });

  test('"é â õ" must be "eAO"', () => {
    expect(toPascalCase('é â õ')).toEqual('EAO');
  });
});
