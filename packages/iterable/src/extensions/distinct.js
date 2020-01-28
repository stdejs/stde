import {IterableBase} from '../iterable-base.js';
import {eqs} from '../equality.js';
import {Keeper} from '../keeper.js';

class IterableDistinct extends IterableBase {
  constructor(iterable, equality) {
    super().withEquality(equality);
    this._iterable = iterable;
  }

  *[Symbol.iterator]() {
    const keeper = new Keeper(this.equality);
    for (const item of this._iterable) {
      if (!keeper.seen(item)) {
        yield item;
      }
    }
  }

  get order() {
    return this._iterable.order;
  }

  isDistinct() {
    return true;
  }
}

IterableBase.prototype.distinct = function (...equality) {
  equality = this.equality != null && equality.length === 0 ? this.equality : eqs(...equality);
  return new IterableDistinct(this, equality);
};

IterableBase.prototype.isDistinct = function (...equality) {
  equality = this.equality != null && equality.length === 0 ? this.equality : eqs(...equality);
  const keeper = new Keeper(equality);
  for (const item of this) {
    if (keeper.seen(item)) {
      return false;
    }
  }
  return true;
};
