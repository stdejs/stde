import {MatrixBase} from '../matrix-base.js';

export class MatrixView extends MatrixBase {
  constructor(matrix) {
    if (new.target === MatrixView) {
      throw new TypeError('Cannot construct MatrixView instances directly');
    }
    super();
    this._matrix = matrix;
  }

  get dims() {
    return this._matrix.dims;
  }

  get type() {
    return this._matrix.type;
  }

  _get(indices) {
    return this._matrix._get(indices);
  }

  _set(indices, value) {
    this._matrix._set(indices, value);
  }

  // _getOffset(offset) {
  //   return this._matrix._getOffset(offset);
  // }

  // _setOffset(offset, value) {
  //   this._matrix._setOffset(offset, value);
  // }
}
