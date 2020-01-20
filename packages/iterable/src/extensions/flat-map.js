import {IterableBase} from '../iterable-base.js';

class IterableFlatMap extends IterableBase {
  constructor(iterable, mapper) {
    super();
    this._iterable = iterable;
    this._mapper = mapper;
  }

  *[Symbol.iterator]() {
    let i = 0;
    for (const iterable of this._iterable) {
      yield* this._mapper(iterable, i++, this);
    }
  }
}

IterableBase.prototype.flatMap = function (mapper) {
  return new IterableFlatMap(this, mapper);
};
