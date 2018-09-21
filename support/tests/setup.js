import hyperprint from '@gitbook/slate-hyperprint'
import diff from 'jest-diff'

expect.extend({
  toMatchSlate(received, expected, options) {
    const expectedPrint = hyperprint(expected, { strict: true, ...options })
    const receivedPrint = hyperprint(received, { strict: true, ...options })

    const pass = expectedPrint == receivedPrint

    const message = pass
      ? () =>
          `${this.utils.matcherHint('.not.toMatchSlate')}\n\n` +
          `Expected value to not be (using slate-hyperprint):\n` +
          `${this.utils.printExpected(expectedPrint)}\n` +
          `Received:\n` +
          `${this.utils.printReceived(receivedPrint)}`
      : () => {
          const diffString = diff(expectedPrint, receivedPrint, {
            expand: this.expand,
          })
          return (
            `${this.utils.matcherHint('.toMatchSlate')}\n\n` +
            `Expected value to be (using slate-hyperprint):\n` +
            `${this.utils.printExpected(expectedPrint)}\n` +
            `Received:\n` +
            `${this.utils.printReceived(receivedPrint)}${
              diffString ? `\n\nDifference:\n\n${diffString}` : ''
            }`
          )
        }

    return { actual: received, message, pass }
  },
})
