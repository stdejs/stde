import {iter} from '../src';

describe('map', () => {
  test('general', () => {
    expect(iter([1, 2, 3, 4, 5]).map(x => x * x).toArray()).toEqual([1, 4, 9, 16, 25]);
  });
  test('index', () => {
    expect(iter([1, 2, 3, 4, 5]).map((x, i) => i).toArray()).toEqual([0, 1, 2, 3, 4]);
  });
  test('empty', () => {
    expect(iter([]).map(x => x * x).toArray()).toEqual([]);
  });
});
