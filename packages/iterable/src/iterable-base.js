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
    return new Proxy(this, {
      get: function (target, name) {
        if (typeof name === 'string' && /^-?\d+$/.test(name)) {
          return target.get(Number.parseInt(name));
        }
        return target[name];
      },
      set: function (target, name, value) {
        if (typeof name === 'string' && /^-?\d+$/.test(name)) {
          throw new Error(`${target.constructor.name} is a read-only view`);
        }
        target[name] = value;
        return true;
      }
    });
  }

  /**
   * Get length.
   *
   * @returns {number} The length of the iterable.
   */
  get length() {
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
   * @param      {object}  [comparator=undefined]  The function used to compare items.
   * @returns    {object}  A minimum item of an iterable.
   */
  min(comparator = undefined) {
    let operation;
    if (comparator == null) {
      operation = (x, y) => {
        if (x <= y) {
          return x;
        }
        if (x > y) {
          return y;
        }
        throw new Error(`Items not comparable: ${x} and ${y}`);
      };
    }
    else {
      operation = (x, y) => comparator(x, y) <= 0 ? x : y;
    }
    return _reduce2(this, operation, () => undefined);
  }

  max(comparator = undefined) {
    let operation;
    if (comparator == null) {
      operation = (x, y) => {
        if (x <= y) {
          return y;
        }
        if (x > y) {
          return x;
        }
        throw new Error(`Items not comparable: ${x} and ${y}`);
      };
    }
    else {
      operation = (x, y) => comparator(x, y) <= 0 ? y : x;
    }
    return _reduce2(this, operation, () => undefined);
  }

  indexOfMax() {
    // TODO: What if this contains -Infinity?
    let max = -Infinity;
    let index = -1;
    let i = 0;
    for (const item of this) {
      if (item > max) {
        max = item;
        index = i;
      }
      i++;
    }
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
  all(pred) {
    let i = 0;
    for (const item of this) {
      if (!pred(item, i++, this)) {
        return false;
      }
    }
    return true;
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
  any(pred) {
    let i = 0;
    for (const item of this) {
      if (pred(item, i++, this)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Reduces an iterable using an operation.
   *
   * @param      {Function} operation         The operation.
   * @param      {object}   [init=undefined]  The initial value.
   * @returns    {object}   A reduction result.
   */
  reduce(operation, init = undefined) {
    // TODO: It's said that Array.prototype.reduce should skip empty items,
    // but it seems that Chrome implementation doesn't skip it
    // So we don't skip it either
    if (arguments.length >= 2) {
      return _reduce(this, operation, init, 0);
    }
    else {
      return _reduce2(this, operation, () => {
        throw new TypeError('Iterable is empty and init is not defined');
      });
    }
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
  let acc;
  let found = false;
  const iterator = iterable[Symbol.iterator]();
  for (const item of iterator) {
    acc = item;
    found = true;
    break;
  }
  if (!found) {
    return notFoundAction();
  }
  return _reduce(iterator, operation, acc, 1);
}