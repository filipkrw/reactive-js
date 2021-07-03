import { Observable } from 'rxjs'
import { createSubscriber } from '../createSubscriber'

function createInterval$(time: number) {
  return new Observable((observer) => {
    let index = 0
    const interval = setInterval(() => {
      console.log(`Generating ${index}`)
      observer.next(index++)
    }, time)

    return () => clearInterval(interval)
  })
}

function take(sourceObservable: Observable<any>, amount: number) {
  return new Observable((observer) => {
    let count = 0

    const subscription = sourceObservable.subscribe({
      next(item) {
        observer.next(item)
        count++
        if (count == amount) observer.complete()
      },
      error(error) {
        observer.error(error)
      },
      complete() {
        observer.complete()
      },
    })

    return () => subscription.unsubscribe()
  })
}

const everySecond$ = createInterval$(1000)
const firstFiveSeconds$ = take(everySecond$, 5)
firstFiveSeconds$.subscribe(createSubscriber('interval'))
