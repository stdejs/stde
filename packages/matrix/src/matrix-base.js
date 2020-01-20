import {iter} from '@stde/iterable';
// import '@stde/iterable/src/array-ext.js';
//import {IterableBase} from '@stde/iterable/src/index.js';
// import {Iterable} from '../../iterable/src/iterable.js';
import {assert} from './assert.js';

//import {Iterable} from '@stde/iterable';

//console.log(Iterable);

/**
 * A base abstract class for all matrix-like structures.
 *
 */
export class MatrixBase {
  /**
   * Base constructor, should be called only from a derived class.
   */
  constructor() {
    if (new.target === MatrixBase) {
      throw new TypeError('Cannot construct MatrixBase instances directly');
    }
  }

  /**
   * A read-only list of matrix's dimensions
   *
   * @abstract
   * @type       {Iterable}
   */
  get dims() {
    throw new Error('Not implemented');
  }

  /**
   * Returns a string representation of the matrix.
   *
   * @returns    {string}  String representation of the matrix.
   */
  toString() {
    // TODO: N-dim
    const d = this.dims.length;
    switch (d) {
      case 1:
        return '[' + [...this.elements()].join(',') + ']';
      case 2:
        return '[' + [...this.rows()].join(',\n ') + ']';
      default:
        throw new Error();
    }
  }

  _dimsToString() {
    return '{' + this.dims.join('x') + '}';
  }

  toArray(...axes) {
    throw new Error('Not implemented');
  }

  toArrayOfRows() {
    if (this.dims.length === 1) {
      throw new Error('Not implemented');
    }
    else if (this.dims.length === 2) {
      const result = [];
      for (const row of this.rows()) {
        result.push([...row.elements()]);
      }
      return result;
    }
    else {
      throw new Error('Not implemented');
    }
  }

  toArrayOfCols() {
    throw new Error('Not implemented');
  }

  // Checks

  _checkRow(row) {
    assert(row >= 0 && row < this.rowCount,
      `Row number (${row}) is out of range [0, ${this.rowCount - 1}]`);
  }

  _checkRow2(row) {
    assert(row >= 0 && row <= this.rowCount,
      `Row number (${row}) is out of range [0, ${this.rowCount}]`);
  }

  _checkCol(col) {
    assert(col >= 0 && col < this.colCount,
      `Row number (${col}) is out of range [0, ${this.colCount - 1}]`);
  }

  _checkCol2(col) {
    assert(col >= 0 && col <= this.colCount,
      `Row number (${col}) is out of range [0, ${this.colCount}]`);
  }

  _checkMatrixDim(d) {
    assert(this.dims.length === d,
      `Matrix (${this._dimsToString()}) should be ${d}-dim`);
  }

  _checkMatrixSquare() {
    assert(this.dims.length === 2 && this.rowCount === this.colCount,
      `Matrix (${this._dimsToString()}) should be square`);
  }

  _checkSameRowCount(m) {
    assert(this.rowCount === m.rowCount,
      `Matrices should have the same row count: ${this.rowCount} and ${m.rowCount}`);
  }

  _checkSameColCount(m) {
    assert(this.colCount === m.colCount,
      `Matrices should have the same col count: ${this.colCount} and ${m.colCount}`);
  }

  _checkSameDims(m) {
    const n = Math.min(this.dims.length, m.dims.length);
    let same = true;
    for (let i = 0; i < n; i++) {
      if (this.dims[i] !== m.dims[i]) {
        same = false;
        break;
      }
    }
    assert(same && this._checkRestDimsOnes(this.dims, n) && this._checkRestDimsOnes(m.dims, n),
      `Matrices should have the same dims: ${this._dimsToString()} and ${m._dimsToString()}`);
  }

  _checkRestDimsOnes(dims, n) {
    for (let i = n; i < dims.length; i++) {
      if (dims[i] !== 1) {
        return false;
      }
    }
    return true;
  }

  _checkAxes(axes) {
    assert(axes.length === this.dims.length,
      `Axes [${axes}] should contain number of elements equals to matrix dims (${this.dims.length})`);
    assert(axes.slice().sort().all((a, i) => a === i),
      `Axes [${axes}] should be a permutation of [${this.dims.map((d, i) => i).join(',')}]`);
  }

  _checkIndices(indices) {
    assert(indices instanceof Array,
      `Indices (${indices}) should be an array`);
    assert(indices.length <= this.dims.length,
      `Too many indices [${indices}] for matrix ${this._dimsToString()}`);
    assert(iter(indices).all((x, i) => x >= 0 && x < this.dims[i]),
      `Wrong indices [${indices}] for matrix ${this._dimsToString()}`);
  }

  // Properties

  get rowCount() {
    return this.dims[0];
  }

  get colCount() {
    return this.dims[1];
  }

  // Element accessors

  get(indices) {
    this._checkIndices(indices);
    return this._get(indices);
  }

  set(indices, value) {
    this._checkIndices(indices);
    this._set(indices, value);
  }

  scalar() {
    assert(this.rowCount === 1 && this.colCount === 1,
      `Matrix should be 1x1: ${this.rowCount}x${this.colCount}`);
    return this.get([0, 0]);
  }

  row(i, firstCol, lastCol) {
    // return new MatrixRow(this, i, firstCol, lastCol);
    return this.slice(i, [firstCol, lastCol]);
  }

  col(i, firstRow, lastRow) {
    // return new MatrixRow(this.transpose(), i, firstRow, lastRow).transpose();
    return this.slice([firstRow, lastRow], i);
  }

  // General operations

  swapRows(i, j) {
    this._checkRow(i);
    this._checkRow(j);
    return this._swapRows(i, j);
  }

  _swapRows(i, j) {
    for (let k = 0; k < this.colCount; k++) {
      const value = this._get([i, k]);
      this._set([i, k], this._get([j, k]));
      this._set([j, k], value);
    }
    return this;
  }

  forEach(operation) {
    const d = this.dims.length;
    const n = this.dims.reduce((x, y) => x * y, 1);
    const d1 = d - 1;
    const indices = new Array(d).fill(0);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < d1; j++) {
        if (indices[j] === this.dims.get(j)) {
          indices[j] = 0;
          indices[j + 1]++;
        }
      }
      operation(this._get(indices), indices);
      indices[0]++;
    }
    return this;
  }

  forEach2(operation, m) {
    const d = Math.min(this.dims.length, m.dims.length);
    const n = this.dims.reduce((x, y) => x * y, 1);
    const d1 = d - 1;
    const indices = new Array(d).fill(0);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < d1; j++) {
        if (indices[j] === this.dims.get(j)) {
          indices[j] = 0;
          indices[j + 1]++;
        }
      }
      operation(this._get(indices), m._get(indices), indices);
      indices[0]++;
    }
    return this;
  }

  // Assignment operations

  setEach(operation, ...ms) {
    // TODO: Performance
    if (ms.length === 0) {
      this.forEach((x, indices) => this._set(indices, operation(x, null, indices)));
    }
    else {
      ms.reduce((result, m) =>
        result.forEach2((x, y, indices) =>
          result._set(indices, operation(x, y, indices)), m), this);
    }
    return this;
  }

  setAbs() {
    return this.setEach(x => Math.abs(x));
  }

  setSqrt() {
    return this.setEach(x => Math.sqrt(x));
  }

  setExp() {
    return this.setEach(x => Math.exp(x));
  }

  setAdd(...ms) {
    return this.setEach((x, y) => x + y, ...ms);
  }

  setSubtract(...ms) {
    return this.setEach((x, y) => x - y, ...ms);
  }

  setMultiply(...ms) {
    return this.setEach((x, y) => x * y, ...ms);
  }

  setDivide(...ms) {
    return this.setEach((x, y) => x / y, ...ms);
  }

  // Mapping operations

  map(operation, ...ms) {
    return this.clone().setEach(operation, ...ms);
  }

  abs() {
    return this.clone().setAbs();
  }

  sqrt() {
    return this.clone().setSqrt();
  }

  exp() {
    return this.clone().setExp();
  }

  add(...ms) {
    return this.clone().setAdd(...ms);
  }

  subtract(...ms) {
    return this.clone().setSubtract(...ms);
  }

  multiply(...ms) {
    return this.clone().setMultiply(...ms);
  }

  divide(...ms) {
    return this.clone().setDivide(...ms);
  }
}
