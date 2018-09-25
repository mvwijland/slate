/** @jsx h */
/* eslint-disable react/jsx-key */

const SlateSchema = require('@gitbook/slate-schema')
const h = require('../../helpers/h')

module.exports.default = function(value) {
  SlateSchema.normalizeValue({ schema: SlateSchema.coreSchema, value })
}

const value = (
  <value>
    <document>
      {Array.from(Array(10)).map((x, i) => (
        <quote>
          {Array.from(Array(5)).map((y, j) => (
            <paragraph>
              This is editable <b>rich</b> text, <i>much</i> better than a
              textarea!
              {i == 0 && j == 0 ? <cursor /> : ''}
              <paragraph>Some invalid block</paragraph>
            </paragraph>
          ))}
          <link>Some invalid link</link>
        </quote>
      ))}
    </document>
  </value>
)

module.exports.input = function() {
  return value
}
