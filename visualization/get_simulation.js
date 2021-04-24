// alternative to set_simulation.js

// get the simulation id from the user
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const simulation_id = 1; //urlParams.get('sim_id')

function getSimulation(simulations, id){
    return simulations[id];
}

// Steps found at https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON

// To start with, we store the URL of the JSON we want to retrieve in a variable
//let requestURL = 'https://github.com/FandM-CARES/socialSim/blob/4b62d8e9bffbad7729c9d78dbafc167dbcc24606/visualization/data/staghunt_formatted.json';
let requestURL = 'data/staghunt_formatted.json';

// To create a request, we need to create a new request object instance from the XMLHttpRequest constructor, using the new keyword
let request = new XMLHttpRequest();

// open the request using the open() method
//   params: The HTTP method to use when making the network request (i.e. GET) and the URL to make the request to
request.open('GET', requestURL);

// setting the responseType to JSON, so that XHR knows that the server will be returning JSON, and that this should be converted behind the scenes into a JavaScript object. Then we send the request with the send() method
request.responseType = 'json';
request.send();

// waiting for the response to return from the server, then dealing with it
request.onload = function() {
    const all_simulations = request.response;
    var simulation = getSimulation(all_simulations, simulation_id);
    console.log(simulation); // REMOVE
    getStagHunt(simulation);
  }
