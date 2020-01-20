import {MatrixView} from './matrix.view.js';
import {MatrixBase} from '../matrix-base.js';
import {iter} from '@stde/iterable';

class MatrixSliceView extends MatrixView {
  constructor(matrix, ...slices) {
    // TODO: assert
    super(matrix);
    this._slices = Object.freeze(slices.map((s, i) => s instanceof Array
      ? [s[0] ?? 0, s[1] ?? matrix.dims.get(i)]
      : s ?? [0, matrix.dims.get(i)]));
    this._dims = iter([...iter(this._slices)
      .map(s => s instanceof Array ? s[1] - s[0] : null)
      .except(null)]);
  }

  get dims() {
    return this._dims;
  }

  _get(indices) {
    return super._get(this._mapIndex(indices));
  }

  _set(indices, value) {
    super._set(this._mapIndex(indices), value);
  }

  _mapIndex(indices) {
    let i = 0;
    return this._slices.map(s => s instanceof Array ? s[0] + indices[i++] : s);
  }

  // get type() {
  //   return this._matrix.type;
  // }

  // get rowCount() {
  //   return 1;
  // }

  // get colCount() {
  //   return this._lastCol - this._firstCol + 1;
  // }

  // get dims() {
  //   return [this.rowCount, this.colCount];
  // }

  // _get(indices) {
  //   return this._matrix._get([this._row + indices[0], this._firstCol + indices[1]]);
  // }

  // _set(indices, value) {
  //   this._matrix._set([this._row + indices[0], this._firstCol + indices[1], value]);
  // }
}

MatrixBase.prototype.slice = function (...slices) {
  return new MatrixSliceView(this, ...slices);
};
