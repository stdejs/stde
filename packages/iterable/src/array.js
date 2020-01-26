import {IterableBase} from './iterable-base.js';
import {IterableRange} from './iterable-range.js';

export class IterableArray extends IterableBase {
  constructor(iterable, indices) {
    super();
    this._iterable = iterable;
    this._indices = indices ?? new IterableRange(0, iterable.length);
  }

  *[Symbol.iterator]() {
    for (const i of this._indices) {
      yield this._iterable[i];
    }
  }

  get length() {
    return this._indices.length;
  }

  get(index) {
    return this._iterable[this._indices.get(index)];
  }

  _get(index) {
    return this._iterable[this._indices._get(index)];
  }

  set(index, value) {
    this._iterable[this._indices.get(index)] = value;
  }

  _set(index, value) {
    this._iterable[this._indices._get(index)] = value;
  }

  reverse() {
    return new IterableArray(this._iterable, this._indices.reverse());
  }

  slice(start, end) {
    return new IterableArray(this._iterable, this._indices.slice(start, end));
  }

  skip(n) {
    return this.slice(n);
  }

  take(n) {
    return this.slice(0, n);
  }
}
