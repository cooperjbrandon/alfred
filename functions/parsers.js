const parseString = require('xml2js').parseString;

function parseXML(xmlData) {
  return new Promise((resolve, reject) => {
    parseString(xmlData, (err, result) => {
      if (err) {
        console.log('Error parsing xml');
        reject(err);
      } else {
        console.log('success parsing xml');
        resolve(result);
      }
    });
  });
}

function parseJSON(jsonData) {
  const { direction: trainTypes, message: messages } = jsonData.body.predictions[0];

  const unsortedPredictions = [];

  // can be multiple trainTypes for 4th and irving. i.e `Inbound to Caltrain/Ball Park`
  // and `Inbound to Caltrain/Ball Park`. Combine all predictiions for all trainTypes.
  for (trainType of trainTypes) {
    let { prediction: trainPredictions } = trainType;

    // loop through trainPredictions of the train type add prediction to `unsortedPredictions` array
    for (prediction of trainPredictions) {
      const minutesTo4thAndIrving = parseInt(prediction.$.minutes);
      unsortedPredictions.push(minutesTo4thAndIrving);
    }
  }

  // sort `unsortedPredictions` by earliest prediction to latest prediction and return the earliest 4 predictions
  const predictions = unsortedPredictions.sort((a, b) => a - b).slice(0, 4);

  // also, filter for messages of priority `High`.
  const alerts = messages.filter(m => m.$.priority === 'Normal').map(m => m.$.text);

  return { predictions, alerts };
}

module.exports = {
  parseXML,
  parseJSON
};
