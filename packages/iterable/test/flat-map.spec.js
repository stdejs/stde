import {iter} from '../src';

describe('flatMap', () => {
  test('general', () => {
    expect(iter([1, 2, 3]).flatMap(x => [x, x * x]).toArray()).toEqual([1, 1, 2, 4, 3, 9]);
  });
  test('empty result', () => {
    expect(iter([1, 2, 3]).flatMap(x => x !== 2 ? [x, x * x] : []).toArray()).toEqual([1, 1, 3, 9]);
  });
  test('empty', () => {
    expect(iter([]).flatMap(x => x * x).toArray()).toEqual([]);
  });
});
