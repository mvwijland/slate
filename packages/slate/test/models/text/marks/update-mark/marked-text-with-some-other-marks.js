/** @jsx h */

import { Mark, Data } from '../../../../..'
import h from '../../../../helpers/h'

export const input = (
  <text>
    <b>Cat</b>
    <i> is Cute</i>
  </text>
)[0]

export default function(t) {
  return t.updateMark(0, 6, Mark.create('bold'), {
    data: Data.fromJS({ x: 1 }),
  })
}

export const output = (
  <text>
    <b x={1}>Cat</b>
    <i> is Cute</i>
  </text>
)[0]
