import {gammaLog} from './gamma.js';

// Transpiled from
// https://github.com/mathnet/mathnet-numerics/blob/master/src/Numerics/SpecialFunctions/Beta.cs

/**
 * The beta function.
 *
 * @param      {number}  x       x > 0
 * @param      {number}  y       y > 0
 * @returns    {number}  A function value.
 */
export function beta(x, y) {
  return Math.exp(betaLog(x, y));
}

/**
 * A natural logarithm of the beta function.
 *
 * @param      {number}  x       x > 0
 * @param      {number}  y       y > 0
 * @returns    {number}  A function value.
 */
export function betaLog(x, y) {
  assert(x > 0);
  assert(y > 0);
  return gammaLog(x) + gammaLog(y) - gammaLog(x + y);
}

/**
 * The incomplete beta function.
 *
 * @param      {number}  a       a >= 0
 * @param      {number}  b       b >= 0
 * @param      {number}  x       0 <= x <= 1
 * @returns    {number}  A function value.
 */
export function betaIncomplete(a, b, x) {
  return betaRegularized(a, b, x) * beta(a, b);
}

/**
 * The regularized incomplete beta function.
 *
 * @param      {number}  a       a >= 0
 * @param      {number}  b       b >= 0
 * @param      {number}  x       0 <= x <= 1
 * @returns    {number}  A function value.
 */
export function betaRegularized(a, b, x) {
  assert(a >= 0);
  assert(b >= 0);
  assert(x >= 0 && x <= 1);

  const bt = x === 0 || x === 1
    ? 0
    : Math.exp(gammaLog(a + b) - gammaLog(a) - gammaLog(b) + a * Math.log(x) + b * Math.log(1 - x));

  const symmetryTransformation = x >= (a + 1) / (a + b + 2);

  // https://en.wikipedia.org/wiki/Continued_fraction
  // TODO: Refactor the following

  const fpmin = Number.MIN_VALUE / Number.EPSILON;

  if (symmetryTransformation) {
    x = 1 - x;
    const swap = a;
    a = b;
    b = swap;
  }

  const qab = a + b;
  const qap = a + 1;
  const qam = a - 1;
  let c = 1;
  let d = 1 - qab * x / qap;

  if (Math.abs(d) < fpmin) {
    d = fpmin;
  }

  d = 1 / d;
  let h = d;

  for (let m = 1, m2 = 2; m <= 50000; m++, m2 += 2) {
    let aa = m * (b - m) * x / ((qam + m2) * (a + m2));
    d = 1 + aa * d;

    if (Math.abs(d) < fpmin) {
      d = fpmin;
    }

    c = 1 + aa / c;
    if (Math.abs(c) < fpmin) {
      c = fpmin;
    }

    d = 1 / d;
    h *= d * c;
    aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
    d = 1 + aa * d;

    if (Math.abs(d) < fpmin) {
      d = fpmin;
    }

    c = 1 +  aa / c;

    if (Math.abs(c) < fpmin) {
      c = fpmin;
    }

    d = 1 / d;
    const del = d * c;
    h *= del;

    if (Math.abs(del - 1) <= Number.EPSILON) {
      break;
    }
  }

  return symmetryTransformation ? 1 - bt * h / a : bt * h / a;
}
