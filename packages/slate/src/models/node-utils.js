/* @flow */

import isPlainObject from 'is-plain-object'
import logger from '@gitbook/slate-dev-logger'
import { List } from 'immutable'

import type { ListLike } from './types'
import Data from './data'
import Block, { type BlockAttributes } from './block'
import Inline, { type InlineAttributes } from './inline'
import Document, { type DocumentAttributes } from './document'
import { isType } from '../constants/model-types'
import Text, { type TextAttributes } from './text'
import type { Node, NodeAttributes } from './node'
import NodeCommon from './node-common'

// Extend Document, Block and Inline
NodeCommon.mixinNode(Document)
NodeCommon.mixinNode(Block)
NodeCommon.mixinNode(Inline)

/**
 * Utilities to create Nodes
 *
 * @type {NodeUtils}
 */

class NodeUtils {
  /**
   * Create a new `Node` with `attrs`.
   */

  static create(attrs: NodeAttributes = {}): Block | Document | Inline | Text {
    if (NodeUtils.isNode(attrs)) {
      return ((attrs: any): Node)
    }

    if (isPlainObject(attrs)) {
      let { object } = attrs

      if (!object && attrs.kind) {
        logger.deprecate(
          'slate@0.32.0',
          'The `kind` property of Slate objects has been renamed to `object`.'
        )

        object = attrs.kind
      }

      switch (object) {
        case 'block':
          return Block.create(((attrs: any): BlockAttributes))
        case 'document':
          return Document.create(((attrs: any): DocumentAttributes))
        case 'inline':
          return Inline.create(((attrs: any): InlineAttributes))
        case 'text':
          return Text.create(((attrs: any): TextAttributes))

        default: {
          throw new Error('`NodeUtils.create` requires a `object` string.')
        }
      }
    }

    throw new Error(
      `\`NodeUtils.create\` only accepts objects or nodes but you passed it: ${attrs}`
    )
  }

  /**
   * Create a list of `Nodes` from an array.
   */

  static createList(elements: ListLike<NodeAttributes> = []) {
    if (List.isList(elements) || Array.isArray(elements)) {
      const list = List(elements.map(NodeUtils.create))
      return list
    }

    throw new Error(
      `\`NodeUtils.createList\` only accepts lists or arrays, but you passed it: ${elements}`
    )
  }

  /**
   * Create a dictionary of settable node properties from `attrs`.
   */

  static createProperties(attrs: NodeAttributes = {}) {
    if (Block.isBlock(attrs) || Inline.isInline(attrs)) {
      return {
        data: attrs.data,
        isVoid: attrs.isVoid,
        type: attrs.type,
      }
    }

    if (typeof attrs == 'string') {
      return { type: attrs }
    }

    if (isPlainObject(attrs)) {
      const props = {}
      if ('type' in attrs) props.type = attrs.type
      if ('data' in attrs) props.data = Data.create(attrs.data)
      if ('isVoid' in attrs) props.isVoid = attrs.isVoid
      return props
    }

    throw new Error(
      `\`NodeUtils.createProperties\` only accepts objects, strings, blocks or inlines, but you passed it: ${attrs}`
    )
  }

  /**
   * Create a `Node` from a JSON `value`.
   */

  static fromJSON(value: Object): Node {
    let { object } = value

    if (!object && value.kind) {
      logger.deprecate(
        'slate@0.32.0',
        'The `kind` property of Slate objects has been renamed to `object`.'
      )

      object = value.kind
    }

    switch (object) {
      case 'block':
        return Block.fromJSON(value)
      case 'document':
        return Document.fromJSON(value)
      case 'inline':
        return Inline.fromJSON(value)
      case 'text':
        return Text.fromJSON(value)

      default: {
        throw new Error(
          `\`NodeUtils.fromJSON\` requires an \`object\` of either 'block', 'document', 'inline' or 'text', but you passed: ${value}`
        )
      }
    }
  }

  /**
   * Alias `fromJS`.
   */

  static fromJS = NodeUtils.fromJSON

  /**
   * Check if `any` is a `Node`.
   */

  static isNode(any: any): boolean {
    return !!['BLOCK', 'DOCUMENT', 'INLINE', 'TEXT'].find(type =>
      isType(type, any)
    )
  }

  /**
   * Check if `any` is a list of nodes.
   */

  static isNodeList(any: any): boolean {
    return List.isList(any) && any.every(item => NodeUtils.isNode(item))
  }
}

/**
 * Export.
 *
 * @type {Object}
 */

export default NodeUtils
