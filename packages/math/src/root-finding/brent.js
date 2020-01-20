// import {MathConst} from '../../MathElements/MathConst.js';

// Transpiled from
// https://github.com/mathnet/mathnet-numerics/blob/master/src/Numerics/RootFinding/Brent.cs

// TODO:
// accuracy vs precision
// maxIterations vs maxSteps
// also check argument order

/**
 * @param a
 * @param b
 */
function sign(a, b) {
  return b >= 0 ? a >= 0 ? a : -a : a >= 0 ? -a : a;
}

/**
 * @param a
 * @param b
 * @param maxError
 */
function almostEqualRelative(a, b, maxError) {
  return almostEqualNormRelative(a, b, a - b, maxError);
}

/**
 * @param a
 * @param b
 * @param diff
 * @param maxError
 */
function almostEqualNormRelative(a, b, diff, maxError) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    return a === b;
  }
  if (isNaN(a) || isNaN(b)) {
    return false;
  }
  // if (Math.abs(a) < MathConst.FLOAT64_PRECISION || Math.abs(b) < MathConst.FLOAT64_PRECISION) {
  if (Math.abs(a) < Number.EPSILON || Math.abs(b) < Number.EPSILON) {
    return Math.abs(diff) < maxError;
  }
  if (a === 0 && Math.abs(b) < maxError || b === 0 && Math.abs(a) < maxError) {
    return true;
  }
  return Math.abs(diff) < maxError * Math.max(Math.abs(a), Math.abs(b));
}

/**
 * @param f
 * @param lowerBound
 * @param upperBound
 * @param accuracy
 * @param maxIterations
 */
export function brentFindRoot(f, lowerBound, upperBound, accuracy = 1e-8, maxIterations = 100) {
  let root = upperBound;
  let fmin = f(lowerBound);
  let fmax = f(upperBound);
  let froot = fmax;
  let d = 0;
  let e = 0;
  let xMid = NaN;

  // Root must be bracketed.
  if (Math.sign(fmin) === Math.sign(fmax)) {
    console.error('Root must be bracketed');
    return null;
  }

  for (let i = 0; i <= maxIterations; i++) {
    // adjust bounds
    if (Math.sign(froot) === Math.sign(fmax)) {
      upperBound = lowerBound;
      fmax = fmin;
      e = d = root - lowerBound;
    }

    if (Math.abs(fmax) < Math.abs(froot)) {
      lowerBound = root;
      root = upperBound;
      upperBound = lowerBound;
      fmin = froot;
      froot = fmax;
      fmax = fmin;
    }

    // convergence check
    // const xAcc1 = MathConst.POSITIVE_FLOAT64_PRECISION * Math.abs(root) + 0.5 * accuracy;
    const xAcc1 = Number.EPSILON * Math.abs(root) + 0.5 * accuracy;
    const xMidOld = xMid;
    xMid = (upperBound - root) / 2;

    if (Math.abs(xMid) <= xAcc1 || almostEqualNormRelative(froot, 0, froot, accuracy)) {
      return root;
    }

    if (xMid === xMidOld) {
      // accuracy not sufficient, but cannot be improved further
      return null;
    }

    if (Math.abs(e) >= xAcc1 && Math.abs(fmin) > Math.abs(froot)) {
      // Attempt inverse quadratic interpolation
      const s = froot / fmin;
      let p;
      let q;
      if (almostEqualRelative(lowerBound, upperBound)) {
        p = 2 * xMid * s;
        q = 1 - s;
      }
      else {
        q = fmin / fmax;
        const r = froot / fmax;
        p = s * (2 * xMid * q * (q - r) - (root - lowerBound) * (r - 1));
        q = (q - 1) * (r - 1) * (s - 1);
      }

      if (p > 0) {
        // Check whether in bounds
        q = -q;
      }

      p = Math.abs(p);
      if (2 * p < Math.min(3 * xMid * q - Math.abs(xAcc1 * q), Math.abs(e * q))) {
        // Accept interpolation
        e = d;
        d = p / q;
      }
      else {
        // Interpolation failed, use bisection
        d = xMid;
        e = d;
      }
    }
    else {
      // Bounds decreasing too slowly, use bisection
      d = xMid;
      e = d;
    }

    lowerBound = root;
    fmin = froot;
    if (Math.abs(d) > xAcc1) {
      root += d;
    }
    else {
      root += sign(xAcc1, xMid);
    }

    froot = f(root);
  }
  return null;
}
