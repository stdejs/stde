import {IterableBase} from './iterable-base.js';
import {OrderedKeeper} from './keeper.js';
import {orders} from './order.js';

// Optimization for:
// min, max, minIndex, maxIndex, orderBy? - only if order is compatible
// TODO:
// skip, take, filter, ... preserve order
export class OrderedIterable extends IterableBase {
  constructor(iterable, order) {
    super();
    this._iterable = iterable;
    this._order = order;
  }

  *[Symbol.iterator]() {
    yield* this._iterable;
  }

  get order() {
    return this._order;
  }

  sortedIndex(item, start, end) {
    if (start == null) {
      start = 0;
    }
    if (end == null) {
      end = this.length;
    }
    while (start < end) {
      const mid = start + end >>> 1;
      if (this._order.compare(this.get(mid), item) < 0) {
        start = mid + 1;
      }
      else {
        end = mid;
      }
    }
    return start;
  }

  sortedIndexRight(item, start, end) {
    if (start == null) {
      start = 0;
    }
    if (end == null) {
      end = this.length;
    }
    while (start < end) {
      const mid = start + end >>> 1;
      if (this._order.compare(this.get(mid), item) > 0) {
        end = mid;
      }
      else {
        start = mid + 1;
      }
    }
    return start;
  }

  indexOf(item, start, end) {
    const index = this.sortedIndex(item, start, end);
    return index < this.length && this._order.compare(this.get(index), item) === 0
      ? index : -1;
  }

  distinct(selector, equator) {
    return selector != null || equator != null
      ? super.distinct(selector, equator)
      : new OrderedIterableDistinct(this, this._order);
  }

  isDistinct(selector, equator) {
    if (selector != null || equator != null) {
      return super.isDistinct(selector, equator);
    }
    const keeper = new OrderedKeeper(this._order);
    for (const item of this) {
      if (keeper.seen(item)) {
        return false;
      }
    }
    return true;
  }

  // min(...orderings) {
  //   return orderings.length == 0 ? this.first() : super.min(...orderings);
  // }

  // max(...orderings) {
  //   return orderings.length == 0 ? this.last() : super.max(...orderings);
  // }

  // minIndex(...orderings) {
  //   return orderings.length == 0 ? 0 : super.minIndex(...orderings);
  // }

  // maxIndex(...orderings) {
  //   return orderings.length == 0 ? this.length - 1 : super.maxIndex(...orderings);
  // }
}

class OrderedIterableDistinct extends OrderedIterable {
  constructor(iterable, order) {
    super(iterable, order);
  }

  *[Symbol.iterator]() {
    const keeper = new OrderedKeeper(this._order);
    for (const item of this._iterable) {
      if (!keeper.seen(item)) {
        yield item;
      }
    }
  }
}

IterableBase.prototype.withOrder = function (...orderings) {
  return new OrderedIterable(this, orders(...orderings));
};
