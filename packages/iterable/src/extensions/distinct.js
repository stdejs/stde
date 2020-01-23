import {IterableBase} from '../iterable-base.js';
import {Keeper} from '../keeper.js';

class IterableDistinct extends IterableBase {
  constructor(iterable, selector, equator) {
    super();
    this._iterable = iterable;
    this._selector = selector;
    this._equator = equator;
  }

  *[Symbol.iterator]() {
    const keeper = new Keeper(this._selector, this._equator);
    for (const item of this._iterable) {
      if (!keeper.seen(item)) {
        yield item;
      }
    }
  }
}

IterableBase.prototype.distinct = function (selector, equator) {
  return new IterableDistinct(this, selector, equator);
};

// isUnique?
IterableBase.prototype.isDistinct = function (selector, equator) {
  const keeper = new Keeper(selector, equator);
  for (const item of this) {
    if (keeper.seen(item)) {
      return false;
    }
  }
  return true;
};
