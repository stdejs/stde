import {iter} from '../src';

describe('zip', () => {
  test('general', () => {
    expect(iter([1, 2, 3, 4]).zip(['a', 'b', 'c'], [7, 8, 9, 10, 11]).toArray())
      .toEqual([[1, 'a', 7], [2, 'b', 8], [3, 'c', 9]]);
  });
});
