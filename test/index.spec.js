import expect from 'expect';

describe('must import anonymouse functions', () => {
  it('must import anonymouse functions', () => {
    const { vPlusOne, vReducer } = require('./anonymous');
    expect(vPlusOne(0)).toEqual(1);
    expect(vPlusOne(1)).toEqual(2);
    expect(vReducer(1, 2)).toEqual(3);
  });

  it('must just work with recompose', () => {
    const { convertValue2Blabla } = require('./reactComponent');
    expect(convertValue2Blabla({ value: 'hello', other: 'nnn' }))
    .toEqual({ blabla: 'hello', other: 'nnn' });
  });
});
