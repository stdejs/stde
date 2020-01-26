import {IterableBase} from './iterable-base.js';
import {orders} from './order.js';

export class OrderedIterable extends IterableBase {
  constructor(iterable, orderings) {
    super();
    this._iterable = iterable;
    this._order = orders(...orderings);
  }

  *[Symbol.iterator]() {
    yield* this._iterable;
  }

  get order() {
    return this._order;
  }

  min(...orderings) {
    return orderings.length == 0 ? this.first() : super.min(...orderings);
  }

  max(...orderings) {
    return orderings.length == 0 ? this.last() : super.max(...orderings);
  }

  minIndex(...orderings) {
    return orderings.length == 0 ? 0 : super.minIndex(...orderings);
  }

  maxIndex(...orderings) {
    return orderings.length == 0 ? this.length - 1 : super.maxIndex(...orderings);
  }
}

IterableBase.prototype.withOrder = function (...orders) {
  return new OrderedIterable(this, orders);
};
