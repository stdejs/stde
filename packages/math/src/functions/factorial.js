/**
 * The factorial function.
 *
 * @param      {number}  x       x >= 0
 * @returns    {number}  A function value.
 */
export function factorial(x) {
  let result = 1;
  for (let i = 2; i <= x; i++) {
    result *= i;
  }
  return result;
}
