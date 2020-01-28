import {IterableBase} from '../iterable-base.js';

class IterablePermute extends IterableBase {
  constructor(iterable, indices) {
    super();
    this._iterable = iterable;
    this._indices = indices;
  }

  *[Symbol.iterator]() {
    // TODO: Lazy implementation?
    const items = [...this._iterable];
    for (let i = 0; i < items.length; i++) {
      yield items[this._indices[i]];
    }
  }

  get equality() {
    return this._iterable.equality;
  }

  isDistinct() {
    return this._iterable.isDistinct();
  }
}

IterableBase.prototype.permute = function (indices) {
  return new IterablePermute(this, indices);
};
