import {gamma, gammaLog} from '../../src/functions/gamma.js';
import {almostEqual} from '../../src/precision.js';

describe('gamma', () => {
  let factorial = 1;
  for (let i = 2; i <= 10; i++) {
    test(`gamma(${i}) = ${i - 1}!`, () => {
      factorial *= i - 1;
      expect(almostEqual(gamma(i), factorial, 1e-8)).toBe(true);
      // expect(gamma(i)).toBe(factorial);
    });
  }
/*
  test('gamma(1) = 1', () => {
    expect(gamma(1)).toBe(1);
  });
  test('gamma(2) = 1', () => {
    expect(gamma(2)).toBe(1);
  });
  test('gamma(3) = 2', () => {
    expect(gamma(3)).toBe(2);
  });
  test('gamma(4) = 6', () => {
    expect(gamma(4)).toBe(6);
  });
  test('gamma(5) = 24', () => {
    expect(gamma(5)).toBe(24);
  });
*/
});

describe('gammaLog', () => {
  test('general', () => {
    const z = 0.7;
    expect(gammaLog(z)).toBe(Math.log(gamma(z)));
  });
});
