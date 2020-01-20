import {MatrixBase} from './matrix-base.js';
import {assert} from './assert.js';

/**
 * A base abstract class for persistent matrices.
 *
 */
export class MatrixStorage extends MatrixBase {
  /**
   * Base constructor, should be called only from a derived class.
   *
   * @param {number}  size         The matrix's storage size.
   * @param {ArrayLikeType|Constructor} dataOrType   Either data or type. Data is reused, not copied. Data should be in column-major order.
   */
  // data is reused, not copied!
  constructor(size, dataOrType = Float64Array) {
    if (new.target === MatrixStorage) {
      throw new TypeError('Cannot construct MatrixStorage instances directly');
    }
    assert(size > 0, `Matrix storage size (${size}) should be positive`);
    super();
    if (typeof dataOrType === 'function') {
      this._type = dataOrType;
      this._data = new this._type(size);
    }
    else if (typeof dataOrType === 'object') {
      this._type = dataOrType.constructor;
      this._data = dataOrType;
    }
    else {
      throw new Error('dataOrType should be either a data or constructor');
    }
  }

  _getOffset(offset) {
    return this._data[offset];
  }

  _setOffset(offset, value) {
    this._data[offset] = value;
  }

  get type() {
    return this._type;
  }

  fill(value) {
    this._data.fill(value);
    return this;
  }
}
