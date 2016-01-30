import React from 'react';
import mapProps from 'recompose/mapProps';
import compose from 'recompose/compose';

export const component = ({ blabla }) => (
  <div>{blabla}</div>
);

export const componentHOC = compose(
  mapProps(
    /* @t(convertValue2Blabla) */
    ({ value, ...props }) => ({
      ...props,
      blabla: value,
    })
  )
);

export default componentHOC(component);
