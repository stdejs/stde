import {IterableBase} from '../iterable-base.js';

class IterableAppend extends IterableBase {
  constructor(iterable, items) {
    super();
    this._iterable = iterable;
    this._items = items;
  }

  *[Symbol.iterator]() {
    yield* this._iterable;
    yield* this._items;
  }
}

IterableBase.prototype.append = function (...items) {
  return new IterableAppend(this, items);
};
