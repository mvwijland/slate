/* @flow */

import type { Node } from '@gitbook/slate'
import { Record, Seq } from 'immutable'

import type { SchemaOptions, SlateObject, Rule } from './types'

const EMPTY = []

type SchemaDefinition = {
  object: {
    [object: SlateObject]: Rule[],
  },
  block: {
    [type: String]: Rule[],
  },
  inline: {
    [type: String]: Rule[],
  },
}

class Schema extends Record(
  ({ object: {}, block: {}, inline: {} }: SchemaDefinition)
) {
  definition: SchemaDefinition

  static create(definition: SchemaOptions) {
    return new Schema({
      object: {
        ...(definition.object || {}),
      },
      block: {
        ...(definition.block || {}),
      },
      inline: {
        ...(definition.inline || {}),
      },
    })
  }

  /*
   * Returns the sequence of rules to apply. Seq are used because they're lazy.
   */

  getRules(node: Node): Seq<Rule> {
    const { object, type } = node

    const objectRules = this.object[object] || EMPTY
    const typeRules = (this[object] && this[object][type]) || EMPTY

    return Seq(objectRules).concat(Seq(typeRules))
  }
}

export default Schema
