import { connectable, interval, Observable, ReplaySubject, Subject } from 'rxjs'
import { delay, share, take } from 'rxjs/operators'
import { createSubscriber } from '../util'

/*
Because observer one connect after 1.2s, it misses first value
connectable is a hot observable
*/

// const interval$ = interval(1000).pipe(take(10))
// const connectable$ = connectable(interval$, {
//   connector: () => new Subject(),
//   resetOnDisconnect: false,
// })
// connectable$.connect()

// setTimeout(() => {
//   connectable$.subscribe(createSubscriber('one'))
// }, 1200)

// setTimeout(() => {
//   connectable$.subscribe(createSubscriber('two'))
// }, 3200)

/*
 */

// const socket: { on: Function } = { on: () => {} }

// const chatMessages$ = new Observable((observer) => {
//   console.log('connected')
//   observer.next('subscribed')
//   socket.on('chat:message', (message: String) => observer.next(message))
// })

// const chatConnectable$ = connectable(chatMessages$, {
//   connector: () => new Subject(),
//   resetOnDisconnect: false,
// })

// chatConnectable$.subscribe(createSubscriber('one'))
// chatConnectable$.subscribe(createSubscriber('two'))

// chatConnectable$.connect()

/*
  With connectables, we can control when the observable starts and
  ends, from outside of it
 */

// const simple$ = new Observable((observer) => {
//   observer.next('one')
//   observer.next('two')
//   observer.next('three')
//   // no observer.complete here

//   return () => console.log('disposed')
// })

// const replaySimple$ = connectable(simple$, {
//   connector: () => new ReplaySubject(2),
// })

// replaySimple$.subscribe(createSubscriber('one'))
// const connection = replaySimple$.connect()
// replaySimple$.subscribe(createSubscriber('two'))

// connection.unsubscribe()

/*
  Ref count is handled by the share operator now
 */

const simple$ = new Observable((observer) => {
  observer.next('one')
  observer.next('two')
  observer.next('three')

  return () => console.log('disposed')
})

const refSimple$ = simple$.pipe(
  share({
    connector: () => new ReplaySubject(2),
  })
)

const sub1 = refSimple$.subscribe(createSubscriber('one'))
// (if it's a regular Subject) two will not receive anything because refSimple$ is a hot observable
// it will produce all values for sub1
const sub2 = refSimple$.subscribe(createSubscriber('two'))

sub1.unsubscribe()
sub2.unsubscribe()
