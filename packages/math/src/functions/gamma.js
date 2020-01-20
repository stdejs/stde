import {MathConst} from '../math-const.js';
import {almostEqual} from '../precision.js';

// Transpiled from
// https://github.com/mathnet/mathnet-numerics/blob/master/src/Numerics/SpecialFunctions/Gamma.cs
// https://en.wikipedia.org/wiki/Lanczos_approximation
const GAMMA_R = 10.900511;
const GAMMA_DK0 = 2.48574089138753565546e-5;
const GAMMA_DK = [
  +1.05142378581721974210,
  -3.45687097222016235469,
  +4.51227709466894823700,
  -2.98285225323576655721,
  +1.05639711577126713077,
  -1.95428773191645869583e-1,
  +1.70970543404441224307e-2,
  -5.71926117404305781283e-4,
  +4.63399473359905636708e-6,
  -2.71994908488607703910e-9
];

/**
 * The gamma function.
 *
 * @param      {number}    z       The z parameter.
 * @returns    {number}    A function value.
 */
export function gamma(z) {
  return z >= 0.5 ? _gamma(z) : Math.PI / (Math.sin(Math.PI * z) * _gamma(1 - z));
}

/**
 * A natural logarithm of the gamma function.
 *
 * @param      {number}    z       The z parameter.
 * @returns    {number}    A function value.
 */
export function gammaLog(z) {
  return z >= 0.5 ? _gammaLog(z) : MathConst.LOG_PI - Math.log(Math.sin(Math.PI * z)) - _gammaLog(z);
}

/**
 * @ignore
 */
function _gamma(z) {
  return _gammaApprox(z) * MathConst.TWO_SQRT_E_OVER_PI * Math.pow((z - 0.5 + GAMMA_R) / Math.E, z - 0.5);
}

/**
 * @ignore
 */
function _gammaLog(z) {
  return Math.log(_gammaApprox(z)) + MathConst.LOG_TWO_SQRT_E_OVER_PI + (z - 0.5) * Math.log((z - 0.5 + GAMMA_R) / Math.E);
}

/**
 * @ignore
 */
function _gammaApprox(z) {
  return GAMMA_DK.reduce((x, y, i) => x + y / (z + i), GAMMA_DK0);
}

/**
 * The lower incomplete gamma function.
 *
 * @param      {number}    a       a >= 0
 * @param      {number}    x       x >= 0
 * @returns    {number}    A function value.
 */
export function gammaLowerIncomplete(a, x) {
  return gammaLowerRegularized(a, x) * gamma(a);
}

/**
 * The regularized gamma function.
 *
 * @param      {number}    a       a >= 0
 * @param      {number}    x       x >= 0
 * @returns    {number}    A function value.
 */
export function gammaLowerRegularized(a, x) {
  const epsilon = 0.000000000000001;
  const big = 4503599627370496.0;
  const bigInv = 2.22044604925031308085e-16;
  assert(a >= 0);
  assert(x >= 0);

  if (almostEqual(a, 0)) {
    return 1;
  }
  if (almostEqual(x, 0)) {
    return 0;
  }

  const ax = a * Math.log(x) - x - gammaLog(a);
  if (ax < -709.78271289338399) {
    return a < x ? 1 : 0;
  }

  if (x <= 1 || x <= a) {
    let r2 = a;
    let c2 = 1;
    let ans2 = 1;
    do {
      r2 = r2 + 1;
      c2 = c2 * x / r2;
      ans2 += c2;
    } while (c2 / ans2 > epsilon);
    return Math.exp(ax) * ans2 / a;
  }

  let c = 0;
  let y = 1 - a;
  let z = x + y + 1;

  let p3 = 1;
  let q3 = x;
  let p2 = x + 1;
  let q2 = z * x;
  let ans = p2 / q2;

  let error;

  do {
    c++;
    y += 1;
    z += 2;
    const yc = y * c;

    const p = p2 * z - p3 * yc;
    const q = q2 * z - q3 * yc;

    if (q !== 0) {
      const nextans = p / q;
      error = Math.abs((ans - nextans) / nextans);
      ans = nextans;
    }
    else {
      // zero div, skip
      error = 1;
    }

    // shift
    p3 = p2;
    p2 = p;
    q3 = q2;
    q2 = q;

    // normalize fraction when the numerator becomes large
    if (Math.abs(p) > big) {
      p3 *= bigInv;
      p2 *= bigInv;
      q3 *= bigInv;
      q2 *= bigInv;
    }
  } while (error > epsilon);

  return 1 - Math.exp(ax) * ans;
}
