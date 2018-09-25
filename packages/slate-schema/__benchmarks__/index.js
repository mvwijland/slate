/** @jsx h */
/* eslint-disable react/jsx-key */
/* globals scenario */

import { createSchema, normalizeValue } from '../src'
import h from './helpers/h'
import NewCoreSchema from '../src/core-schema'

/**
 * Tests.
 */

suite('Schema: core rules', () => {
  const value = (
    <value>
      <document>
        {Array.from(Array(10)).map((v, i) => (
          <quote>
            {Array.from(Array(5)).map((v, i) => (
              <paragraph>
                This is editable <b>rich</b> text, <i>much</i> better than a
                textarea!
              </paragraph>
            ))}
          </quote>
        ))}
      </document>
    </value>
  )

  console.log({ schema: value.schema })

  const change = value.change()

  // scenario('old schema normalize()', () => {
  //   change.normalize()
  // })

  scenario('new schema normalizeValue()', () => {
    normalizeValue({ schema: NewCoreSchema, value })
  })
})
