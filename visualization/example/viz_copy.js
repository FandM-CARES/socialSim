console.log("Running Example");
// var d3 = require("d3"); // Require D3 before use
var data = [
	{date: new Date(2007, 3, 24), value: 93.24},
	{date: new Date(2007, 3, 25), value: 95.35},
	{date: new Date(2007, 3, 26), value: 98.84},
	{date: new Date(2007, 3, 27), value: 99.92},
	{date: new Date(2007, 3, 30), value: 99.80},
	{date: new Date(2007, 4,  1), value: 99.47},
  ];
  
  var line = d3.line()
	  .x(function(d) { return x(d.date); })
	  .y(function(d) { return y(d.value); });
// TEST 

var margin = {top: 50, right: 50, bottom: 50, left: 50},
width = 500 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

console.log("d3:"); // REMOVE
console.log(d3); // REMOVE
var grid = d3.select("#grid")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
	"translate(" + margin.left + "," + margin.top + ")");

console.log(grid); // REMOVE

var data1 = [{x:10, y:20}, {x:20, y:40}, {x:30, y:50}]
var data2 = [{x:30, y:80}, {x:40, y:90}]

// // X scale and Axis
var x = d3.scaleLinear()
    .domain([0, 100])         // This is the min and the max of the data: 0 to 100 if percentages
    .range([0, width]);       // This is the corresponding value I want in Pixel
    grid
    .append('g')
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

// X scale and Axis
var y = d3.scaleLinear()
    .domain([0, 100])         // This is the min and the max of the data: 0 to 100 if percentages
    .range([height, 0]);       // This is the corresponding value I want in Pixel
grid
    .append('g')
    .call(d3.axisLeft(y));


function updateCircle() {
	var data = [];
	var num_circle = Math.random() * 10;
	for (var i = 0; i < num_circle; i++) {
		data.push({"x": Math.random() * 100, "y": Math.random() * 100});
	}

	console.log(data); // REMOVE

	var circle = grid.selectAll("circle")
		.data(data);

	circle
		.transition().duration(1000)
		.attr("cx", function(d){ return x(d.x) })
		.attr("cy", function(d){ return y(d.y) });

	circle.enter().append("circle")
		.attr("cx", function(d){ return x(d.x) })	
		.attr("cy", function(d){ return y(d.y) })
		.transition().duration(1000)
		.attr("r", 7);
	
	circle.exit().transition()
	    .attr("r", 0)
	    .remove();
}

// Add 3 dots for 0, 50 and 100%
var circle = grid.selectAll("circle");
circle
.data(data1)
.enter()
.append("circle")
.attr("cx", function(d){ return x(d.x) })
.attr("cy", function(d){ return y(d.y) })
.attr("r", 7);








	// .attr("fill", "#FF0000")
	// .attr("fill", d => color(d.type))
	// .attr("d", d => shape(d.type));

// for (var type in loc[0]) {
	// var coord = loc[0][type];
	// console.log(coord);
// }
// shape = d3.scaleOrdinal(loc1.map(d => d.type), d3.symbols.map(s => d3.symbol().type(s)()));
// console.log(shape);
// huntspace.append("g")
// 	.attr("stroke-width", 1.5)
// 	.attr("font-family", "sans-serif")
// 	.attr("font-size", 10)
// 	.selectAll("path")
// 	.data(loc1)
// 	.join("path") 
// 	.attr("transform", d => `translate(${d.x},${d.y})`)
// 	.attr("fill", "#FF0000")
// 	// .attr("fill", d => color(d.type))
// 	.attr("d", d => shape(d.type));


// function newData() {
// 	huntspace.selectAll("path")
// 		.data(loc2)
// 		.join("path")
// 		.attr("fill", function(d) {
// 			if (d.x) {
// 				return "#FF0000";
// 			} 
// 			return "none";
// 		})
// 		.transition().duration(1000)
// 		.attr("transform", function(d) {
// 			var x = (d.x) ? d.x : 0;
// 			var y = (d.y) ? d.y : 0;
// 			return "translate(" + x + "," + y+ ")";
// 		})		
		
// 		.attr("d", d => shape(d.type));

// }

// // huntspace.node();

// // for (const [key, value] of Object.entries(object1)) {