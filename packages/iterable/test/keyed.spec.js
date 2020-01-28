import {iter} from '../src';

describe('keyed', () => {
  test('general', () => {
    expect(iter([3, 2, 1, 1, 3, 4, '3', '1', 1, 5]).withEquality().keys().toArray()).toEqual([3, 2, 1, 1, 3, 4, '3', '1', 1, 5]);
  });

  const data = iter([
    { city: 'Amsterdam', country: 'NL', temp: 14 },
    { city: 'Athens', country: 'GR', temp: 22 },
    { city: 'Barcelona', country: 'ES', temp: 20 },
    { city: 'Madrid', country: 'ES', temp: 20 },
    { city: 'Rotterdam', country: 'NL', temp: 16 }
  ]);
  test('objects', () => {
    expect(data.withEquality(x => x.country).keys().toArray()).toEqual(['NL', 'GR', 'ES', 'ES', 'NL']);
  });
  test('objects 2', () => {
    expect(data.withEquality(x => [x.country, x.temp]).keys().toArray()).toEqual([['NL', 14], ['GR', 22], ['ES', 20], ['ES', 20], ['NL', 16]]);
  });
  test('objects 3', () => {
    expect(data.withEquality(x => x.country, x => x.temp).keys().toArray()).toEqual([['NL', 14], ['GR', 22], ['ES', 20], ['ES', 20], ['NL', 16]]);
  });
});
