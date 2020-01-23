import {iter} from '../src';

describe('intersect', () => {
  test('general', () => {
    expect(iter(['32', 2, '121', 57, 4]).intersect([1, 4, 2, 32]).toArray()).toEqual([2, 4]);
  });
});
