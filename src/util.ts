import { Observable } from 'rxjs'

export function createSubscriber(tag: String) {
  return {
    next: (item: any) => {
      console.log(`${tag}.next ${item}`)
    },
    error: (error: Error) => {
      console.log(`${tag}.error ${error.stack}`)
    },
    complete: () => {
      console.log(`${tag}.complete`)
    },
  }
}

export function getItem() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('HELLO')
    }, 1000)
  })
}

export function getNumbers() {
  return new Promise((resolve, rejest) => {
    setTimeout(() => {
      resolve([1, 2, 3])
    }, 1000)
  })
}

export function getApiError() {
  return new Observable((observer) => {
    console.log('Getting API')
    setTimeout(() => {
      observer.error(new Error())
    }, 1000)
  })
}
