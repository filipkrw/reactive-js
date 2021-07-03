import $ from 'jquery'
import { fromEvent } from 'rxjs'
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators'

const $title = $('#title')
const $results = $('#results')

fromEvent($title, 'keyup')
  .pipe(
    map((event) => (event.target as HTMLInputElement).value),
    distinctUntilChanged(),
    debounceTime(250),
    switchMap(getItems)
  )
  .subscribe((items: string[]) => {
    $results.empty()
    $results.append(items.map((r) => $('<li/>').text(r)))
  })

function getItems(title: String) {
  console.log(`Querying ${title}`)
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve([title, 'Item 2', `Another ${Math.random()}`])
    }, 500 + Math.random() * 1000)
  })
}
