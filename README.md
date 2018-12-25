# Expenditure Calculator

It is a full-stack application built using React as the front-end and Node.js as the backend, with MongoDB being the DBMS of choice.
The app itself is a React app built to graph and chart your personal expenditures to see how much expenses pile up and see which ones are not needed or which ones take up the most.

## Dependencies
Node.js, MongoDB and NPM are required for this app to run.

For other dependencies, simply run "npm i" to install all of the dependencies.

## Development Version
To run the development version, run the following commands:

1. npm start (starts the client)

2. node app.js (starts the server/API)

## Production Version
To run the production-ready version, simply run the following command:

1. NODE_ENV=production node app.js

For the production version, it is hosted on mLabs and the configuration file ("/config/db_mlab.js") is not included. 

Similarly, the public and private RSA keys are not included. Feel free to generate your own in the config folder.
