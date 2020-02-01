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

  _get(index) {
    if (!this._iterable._get) {
      console.log(this._iterable);
    }
    return this._iterable._get(index);
  }

  get order() {
    return this._order;
  }

  sortedIndexOf(item, start, end) {
    return _sortedIndexOf(this, start, end, x => this._order.compare(item, x) <= 0);
  }

  sortedRightIndexOf(item, start, end) {
    return _sortedIndexOf(this, start, end, x => this._order.compare(item, x) < 0);
  }

  indexOf(item, start, end) {
    const index = this.sortedIndexOf(item, start, end);
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
    return this._iterable.filter(pred).withOrder(this._order);
  }

  skipWhile(pred) {
    return this._iterable.skipWhile(pred).withOrder(this._order);
  }

  takeWhile(pred) {
    return this._iterable.takeWhile(pred).withOrder(this._order);
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

function _sortedIndexOf(iterable, start, end, selectLeft) {
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
