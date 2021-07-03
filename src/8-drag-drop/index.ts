import $ from 'jquery'
import { fromEvent, merge, of } from 'rxjs'
import { last, mergeMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators'

const $drag = $('#drag')
const $document = $(document)
const $dropAreas = $('.drop-area')

const beginDrag$ = fromEvent($drag, 'mousedown')
const endDrag$ = fromEvent($document, 'mouseup')
const mouseMove$ = fromEvent($document, 'mousemove')

const currentOverArea$ = merge(
  fromEvent($dropAreas, 'mouseover').pipe(mergeMap((event) => of($(event.target)))),
  fromEvent($dropAreas, 'mouseout').pipe(mergeMap(() => of(null)))
)

const drops$ = beginDrag$.pipe(
  tap((event) => {
    event.preventDefault()
    $drag.addClass('dragging')
  }),
  mergeMap((startEvent) =>
    mouseMove$.pipe(
      takeUntil(endDrag$),
      tap((moveEvent) => moveDrag(startEvent, moveEvent)),
      // last means we're effectively paused here until this observable completes
      last(),
      withLatestFrom(currentOverArea$, (_, $area) => $area)
    )
  )
)

drops$.subscribe(($dropArea) => {
  $dropAreas.removeClass('dropped')
  $drag.removeClass('dragging')

  if ($dropArea) {
    $dropArea.addClass('dropped')
    $drag.animate(
      {
        top: $dropArea.offset().top,
        left: $dropArea.offset().left,
      },
      250
    )
  } else {
    $drag.animate({ top: 0, left: 0 }, 250)
  }
})

function moveDrag(startEvent: any, moveEvent: any): void {
  $drag.css({
    left: moveEvent.clientX - startEvent.offsetX,
    top: moveEvent.clientY - startEvent.offsetY,
  })
}
