import {IterableBase} from '../iterable-base.js';

class IterableAppend extends IterableBase {
  constructor(iterable, item) {
    super();
    this._iterable = iterable;
    this._item = item;
  }

  *[Symbol.iterator]() {
    yield* this._iterable;
    yield this._item;
  }
}

IterableBase.prototype.append = function (item) {
  return new IterableAppend(this, item);
};
