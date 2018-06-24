
// Import node module dependencies
const { dialogflow } = require('actions-on-google');
const functions = require('firebase-functions');
const fetch = require('node-fetch');

// import parser and formater functions
const { parseXML, parseJSON } = require('./parsers');
const { formatTrainResponse } = require('./formatters');

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});

// Handle the Dialogflow intent named 'train'.
// The intent just returns the next inbound N for 4th and Irving, as well as any alerts.
app.intent('train', async (conv) => {
  const url = 'http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=sf-muni&r=N&s=5120';
  const res = await fetch(url);
  const xmlData = await res.text();
  const jsonData = await parseXML(xmlData);
  const { predictions, alerts } = await parseJSON(jsonData);
  const { predictionText, alertText } = await formatTrainResponse(predictions, alerts);

  conv.close(`
    <speak>
      ${predictionText} ${predictionText}
    </speak>
  `);
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
