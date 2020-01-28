import {Iterable} from './iterable.js';
import {IterableRange} from './range.js';
import {IterableArray} from './array.js';

// Import extension methods
import './extensions/append.js';
import './extensions/chunk.js';
import './extensions/concat.js';
import './extensions/difference.js';
import './extensions/distinct.js';
import './extensions/filter.js';
import './extensions/flat.js';
import './extensions/flat-map.js';
import './extensions/group-by.js';
import './extensions/intersect.js';
import './extensions/map.js';
import './extensions/order-by.js';
import './extensions/permute.js';
import './extensions/prepend.js';
import './extensions/reverse.js';
import './extensions/skip.js';
import './extensions/take.js';
import './extensions/xor.js';
import './extensions/zip.js';

import './keyed.js';

export {IterableBase} from './iterable-base.js';
export {Iterable} from './iterable.js';
export {IterableRange} from './range.js';

export * from './order.js';

/**
 * Creates an iterable.
 *
 * @param      {object}    iterable  The iterable.
 * @returns    {Iterable}  { description_of_the_return_value }
 */
export function iter(iterable) {
  if (iterable instanceof Array) {
    return new IterableArray(iterable);
  }
  return new Iterable(iterable);
}

/**
 * Creates an iterable range of numbers.
 *
 * @param      {number}         start        The range start.
 * @param      {number}         end          The range end, not included into sequence.
 * @param      {number}         [step=null]  The optional step, equals either 1 or -1 by default.
 * @returns    {IterableRange}  The iterable range.
 */
export function range(start, end, step = null) {
  return new IterableRange(start, end, step);
}
