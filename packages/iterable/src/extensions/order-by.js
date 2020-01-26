import {IterableBase} from '../iterable-base.js';
import {OrderedIterable} from '../ordered.js';
import {orders} from '../order.js';

class IterableOrderBy extends OrderedIterable {
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
