import {iter} from '../src';

describe('concat', () => {
  test('one argument', () => {
    expect(iter([1, 2, 3]).concat([4, 5]).toArray()).toEqual([1, 2, 3, 4, 5]);
  });
  test('two arguments', () => {
    expect(iter([1, 2, 3]).concat([4, 5], [6, 7]).toArray()).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
  test('no argument', () => {
    expect(iter([1, 2, 3]).concat().toArray()).toEqual([1, 2, 3]);
  });
  test('empty argument', () => {
    expect(iter([1, 2, 3]).concat([]).toArray()).toEqual([1, 2, 3]);
  });
  test('empty', () => {
    expect(iter([]).concat([1, 2, 3]).toArray()).toEqual([1, 2, 3]);
  });
});
