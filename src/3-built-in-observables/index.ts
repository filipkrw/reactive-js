import { defer, EMPTY, from, interval, NEVER, of, range, throwError, timer } from 'rxjs'
import { take } from 'rxjs/operators'
import { createSubscriber } from '../util'

// interval(500).pipe(take(5)).subscribe(createSubscriber('interval'))

// timer(0, 500).pipe(take(5)).subscribe(createSubscriber('timer'))

// from(generate()).subscribe(createSubscriber('from'))
// function* generate() {
//   yield 3
//   yield 5
//   yield 12
// }

// throwError(() => new Error('This is an error')).subscribe(createSubscriber('error'))

// let sideEffect = 0
// const defer$ = defer(() => {
//   sideEffect++
//   return of(sideEffect)
// })
// defer$.subscribe(createSubscriber('$defer.one'))
// defer$.subscribe(createSubscriber('$defer.two'))
// defer$.subscribe(createSubscriber('$defer.three'))

// EMPTY.subscribe(createSubscriber('empty')) // produces an item and completes
// NEVER.subscribe(createSubscriber('never')) // doesn't produce anything and never completes (why?)

range(3, 3).subscribe(createSubscriber('range'))
