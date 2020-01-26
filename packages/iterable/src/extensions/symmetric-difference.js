import {IterableBase} from '../iterable-base.js';

class IterableSymmetricDifference extends IterableBase {
  constructor(iterable, iterables) {
    super();
    this._iterable = iterable.concat(...iterables);
  }

  *[Symbol.iterator]() {
    // TODO: Performance
    for (const item of this._iterable) {
      if (this._iterable.filter(it => it === item).length % 2) {
        yield item;
      }
    }
  }
}

// TODO: rename to xor?
// TODO: keySelector, equator
IterableBase.prototype.symmetricDifference = function (...iterables) {
  return new IterableSymmetricDifference(this, iterables);
};
