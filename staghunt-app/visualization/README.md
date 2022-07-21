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
