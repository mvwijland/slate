/** @jsx h */

import { List } from 'immutable'
import h from './helpers/h'

import coreSchema from '../src/core-schema'
import { normalizeDocument } from '../src'

/**
 * Tests.
 */

describe('slate-schema with core schema', () => {
  it('should remove inlines from document', () => {
    const input = (
      <document>
        <link>one</link>
        <paragraph>two</paragraph>
      </document>
    )

    const actual = normalizeDocument({ schema: coreSchema, document: input })
      .document

    const expected = (
      <document>
        <paragraph>two</paragraph>
      </document>
    )

    expect(actual).not.toMatchSlate(input)
    expect(actual).toMatchSlate(expected)
  })

  it('should create text in empty blocks', () => {
    let input = (
      <document>
        <paragraph />
      </document>
    )

    // Remove text put by hyperscript
    input = input.merge({
      nodes: input.nodes.map(paragraph =>
        paragraph.merge({
          nodes: List(),
        })
      ),
    })

    const actual = normalizeDocument({ schema: coreSchema, document: input })
      .document

    const expected = (
      <document>
        <paragraph>
          <text />
        </paragraph>
      </document>
    )

    expect(actual).not.toMatchSlate(input)
    expect(actual).toMatchSlate(expected)
  })

  it('should remove text from documents', () => {
    const input = (
      <document>
        one
        <paragraph>two</paragraph>
      </document>
    )

    const actual = normalizeDocument({ schema: coreSchema, document: input })
      .document

    const expected = (
      <document>
        <paragraph>two</paragraph>
      </document>
    )

    expect(actual).not.toMatchSlate(input)
    expect(actual).toMatchSlate(expected)
  })

  it('should prevent blocks inside inlines', () => {
    const input = (
      <document>
        <paragraph>
          <link>
            <paragraph>one</paragraph>
            two
          </link>
        </paragraph>
      </document>
    )

    const actual = normalizeDocument({ schema: coreSchema, document: input })
      .document

    const expected = (
      <document>
        <paragraph>
          <link>two</link>
        </paragraph>
      </document>
    )

    expect(actual).not.toMatchSlate(input)
    expect(actual).toMatchSlate(expected)
  })

  it.only('should put text around inlines', () => {
    const input = (
      <document>
        <paragraph>
          <link>
            <link>one</link>
            <link>two</link>
          </link>
        </paragraph>
      </document>
    )

    const actual = normalizeDocument({ schema: coreSchema, document: input })
      .document

    const expected = (
      <link>
        <text />
        <link>one</link>
        <text />
        <link>two</link>
        <text />
      </link>
    )

    console.log(JSON.stringify(expected, null, 2))

    expect(actual).not.toMatchSlate(input)
    expect(actual).toMatchSlate(expected)
  })
})
