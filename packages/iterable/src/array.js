import {IterableBase} from './iterable-base.js';
// import {IterableRange} from './range.js';

export class IterableArray extends IterableBase {
  constructor(array, start, end, step) {
  // constructor(array, indices) {
    super();
    this._array = array;
    this._start = start;// ?? 0;
    this._end = end;// ?? Infinity;
    this._step = step ?? (start == null || end == null || end >= start ? 1 : -1);
    // this._indices = indices ?? new IterableRange(0, Infinity);
    // this._indices = indices ?? new IterableRange(0, 10);
    // this._indices = indices ?? new IterableRange(0, array.length);
  }

  *[Symbol.iterator]() {
    // if (typeof this._indices.take != 'function') {
    //   console.log(this._indices);
    // }
    // console.log(this._indices);
    // for (const i of this._indices.take(this.length)) {
    // // for (const i of this._indices) {
    //   // yield this._array[i];
    //   yield this._array[(i + this.length) % this.length];
    // }
    if (this._step > 0) {
      let start = this._start;
      if (start == null) {
        start = 0;
      }
      else if (start < 0) {
        start += this._array.length;
        if (start < 0) {
          start = 0;
        }
      }
      let end = this._end;
      if (end == null || end > this._array.length) {
        end = this._array.length;
      }
      else if (end < 0) {
        end += this._array.length;
      }
      for (let i = start; i < end; i += this._step) {
        yield this._array[i];
      }
    }
    else {
      let start = this._start;
      if (start == null || start > this._array.length) {
        start = this._array.length - 1;
      }
      else if (start < 0) {
        start += this._array.length;
      }
      let end = this._end;
      if (end == null) {
        end = -1;
      }
      else if (end < -1) {
        end += this._array.length;
        if (end < -1) {
          end = -1;
        }
      }
      // eslint-disable-next-line for-direction
      for (let i = start; i > end; i += this._step) {
        yield this._array[i];
      }
    }
  }

  // get length() {
  //   // return Math.max(Math.ceil(((this._end ?? this._length) - this._start) / this._step), 0);
  //   // return this._indices.length;
  //   // return Math.max(Math.ceil((Math.min(this._end, this._array.length) - this._start) / this._step), 0);
  //   // return this._indices.take(this._length).length;
  //   // return this._array.length;
  //   // return Math.max(Math.ceil((this._array.length - this._start) / this._step), 0);
  //   // console.log(this._array, this._array.length, this._indices._start, Math.max(Math.ceil((this._array.length - this._indices._start) / this._indices._step), 0));
  //   // return Math.max(Math.ceil((this._array.length - this._indices._start) / this._indices._step), 0);
  // }

  // empty() {
  //   return this._indices.empty();
  // }

  // get(index) {
  //   return this._array[this._indices.get(index)];
  // }

  _get(index) {
    const start = this._step > 0
      ? this._start ?? 0
      : this._start ?? this._array.length - 1;
    // return this._array[this._indices._get(index)];
    return this._array[start + this._step * index];
  }

  // set(index, value) {
  //   this._array[this._indices.get(index)] = value;
  // }

  // _set(index, value) {
  //   this._array[this._indices._get(index)] = value;
  // }

  reverse() {
    // return new IterableArray(this._array, this._indices.reverse());
    // console.log(this._indices.mirror());
    // return new IterableArray(this._array, this._indices.mirror());
    const start = this._end == null ? null : this._end - 1;
    const end = this._start == null ? null : this._start - 1;
    return new IterableArray(this._array, start, end, -this._step);
    // return new IterableArray(this._array, -this._end - 1, -this._start - 1, -this._step);
  }

  slice(start, end) {
    // if (start < 0) {
    //   start += this._array.length;
    // }
    // if (end < 0) {
    //   end += this._array.length;
    // }
    // return new IterableArray(this._array, this._indices.slice(start, end));
    return new IterableArray(this._array, start, end, this._step);
  }

  skip(n) {
    return this.slice(n);
    // return new IterableArray(this._array, this._indices.slice(n));
  }

  take(n) {
    return this.slice(0, n);
  }

  // permute(indices) {
  //   // return new IterableArray(this._array, indices);
  //   return new IterableArray(this._array, new IterableArray(indices));
  // }
}
