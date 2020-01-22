import {iter} from '../src';

describe('distinct', () => {
  test('general', () => {
    expect(iter([3, 2, 1, 1, 3, 4, '3', '1', 1, 5]).distinct().toArray()).toEqual([3, 2, 1, 4, '3', '1', 5]);
  });

  const data = iter([
    { city: 'Amsterdam', country: 'NL', temp: 14 },
    { city: 'Athens', country: 'GR', temp: 22 },
    { city: 'Barcelona', country: 'ES', temp: 20 },
    { city: 'Madrid', country: 'ES', temp: 20 },
    { city: 'Rotterdam', country: 'NL', temp: 16 }
  ]);
  test('objects', () => {
    expect(data.distinct(x => x.country).toArray()).toEqual([
      { city: 'Amsterdam', country: 'NL', temp: 14 },
      { city: 'Athens', country: 'GR', temp: 22 },
      { city: 'Barcelona', country: 'ES', temp: 20 }
    ]);
  });
  test('objects 2', () => {
    expect(data.distinct(x => [x.country, x.temp]).toArray()).toEqual([
      { city: 'Amsterdam', country: 'NL', temp: 14 },
      { city: 'Athens', country: 'GR', temp: 22 },
      { city: 'Barcelona', country: 'ES', temp: 20 },
      { city: 'Rotterdam', country: 'NL', temp: 16 }
    ]);
  });
});

describe('isDistinct', () => {
  test('general', () => {
    expect(iter([3, 2, 1, 1, 3, 4, '3', '1', 1, 5]).isDistinct()).toBe(false);
  });
  test('general 2', () => {
    expect(iter([3, 2, 1, 4, '3', '1', 5]).isDistinct()).toBe(true);
  });

  const data = iter([
    { city: 'Amsterdam', country: 'NL', temp: 14 },
    { city: 'Athens', country: 'GR', temp: 22 },
    { city: 'Barcelona', country: 'ES', temp: 20 },
    { city: 'Madrid', country: 'ES', temp: 20 },
    { city: 'Rotterdam', country: 'NL', temp: 16 }
  ]);
  test('objects', () => {
    expect(data.isDistinct(x => x.country)).toBe(false);
  });
  test('objects 2', () => {
    expect(data.isDistinct(x => [x.country, x.temp])).toBe(false);
  });
  test('objects 3', () => {
    expect(data.isDistinct(x => x.city)).toBe(true);
  });
});
