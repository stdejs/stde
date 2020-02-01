import {IterableBase} from '../iterable-base.js';
import {SortedIterable} from '../ordered.js';
import {orders} from '../order.js';

class IterableOrderBy extends SortedIterable {
  constructor(iterable, order) {
    super(iterable, order);
  }

  *[Symbol.iterator]() {
    if (this._cache == null) {
      this._cache = [...super[Symbol.iterator]()].sort((x, y) => this._order.compare(x, y));
    }
    yield* this._cache;
  }

  _get(index) {
    if (this._cache == null) {
      this._cache = [...super[Symbol.iterator]()].sort((x, y) => this._order.compare(x, y));
    }
    return this._cache[index];
  }
}

IterableBase.prototype.orderBy = function (...orderings) {
  return new IterableOrderBy(this, orders(...orderings));
};
