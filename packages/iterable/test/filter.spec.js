import {iter} from '../src';

describe('filter', () => {
  test('general', () => {
    expect(iter([1, 2, 3, 4, 5]).filter(x => x % 2).toArray()).toEqual([1, 3, 5]);
  });
  test('none', () => {
    expect(iter([1, 2, 3, 4, 5]).filter(x => x > 7).toArray()).toEqual([]);
  });
  test('empty', () => {
    expect(iter([]).filter(x => x > 3).toArray()).toEqual([]);
  });
});

describe('of', () => {
  test('general', () => {
    expect(iter([1, [], 3, {}, 5]).of(Object).toArray()).toEqual([[], {}]);
  });
});

describe('except', () => {
  test('one', () => {
    expect(iter([1, 2, 3, 4, 5]).except(2).toArray()).toEqual([1, 3, 4, 5]);
  });
  test('none', () => {
    expect(iter([1, 2, 3, 4, 5]).except().toArray()).toEqual([1, 2, 3, 4, 5]);
  });
  test('many', () => {
    expect(iter([1, 2, 3, 4, 5]).except(2, 4).toArray()).toEqual([1, 3, 5]);
  });
  test('extra', () => {
    expect(iter([1, 2, 3, 4, 5]).except(7).toArray()).toEqual([1, 2, 3, 4, 5]);
  });
  test('empty', () => {
    expect(iter([]).except(2).toArray()).toEqual([]);
  });
});

describe('find', () => {
  test('Find returns an item that matches the predicate', () => {
    expect(iter([1, 2, 3, 4, 5]).find(x => x === 3)).toBe(3);
  });
  test('Find returns undefined if an item matching the predicate was not found', () => {
    expect(iter([1, 2, 3, 4, 5]).find(x => x >= 7)).toBe(undefined);
  });
  test('Find returns a first item matching the predicate if multiple items were found', () => {
    expect(iter([1, 2, 3, 4, 5]).find(x => x >= 3)).toBe(3);
  });
});

describe('slice', () => {
  test('general', () => {
    expect(iter([1, 2, 3, 4, 5]).slice(1, 3).toArray()).toEqual([2, 3]);
  });
  test('end default', () => {
    expect(iter([1, 2, 3, 4, 5]).slice(1).toArray()).toEqual([2, 3, 4, 5]);
  });
  test('default', () => {
    expect(iter([1, 2, 3, 4, 5]).slice().toArray()).toEqual([1, 2, 3, 4, 5]);
  });
  test('negative start', () => {
    expect(iter([1, 2, 3, 4, 5]).slice(-4, 3).toArray()).toEqual([2, 3]);
  });
  test('negative start end default', () => {
    expect(iter([1, 2, 3, 4, 5]).slice(-4).toArray()).toEqual([2, 3, 4, 5]);
  });
  test('negative start negative end', () => {
    expect(iter([1, 2, 3, 4, 5]).slice(-4, -1).toArray()).toEqual([2, 3, 4]);
  });
  test('same', () => {
    expect(iter([1, 2, 3, 4, 5]).slice(3, 3).toArray()).toEqual([]);
  });
  test('wrong', () => {
    expect(iter([1, 2, 3, 4, 5]).slice(3, 1).toArray()).toEqual([]);
  });
  test('negative wrong', () => {
    expect(iter([1, 2, 3, 4, 5]).slice(-1, -3).toArray()).toEqual([]);
  });
  test('big start', () => {
    expect(iter([1, 2, 3, 4, 5]).slice(7).toArray()).toEqual([]);
  });
  test('big end', () => {
    expect(iter([1, 2, 3, 4, 5]).slice(7, 9).toArray()).toEqual([]);
  });
  test('big negative start', () => {
    expect(iter([1, 2, 3, 4, 5]).slice(-7).toArray()).toEqual([1, 2, 3, 4, 5]);
  });
  test('big negative end', () => {
    expect(iter([1, 2, 3, 4, 5]).slice(-9, -7).toArray()).toEqual([]);
  });
  test('undefined start', () => {
    expect(iter([1, 2, 3, 4, 5]).slice(undefined, 3).toArray()).toEqual([1, 2, 3]);
  });
});
