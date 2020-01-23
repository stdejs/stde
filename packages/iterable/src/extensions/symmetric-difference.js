import {IterableBase} from '../iterable-base.js';

class IterableSymmetricDifference extends IterableBase {
  constructor(iterable, ...iterables) {
    super();
    this._iterable = iterable;
    this._iterables = iterables;
  }

  *[Symbol.iterator]() {
    for (const item of this._iterable.distinct()) {
      if (this._iterables.filter(iterable => iterable.includes(item)).length % 2 == 0) {
        yield item;
      }
    }
  }
}

// TODO: rename to xor?
IterableBase.prototype.symmetricDifference = function (...iterables) {
  return new IterableSymmetricDifference(this, ...iterables);
};
