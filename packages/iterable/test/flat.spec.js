import {iter} from '../src';

describe('flat', () => {
  test('general', () => {
    expect(iter([[1, 2], 3, [4, 5]]).flat().toArray()).toEqual([1, 2, 3, 4, 5]);
  });
  test('depth 1', () => {
    expect(iter([[1, 2], 3, [4, 5]]).flat(1).toArray()).toEqual([1, 2, 3, 4, 5]);
  });
  test('depth 3', () => {
    expect(iter([[1, [2]], 3, [4, 5]]).flat(3).toArray()).toEqual([1, 2, 3, 4, 5]);
  });
  test('depth 0', () => {
    expect(iter([[1, 2], 3, [4, 5]]).flat(0).toArray()).toEqual([[1, 2], 3, [4, 5]]);
  });
  test('depth -1', () => {
    expect(iter([[1, 2], 3, [4, 5]]).flat(0).toArray()).toEqual([[1, 2], 3, [4, 5]]);
  });
  test('deep', () => {
    expect(iter([[1, [2]], 3, [4, 5]]).flat().toArray()).toEqual([1, [2], 3, 4, 5]);
  });
  test('deep 2', () => {
    expect(iter([[1, [2]], 3, [4, 5]]).flat(2).toArray()).toEqual([1, 2, 3, 4, 5]);
  });
  test('empty', () => {
    expect(iter([]).flat().toArray()).toEqual([]);
  });
  test('empty depth 2', () => {
    expect(iter([]).flat(2).toArray()).toEqual([]);
  });
  test('nested empty', () => {
    expect(iter([[1, 2], 3, [], [4, 5]]).flat().toArray()).toEqual([1, 2, 3, 4, 5]);
  });
  test('deep nested empty', () => {
    expect(iter([[1, 2], 3, [4, [], 5]]).flat().toArray()).toEqual([1, 2, 3, 4, [], 5]);
  });
  test('nested iterable', () => {
    expect(iter([iter([1, 2]), 3, [], [4, 5]]).flat(1).toArray()).toEqual([1, 2, 3, 4, 5]);
  });
  test('deep iterable', () => {
    expect(iter([[1, iter([2, [3]])], [4, 5]]).flat(3).toArray()).toEqual([1, 2, 3, 4, 5]);
  });
});
