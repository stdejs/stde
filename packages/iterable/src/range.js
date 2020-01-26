import {IterableBase} from './iterable-base.js';

export class IterableRange extends IterableBase {
  constructor(start, end, step) {
    if (step === 0) {
      throw new Error('Step should not be zero');
    }
    super();
    this._start = start;
    this._end = end;
    this._step = step ?? (end >= start ? 1 : -1);
    this._length = Math.max(Math.ceil((this._end - this._start) / this._step), 0);
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

  get length() {
    return this._length;
  }

  empty() {
    return this._length === 0;
  }

  get(index) {
    if (index < -this.length || index >= this.length) {
      throw new RangeError(`Index ${index} out of bounds [${-this.length}, ${this.length - 1}]`);
    }
    if (index < 0) {
      index += this.length;
    }
    return this._get(index);
  }

  _get(index) {
    return this._start + this._step * index;
  }

  last(defaultValue) {
    return this.length > 0
      ? this._start + this._step * (this.length - 1)
      : defaultValue;
  }

  reverse() {
    const last = this.last(this._start);
    return new IterableRange(last, last + this._start - this._end, -this._step);
  }

  slice(start, end) {
    if (start == null) {
      start = 0;
    }
    else {
      if (start < 0) {
        start += this.length;
      }
      start = Math.max(start, 0);
    }
    if (end == null) {
      end = this.length;
    }
    else {
      if (end < 0) {
        end += this.length;
      }
      end = Math.min(end, this.length);
    }
    return new IterableRange(this._get(start), this._get(end), this._step);
  }

  skip(n) {
    return this.slice(n);
  }

  take(n) {
    return this.slice(0, n);
  }
}
