import {iter, asc, desc, compareNumbers} from '../src';

describe('orderBy', () => {
  test('general', () => {
    expect(iter(['32', 2, '121', 57, 4]).orderBy().toArray()).toEqual([2, 4, 57, '121', '32']);
  });
  test('ascending', () => {
    expect(iter(['32', 2, '121', 57, 4]).orderBy(asc()).toArray()).toEqual([2, 4, 57, '121', '32']);
  });
  test('descending', () => {
    expect(iter(['32', 2, '121', 57, 4]).orderBy(desc()).toArray()).toEqual(['32', '121', 57, 4, 2]);
  });
  test('compareNumbers bad', () => {
    expect(() => iter(['32', 2, '121', 57, 4]).orderBy(compareNumbers).toArray()).toThrow();
  });
  test('compareNumbers good', () => {
    expect(iter(['32', 2, '121', 57, 4]).orderBy(asc(Number)).toArray()).toEqual([2, 4, '32', 57, '121']);
  });
  test('compareNumbers good 2', () => {
    expect(iter(['32', 2, '121', 57, 4]).orderBy(asc(Number, compareNumbers)).toArray()).toEqual([2, 4, '32', 57, '121']);
  });

  const data = iter([
    { city: 'Amsterdam', country: 'NL', temp: 14 },
    { city: 'Athens', country: 'GR', temp: 22 },
    { city: 'Barcelona', country: 'ES', temp: 20 },
    { city: 'Madrid', country: 'ES', temp: 18 },
    { city: 'Rotterdam', country: 'NL', temp: 16 }
  ]);
  test('objects', () => {
    expect(data.orderBy(desc(x => x.temp)).toArray()).toEqual([
      { city: 'Athens', country: 'GR', temp: 22 },
      { city: 'Barcelona', country: 'ES', temp: 20 },
      { city: 'Madrid', country: 'ES', temp: 18 },
      { city: 'Rotterdam', country: 'NL', temp: 16 },
      { city: 'Amsterdam', country: 'NL', temp: 14 }
    ]);
  });
  test('many', () => {
    expect(data.orderBy(asc(x => x.country), desc(x => x.city)).toArray()).toEqual([
      { city: 'Madrid', country: 'ES', temp: 18 },
      { city: 'Barcelona', country: 'ES', temp: 20 },
      { city: 'Athens', country: 'GR', temp: 22 },
      { city: 'Rotterdam', country: 'NL', temp: 16 },
      { city: 'Amsterdam', country: 'NL', temp: 14 }
    ]);
  });
});
