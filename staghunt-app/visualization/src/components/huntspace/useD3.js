/** useD3 */

/* React Modules & Components */
import React from 'react';

/* External Modules */
import * as d3 from 'd3';

/**
 * React hook to relate D3 DOM changes.
 * @param {callback} renderCanvasFn - The function used to render the Huntspace
 * with D3.
 * @param {array} dependencies - The data that when changed will cause the
 * huntspace to re-render.
 * @return {ref} React reference.
 */
export const useD3 = (renderCanvasFn, dependencies) => {
  const ref = React.useRef();

  React.useEffect(() => {
    renderCanvasFn(d3.select(ref.current));
    return () => {};
}, [renderCanvasFn, dependencies]);
  return ref;
}
