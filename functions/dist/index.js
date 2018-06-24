'use strict';

require('babel-polyfill');

var _actionsOnGoogle = require('actions-on-google');

var _firebaseFunctions = require('firebase-functions');

var _intents = require('./intents');

// Instantiate the Dialogflow client.


// Import the firebase-functions package for deployment.
var app = (0, _actionsOnGoogle.dialogflow)({ debug: true });

// Handle the Dialogflow intent named 'train'.
// The intent just returns the next inbound N for 4th and Irving, as well as any alerts.


// import intents
// required for async/await :(

// Import the Dialogflow module from the Actions on Google client library.
app.intent('train', _intents.handleTrainIntent);

if (!process.env.DEV) {
  (0, _intents.handleTrainIntent)();
} else {
  // Set the DialogflowApp object to handle the HTTPS POST request.
  exports.dialogflowFirebaseFulfillment = _firebaseFunctions.https.onRequest(app);
}