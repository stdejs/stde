import {range} from '../src';

describe('range', () => {
  test('increasing', () => {
    expect(range(1, 5).toArray()).toEqual([1, 2, 3, 4]);
  });
  test('decreasing', () => {
    expect(range(5, 1).toArray()).toEqual([5, 4, 3, 2]);
  });
  test('increasing step', () => {
    expect(range(1, 5, 2).toArray()).toEqual([1, 3]);
  });
  test('decreasing step', () => {
    expect(range(5, 1, -3).toArray()).toEqual([5, 2]);
  });
  test('big increasing step', () => {
    expect(range(1, 5, 7).toArray()).toEqual([1]);
  });
  test('big decreasing step', () => {
    expect(range(5, 1, -7).toArray()).toEqual([5]);
  });
  test('singleton', () => {
    expect(range(1, 2).toArray()).toEqual([1]);
  });
  test('singleton decreasing', () => {
    expect(range(2, 1).toArray()).toEqual([2]);
  });
  test('empty', () => {
    expect(range(1, 1).toArray()).toEqual([]);
  });
});
