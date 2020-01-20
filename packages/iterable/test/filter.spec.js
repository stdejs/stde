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
