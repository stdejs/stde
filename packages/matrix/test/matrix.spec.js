import {Matrix} from '../src';

describe('matrix', () => {
  test('general', () => {
    const m1 = Matrix.ofRows([[1, 2], [3, 4], [5, 6]]);
    const m2 = Matrix.ofRows([[1, 3], [2, 4]]);
    expect(m1.dot(m2).toArrayOfRows()).toEqual([[5, 11], [11, 25], [17, 39]]);
  });
});
