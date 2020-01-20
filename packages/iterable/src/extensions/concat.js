import {IterableBase} from '../iterable-base.js';

class IterableConcat extends IterableBase {
  constructor(...iterables) {
    super();
    this._iterables = iterables;
  }

  *[Symbol.iterator]() {
    for (const iterable of this._iterables) {
      yield* iterable;
    }
  }
}

IterableBase.prototype.concat = function (...iterables) {
  return new IterableConcat(this, ...iterables);
};
