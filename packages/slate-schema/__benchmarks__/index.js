/** @jsx h */

import { createSchema, normalizeDocument } from '..'
import h from './helpers/h'

/**
 * Tests.
 */

const schema = createSchema({
  object: {
    document: [document => {}],
  },
  block: {
    paragraph: [paragraph => {}],
  },
})

suite('slate-schema', () => {
  const input = (
    <document>
      <paragraph />
    </document>
  )

  scenario('should be fast', () => {
    normalizeDocument({ schema, document: input })
  })
})
