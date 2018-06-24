const parseString = require('xml2js').parseString;

function parseXML(xmlData) {
  console.log(xmlData);
  return new Promise((resolve, reject) => {
    parseString(xmlData, function (err, result) {
      if (err) {
        console.log('Error parsing xml');
        reject(err);
      } else {
        console.log('success parsing xml');
        console.log(JSON.stringify(result, null, 1));
        resolve(result);
      }
    });
  });
}

function parseJSON(jsonData) {
  const { direction, message } = jsonData.body.predictions[0];

  // can be multiple directions for 4th and irving. i.e `Inbound to Caltrain/Ball Park`
  // and `Inbound to Caltrain/Ball Park`. Combine top 4 predictions for all directions.
  const

  // also, check for messages of priority `High`.
}
