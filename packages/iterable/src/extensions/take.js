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
  // count could be non-numeric (not comparable with 0)
  // so it's safer to call .skip() for a valid numeric value
  // and call .takeWhile() otherwise
  // return count === 0 ? this :
  //   count < 0 ? this.skip(this.length + count)
  //     : this.takeWhile((item, i) => i < count);
  // return this.takeWhile((item, i) => i < count);
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
