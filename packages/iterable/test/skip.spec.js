import {iter} from '../src';

describe('skip', () => {
  test('general', () => {
    expect(iter([1, 2, 3, 4, 5]).skip(2).toArray()).toEqual([3, 4, 5]);
  });
  test('default', () => {
    expect(iter([1, 2, 3, 4, 5]).skip().toArray()).toEqual([1, 2, 3, 4, 5]);
  });
  test('a lot', () => {
    expect(iter([1, 2, 3, 4, 5]).skip(7).toArray()).toEqual([]);
  });
  test('empty', () => {
    expect(iter([]).skip(2).toArray()).toEqual([]);
  });
});

describe('skipWhile', () => {
  test('general', () => {
    expect(iter([1, 2, 3, 4, 5]).skipWhile(x => x < 3).toArray()).toEqual([3, 4, 5]);
  });
  test('a lot', () => {
    expect(iter([1, 2, 3, 4, 5]).skipWhile(x => x < 7).toArray()).toEqual([]);
  });
  test('empty', () => {
    expect(iter([]).skipWhile(x => x < 3).toArray()).toEqual([]);
  });
});
