import {IterableBase} from '../iterable-base.js';
import {SortedIterable} from '../ordered.js';
import {orders} from '../order.js';

class IterableOrderBy extends SortedIterable {
  constructor(iterable, order) {
    super(iterable, order);
  }

  *[Symbol.iterator]() {
    // TODO: Lazy?
    yield* [...super[Symbol.iterator]()].sort((x, y) => this._order.compare(x, y));
  }
}

IterableBase.prototype.orderBy = function (...orderings) {
  return new IterableOrderBy(this, orders(...orderings));
};
