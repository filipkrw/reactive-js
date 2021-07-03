import {
  concat,
  EMPTY,
  from,
  interval,
  merge,
  Observable,
  of,
  pipe,
  range,
  throwError,
  timer,
  zip,
} from 'rxjs'
import {
  buffer,
  bufferCount,
  bufferTime,
  catchError,
  concatWith,
  first,
  map,
  mergeMap,
  mergeWith,
  reduce,
  retry,
  scan,
  single,
  skip,
  skipUntil,
  skipWhile,
  take,
  takeUntil,
  takeWhile,
  tap,
  toArray,
  zipWith,
} from 'rxjs/operators'
import { createSubscriber, getApiError, getNumbers } from '../util'

/*
	Merge / Concat
*/

// interval(1000)
//   .pipe(mergeWith(interval(500)), take(5))
//   .subscribe(createSubscriber('mergeWith'))

// merge(
//   interval(1000).pipe(map((number: Number) => `First: ${number}`)),
//   interval(500).pipe(map((number: Number) => `Second: ${number}`))
// )
//   .pipe(take(5))
//   .subscribe(createSubscriber('merge'))

// range(1, 5)
//   .pipe(concatWith(range(10, 3)))
//   .subscribe(createSubscriber('concat'))

/*
	MergeMap / SwitchMap
*/

// from(getNumbers())
//   .pipe(mergeMap((numbers: any) => from(numbers)))
//   .subscribe(createSubscriber('numbers'))

/*
	Reduce / Scan
*/

// range(1, 10)
//   .pipe(reduce((acc, value) => acc + value))
//   .subscribe(createSubscriber('reduce'))

// Scan is same as reduce, but emits accumulator on every new value
// range(1, 10)
//   .pipe(scan((acc, value) => acc + value))
//   .subscribe(createSubscriber('scan'))

// range(1, 10)
//   .pipe(
//     map((i) => i * i),
//     scan(([last, _]: any[], value) => [value, last], [])
//   )
//   .subscribe(createSubscriber('scan'))

/*
  Buffer / ToArray
*/

// range(1, 99).pipe(bufferCount(20)).subscribe(createSubscriber('items'))

// interval(500).pipe(bufferTime(2000)).subscribe(createSubscriber('bufferTime'))

// // Buffer every time the observable in the buffer function emits a value
// interval(500)
//   .pipe(take(10), buffer(interval(2000)))
//   .subscribe(createSubscriber('buffer'))

// range(1, 10).pipe(toArray()).subscribe(createSubscriber('range'))

/*
  Single / Skip / Take
*/

// // Error if more than one emited
// from([1]).pipe(single()).subscribe(createSubscriber('single'))

// from([1, 2, 3, 4]).pipe(skip(2)).subscribe(createSubscriber('skip'))

// interval(500)
//   .pipe(
//     skipWhile((i) => i < 3),
//     takeWhile((i) => i < 10)
//   )
//   .subscribe(createSubscriber('skipWhile'))

// interval(500)
//   .pipe(skipUntil(timer(1000)), takeUntil(timer(3000)))
//   .subscribe(createSubscriber('skipUntil'))

/*
  Zip / WithLatestFrom / CombineLatest
*/

// range(1, 10)
//   .pipe(
//     zipWith(interval(500)),
//     map(([a, b]) => a * b)
//   )
//   .subscribe(createSubscriber('zipWith'))

/*
  Error Handling
  On error, observer unsubsribes from the source, unless caught
*/

// concat(
//   of(42),
//   throwError(() => new Error('ERROR')),
//   of(10)
// ).subscribe(createSubscriber('catch'))

getApiError()
  .pipe(
    retry(3),
    catchError((error) => of(error))
  )
  .subscribe(createSubscriber('api'))
