/* @flow */

import type { Component } from 'react'
import direction from 'direction'
import isPlainObject from 'is-plain-object'
import logger from '@gitbook/slate-dev-logger'
import { List, OrderedSet, Set, type Map } from 'immutable'

import type { ModelObject, ListLike, Key, Path } from './types'
import Data from './data'
import Block, { type BlockAttributes } from './block'
import Inline, { type InlineAttributes } from './inline'
import Document, { type DocumentAttributes } from './document'
import { isType } from '../constants/model-types'
import Range from './range'
import Text, { type TextAttributes } from './text'
import type Schema from './schema'
import generateKey from '../utils/generate-key'
import memoize from '../utils/memoize'

export type NodeAttributes = {
  key?: Key,
  object?: ModelObject,
  kind?: ModelObject,
  type?: string,
  isVoid?: boolean,
  nodes?: ListLike<NodeAttributes>,
  data?: Object | Data | Map<string, any>,
}

/**
 * Node.
 *
 * And interface that `Document`, `Block` and `Inline` all implement, to make
 * working with the recursive node tree easier.
 *
 * @type {Node}
 */

class Node {
  /**
   * Create a new `Node` with `attrs`.
   *
   * @param {Object|Node} attrs
   * @return {Node}
   */

  static create(attrs: NodeAttributes = {}): Node {
    if (Node.isNode(attrs)) {
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
          throw new Error('`Node.create` requires a `object` string.')
        }
      }
    }

    throw new Error(
      `\`Node.create\` only accepts objects or nodes but you passed it: ${attrs}`
    )
  }

  /**
   * Create a list of `Nodes` from an array.
   *
   * @param {Array<Object|Node>} elements
   * @return {List<Node>}
   */

  static createList(elements: ListLike<NodeAttributes> = []) {
    if (List.isList(elements) || Array.isArray(elements)) {
      const list = List(elements.map(Node.create))
      return list
    }

    throw new Error(
      `\`Node.createList\` only accepts lists or arrays, but you passed it: ${elements}`
    )
  }

  /**
   * Create a dictionary of settable node properties from `attrs`.
   *
   * @param {Object|String|Node} attrs
   * @return {Object}
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
      `\`Node.createProperties\` only accepts objects, strings, blocks or inlines, but you passed it: ${attrs}`
    )
  }

  /**
   * Create a `Node` from a JSON `value`.
   *
   * @param {Object} value
   * @return {Node}
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
          `\`Node.fromJSON\` requires an \`object\` of either 'block', 'document', 'inline' or 'text', but you passed: ${value}`
        )
      }
    }
  }

  /**
   * Alias `fromJS`.
   */

  static fromJS = Node.fromJSON

  /**
   * Check if `any` is a `Node`.
   *
   * @param {Any} any
   * @return {Boolean}
   */

  static isNode(any: any): boolean {
    return !!['BLOCK', 'DOCUMENT', 'INLINE', 'TEXT'].find(type =>
      isType(type, any)
    )
  }

  /**
   * Check if `any` is a list of nodes.
   *
   * @param {Any} any
   * @return {Boolean}
   */

  static isNodeList(any: any): boolean {
    return List.isList(any) && any.every(item => Node.isNode(item))
  }

  object: ModelObject
  type: string
  key: Key
  nodes: List<Node>

  /**
   * True if the node has both descendants in that order, false otherwise. The
   * order is depth-first, post-order.
   *
   * @param {String} first
   * @param {String} second
   * @return {Boolean}
   */

  areDescendantsSorted(first: Key, second: Key) {
    first = assertKey(first)
    second = assertKey(second)

    const keys = this.getKeysAsArray()
    const firstIndex = keys.indexOf(first)
    const secondIndex = keys.indexOf(second)
    if (firstIndex == -1 || secondIndex == -1) return null

    return firstIndex < secondIndex
  }

  /**
   * Assert that a node has a child by `key` and return it.
   *
   * @param {String} key
   * @return {Node}
   */

  assertChild(key: Key): Node {
    const child = this.getChild(key)

    if (!child) {
      key = assertKey(key)
      throw new Error(`Could not find a child node with key "${key}".`)
    }

    return child
  }

  /**
   * Assert that a node has a descendant by `key` and return it.
   *
   * @param {String} key
   * @return {Node}
   */

  assertDescendant(key: Key): Node {
    const descendant = this.getDescendant(key)

    if (!descendant) {
      key = assertKey(key)
      throw new Error(`Could not find a descendant node with key "${key}".`)
    }

    return descendant
  }

  /**
   * Assert that a node's tree has a node by `key` and return it.
   *
   * @param {String} key
   * @return {Node}
   */

  assertNode(key: Key): Node {
    const node = this.getNode(key)

    if (!node) {
      key = assertKey(key)
      throw new Error(`Could not find a node with key "${key}".`)
    }

    return node
  }

  /**
   * Assert that a node exists at `path` and return it.
   *
   * @param {Array} path
   * @return {Node}
   */

  assertPath(path: Path): Node {
    const descendant = this.getDescendantAtPath(path)

    if (!descendant) {
      throw new Error(`Could not find a descendant at path "${path}".`)
    }

    return descendant
  }

  /**
   * Recursively filter all descendant nodes with `iterator`.
   *
   * @param {Function} iterator
   * @return {List<Node>}
   */

  filterDescendants(
    iterator: (Node, number, List<Node>) => boolean
  ): List<Node> {
    const matches = []

    this.forEachDescendant((node, i, nodes) => {
      if (iterator(node, i, nodes)) matches.push(node)
    })

    return List(matches)
  }

  /**
   * Recursively find all descendant nodes by `iterator`.
   *
   * @param {Function} iterator
   * @return {Node|Null}
   */

  findDescendant(iterator: (Node, number, List<Node>) => boolean): ?Node {
    let found = null

    this.forEachDescendant((node, i, nodes) => {
      if (iterator(node, i, nodes)) {
        found = node
        return false
      }
    })

    return found
  }

  /**
   * Recursively iterate over all descendant nodes with `iterator`. If the
   * iterator returns false it will break the loop.
   *
   * @param {Function} iterator
   */

  forEachDescendant(iterator: (Node, number, List<Node>) => ?boolean): void {
    let ret

    this.nodes.forEach((child, i, nodes) => {
      if (iterator(child, i, nodes) === false) {
        ret = false
        return false
      }

      if (child.object != 'text') {
        ret = child.forEachDescendant(iterator)
        return ret
      }
    })

    return ret
  }

  /**
   * Get the path of ancestors of a descendant node by `key`.
   *
   * @param {String|Node} key
   * @return {List<Node>|Null}
   */

  getAncestors(key: Key | Node): ?List<Node> {
    key = assertKey(key)

    if (key == this.key) return List()
    if (this.hasChild(key)) return List([this])

    let ancestors

    this.nodes.find(node => {
      if (node.object == 'text') return false
      ancestors = node.getAncestors(key)
      return ancestors
    })

    if (ancestors) {
      return ancestors.unshift(this)
    } else {
      return null
    }
  }

  /**
   * Get the leaf block descendants of the node.
   *
   * @return {List<Node>}
   */

  getBlocks(): List<Block> {
    const array = this.getBlocksAsArray()
    return new List(array)
  }

  /**
   * Get the leaf block descendants of the node.
   *
   * @return {List<Node>}
   */

  getBlocksAsArray(): Array<Block> {
    return this.nodes.reduce((array, child) => {
      if (child.object != 'block') return array
      if (!child.isLeafBlock()) return array.concat(child.getBlocksAsArray())
      array.push(child)
      return array
    }, [])
  }

  /**
   * Get the leaf block descendants in a `range`.
   *
   * @param {Range} range
   * @return {List<Node>}
   */

  getBlocksAtRange(range: Range): List<Block> {
    const array = this.getBlocksAtRangeAsArray(range)
    // Eliminate duplicates by converting to an `OrderedSet` first.
    return new List(new OrderedSet(array))
  }

  /**
   * Get the leaf block descendants in a `range` as an array
   *
   * @param {Range} range
   * @return {Array}
   */

  getBlocksAtRangeAsArray(range: Range): Array<Block> {
    range = range.normalize(this)
    if (range.isUnset) return []

    const { startKey, endKey } = range
    const startBlock = this.getClosestBlock(startKey)

    // PERF: the most common case is when the range is in a single block node,
    // where we can avoid a lot of iterating of the tree.
    if (startKey == endKey) return [startBlock]

    const endBlock = this.getClosestBlock(endKey)
    const blocks = this.getBlocksAsArray()
    const start = blocks.indexOf(startBlock)
    const end = blocks.indexOf(endBlock)
    return blocks.slice(start, end + 1)
  }

  /**
   * Get all of the leaf blocks that match a `type`.
   *
   * @param {String} type
   * @return {List<Node>}
   */

  getBlocksByType(type: string): List<Block> {
    const array = this.getBlocksByTypeAsArray(type)
    return new List(array)
  }

  /**
   * Get all of the leaf blocks that match a `type` as an array
   *
   * @param {String} type
   * @return {Array}
   */

  getBlocksByTypeAsArray(type: string): List<Block> {
    return this.nodes.reduce((array, node) => {
      if (node.object != 'block') {
        return array
      } else if (node.isLeafBlock() && node.type == type) {
        array.push(node)
        return array
      } else {
        return array.concat(node.getBlocksByTypeAsArray(type))
      }
    }, [])
  }

  /**
   * Get all of the characters for every text node.
   *
   * @return {List<Character>}
   */

  getCharacters(): List<Character> {
    return this.getTexts().flatMap(t => t.characters)
  }

  /**
   * Get a list of the characters in a `range`.
   *
   * @param {Range} range
   * @return {List<Character>}
   */

  getCharactersAtRange(range: Range): List<Character> {
    range = range.normalize(this)
    if (range.isUnset) return List()
    const { startKey, endKey, startOffset, endOffset } = range

    if (startKey === endKey) {
      const endText = this.getDescendant(endKey)
      return endText.characters.slice(startOffset, endOffset)
    }

    return this.getTextsAtRange(range).flatMap(t => {
      if (t.key === startKey) {
        return t.characters.slice(startOffset)
      }

      if (t.key === endKey) {
        return t.characters.slice(0, endOffset)
      }
      return t.characters
    })
  }

  /**
   * Get a child node by `key`.
   *
   * @param {String} key
   * @return {Node|Null}
   */

  getChild(key: Key): ?Node {
    key = assertKey(key)
    return this.nodes.find(node => node.key == key)
  }

  /**
   * Get closest parent of node by `key` that matches `iterator`.
   *
   * @param {String} key
   * @param {Function} iterator
   * @return {Node|Null}
   */

  getClosest(key: Key, iterator: (Node, number, List<Node>) => boolean): ?Node {
    key = assertKey(key)
    const ancestors = this.getAncestors(key)

    if (!ancestors) {
      throw new Error(`Could not find a descendant node with key "${key}".`)
    }

    // Exclude this node itself.
    return ancestors.rest().findLast(iterator)
  }

  /**
   * Get the closest block parent of a `node`.
   *
   * @param {String} key
   * @return {Node|Null}
   */

  getClosestBlock(key: Key): ?Block {
    return this.getClosest(key, parent => parent.object == 'block')
  }

  /**
   * Get the closest inline parent of a `node`.
   *
   * @param {String} key
   * @return {Node|Null}
   */

  getClosestInline(key: Key): ?Inline {
    return this.getClosest(key, parent => parent.object == 'inline')
  }

  /**
   * Get the closest void parent of a `node`.
   *
   * @param {String} key
   * @return {Node|Null}
   */

  getClosestVoid(key: Key): ?Node {
    return this.getClosest(key, parent => parent.isVoid)
  }

  /**
   * Get the common ancestor of nodes `one` and `two` by keys.
   *
   * @param {String} one
   * @param {String} two
   * @return {Node}
   */

  getCommonAncestor(one: Key, two: Key): ?Node {
    one = assertKey(one)
    two = assertKey(two)

    if (one == this.key) return this
    if (two == this.key) return this

    this.assertDescendant(one)
    this.assertDescendant(two)
    let ancestors = new List()
    let oneParent = this.getParent(one)
    let twoParent = this.getParent(two)

    while (oneParent) {
      ancestors = ancestors.push(oneParent)
      oneParent = this.getParent(oneParent.key)
    }

    while (twoParent) {
      if (ancestors.includes(twoParent)) return twoParent
      twoParent = this.getParent(twoParent.key)
    }
  }

  /**
   * Get the decorations for the node from a `stack`.
   *
   * @param {Stack} stack
   * @return {List}
   */

  getDecorations(stack: Stack): List<Decoration> {
    const decorations = stack.find('decorateNode', this)
    const list = Range.createList(decorations || [])
    return list
  }

  /**
   * Get the depth of a child node by `key`, with optional `startAt`.
   *
   * @param {String} key
   * @param {Number} startAt (optional)
   * @return {Number} depth
   */

  getDepth(key: Key, startAt?: number = 1): number {
    this.assertDescendant(key)
    if (this.hasChild(key)) return startAt
    return this.getFurthestAncestor(key).getDepth(key, startAt + 1)
  }

  /**
   * Get a descendant node by `key`.
   *
   * @param {String} key
   * @return {Node|Null}
   */

  getDescendant(key: Key): ?Node {
    key = assertKey(key)
    let descendantFound = null

    const found = this.nodes.find(node => {
      if (node.key === key) {
        return node
      } else if (node.object !== 'text') {
        descendantFound = node.getDescendant(key)
        return descendantFound
      } else {
        return false
      }
    })

    return descendantFound || found
  }

  /**
   * Get a descendant by `path`.
   *
   * @param {Array} path
   * @return {Node|Null}
   */

  getDescendantAtPath(path: Path): ?Node {
    let descendant = this

    for (const index of path) {
      if (!descendant) return
      if (!descendant.nodes) return
      descendant = descendant.nodes.get(index)
    }

    return descendant
  }

  /**
   * Get the first child text node.
   *
   * @return {Node|Null}
   */

  getFirstText(): ?Text {
    let descendantFound = null

    const found = this.nodes.find(node => {
      if (node.object == 'text') return true
      descendantFound = node.getFirstText()
      return descendantFound
    })

    return descendantFound || found
  }

  /**
   * Get a fragment of the node at a `range`.
   *
   * @param {Range} range
   * @return {Document}
   */

  getFragmentAtRange(range: Range): Document {
    range = range.normalize(this)
    if (range.isUnset) return Document.create()

    let node = this

    // Make sure the children exist.
    const { startKey, startOffset, endKey, endOffset } = range
    const startText = node.assertDescendant(startKey)
    const endText = node.assertDescendant(endKey)

    // Split at the start and end.
    let child = startText
    let previous
    let parent

    while ((parent = node.getParent(child.key))) {
      const index = parent.nodes.indexOf(child)
      const position =
        child.object == 'text' ? startOffset : child.nodes.indexOf(previous)

      parent = parent.splitNode(index, position)
      node = node.updateNode(parent)
      previous = parent.nodes.get(index + 1)
      child = parent
    }

    child = startKey == endKey ? node.getNextText(startKey) : endText

    while ((parent = node.getParent(child.key))) {
      const index = parent.nodes.indexOf(child)
      const position =
        child.object == 'text'
          ? startKey == endKey ? endOffset - startOffset : endOffset
          : child.nodes.indexOf(previous)

      parent = parent.splitNode(index, position)
      node = node.updateNode(parent)
      previous = parent.nodes.get(index + 1)
      child = parent
    }

    // Get the start and end nodes.
    const startNode = node.getNextSibling(
      node.getFurthestAncestor(startKey).key
    )
    const endNode =
      startKey == endKey
        ? node.getNextSibling(
            node.getNextSibling(node.getFurthestAncestor(endKey).key).key
          )
        : node.getNextSibling(node.getFurthestAncestor(endKey).key)

    // Get children range of nodes from start to end nodes
    const startIndex = node.nodes.indexOf(startNode)
    const endIndex = node.nodes.indexOf(endNode)
    const nodes = node.nodes.slice(startIndex, endIndex)

    // Return a new document fragment.
    return Document.create({ nodes })
  }

  /**
   * Get the furthest parent of a node by `key` that matches an `iterator`.
   *
   * @param {String} key
   * @param {Function} iterator
   * @return {Node|Null}
   */

  getFurthest(
    key: Key,
    iterator: (Node, number, List<Node>) => boolean
  ): ?Node {
    const ancestors = this.getAncestors(key)

    if (!ancestors) {
      key = assertKey(key)
      throw new Error(`Could not find a descendant node with key "${key}".`)
    }

    // Exclude this node itself
    return ancestors.rest().find(iterator)
  }

  /**
   * Get the furthest block parent of a node by `key`.
   *
   * @param {String} key
   * @return {Node|Null}
   */

  getFurthestBlock(key: Key): ?Block {
    return this.getFurthest(key, node => node.object == 'block')
  }

  /**
   * Get the furthest inline parent of a node by `key`.
   *
   * @param {String} key
   * @return {Node|Null}
   */

  getFurthestInline(key: Key): ?Inline {
    return this.getFurthest(key, node => node.object == 'inline')
  }

  /**
   * Get the furthest ancestor of a node by `key`.
   *
   * @param {String} key
   * @return {Node|Null}
   */

  getFurthestAncestor(key: Key): ?Node {
    key = assertKey(key)
    return this.nodes.find(node => {
      if (node.key == key) return true
      if (node.object == 'text') return false
      return node.hasDescendant(key)
    })
  }

  /**
   * Get the furthest ancestor of a node by `key` that has only one child.
   *
   * @param {String} key
   * @return {Node|Null}
   */

  getFurthestOnlyChildAncestor(key: Key): ?Node {
    const ancestors = this.getAncestors(key)

    if (!ancestors) {
      key = assertKey(key)
      throw new Error(`Could not find a descendant node with key "${key}".`)
    }

    const result = ancestors
      // Skip this node...
      .shift()
      // Take parents until there are more than one child...
      .reverse()
      .takeUntil(p => p.nodes.size > 1)
      // And pick the highest.
      .last()
    if (!result) return null
    return result
  }

  /**
   * Get the closest inline nodes for each text node in the node.
   *
   * @return {List<Node>}
   */

  getInlines(): List<Inline> {
    const array = this.getInlinesAsArray()
    return new List(array)
  }

  /**
   * Get the closest inline nodes for each text node in the node, as an array.
   *
   * @return {List<Node>}
   */

  getInlinesAsArray(): Array<Inline> {
    let array = []

    this.nodes.forEach(child => {
      if (child.object == 'text') return

      if (child.isLeafInline()) {
        array.push(child)
      } else {
        array = array.concat(child.getInlinesAsArray())
      }
    })

    return array
  }

  /**
   * Get the closest inline nodes for each text node in a `range`.
   *
   * @param {Range} range
   * @return {List<Node>}
   */

  getInlinesAtRange(range: Range): List<Inline> {
    const array = this.getInlinesAtRangeAsArray(range)
    // Remove duplicates by converting it to an `OrderedSet` first.
    return new List(new OrderedSet(array))
  }

  /**
   * Get the closest inline nodes for each text node in a `range` as an array.
   *
   * @param {Range} range
   * @return {Array}
   */

  getInlinesAtRangeAsArray(range: Range): List<Inline> {
    range = range.normalize(this)
    if (range.isUnset) return []

    return this.getTextsAtRangeAsArray(range)
      .map(text => this.getClosestInline(text.key))
      .filter(exists => exists)
  }

  /**
   * Get all of the leaf inline nodes that match a `type`.
   *
   * @param {String} type
   * @return {List<Node>}
   */

  getInlinesByType(type: string): List<Inline> {
    const array = this.getInlinesByTypeAsArray(type)
    return new List(array)
  }

  /**
   * Get all of the leaf inline nodes that match a `type` as an array.
   *
   * @param {String} type
   * @return {Array}
   */

  getInlinesByTypeAsArray(type: string): Array<Inline> {
    return this.nodes.reduce((inlines, node) => {
      if (node.object == 'text') {
        return inlines
      } else if (node.isLeafInline() && node.type == type) {
        inlines.push(node)
        return inlines
      } else {
        return inlines.concat(node.getInlinesByTypeAsArray(type))
      }
    }, [])
  }

  /**
   * Return a set of all keys in the node as an array.
   *
   * @return {Array<String>}
   */

  getKeysAsArray(): Array<Key> {
    const keys = []

    this.forEachDescendant(desc => {
      keys.push(desc.key)
    })

    return keys
  }

  /**
   * Return a set of all keys in the node.
   *
   * @return {Set<String>}
   */

  getKeys(): Set<Key> {
    const keys = this.getKeysAsArray()
    return new Set(keys)
  }

  /**
   * Get the last child text node.
   *
   * @return {Node|Null}
   */

  getLastText(): ?Text {
    let descendantFound = null

    const found = this.nodes.findLast(node => {
      if (node.object == 'text') return true
      descendantFound = node.getLastText()
      return descendantFound
    })

    return descendantFound || found
  }

  /**
   * Get all of the marks for all of the characters of every text node.
   *
   * @return {Set<Mark>}
   */

  getMarks(): Set<Mark> {
    const array = this.getMarksAsArray()
    return new Set(array)
  }

  /**
   * Get all of the marks for all of the characters of every text node.
   *
   * @return {OrderedSet<Mark>}
   */

  getOrderedMarks(): OrderedSet<Mark> {
    const array = this.getMarksAsArray()
    return new OrderedSet(array)
  }

  /**
   * Get all of the marks as an array.
   *
   * @return {Array}
   */

  getMarksAsArray(): Array<Mark> {
    // PERF: use only one concat rather than multiple concat
    // becuase one concat is faster
    const result = []

    this.nodes.forEach(node => {
      result.push(node.getMarksAsArray())
    })
    return Array.prototype.concat.apply([], result)
  }

  /**
   * Get a set of the marks in a `range`.
   *
   * @param {Range} range
   * @return {Set<Mark>}
   */

  getMarksAtRange(range: Range): Set<Mark> {
    return new Set(this.getOrderedMarksAtRange(range))
  }

  /**
   * Get a set of the marks in a `range`.
   *
   * @param {Range} range
   * @return {Set<Mark>}
   */

  getInsertMarksAtRange(range: Range): Set<Mark> {
    range = range.normalize(this)
    if (range.isUnset) return Set()

    if (range.isCollapsed) {
      // PERF: range is not cachable, use key and offset as proxies for cache
      return this.getMarksAtPosition(range.startKey, range.startOffset)
    }

    const { startKey, startOffset } = range
    const text = this.getDescendant(startKey)
    return text.getMarksAtIndex(startOffset + 1)
  }

  /**
   * Get a set of the marks in a `range`.
   *
   * @param {Range} range
   * @return {OrderedSet<Mark>}
   */

  getOrderedMarksAtRange(range: Range): OrderedSet<Mark> {
    range = range.normalize(this)
    if (range.isUnset) return OrderedSet()

    if (range.isCollapsed) {
      // PERF: range is not cachable, use key and offset as proxies for cache
      return this.getMarksAtPosition(range.startKey, range.startOffset)
    }

    const { startKey, startOffset, endKey, endOffset } = range
    return this.getOrderedMarksBetweenPositions(
      startKey,
      startOffset,
      endKey,
      endOffset
    )
  }

  /**
   * Get a set of the marks in a `range`.
   * PERF: arguments use key and offset for utilizing cache
   *
   * @param {string} startKey
   * @param {number} startOffset
   * @param {string} endKey
   * @param {number} endOffset
   * @returns {OrderedSet<Mark>}
   */

  getOrderedMarksBetweenPositions(
    startKey: Key,
    startOffset: number,
    endKey: Key,
    endOffset: number
  ): OrderedSet<Mark> {
    if (startKey === endKey) {
      const startText = this.getDescendant(startKey)
      return startText.getMarksBetweenOffsets(startOffset, endOffset)
    }

    const texts = this.getTextsBetweenPositionsAsArray(startKey, endKey)

    return OrderedSet().withMutations(result => {
      texts.forEach(text => {
        if (text.key === startKey) {
          result.union(
            text.getMarksBetweenOffsets(startOffset, text.text.length)
          )
        } else if (text.key === endKey) {
          result.union(text.getMarksBetweenOffsets(0, endOffset))
        } else {
          result.union(text.getMarks())
        }
      })
    })
  }

  /**
   * Get a set of the active marks in a `range`.
   *
   * @param {Range} range
   * @return {Set<Mark>}
   */

  getActiveMarksAtRange(range: Range): Set<Mark> {
    range = range.normalize(this)
    if (range.isUnset) return Set()

    if (range.isCollapsed) {
      const { startKey, startOffset } = range
      return this.getMarksAtPosition(startKey, startOffset).toSet()
    }

    let { startKey, endKey, startOffset, endOffset } = range
    let startText = this.getDescendant(startKey)

    if (startKey !== endKey) {
      while (startKey !== endKey && endOffset === 0) {
        const endText = this.getPreviousText(endKey)
        endKey = endText.key
        endOffset = endText.text.length
      }

      while (startKey !== endKey && startOffset === startText.text.length) {
        startText = this.getNextText(startKey)
        startKey = startText.key
        startOffset = 0
      }
    }

    if (startKey === endKey) {
      return startText.getActiveMarksBetweenOffsets(startOffset, endOffset)
    }

    const startMarks = startText.getActiveMarksBetweenOffsets(
      startOffset,
      startText.text.length
    )
    if (startMarks.size === 0) return Set()
    const endText = this.getDescendant(endKey)
    const endMarks = endText.getActiveMarksBetweenOffsets(0, endOffset)
    let marks = startMarks.intersect(endMarks)
    // If marks is already empty, the active marks is empty
    if (marks.size === 0) return marks

    let text = this.getNextText(startKey)

    while (text.key !== endKey) {
      if (text.text.length !== 0) {
        marks = marks.intersect(text.getActiveMarks())
        if (marks.size === 0) return Set()
      }

      text = this.getNextText(text.key)
    }
    return marks
  }

  /**
   * Get a set of marks in a `position`, the equivalent of a collapsed range
   *
   * @param {string} key
   * @param {number} offset
   * @return {Set}
   */

  getMarksAtPosition(key: Key, offset: number): Set<Mark> {
    const text = this.getDescendant(key)
    const currentMarks = text.getMarksAtIndex(offset)
    if (offset !== 0) return currentMarks
    const closestBlock = this.getClosestBlock(key)

    if (closestBlock.text === '') {
      // insert mark for empty block; the empty block are often created by split node or add marks in a range including empty blocks
      return currentMarks
    }

    const previous = this.getPreviousText(key)
    if (!previous) return Set()

    if (closestBlock.hasDescendant(previous.key)) {
      return previous.getMarksAtIndex(previous.text.length)
    }

    return currentMarks
  }

  /**
   * Get all of the marks that match a `type`.
   *
   * @param {String} type
   * @return {Set<Mark>}
   */

  getMarksByType(type: string): Set<Mark> {
    const array = this.getMarksByTypeAsArray(type)
    return new Set(array)
  }

  /**
   * Get all of the marks that match a `type`.
   *
   * @param {String} type
   * @return {OrderedSet<Mark>}
   */

  getOrderedMarksByType(type: string): OrderedSet<Mark> {
    const array = this.getMarksByTypeAsArray(type)
    return new OrderedSet(array)
  }

  /**
   * Get all of the marks that match a `type` as an array.
   *
   * @param {String} type
   * @return {Array}
   */

  getMarksByTypeAsArray(type: string): Array<Mark> {
    return this.nodes.reduce((array, node) => {
      return node.object == 'text'
        ? array.concat(node.getMarksAsArray().filter(m => m.type == type))
        : array.concat(node.getMarksByTypeAsArray(type))
    }, [])
  }

  /**
   * Get the block node before a descendant text node by `key`.
   *
   * @param {String} key
   * @return {Node|Null}
   */

  getNextBlock(key: Key): ?Block {
    const child = this.assertDescendant(key)
    let last

    if (child.object == 'block') {
      last = child.getLastText()
    } else {
      const block = this.getClosestBlock(key)
      last = block.getLastText()
    }

    const next = this.getNextText(last.key)
    if (!next) return null

    return this.getClosestBlock(next.key)
  }

  /**
   * Get the node after a descendant by `key`.
   *
   * @param {String} key
   * @return {Node|Null}
   */

  getNextSibling(key: Key): ?Node {
    key = assertKey(key)

    const parent = this.getParent(key)
    const after = parent.nodes.skipUntil(child => child.key == key)

    if (after.size == 0) {
      throw new Error(`Could not find a child node with key "${key}".`)
    }
    return after.get(1)
  }

  /**
   * Get the text node after a descendant text node by `key`.
   *
   * @param {String} key
   * @return {Node|Null}
   */

  getNextText(key: Key): ?Text {
    key = assertKey(key)
    return this.getTexts()
      .skipUntil(text => text.key == key)
      .get(1)
  }

  /**
   * Get a node in the tree by `key`.
   *
   * @param {String} key
   * @return {Node|Null}
   */

  getNode(key: Key): ?Node {
    key = assertKey(key)
    return this.key == key ? this : this.getDescendant(key)
  }

  /**
   * Get a node in the tree by `path`.
   *
   * @param {Array} path
   * @return {Node|Null}
   */

  getNodeAtPath(path: Path): ?Node {
    return path.length ? this.getDescendantAtPath(path) : this
  }

  /**
   * Get the offset for a descendant text node by `key`.
   *
   * @param {String} key
   * @return {Number}
   */

  getOffset(key: Key): number {
    this.assertDescendant(key)

    // Calculate the offset of the nodes before the highest child.
    const child = this.getFurthestAncestor(key)
    const offset = this.nodes
      .takeUntil(n => n == child)
      .reduce((memo, n) => memo + n.text.length, 0)

    // Recurse if need be.
    return this.hasChild(key) ? offset : offset + child.getOffset(key)
  }

  /**
   * Get the offset from a `range`.
   *
   * @param {Range} range
   * @return {Number}
   */

  getOffsetAtRange(range: Range): number {
    range = range.normalize(this)

    if (range.isUnset) {
      throw new Error('The range cannot be unset to calculcate its offset.')
    }

    if (range.isExpanded) {
      throw new Error('The range must be collapsed to calculcate its offset.')
    }

    const { startKey, startOffset } = range
    return this.getOffset(startKey) + startOffset
  }

  /**
   * Get the parent of a child node by `key`.
   *
   * @param {String} key
   * @return {Node|Null}
   */

  getParent(key: Key): ?Node {
    if (this.hasChild(key)) return this

    let node = null

    this.nodes.find(child => {
      if (child.object == 'text') {
        return false
      } else {
        node = child.getParent(key)
        return node
      }
    })

    return node
  }

  /**
   * Get the path of a descendant node by `key`.
   *
   * @param {String|Node} key
   * @return {Array}
   */

  getPath(key: Key): Path {
    let child = this.assertNode(key)
    const ancestors = this.getAncestors(key)

    if (!ancestors) {
      throw new Error('Could not find ancestors')
    }

    const path = []

    ancestors.reverse().forEach(ancestor => {
      const index = ancestor.nodes.indexOf(child)
      path.unshift(index)
      child = ancestor
    })

    return path
  }

  /**
   * Refind the path of node if path is changed.
   *
   * @param {Array} path
   * @param {String} key
   * @return {Array}
   */

  refindPath(path: Path, key: Key): Path {
    const node = this.getDescendantAtPath(path)

    if (node && node.key === key) {
      return path
    }

    return this.getPath(key)
  }

  /**
   *
   * Refind the node with the same node.key after change.
   *
   * @param {Array} path
   * @param {String} key
   * @return {Node|Void}
   */

  refindNode(path: Path, key: Key): ?Node {
    const node = this.getDescendantAtPath(path)

    if (node && node.key === key) {
      return node
    }

    return this.getDescendant(key)
  }

  /**
   * Get the placeholder for the node from a `schema`.
   *
   * @param {Schema} schema
   * @return {Component|Void}
   */

  getPlaceholder(schema: Schema): ?Component<any> {
    return schema.__getPlaceholder(this)
  }

  /**
   * Get the block node before a descendant text node by `key`.
   *
   * @param {String} key
   * @return {Node|Null}
   */

  getPreviousBlock(key: Key): ?Block {
    const child = this.assertDescendant(key)
    let first

    if (child.object == 'block') {
      first = child.getFirstText()
    } else {
      const block = this.getClosestBlock(key)
      first = block.getFirstText()
    }

    const previous = this.getPreviousText(first.key)
    if (!previous) return null

    return this.getClosestBlock(previous.key)
  }

  /**
   * Get the node before a descendant node by `key`.
   *
   * @param {String} key
   * @return {Node|Null}
   */

  getPreviousSibling(key: Key): ?Node {
    key = assertKey(key)
    const parent = this.getParent(key)
    const before = parent.nodes.takeUntil(child => child.key == key)

    if (before.size == parent.nodes.size) {
      throw new Error(`Could not find a child node with key "${key}".`)
    }

    return before.last()
  }

  /**
   * Get the text node before a descendant text node by `key`.
   *
   * @param {String} key
   * @return {Node|Null}
   */

  getPreviousText(key: Key): ?Text {
    key = assertKey(key)
    return this.getTexts()
      .takeUntil(text => text.key == key)
      .last()
  }

  /**
   * Get the indexes of the selection for a `range`, given an extra flag for
   * whether the node `isSelected`, to determine whether not finding matches
   * means everything is selected or nothing is.
   *
   * @param {Range} range
   * @param {Boolean} isSelected
   * @return {Object|Null}
   */

  getSelectionIndexes(
    range: Range,
    isSelected?: boolean = true
  ): ?{ start: number, end: number } {
    const { startKey, endKey } = range

    // PERF: if we're not selected, we can exit early.
    if (!isSelected) {
      return null
    }

    // if we've been given an invalid selection we can exit early.
    if (range.isUnset) {
      return null
    }

    // PERF: if the start and end keys are the same, just check for the child
    // that contains that single key.
    if (startKey == endKey) {
      const child = this.getFurthestAncestor(startKey)
      const index = child ? this.nodes.indexOf(child) : null
      return { start: index, end: index + 1 }
    }

    // Otherwise, check all of the children...
    let start = null
    let end = null

    this.nodes.forEach((child, i) => {
      if (child.object == 'text') {
        if (start == null && child.key == startKey) start = i
        if (end == null && child.key == endKey) end = i + 1
      } else {
        if (start == null && child.hasDescendant(startKey)) start = i
        if (end == null && child.hasDescendant(endKey)) end = i + 1
      }

      // PERF: exit early if both start and end have been found.
      return start == null || end == null
    })

    if (isSelected && start == null) start = 0
    if (isSelected && end == null) end = this.nodes.size
    return start == null ? null : { start, end }
  }

  /**
   * Get the concatenated text string of all child nodes.
   *
   * @return {String}
   */

  getText(): string {
    return this.nodes.reduce((string, node) => {
      return string + node.text
    }, '')
  }

  /**
   * Get the descendent text node at an `offset`.
   *
   * @param {Number} offset
   * @return {Node|Null}
   */

  getTextAtOffset(offset: number): ?Text {
    // PERF: Add a few shortcuts for the obvious cases.
    if (offset == 0) return this.getFirstText()
    if (offset == this.text.length) return this.getLastText()
    if (offset < 0 || offset > this.text.length) return null

    let length = 0

    return this.getTexts().find((node, i, nodes) => {
      length += node.text.length
      return length > offset
    })
  }

  /**
   * Get the direction of the node's text.
   *
   * @return {String}
   */

  getTextDirection(): 'rtl' | 'ltr' | void {
    const dir = direction(this.text)
    return dir == 'neutral' ? undefined : dir
  }

  /**
   * Recursively get all of the child text nodes in order of appearance.
   *
   * @return {List<Node>}
   */

  getTexts(): List<Node> {
    const array = this.getTextsAsArray()
    return new List(array)
  }

  /**
   * Recursively get all the leaf text nodes in order of appearance, as array.
   *
   * @return {List<Node>}
   */

  getTextsAsArray(): Array<Text> {
    let array = []

    this.nodes.forEach(node => {
      if (node.object == 'text') {
        array.push(node)
      } else {
        array = array.concat(node.getTextsAsArray())
      }
    })

    return array
  }

  /**
   * Get all of the text nodes in a `range`.
   *
   * @param {Range} range
   * @return {List<Node>}
   */

  getTextsAtRange(range: Range): List<Text> {
    range = range.normalize(this)
    if (range.isUnset) return List()
    const { startKey, endKey } = range
    return new List(this.getTextsBetweenPositionsAsArray(startKey, endKey))
  }

  /**
   * Get all of the text nodes in a `range` as an array.
   * PERF: use key in arguments for cache
   *
   * @param {string} startKey
   * @param {string} endKey
   * @returns {Array}
   */

  getTextsBetweenPositionsAsArray(startKey: Key, endKey: Key): Array<Text> {
    const startText = this.getDescendant(startKey)

    // PERF: the most common case is when the range is in a single text node,
    // where we can avoid a lot of iterating of the tree.
    if (startKey == endKey) return [startText]

    const endText = this.getDescendant(endKey)
    const texts = this.getTextsAsArray()
    const start = texts.indexOf(startText)
    const end = texts.indexOf(endText, start)
    return texts.slice(start, end + 1)
  }

  /**
   * Get all of the text nodes in a `range` as an array.
   *
   * @param {Range} range
   * @return {Array}
   */

  getTextsAtRangeAsArray(range: Range): Array<Text> {
    range = range.normalize(this)
    if (range.isUnset) return []
    const { startKey, endKey } = range
    return this.getTextsBetweenPositionsAsArray(startKey, endKey)
  }

  /**
   * Check if a child node exists by `key`.
   *
   * @param {String} key
   * @return {Boolean}
   */

  hasChild(key: Key): boolean {
    return !!this.getChild(key)
  }

  /**
   * Check if a node has block node children.
   *
   * @param {String} key
   * @return {Boolean}
   */

  hasBlocks(key: Key): boolean {
    const node = this.assertNode(key)
    return !!(node.nodes && node.nodes.find(n => n.object === 'block'))
  }

  /**
   * Check if a node has inline node children.
   *
   * @param {String} key
   * @return {Boolean}
   */

  hasInlines(key: Key): boolean {
    const node = this.assertNode(key)
    return !!(
      node.nodes && node.nodes.find(n => Inline.isInline(n) || Text.isText(n))
    )
  }

  /**
   * Recursively check if a child node exists by `key`.
   *
   * @param {String} key
   * @return {Boolean}
   */

  hasDescendant(key: Key): boolean {
    return !!this.getDescendant(key)
  }

  /**
   * Recursively check if a node exists by `key`.
   *
   * @param {String} key
   * @return {Boolean}
   */

  hasNode(key: Key): boolean {
    return !!this.getNode(key)
  }

  /**
   * Check if a node has a void parent by `key`.
   *
   * @param {String} key
   * @return {Boolean}
   */

  hasVoidParent(key: Key): boolean {
    return !!this.getClosestVoid(key)
  }

  /**
   * Insert a `node` at `index`.
   *
   * @param {Number} index
   * @param {Node} node
   * @return {Node}
   */

  insertNode(index: number, node: Node): Node {
    const keys = this.getKeysAsArray()

    if (keys.includes(node.key)) {
      node = node.regenerateKey()
    }

    if (node.object != 'text') {
      node = node.mapDescendants(desc => {
        return keys.includes(desc.key) ? desc.regenerateKey() : desc
      })
    }

    const nodes = this.nodes.insert(index, node)
    return this.set('nodes', nodes)
  }

  /**
   * Check whether the node is in a `range`.
   *
   * @param {Range} range
   * @return {Boolean}
   */

  isInRange(range: Range): boolean {
    range = range.normalize(this)

    const node = this
    const { startKey, endKey, isCollapsed } = range

    // PERF: solve the most common cast where the start or end key are inside
    // the node, for collapsed selections.
    if (
      node.key == startKey ||
      node.key == endKey ||
      node.hasDescendant(startKey) ||
      node.hasDescendant(endKey)
    ) {
      return true
    }

    // PERF: if the selection is collapsed and the previous check didn't return
    // true, then it must be false.
    if (isCollapsed) {
      return false
    }

    // Otherwise, look through all of the leaf text nodes in the range, to see
    // if any of them are inside the node.
    const texts = node.getTextsAtRange(range)
    let memo = false

    texts.forEach(text => {
      if (node.hasDescendant(text.key)) memo = true
      return memo
    })

    return memo
  }

  /**
   * Check whether the node is a leaf block.
   *
   * @return {Boolean}
   */

  isLeafBlock(): boolean {
    return this.object == 'block' && this.nodes.every(n => n.object != 'block')
  }

  /**
   * Check whether the node is a leaf inline.
   *
   * @return {Boolean}
   */

  isLeafInline(): boolean {
    return (
      this.object == 'inline' && this.nodes.every(n => n.object != 'inline')
    )
  }

  /**
   * Merge a children node `first` with another children node `second`.
   * `first` and `second` will be concatenated in that order.
   * `first` and `second` must be two Nodes or two Text.
   *
   * @param {Node} first
   * @param {Node} second
   * @return {Node}
   */

  mergeNode(withIndex: number, index: number) {
    let node = this
    let one = node.nodes.get(withIndex)
    const two = node.nodes.get(index)

    if (one.object != two.object) {
      throw new Error(
        `Tried to merge two nodes of different objects: "${one.object}" and "${
          two.object
        }".`
      )
    }

    // If the nodes are text nodes, concatenate their leaves together
    if (one.object == 'text') {
      one = one.mergeText(two)
    } else {
      // Otherwise, concatenate their child nodes together.
      const nodes = one.nodes.concat(two.nodes)
      one = one.set('nodes', nodes)
    }

    node = node.removeNode(index)
    node = node.removeNode(withIndex)
    node = node.insertNode(withIndex, one)
    return node
  }

  /**
   * Map all child nodes, updating them in their parents. This method is
   * optimized to not return a new node if no changes are made.
   *
   * @param {Function} iterator
   * @return {Node}
   */

  mapChildren(iterator: (Node, number, List<Node>) => Node): Node {
    let { nodes } = this

    nodes.forEach((node, i) => {
      const ret = iterator(node, i, this.nodes)
      if (ret != node) nodes = nodes.set(ret.key, ret)
    })

    return this.set('nodes', nodes)
  }

  /**
   * Map all descendant nodes, updating them in their parents. This method is
   * optimized to not return a new node if no changes are made.
   *
   * @param {Function} iterator
   * @return {Node}
   */

  mapDescendants(iterator: (Node, number, List<Node>) => Node): Node {
    let { nodes } = this

    nodes.forEach((node, index) => {
      let ret = node
      if (ret.object != 'text') ret = ret.mapDescendants(iterator)
      ret = iterator(ret, index, this.nodes)
      if (ret == node) return

      nodes = nodes.set(index, ret)
    })

    return this.set('nodes', nodes)
  }

  /**
   * Regenerate the node's key.
   *
   * @return {Node}
   */

  regenerateKey(): Node {
    const key = generateKey()
    return this.set('key', key)
  }

  /**
   * Remove a `node` from the children node map.
   *
   * @param {String} key
   * @return {Node}
   */

  removeDescendant(key: Key): Node {
    key = assertKey(key)

    let node = this
    let parent = node.getParent(key)
    if (!parent)
      throw new Error(`Could not find a descendant node with key "${key}".`)

    const index = parent.nodes.findIndex(n => n.key === key)
    const nodes = parent.nodes.delete(index)

    parent = parent.set('nodes', nodes)
    node = node.updateNode(parent)
    return node
  }

  /**
   * Remove a node at `index`.
   *
   * @param {Number} index
   * @return {Node}
   */

  removeNode(index: number): Node {
    const nodes = this.nodes.delete(index)
    return this.set('nodes', nodes)
  }

  /**
   * Split a child node by `index` at `position`.
   *
   * @param {Number} index
   * @param {Number} position
   * @return {Node}
   */

  splitNode(index: number, position: number): Node {
    let node = this
    const child = node.nodes.get(index)
    let one
    let two

    // If the child is a text node, the `position` refers to the text offset at
    // which to split it.
    if (child.object == 'text') {
      ;[one, two] = child.splitText(position)
    } else {
      // Otherwise, if the child is not a text node, the `position` refers to the
      // index at which to split its children.
      const befores = child.nodes.take(position)
      const afters = child.nodes.skip(position)
      one = child.set('nodes', befores)
      two = child.set('nodes', afters).regenerateKey()
    }

    // Remove the old node and insert the newly split children.
    node = node.removeNode(index)
    node = node.insertNode(index, two)
    node = node.insertNode(index, one)
    return node
  }

  /**
   * Set a new value for a child node by `key`.
   *
   * @param {Node} node
   * @return {Node}
   */

  updateNode(node: Node): Node {
    if (node.key == this.key) {
      return node
    }

    let child = this.assertDescendant(node.key)
    const ancestors = this.getAncestors(node.key)

    ancestors.reverse().forEach(parent => {
      let { nodes } = parent
      const index = nodes.indexOf(child)
      child = parent
      nodes = nodes.set(index, node)
      parent = parent.set('nodes', nodes)
      node = parent
    })

    return node
  }

  /**
   * Validate the node against a `schema`.
   *
   * @param {Schema} schema
   * @return {Function|Null}
   */

  validate(schema: Schema): * {
    return schema.validateNode(this)
  }

  /**
   * Get the first invalid descendant
   *
   * @param {Schema} schema
   * @return {Node|Text|Null}
   */

  getFirstInvalidDescendant(schema: Schema): ?Node {
    let result = null

    this.nodes.find(n => {
      result = n.validate(schema) ? n : n.getFirstInvalidDescendant(schema)
      return result
    })
    return result
  }
}

/**
 * Assert a key `arg`.
 *
 * @param {String} arg
 * @return {String}
 */

function assertKey(arg: any): Key {
  if (typeof arg == 'string') return arg
  throw new Error(
    `Invalid \`key\` argument! It must be a key string, but you passed: ${arg}`
  )
}

/**
 * Memoize read methods.
 */

memoize(Node.prototype, [
  'areDescendantsSorted',
  'getAncestors',
  'getBlocksAsArray',
  'getBlocksAtRangeAsArray',
  'getBlocksByTypeAsArray',
  'getChild',
  'getClosestBlock',
  'getClosestInline',
  'getClosestVoid',
  'getCommonAncestor',
  'getDecorations',
  'getDepth',
  'getDescendant',
  'getDescendantAtPath',
  'getFirstText',
  'getFragmentAtRange',
  'getFurthestBlock',
  'getFurthestInline',
  'getFurthestAncestor',
  'getFurthestOnlyChildAncestor',
  'getInlinesAsArray',
  'getInlinesAtRangeAsArray',
  'getInlinesByTypeAsArray',
  'getMarksAsArray',
  'getMarksAtPosition',
  'getOrderedMarksBetweenPositions',
  'getInsertMarksAtRange',
  'getKeysAsArray',
  'getLastText',
  'getMarksByTypeAsArray',
  'getNextBlock',
  'getNextSibling',
  'getNextText',
  'getNode',
  'getNodeAtPath',
  'getOffset',
  'getOffsetAtRange',
  'getParent',
  'getPath',
  'getPlaceholder',
  'getPreviousBlock',
  'getPreviousSibling',
  'getPreviousText',
  'getText',
  'getTextAtOffset',
  'getTextDirection',
  'getTextsAsArray',
  'getTextsBetweenPositionsAsArray',
  'isLeafBlock',
  'isLeafInline',
  'validate',
  'getFirstInvalidDescendant',
])

/**
 * Mix in `Node` methods.
 */

Object.getOwnPropertyNames(Node.prototype).forEach(method => {
  if (method == 'constructor') return
  Block.prototype[method] = Node.prototype[method]
  Inline.prototype[method] = Node.prototype[method]
  Document.prototype[method] = Node.prototype[method]
})

Block.createChildren = Node.createList
Inline.createChildren = Node.createList
Document.createChildren = Node.createList

/**
 * Export.
 *
 * @type {Object}
 */

export default Node
