/* eslint-disable import/no-extraneous-dependencies */
const { createHyperscript } = require('@gitbook/slate-hyperscript')

/**
 * Define a hyperscript.
 *
 * @type {Function}
 */

const h = createHyperscript({
  blocks: {
    line: 'line',
    paragraph: 'paragraph',
    quote: 'quote',
    code: 'code',
    list: 'list',
    item: 'item',
    image: {
      type: 'image',
      isVoid: true,
    },
    table_cell: 'table_cell',
    table: 'table',
    table_row: 'table_row',
    unstyled: 'unstyled',
    list_item: 'list_item',
    unordered_list: 'unordered_list',
    ordered_list: 'ordered_list',
  },
  inlines: {
    link: 'link',
    hashtag: 'hashtag',
    comment: 'comment',
    emoji: {
      type: 'emoji',
      isVoid: true,
    },
  },
  marks: {
    b: 'bold',
    i: 'italic',
    u: 'underline',
  },
})

/**
 * Export.
 *
 * @type {Function}
 */

module.exports = h
