import {IterableBase} from '../iterable-base.js';
import {orders} from '../order.js';

class IterableOrderBy extends IterableBase {
  constructor(iterable, orderings) {
    super();
    this._iterable = iterable;
    this._order = orders(...orderings);
  }

  *[Symbol.iterator]() {
    // TODO: Lazy?
    yield* [...this._iterable].sort((x, y) => this._order.compare(x, y));
  }
}

IterableBase.prototype.orderBy = function (...orders) {
  return new IterableOrderBy(this, orders);
};
