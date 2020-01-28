import {IterableBase} from './iterable-base.js';
// import {eqs} from './equality.js';

// export class KeyedIterable extends IterableBase {
//   constructor(iterable, equality) {
//     super();
//     this._iterable = iterable;
//     this._equality = equality;
//   }

//   *[Symbol.iterator]() {
//     yield* this._iterable;
//   }

//   get equality() {
//     return this._equality;
//   }

//   keys() {
//     return new KeyedIterableKeys(this);
//   }
// }

export class KeyedIterableKeys extends IterableBase {
  constructor(iterable) {
    super();
    this._iterable = iterable;
  }

  *[Symbol.iterator]() {
    yield* this._iterable.map(item => this._iterable.equality.key(item));
  }
}

// IterableBase.prototype.withEquality = function (...equators) {
//   return new KeyedIterable(this, eqs(...equators));
// };

IterableBase.prototype.keys = function () {
  return new KeyedIterableKeys(this);
};
