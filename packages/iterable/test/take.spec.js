import {iter} from '../src';

describe('take', () => {
  test('general', () => {
    expect(iter([1, 2, 3, 4, 5]).take(2).toArray()).toEqual([1, 2]);
  });
  test('default', () => {
    expect(iter([1, 2, 3, 4, 5]).take().toArray()).toEqual([]);
  });
  test('a lot', () => {
    expect(iter([1, 2, 3, 4, 5]).take(7).toArray()).toEqual([1, 2, 3, 4, 5]);
  });
  test('empty', () => {
    expect(iter([]).take(2).toArray()).toEqual([]);
  });
});

describe('takeWhile', () => {
  test('general', () => {
    expect(iter([1, 2, 3, 4, 5]).takeWhile(x => x < 3).toArray()).toEqual([1, 2]);
  });
  test('a lot', () => {
    expect(iter([1, 2, 3, 4, 5]).takeWhile(x => x < 7).toArray()).toEqual([1, 2, 3, 4, 5]);
  });
  test('empty', () => {
    expect(iter([]).takeWhile(x => x < 3).toArray()).toEqual([]);
  });
});
