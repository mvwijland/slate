/** @jsx h */

import { List } from 'immutable'
import { Text } from '@gitbook/slate'
import type { Rule } from '../src/types'
import { createSchema, normalizeDocument } from '..'
import h from './helpers/h'

const isBlock = n => n.object === 'block'
const isInline = n => n.object === 'inline' || n.object === 'text'
const isInlineOrText = n => n.object === 'inline' || n.object === 'text'
const isText = n => n.object === 'text'

/**
 * Only allow block nodes in documents.
 */

const onlyBlocksInDocument: Rule = document => {
  const valid = document.nodes.every(isBlock)
  if (valid) return

  return (doc, selection) => ({
    node: doc.set('nodes', doc.nodes.filter(isBlock)),
    selection,
  })
}

/**
 * Only allow block nodes or inline and text nodes in blocks.
 */

const blocksContainBlocksOrInlines: Rule = block => {
  const first = block.nodes.first()
  if (!first) return

  const isValid = isBlock(first) ? isBlock : isInlineOrText
  const valid = block.nodes.every(isValid)

  if (valid) return

  return (node, selection) => ({
    node: node.set('nodes', node.nodes.filter(isValid)),
    selection,
  })
}

/**
 * Only allow inline and text nodes in inlines.
 */

const inlinesContainInlines: Rule = inline => {
  const valid = inline.nodes.every(isInlineOrText)
  if (valid) return

  return (node, selection) => ({
    node: node.set('nodes', node.nodes.filter(isInlineOrText)),
    selection,
  })
}

/**
 * Ensure that block and inline nodes have at least one text child.
 */

const atLeastOneChild: Rule = node => {
  if (!node.nodes.isEmpty()) return

  return (n, selection) => ({
    node: n.set('nodes', List([Text.create()])),
    selection,
  })
}

/**
 * Ensure that inline non-void nodes are never empty.
 */

const inlinesAreNotEmpty: Rule = inline => {
  const valid = inline.isVoid || !inline.isEmpty
  if (valid) return

  return (n, selection) => ({
    node: null,
    selection,
  })
}

/**
 * Ensure that inline void nodes are surrounded by text nodes, by adding extra
 * blank text nodes if necessary.
 */

const inlineVoidAreBetweenTexts: Rule = node => {
  const inlineNeedsSurrounding = index => {
    const prev = index > 0 ? node.nodes.get(index - 1) : null
    const next = node.nodes.get(index + 1)
    const after = !prev
    const before = !next || isInline(next)

    return { after, before }
  }

  const valid = node.nodes.every((list, child, index) => {
    if (!isInline(child)) return true

    const shouldInsert = inlineNeedsSurrounding(child, index)
    return shouldInsert.after || shouldInsert.before
  })

  if (valid) return

  return (n, selection) => {
    return {
      node: n.set(
        'nodes',
        n.nodes.flatMap((child, index) => {
          const result = [child]

          if (isInline(child)) {
            const shouldInsert = inlineNeedsSurrounding(index)
            if (shouldInsert.before) result.unshift(Text.create())
            if (shouldInsert.after) result.push(Text.create())
          }
          return result
        })
      ),
      selection,
    }
  }
}

/**
 * Merge adjacent text nodes.
 */

const mergeAdjacentTextNodes: Rule = node => {
  const valid = node.nodes.every((child, i) => {
    if (!isText(child)) return true

    const next = node.nodes.get(i + 1)
    return !next || !isText(next)
  })

  return

  // TODO
}

// Re-create the Slate's core schema
const coreSchema = createSchema({
  object: {
    document: [onlyBlocksInDocument],
    block: [
      blocksContainBlocksOrInlines,
      atLeastOneChild,
      inlineVoidAreBetweenTexts,
      mergeAdjacentTextNodes,
    ],
    inline: [
      inlinesContainInlines,
      atLeastOneChild,
      inlinesAreNotEmpty,
      inlineVoidAreBetweenTexts,
      mergeAdjacentTextNodes,
    ],
  },
})

/**
 * Tests.
 */

describe('slate-schema with core schema', () => {
  it('should remove non-blocks from document', () => {
    const input = (
      <document>
        <paragraph>Hello</paragraph>
        <link>Some text</link>
      </document>
    )

    const actual = normalizeDocument({ schema: coreSchema, document: input })
      .document

    const expected = (
      <document>
        <paragraph>Hello</paragraph>
      </document>
    )

    expect(actual).toMatchSlate(expected)
  })
})
