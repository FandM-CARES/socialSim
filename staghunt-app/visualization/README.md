# StagHunt Webapp
This portion of the project is for visualizing the simulations that the project has produced.
Our next goal is to make it more interactive so that we can gather human data on the game.

This Node.js webapp utilizes the MERN stack for its operations.
The front-end of the app uses React to visualize the huntspace of a set of games defined in "/src/assets/data/starter_states.json".
The service classes in the companions an database directories make fetch requests to the express backend to connect to MongoDB Cloud Service (Atlas) and (@TODO) a remote server for the game logic.

## Running the Program Locally
For running the program locally on MacOS, you can use the Javascript [npm package manager](https://www.npmjs.com/) to run the app locally.

When running the app, use "npm install" to install the required dependencies locally. This will create a node-modules folder. Then using "npm start" you can run the app and it will be hosted on the port specified in index.js, most likely 3000. Any console logs will be displayed in your terminal. Navigate to the **visualization** directory in the staghunt-app folder and execute the following commands:

    npm install
    npm start

For the backend, open an additional terminal, navigate to the **server** directory in the staghunt-app folder, and execute the following commands:

    npm install
    npm run serverStart

To complete a task, open [localhost:3000](https://localhost:3000) to view the webapp. On the prompts sign in as GUEST and use the "test" authorization code.
Then follow the instructions given.

## Running the Program on Heroku
To run the program on Heroku we have to connect the implementation to a Heroku GitHub were the [Heroku](https://devcenter.heroku.com/) cloud platform will host the webapp.

In order to deploy the app, instructions can be found [here](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app).
