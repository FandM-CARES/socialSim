/* useD3.js */
import React from 'react';
import * as d3 from 'd3';

// custom react hook
export const useD3 = (renderCanvasFn, dependencies) => {
  const ref = React.useRef();

  React.useEffect(() => {
    renderCanvasFn(d3.select(ref.current));
    return () => {};
}, [renderCanvasFn, dependencies]);
  return ref;
}
