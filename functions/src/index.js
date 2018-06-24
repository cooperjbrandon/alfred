import 'babel-polyfill'; // required for async/await :(

// Import the Dialogflow module from the Actions on Google client library.
import { dialogflow } from 'actions-on-google';

// Import the firebase-functions package for deployment.
import { https } from 'firebase-functions';

// import intents
import { handleTrainIntent } from './intents';

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});

// Handle the Dialogflow intent named 'train'.
// The intent just returns the next inbound N for 4th and Irving, as well as any alerts.
app.intent('train', handleTrainIntent);

if (process.env.DEV) {
  handleTrainIntent();
} else {
  // Set the DialogflowApp object to handle the HTTPS POST request.
  exports.dialogflowFirebaseFulfillment = https.onRequest(app);
}
