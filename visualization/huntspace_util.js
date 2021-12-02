import * as jsdom from 'jsdom';
import * as d3_sel from 'd3-selection';
const d3 = Object.assign({}, d3_sel);
import Huntspace from './huntspace.js';

const { JSDOM } = jsdom;
const document = new JSDOM().window.document;

export default function getHuntspace(simulation) {
  console.log("huntspace_util running...");
  console.log(simulation);
  console.log(simulation.data);
  const space = new Huntspace(simulation.data);
  const containerId = "huntspaceEl";

  d3.select(document.body)
    .append('div')
    .attr('id', containerId)
    .call(space.render.bind(space));

  const svg = d3.select(document.getElementById(containerId)).node().outerHTML;
  d3.select(document.getElementById(containerId)).remove();

  return svg;
}
//
// module.exports = {
//   getHuntspace
// };
