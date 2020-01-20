//import {IterableBase} from '../../iterable/iterable-base.js';
import {IterableBase} from '@stde/iterable';
import {MatrixBase} from '../matrix-base.js';

export class MatrixElementIterable extends IterableBase {
  constructor(matrix, ...axes) {
    if (axes.length === 0) {
      axes = matrix.dims.map((d, i) => i).toArray();
    }
    else {
      matrix._checkAxes(axes);
    }
    super();
    this._matrix = matrix;
    this._axes = axes;
  }

  *[Symbol.iterator]() {
    const d = this._matrix.dims.length;
    const n = this._matrix.dims.reduce((x, y) => x * y, 1);
    const d1 = d - 1;
    const indices = new Array(d).fill(0);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < d1; j++) {
        const k = this._axes[j];
        if (indices[k] === this._matrix.dims.get(k)) {
          indices[k] = 0;
          indices[this._axes[j + 1]]++;
        }
        else {
          break;
        }
      }
      yield this._matrix.get(indices);
      indices[this._axes[0]]++;
    }
  }
}

MatrixBase.prototype.elements = function (...axes) {
  return new MatrixElementIterable(this, ...axes);
};
