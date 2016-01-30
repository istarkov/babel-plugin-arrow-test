
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

Writing full test of this flow can be not an easy task for real flows with many `map`, `reduce` and other functions we like. But almost every function inside flow is easily testable.

But even if any of arrow function in this flow is easily testable, to test each I need to write something like this.

```javascript
// now I can import mappingFunction and test
export const mapFn = ({ x, y }) => ({z: x + y});
export const reduceFn = (memo, { z }) =>  ... ;
...

blabla
  .map(mappingFunction)
  .reduce(reduceFunction)
  ...
```

This can easily be tested, but source is unreadable. Function definition is far outside from place I use it.

So this plugin allows you to solve this problem.

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
    const { mapFn, reduceFn } = require('./file.js');
    expect(mapFn({ x: 1, y: 2 })).toEqual({ z: 3});
  });
}

```

And run with

```shell
NODE_ENV=ARROW mocha
```

All anonymous functions with comment you describe as plugin `regexp` parameter will be
exported with `regexp` capture so you can test them

## Examples

### map reduce

Simple [map reduce module](https://github.com/istarkov/babel-plugin-arrow-test/blob/master/test/anonymous.js) and [test](https://github.com/istarkov/babel-plugin-arrow-test/blob/master/test/index.spec.js#L4-L9)

### recompose

[Functional react component with recompose](https://github.com/istarkov/babel-plugin-arrow-test/blob/master/test/reactComponent.jsx) and [test](https://github.com/istarkov/babel-plugin-arrow-test/blob/master/test/index.spec.js#L11-L15)
