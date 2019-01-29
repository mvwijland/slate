# Contributing

## Running Examples

Check out the [Examples readme](./examples) to see how to get the examples running locally!

## Running Tests

To run the tests, you need to have the Slate repository cloned to your computer. After that, you need to `cd` into the directory where you cloned it, and install the dependencies with `yarn` and build the monorepo:

```
yarn install
yarn build
```

Then run the tests with:

```
yarn test
```

To keep the source rebuilding on every file change, you need to run an additional watching command in a separate process:

```
yarn watch
```

If you need to debug something, you can add a `debugger` line to the source, and then run `yarn test debug`.

If you only want to run a specific test or tests, you can run `yarn test --fgrep="slate-react rendering"` flag which will filter the tests being run by grepping for the string in each test.

## Running Benchmarks

To run the benchmarks, first make some changes to the source that you want to benchmark. Now that you're ready, you need to save a "baseline" for what the performance was before you made you change.

To do that, stash your changes and save the benchmarks:

```
git stash
yarn benchmark:save
```

Then once the reference has been saved, unstash your changes and run the benchmarks to see a comparison:

```
git stash pop
yarn benchmark
```

There will be some subtle changes in iteration speed always, but the comparison reporter will highlight any changes that seem meaningful. You can run `benchmark` multiple times to ensure the speed up persists.

### Run Selected Benchmarks

To run selected benchmarks, create `tmp/benchmark-config.js` with `module.exports.include`. For example, to run slate-core benchmarks only with `get-*`, we can create a `tmp/benchmark-config.js` as

```
module.exports.include = {
  slate: /^get/
}
```

## Testing Input Methods

[Here's a helpful page](https://github.com/Microsoft/vscode/wiki/IME-Test) detailing how to test various input scenarios on Windows, Mac and Linux.

## Debugging Slate Methods

Slate makes use of [debug](https://github.com/visionmedia/debug) to log information about various methods. You can [enable the logger in the browser](https://github.com/visionmedia/debug#browser-support) by setting `localStorage.debug = "*"` (to log methods on all modules) or to a single namespace (e.g. `slate:editor`). Look for `const debug = Debug('<namespace>')` to get the namespace of various modules.

## Publishing Releases

Since we use [Lerna](https://lernajs.io) to manage the Slate packages this is fairly easy, **but** you must make sure you are using `npm` to run the release script, because using `yarn` results in failures. So just run:

```js
npm run release
```

And follow the prompts Lerna gives you.
