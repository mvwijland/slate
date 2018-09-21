/* @flow */

import type { Value, Document, Node, Range } from '@gitbook/slate'
import type { List } from 'immutable'
import type { SchemaOptions } from './types'

import Schema from './Schema'

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

function normalizeDocument({
  schema,
  document,
  selection,
}: {
  schema: Schema,
  document: Document,
  selection: Range,
}): { document: Document, selection?: Range } {
  const validated = normalizeNode({ schema, node: document, selection })
  return {
    document: validated.node,
    selection: validated.selection,
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
  let validatedChildren
  let validatedSelection = selection

  children.forEach((child, index) => {
    const validated = normalizeNode({
      schema,
      node: child,
      selection: validatedSelection,
    })

    if (validated.node === child) {
      return
    }

    if (noChange) {
      // Keep all previous children unchanged
      validatedChildren = children.slice(0, index).asMutable()
      noChange = false
    }

    validatedChildren.push(validated.node)
    validatedSelection = validated.selection
  })

  // Check if we changed anything or if we should reuse the existing children
  validatedChildren =
    (validatedChildren && validatedChildren.asImmutable()) || children

  return {
    children: validatedChildren,
    selection: validatedSelection,
  }
}

function normalizeNode(input: {
  schema: Schema,
  node: Node,
  selection: Range,
}): { node: Node, selection?: Range } {
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

  while (!valid) {
    const rules = schema.getRules(validatedNode)
    // Not all rules will be evaluated because rules is a lazy Seq
    const normalizer = rules.map(rule => rule(validatedNode)).find(Boolean)

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

export { createSchema, normalizeValue, normalizeDocument, normalizeNode }
