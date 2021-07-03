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
