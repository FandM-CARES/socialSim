// get the simulation id from the user
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const simulation_id = urlParams.get('sim_id')
console.log(simulation_id);

$.getJSON( "data/staghunt.json", function( data ) {
    var simulation = data;
    console.log(simulation); // REMOVE
    getStagHunt(simulation);
  });

/* if we want to load all the staghunt simulations we'll need to either add a database or
 add a functionality that is coded in a language that can reference local files (Java?).
  I think that's why the staghunt_formatted file isn't working, the size it too large to be
  uploaded on local server.
 */