export const blabla = (arr) =>
  arr
    .map(
      // @t(vPlusOne)
      (v) => v + 1
    )
    .reduce(/* @t(vReducer) */ (r, x) => r + x, 0)
    .filter((x) => x); // will not be exported for testing
