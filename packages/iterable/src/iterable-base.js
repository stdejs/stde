import {eqs} from './equality.js';
import {orders} from './order.js';

/**
 * A base abstract class for all iterable classes.
 */
export class IterableBase {
  /**
   * Constructs a new instance.
   *
   * @returns    {Proxy}  Proxy of an iterable instance. The proxy handles index operation [i].
   */
  constructor() {
    if (new.target === IterableBase) {
      throw new TypeError('Cannot construct IterableBase instances directly');
    }
    // TODO: .withIndex()
    return new Proxy(this, indexAccessHandler);
  }

  withEquality(...equators) {
    this._equality = eqs(...equators);
    return this;
  }

  get equality() {
    return this._equality;
  }

  // withOrder(...orderings) {
  //   this._order = orders(...orderings);
  //   return this;
  // }

  // get order() {
  //   return this._order;
  // }

  /**
   * Get length.
   *
   * @returns {number} The length of the iterable.
   */
  get length() {
    // TODO: Performance
    return [...this].length;
  }

  /**
   * Checks whether an iterable is empty.
   *
   * @returns    {boolean}  true if an iterable is empty.
   */
  empty() {
    return this[Symbol.iterator]().next().done;
  }

  /**
   * Returns an array representation of an iterable.
   *
   * @returns    {Array}  Array representation of an iterable.
   */
  toArray() {
    return [...this];
  }

  toSet() {
    return new Set(this);
  }

  toMap() {
    return new Map(this);
  }

  /**
   * Returns an item of an iterable with a specified index.
   *
   * A negative index allows one to count items from end.
   * A last item has -1 index.
   *
   * @param      {number}  [index]  An item index.
   * @returns    {Array}  An item with a specified index.
   */
  get(index) {
    // TODO: Performance, lazy
    const array = [...this];
    const length = array.length;
    if (index < -length || index >= length) {
      throw new Error('Index out of bounds');
    }
    return array[(index % length + length) % length];
  }

  /**
   * Finds a first item of an iterable.
   *
   * If one needs to return undefined value by default instead of throwing an error,
   * then the defaultValue parameter should be specified explicitly.
   *
   * @param      {object}  [defaultValue]  The default value.
   * @returns    {object}  The first item of an iterable or a defaultValue.
   * @throws     Will throw an error if an item is not found and defaultValue is not specified.
   */
  first(defaultValue) {
    for (const item of this) {
      return item;
    }
    if (arguments.length) {
      return defaultValue;
    }
    throw new Error('Item not found');
  }

  /**
   * Ensures that an iterable contains a single value and returns it.
   *
   * If one needs to return undefined value by default instead of throwing an error,
   * then the defaultValue parameter should be specified explicitly.
   *
   * @param      {object}  [defaultValue]  The default value.
   * @returns    {object}  The first item of an iterable or a defaultValue.
   * @throws     Will throw an error if an item is not found and defaultValue is not specified, or multiple items are found.
   */
  single(defaultValue) {
    let result;
    let found = false;
    for (const item of this) {
      if (found) {
        throw new Error('More than one item found');
      }
      result = item;
      found = true;
    }
    if (found) {
      return result;
    }
    if (arguments.length) {
      return defaultValue;
    }
    throw new Error('Item not found');
  }

  /**
   * Finds a minimum item of an iterable.
   *
   * An empty iterable has undefined minimum value.
   *
   * @param      {Function}  [comparator=compare]  The function used to compare items.
   * @returns    {object}  A minimum item of an iterable.
   */
  min(...orderings) {
    const order = orders(...orderings);
    return _reduce2(this, (x, y) => order.compare(x, y) < 0 ? x : y, () => undefined);
    // return this.reduce((x, y) => order.less(x, y) ? x : order.less(y, x) ? y : x, undefined);
  }

  /**
   * Finds a maximum item of an iterable.
   *
   * An empty iterable has undefined maximum value.
   *
   * @param      {Function}  [comparator=compare]  The function used to compare items.
   * @returns    {object}  A maximum item of an iterable.
   */
  max(...orderings) {
    const order = orders(...orderings);
    return _reduce2(this, (x, y) => order.compare(x, y) > 0 ? x : y, () => undefined);
    // return this.reduce((x, y) => order.compare(x, y) > 0 ? x : y, () => undefined);
  }

  extent(...orderings) {
    // TODO: One pass
    return [this.min(...orderings), this.max(...orderings)];
    // const order = orders(...orderings);
    // return _reduce2(this, (x, y) => {
    //   order.compare(x, y) > 0 ? x : y;
    // }, () => [undefined, undefined]);
  }

  minIndex(...orderings) {
    let index = 0;
    const order = orders(...orderings);
    _reduce2(this, (x, y, i) => order.compare(x, y) < 0 ? x : (index = i, y), () => index = -1);
    return index;
    // return _reduce2(this, (x, y, i) => order.compare(x, y) < 0 ? x : (index = i, y), () => index = -1);
  }

  maxIndex(...orderings) {
    let index = 0;
    const order = orders(...orderings);
    _reduce2(this, (x, y, i) => order.compare(x, y) > 0 ? x : (index = i, y), () => index = -1);
    return index;
  }

  /**
   * Returns true if the predicate evaluates to true for all items.
   *
   * Returns true if an iterable is empty.
   * Returns false if the predicate evaluates to false for any item.
   * The evaluation is terminated after first non-matching item is found.
   *
   * @param      {Function}  pred    The predicate.
   * @returns    {boolean}   A function value.
   */
  every(pred) {
    return this.reject(pred).empty();
  }

  /**
   * Returns true if the predicate evaluates to true for any item.
   *
   * Returns false if an iterable is empty.
   * The evaluation is terminated after first matching item is found.
   *
   * @param      {Function}  pred    The predicate.
   * @returns    {boolean}   A function value.
   */
  some(pred) {
    return !this.filter(pred).empty();
  }

  findIndex(pred) {
    let i = 0;
    for (const item of this) {
      if (pred(item, i++, this)) {
        return i;
      }
    }
    return -1;
  }

  indexOf(item, fromIndex = 0) {
    return this.skip(fromIndex).findIndex(it => it === item);
  }

  // Just for compatibility with arrays
  // Arrays has a different interpretation of negative fromIndex
  // TODO: contains, has?
  includes(item, fromIndex = 0) {
    return this.indexOf(item, fromIndex) !== -1;
  }

  /**
   * Reduces an iterable using an operation.
   *
   * @param      {Function} operation         The operation.
   * @param      {object}   [init=undefined]  The initial value.
   * @returns    {object}   A reduction result.
   */
  reduce(operation, init = undefined) {
    if (arguments.length >= 2) {
      return _reduce(this, operation, init, 0);
    }
    else {
      return _reduce2(this, operation, () => {
        throw new TypeError('Iterable is empty and init is not defined');
      });
    }
  }

  // TODO: Is it an alias for compatibility with arrays?
  reduceRight(operation, init = undefined) {
    return this.reverse().reduce(operation, init);
  }

  /**
   * Concantenates an iterable of strings using a separator.
   *
   * @param      {string}  [sep=',']  The separator.
   * @returns    {string}  A concatenated value.
   */
  join(sep = ',') {
    return _reduce2(this, (x, y) => x + sep + y, () => '');
  }

  sum() {
    return this.reduce(this, (x, y) => x + y, 0);
  }

  product() {
    return this.reduce(this, (x, y) => x * y, 1);
  }

  /**
   * Calculates the average of items.
   *
   * @returns    {number}  Average of items or NaN for empty iterable.
   */
  mean() {
    // There are different kinds of mean: arithmetic, geometric, harmonic
    // Is it better to use avg?
    // However in stats mean = avg
    return this.sum() / this.length;
  }

  union(...iterables) {
    return this.concat(...iterables).distinct();
  }

  // equals(...iterables) {
  //   // TODO: Performance
  //   const n = this.length;
  //   if (!iterables.every(iterable => iterable.length === n)) {
  //     return false;
  //   }
  // }

  unzip() {
    const iterator = this[Symbol.iterator]();
    const head = iterator.next();
    if (head.done || head.value.length === 0) {
      return [];
    }
    const result = new Array(head.value.length);
    for (let i = 0; i < head.value.length; i++) {
      result[i] = this.map(item => item[i]);
    }
    return result;
  }

  forEach(action) {
    let i = 0;
    for (const item of this) {
      action(item, i++, this);
    }
  }

  // withUnique(keySelector, equator) {

  // }

  // TODO:
  // join
  // groupJoin
  // sequenceEqual, equal, equals
  // order indices?
  //
  // except, ... by custom equality operator? No, filter is enough
  //
  // Lodash:
  // compact
  // sample, sampleSize
  // shuffle
  //
  // js:
  // findIndex
  //
  // fromIndex? last? for some methods
  // equators for some methods
  // auto-cast array, ... arguments to iterable?
  //
  // d3js:
  // median
  // cumsum
  // quantile, variance, deviation - distribution required?
  // quickselect
  // rollup (is it groupBy?)
  // count (non empty)
  // cross (is it join?)
  // pairs (may be useful for segments)
  // shuffle
  // ticks (similar to range, but different)
  // range (optional start?)
  // bin (related to Lodash chunk)
  //
  // TODO:
  // Value selectors for sum, product, ...? Or use map?
}

/**
 * @ignore
 */
function _reduce(iterable, operation, acc, i) {
  for (const item of iterable) {
    acc = operation(acc, item, i++, iterable);
  }
  return acc;
}

/**
 * @ignore
 */
function _reduce2(iterable, operation, notFoundAction) {
  const iterator = iterable[Symbol.iterator]();
  const item = iterator.next();
  if (item.done) {
    return notFoundAction();
  }
  return _reduce(iterator, operation, item.value, 1);
}

const indexAccessHandler = {
  get: function (target, name) {
    const value = target[name];
    if (value !== undefined) {
      return value;
    }
    if (typeof name === 'string' && /^-?\d+$/.test(name)) {
      return target.get(Number.parseInt(name));
    }
  },
  set: function (target, name, value) {
    if (typeof name === 'string' && /^-?\d+$/.test(name)) {
      throw new Error(`${target.constructor.name} is a read-only view, unable to set property ${name}`);
    }
    target[name] = value;
    return true;
  },
  deleteProperty(target, prop) {
    throw new Error(`${target.constructor.name} is a read-only view, unable to delete property's ${name} value`);
  }
};
