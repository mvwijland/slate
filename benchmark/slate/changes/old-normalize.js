/** @jsx h */
/* eslint-disable react/jsx-key */

const h = require('../../helpers/h')
const big = require('../../helpers/big')

const value = big

module.exports.default = function(change) {
  change.normalize()
}

module.exports.input = function() {
  return value.change()
}
