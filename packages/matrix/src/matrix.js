import {MatrixStorage} from './matrix-storage.js';
import {MatrixBase} from './matrix-base.js';
import {assert} from './assert.js';
import {iter} from '@stde/iterable';

// Import extension methods
import './iterables/matrix-element.iterable.js';
import './iterables/matrix-slice.iterable.js';
import './views/matrix-diagonal.view.js';
import './views/matrix-transpose.view.js';
import './views/matrix-slice.view.js';

/**
 * Class representing a matrix.
 *
 */
export class Matrix extends MatrixStorage {
  /**
   * Create a matrix.
   *
   * @param {Array}  dims         The matrix's dimensions.
   * @param {Array|TypedArray|ArrayConstructor} dataOrType   Either data or type. Data is reused, not copied. Data should be in column-major order.
   */
  constructor(dims, dataOrType) {
    assert(dims.length > 0, 'Matrix should have at least one dimension');
    dims = iter(dims);
    assert(dims.all(x => x > 0), `Matrix has wrong dims: [${dims.join(', ')}]`);
    super(dims.reduce((x, y) => x * y, 1), dataOrType);
    this._dims = dims;
  }

  /**
   * Creates a matrix from an array of row arrays.
   *
   * @param      {Array}     array   A source array
   * @param      {Function}  type    An internal storage (typed) array type
   * @returns    {Matrix}    A new matrix
   */
  static ofRows(array, type) {
    const rowCount = array.length;
    const colCount = array[0].length;
    const m = new Matrix([rowCount, colCount], type);
    for (let i = 0; i < rowCount; i++) {
      for (let j = 0; j < colCount; j++) {
        m.set([i, j], array[i][j]);
      }
    }
    return m;
  }

  /**
   * Creates a matrix from an array of column arrays.
   *
   * @param      {Array}     array   A source array
   * @param      {Function}  type    An internal storage (typed) array type
   * @returns    {Matrix}    A new matrix
   */
  static ofCols(array, type) {
    const rowCount = array[0].length;
    const colCount = array.length;
    const m = new Matrix([rowCount, colCount], type);
    for (let i = 0; i < rowCount; i++) {
      for (let j = 0; j < colCount; j++) {
        m.set([i, j], array[j][i]);
      }
    }
    return m;
  }

  /**
   * A list of a matrix dimensions
   *
   * @type       {Iterable}
   */
  get dims() {
    return this._dims;
  }

  _get(indices) {
    return this._getOffset(this._index(indices));
  }

  _set(indices, value) {
    this._setOffset(this._index(indices), value);
  }

  _index(indices) {
    let i = indices.length - 1;
    let result = indices[i];
    while (--i >= 0) {
      result = result * this._dims.get(i) + indices[i];
    }
    return result;
  }
}

MatrixBase.prototype.clone = function () {
  return new Matrix(this.dims,
    new this.type(this.elements()));
};

MatrixBase.prototype.append = function (m) {
  this._checkSameRowCount(m);
  return new Matrix([this.rowCount, this.colCount + m.colCount],
    new this.type(this.elements().concat(m.elements())));
};

MatrixBase.prototype.dot = function (...ms) {
  return ms.reduce(_dot, this);
};

function _dot(m1, m2) {
  if (m1.dims.length === 1 && m2.dims.length === 1) {
    assert(m1.dims.get(0) === m2.dims.get(0), 'Incompatible matrix dimensions: ' +
      `${m1._dimsToString()} and ${m2._dimsToString()}`);
    let result = 0;
    for (let i = 0; i < m1.dims.get(0); i++) {
      result += m1.get([i]) * m2.get([i]);
    }
    return result;
  }
  if (m1.dims.length === 1 && m2.dims.length === 1 ||
      m1.dims.length === 1 && m2.dims.length === 2 ||
      m1.dims.length === 2 && m2.dims.length === 2) {
    const colCount = m1.dims.length === 2 ? m1.dims.get(1) : 1;
    assert(colCount === m2.rowCount, 'Incompatible matrix dimensions: ' +
      `${m1._dimsToString()} and ${m2._dimsToString()}`);
    const result = new Matrix([m1.rowCount, m2.colCount], m1.type);
    // TODO: Optimization is required
    for (let i = 0; i < m1.rowCount; i++) {
      for (let j = 0; j < m2.colCount; j++) {
        let v = 0;
        for (let k = 0; k < colCount; k++) {
          v += m1.get(m1.dims.length === 2 ? [i, k] : [i]) * m2.get([k, j]);
        }
        result.set([i, j], v);
      }
    }
    return result;
  }
  throw new Error(`Matrix multiplication not implemented for ${m1._dimsToString()} and ${m2._dimsToString()}`);
}
