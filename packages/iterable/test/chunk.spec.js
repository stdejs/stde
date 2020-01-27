import {iter} from '../src';

describe('chunk', () => {
  test('general', () => {
    expect(iter([1, 2, 3, 4, 5]).chunk(2).toArray()).toEqual([[1, 2], [3, 4], [5]]);
  });
  test('general one', () => {
    expect(iter([1, 2, 3, 4, 5]).chunk(1).toArray()).toEqual([[1], [2], [3], [4], [5]]);
  });
  test('general length', () => {
    expect(iter([1, 2, 3, 4, 5]).chunk(5).toArray()).toEqual([[1, 2, 3, 4, 5]]);
  });
  test('general big', () => {
    expect(iter([1, 2, 3, 4, 5]).chunk(7).toArray()).toEqual([[1, 2, 3, 4, 5]]);
  });
  test('empty', () => {
    expect(iter([]).chunk(2).toArray()).toEqual([]);
  });
  test('negative', () => {
    expect(() => iter([1, 2, 3, 4, 5]).chunk(-1).toArray()).toThrow();
  });
});
