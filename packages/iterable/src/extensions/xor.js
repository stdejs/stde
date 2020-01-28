import {IterableBase} from '../iterable-base.js';

class IterableXor extends IterableBase {
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

  get equality() {
    return this._iterable.equality;
  }
}

// TODO: keySelector, equator
IterableBase.prototype.xor = function (...iterables) {
  return new IterableXor(this, iterables);
};
