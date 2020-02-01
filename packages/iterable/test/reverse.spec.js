import {iter} from '../src';

describe('reverse', () => {
  test('general', () => {
    expect(iter([1, 2, 3, 4, 5]).reverse().toArray()).toEqual([5, 4, 3, 2, 1]);
  });
  test('reverse reverse', () => {
    expect(iter([1, 2, 3, 4, 5]).reverse().reverse().toArray()).toEqual([1, 2, 3, 4, 5]);
  });
  test('map', () => {
    expect(iter([1, 2, 3, 4, 5]).map(x => x).reverse().toArray()).toEqual([5, 4, 3, 2, 1]);
  });
  test('empty', () => {
    expect(iter([]).reverse().toArray()).toEqual([]);
  });
});
