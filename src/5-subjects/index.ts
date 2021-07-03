import { AsyncSubject, BehaviorSubject, interval, ReplaySubject, Subject } from 'rxjs'
import { map, take } from 'rxjs/operators'
import { createSubscriber } from '../util'

// const interval$ = interval(1000).pipe(take(3))
// const intervalSubject$ = new Subject()

// interval$.subscribe(intervalSubject$)

// intervalSubject$.subscribe(createSubscriber('sub1'))
// intervalSubject$.subscribe(createSubscriber('sub2'))
// intervalSubject$.subscribe(createSubscriber('sub3'))

// setTimeout(() => {
//   intervalSubject$.subscribe(createSubscriber('LOOK AT ME!'))
// }, 2000)

/*
 */

// const currentUser$ = new BehaviorSubject({ isLoggedIn: false })
// const isLoggedIn$ = currentUser$.pipe(map((u: any) => u.isLoggedIn))

// isLoggedIn$.subscribe(createSubscriber('isLoggedIn'))

// setTimeout(() => {
//   currentUser$.next({ isLoggedIn: true })
// }, 2000)

// setTimeout(() => {
//   isLoggedIn$.subscribe(createSubscriber('delayed'))
// }, 1000)

/*
 */

// const replay$ = new ReplaySubject(3) // keeping track up to 3 items
// replay$.next(1)
// replay$.next(2)

// replay$.subscribe(createSubscriber('replayOne'))

// replay$.next(3)
// replay$.next(4)
// replay$.next(5)

// replay$.subscribe(createSubscriber('replayTwo'))

// replay$.next(6)

/*
  AsyncSubject will only send a value right before it completes;
  similarly to BehaviorSubject, it keeps the final value
 */
const apiCall$ = new AsyncSubject()
apiCall$.next(1)

apiCall$.subscribe(createSubscriber('asyncOne'))
apiCall$.next(2)
apiCall$.complete()

setTimeout(() => {
  apiCall$.subscribe(createSubscriber('asyncTwo'))
}, 2000)
