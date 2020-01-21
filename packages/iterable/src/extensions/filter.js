import {IterableBase} from '../iterable-base.js';

class IterableFilter extends IterableBase {
  constructor(iterable, pred) {
    super();
    this._iterable = iterable;
    this._pred = pred;
  }

  *[Symbol.iterator]() {
    let i = 0;
    for (const item of this._iterable) {
      if (this._pred(item, i++, this._iterable)) {
        yield item;
      }
    }
  }
}

IterableBase.prototype.filter = function (pred) {
  return new IterableFilter(this, pred);
};

IterableBase.prototype.of = function (type) {
  return this.filter(item => item instanceof type);
};

IterableBase.prototype.except = function (...items) {
  const set = new Set(items);
  return this.filter(item => !set.has(item));
};

/**
 * Searches for the first match.
 *
 * @param      {Function}  pred          The predicate used to filter an iterable.
 * @returns    {object}    A first item of an iterable conforming to the predicate or undefined.
 */
IterableBase.prototype.find = function (pred) {
  // We define this alias just for compatibility with the Array type.
  return this.filter(pred).first(undefined);
};

IterableBase.prototype.slice = function (start = undefined, end = undefined) {
  if (end < 0) {
    end += this.length;
  }
  if (start !== undefined) {
    if (start < 0) {
      start += this.length;
    }
    return end !== undefined
      ? this.filter((item, i) => i >= start && i < end)
      : this.filter((item, i) => i >= start);
  }
  else {
    return end !== undefined
      ? this.filter((item, i) => i < end)
      : this;
  }
};
