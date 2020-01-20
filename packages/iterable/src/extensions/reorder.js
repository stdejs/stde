import {IterableBase} from '../iterable-base.js';

class IterableReorder extends IterableBase {
  constructor(iterable, order) {
    super();
    this._iterable = iterable;
    this._order = order;
  }

  *[Symbol.iterator]() {
    // TODO: Lazy implementation?
    const items = [...this._iterable];
    for (let i = 0; i < items.length; i++) {
      yield items[this._order[i]];
    }
  }
}

IterableBase.prototype.reorder = function (order) {
  return new IterableReorder(this, order);
};
