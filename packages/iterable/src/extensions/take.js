import {IterableBase} from '../iterable-base.js';

class IterableTake extends IterableBase {
  constructor(iterable, pred) {
    super();
    this._iterable = iterable;
    this._pred = pred;
  }

  *[Symbol.iterator]() {
    const iterator = this._iterable[Symbol.iterator]();
    let i = 0;
    for (const item of iterator) {
      if (this._pred(item, i++, this._iterable)) {
        yield item;
      }
      else {
        break;
      }
    }
  }
}

IterableBase.prototype.take = function (count) {
  if (count == null) {
    count = this.length;
  }
  else if (count < 0) {
    count += this.length;
  }
  return this.takeWhile((item, i) => i < count);
};

IterableBase.prototype.takeWhile = function (pred) {
  return new IterableTake(this, pred);
};
