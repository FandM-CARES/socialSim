import * as jsdom from 'jsdom';
import * as d3_sel from 'd3-selection';
const d3 = Object.assign({}, d3_sel);
import Huntspace from './huntspace.js';


export default function getHuntspace(simulation) {
  const { JSDOM } = jsdom;
  const document = new JSDOM(`<!DOCTYPE html><div id='huntspaceEl'></div>`).window.document;
  console.log("huntspace_util running...");
  // create huntspace divider (container)
  const containerId = "huntspaceEl";


  // fill huntspace divider
  const space = new Huntspace(document, simulation.data);
  d3.select(document.body).select("#"+containerId)
    .call(space.drawCharacters.bind(space));
  // export huntspace
  const svg = d3.select(document.getElementById(containerId)).node().outerHTML;
  d3.select(document.getElementById(containerId)).remove();

  return svg;
}
//
// module.exports = {
//   getHuntspace
// };
