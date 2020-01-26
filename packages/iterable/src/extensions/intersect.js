import {IterableBase} from '../iterable-base.js';

class IterableIntersect extends IterableBase {
  constructor(iterable, iterables) {
    super();
    this._iterable = iterable;
    this._iterables = iterables;
  }

  *[Symbol.iterator]() {
    for (const item of this._iterable.distinct()) {
      if (this._iterables.every(iterable => iterable.includes(item))) {
        yield item;
      }
    }
  }
}

IterableBase.prototype.intersect = function (...iterables) {
  return new IterableIntersect(this, iterables);
};
