/** @jsx h */
/* eslint-disable react/jsx-key */

const SlateSchema = require('@gitbook/slate-schema')
const h = require('../../helpers/h')
const big = require('../../helpers/big')
const value = big

module.exports.default = function(value) {
  SlateSchema.normalizeValue({ schema: SlateSchema.coreSchema, value })
}

module.exports.input = function() {
  return value
}
