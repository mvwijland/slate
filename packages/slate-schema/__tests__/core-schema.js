/** @jsx h */
/* eslint-disable react/jsx-key */

import { List } from 'immutable'
import { Text } from '@gitbook/slate'
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

    // There's a bug for hyperscript, hence the weird construction
    // https://github.com/ianstormtaylor/slate/issues/2199
    const expected = (
      <document>
        {<paragraph />.merge({
          nodes: List([Text.create(''), <link>two</link>, Text.create('')]),
        })}
      </document>
    )

    expect(actual).not.toMatchSlate(input)
    expect(actual).toMatchSlate(expected)
  })

  it('should put text around inlines', () => {
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

    // There's a bug for hyperscript, hence the weird construction
    // https://github.com/ianstormtaylor/slate/issues/2199
    const expected = (
      <document>
        {<paragraph />.merge({
          nodes: List([
            Text.create(''),
            <link />.merge({
              nodes: List([
                Text.create(''),
                <link>one</link>,
                Text.create(''),
                <link>two</link>,
                Text.create(''),
              ]),
            }),
            Text.create(''),
          ]),
        })}
      </document>
    )

    expect(actual).not.toMatchSlate(input)
    expect(actual).toMatchSlate(expected)
  })

  it('should preserve empty inline voids', () => {
    const input = (
      <document>
        <paragraph>
          <link>
            <inline isVoid type="emoji" />
          </link>
        </paragraph>
      </document>
    )

    const actual = normalizeDocument({ schema: coreSchema, document: input })
      .document

    // There's a bug for hyperscript, hence the weird construction
    // https://github.com/ianstormtaylor/slate/issues/2199
    const expected = (
      <document>
        {<paragraph />.merge({
          nodes: List([
            Text.create(''),
            <link />.merge({
              nodes: List([
                Text.create(''),
                <inline isVoid type="emoji" />,
                Text.create(''),
              ]),
            }),
            Text.create(''),
          ]),
        })}
      </document>
    )

    expect(actual).not.toMatchSlate(input)
    expect(actual).toMatchSlate(expected)
  })

  it('should remove empty inlines', () => {
    const input = (
      <document>
        <paragraph>
          <link />
        </paragraph>
      </document>
    )

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

  it('should remove nested empty inlines', () => {
    const input = (
      <document>
        <paragraph>
          <link>
            one
            <link />
            two
          </link>
        </paragraph>
      </document>
    )

    const actual = normalizeDocument({ schema: coreSchema, document: input })
      .document

    // There's a bug for hyperscript, hence the weird construction
    // https://github.com/ianstormtaylor/slate/issues/2199
    const expected = (
      <document>
        {<paragraph />.merge({
          nodes: List([Text.create(''), <link>onetwo</link>, Text.create('')]),
        })}
      </document>
    )

    expect(actual).not.toMatchSlate(input)
    expect(actual).toMatchSlate(expected)
  })
})
