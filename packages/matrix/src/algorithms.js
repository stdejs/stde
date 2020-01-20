import {MatrixBase} from './matrix-base.js';
import {Matrix} from './matrix.js';
import {DiagonalMatrix} from './diagonal-matrix.js';

import {almostEqual} from '@stde/math/src/precision.js';

MatrixBase.prototype.det = function () {
  this._checkMatrixSquare();
  if (this.rowCount === 1) {
    return this._get([0, 0]);
  }
  else if (this.rowCount === 2) {
    return this.get([0, 0]) * this.get([1, 1]) - this.get([0, 1]) * this.get([1, 0]);
  }
  else {
    throw new Error('Not implemented');
  }
};

MatrixBase.prototype.inverse = function () {
  this._checkMatrixSquare();
  if (this.rowCount === 1) {
    const d = this._get([0, 0]);
    assert(!almostEqual(d, 0), 'Matrix is not invertible');
    return new Matrix([1, 1], new this.type([1 / d]));
  }
  else if (this.rowCount === 2) {
    const d = this.det();
    assert(!almostEqual(d, 0), 'Matrix is not invertible');
    return new Matrix([2, 2], new this.type([
      this._get([1, 1]) / d,
      -this._get([1, 0]) / d,
      -this._get([0, 1]) / d,
      this._get([0, 0]) / d ]));
  }
  else {
    // Gauss–Jordan elimination
    // https://en.wikipedia.org/wiki/Gaussian_elimination
    // http://mathworld.wolfram.com/MatrixInverse.html
    // http://mathworld.wolfram.com/Pivoting.html
    // http://math.uww.edu/~mcfarlat/inverse.htm
    const n = this.rowCount;
    // Augment a matrix with an identity matrix
    const m = this.append(new DiagonalMatrix(this.rowCount, this.type).fill(1));
    for (let i = 0; i < n; i++) {
      // Swap rows so an element on a matrix's diagonal has a biggest
      // absolute value (pivoting)
      const i2 = i + m.col(i, i).elements().abs().indexOfMax();
      if (i !== i2) {
        m.swapRows(i, i2);
      }
      // All elements on a matrix's diagonal should be non-zero
      const c = m.get([i, i]);
      assert(!almostEqual(c, 0), 'Matrix is not invertible');
      // Scale the current row so that a value on a matrix's diagonal equals 1
      const currentRow = m.row(i, i);
      currentRow.setEach(x => x / c);
      // Subtract ith row from other rows so that all elements of an ith column
      // (except an element on a matrix's diagonal) equals zero
      for (let j = 0; j < n; j++) {
        if (i !== j) {
          const c2 = m.get([j, i]);
          m.row(j, i).setEach((x, y) => x - c2 * y, currentRow);
        }
      }
    }
    return m.slice([0, n], [n, 2 * n]).clone();
  }
};
