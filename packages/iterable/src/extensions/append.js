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

  get length() {
    return this._iterable.length + this._items.length;
  }

  _get(index) {
    const length = this._iterable.length;
    return index < length
      ? this._iterable.get(index)
      : this._items[index - length];
  }

  get equality() {
    return this._iterable.equality;
  }
}

IterableBase.prototype.append = function (...items) {
  return new IterableAppend(this, items);
};
