import {IterableBase} from './iterable-base.js';

export class IterableRange extends IterableBase {
  constructor(start, end, step = null) {
    super();
    this._start = start;
    this._end = end;
    this._step = step ?? (end >= start ? 1 : -1);
  }

  *[Symbol.iterator]() {
    if (this._step > 0) {
      for (let i = this._start; i < this._end; i += this._step) {
        yield i;
      }
    }
    else {
      // eslint-disable-next-line for-direction
      for (let i = this._start; i > this._end; i += this._step) {
        yield i;
      }
    }
  }
}
