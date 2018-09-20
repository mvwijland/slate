/* @flow */

import type { Value, Document, Node, Range } from '@gitbook/slate'

/**
 * Export.
 */

type Schema = {}

type SchemaOptions = {
  document?: Rule[],
  block?: Rule[],
  inline?: Rule[],
  text?: Rule[],

  blocks?: {
    [type: String]: Rule[],
  },
  inlines?: {
    [type: String]: Rule[],
  },
}

// Having the rule return a normalizer function or not indicates whether the
// node is valid.
// It's also easier to write the logic for normalization, since the validation
// variables are inside a closure.
// Concerning memoization, we will only cache whether the node is valid
// regarding the current schema instance, we won't store the returned
// Normalizer value.
type Rule = Node => ?Normalizer

type Normalizer = (
  node: Node,
  // In case the selection should be normalized too, it is provided
  selection?: Range
) => { node: ?Node, selection?: Range }

interface SlateSchemaModule {
  createSchema(SchemaOptions): Schema;

  normalizeValue(schema: Schema, value: Document): Value;
  normalizeDocument(schema: Schema, document: Document): Document;
  normalizeNode(schema: Schema, node: Node): Node;
}

export default {}
