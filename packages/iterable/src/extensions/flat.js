import {IterableBase} from '../iterable-base.js';

class IterableFlat extends IterableBase {
  constructor(iterable) {
    super();
    this._iterable = iterable;
  }

  *[Symbol.iterator]() {
    for (const item of this._iterable) {
      if (item instanceof Array || item instanceof IterableBase) {
        yield* item;
      }
      else {
        yield item;
      }
    }
  }
}

class IterableDeepFlat extends IterableBase {
  constructor(iterable, depth) {
    super();
    this._iterable = iterable;
    this._depth = depth;
  }

  *[Symbol.iterator]() {
    const depth = this._depth - 1;
    const nested = depth >= 2 ? IterableDeepFlat : IterableFlat;
    for (const item of this._iterable) {
      if (item instanceof Array) {
        yield* new nested(item, depth);
      }
      else if (item instanceof IterableBase) {
        yield* item.flat(depth);
      }
      else {
        yield item;
      }
    }
  }
}

IterableBase.prototype.flat = function (depth = 1) {
  return depth >= 2 ? new IterableDeepFlat(this, depth)
    : depth == 1 ? new IterableFlat(this) : this;
};
