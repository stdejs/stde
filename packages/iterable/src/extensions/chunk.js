import {IterableBase} from '../iterable-base.js';

class IterableChunk extends IterableBase {
  constructor(iterable, count) {
    super();
    this._iterable = iterable;
    this._count = count;
  }

  *[Symbol.iterator]() {
    let i = 0;
    let array = new Array(this._count);
    for (const item of this._iterable) {
      array[i++] = item;
      i %= this._count;
      if (i === 0) {
        yield array;
        array = new Array(this._count);
      }
    }
    if (i > 0) {
      yield array.slice(0, i);
    }
  }
}

IterableBase.prototype.chunk = function (count) {
  if (!(count >= 1)) {
    throw new Error(`Count should be a positive intger: ${count}`);
  }
  return new IterableChunk(this, count);
};
