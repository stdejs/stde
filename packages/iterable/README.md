The API is made as close as possible to
1. JavaScript Arrays
2. .NET LINQ
3. Java Stream API


The code is a little bit longer, but it's simpler.
One always uses .filter(pred) to filter an iterable.
One doesn't have to remember that, single(), first(), count(), etc. can take predicate as an extra parameter.
Also single(), first() takes an optional defaultValue.
Two optional parameters (defaultValue and predicate) will make the API is very ugly and hard to remember.
It's unclear which of the parameters should be first.


iterable.single(pred)
iterable.filter(pred).single()


iterable.count(pred)
iterable.filter(pred).length

The only exclusion from this rule are methods already defined for the Array type.
For example iterable.find(pred) can be replaced by iterable.filter(pred).first(undefined)
But we define this method anyway to make Iterable compatible with Array.


We don't define .abs(), .negate(), .sum(), .product() etc. operations for
iterable, because iterables are not intended for hard mathematical calculations.
Matrix package should be used instead.


Analogs:
https://lodash.com/
https://github.com/d3/d3-array
https://github.com/winterbe/sequency
https://github.com/labs42io/itiriri
https://github.com/labs42io/itiriri-async
https://github.com/Xotic750/reiterate
https://fitzgen.github.io/wu.js/
