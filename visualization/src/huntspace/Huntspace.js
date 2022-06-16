/* Huntspace.js */

import React from 'react';
import * as d3 from 'd3';
import './Huntspace.css';
import { useD3 } from './useD3.js';
import {getWallCoordinates, getSetupData} from "./HuntspaceUtil.js";

function Huntspace({ characters, map }) {
  // data is going to be the character states and map

  const svgWidth = 500;
  const svgHeight = 500;

  const ref = useD3(
    (svg) => {
      const mapWidth = map.length;
      const stateCounter = 1;

      const setupData = getSetupData(svgWidth, svgHeight, mapWidth);
      const {cellWidth, cellHeight, labelOffset, dLookup} = setupData;

      const scale = d3.scaleLinear()
          .domain([0, 7])
          .range([0, svgWidth]);

      // init character space
      svg.select(".characters")
          .attr("stroke-width", 1.5)
          .attr("font-family", "sans-serif")
          .attr("font-size", cellWidth/3.);

      const wallsCoord = getWallCoordinates(map);

      // draw walls
      svg.select(".walls")
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
        svg.select(".characters")
            .selectAll("text")
            .data(characters, d => d.id)
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
        svg.select(".characters")
            .selectAll("path")
            .data(characters, d => d.id)
            .join(
          enter => enter.append("path"),
          update => update
            .call(update => update
              .transition().duration(function() {
                      return (stateCounter) ? 1000 : 0;
                  })
              .attr("transform", function (d) {
                      return "translate(" + scale(d.x + .25) + "," + scale(d.y + .25) +
                      ") scale(.07)";
                  })
              .attr("d", function (d) {
                      return dLookup[d.type];
                  })
            ),
          exit => exit.remove()
        );

    }, [characters]
  );

  return (
    <svg
      ref={ref}
      height={svgHeight}
      width={svgWidth}
    >
      <g className="walls"></g>
      <g className="characters"></g>
    </svg>
  )
}

export default Huntspace
