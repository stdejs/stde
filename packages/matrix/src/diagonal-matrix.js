import {MatrixStorage} from './matrix-storage.js';

export class DiagonalMatrix extends MatrixStorage {
  // data is reused, not copied!
  constructor(dim, dataOrType) {
    super(dim, dataOrType);
    this._dims = Object.freeze([dim, dim]);
  }

  static ofArray(array) {
    return new DiagonalMatrix(array.length, array.slice());
  }

  get dims() {
    return this._dims;
  }

  _get(indices) {
    return indices[0] === indices[1] ? this._getOffset(indices[0]) : 0;
  }

  _set(indices, value) {
    assert(indices[0] === indices[1]);
    this._setOffset(indices[0], value);
  }

  // _getOffset(offset) {
  //   return super._getOffset(offset);
  // }

  // _setOffset(offset, value) {
  //   super._setOffset(offset, value);
  // }
}
