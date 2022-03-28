# StagHunt Webapp
This portion of the project is for visualizing the simulations that the project has produced.
Our next goal is to make it more interactive so that we can gather human data on the game.

Currently the project, seen in the ah-viz branch, is able to run the visualizations on the client-side.
The team would like to move the application to run server-side so that we can begin interacting with a database to store and query our simulations.

## Running the Program Locally
For running the program locally, you can use the Javascript [npm package manager](https://www.npmjs.com/) to run the app locally.

When running the app, use "npm install" to install the required dependencies locally. This will create a node-modules folder. Then using "npm start" you can run the app and it will be hosted on the port specified in index.js, most likely 5000. Any console logs will be displayed in your terminal.

    npm install
    npm start

## Running the Program on Heroku
To run the program on Heroku we have to connect the implementation to a Heroku GitHub were the [Heroku](https://devcenter.heroku.com/) cloud platform will host the webapp.

In order to deploy the app, instructions can be found [here](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app).

## Current Issues
Currently the plan is to build a webapp using express Node JS and then connect it to MongoDB but I am having a lot of trouble with this method. After talking with Professor Boscoe, they said that if I want to focus on the functionality of the app, which I do, then I should consider using PHP instead of Node JS because the Node JS method is "a bear". I wanted to ask, do you agree or if you think that we should continue the current implementation?

My MVP would be querying a database to get a simulation, which comes in the form of a JSON string, creating an image of that simulation using D3, and then displaying that to the user. Previously, the javascript was running on the client-side and was editing html elements directly. However, because we are moving to a server, so we can use a DB, we aren't able to do that anymore. My first solution was to create a mock html environment on the server, edit the html, and send back the html for the image but that isn't working. Is there a way to continue to run the previous javascript code locally and then host the rest of the webapp on the server?
