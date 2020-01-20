import {MatrixView} from './matrix.view.js';
import {MatrixBase} from '../matrix-base.js';

export class MatrixTransposeView extends MatrixView {
  constructor(matrix, axes) {
    super(matrix);
    if (axes === undefined) {
      const n = matrix.dims.length - 1;
      this._axes = matrix.dims.map((x, i) => n - i);
    }
    else {
      this._axes = Array.from(axes);
    }
  }

  get dims() {
    return super.dims.map((x, i, d) => d[this._axes[i]]);
  }

  _get(indices) {
    return super._get(indices.map((x, i, d) => d[this._axes[i]]));
  }

  _set(indices, value) {
    super._set(indices.map((x, i, d) => d[this._axes[i]]), value);
  }
}

MatrixBase.prototype.transpose = function (axes) {
  return new MatrixTransposeView(this, axes);
};
