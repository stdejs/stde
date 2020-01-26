import {IterableBase} from '../iterable-base.js';
import {OrderedIterable} from '../ordered-iterable.js';

class IterableOrderBy extends OrderedIterable {
  constructor(iterable, orderings) {
    super(iterable, orderings);
  }

  *[Symbol.iterator]() {
    // TODO: Lazy?
    yield* [...super[Symbol.iterator]()].sort((x, y) => this._order.compare(x, y));
  }
}

IterableBase.prototype.orderBy = function (...orders) {
  return new IterableOrderBy(this, orders);
};
