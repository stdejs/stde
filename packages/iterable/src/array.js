import {IterableBase} from './iterable-base.js';
import {IterableRange} from './range.js';

export class IterableArray extends IterableBase {
  constructor(array, indices) {
    super();
    this._array = array;
    this._indices = indices ?? new IterableRange(0, array.length);
  }

  *[Symbol.iterator]() {
    for (const i of this._indices) {
      yield this._array[i];
    }
  }

  get length() {
    return this._indices.length;
  }

  empty() {
    return this._indices.empty();
  }

  get(index) {
    return this._array[this._indices.get(index)];
  }

  _get(index) {
    return this._array[this._indices._get(index)];
  }

  set(index, value) {
    this._array[this._indices.get(index)] = value;
  }

  _set(index, value) {
    this._array[this._indices._get(index)] = value;
  }

  reverse() {
    return new IterableArray(this._array, this._indices.reverse());
  }

  slice(start, end) {
    return new IterableArray(this._array, this._indices.slice(start, end));
  }

  skip(n) {
    return this.slice(n);
  }

  take(n) {
    return this.slice(0, n);
  }

  permute(indices) {
    return new IterableArray(this._array, indices);
  }
}
