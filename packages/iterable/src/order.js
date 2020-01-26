export class Order {
  constructor() {
    if (new.target === Order) {
      throw new TypeError('Cannot construct Order instances directly');
    }
  }
}

export class SimpleOrder extends Order {
  constructor(selector, comparator) {
    if (new.target === SimpleOrder) {
      throw new TypeError('Cannot construct SimpleOrder instances directly');
    }
    super();
    this._selector = selector ?? (x => x);
    this._comparator = comparator ?? compare;
  }
}

export class AscendingOrder extends SimpleOrder {
  constructor(selector, comparator) {
    super(selector, comparator);
  }

  compare(x, y) {
    return this._comparator(this._selector(x), this._selector(y));
  }
}

export class DescendingOrder extends SimpleOrder {
  constructor(selector, comparator) {
    super(selector, comparator);
  }

  compare(x, y) {
    return this._comparator(this._selector(y), this._selector(x));
  }
}

export class ComplexOrder extends Order {
  constructor(orders) {
    super();
    this._orders = orders.length > 0
      ? orders.map(order => order instanceof Order ? order : asc(order))
      : [asc()];
  }

  compare(x, y) {
    return this._orders.reduce((result, order) =>
      result || order.compare(x, y), 0);
  }
}

export function asc(selector, comparator) {
  return new AscendingOrder(selector, comparator);
}

export function desc(selector, comparator) {
  return new DescendingOrder(selector, comparator);
}

export function orders(...orders) {
  switch (orders.length) {
    case 0:
      return new asc();
    case 1:
      if (orders[0] instanceof Order) {
        return orders[0];
      }
      else {
        return asc(orders[0]);
      }
  }
  return new ComplexOrder(orders);
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
