/**
 * @param cond
 * @param error
 * @param kind
 */
export function assert(cond, error, kind) {
  kind = kind || Error;
  if (!cond) {
    throw new kind(error);
  }
}
