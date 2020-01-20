// Transpiled from https://github.com/mathnet/mathnet-numerics/blob/master/src/Numerics/Precision.Equality.cs

/**
 * @param x
 * @param y
 * @param maxAbsError
 */
export function almostEqual(x, y, maxAbsError) {
  return almostEqualNorm(x, y, x - y, maxAbsError);
}

/**
 * @param x
 * @param y
 * @param diff
 * @param maxAbsError
 */
export function almostEqualNorm(x, y, diff, maxAbsError = 1e-15) {
  if (isNaN(x) || isNaN(y)) {
    return false;
  }
  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    return x === y;
  }
  return Math.abs(diff) < maxAbsError;
}
