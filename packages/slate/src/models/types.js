/* @flow */

import type { List } from 'immutable'

export type ModelObject = 'text' | 'block' | 'inline' | 'document' | 'leaf'
export type ListLike<T> = List<T> | Array<T>
export type Key = string
export type Path = number[]
