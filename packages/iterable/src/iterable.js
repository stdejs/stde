import {IterableBase} from './iterable-base.js';

/**
 * Iterable.
 *
 */
export class Iterable extends IterableBase {
  constructor(iterable) {
    super();
    this._iterable = iterable;
  }

  [Symbol.iterator]() {
    return this._iterable[Symbol.iterator]();
  }
}
