export function createSubscriber(tag: String) {
  return {
    next(item: String) {
      console.log(`${tag}.next ${item}`)
    },
    error(error: Error) {
      console.log(`${tag}.error ${error.stack || error}`)
    },
    complete() {
      console.log(`${tag}.complete`)
    },
  }
}
