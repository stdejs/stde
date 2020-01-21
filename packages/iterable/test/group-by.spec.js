import {iter} from '../src';

describe('groupBy', () => {
  const data = iter([
    { city: 'Amsterdam', country: 'NL', temp: 14 },
    { city: 'Athens', country: 'GR', temp: 22 },
    { city: 'Barcelona', country: 'ES', temp: 20 },
    { city: 'Madrid', country: 'ES', temp: 18 },
    { city: 'Rotterdam', country: 'NL', temp: 16 }
  ]);
  test('general', () => {
    expect(data.groupBy(x => x.country).toArray()).toEqual([
      ['NL', [
        { city: 'Amsterdam', country: 'NL', temp: 14 },
        { city: 'Rotterdam', country: 'NL', temp: 16 }]],
      ['GR', [
        { city: 'Athens', country: 'GR', temp: 22 }]],
      ['ES', [
        { city: 'Barcelona', country: 'ES', temp: 20 },
        { city: 'Madrid', country: 'ES', temp: 18 }]]
    ]);
  });
  test('result selector', () => {
    expect(data.groupBy(x => x.country, (country, cities) => cities.map(x => x.city).toArray()).toArray()).toEqual([
      ['NL', ['Amsterdam', 'Rotterdam']],
      ['GR', ['Athens']],
      ['ES', ['Barcelona', 'Madrid']]
    ]);
  });
  test('result selector 2', () => {
    expect(data.groupBy(x => x.country, (country, cities) => ({
      cities: cities.map(x => x.city).toArray(),
      count: cities.length,
      avgTemp: cities.map(x => x.temp).reduce((x, y) => x + y, 0) / cities.length
    })).toArray()).toEqual([
      ['NL', { cities: ['Amsterdam', 'Rotterdam'], count: 2, avgTemp: 15 }],
      ['GR', { cities: ['Athens'], count: 1, avgTemp: 22 }],
      ['ES', { cities: ['Barcelona', 'Madrid'], count: 2, avgTemp: 19 }]
    ]);
  });
});
