export class Equality {
  constructor() {
    if (new.target === Equality) {
      throw new TypeError('Cannot construct Equality instances directly');
    }
  }
}

export class SimpleEquality extends Equality {
  constructor(selector, equator) {
    super();
    this._selector = selector ?? (x => x);
    this._equator = equator ?? deepEqual;
  }

  key(x) {
    return this._selector(x);
  }

  equals(x, y) {
    return this._equator(this._selector(x), this._selector(y));
  }
}

export class ComplexEquality extends Equality {
  constructor(equalities) {
    super();
    this._equalities = equalities.length > 0
      ? equalities.map(equality => equality instanceof Equality ? equality : eq(equality))
      : [eq()];
  }

  key(x) {
    return this._equalities.map(eq => eq.key(x));
  }

  equals(x, y) {
    return this._equalities.every(eq.equals(x, y));
  }
}

export function eq(selector, equator) {
  return new SimpleEquality(selector, equator);
}

export function eqs(...equalities) {
  switch (equalities.length) {
    case 0:
      return new eq();
    case 1:
      if (equalities[0] instanceof Equality) {
        return equalities[0];
      }
      else {
        return eq(equalities[0]);
      }
  }
  return new ComplexEquality(equalities);
}

// function strictEquality(x, y) {
//   return x === y;
// }

function deepEqual(obj1, obj2) {
  if (typeof obj1 !== typeof obj2) {
    return false;
  }
  if (obj1 === obj2) {
    return true;
  }
  if (obj1 instanceof Array && obj2 instanceof Array) {
    if (obj1.length !== obj2.length) {
      return false;
    }
    for (let i = 0; i < obj1.length; i++) {
      if (obj1[i] !== obj2[i]) {
        return false;
      }
    }
    return true;
  }
  throw new Error(`Equality operator not implemented for ${obj1} and ${obj2}`);
}
