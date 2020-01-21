import {IterableBase} from '../iterable-base.js';
import {Iterable} from '../iterable.js';

class IterableGroupBy extends IterableBase {
  constructor(iterable, keySelector, resultSelector) {
    super();
    this._iterable = iterable;
    this._keySelector = keySelector;
    this._resultSelector = resultSelector;
  }

  *[Symbol.iterator]() {
    const map = new Map();
    let i = 0;
    for (const item of this._iterable) {
      const key = this._keySelector(item, i++, this._iterable);
      const group = map.get(key);
      if (group !== undefined) {
        group.push(item);
      }
      else {
        map.set(key, [item]);
      }
    }
    for (const [key, value] of map) {
      yield [key, this._resultSelector(key, new Iterable(value))];
    }
  }
}

IterableBase.prototype.groupBy = function (keySelector, resultSelector) {
  if (resultSelector === undefined) {
    resultSelector = (key, items) => items.toArray();
  }
  return new IterableGroupBy(this, keySelector, resultSelector);
};
