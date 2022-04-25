/** Huntspace.js */

import React from "react";
import * as d3 from "d3";
import {createCharacterStates, getWallCoordinates, getSetupData} from "./HuntspaceUtil.js";

const Huntspace = ({ data, stateData}) => {
  const svgRef = React.useRef(null);

  const svgWidth = 500;
  const svgHeight = 500;

  const {stateCounter, stateLength, mapWidth} = stateData;

  const setupData = getSetupData(svgWidth, svgHeight, mapWidth, stateLength);

  React.useEffect(() => {
    const {cellWidth, cellHeight, labelOffset, dLookup, stateLength} = setupData;

    // Create root container where we will append all other elements
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove(); // Clear svg content before adding new elements
    const svg = svgEl.append("g")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    const scale = d3.scaleLinear()
    	.domain([0, 7])
    	.range([0, svgWidth]);

    // init character space
    svg.append("g")
    	.attr("stroke-width", 1.5)
    	.attr("font-family", "sans-serif")
    	.attr("font-size", cellWidth/3.)
    	.attr("class", "characters");

    const characters = createCharacterStates(data.states);
    const wallsCoord = getWallCoordinates(data.map);

    // draw walls
  	svg.append("g")
  		.selectAll("wall")
  		.data(wallsCoord)
  		.enter()
  		.append("rect")
  		.attr("x", function(d) { return scale(d.x); })
  		.attr("y", function(d) { return scale(d.y); })
  		.attr("width", cellWidth)
  		.attr("height", cellHeight)
  		.style("stroke-width", "1px")
  		.style("stroke", "#ebebeb")
  		.style("fill", function(d) { return d.wall;});

    // draw character text
  	svg.selectAll(".characters")
  		.selectAll("text")
  		.data(characters[stateCounter % stateLength], d => d.id)
  		.join("text")
  		.text(d => d.id)
  		.style("fill", "red")
  		.style("font-size", "12px")
  		.style("dominant-baseline", function(d) {
  			return labelOffset[d.id][3];
  		})
  		.style("text-anchor", function(d) {
  			return labelOffset[d.id][2];
  		})
  		.transition().duration(function() {
  			return (stateCounter) ? 1000 : 0;
  		})
  		.attr("x", function(d) {
  			return scale(d.x + labelOffset[d.id][0]);
  		})
  		.attr("y", function(d) { return scale(d.y + labelOffset[d.id][1]); });

  	// draw character icons
  	svg.selectAll(".characters")
  		.selectAll("path")
  		.data(characters[stateCounter % stateLength], d => d.id)
  		.join("path")
  		.transition().duration(function() {
  			return (stateCounter) ? 1000 : 0;
  		})
  		.attr("transform", function (d) {
  			return "translate(" + scale(d.x + .25) + "," + scale(d.y + .25) +
  			") scale(.07)";
  		})
  		.attr("d", function (d) {
  			return dLookup[d.type];
  		});
  }, [data, setupData, stateCounter]);

  return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;

}
export default Huntspace;
