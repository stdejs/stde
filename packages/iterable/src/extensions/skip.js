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
    // It seems that we can't break iteration in for ... of and then continue it:
    // https://stackoverflow.com/questions/59841719/partial-iteration-of-a-generator-using-for-of
    // for (const item of iterator) {
    //   if (!this._pred(item, i++, this._iterable)) {
    //     yield item;
    //     break;
    //   }
    // }
    let item;
    while (!(item = iterator.next()).done) {
      if (!this._pred(item.value, i++, this._iterable)) {
        yield item.value;
        break;
      }
    }
    yield* iterator;
  }

  get equality() {
    return this._iterable.equality;
  }

  get order() {
    return this._iterable.order;
  }

  isDistinct() {
    return this._iterable.isDistinct();
  }
}

IterableBase.prototype.skip = function (count) {
  if (count == null) {
    count = 0;
  }
  else if (count < 0) {
    count += this.length;
  }
  return this.skipWhile((item, i) => i < count);
};

IterableBase.prototype.skipWhile = function (pred) {
  return new IterableSkip(this, pred);
};
