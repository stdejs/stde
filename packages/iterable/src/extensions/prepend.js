import {IterableBase} from '../iterable-base.js';

class IterablePrepend extends IterableBase {
  constructor(iterable, items) {
    super();
    this._iterable = iterable;
    this._items = items;
  }

  *[Symbol.iterator]() {
    yield* this._items;
    yield* this._iterable;
  }

  get equality() {
    return this._iterable.equality;
  }
}

IterableBase.prototype.prepend = function (...items) {
  return new IterablePrepend(this, items);
};
