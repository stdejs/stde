export class Keeper {
  constructor(selector, equator) {
    this._selector = selector ?? (x => x);
    this._equator = equator ?? deepEqual;
    this._seen = new Map();
  }

  seen(item) {
    const values = this._selector(item);
    const hash = hashCode(values.toString());
    const seenValues = this._seen.get(hash);
    if (!seenValues) {
      this._seen.set(hash, [values]);
      return false;
    }
    else if (seenValues.findIndex(x => this._equator(x, values)) == -1) {
      seenValues.push(values);
      return false;
    }
    return true;
  }
}

function hashCode(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(31, h) + s.charCodeAt(i) | 0;
  }
  return h;
}

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
