import fs from 'fs'
import { bindNodeCallback, from } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import { createSubscriber, getItem } from '../util'

const readdir$ = bindNodeCallback(fs.readdir)
// @ts-ignore
readdir$('src')
  .pipe(
    mergeMap((files) => from(files)),
    map((file: fs.Dirent) => `MANIPULATED ${file}`)
  )
  .subscribe(createSubscriber('readdir'))

from(getItem()).subscribe(createSubscriber('promise'))
