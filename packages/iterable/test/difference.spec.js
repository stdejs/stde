import {iter} from '../src';

describe('difference', () => {
  test('general', () => {
    expect(iter(['32', 2, '121', 57, 4]).difference([1, 4, 2, 32]).toArray()).toEqual(['32', '121', 57]);
  });
});
