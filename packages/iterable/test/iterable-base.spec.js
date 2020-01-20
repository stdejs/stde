import {IterableBase} from '../src';
import {iter} from '../src';

describe('general', () => {
  test('abstract IterableBase', () => {
    expect(() => new IterableBase()).toThrow();
  });
});

describe('array index access', () => {
  test('get', () => {
    expect(iter([1, 2, 3, 4, 5])[3]).toBe(4);
  });
  test('get last', () => {
    expect(iter([1, 2, 3, 4, 5])[-1]).toBe(5);
  });
  test('get out of bounds', () => {
    expect(() => iter([1, 2, 3, 4, 5])[7]).toThrow();
  });
  test('get out of bounds 2', () => {
    expect(() => iter([1, 2, 3, 4, 5])[-7]).toThrow();
  });
  test('set', () => {
    expect(() => iter([1, 2, 3, 4, 5])[3] = 1).toThrow();
  });
});

describe('length', () => {
  test('general', () => {
    expect(iter([1, 2, 3, 4, 5])).toHaveLength(5);
  });
  test('empty', () => {
    expect(iter([])).toHaveLength(0);
  });
});

describe('empty', () => {
  test('general', () => {
    expect(iter([1, 2, 3, 4, 5]).empty()).toBe(false);
  });
  test('empty', () => {
    expect(iter([]).empty()).toBe(true);
  });
});

describe('reduce', () => {
  test('general', () => {
    expect(iter([1, 2, 3, 4, 5]).reduce((x, y) => x + y)).toBe(15);
  });
  test('init', () => {
    expect(iter([1, 2, 3, 4, 5]).reduce((x, y) => x + y, 2)).toBe(17);
  });
  test('empty and init', () => {
    expect(iter([]).reduce((x, y) => x + y, 2)).toBe(2);
  });
  test('empty', () => {
    expect(() => iter([]).reduce((x, y) => x + y)).toThrow();
  });
  test('general index', () => {
    expect(iter([[], 2, 3, 4, 5]).reduce((x, y, i) => x.concat([i]))).toEqual([1, 2, 3, 4]);
  });
  test('init index', () => {
    expect(iter([1, 2, 3, 4, 5]).reduce((x, y, i) => x.concat([i]), [])).toEqual([0, 1, 2, 3, 4]);
  });
  test('empty and init index', () => {
    expect(iter([]).reduce((x, y, i) => x.concat([i]), [])).toEqual([]);
  });
});

describe('join', () => {
  test('general', () => {
    expect(iter([1, 2, 3, 4, 5]).join()).toBe('1,2,3,4,5');
  });
  test('separator', () => {
    expect(iter([1, 2, 3, 4, 5]).join(' ')).toBe('1 2 3 4 5');
  });
  test('empty', () => {
    expect(iter([]).join()).toBe('');
  });
  test('empty separator', () => {
    expect(iter([]).join(' ')).toBe('');
  });
});

// describe('sum', () => {
//   test('Sum of numbers is a number', () => {
//     expect(iter([1, 2, 3, 4, 5]).sum()).toBe(15);
//   });
//   test('Sum of an empty iterable is 0', () => {
//     expect(iter([]).sum()).toBe(0);
//   });
//   test('Sum of an iterable containing Infinity is Infinity', () => {
//     expect(iter([1, 2, Infinity, 3]).sum()).toBe(Infinity);
//   });
//   test('Sum of an iterable containing NaN is NaN', () => {
//     expect(iter([1, 2, NaN, 3]).sum()).toBe(NaN);
//   });
//   test('null is interpreted as 0 during summation', () => {
//     expect(iter([1, 2, null, 3]).sum()).toBe(6);
//   });
//   test('Sum of an iterable containing a string is NaN', () => {
//     expect(iter([1, 2, 'str', 3]).sum()).toBe(NaN);
//   });
// });

// describe('product', () => {
//   test('Product of numbers is a number', () => {
//     expect(iter([1, 2, 3, 4, 5]).product()).toBe(120);
//   });
//   test('Product of an empty iterable is 1', () => {
//     expect(iter([]).product()).toBe(1);
//   });
//   test('Product of an iterable containing Infinity is Infinity', () => {
//     expect(iter([1, 2, Infinity, 3]).product()).toBe(Infinity);
//   });
//   test('Product of an iterable containing NaN is NaN', () => {
//     expect(iter([1, 2, NaN, 3]).product()).toBe(NaN);
//   });
//   test('null is interpreted as 0 during multiplication', () => {
//     expect(iter([1, 2, null, 3]).product()).toBe(0);
//   });
//   test('Product of an iterable containing a string is NaN', () => {
//     expect(iter([1, 2, 'str', 3]).product()).toBe(NaN);
//   });
// });

describe('find', () => {
  test('Find returns an item that matches the predicate', () => {
    expect(iter([1, 2, 3, 4, 5]).find(x => x === 3)).toBe(3);
  });
  test('Find returns undefined if an item matching the predicate was not found', () => {
    expect(iter([1, 2, 3, 4, 5]).find(x => x >= 7)).toBe(undefined);
  });
  test('Find returns a first item matching the predicate if multiple items were found', () => {
    expect(iter([1, 2, 3, 4, 5]).find(x => x >= 3)).toBe(3);
  });
});

describe('first', () => {
  test('general', () => {
    expect(iter([1, 2, 3, 4, 5]).first()).toBe(1);
  });
  test('general default', () => {
    expect(iter([1, 2, 3, 4, 5]).first(5)).toBe(1);
  });
  test('empty', () => {
    expect(() => iter([]).first()).toThrow();
  });
  test('default', () => {
    expect(iter([]).first(5)).toBe(5);
  });
});

describe('single', () => {
  test('general', () => {
    expect(iter([1]).single()).toBe(1);
  });
  test('general default', () => {
    expect(iter([1]).single(5)).toBe(1);
  });
  test('empty', () => {
    expect(() => iter([]).single()).toThrow();
  });
  test('default', () => {
    expect(iter([]).single(5)).toBe(5);
  });
  test('many', () => {
    expect(() => iter([1, 2]).single()).toThrow();
  });
  test('many default', () => {
    expect(() => iter([1, 2]).single(5)).toThrow();
  });
});

describe('map', () => {
  test('general', () => {
    expect(iter([1, 2, 3, 4, 5]).map(x => x * x).toArray()).toEqual([1, 4, 9, 16, 25]);
  });
});

describe('all', () => {
  test('true', () => {
    expect(iter([1, 2, 3, 4, 5]).all(x => x > 0)).toBe(true);
  });
  test('false', () => {
    expect(iter([1, 2, 3, 4, 5]).all(x => x > 2)).toBe(false);
  });
  test('empty', () => {
    expect(iter([]).all(x => x > 0)).toBe(true);
  });
  test('all() checks items sequentially and stops evaluation after an item not matching the predicate is found', () => {
    expect(iter([() => 1, () => 2, () => {
      throw new Error();
    }, 3]).all(x => x() === 1)).toBe(false);
  });
});

describe('any', () => {
  test('true', () => {
    expect(iter([1, 2, 3, 4, 5]).any(x => x > 2)).toBe(true);
  });
  test('false', () => {
    expect(iter([1, 2, 3, 4, 5]).any(x => x > 7)).toBe(false);
  });
  test('empty', () => {
    expect(iter([]).any(x => x > 0)).toBe(false);
  });
  test('any() checks items sequentially and stops evaluation after an item matching the predicate is found', () => {
    expect(iter([() => 1, () => 2, () => {
      throw new Error();
    }, 3]).any(x => x() !== 1)).toBe(true);
  });
});

describe('min', () => {
  test('general', () => {
    expect(iter([3, 2, 1, 4, 5]).min()).toBe(1);
  });
  test('first', () => {
    expect(iter([1, 2, 3, 4, 5]).min()).toBe(1);
  });
  test('last', () => {
    expect(iter([5, 2, 3, 4, 1]).min()).toBe(1);
  });
  test('single', () => {
    expect(iter([1]).min()).toBe(1);
  });
  test('empty', () => {
    expect(iter([]).min()).toBe(undefined);
  });
  test('custom comparator', () => {
    expect(iter([3, 2, 1, 4, 5]).min((x, y) => y - x)).toBe(5);
  });
  test('strings', () => {
    expect(iter(['foo', 'bar', 'baz']).min()).toBe('bar');
  });
  test('not comparable', () => {
    expect(() => iter([1, 2, 3, undefined, 4, 5]).min()).toThrow();
  });
});

describe('max', () => {
  test('general', () => {
    expect(iter([3, 2, 1, 4, 5]).max()).toBe(5);
  });
  test('first', () => {
    expect(iter([5, 2, 3, 4, 1]).max()).toBe(5);
  });
  test('last', () => {
    expect(iter([1, 2, 3, 4, 5]).max()).toBe(5);
  });
  test('single', () => {
    expect(iter([1]).max()).toBe(1);
  });
  test('empty', () => {
    expect(iter([]).max()).toBe(undefined);
  });
  test('custom comparator', () => {
    expect(iter([3, 2, 1, 4, 5]).max((x, y) => y - x)).toBe(1);
  });
  test('strings', () => {
    expect(iter(['foo', 'bar', 'baz']).max()).toBe('foo');
  });
  test('not comparable', () => {
    expect(() => iter([1, 2, 3, undefined, 4, 5]).max()).toThrow();
  });
});