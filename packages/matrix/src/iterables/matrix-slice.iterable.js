import {IterableBase} from '@stde/iterable';
import {MatrixBase} from '../matrix-base.js';

export class MatrixSliceIterable extends IterableBase {
  constructor(matrix, axis) {
    super();
    this._matrix = matrix;
    this._axis = axis;
  }

  *[Symbol.iterator]() {
    const slices = new Array(this._matrix.dims.length);//.fill(null);
    for (let i = 0; i < this._matrix.dims.get(this._axis); i++) {
      slices[this._axis] = i;
      yield this._matrix.slice(...slices);
    }
  }
}

MatrixBase.prototype.slices = function (axis) {
  return new MatrixSliceIterable(this, axis);
};

MatrixBase.prototype.rows = function () {
  return this.slices(0);
};

MatrixBase.prototype.cols = function () {
  return this.slices(1);
};
