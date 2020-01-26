import {IterableBase} from '../iterable-base.js';

class IterableDifference extends IterableBase {
  constructor(iterable, iterables) {
    super();
    this._iterable = iterable;
    this._iterables = iterables;
  }

  *[Symbol.iterator]() {
    for (const item of this._iterable.distinct()) {
      if (!this._iterables.some(iterable => iterable.includes(item))) {
        yield item;
      }
    }
  }
}

IterableBase.prototype.difference = function (...iterables) {
  return new IterableDifference(this, iterables);
};
