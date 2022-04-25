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

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
