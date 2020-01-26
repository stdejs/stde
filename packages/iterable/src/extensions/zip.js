import {IterableBase} from '../iterable-base.js';

class IterableZip extends IterableBase {
  constructor(iterables) {
    super();
    this._iterables = iterables;
  }

  *[Symbol.iterator]() {
    const iterators = this._iterables.map(iterable => iterable[Symbol.iterator]());
    let items;
    while ((items = iterators.map(iterator => iterator.next())).every(item => !item.done)) {
      yield items.map(item => item.value);
    }
  }
}

IterableBase.prototype.zip = function (...iterables) {
  return new IterableZip([this, ...iterables]);
};
