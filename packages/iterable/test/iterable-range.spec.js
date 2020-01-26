import {range} from '../src';
import {ArrayIterable} from '../src';

describe('range', () => {
  test('increasing', () => {
    expect(range(1, 5).toArray()).toEqual([1, 2, 3, 4]);
  });
  test('decreasing', () => {
    expect(range(5, 1).toArray()).toEqual([5, 4, 3, 2]);
  });
  test('increasing step', () => {
    expect(range(1, 5, 2).toArray()).toEqual([1, 3]);
  });
  test('decreasing step', () => {
    expect(range(5, 1, -3).toArray()).toEqual([5, 2]);
  });
  test('big increasing step', () => {
    expect(range(1, 5, 7).toArray()).toEqual([1]);
  });
  test('big decreasing step', () => {
    expect(range(5, 1, -7).toArray()).toEqual([5]);
  });
  test('singleton', () => {
    expect(range(1, 2).toArray()).toEqual([1]);
  });
  test('singleton decreasing', () => {
    expect(range(2, 1).toArray()).toEqual([2]);
  });
  test('empty', () => {
    expect(range(1, 1).toArray()).toEqual([]);
  });
  test('zero step', () => {
    expect(() => range(1, 5, 0).toArray()).toThrow();
  });
  test('negative length', () => {
    expect(range(5, 1, 1).toArray()).toEqual([]);
  });
  test('reverse', () => {
    expect(range(1, 5).reverse().toArray()).toEqual([4, 3, 2, 1]);
  });
  test('reverse empty', () => {
    expect(range(1, 1).reverse().toArray()).toEqual([]);
  });
  test('skip empty', () => {
    expect(range(1, 1).skip(2).toArray()).toEqual([]);
  });
  test('take empty', () => {
    expect(range(1, 1).take(2).toArray()).toEqual([]);
  });
});

// describe('array', () => {
//   // test('general', () => {
//   //   expect(new ArrayIterable([1, 2, 3, 4, 5]).toArray()).toEqual([1, 2, 3, 4, 5]);
//   // });
//   // test('reverse', () => {
//   //   expect(new ArrayIterable([1, 2, 3, 4, 5]).reverse().toArray()).toEqual([5, 4, 3, 2, 1]);
//   // });
//   test('reverse empty', () => {
//     expect(new ArrayIterable([]).reverse().toArray()).toEqual([]);
//   });
//   // test('skip', () => {
//   //   expect(new ArrayIterable([1, 2, 3, 4, 5]).skip(2).toArray()).toEqual([3, 4, 5]);
//   // });
//   // test('skip empty', () => {
//   //   expect(new ArrayIterable([]).skip(2).toArray()).toEqual([]);
//   // });
//   // test('take', () => {
//   //   expect(new ArrayIterable([1, 2, 3, 4, 5]).take(2).toArray()).toEqual([1, 2]);
//   // });
//   // test('take empty', () => {
//   //   expect(new ArrayIterable([]).take(2).toArray()).toEqual([]);
//   // });
//   // test('skip take', () => {
//   //   expect(new ArrayIterable([1, 2, 3, 4, 5]).skip(2).take(2).toArray()).toEqual([3, 4]);
//   // });
//   // test('take skip', () => {
//   //   expect(new ArrayIterable([1, 2, 3, 4, 5]).take(2).skip(1).toArray()).toEqual([2]);
//   // });
//   // test('skip reverse', () => {
//   //   expect(new ArrayIterable([1, 2, 3, 4, 5]).skip(2).reverse().toArray()).toEqual([5, 4, 3]);
//   // });
//   // test('take reverse', () => {
//   //   expect(new ArrayIterable([1, 2, 3, 4, 5]).take(3).reverse().toArray()).toEqual([3, 2, 1]);
//   // });
//   // test('reverse reverse', () => {
//   //   expect(new ArrayIterable([1, 2, 3, 4, 5]).reverse().reverse().toArray()).toEqual([1, 2, 3, 4, 5]);
//   // });
//   // test('skip reverse take', () => {
//   //   expect(new ArrayIterable([1, 2, 3, 4, 5]).skip(2).reverse().take(2).toArray()).toEqual([5, 4]);
//   // });
// });
