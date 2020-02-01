import {iter} from '../src';

describe('ordered', () => {
  test('general', () => {
    expect(iter([3, 2, 1, 1, 3, 4, 1, 5]).orderBy().distinct().toArray()).toEqual([1, 2, 3, 4, 5]);
  });
  test('withOrder', () => {
    expect(iter([1, 1, 2, 3, 3, 3, 4, 5, 5]).withOrder().distinct().toArray()).toEqual([1, 2, 3, 4, 5]);
  });
  test('sortedIndexOf', () => {
    expect(iter([1, 1, 2, 3, 3, 3, 4, 5, 5]).withOrder().sortedIndexOf(3)).toBe(3);
  });
  test('sortedIndexOf low', () => {
    expect(iter([1, 1, 2, 3, 3, 3, 4, 5, 5]).withOrder().sortedIndexOf(-1)).toBe(0);
  });
  test('sortedIndexOf high', () => {
    expect(iter([1, 1, 2, 3, 3, 3, 4, 5, 5]).withOrder().sortedIndexOf(7)).toBe(9);
  });
  test('sortedRightIndexOf', () => {
    expect(iter([1, 1, 2, 3, 3, 3, 4, 5, 5]).withOrder().sortedRightIndexOf(3)).toBe(6);
  });
  test('sortedRightIndexOf low', () => {
    expect(iter([1, 1, 2, 3, 3, 3, 4, 5, 5]).withOrder().sortedRightIndexOf(-1)).toBe(0);
  });
  test('sortedRightIndexOf high', () => {
    expect(iter([1, 1, 2, 3, 3, 3, 4, 5, 5]).withOrder().sortedRightIndexOf(7)).toBe(9);
  });
  test('indexOf', () => {
    expect(iter([1, 1, 2, 3, 3, 3, 4, 5, 5]).withOrder().indexOf(3)).toBe(3);
  });
  test('indexOf none', () => {
    expect(iter([1, 1, 2, 3, 3, 3, 4, 5, 5]).withOrder().indexOf(7)).toBe(-1);
  });

  test('sortedIndexOf skip', () => {
    expect(iter([1, 1, 2, 3, 3, 3, 4, 5, 5]).withOrder().skip(4).sortedIndexOf(3)).toBe(0);
  });
  test('sortedIndexOf take', () => {
    expect(iter([1, 1, 2, 3, 3, 3, 4, 5, 5]).withOrder().take(5).sortedIndexOf(4)).toBe(5);
  });
  test('sortedIndexOf except', () => {
    expect(iter([1, 1, 2, 3, 3, 3, 4, 5, 5]).withOrder().except(3).sortedIndexOf(4)).toBe(3);
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
