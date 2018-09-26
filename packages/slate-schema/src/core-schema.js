/* @flow */

import { List } from 'immutable'
import { Text, type Node } from '@gitbook/slate'
import type { Rule, Normalizer } from '../src/types'
import { createSchema } from './index.js'

const isBlock = n => n.object === 'block'
const isInline = n => n.object === 'inline'
const isInlineOrText = n => n.object === 'inline' || n.object === 'text'
const isText = n => n.object === 'text'

/**
 * Only allow block nodes in documents.
 */

const onlyBlocksInDocument: Rule = document => {
  const valid = !document.hasInlinesOrTexts()
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

  const valid = isBlock(first) ? !block.hasInlinesOrTexts() : !block.hasBlocks()

  if (valid) return

  return (node, selection) => ({
    node: node.set(
      'nodes',
      node.nodes.filter(isBlock(first) ? isBlock : isInlineOrText)
    ),
    selection,
  })
}

/**
 * Only allow inline and text nodes in inlines.
 */

const inlinesContainInlines: Rule = inline => {
  const valid = !inline.hasBlocks()
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
 * Ensure that inline nodes are surrounded by text nodes, by adding extra
 * blank text nodes if necessary.
 */

const inlinesAreBetweenTexts: Rule = node => {
  if (!node.hasInlines()) return

  const inlineNeedsSurrounding = index => {
    const prev = index > 0 ? node.nodes.get(index - 1) : null
    const next = node.nodes.get(index + 1)
    const before = !prev
    const after = !next || isInline(next)

    return { after, before }
  }

  const valid = node.nodes.every((child, index) => {
    if (!isInline(child)) return true

    const shouldInsert = inlineNeedsSurrounding(index)
    return !shouldInsert.after || !shouldInsert.before
  })

  if (valid) return

  return (n, selection) => {
    return {
      node: n.merge({
        nodes: n.nodes.flatMap((child, index) => {
          const result = [child]

          if (isInline(child)) {
            const shouldInsert = inlineNeedsSurrounding(index)
            if (shouldInsert.before) result.unshift(Text.create())
            if (shouldInsert.after) result.push(Text.create())
          }

          return result
        }),
      }),
      selection,
    }
  }
}

/**
 * Merge adjacent text nodes.
 */

const mergeAdjacentTextNodes: Rule = node => {
  if (!node.hasTexts()) return

  const invalids = node.nodes
    .map((child, i) => {
      if (!isText(child)) return null

      const next = node.nodes.get(i + 1)
      if (!next || !isText(next)) return null
      return next
    })
    .filter(Boolean)

  if (invalids.isEmpty()) return

  return (n, selection) => {
    let normalizedNode = n

    // Reverse the list to handle consecutive merges, since the earlier nodes
    // will always exist after each merge.
    invalids.reverse().forEach(invalidText => {
      const invalidIndex = node.nodes.indexOf(invalidText)
      const previousIndex = invalidIndex - 1
      normalizedNode = normalizedNode.mergeNode(previousIndex, invalidIndex)
    })

    return {
      node: normalizedNode,
      selection,
    }
  }
}

/**
 * Prevent extra empty text nodes, except when adjacent to inline void nodes.
 */

const removeExtraEmptyTexts: Rule = node => {
  const { nodes } = node
  if (nodes.size <= 1) return

  if (!node.hasTexts()) return

  const invalids = nodes
    .filter((child, i) => {
      if (!isText(child)) return
      if (child.text.length > 0) return

      const prev = i > 0 ? nodes.get(i - 1) : null
      const next = nodes.get(i + 1)

      // If it's the first node, and the next is a void, preserve it.
      if (!prev && isInline(next)) return

      // It it's the last node, and the previous is an inline, preserve it.
      if (!next && isInline(prev)) return

      // If it's surrounded by inlines, preserve it.
      if (next && prev && isInline(next) && isInline(prev)) return

      // Otherwise, remove it.
      return true
    })
    .toSet()

  if (invalids.isEmpty()) return

  return (n, selection) => {
    return {
      node: n.set('nodes', n.nodes.filter(child => !invalids.contains(child))),
      selection,
    }
  }
}

// Re-create the Slate's core schema
const coreSchema = createSchema({
  object: {
    document: [onlyBlocksInDocument],
    block: [
      blocksContainBlocksOrInlines,
      atLeastOneChild,
      inlinesAreBetweenTexts,
      mergeAdjacentTextNodes,
      removeExtraEmptyTexts,
    ],
    inline: [
      inlinesContainInlines,
      atLeastOneChild,
      inlinesAreNotEmpty,
      inlinesAreBetweenTexts,
      mergeAdjacentTextNodes,
      removeExtraEmptyTexts,
    ],
  },
})

function combineChildRules(
  childRules: Array<
    (acc: Object, parent: Node, child: Node, index: number) => ?Normalizer
  >
): Rule {
  // Accumulators where each invidual rules can store
  // its own data during iteration
  let accs = Array(childRules.length).fill()
  // Track which rules have matched or not

  return node => {
    // Initialize accs
    accs = accs.map(() => ({}))

    let normalizer

    node.nodes.forEach((child, index) => {
      childRules.forEach((rule, ruleIndex) => {
        normalizer = rule(accs[ruleIndex], node, child, index)
        return !normalizer
      })
      return !normalizer
    })

    return normalizer
  }
}

/*

DOCUMENT

O(child)
onlyBlocksInDocument

BLOCKS

O(child)
blocksContainBlocksOrInlines,

O(1)
atLeastOneChild,

O(child)
inlinesAreBetweenTexts,

O(child)
mergeAdjacentTextNodes,

O(child)
removeExtraEmptyTexts,


INLINES

O(child)
inlinesContainInlines,

O(1)
atLeastOneChild,

O(1)
inlinesAreNotEmpty,

O(child)
inlinesAreBetweenTexts,

O(child)
mergeAdjacentTextNodes,

O(child)
removeExtraEmptyTexts,

*/

export default coreSchema
