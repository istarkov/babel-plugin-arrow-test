
[![Build Status](https://travis-ci.org/istarkov/babel-plugin-arrow-test.svg?branch=master)](https://travis-ci.org/istarkov/babel-plugin-arrow-test)

# babel-plugin-arrow-test

Babel 6 plugin, allows you to test anonymous javascript arrow functions easily.

## The problem

I love to write declarative javascript code like

```javascript
blabla
  .map(({ x, y }) => ({z: x + y}))
  .reduce((memo, { z }) =>  ... )
  .filter(({ ... }) => ... )
  .groupBy( ... )
```

For real flows with many `map`, `reduce` and other functions, test of this flow can be not an easy task. But almost every function inside flow is easily testable.

Even if any of arrow function in this flow is easily testable, to test each I need to write something like this.

```javascript
// now I can import mapFn, reduceFn and test them
export const mapFn = ({ x, y }) => ({z: x + y});
export const reduceFn = (memo, { z }) =>  ... ;
...

blabla
  .map(mapFn)
  .reduce(reduceFn)
  ...
```

This can easily be tested, but source is unreadable. Function definition is far outside from place I use it.

This plugin allows you to solve this problem.

## Solution

Just add comment to each anonymous function you want to test

```javascript
// file.js
blabla
  .map( /* @t(mapFn) */ ({ x, y }) => ({z: x + y}))
  .reduce(
    // @t(reduceFn)
    (memo, { z }) =>  ...
  )
  ...
```

Add next lines to .babelrc

```
"env": {
  "ARROW": {
    "plugins": [
      ["arrow-test", {"regexp": "@t\\(([^\\)]+)\\)"}]
    ]
  }
}
```

Write test

```javascript
// test anonymous mapFn reduceFn
describe('must import anonymouse functions', () => {
  it('must import anonymouse functions', () => {
    // It's a magic - anonymous functions imported here
    const { mapFn, reduceFn } = require('./file.js');
    expect(mapFn({ x: 1, y: 2 })).toEqual({ z: 3});
  });
}

```

And run with

```shell
NODE_ENV=ARROW mocha
```

All anonymous functions with comment like `@t(Name)` will be exported.

Comment regexp and function name capture is set with next setting `"regexp": "@t\\(([^\\)]+)\\)"`

You can change it on any regexp and capture you like.

## Examples

### map reduce

Simple [map reduce module](https://github.com/istarkov/babel-plugin-arrow-test/blob/master/test/anonymous.js) and [test](https://github.com/istarkov/babel-plugin-arrow-test/blob/master/test/index.spec.js#L4-L9)

### recompose

[Functional react component with recompose](https://github.com/istarkov/babel-plugin-arrow-test/blob/master/test/reactComponent.jsx) and [test](https://github.com/istarkov/babel-plugin-arrow-test/blob/master/test/index.spec.js#L11-L15)

## Install

```
npm install --save-dev babel-plugin-arrow-test
```

Add to `.babelrc`

```
"env": {
  "ARROW": {
    "plugins": [
      ["arrow-test", {"regexp": "@t\\(([^\\)]+)\\)"}]
    ]
  }
}
```
