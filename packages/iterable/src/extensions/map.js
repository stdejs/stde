import {IterableBase} from '../iterable-base.js';

class IterableMap extends IterableBase {
  constructor(iterable, mapper) {
    super();
    this._iterable = iterable;
    this._mapper = mapper;
  }

  *[Symbol.iterator]() {
    let i = 0;
    for (const item of this._iterable) {
      yield this._mapper(item, i++, this._iterable);
    }
  }
}

IterableBase.prototype.map = function (mapper) {
  return new IterableMap(this, mapper);
};
