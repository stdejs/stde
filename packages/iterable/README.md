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
1. LINQ
2. Java Stream API
3. JavaScript Arrays
4. https://lodash.com/
5. https://github.com/winterbe/sequency
6. https://github.com/d3/d3-array
7. https://github.com/labs42io/itiriri
8. https://github.com/labs42io/itiriri-async (has a similar interface to a sync variant)
9. https://fitzgen.github.io/wu.js/
10. https://github.com/Xotic750/reiterate (no doc, sources is 4k LOC single file)


| @stde/iterable                  | LINQ               | Stream API        | JavaScript Array | Lodash            | sequency                                 | d3-array       | itiriri       | wu.js      |
|---------------------------------|--------------------|-------------------|------------------|-------------------|------------------------------------------|----------------|---------------|------------|
| append                          | Append             |                   |                  |                   | plus                                     |                |               |            |
| chunk                           |                    |                   |                  | chunk             | chunk                                    |                |               | chunk      |
| concat                          | Concat             | concat            | concat           | concat            | plus                                     |                | concat        | chain      |
| difference                      |                    |                   |                  | difference        | minus                                    |                | exclude       |            |
|                                 |                    |                   |                  | differenceBy      |                                          |                |               |            |
|                                 |                    |                   |                  | differenceWith    |                                          |                |               |            |
| distinct                        | Distinct           | distinct          |                  | uniq              | distinct                                 |                | distinct      | unique     |
| distinct                        |                    |                   |                  | sortedUniq        |                                          |                |               |            |
|                                 |                    |                   |                  | uniqBy            | distinctBy                               |                |               |            |
|                                 |                    |                   |                  | sortedUniqBy      |                                          |                |               |            |
|                                 |                    |                   |                  | uniqWith          |                                          |                |               |            |
| isDistinct                      |                    |                   |                  |                   |                                          |                |               |            |
| filter                          | Where              | filter            | filter           | filter            | filter, filterIndexed                    |                | filter        | filter     |
| filter(!pred)                   |                    |                   |                  | reject            | filterNot                                |                |               | reject     |
| ofType                          | OfType             |                   |                  |                   |                                          |                |               |            |
| except                          | Except             |                   |                  | without           |                                          |                |               |            |
| except(null)                    |                    |                   |                  |                   | filterNotNull                            |                |               |            |
| find                            |                    | findFirst         | find             | find              | find                                     |                | find          | find       |
|                                 |                    |                   |                  | findLast          | findLast                                 |                | findLast      |            |
|                                 |                    | findAny           |                  |                   |                                          |                |               |            |
| slice                           |                    |                   | slice            |                   |                                          |                | slice         | slice      |
|                                 |                    |                   |                  |                   |                                          |                | splice        |            |
| except(null, undefined).slice() |                    |                   |                  | slice             |                                          |                |               |            |
| flatMap                         | SelectMany         | flatMap           | flatMap          | flatMap           | flatMap                                  |                |               |            |
|                                 |                    |                   |                  | flatMapDeep       |                                          |                |               |            |
|                                 |                    |                   |                  | flatMapDepth      |                                          |                |               |            |
| flat                            |                    |                   | flat             | flatten           | flatten                                  |                |               | flatten    |
| flat                            |                    |                   | flat             | flattenDeep       |                                          |                |               |            |
| flat                            |                    |                   | flat             | flattenDepth      |                                          |                | flat          |            |
| groupBy                         | GroupBy            |                   |                  | groupBy           | groupBy                                  | groups         | groupBy       |            |
| groupBy?                        |                    |                   |                  |                   |                                          | group          |               |            |
| groupBy?                        |                    |                   |                  |                   |                                          | rollup         |               |            |
| groupBy?                        |                    |                   |                  |                   |                                          | rollups        |               |            |
| intersect                       | Intersect          |                   |                  | intersection      |                                          |                | intersect     |            |
|                                 |                    |                   |                  | intersectionBy    |                                          |                |               |            |
|                                 |                    |                   |                  | intersectionWith  |                                          |                |               |            |
| map                             | Select             | map               | map              | map               | map, mapIndexed                          |                | map           | map, pluck |
| map().except(null)              |                    |                   |                  |                   | mapNotNull                               |                |               |            |
|                                 |                    |                   |                  |                   |                                          |                |               | concatMap  |
|                                 |                    |                   |                  |                   |                                          |                |               | spreadMap  |
| orderBy                         | OrderBy            | sorted            |                  | orderBy           | sorted, sortedBy, sortedWith             |                | sort          |            |
| orderBy                         | OrderByDescending  |                   |                  | orderBy           | sortedDescending, sortedByDescending     |                |               |            |
| orderBy                         |                    |                   |                  | sortBy            |                                          |                |               |            |
|                                 | ThenBy             |                   |                  |                   |                                          |                |               |            |
|                                 | ThenByDescending   |                   |                  |                   |                                          |                |               |            |
| permute                         |                    |                   |                  |                   |                                          | permute        |               |            |
| prepend                         | Prepend            |                   |                  |                   |                                          |                | prepend       |            |
| reverse                         | Reverse            |                   |                  |                   | reverse                                  |                | reverse       |            |
| skip                            | Skip               | skip              |                  | drop              | drop                                     |                | skip          | drop       |
| skip(1)                         |                    |                   |                  | tail              |                                          |                | skip(1)       |            |
| skip(-n)                        | TakeLast           |                   |                  | takeRight         |                                          |                | skip(-n)      |            |
| skipWhile                       | SkipWhile          |                   |                  | dropWhile         | dropWhile                                |                | skipWhile     | dropWhile  |
|                                 |                    |                   |                  | dropRightWhile    |                                          |                |               |            |
| take                            | Take               | limit             |                  | take              | take                                     |                | take          | take       |
| take(-1)                        |                    |                   |                  | initial           |                                          |                | take(-1)      |            |
| take(-n)                        | SkipLast           |                   |                  | dropRight         |                                          |                | take(-n)      |            |
| takeWhile                       | TakeWhile          |                   |                  | takeWhile         | takeWhile                                |                | takeWhile     | takeWhile  |
|                                 |                    |                   |                  | takeRightWhile    |                                          |                |               |            |
| symmetricDifference             |                    |                   |                  | xor               |                                          |                |               |            |
|                                 |                    |                   |                  | xorBy             |                                          |                |               |            |
|                                 |                    |                   |                  | xorWith           |                                          |                |               |            |
| zip                             | Zip                |                   |                  | zip               | zip                                      | zip            |               | zip        |
|                                 |                    |                   |                  | zipObject         |                                          |                |               |            |
|                                 |                    |                   |                  | zipObjectDeep     |                                          |                |               |            |
|                                 |                    |                   |                  | zipWith           |                                          |                |               | zipWith    |
|                                 |                    |                   |                  |                   |                                          |                |               | zipLongest |
| groupBy?                        |                    |                   |                  | countBy           |                                          |                |               |            |
| groupBy?                        |                    |                   |                  | keyBy             |                                          |                |               |            |
| groupBy?                        |                    |                   |                  | partition         | partition                                |                |               |            |
|                                 |                    |                   |                  | invokeMap         |                                          |                |               |            |
|                                 |                    |                   |                  | sample            |                                          |                |               |            |
|                                 |                    |                   |                  | sampleSize        |                                          |                |               |            |
|                                 |                    |                   |                  | shuffle           |                                          |                | shuffle       |            |
|                                 |                    |                   |                  |                   |                                          | quickselect    |               |            |
|                                 |                    |                   |                  |                   |                                          | cross          |               |            |
|                                 |                    |                   |                  |                   |                                          | merge          |               |            |
|                                 |                    |                   |                  |                   |                                          | pairs          |               |            |
|                                 |                    |                   |                  |                   |                                          | ticks          |               |            |
|                                 |                    |                   |                  |                   |                                          | transpose      |               |            |
|                                 |                    |                   |                  |                   |                                          | bin            |               |            |
| map(cast)                       | Cast               |                   |                  |                   |                                          |                |               |            |
|                                 | GroupJoin          |                   |                  |                   |                                          |                | groupJoin     |            |
|                                 | Join               |                   |                  |                   |                                          |                | join          |            |
|                                 |                    |                   |                  |                   |                                          |                | leftJoin      |            |
|                                 |                    |                   |                  |                   |                                          |                | rightJoin     |            |
|                                 |                    | peek              |                  |                   |                                          |                |               | tap        |
|                                 |                    |                   |                  |                   | onEach                                   |                |               |            |
|                                 |                    | parallel          |                  |                   |                                          |                |               |            |
|                                 |                    | sequential        |                  |                   |                                          |                |               |            |
|                                 |                    | spliterator       |                  |                   |                                          |                |               |            |
|                                 |                    |                   |                  |                   | joinTo, joinToString                     |                |               |            |
|                                 |                    |                   |                  |                   | merge                                    |                |               |            |
|                                 |                    |                   |                  |                   | withIndex                                |                | entries       |            |
|                                 |                    |                   |                  | compact           |                                          |                |               |            |
|                                 |                    |                   |                  |                   |                                          |                |               | enumerate  |
|                                 |                    |                   |                  |                   |                                          |                | keys          |            |
|                                 |                    |                   |                  |                   |                                          |                | values        |            |
|                                 |                    |                   |                  |                   |                                          |                | fill          |            |
|                                 |                    |                   |                  |                   |                                          |                |               | asyncEach  |
|                                 |                    |                   |                  |                   |                                          |                |               | cycle      |
|                                 |                    |                   |                  |                   |                                          |                |               | tee        |
|---------------------------------|--------------------|-------------------|------------------|-------------------|------------------------------------------|----------------|---------------|------------|
| length                          | Count              | count             | length           | size              |                                          |                |               |            |
| filter(!isNaN).length           |                    |                   |                  |                   |                                          | count          |               |            |
| filter().length                 | Count              |                   |                  |                   | count                                    |                | length        |            |
|                                 | LongCount          |                   |                  |                   |                                          |                |               |            |
| get                             | ElementAt          |                   |                  | nth               | elementAt                                |                | nth           | nth        |
|                                 | ElementAtOrDefault |                   |                  |                   | elementAtOrElse                          |                |               |            |
|                                 |                    |                   |                  |                   | elementAtOrNull                          |                |               |            |
| empty                           | Empty              |                   |                  |                   |                                          |                |               |            |
|                                 | SequenceEqual      |                   |                  |                   |                                          |                |               |            |
| toArray                         | ToArray            | toArray           |                  |                   | toArray, toList                          |                |               | toArray    |
| map().toArray                   |                    |                   |                  |                   |                                          |                | toArray       |            |
| groupBy().toMap                 |                    |                   |                  |                   |                                          |                | toGroups      |            |
|                                 |                    |                   |                  |                   |                                          |                | toMap         |            |
| toSet                           | ToHashSet          |                   |                  |                   | toSet                                    |                | toSet         |            |
| toMap                           | ToDictionary       |                   |                  |                   | toMap                                    |                |               |            |
| map().toMap                     |                    |                   |                  |                   | associate, associateBy                   |                |               |            |
|                                 | ToLookup           |                   |                  |                   |                                          |                |               |            |
|                                 | ToList             |                   |                  |                   |                                          |                |               |            |
|                                 |                    |                   |                  | fromPairs         |                                          |                |               |            |
| first                           | First              |                   |                  | head (first)      |                                          |                | first         |            |
| first                           | FirstOrDefault     |                   |                  |                   |                                          |                |               |            |
| filter().first                  | First              |                   |                  |                   | first                                    |                |               |            |
| filter().first(null)            | First              |                   |                  |                   | firstOrNull                              |                |               |            |
| reverse().first()               | Last               |                   |                  | last              | last                                     |                | last          |            |
|                                 |                    |                   |                  |                   | lastOrNull                               |                |               |            |
| reverse().first()               | LastOrDefault      |                   |                  | last              |                                          |                |               |            |
| single                          | Single             |                   |                  |                   | single, singleOrNull                     |                |               |            |
| single                          | SingleOrDefault    |                   |                  |                   |                                          |                |               |            |
| min                             |                    | min               |                  |                   | min, minBy, minWith                      | least          | min           |            |
| map().min                       | Min                |                   |                  |                   |                                          | min            |               |            |
| max                             |                    | max               |                  |                   | max, maxBy, maxWith                      | greatest       | max           |            |
| map().max                       | Max                |                   |                  |                   |                                          | max            |               |            |
| extent                          |                    |                   |                  |                   |                                          | extent         |               |            |
| minIndex                        |                    |                   |                  |                   |                                          | minIndex       |               |            |
| minIndex                        |                    |                   |                  |                   |                                          | leastIndex     |               |            |
| maxIndex                        |                    |                   |                  |                   |                                          | maxIndex       |               |            |
| maxIndex                        |                    |                   |                  |                   |                                          | greatestIndex  |               |            |
| every                           | All                | allMatch          | every            | every             | all                                      |                | every         | every      |
| some                            | Any                | anyMatch          | some             | some              | any                                      |                | some          | some       |
| filter(pred).empty              |                    | noneMatch         |                  |                   | none                                     |                |               |            |
| findIndex                       |                    |                   | findIndex        | findIndex         | indexOfFirst                             |                | findIndex     |            |
|                                 |                    |                   |                  | findLastIndex     | indexOfLast                              |                | findLastIndex |            |
| indexOf                         |                    |                   | indexOf          | indexOf           | indexOf                                  |                | indexOf       |            |
|                                 |                    |                   | lastIndexOf      | lastIndexOf       |                                          |                | lastIndexOf   |            |
| indexOf                         |                    |                   |                  | sortedIndexOf     |                                          |                |               |            |
|                                 |                    |                   |                  | sortedLastIndexOf |                                          |                |               |            |
| includes                        | Contains           |                   | includes         | includes          | contains                                 |                | includes      | has        |
| reduce                          | Aggregate          | reduce            | reduce           | reduce            | fold, foldIndexed, reduce, reduceIndexed |                | reduce        | reduce     |
|                                 |                    | collect           |                  |                   |                                          |                |               |            |
| reduceRight                     |                    |                   | reduceRight      | reduceRight       |                                          |                | reduceRight   |            |
|                                 |                    |                   |                  |                   |                                          |                |               | reductions |
| join                            |                    |                   | join             | join              |                                          |                |               |            |
| sum                             |                    |                   |                  |                   | sum                                      |                |               |            |
| map().sum                       | Sum                |                   |                  |                   | sumBy                                    | sum            | sum           |            |
| product                         |                    |                   |                  |                   |                                          |                |               |            |
| mean                            | Average            | average           |                  |                   | average                                  |                |               |            |
| map().mean                      | Average            |                   |                  |                   |                                          | mean           | average       |            |
|                                 |                    | summaryStatistics |                  |                   |                                          |                |               |            |
|                                 |                    |                   |                  |                   |                                          | median         |               |            |
|                                 |                    |                   |                  |                   |                                          | cumsum         |               |            |
|                                 |                    |                   |                  |                   |                                          | quantile       |               |            |
|                                 |                    |                   |                  |                   |                                          | quantileSorted |               |            |
|                                 |                    |                   |                  |                   |                                          | variance       |               |            |
|                                 |                    |                   |                  |                   |                                          | deviation      |               |            |
| union                           | Union              |                   |                  | union             |                                          |                | union         |            |
|                                 |                    |                   |                  | unionBy           |                                          |                |               |            |
|                                 |                    |                   |                  | unionWith         |                                          |                |               |            |
| unzip                           |                    |                   |                  | unzip             | unzip                                    |                |               | unzip      |
|                                 |                    |                   |                  | unzipWith         |                                          |                |               |            |
| forEach                         |                    | forEachOrdered    | forEach          | forEach           |                                          |                | forEach       | forEach    |
|                                 |                    | forEach           |                  |                   |                                          |                |               |            |
|                                 |                    |                   |                  |                   |                                          |                |               | invoke     |
| reverse().forEach               |                    |                   |                  | forEachRight      | forEach, forEachIndexed                  |                |               |            |
|                                 | DefaultIfEmpty     |                   |                  |                   |                                          |                |               |            |
|---------------------------------|--------------------|-------------------|------------------|-------------------|------------------------------------------|----------------|---------------|------------|
| sortedIndex                     |                    |                   |                  | sortedIndex       |                                          | bisectLeft     |               |            |
|                                 |                    |                   |                  | sortedIndexBy     |                                          |                |               |            |
| sortedIndexRight                |                    |                   |                  | sortedLastIndex   |                                          | bisect         |               |            |
| sortedIndexRight                |                    |                   |                  | sortedLastIndex   |                                          | bisectRight    |               |            |
|                                 |                    |                   |                  | sortedLastIndexBy |                                          |                |               |            |
|---------------------------------|--------------------|-------------------|------------------|-------------------|------------------------------------------|----------------|---------------|------------|
| range                           | Range              | range             |                  |                   |                                          | range          |               |            |
|                                 |                    | rangeClosed       |                  |                   |                                          |                |               |            |
|                                 | Repeat             |                   |                  |                   |                                          |                |               | repeat     |
|                                 |                    | empty             |                  |                   |                                          |                |               |            |
|                                 |                    | generate          |                  |                   |                                          |                |               |            |
|                                 |                    | iterate           |                  |                   |                                          |                |               |            |
|                                 |                    |                   |                  |                   |                                          |                |               | count      |
|                                 |                    |                   |                  |                   |                                          |                |               | entries    |
|                                 |                    |                   |                  |                   |                                          |                |               | keys       |
|                                 |                    |                   |                  |                   |                                          |                |               | values     |

Shuffling operations:
append
chunk
concat
filter[pred]
reject[pred]
flat
ofType
permute
prepend
reverse
skip
skipWhile[pred]
slice
take
takeWhile[pred]
unzip
zip

Mapping operations:
flatMap[tr]
map[tr]

Equivalence operations:
difference[eq]
distinct[eq]
except[eq]
groupBy[eq]
intersect[eq]
join[eq]
symmetricDifference[eq]
union[eq]

Ordering operations:
orderBy[ord]


empty
every[pred]
find[pred]
findIndex[pred]
first[pred?]
forEach
get
length
reduce
reduceRight
single[pred?]
some
sortedIndex[ord]
sortedIndexRight[ord]
toArray
toMap
toSet

includes[eq]
indexOf[eq]
isDistinct[eq]

Reducers with predefined binary op:
extent[sel,ord]
max[sel,ord]
maxIndex[sel,ord]
mean[sel]
sum[sel]
product[sel]
min[sel,ord]
minIndex[sel,ord]


range


Properties:
1. indexed
2. sorted
3. distinct (using a key or a default key)
4. keyed

From Java Stream API: ORDERED, DISTINCT, SORTED, SIZED, NONNULL, IMMUTABLE, CONCURRENT, and SUBSIZED
