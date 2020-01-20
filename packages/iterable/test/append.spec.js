import {iter} from '../src';

describe('append', () => {
  test('general', () => {
    expect(iter([1, 2, 3, 4]).append(5).toArray()).toEqual([1, 2, 3, 4, 5]);
  });
  test('many', () => {
    expect(iter([1, 2, 3, 4]).append(5, 6, 7).toArray()).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
  test('none', () => {
    expect(iter([1, 2, 3, 4, 5]).append().toArray()).toEqual([1, 2, 3, 4, 5]);
  });
  test('empty', () => {
    expect(iter([]).append(1, 2, 3).toArray()).toEqual([1, 2, 3]);
  });
  test('empty none', () => {
    expect(iter([]).append().toArray()).toEqual([]);
  });
});
