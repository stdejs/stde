import {MatrixView} from './matrix.view.js';
import {MatrixBase} from '../matrix-base.js';

export class MatrixDiagonalView extends MatrixView {
  constructor(matrix) {
    matrix._checkMatrixSquare();
    super(matrix);
  }

  get dims() {
    return [super.dims.get(0)];
  }

  _get(indices) {
    return super._get([indices[0], indices[0]]);
  }

  _set(indices, value) {
    super._set([indices[0], indices[0]], value);
  }

  // _getOffset(offset) {
  //   return super._getOffset(offset * (super.dims.get(0) + 1));
  // }

  // _setOffset(offset, value) {
  //   super._setOffset(offset * (super.dims.get(0) + 1), value);
  // }
}

MatrixBase.prototype.diagonal = function () {
  return new MatrixDiagonalView(this);
};
