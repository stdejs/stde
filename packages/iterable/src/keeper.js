export class Keeper {
  // constructor(selector, equator) {
  //   this._selector = selector ?? (x => x);
  //   this._equator = equator ?? deepEqual;
  //   this._seen = new Map();
  // }
  constructor(equality) {
    this._equality = equality;
    this._seen = new Map();
  }

  seen(item) {
    const values = this._equality.key(item);
    const hash = hashCode(values.toString());
    const seenValues = this._seen.get(hash);
    if (!seenValues) {
      this._seen.set(hash, [values]);
      return false;
    }
    else if (seenValues.findIndex(x => this._equality.equals(x, values)) == -1) {
      seenValues.push(values);
      return false;
    }
    return true;
  }
}

export class OrderedKeeper {
  constructor(order) {
    this._order = order;
    this._prevIsSet = false;
  }

  seen(item) {
    if (!this._prevIsSet) {
      this._prev = item;
      this._prevIsSet = true;
      return false;
    }
    const compare = this._order.compare(this._prev, item);
    if (compare > 0) {
      throw new Error(`An iterable is not ordered: ${this._prev} > ${item}`);
    }
    this._prev = item;
    return compare === 0;
  }
}

function hashCode(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(31, h) + s.charCodeAt(i) | 0;
  }
  return h;
}
