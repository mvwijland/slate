/* @flow */

import type { Value, Document, Node, Range } from '@gitbook/slate'
import type { List } from 'immutable'
import type { SchemaOptions } from './types'

import Schema from './Schema'
import coreSchema from './core-schema'

function createSchema(options: SchemaOptions): Schema {
  return Schema.create(options)
}

function normalizeValue({
  schema,
  value,
}: {
  schema: Schema,
  value: Value,
}): Value {
  const validated = normalizeDocument({
    schema,
    document: value.document,
    selection: value.selection,
  })

  return validated.document === value.document
    ? value
    : value
        .set('document', validated.document)
        .set('selection', validated.selection)
}

function normalizeDocument(input: {
  schema: Schema,
  document: Document,
  selection: Range,
}): { document: Document, selection?: Range } {
  const { node: document, selection } = normalizeNode({
    // $FlowFixMe Document is a Node
    node: input.document,
    schema: input.schema,
    selection: input.selection,
  })

  if (!document) {
    throw new Error('Cannot normalize document out')
  }

  return {
    document,
    selection,
  }
}

function normalizeChildren({
  schema,
  children,
  selection,
}: {
  schema: Schema,
  children: List<Node>,
  selection: Range,
}): { children: List<Node>, selection?: Range } {
  // True has long as no child needed normalization
  let noChange = true
  let validatedSelection = selection

  let validatedChildren = children.map(child => {
    const validated = normalizeNode({
      schema,
      node: child,
      selection: validatedSelection,
    })

    if (validated.node === child) {
      return child
    } else {
      noChange = false

      validatedSelection = validated.selection
      return validated.node
    }
  })

  // Check if we changed anything or if we should reuse the existing children
  if (noChange) {
    validatedChildren = children
  } else {
    validatedChildren = validatedChildren.filter(Boolean)
  }

  return {
    children: validatedChildren,
    selection: validatedSelection,
  }
}

function normalizeNode(input: {
  schema: Schema,
  node: Node,
  selection: Range,
}): { node: ?Node, selection?: Range } {
  const { schema } = input
  let validatedNode = input.node
  let validatedSelection = input.selection

  // Normalize children
  const children = input.node.nodes

  if (children) {
    const validated = normalizeChildren({
      schema,
      children,
      selection: validatedSelection,
    })

    if (validated.children !== children) {
      validatedNode = validatedNode.set('nodes', validated.children)
    }

    validatedSelection = validated.selection
  }

  // Normalize the node itself
  let valid = false

  // Stop until the node is valid or was deleted
  let count = 0

  while (!valid && validatedNode) {
    count++

    if (count > 3) {
      throw new Error('Could not validate node after 10 iterations')
    }

    const ruleLists = schema.getRuleLists(validatedNode)
    // Make sure we evaluate the least possible rules
    let normalizer

    ruleLists.find(rules => {
      rules.find(rule => {
        normalizer = rule(validatedNode)
        return normalizer
      })
    })

    if (normalizer) {
      const validated = normalizer(validatedNode, validatedSelection)
      validatedNode = validated.node
      validatedSelection = validated.selection
    } else {
      valid = true
    }
  }

  return {
    node: validatedNode,
    selection: validatedSelection,
  }
}

export {
  createSchema,
  normalizeValue,
  normalizeDocument,
  normalizeNode,
  coreSchema,
}
