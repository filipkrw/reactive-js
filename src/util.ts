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
