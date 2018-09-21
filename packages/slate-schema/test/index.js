/** @jsx h */

import assert from 'assert'
import h from './helpers/h'
import { List } from 'immutable'
import { createSchema, normalizeDocument } from '..'
import { Text } from '@gitbook/slate'

/**
 * Tests.
 */

describe('slate-schema', () => {
  it('should create a schema', () => {
    const schema = createSchema({
      object: {
        document: [document => {}],
      },
      block: {
        paragraph: [paragraph => {}],
      },
    })

    assert.ok(schema)
  })

  describe('normalizeDocument', () => {
    it('should normalize a document according to a schema', () => {
      const schema = createSchema({
        block: {
          paragraph: [
            paragraph => {
              if (/invalid/.test(paragraph.text)) {
                return node => ({
                  node: node.set('nodes', List([Text.create('valid')])),
                })
              }
            },
          ],
        },
      })

      const input = (
        <document>
          <paragraph>invalid</paragraph>
        </document>
      )

      const actual = normalizeDocument({ schema, document: input }).document

      const expected = (
        <document>
          <paragraph>valid</paragraph>
        </document>
      )

      assert.equal(actual.text, expected.text)
    })
  })
})
