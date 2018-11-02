/* @flow */

import type { Component } from 'react'
import type { List, OrderedSet, Set, Map } from 'immutable'

import type { ModelObject, Decoration, ListLike, Key, Path } from './types'
import type Data from './data'
import type Block from './block'
import type Inline from './inline'
import type Document from './document'
import type Range from './range'
import type Text from './text'
import type Schema from './schema'
import type Character from './character'
import type Mark from './mark'
import type Stack from './stack'

export type NodeAttributes = {
  key?: Key,
  object?: ModelObject,
  kind?: ModelObject,
  type?: string,
  isVoid?: boolean,
  nodes?: ListLike<NodeAttributes>,
  data?: Object | Data | Map<string, any>,
}

// Alias Node to NodeInterface for this file.
type Node = NodeInterface

/**
 * An interface that `Document`, `Block` and `Inline` all implement, to make
 * working with the recursive node tree easier.
 */

export interface NodeInterface {
  object: ModelObject;
  type: string;
  key: Key;
  nodes: List<Node>;

  /**
   * True if the node has both descendants in that order, false otherwise. The
   * order is depth-first, post-order.
   */

  areDescendantsSorted(first: Key, second: Key): boolean;

  /**
   * Assert that a node has a child by `key` and return it.
   */

  assertChild(key: Key): Node;

  /**
   * Assert that a node has a descendant by `key` and return it.
   */

  assertDescendant(key: Key): Node;

  /**
   * Assert that a node's tree has a node by `key` and return it.
   */

  assertNode(key: Key): Node;

  /**
   * Assert that a node exists at `path` and return it.
   */

  assertPath(path: Path): Node;

  /**
   * Recursively filter all descendant nodes with `iterator`.
   */

  filterDescendants(
    iterator: (Node, number, List<Node>) => boolean
  ): List<Node>;

  /**
   * Recursively find all descendant nodes by `iterator`.
   */

  findDescendant(iterator: (Node, number, List<Node>) => boolean): ?Node;

  /**
   * Recursively iterate over all descendant nodes with `iterator`. If the
   * iterator returns false it will break the loop.
   */

  forEachDescendant(iterator: (Node, number, List<Node>) => ?boolean): void;

  /**
   * Get the path of ancestors of a descendant node by `key`.
   */

  getAncestors(key: Key | Node): ?List<Node>;

  /**
   * Get the leaf block descendants of the node.
   */

  getBlocks(): List<Block>;

  /**
   * Get the leaf block descendants of the node.
   */

  getBlocksAsArray(): Array<Block>;

  /**
   * Get the leaf block descendants in a `range`.
   */

  getBlocksAtRange(range: Range): List<Block>;

  /**
   * Get the leaf block descendants in a `range` as an array
   */

  getBlocksAtRangeAsArray(range: Range): Array<Block>;

  /**
   * Get all of the leaf blocks that match a `type`.
   */

  getBlocksByType(type: string): List<Block>;

  /**
   * Get all of the leaf blocks that match a `type` as an array
   */

  getBlocksByTypeAsArray(type: string): List<Block>;

  /**
   * Get all of the characters for every text node.
   */

  getCharacters(): List<Character>;

  /**
   * Get a list of the characters in a `range`.
   */

  getCharactersAtRange(range: Range): List<Character>;

  /**
   * Get a child node by `key`.
   */

  getChild(key: Key): ?Node;

  /**
   * Get closest parent of node by `key` that matches `iterator`.
   */

  getClosest(key: Key, iterator: (Node, number, List<Node>) => boolean): ?Node;

  /**
   * Get the closest block parent of a `node`.
   */

  getClosestBlock(key: Key): ?Block;

  /**
   * Get the closest inline parent of a `node`.
   */

  getClosestInline(key: Key): ?Inline;

  /**
   * Get the closest void parent of a `node`.
   */

  getClosestVoid(key: Key): ?Node;

  /**
   * Get the common ancestor of nodes `one` and `two` by keys.
   */

  getCommonAncestor(one: Key, two: Key): ?Node;

  /**
   * Get the decorations for the node from a `stack`.
   */

  getDecorations(stack: Stack): List<Decoration>;

  /**
   * Get the depth of a child node by `key`, with optional `startAt`.
   */

  getDepth(key: Key, startAt?: number): number;

  /**
   * Get a descendant node by `key`.
   */

  getDescendant(key: Key): ?Node;

  /**
   * Get a descendant by `path`.
   */

  getDescendantAtPath(path: Path): ?Node;

  /**
   * Get the first child text node.
   */

  getFirstText(): ?Text;

  /**
   * Get a fragment of the node at a `range`.
   */

  getFragmentAtRange(range: Range): Document;

  /**
   * Get the furthest parent of a node by `key` that matches an `iterator`.
   */

  getFurthest(key: Key, iterator: (Node, number, List<Node>) => boolean): ?Node;

  /**
   * Get the furthest block parent of a node by `key`.
   */

  getFurthestBlock(key: Key): ?Block;

  /**
   * Get the furthest inline parent of a node by `key`.
   */

  getFurthestInline(key: Key): ?Inline;

  /**
   * Get the furthest ancestor of a node by `key`.
   */

  getFurthestAncestor(key: Key): ?Node;

  /**
   * Get the furthest ancestor of a node by `key` that has only one child.
   */

  getFurthestOnlyChildAncestor(key: Key): ?Node;

  /**
   * Get the closest inline nodes for each text node in the node.
   */

  getInlines(): List<Inline>;

  /**
   * Get the closest inline nodes for each text node in the node, as an array.
   */

  getInlinesAsArray(): Array<Inline>;

  /**
   * Get the closest inline nodes for each text node in a `range`.
   */

  getInlinesAtRange(range: Range): List<Inline>;

  /**
   * Get the closest inline nodes for each text node in a `range` as an array.
   */

  getInlinesAtRangeAsArray(range: Range): List<Inline>;

  /**
   * Get all of the leaf inline nodes that match a `type`.
   */

  getInlinesByType(type: string): List<Inline>;

  /**
   * Get all of the leaf inline nodes that match a `type` as an array.
   */

  getInlinesByTypeAsArray(type: string): Array<Inline>;

  /**
   * Return a set of all keys in the node as an array.
   */

  getKeysAsArray(): Array<Key>;

  /**
   * Return a set of all keys in the node.
   */

  getKeys(): Set<Key>;

  /**
   * Get the last child text node.
   */

  getLastText(): ?Text;

  /**
   * Get all of the marks for all of the characters of every text node.
   */

  getMarks(): Set<Mark>;

  /**
   * Get all of the marks for all of the characters of every text node.
   */

  getOrderedMarks(): OrderedSet<Mark>;

  /**
   * Get all of the marks as an array.
   */

  getMarksAsArray(): Array<Mark>;

  /**
   * Get a set of the marks in a `range`.
   */

  getMarksAtRange(range: Range): Set<Mark>;

  /**
   * Get a set of the marks in a `range`.
   */

  getInsertMarksAtRange(range: Range): Set<Mark>;

  /**
   * Get a set of the marks in a `range`.
   */

  getOrderedMarksAtRange(range: Range): OrderedSet<Mark>;

  /**
   * Get a set of the marks in a `range`.
   * PERF: arguments use key and offset for utilizing cache
   */

  getOrderedMarksBetweenPositions(
    startKey: Key,
    startOffset: number,
    endKey: Key,
    endOffset: number
  ): OrderedSet<Mark>;

  /**
   * Get a set of the active marks in a `range`.
   */

  getActiveMarksAtRange(range: Range): Set<Mark>;

  /**
   * Get a set of marks in a `position`, the equivalent of a collapsed range
   */

  getMarksAtPosition(key: Key, offset: number): Set<Mark>;

  /**
   * Get all of the marks that match a `type`.
   */

  getMarksByType(type: string): Set<Mark>;

  /**
   * Get all of the marks that match a `type`.
   */

  getOrderedMarksByType(type: string): OrderedSet<Mark>;

  /**
   * Get all of the marks that match a `type` as an array.
   */

  getMarksByTypeAsArray(type: string): Array<Mark>;

  /**
   * Get the block node before a descendant text node by `key`.
   */

  getNextBlock(key: Key): ?Block;

  /**
   * Get the node after a descendant by `key`.
   */

  getNextSibling(key: Key): ?Node;

  /**
   * Get the text node after a descendant text node by `key`.
   */

  getNextText(key: Key): ?Text;

  /**
   * Get a node in the tree by `key`.
   */

  getNode(key: Key): ?Node;

  /**
   * Get a node in the tree by `path`.
   */

  getNodeAtPath(path: Path): ?Node;

  /**
   * Get the offset for a descendant text node by `key`.
   */

  getOffset(key: Key): number;

  /**
   * Get the offset from a `range`.
   */

  getOffsetAtRange(range: Range): number;

  /**
   * Get the parent of a child node by `key`.
   */

  getParent(key: Key): ?Node;

  /**
   * Get the path of a descendant node by `key`.
   */

  getPath(key: Key): Path;

  /**
   * Refind the path of node if path is changed.
   */

  refindPath(path: Path, key: Key): Path;

  /**
   *
   * Refind the node with the same node.key after change.
   */

  refindNode(path: Path, key: Key): ?Node;

  /**
   * Get the placeholder for the node from a `schema`.
   */

  getPlaceholder(schema: Schema): ?Component<any>;

  /**
   * Get the block node before a descendant text node by `key`.
   */

  getPreviousBlock(key: Key): ?Block;

  /**
   * Get the node before a descendant node by `key`.
   */

  getPreviousSibling(key: Key): ?Node;

  /**
   * Get the text node before a descendant text node by `key`.
   */

  getPreviousText(key: Key): ?Text;

  /**
   * Get the indexes of the selection for a `range`, given an extra flag for
   * whether the node `isSelected`, to determine whether not finding matches
   * means everything is selected or nothing is.
   */

  getSelectionIndexes(
    range: Range,
    isSelected?: boolean
  ): ?{ start: number, end: number };

  /**
   * Get the concatenated text string of all child nodes.
   */

  getText(): string;

  /**
   * Get the descendent text node at an `offset`.
   */

  getTextAtOffset(offset: number): ?Text;

  /**
   * Get the direction of the node's text.
   */

  getTextDirection(): 'rtl' | 'ltr' | void;

  /**
   * Recursively get all of the child text nodes in order of appearance.
   */

  getTexts(): List<Node>;

  /**
   * Recursively get all the leaf text nodes in order of appearance, as array.
   */

  getTextsAsArray(): Array<Text>;

  /**
   * Get all of the text nodes in a `range`.
   */

  getTextsAtRange(range: Range): List<Text>;

  /**
   * Get all of the text nodes in a `range` as an array.
   * PERF: use key in arguments for cache
   */

  getTextsBetweenPositionsAsArray(startKey: Key, endKey: Key): Array<Text>;

  /**
   * Get all of the text nodes in a `range` as an array.
   */

  getTextsAtRangeAsArray(range: Range): Array<Text>;

  /**
   * Check if a child node exists by `key`.
   */

  hasChild(key: Key): boolean;

  /**
   * Check if a node has block node children.
   */

  hasBlocks(key: Key): boolean;

  /**
   * Check if a node has inline node children.
   */

  hasInlines(key: Key): boolean;

  /**
   * Recursively check if a child node exists by `key`.
   */

  hasDescendant(key: Key): boolean;

  /**
   * Recursively check if a node exists by `key`.
   */

  hasNode(key: Key): boolean;

  /**
   * Check if a node has a void parent by `key`.
   */

  hasVoidParent(key: Key): boolean;

  /**
   * Insert a `node` at `index`.
   */

  insertNode(index: number, node: Node): Node;

  /**
   * Check whether the node is in a `range`.
   */

  isInRange(range: Range): boolean;

  /**
   * Check whether the node is a leaf block.
   */

  isLeafBlock(): boolean;

  /**
   * Check whether the node is a leaf inline.
   */

  isLeafInline(): boolean;

  /**
   * Merge a children node `first` with another children node `second`.
   * `first` and `second` will be concatenated in that order.
   * `first` and `second` must be two Nodes or two Text.
   */

  mergeNode(withIndex: number, index: number): Node;

  /**
   * Map all child nodes, updating them in their parents. This method is
   * optimized to not return a new node if no changes are made.
   */

  mapChildren(iterator: (Node, number, List<Node>) => Node): Node;

  /**
   * Map all descendant nodes, updating them in their parents. This method is
   * optimized to not return a new node if no changes are made.
   */

  mapDescendants(iterator: (Node, number, List<Node>) => Node): Node;

  /**
   * Regenerate the node's key.
   */

  regenerateKey(): Node;

  /**
   * Remove a `node` from the children node map.
   */

  removeDescendant(key: Key): Node;

  /**
   * Remove a node at `index`.
   */

  removeNode(index: number): Node;

  /**
   * Split a child node by `index` at `position`.
   */

  splitNode(index: number, position: number): Node;

  /**
   * Set a new value for a child node by `key`.
   */

  updateNode(node: Node): Node;

  /**
   * Validate the node against a `schema`.
   */

  validate(schema: Schema): *;

  /**
   * Get the first invalid descendant
   */

  getFirstInvalidDescendant(schema: Schema): ?Node;
}
