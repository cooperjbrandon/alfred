// // Import the Dialogflow module from the Actions on Google client library.
// const { dialogflow } = require('actions-on-google');

// // Import the firebase-functions package for deployment.
// const functions = require('firebase-functions');

// // import other dependencies
const fetch = require('node-fetch');

// // Instantiate the Dialogflow client.
// const app = dialogflow({debug: true});

// // Handle the Dialogflow intent named 'train'.
// // The intent just returns the next inbound N for 4th and Irving
// app.intent('train', async (conv) => {
//  const url = 'http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=sf-muni&r=N&s=5120';
//  const xmlData = await fetch(url);
//  const jsonData = await parseXML(xmlData);
//  if (conv.data.userName) {
//    // If we collected user name previously, address them by name and use SSML
//    // to embed an audio snippet in the response.
//    conv.ask(`<speak>${conv.data.userName}, your lucky number is ` +
//      `${luckyNumber}.<audio src="${audioSound}"></audio>` +
//      `Would you like to hear some fake colors?</speak>`);
//  } else {
//    conv.ask(`<speak>Your lucky number is ${luckyNumber}.` +
//      `<audio src="${audioSound}"></audio>` +
//      `Would you like to hear some fake colors?</speak>`);
//  }
// });

async function go() {
  const url = 'http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=sf-muni&r=N&s=5120';
  const res = await fetch(url);
  const xmlData = await res.text();
  const jsonData = await parseXML(xmlData);
  const { predictions, alerts } = await parseJSON(jsonData);
  console.log('goodbye');
}

go()

// Set the DialogflowApp object to handle the HTTPS POST request.
// exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
