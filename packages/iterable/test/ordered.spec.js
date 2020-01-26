import {iter} from '../src';

describe('distinct', () => {
  test('general', () => {
    expect(iter([3, 2, 1, 1, 3, 4, 1, 5]).orderBy().distinct().toArray()).toEqual([1, 2, 3, 4, 5]);
  });
  test('withOrder', () => {
    expect(iter([1, 1, 2, 3, 3, 3, 4, 5, 5]).withOrder().distinct().toArray()).toEqual([1, 2, 3, 4, 5]);
  });
  test('sortedIndex', () => {
    expect(iter([1, 1, 2, 3, 3, 3, 4, 5, 5]).withOrder().sortedIndex(3)).toBe(3);
  });
  test('sortedIndex low', () => {
    expect(iter([1, 1, 2, 3, 3, 3, 4, 5, 5]).withOrder().sortedIndex(-1)).toBe(0);
  });
  test('sortedIndex high', () => {
    expect(iter([1, 1, 2, 3, 3, 3, 4, 5, 5]).withOrder().sortedIndex(7)).toBe(9);
  });
  test('sortedIndexRight', () => {
    expect(iter([1, 1, 2, 3, 3, 3, 4, 5, 5]).withOrder().sortedIndexRight(3)).toBe(6);
  });
  test('sortedIndexRight low', () => {
    expect(iter([1, 1, 2, 3, 3, 3, 4, 5, 5]).withOrder().sortedIndexRight(-1)).toBe(0);
  });
  test('sortedIndexRight high', () => {
    expect(iter([1, 1, 2, 3, 3, 3, 4, 5, 5]).withOrder().sortedIndexRight(7)).toBe(9);
  });
  test('indexOf', () => {
    expect(iter([1, 1, 2, 3, 3, 3, 4, 5, 5]).withOrder().indexOf(3)).toBe(3);
  });
  test('indexOf none', () => {
    expect(iter([1, 1, 2, 3, 3, 3, 4, 5, 5]).withOrder().indexOf(7)).toBe(-1);
  });

  // const data = iter([
  //   { city: 'Amsterdam', country: 'NL', temp: 14 },
  //   { city: 'Athens', country: 'GR', temp: 22 },
  //   { city: 'Barcelona', country: 'ES', temp: 20 },
  //   { city: 'Madrid', country: 'ES', temp: 20 },
  //   { city: 'Rotterdam', country: 'NL', temp: 16 }
  // ]);
  // test('objects', () => {
  //   expect(data.distinct(x => x.country).toArray()).toEqual([
  //     { city: 'Amsterdam', country: 'NL', temp: 14 },
  //     { city: 'Athens', country: 'GR', temp: 22 },
  //     { city: 'Barcelona', country: 'ES', temp: 20 }
  //   ]);
  // });
  // test('objects 2', () => {
  //   expect(data.distinct(x => [x.country, x.temp]).toArray()).toEqual([
  //     { city: 'Amsterdam', country: 'NL', temp: 14 },
  //     { city: 'Athens', country: 'GR', temp: 22 },
  //     { city: 'Barcelona', country: 'ES', temp: 20 },
  //     { city: 'Rotterdam', country: 'NL', temp: 16 }
  //   ]);
  // });
});

describe('isDistinct', () => {
  test('general', () => {
    expect(iter([3, 2, 1, 1, 3, 4, 1, 5]).orderBy().isDistinct()).toBe(false);
  });
  test('withOrder', () => {
    expect(iter([1, 1, 2, 3, 3, 3, 4, 5, 5]).withOrder().isDistinct()).toBe(false);
  });
  test('general true', () => {
    expect(iter([3, 2, 1, 4, 5]).orderBy().isDistinct()).toBe(true);
  });
  test('withOrder true', () => {
    expect(iter([1, 2, 3, 4, 5]).withOrder().isDistinct()).toBe(true);
  });

  // const data = iter([
  //   { city: 'Amsterdam', country: 'NL', temp: 14 },
  //   { city: 'Athens', country: 'GR', temp: 22 },
  //   { city: 'Barcelona', country: 'ES', temp: 20 },
  //   { city: 'Madrid', country: 'ES', temp: 20 },
  //   { city: 'Rotterdam', country: 'NL', temp: 16 }
  // ]);
  // test('objects', () => {
  //   expect(data.isDistinct(x => x.country)).toBe(false);
  // });
  // test('objects 2', () => {
  //   expect(data.isDistinct(x => [x.country, x.temp])).toBe(false);
  // });
  // test('objects 3', () => {
  //   expect(data.isDistinct(x => x.city)).toBe(true);
  // });
});
