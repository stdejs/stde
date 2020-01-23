import {IterableBase} from '../iterable-base.js';

class IterableReverse extends IterableBase {
  constructor(iterable) {
    super();
    this._iterable = iterable;
  }

  *[Symbol.iterator]() {
    // if (this._iterable instanceof Array) {
    //   for (let i = this._iterable.length; i >= 0; i--) {
    //     yield this._iterable[i];
    //   }
    // }
    // else {
    //   yield* [...this._iterable].reverse();
    // }
    // TODO: Performance
    yield* [...this._iterable].reverse();
  }
}

IterableBase.prototype.reverse = function () {
  return new IterableReverse(this);
};
