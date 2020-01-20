import {iter} from '../src';

describe('prepend', () => {
  test('general', () => {
    expect(iter([2, 3, 4, 5]).prepend(1).toArray()).toEqual([1, 2, 3, 4, 5]);
  });
  test('many', () => {
    expect(iter([4, 5, 6, 7]).prepend(1, 2, 3).toArray()).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
  test('none', () => {
    expect(iter([1, 2, 3, 4, 5]).prepend().toArray()).toEqual([1, 2, 3, 4, 5]);
  });
  test('empty', () => {
    expect(iter([]).prepend(1, 2, 3).toArray()).toEqual([1, 2, 3]);
  });
  test('empty none', () => {
    expect(iter([]).prepend().toArray()).toEqual([]);
  });
});
