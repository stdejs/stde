import {IterableBase} from '../iterable-base.js';

class IterableConcat extends IterableBase {
  constructor(iterable, iterables) {
    super();
    this._iterable = iterable;
    this._iterables = iterables;
  }

  *[Symbol.iterator]() {
    yield* this._iterable;
    for (const iterable of this._iterables) {
      yield* iterable;
    }
  }

  get equality() {
    return this._iterable.equality;
  }
}

IterableBase.prototype.concat = function (...iterables) {
  return new IterableConcat(this, iterables);
};
