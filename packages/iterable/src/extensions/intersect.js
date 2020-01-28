import {IterableBase} from '../iterable-base.js';

class IterableIntersect extends IterableBase {
  constructor(iterable, iterables) {
    super();
    this._iterable = iterable.distinct();
    this._iterables = iterables;
  }

  *[Symbol.iterator]() {
    for (const item of this._iterable) {
      if (this._iterables.every(iterable => iterable.includes(item))) {
        yield item;
      }
    }
  }

  get equality() {
    return this._iterable.equality;
  }

  get order() {
    return this._iterable.order;
  }

  isDistinct() {
    return true;
  }
}

IterableBase.prototype.intersect = function (...iterables) {
  return new IterableIntersect(this, iterables);
};
