import {IterableBase} from '../iterable-base.js';

class IterablePrepend extends IterableBase {
  constructor(iterable, item) {
    super();
    this._iterable = iterable;
    this._item = item;
  }

  *[Symbol.iterator]() {
    yield this._item;
    yield* this._iterable;
  }
}

IterableBase.prototype.prepend = function (item) {
  return new IterablePrepend(this, item);
};
