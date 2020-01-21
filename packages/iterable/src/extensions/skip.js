import {IterableBase} from '../iterable-base.js';

class IterableSkip extends IterableBase {
  constructor(iterable, pred) {
    super();
    this._iterable = iterable;
    this._pred = pred;
  }

  *[Symbol.iterator]() {
    const iterator = this._iterable[Symbol.iterator]();
    let i = 0;
    for (const item of iterator) {
      if (!this._pred(item, i++, this._iterable)) {
        yield item;
        break;
      }
    }
    yield* iterator;
  }
}

IterableBase.prototype.skip = function (count) {
  // count could be non-numeric (not comparable with 0)
  // so it's safer to call .skip() for a valid numeric value
  // and call .takeWhile() otherwise
  return count < 0
    ? this.take(this.length + count)
    : this.skipWhile((item, i) => i < count);
  // return this.skipWhile((item, i) => i < count);
};

IterableBase.prototype.skipWhile = function (pred) {
  return new IterableSkip(this, pred);
};
