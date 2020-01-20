import {iter} from '../src';

describe('reorder', () => {
  test('general', () => {
    expect(iter([1, 2, 3, 4, 5]).reorder([4, 2, 0, 1, 3]).toArray()).toEqual([5, 3, 1, 2, 4]);
  });
  test('empty', () => {
    expect(iter([]).reorder([]).toArray()).toEqual([]);
  });
});
