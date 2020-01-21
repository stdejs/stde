import {IterableBase} from '../iterable-base.js';
import {Iterable} from '../iterable.js';
import {Order, asc} from '../order.js';

class IterableOrderBy extends IterableBase {
  constructor(iterable, orders) {
    super();
    this._iterable = iterable;
    this._orders = new Iterable(orders.length > 0
      ? orders.map(order => order instanceof Order ? order : asc(order))
      : [asc()]);
  }

  *[Symbol.iterator]() {
    yield* [...this._iterable].sort((x, y) =>
      this._orders.reduce((result, order) =>
        result || order.compare(x, y), undefined));
  }
}

IterableBase.prototype.orderBy = function (...orders) {
  return new IterableOrderBy(this, orders);
};
