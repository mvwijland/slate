/** @jsx h */
/* eslint-disable react/jsx-key */

const { resolve } = require('path')
const heapdump = require('heapdump')
const { resetMemoization } = require('@gitbook/slate')
const h = require('./helpers/h')

const simpleValid = (
  <value>
    <document>
      <paragraph>Simple text</paragraph>
    </document>
  </value>
)

const simpleInvalid = (
  <value>
    <document>
      <paragraph>Simple text</paragraph>
      <inline type="link">Invalid</inline>
    </document>
  </value>
)

const complexValid = (
  <value>
    <document>
      {Array.from(Array(10)).map((v, i) => (
        <table>
          {Array.from(Array(10)).map((v, i) => (
            <row>
              {Array.from(Array(10)).map((v, i) => <cell>Some cell</cell>)}
            </row>
          ))}
        </table>
      ))}
    </document>
  </value>
)

function execute(value) {
  let newValue = value

  for (let i = 0; i < 100; ++i) {
    newValue = newValue.change().normalize().value
  }

  return newValue
}

function takeSnapshot(name) {
  const snapshotDir = resolve(__dirname)

  heapdump.writeSnapshot(
    resolve(snapshotDir, `./${Date.now()}-${name}.heapsnapshot`)
  )
}

function runMemoryTest() {
  // Call garbage collection
  resetMemoization()

  let value = complexValid

  global.gc()
  global.gc()
  global.gc()

  // Initial snapshot
  takeSnapshot('start')

  value = execute(value)

  global.gc()
  global.gc()
  global.gc()
  // Take snapshot here
  takeSnapshot('end')

  return value
}

runMemoryTest()
