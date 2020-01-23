import {IterableBase} from '../iterable-base.js';
// import {Keeper} from '../keeper.js';

class IterableJoin extends IterableBase {
  constructor(outer, inner, outerKeySelector, innerKeySelector, resultSelector, equator) {
    super();
    this._outer = outer;
    this._inner = inner;
    this._outerKeySelector = outerKeySelector;
    this._innerKeySelector = innerKeySelector;
    this._resultSelector = resultSelector;
    this._equator = equator;
  }

  *[Symbol.iterator]() {
    // for (const item of this._inner) {
    //   if (this._iterables.every(iterable => iterable.includes(item))) {
    //     yield item;
    //   }
    // }
    // for (const item of this._outer) {
    //   if (this._iterables.every(iterable => iterable.includes(item))) {
    //     yield item;
    //   }
    // }
  }
}

IterableBase.prototype.join = function (inner, outerKeySelector, innerKeySelector, resultSelector, equator) {
  return new IterableJoin(this, inner, outerKeySelector, innerKeySelector, resultSelector, equator);
};
