import {almostEqual} from '../src/precision.js';

describe('almostEqual', () => {
  test('general', () => {
    expect(almostEqual(1e-16, 0)).toBe(true);
  });
});
