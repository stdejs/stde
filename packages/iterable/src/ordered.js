import {IterableBase} from './iterable-base.js';
import {OrderedKeeper} from './keeper.js';
import {orders} from './order.js';

// Optimization for:
// min, max, minIndex, maxIndex, orderBy? - only if order is compatible
export class SortedIterable extends IterableBase {
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
    return _sortedIndex(this, start, end, x => this._order.compare(item, x) <= 0);
  }

  sortedIndexRight(item, start, end) {
    return _sortedIndex(this, start, end, x => this._order.compare(item, x) < 0);
  }

  indexOf(item, start, end) {
    const index = this.sortedIndex(item, start, end);
    return index < this.length && this._order.compare(this.get(index), item) === 0
      ? index : -1;
  }

  distinct(selector, equator) {
    return selector != null || equator != null
      ? super.distinct(selector, equator)
      : new SortedIterableDistinct(this, this._order);
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

  filter(pred) {
    return super.filter(pred).withOrder(this._order);
  }

  skipWhile(pred) {
    return super.skipWhile(pred).withOrder(this._order);
  }

  takeWhile(pred) {
    return super.takeWhile(pred).withOrder(this._order);
  }
}

class SortedIterableDistinct extends SortedIterable {
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
  return new SortedIterable(this, orders(...orderings));
};

function _sortedIndex(iterable, start, end, selectLeft) {
  if (start == null) {
    start = 0;
  }
  if (end == null) {
    end = iterable.length;
  }
  while (start < end) {
    const mid = start + end >>> 1;
    if (selectLeft(iterable.get(mid))) {
      end = mid;
    }
    else {
      start = mid + 1;
    }
  }
  return start;
}
