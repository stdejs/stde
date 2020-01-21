export class Order {
  constructor(selector, comparator) {
    this._selector = selector ?? (x => x);
    this._comparator = comparator ?? compare;
  }
}

export class AscendingOrder extends Order {
  constructor(selector, comparator) {
    super(selector, comparator);
  }

  compare(x, y) {
    return this._comparator(this._selector(x), this._selector(y));
  }
}

export class DescendingOrder extends Order {
  constructor(selector, comparator) {
    super(selector, comparator);
  }

  compare(x, y) {
    return this._comparator(this._selector(y), this._selector(x));
  }
}

export function asc(selector, comparator) {
  return new AscendingOrder(selector, comparator);
}

export function desc(selector, comparator) {
  return new DescendingOrder(selector, comparator);
}

export function compare(x, y) {
  if (x < y) {
    return -1;
  }
  if (x > y) {
    return 1;
  }
  if (x === y) {
    return 0;
  }
  throw new Error(`Values not comparable: ${x} and ${y}`);
}

export function compareNumbers(x, y) {
  return x - y;
}
