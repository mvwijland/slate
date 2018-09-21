/* @flow */

import type { Node, Range } from '@gitbook/slate'

export type Schema = {}

export type SlateObject = 'document' | 'block' | 'inline' | 'text'

export type SchemaOptions = {
  object?: {
    [object: SlateObject]: Rule[],
  },
  block?: {
    [type: String]: Rule[],
  },
  inline?: {
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
export type Rule = Node => ?Normalizer

export type Normalizer = (
  node: Node,
  // In case the selection should be normalized too, it is provided
  selection?: Range
) => { node: ?Node, selection?: Range }
