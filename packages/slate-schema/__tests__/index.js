/** @jsx h */

import { List } from 'immutable'
import hyperprint from '@gitbook/slate-hyperprint'
import { Text } from '@gitbook/slate'
import { createSchema, normalizeDocument } from '..'
import h from './helpers/h'

function expectModel(actual, expected, options) {
  expect(hyperprint(actual, { strict: true, ...options })).toBe(
    hyperprint(expected, { strict: true, ...options })
  )
}

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

    expect(schema).toBeDefined()
  })

  describe('normalizeDocument', () => {
    it('should normalize a document according to a schema', () => {
      const schema = createSchema({
        block: {
          paragraph: [
            paragraph => {
              if (/invalid/.test(paragraph.text)) {
                return (node, selection) => ({
                  node: node.set('nodes', List([Text.create('valid')])),
                  selection,
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

      expectModel(actual, expected)
    })

    it('should allow node deletion', () => {
      const schema = createSchema({
        block: {
          paragraph: [
            paragraph => {
              if (/invalid/.test(paragraph.text)) {
                return (node, selection) => ({
                  // Delete the node
                  node: null,
                  selection,
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

      const expected = <document />.set('nodes', List())

      expectModel(actual, expected)
    })
  })
})
