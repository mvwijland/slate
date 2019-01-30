/** @jsx h */
/* eslint-disable react/jsx-key */

const { resolve } = require('path')
const heapdump = require('heapdump')
const { resetMemoization, useMemoization } = require('@gitbook/slate')
const h = require('./helpers/h')

function simpleValid() {
  return (
    <value>
      <document>
        <paragraph>Simple text</paragraph>
      </document>
    </value>
  )
}

function simpleInvalid() {
  return (
    <value>
      <document>
        <paragraph>Simple text</paragraph>
        <inline type="link">Invalid</inline>
      </document>
    </value>
  )
}

function complexValid() {
  return (
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
}

function normalize(value) {
  return value.change().normalize().value
}

function execute(fn, times) {
  for (let i = 0; i < times; ++i) {
    fn()
  }
}

function takeSnapshot(name) {
  const snapshotDir = resolve(__dirname)

  heapdump.writeSnapshot(
    resolve(snapshotDir, `./${new Date().toISOString()}-${name}.heapsnapshot`)
  )
}

function logCache() {}

function runMemoryTest() {
  // Call garbage collection
  resetMemoization()

  useMemoization(false)

  // let value = complexValid

  global.gc()
  global.gc()
  global.gc()

  // Initial snapshot
  takeSnapshot('start')
  logCache()

  execute(() => {
    normalize(simpleValid())
  }, 10000)

  global.gc()
  global.gc()
  global.gc()
  // Take snapshot here
  logCache()
  takeSnapshot('end')
}

runMemoryTest()

/* 

Memory tools:

https://developers.google.com/web/tools/chrome-devtools/memory-problems/heap-snapshots


Findings:

- When memoization is disabled, there's still some slight growth of memory (7.0MB, 7.3MB, 7.6MB) depending on the number of value creation and normalization (1, 100, 10k).

*/
